import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, ExternalLink } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { NoticiaForm, type NoticiaFormData } from "./noticia-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Noticia {
  id: string
  titulo: string
  slug: string
  extracto: string | null
  contenido: string | null
  imagen_portada: string | null
  categoria: string
  autor: string | null
  fuente: string | null
  url_externa: string | null
  es_externo: boolean
  destacada: boolean
  estado: "borrador" | "publicado"
  fecha_publicacion: string | null
  created_at: string
}
export function NoticiasAdmin() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null)
  const [deleteNoticia, setDeleteNoticia] = useState<Noticia | null>(null)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: noticias, isLoading } = useQuery({
    queryKey: ["admin-noticias"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as Noticia[]
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: NoticiaFormData) => {
      const { error } = await supabase.from("noticias").insert([{
        ...data,
        fecha_publicacion: data.estado === "publicado" ? new Date().toISOString() : null,
      }])
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-noticias"] })
      toast({ title: "Noticia creada correctamente" })
      setIsFormOpen(false)
    },
    onError: (error) => {
      toast({ title: "Error al crear la noticia", description: String(error), variant: "destructive" })
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: NoticiaFormData }) => {
      const { error } = await supabase.from("noticias").update(data).eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-noticias"] })
      toast({ title: "Noticia actualizada correctamente" })
      setEditingNoticia(null)
    },
    onError: (error) => {
      toast({ title: "Error al actualizar la noticia", description: String(error), variant: "destructive" })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("noticias").delete().eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-noticias"] })
      toast({ title: "Noticia eliminada correctamente" })
      setDeleteNoticia(null)
    },
    onError: (error) => {
      toast({ title: "Error al eliminar la noticia", description: String(error), variant: "destructive" })
    },
  })

  const toggleEstadoMutation = useMutation({
    mutationFn: async ({ id, estado }: { id: string; estado: string }) => {
      const newEstado = estado === "publicado" ? "borrador" : "publicado"
      const updateData: any = { estado: newEstado }
      if (newEstado === "publicado") {
        updateData.fecha_publicacion = new Date().toISOString()
      }
      const { error } = await supabase.from("noticias").update(updateData).eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-noticias"] })
      toast({ title: "Estado actualizado" })
    },
  })

  const toggleDestacadaMutation = useMutation({
    mutationFn: async ({ id, destacada }: { id: string; destacada: boolean }) => {
      const { error } = await supabase.from("noticias").update({ destacada: !destacada }).eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-noticias"] })
      toast({ title: "Destacada actualizada" })
    },
  })

  const handleCreate = (data: NoticiaFormData) => {
    createMutation.mutate(data)
  }

  const handleUpdate = (data: NoticiaFormData) => {
    if (editingNoticia) {
      updateMutation.mutate({ id: editingNoticia.id, data })
    }
  }

  const publicadas = noticias?.filter((n) => n.estado === "publicado").length || 0
  const borradores = noticias?.filter((n) => n.estado === "borrador").length || 0

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Noticias</p>
              <p className="text-2xl font-bold">{noticias?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Publicadas</p>
              <p className="text-2xl font-bold text-green-600">{publicadas}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Borradores</p>
              <p className="text-2xl font-bold text-amber-600">{borradores}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Noticias</CardTitle>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Noticia
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Cargando noticias...</p>
          ) : !noticias || noticias.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No hay noticias creadas aún.</p>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Crear primera noticia
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Destacada</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {noticias.map((noticia) => (
                  <TableRow key={noticia.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium line-clamp-1">{noticia.titulo}</span>
                        {noticia.es_externo && (
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{noticia.categoria}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={noticia.estado === "publicado" ? "default" : "secondary"}>
                        {noticia.estado === "publicado" ? "Publicado" : "Borrador"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleDestacadaMutation.mutate({ id: noticia.id, destacada: noticia.destacada })}
                      >
                        {noticia.destacada ? (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ) : (
                          <StarOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(noticia.created_at), "d MMM yyyy", { locale: es })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEstadoMutation.mutate({ id: noticia.id, estado: noticia.estado })}
                          title={noticia.estado === "publicado" ? "Despublicar" : "Publicar"}
                        >
                          {noticia.estado === "publicado" ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setEditingNoticia(noticia)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteNoticia(noticia)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Form */}
      <NoticiaForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
      />

      {/* Edit Form */}
      <NoticiaForm
        open={!!editingNoticia}
        onOpenChange={(open) => !open && setEditingNoticia(null)}
        onSubmit={handleUpdate}
        initialData={editingNoticia || undefined}
        isLoading={updateMutation.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteNoticia} onOpenChange={(open) => !open && setDeleteNoticia(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar noticia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La noticia "{deleteNoticia?.titulo}" será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteNoticia && deleteMutation.mutate(deleteNoticia.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
