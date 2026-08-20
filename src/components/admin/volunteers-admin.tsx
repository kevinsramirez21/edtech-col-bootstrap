import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Users, Mail, Phone, Clock, MapPin, Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VolunteerCyclePanel, type Ciclo, type Responsable } from "./volunteer-cycle-panel";

interface VolunteerApplication {
  id: string;
  nombre_completo: string;
  correo_electronico: string;
  telefono: string;
  ciudad: string;
  pais: string;
  ocupacion: string;
  organizacion: string | null;
  linkedin: string | null;
  horas_semanales: string;
  areas_interes: string[];
  experiencia_voluntariado: string | null;
  motivacion: string;
  como_conocio: string | null;
  estado: string;
  created_at: string;
  ciclo_id: string | null;
  responsable_id: string | null;
}

export function VolunteersAdmin() {
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerApplication | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [responsables, setResponsables] = useState<Responsable[]>([]);
  const [activeCicloId, setActiveCicloId] = useState<string | null>(null);


  useEffect(() => {
    fetchVolunteers();
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    try {
      const [{ data: ciclosData, error: ciclosError }, { data: respData, error: respError }] = await Promise.all([
        supabase.from("ciclos_voluntariado").select("id, nombre, lider_nombre, activo").order("created_at", { ascending: false }),
        supabase.from("responsables_ciclo").select("id, ciclo_id, nombre").order("nombre"),
      ]);
      if (ciclosError) throw ciclosError;
      if (respError) throw respError;
      const list = (ciclosData || []) as Ciclo[];
      setCiclos(list);
      setResponsables((respData || []) as Responsable[]);
      setActiveCicloId((prev) => {
        if (prev && list.some((c) => c.id === prev)) return prev;
        return list.find((c) => c.activo)?.id ?? list[0]?.id ?? null;
      });
    } catch (error) {
      console.error("Error fetching cycles:", error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from("solicitudes_voluntarios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVolunteers((data || []) as VolunteerApplication[]);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      toast.error("Error al cargar voluntarios");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from("solicitudes_voluntarios")
        .update({ estado: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      setVolunteers(prev => 
        prev.map(v => v.id === id ? { ...v, estado: newStatus } : v)
      );
      toast.success(`Estado actualizado a ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error al actualizar estado");
    } finally {
      setUpdating(null);
    }
  };

  const assignResponsable = async (volunteer: VolunteerApplication, value: string) => {
    const responsableId = value === "none" ? null : value;
    const cicloId = responsableId
      ? responsables.find((r) => r.id === responsableId)?.ciclo_id ?? volunteer.ciclo_id
      : volunteer.ciclo_id;
    try {
      const { error } = await supabase
        .from("solicitudes_voluntarios")
        .update({ responsable_id: responsableId, ciclo_id: cicloId })
        .eq("id", volunteer.id);
      if (error) throw error;
      setVolunteers((prev) =>
        prev.map((v) => (v.id === volunteer.id ? { ...v, responsable_id: responsableId, ciclo_id: cicloId } : v))
      );
      setSelectedVolunteer((prev) =>
        prev && prev.id === volunteer.id ? { ...prev, responsable_id: responsableId, ciclo_id: cicloId } : prev
      );
      toast.success(responsableId ? "Responsable asignado" : "Responsable removido");
    } catch (error) {
      console.error("Error assigning responsable:", error);
      toast.error("No se pudo asignar el responsable");
    }
  };

  const responsableName = (id: string | null) =>
    id ? responsables.find((r) => r.id === id)?.nombre ?? "—" : null;

  const cicloResponsables = useMemo(
    () => responsables.filter((r) => r.ciclo_id === activeCicloId),
    [responsables, activeCicloId]
  );

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter(volunteer => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        volunteer.nombre_completo.toLowerCase().includes(term) ||
        volunteer.correo_electronico.toLowerCase().includes(term) ||
        volunteer.ciudad.toLowerCase().includes(term) ||
        (responsableName(volunteer.responsable_id) ?? "").toLowerCase().includes(term);
      
      const matchesStatus = statusFilter === "todos" || volunteer.estado === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [volunteers, searchTerm, statusFilter, responsables]);


  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-100">Pendiente</Badge>;
      case "aprobado":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-100">Aprobado</Badge>;
      case "rechazado":
        return <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100">Rechazado</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const pendingCount = volunteers.filter(v => v.estado === "pendiente").length;
  const approvedCount = volunteers.filter(v => v.estado === "aprobado").length;

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#0B47CE] mx-auto mb-4" />
            <p className="text-slate-500">Cargando voluntarios...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-6">
        <VolunteerCyclePanel
          ciclos={ciclos}
          responsables={responsables}
          activeCicloId={activeCicloId}
          onSelectCiclo={setActiveCicloId}
          onRefresh={fetchCycles}
        />
      </div>

      <Card className="border-0 shadow-lg">

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Solicitudes de Voluntariado</h2>
                <p className="text-white/80 text-sm">
                  {pendingCount} pendientes · {approvedCount} aprobados · {volunteers.length} total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 bg-slate-50 border-b flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, email o ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-slate-200"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 bg-white border-slate-200">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="aprobado">Aprobado</SelectItem>
              <SelectItem value="rechazado">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CardContent className="p-0">
          {filteredVolunteers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">No hay solicitudes</h3>
              <p className="text-slate-500">No se encontraron solicitudes de voluntariado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
                    <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Ubicación</TableHead>
                    <TableHead className="font-semibold text-slate-700">Horas/Semana</TableHead>
                    <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Responsable</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha</TableHead>

                    <TableHead className="font-semibold text-slate-700 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVolunteers.map((volunteer) => (
                    <TableRow key={volunteer.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="font-medium text-slate-900">{volunteer.nombre_completo}</div>
                        <div className="text-xs text-slate-500">{volunteer.ocupacion}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <a href={`mailto:${volunteer.correo_electronico}`} className="text-[#0B47CE] hover:underline">
                              {volunteer.correo_electronico}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {volunteer.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {volunteer.ciudad}, {volunteer.pais}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium text-slate-700">{volunteer.horas_semanales}h</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(volunteer.estado)}</TableCell>
                      <TableCell>
                        <Select
                          value={volunteer.responsable_id ?? "none"}
                          onValueChange={(value) => assignResponsable(volunteer, value)}
                        >
                          <SelectTrigger className="w-40 h-9 bg-white">
                            <SelectValue placeholder="Sin asignar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sin asignar</SelectItem>
                            {cicloResponsables.map((r) => (
                              <SelectItem key={r.id} value={r.id}>
                                {r.nombre}
                              </SelectItem>
                            ))}
                            {volunteer.responsable_id &&
                              !cicloResponsables.some((r) => r.id === volunteer.responsable_id) && (
                                <SelectItem value={volunteer.responsable_id}>
                                  {responsableName(volunteer.responsable_id)}
                                </SelectItem>
                              )}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="text-sm text-slate-500">
                        {format(new Date(volunteer.created_at), "d MMM yyyy", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedVolunteer(volunteer)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {volunteer.estado === "pendiente" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(volunteer.id, "aprobado")}
                                disabled={updating === volunteer.id}
                                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                              >
                                {updating === volunteer.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(volunteer.id, "rechazado")}
                                disabled={updating === volunteer.id}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedVolunteer} onOpenChange={() => setSelectedVolunteer(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle del Voluntario</DialogTitle>
          </DialogHeader>
          {selectedVolunteer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Nombre</label>
                  <p className="text-slate-900 font-medium">{selectedVolunteer.nombre_completo}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Estado</label>
                  <div className="mt-1">{getStatusBadge(selectedVolunteer.estado)}</div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Email</label>
                  <p className="text-slate-900">{selectedVolunteer.correo_electronico}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Teléfono</label>
                  <p className="text-slate-900">{selectedVolunteer.telefono}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Ubicación</label>
                  <p className="text-slate-900">{selectedVolunteer.ciudad}, {selectedVolunteer.pais}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Ocupación</label>
                  <p className="text-slate-900">{selectedVolunteer.ocupacion}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Organización</label>
                  <p className="text-slate-900">{selectedVolunteer.organizacion || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Horas Semanales</label>
                  <p className="text-slate-900">{selectedVolunteer.horas_semanales} horas</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Responsable</label>
                  <p className="text-slate-900">{responsableName(selectedVolunteer.responsable_id) || "Sin asignar"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Ciclo</label>
                  <p className="text-slate-900">
                    {ciclos.find((c) => c.id === selectedVolunteer.ciclo_id)?.nombre || "Sin ciclo"}
                  </p>
                </div>
              </div>

              
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Áreas de Interés</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedVolunteer.areas_interes.map((area) => (
                    <Badge key={area} variant="secondary">{area}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Motivación</label>
                <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg">{selectedVolunteer.motivacion}</p>
              </div>

              {selectedVolunteer.experiencia_voluntariado && (
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Experiencia</label>
                  <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg">{selectedVolunteer.experiencia_voluntariado}</p>
                </div>
              )}

              {selectedVolunteer.estado === "pendiente" && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => {
                      updateStatus(selectedVolunteer.id, "aprobado");
                      setSelectedVolunteer(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateStatus(selectedVolunteer.id, "rechazado");
                      setSelectedVolunteer(null);
                    }}
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rechazar
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
