import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Handshake, Mail, Phone, MapPin, Building, Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AllyApplication {
  id: string;
  nombre_entidad: string;
  tipo_entidad: string;
  representante: string;
  cargo_representante: string;
  pais: string;
  ciudad: string;
  correo_contacto: string;
  telefono: string;
  motivo_interes: string;
  objetivo_alianza: string;
  formas_alianza: string[];
  otras_formas_alianza: string | null;
  beneficios_esperados: string[];
  explicaciones_adicionales: string | null;
  estado: string;
  created_at: string;
}

export function AlliesAdmin() {
  const [allies, setAllies] = useState<AllyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [selectedAlly, setSelectedAlly] = useState<AllyApplication | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchAllies();
  }, []);

  const fetchAllies = async () => {
    try {
      const { data, error } = await supabase
        .from("solicitudes_aliados")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAllies(data || []);
    } catch (error) {
      console.error("Error fetching allies:", error);
      toast.error("Error al cargar aliados");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from("solicitudes_aliados")
        .update({ estado: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      setAllies(prev => 
        prev.map(a => a.id === id ? { ...a, estado: newStatus } : a)
      );
      toast.success(`Estado actualizado a ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error al actualizar estado");
    } finally {
      setUpdating(null);
    }
  };

  const filteredAllies = useMemo(() => {
    return allies.filter(ally => {
      const matchesSearch = 
        ally.nombre_entidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ally.representante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ally.correo_contacto.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "todos" || ally.estado === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [allies, searchTerm, statusFilter]);

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

  const formasAlianzaLabels: Record<string, string> = {
    financiacion: "Financiación",
    donacion_productos: "Donación de productos",
    capacidades_estrategicas: "Capacidades estratégicas",
    cooperacion_tecnica: "Cooperación técnica",
    co_creacion: "Co-creación"
  };

  const pendingCount = allies.filter(a => a.estado === "pendiente").length;
  const approvedCount = allies.filter(a => a.estado === "aprobado").length;

  if (loading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#F73C5C] mx-auto mb-4" />
            <p className="text-slate-500">Cargando aliados...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-0 shadow-lg overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#F73C5C] to-rose-500 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Solicitudes de Aliados</h2>
                <p className="text-white/80 text-sm">
                  {pendingCount} pendientes · {approvedCount} aprobados · {allies.length} total
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
              placeholder="Buscar por entidad, representante o email..."
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
          {filteredAllies.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                <Handshake className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-1">No hay solicitudes</h3>
              <p className="text-slate-500">No se encontraron solicitudes de aliados</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Entidad</TableHead>
                    <TableHead className="font-semibold text-slate-700">Representante</TableHead>
                    <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Ubicación</TableHead>
                    <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAllies.map((ally) => (
                    <TableRow key={ally.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="font-medium text-slate-900">{ally.nombre_entidad}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {ally.tipo_entidad}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-slate-900">{ally.representante}</div>
                        <div className="text-xs text-slate-500">{ally.cargo_representante}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <a href={`mailto:${ally.correo_contacto}`} className="text-[#0B47CE] hover:underline">
                              {ally.correo_contacto}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {ally.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {ally.ciudad}, {ally.pais}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(ally.estado)}</TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {format(new Date(ally.created_at), "d MMM yyyy", { locale: es })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedAlly(ally)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {ally.estado === "pendiente" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(ally.id, "aprobado")}
                                disabled={updating === ally.id}
                                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                              >
                                {updating === ally.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(ally.id, "rechazado")}
                                disabled={updating === ally.id}
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
      <Dialog open={!!selectedAlly} onOpenChange={() => setSelectedAlly(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalle del Aliado</DialogTitle>
          </DialogHeader>
          {selectedAlly && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Entidad</label>
                  <p className="text-slate-900 font-medium">{selectedAlly.nombre_entidad}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Tipo</label>
                  <p className="text-slate-900">{selectedAlly.tipo_entidad}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Representante</label>
                  <p className="text-slate-900">{selectedAlly.representante}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Cargo</label>
                  <p className="text-slate-900">{selectedAlly.cargo_representante}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Email</label>
                  <p className="text-slate-900">{selectedAlly.correo_contacto}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Teléfono</label>
                  <p className="text-slate-900">{selectedAlly.telefono}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Ubicación</label>
                  <p className="text-slate-900">{selectedAlly.ciudad}, {selectedAlly.pais}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Estado</label>
                  <div className="mt-1">{getStatusBadge(selectedAlly.estado)}</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Formas de Alianza</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAlly.formas_alianza.map((forma) => (
                    <Badge key={forma} variant="secondary">
                      {formasAlianzaLabels[forma] || forma}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Beneficios Esperados</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAlly.beneficios_esperados.map((beneficio) => (
                    <Badge key={beneficio} variant="outline">{beneficio}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Motivo de Interés</label>
                <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg">{selectedAlly.motivo_interes}</p>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 uppercase">Objetivo de la Alianza</label>
                <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg">{selectedAlly.objetivo_alianza}</p>
              </div>

              {selectedAlly.explicaciones_adicionales && (
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Explicaciones Adicionales</label>
                  <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg">{selectedAlly.explicaciones_adicionales}</p>
                </div>
              )}

              {selectedAlly.estado === "pendiente" && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => {
                      updateStatus(selectedAlly.id, "aprobado");
                      setSelectedAlly(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateStatus(selectedAlly.id, "rechazado");
                      setSelectedAlly(null);
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
