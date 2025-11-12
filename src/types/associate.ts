export interface Associate {
  id: string
  nombre_empresa: string
  descripcion?: string
  pagina_web?: string
  segmento?: "educacion_basica" | "educacion_superior" | "capacitacion_empresarial" | "educacion_continua" | "edtech_tools" | "infrastructure" | "other"
  servicios?: string[]
  correo_contacto?: string
  logo_url?: string
  ubicacion?: string
  fecha_fundacion?: string
  tamano_empresa?: "startup" | "pequena" | "mediana" | "grande"
  estado: "activo" | "inactivo" | "pendiente"
  fecha_ingreso: string
  tipo_membresia?: string
  telefono?: string
  linkedin?: string
  twitter?: string
  calificacion_colombia_edtech?: number
  created_at: string
  updated_at?: string
}

export interface CreateAssociateData {
  nombre_empresa: string
  descripcion?: string
  pagina_web?: string
  segmento?: "educacion_basica" | "educacion_superior" | "capacitacion_empresarial" | "educacion_continua" | "edtech_tools" | "infrastructure" | "other"
  servicios?: string[]
  correo_contacto?: string
  logo_url?: string
  ubicacion?: string
  fecha_fundacion?: string
  tamano_empresa?: "startup" | "pequena" | "mediana" | "grande"
  estado: "activo" | "inactivo" | "pendiente"
  tipo_membresia?: string
  telefono?: string
  linkedin?: string
  twitter?: string
  calificacion_colombia_edtech?: number
}