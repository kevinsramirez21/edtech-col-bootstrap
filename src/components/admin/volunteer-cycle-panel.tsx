import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Trash2, CalendarRange, UserCheck, Check, X, Pencil } from "lucide-react";
import { toast } from "sonner";

export interface Ciclo {
  id: string;
  nombre: string;
  lider_nombre: string | null;
  activo: boolean;
}

export interface Responsable {
  id: string;
  ciclo_id: string;
  nombre: string;
}

interface Props {
  ciclos: Ciclo[];
  responsables: Responsable[];
  activeCicloId: string | null;
  onSelectCiclo: (id: string) => void;
  onRefresh: () => void;
}

export function VolunteerCyclePanel({ ciclos, responsables, activeCicloId, onSelectCiclo, onRefresh }: Props) {
  const ciclo = ciclos.find((c) => c.id === activeCicloId) ?? null;

  const [nombre, setNombre] = useState("");
  const [lider, setLider] = useState("");
  const [saving, setSaving] = useState(false);
  const [newCicloName, setNewCicloName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newResponsable, setNewResponsable] = useState("");
  const [addingResponsable, setAddingResponsable] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    setNombre(ciclo?.nombre ?? "");
    setLider(ciclo?.lider_nombre ?? "");
  }, [ciclo?.id, ciclo?.nombre, ciclo?.lider_nombre]);

  const cicloResponsables = responsables.filter((r) => r.ciclo_id === activeCicloId);

  const createCiclo = async () => {
    if (!newCicloName.trim()) return;
    setCreating(true);
    try {
      const { data, error } = await supabase
        .from("ciclos_voluntariado")
        .insert({ nombre: newCicloName.trim(), activo: ciclos.length === 0 })
        .select()
        .single();
      if (error) throw error;
      setNewCicloName("");
      onSelectCiclo(data.id);
      onRefresh();
      toast.success("Ciclo creado");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo crear el ciclo");
    } finally {
      setCreating(false);
    }
  };

  const saveCiclo = async () => {
    if (!ciclo) return;
    if (!nombre.trim()) {
      toast.error("El nombre del ciclo no puede estar vacío");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from("ciclos_voluntariado")
        .update({ nombre: nombre.trim(), lider_nombre: lider.trim() || null })
        .eq("id", ciclo.id);
      if (error) throw error;
      onRefresh();
      toast.success("Ciclo actualizado");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo actualizar el ciclo");
    } finally {
      setSaving(false);
    }
  };

  const markActive = async () => {
    if (!ciclo) return;
    try {
      const { error: clearError } = await supabase
        .from("ciclos_voluntariado")
        .update({ activo: false })
        .neq("id", ciclo.id);
      if (clearError) throw clearError;
      const { error } = await supabase.from("ciclos_voluntariado").update({ activo: true }).eq("id", ciclo.id);
      if (error) throw error;
      onRefresh();
      toast.success("Ciclo marcado como activo");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo marcar el ciclo como activo");
    }
  };

  const deleteCiclo = async () => {
    if (!ciclo) return;
    if (!confirm(`¿Eliminar el ciclo "${ciclo.nombre}" y sus responsables?`)) return;
    try {
      const { error } = await supabase.from("ciclos_voluntariado").delete().eq("id", ciclo.id);
      if (error) throw error;
      onRefresh();
      toast.success("Ciclo eliminado");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar el ciclo");
    }
  };

  const addResponsable = async () => {
    if (!ciclo || !newResponsable.trim()) return;
    setAddingResponsable(true);
    try {
      const { error } = await supabase
        .from("responsables_ciclo")
        .insert({ ciclo_id: ciclo.id, nombre: newResponsable.trim() });
      if (error) throw error;
      setNewResponsable("");
      onRefresh();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo agregar el responsable");
    } finally {
      setAddingResponsable(false);
    }
  };

  const saveResponsable = async (id: string) => {
    if (!editingName.trim()) return;
    try {
      const { error } = await supabase
        .from("responsables_ciclo")
        .update({ nombre: editingName.trim() })
        .eq("id", id);
      if (error) throw error;
      setEditingId(null);
      onRefresh();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo actualizar el responsable");
    }
  };

  const deleteResponsable = async (id: string) => {
    try {
      const { error } = await supabase.from("responsables_ciclo").delete().eq("id", id);
      if (error) throw error;
      onRefresh();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar el responsable");
    }
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#0B47CE] to-indigo-500 p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
            <CalendarRange className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Ciclo de selección</h2>
            <p className="text-white/80 text-sm">Define el ciclo, su líder y los responsables del seguimiento</p>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Sección 1: crear ciclo */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Plus className="w-4 h-4 text-[#0B47CE]" />
              <h3 className="font-semibold text-slate-800">Crear un nuevo ciclo</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">Escribe el nombre del ciclo (mes, fecha o etiqueta).</p>
            <Label className="text-xs uppercase text-slate-500">Nombre del nuevo ciclo</Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="Ej. Agosto 2026"
                value={newCicloName}
                onChange={(e) => setNewCicloName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createCiclo()}
              />
              <Button onClick={createCiclo} disabled={creating || !newCicloName.trim()}>
                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              </Button>
            </div>
          </section>

          {/* Sección 2: seleccionar ciclo actual */}
          <section className="rounded-xl border border-[#0B47CE]/30 bg-[#0B47CE]/5 p-4">
            <div className="flex items-center gap-2 mb-1">
              <CalendarRange className="w-4 h-4 text-[#0B47CE]" />
              <h3 className="font-semibold text-slate-800">Ciclo en el que estamos</h3>
            </div>
            <p className="text-xs text-slate-500 mb-3">Selecciona el ciclo que quieres gestionar.</p>
            <Label className="text-xs uppercase text-slate-500">Ciclo seleccionado</Label>
            <Select value={activeCicloId ?? undefined} onValueChange={onSelectCiclo}>
              <SelectTrigger className="mt-1 bg-white">
                <SelectValue placeholder={ciclos.length ? "Selecciona un ciclo" : "Aún no hay ciclos"} />
              </SelectTrigger>
              <SelectContent>
                {ciclos.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nombre} {c.activo ? "· activo" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        </div>

        {ciclo && (
          <div className="border-t pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase text-slate-500">Nombre del ciclo</Label>
                <Input className="mt-1" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs uppercase text-slate-500">Nombre del líder</Label>
                <Input
                  className="mt-1"
                  placeholder="Ej. María Gómez"
                  value={lider}
                  onChange={(e) => setLider(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={saveCiclo} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Guardar cambios
              </Button>
              {ciclo.activo ? (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">Ciclo activo</Badge>
              ) : (
                <Button variant="outline" onClick={markActive}>
                  Marcar como activo
                </Button>
              )}
              <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={deleteCiclo}>
                <Trash2 className="w-4 h-4 mr-2" /> Eliminar ciclo
              </Button>
            </div>

            {/* Responsables */}
            <div className="border-t pt-5">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-4 h-4 text-slate-500" />
                <h3 className="font-semibold text-slate-800">Responsables</h3>
                <span className="text-sm text-slate-500">({cicloResponsables.length})</span>
              </div>

              <div className="flex gap-2 mb-4 max-w-md">
                <Input
                  placeholder="Nombre del responsable"
                  value={newResponsable}
                  onChange={(e) => setNewResponsable(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addResponsable()}
                />
                <Button onClick={addResponsable} disabled={addingResponsable || !newResponsable.trim()}>
                  {addingResponsable ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                </Button>
              </div>

              {cicloResponsables.length === 0 ? (
                <p className="text-sm text-slate-500">Aún no hay responsables en este ciclo.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {cicloResponsables.map((r) =>
                    editingId === r.id ? (
                      <div key={r.id} className="flex items-center gap-1">
                        <Input
                          className="h-9 w-44"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveResponsable(r.id)}
                        />
                        <Button size="sm" variant="ghost" onClick={() => saveResponsable(r.id)}>
                          <Check className="w-4 h-4 text-emerald-600" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          <X className="w-4 h-4 text-slate-500" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        key={r.id}
                        className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 pl-3 pr-1 py-1"
                      >
                        <span className="text-sm text-slate-700">{r.nombre}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => {
                            setEditingId(r.id);
                            setEditingName(r.nombre);
                          }}
                        >
                          <Pencil className="w-3.5 h-3.5 text-slate-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          onClick={() => deleteResponsable(r.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </Button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
