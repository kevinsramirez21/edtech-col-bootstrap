import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES = [
  "General",
  "Inversión",
  "Política Pública",
  "Innovación",
  "Educación Superior",
  "K-12",
  "Corporativo",
  "Startups",
  "Internacional",
]

const noticiaSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  extracto: z.string().optional(),
  contenido: z.string().optional(),
  imagen_portada: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  categoria: z.string().min(1, "La categoría es requerida"),
  autor: z.string().optional(),
  fuente: z.string().optional(),
  url_externa: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  es_externo: z.boolean(),
  destacada: z.boolean(),
  estado: z.enum(["borrador", "publicado"]),
})

export type NoticiaFormData = z.infer<typeof noticiaSchema>

interface NoticiaFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: NoticiaFormData) => void
  initialData?: Partial<NoticiaFormData>
  isLoading?: boolean
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-") // Remove duplicate -
    .trim()
}

export function NoticiaForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading,
}: NoticiaFormProps) {
  const form = useForm<NoticiaFormData>({
    resolver: zodResolver(noticiaSchema),
    defaultValues: {
      titulo: "",
      slug: "",
      extracto: "",
      contenido: "",
      imagen_portada: "",
      categoria: "General",
      autor: "",
      fuente: "",
      url_externa: "",
      es_externo: false,
      destacada: false,
      estado: "borrador",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        titulo: initialData.titulo || "",
        slug: initialData.slug || "",
        extracto: initialData.extracto || "",
        contenido: initialData.contenido || "",
        imagen_portada: initialData.imagen_portada || "",
        categoria: initialData.categoria || "General",
        autor: initialData.autor || "",
        fuente: initialData.fuente || "",
        url_externa: initialData.url_externa || "",
        es_externo: initialData.es_externo || false,
        destacada: initialData.destacada || false,
        estado: (initialData.estado as "borrador" | "publicado") || "borrador",
      })
    } else {
      form.reset({
        titulo: "",
        slug: "",
        extracto: "",
        contenido: "",
        imagen_portada: "",
        categoria: "General",
        autor: "",
        fuente: "",
        url_externa: "",
        es_externo: false,
        destacada: false,
        estado: "borrador",
      })
    }
  }, [initialData, form, open])

  const watchTitulo = form.watch("titulo")
  const watchEsExterno = form.watch("es_externo")

  useEffect(() => {
    if (!initialData && watchTitulo) {
      form.setValue("slug", generateSlug(watchTitulo))
    }
  }, [watchTitulo, initialData, form])

  const handleSubmit = (data: NoticiaFormData) => {
    // Clean empty strings
    const cleanedData = {
      ...data,
      extracto: data.extracto || null,
      contenido: data.contenido || null,
      imagen_portada: data.imagen_portada || null,
      autor: data.autor || null,
      fuente: data.fuente || null,
      url_externa: data.url_externa || null,
    }
    onSubmit(cleanedData as NoticiaFormData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Editar Noticia" : "Nueva Noticia"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Modifica los campos que desees actualizar."
              : "Completa la información para crear una nueva noticia."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título *</FormLabel>
                    <FormControl>
                      <Input placeholder="Título de la noticia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug *</FormLabel>
                    <FormControl>
                      <Input placeholder="url-de-la-noticia" {...field} />
                    </FormControl>
                    <FormDescription>URL amigable (se genera automáticamente)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del autor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Extract */}
            <FormField
              control={form.control}
              name="extracto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extracto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve resumen de la noticia (aparece en las tarjetas de preview)"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Image */}
            <FormField
              control={form.control}
              name="imagen_portada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagen de Portada (URL)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* External Toggle */}
            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="es_externo"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Es noticia externa</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destacada"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Destacada</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* External URL & Source */}
            {watchEsExterno && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <FormField
                  control={form.control}
                  name="url_externa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Externa</FormLabel>
                      <FormControl>
                        <Input placeholder="https://fuente-externa.com/noticia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fuente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fuente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre del medio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Content (only for non-external) */}
            {!watchEsExterno && (
              <FormField
                control={form.control}
                name="contenido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contenido completo de la noticia (soporta HTML básico)"
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Puedes usar HTML básico: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;a&gt;, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Status */}
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="publicado">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear Noticia"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
