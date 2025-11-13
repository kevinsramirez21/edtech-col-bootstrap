import * as React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const associateSchema = z.object({
  nombre_empresa: z.string().min(1, "El nombre de la empresa es requerido"),
  descripcion: z.string().optional(),
  pagina_web: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  segmento: z.enum([
    "educacion_basica",
    "educacion_superior", 
    "capacitacion_empresarial",
    "educacion_continua",
    "edtech_tools",
    "infrastructure",
    "other"
  ]).optional(),
  correo_contacto: z.string().email("Debe ser un email válido").optional().or(z.literal("")),
  logo_url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  ubicacion: z.string().optional(),
  tamano_empresa: z.enum(["startup", "pequena", "mediana", "grande"]).optional(),
  estado: z.enum(["activo", "inactivo", "pendiente"]),
  tipo_membresia: z.string().optional(),
  telefono: z.string().optional(),
  linkedin: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  twitter: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  calificacion_colombia_edtech: z.number().min(1).max(5).optional(),
})

type AssociateFormData = z.infer<typeof associateSchema>

interface AssociateFormProps {
  initialData?: Partial<AssociateFormData & { servicios?: string[], calificacion_colombia_edtech?: number }>
  onSubmit: (data: AssociateFormData & { servicios: string[] }) => Promise<void>
  onCancel: () => void
  isLoading: boolean
}

const segmentOptions = [
  { value: "educacion_basica", label: "Educación Básica" },
  { value: "educacion_superior", label: "Educación Superior" },
  { value: "capacitacion_empresarial", label: "Capacitación Empresarial" },
  { value: "educacion_continua", label: "Educación Continua" },
  { value: "edtech_tools", label: "Herramientas EdTech" },
  { value: "infrastructure", label: "Infraestructura" },
  { value: "other", label: "Otros" }
]

const sizeOptions = [
  { value: "startup", label: "Startup" },
  { value: "pequena", label: "Pequeña" },
  { value: "mediana", label: "Mediana" },
  { value: "grande", label: "Grande" }
]

const statusOptions = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
  { value: "pendiente", label: "Pendiente" }
]

export function AssociateForm({ initialData, onSubmit, onCancel, isLoading }: AssociateFormProps) {
  const [servicios, setServicios] = useState<string[]>(initialData?.servicios || [])
  const [newServicio, setNewServicio] = useState("")

  const form = useForm<AssociateFormData>({
    resolver: zodResolver(associateSchema),
    defaultValues: {
      nombre_empresa: initialData?.nombre_empresa || "",
      descripcion: initialData?.descripcion || "",
      pagina_web: initialData?.pagina_web || "",
      segmento: initialData?.segmento as any,
      correo_contacto: initialData?.correo_contacto || "",
      logo_url: initialData?.logo_url || "",
      ubicacion: initialData?.ubicacion || "",
      tamano_empresa: initialData?.tamano_empresa as any,
      estado: (initialData?.estado as any) || "activo",
      tipo_membresia: initialData?.tipo_membresia || "basica",
      telefono: initialData?.telefono || "",
      linkedin: initialData?.linkedin || "",
      twitter: initialData?.twitter || "",
      calificacion_colombia_edtech: initialData?.calificacion_colombia_edtech,
    }
  })

  const handleSubmit = async (data: AssociateFormData) => {
    await onSubmit({ ...data, servicios })
  }

  const addServicio = () => {
    if (newServicio.trim() && !servicios.includes(newServicio.trim())) {
      setServicios([...servicios, newServicio.trim()])
      setNewServicio("")
    }
  }

  const removeServicio = (servicio: string) => {
    setServicios(servicios.filter(s => s !== servicio))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addServicio()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nombre_empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Empresa *</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: EdTech Solutions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo_contacto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo de Contacto</FormLabel>
                <FormControl>
                  <Input placeholder="contacto@empresa.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pagina_web"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Página Web</FormLabel>
                <FormControl>
                  <Input placeholder="https://empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="+57 300 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ubicacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input placeholder="Bogotá, Colombia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="segmento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segmento</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un segmento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {segmentOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="tamano_empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamaño de Empresa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tamaño" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="tipo_membresia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Membresía</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: básica, premium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL del Logo</FormLabel>
                <FormControl>
                  <Input placeholder="https://empresa.com/logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/company/empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="https://twitter.com/empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="calificacion_colombia_edtech"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calidad Certificada Colombia EdTech</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(value ? Number(value) : undefined)} 
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona calificación (1-5 estrellas)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">⭐ 1 estrella</SelectItem>
                    <SelectItem value="2">⭐⭐ 2 estrellas</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ 3 estrellas</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ 4 estrellas</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ 5 estrellas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe la empresa y sus servicios..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Servicios */}
        <div className="space-y-4">
          <Label>Servicios</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Agregar servicio..."
              value={newServicio}
              onChange={(e) => setNewServicio(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="button" onClick={addServicio} size="sm" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {servicios.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {servicios.map((servicio, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {servicio}
                  <button
                    type="button"
                    onClick={() => removeServicio(servicio)}
                    className="hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  )
}