import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users, Mail, Phone, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
}

export function VolunteersAdmin() {
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from("solicitudes_voluntarios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
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
          <Users className="w-5 h-5" />
          Solicitudes de Voluntariado ({volunteers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {volunteers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">No hay solicitudes de voluntariado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Ocupación</TableHead>
                  <TableHead>Horas/Semana</TableHead>
                  <TableHead>Áreas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">{volunteer.nombre_completo}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <a href={`mailto:${volunteer.correo_electronico}`} className="text-primary hover:underline">
                            {volunteer.correo_electronico}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {volunteer.telefono}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {volunteer.ciudad}, {volunteer.pais}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {volunteer.ocupacion}
                        {volunteer.organizacion && (
                          <div className="text-gray-500 text-xs">{volunteer.organizacion}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {volunteer.horas_semanales}h
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {volunteer.areas_interes.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(volunteer.estado)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {format(new Date(volunteer.created_at), "d MMM yyyy", { locale: es })}
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
