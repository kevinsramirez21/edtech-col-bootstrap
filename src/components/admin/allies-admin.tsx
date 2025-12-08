import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Handshake, Mail, Phone, MapPin, Building } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
  formas_alianza: string[];
  beneficios_esperados: string[];
  estado: string;
  created_at: string;
}

export function AlliesAdmin() {
  const [allies, setAllies] = useState<AllyApplication[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pendiente</Badge>;
      case "aprobado":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Aprobado</Badge>;
      case "rechazado":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rechazado</Badge>;
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  const formasAlianzaLabels: Record<string, string> = {
    financiacion: "Financiación",
    donacion_productos: "Donación de productos",
    capacidades_estrategicas: "Capacidades estratégicas"
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="w-5 h-5" />
          Solicitudes de Aliados ({allies.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allies.length === 0 ? (
          <div className="text-center py-8">
            <Handshake className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">No hay solicitudes de aliados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entidad</TableHead>
                  <TableHead>Representante</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Formas de Alianza</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allies.map((ally) => (
                  <TableRow key={ally.id}>
                    <TableCell>
                      <div className="font-medium">{ally.nombre_entidad}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {ally.tipo_entidad}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{ally.representante}</div>
                      <div className="text-xs text-gray-500">{ally.cargo_representante}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <a href={`mailto:${ally.correo_contacto}`} className="text-primary hover:underline">
                            {ally.correo_contacto}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {ally.telefono}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {ally.ciudad}, {ally.pais}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ally.formas_alianza.map((forma) => (
                          <Badge key={forma} variant="secondary" className="text-xs">
                            {formasAlianzaLabels[forma] || forma}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(ally.estado)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(ally.created_at), "d MMM yyyy", { locale: es })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
