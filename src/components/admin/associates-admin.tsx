import * as React from "react"
import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Building2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { AssociateModal } from "./associate-modal"
import { Associate } from "@/types/associate"
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
  const [modalOpen, setModalOpen] = useState(false)
  const [editingAssociate, setEditingAssociate] = useState<Associate | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
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

  // Create new associate
  const createAssociate = async (data: any) => {
    try {
      setSubmitting(true)
      const { error } = await supabase
        .from('asociados')
        .insert([data])

      if (error) throw error

      await fetchAssociates()
      setModalOpen(false)
      
      toast({
        title: "Asociado creado",
        description: "El asociado ha sido creado correctamente",
      })
    } catch (err) {
      console.error('Error creating associate:', err)
      toast({
        title: "Error",
        description: "No se pudo crear el asociado",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Update existing associate
  const updateAssociate = async (data: any) => {
    if (!editingAssociate) return

    try {
      setSubmitting(true)
      const { error } = await supabase
        .from('asociados')
        .update(data)
        .eq('id', editingAssociate.id)

      if (error) throw error

      await fetchAssociates()
      setModalOpen(false)
      setEditingAssociate(null)
      
      toast({
        title: "Asociado actualizado",
        description: "El asociado ha sido actualizado correctamente",
      })
    } catch (err) {
      console.error('Error updating associate:', err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el asociado",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Handle form submission (create or update)
  const handleSubmit = async (data: any) => {
    if (editingAssociate) {
      await updateAssociate(data)
    } else {
      await createAssociate(data)
    }
  }

  // Open modal for adding new associate
  const handleAddNew = () => {
    setEditingAssociate(null)
    setModalOpen(true)
  }

  // Open modal for editing associate
  const handleEdit = (associate: Associate) => {
    setEditingAssociate(associate)
    setModalOpen(true)
  }

  // Close modal and reset state
  const closeModal = () => {
    setModalOpen(false)
    setEditingAssociate(null)
  }

  // Filter associates based on search and status
  const filteredAssociates = React.useMemo(() => {
    return associates.filter(associate => {
      const matchesSearch = associate.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           associate.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || associate.estado === filterStatus
      
      return matchesSearch && matchesStatus
    })
  }, [associates, searchTerm, filterStatus])
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
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#003889] to-[#0B47CE] text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="w-6 h-6" />
            Gestión de Asociados
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
              {filteredAssociates.length}
            </Badge>
          </CardTitle>
          <Button onClick={handleAddNew} className="gap-2 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white">
            <Plus className="w-4 h-4" />
            Agregar Asociado
          </Button>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#F73C5C]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-[#F73C5C] md:w-48"
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
            <option value="pendiente">Pendientes</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {filteredAssociates.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg">
              {searchTerm || filterStatus !== 'all' 
                ? 'No se encontraron asociados con los filtros aplicados'
                : 'No hay asociados registrados'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold">Empresa</TableHead>
                  <TableHead className="font-bold">Segmento</TableHead>
                  <TableHead className="font-bold">Estado</TableHead>
                  <TableHead className="font-bold">Fecha Ingreso</TableHead>
                  <TableHead className="font-bold">Servicios</TableHead>
                  <TableHead className="text-right font-bold">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssociates.map((associate) => (
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
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(associate)}
                          className="gap-1"
                        >
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

        {/* Associate Modal */}
        <AssociateModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          associate={editingAssociate}
          isLoading={submitting}
        />
      </CardContent>
    </Card>
  )
}