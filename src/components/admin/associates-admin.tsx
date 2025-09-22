import * as React from "react"
import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Building2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Associate {
  id: string
  nombre_empresa: string
  descripcion?: string
  pagina_web?: string
  segmento?: string
  servicios?: string[]
  correo_contacto?: string
  logo_url?: string
  ubicacion?: string
  tamano_empresa?: string
  estado: string
  fecha_ingreso: string
  tipo_membresia?: string
  created_at: string
}

const segmentLabels: Record<string, string> = {
  educacion_basica: "Educación Básica",
  educacion_superior: "Educación Superior", 
  capacitacion_empresarial: "Capacitación Empresarial",
  educacion_continua: "Educación Continua",
  edtech_tools: "Herramientas EdTech",
  infrastructure: "Infraestructura",
  other: "Otros"
}

const statusLabels: Record<string, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
  pendiente: "Pendiente"
}

const statusColors: Record<string, string> = {
  activo: "bg-green-100 text-green-800",
  inactivo: "bg-red-100 text-red-800", 
  pendiente: "bg-yellow-100 text-yellow-800"
}

export function AssociatesAdmin() {
  const [associates, setAssociates] = useState<Associate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch all associates (including inactive ones for admin)
  const fetchAssociates = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('asociados')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAssociates(data || [])
    } catch (err) {
      console.error('Error fetching associates:', err)
      setError('Error al cargar los asociados')
      toast({
        title: "Error",
        description: "No se pudieron cargar los asociados",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAssociates()
  }, [])

  // Toggle associate status
  const toggleAssociateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'activo' ? 'inactivo' : 'activo'
    
    try {
      const { error } = await supabase
        .from('asociados')
        .update({ estado: newStatus })
        .eq('id', id)

      if (error) throw error

      setAssociates(prev => 
        prev.map(associate => 
          associate.id === id 
            ? { ...associate, estado: newStatus }
            : associate
        )
      )

      toast({
        title: "Estado actualizado",
        description: `El asociado ahora está ${statusLabels[newStatus].toLowerCase()}`,
      })
    } catch (err) {
      console.error('Error updating associate status:', err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del asociado",
        variant: "destructive"
      })
    }
  }

  // Delete associate
  const deleteAssociate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('asociados')
        .delete()
        .eq('id', id)

      if (error) throw error

      setAssociates(prev => prev.filter(associate => associate.id !== id))
      
      toast({
        title: "Asociado eliminado",
        description: "El asociado ha sido eliminado correctamente",
      })
    } catch (err) {
      console.error('Error deleting associate:', err)
      toast({
        title: "Error", 
        description: "No se pudo eliminar el asociado",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-700" />
          <p className="text-gray-600">Cargando asociados...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchAssociates} variant="outline">
          Intentar de nuevo
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Gestión de Asociados
          </CardTitle>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Agregar Asociado
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {associates.length === 0 ? (
          <div className="text-center py-8">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">No hay asociados registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Ingreso</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {associates.map((associate) => (
                  <TableRow key={associate.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {associate.nombre_empresa}
                        </div>
                        {associate.ubicacion && (
                          <div className="text-sm text-gray-500">
                            {associate.ubicacion}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {associate.segmento && (
                        <Badge variant="secondary">
                          {segmentLabels[associate.segmento] || associate.segmento}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[associate.estado]}>
                        {statusLabels[associate.estado]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(associate.fecha_ingreso).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {associate.servicios?.slice(0, 2).map((servicio, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {servicio}
                          </Badge>
                        ))}
                        {associate.servicios && associate.servicios.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{associate.servicios.length - 2} más
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleAssociateStatus(associate.id, associate.estado)}
                          className="gap-1"
                        >
                          {associate.estado === 'activo' ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              Desactivar
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              Activar
                            </>
                          )}
                        </Button>
                        
                        <Button size="sm" variant="outline" className="gap-1">
                          <Pencil className="w-3 h-3" />
                          Editar
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                              <Trash2 className="w-3 h-3" />
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el asociado{' '}
                                <strong>{associate.nombre_empresa}</strong> de la base de datos.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteAssociate(associate.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
  )
}