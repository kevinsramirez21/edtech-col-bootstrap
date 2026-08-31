export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      asociados: {
        Row: {
          acepta_uso_datos: boolean | null
          calificacion_colombia_edtech: number | null
          cargo_contacto: string | null
          correo_contacto: string | null
          created_at: string
          descripcion: string | null
          estado: Database["public"]["Enums"]["membership_status"]
          fecha_fundacion: string | null
          fecha_ingreso: string
          id: string
          linkedin: string | null
          logo_url: string | null
          motivo_asociarse: string | null
          nombre_contacto: string | null
          nombre_empresa: string
          pagina_web: string | null
          segmento: Database["public"]["Enums"]["company_segment"] | null
          servicios: string[] | null
          tamano_empresa: Database["public"]["Enums"]["company_size"] | null
          telefono: string | null
          tipo_membresia: string | null
          tipo_organizacion: string | null
          twitter: string | null
          ubicacion: string | null
          updated_at: string
        }
        Insert: {
          acepta_uso_datos?: boolean | null
          calificacion_colombia_edtech?: number | null
          cargo_contacto?: string | null
          correo_contacto?: string | null
          created_at?: string
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["membership_status"]
          fecha_fundacion?: string | null
          fecha_ingreso?: string
          id?: string
          linkedin?: string | null
          logo_url?: string | null
          motivo_asociarse?: string | null
          nombre_contacto?: string | null
          nombre_empresa: string
          pagina_web?: string | null
          segmento?: Database["public"]["Enums"]["company_segment"] | null
          servicios?: string[] | null
          tamano_empresa?: Database["public"]["Enums"]["company_size"] | null
          telefono?: string | null
          tipo_membresia?: string | null
          tipo_organizacion?: string | null
          twitter?: string | null
          ubicacion?: string | null
          updated_at?: string
        }
        Update: {
          acepta_uso_datos?: boolean | null
          calificacion_colombia_edtech?: number | null
          cargo_contacto?: string | null
          correo_contacto?: string | null
          created_at?: string
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["membership_status"]
          fecha_fundacion?: string | null
          fecha_ingreso?: string
          id?: string
          linkedin?: string | null
          logo_url?: string | null
          motivo_asociarse?: string | null
          nombre_contacto?: string | null
          nombre_empresa?: string
          pagina_web?: string | null
          segmento?: Database["public"]["Enums"]["company_segment"] | null
          servicios?: string[] | null
          tamano_empresa?: Database["public"]["Enums"]["company_size"] | null
          telefono?: string | null
          tipo_membresia?: string | null
          tipo_organizacion?: string | null
          twitter?: string | null
          ubicacion?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      asociados_enrichment: {
        Row: {
          aprobado: boolean | null
          asociado_id: string
          campo: string
          confianza: string | null
          created_at: string | null
          fuente: string | null
          id: string
          updated_at: string | null
          valor_actual: string | null
          valor_sugerido: string | null
          verificado: boolean | null
        }
        Insert: {
          aprobado?: boolean | null
          asociado_id: string
          campo: string
          confianza?: string | null
          created_at?: string | null
          fuente?: string | null
          id?: string
          updated_at?: string | null
          valor_actual?: string | null
          valor_sugerido?: string | null
          verificado?: boolean | null
        }
        Update: {
          aprobado?: boolean | null
          asociado_id?: string
          campo?: string
          confianza?: string | null
          created_at?: string | null
          fuente?: string | null
          id?: string
          updated_at?: string | null
          valor_actual?: string | null
          valor_sugerido?: string | null
          verificado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "asociados_enrichment_asociado_id_fkey"
            columns: ["asociado_id"]
            isOneToOne: false
            referencedRelation: "asociados"
            referencedColumns: ["id"]
          },
        ]
      }
      asociados_feedback: {
        Row: {
          asociado_id: string
          contexto_usado: boolean | null
          created_at: string | null
          id: string
          mensaje: string
          rol: string
        }
        Insert: {
          asociado_id: string
          contexto_usado?: boolean | null
          created_at?: string | null
          id?: string
          mensaje: string
          rol: string
        }
        Update: {
          asociado_id?: string
          contexto_usado?: boolean | null
          created_at?: string | null
          id?: string
          mensaje?: string
          rol?: string
        }
        Relationships: [
          {
            foreignKeyName: "asociados_feedback_asociado_id_fkey"
            columns: ["asociado_id"]
            isOneToOne: false
            referencedRelation: "asociados"
            referencedColumns: ["id"]
          },
        ]
      }
      ciclos_voluntariado: {
        Row: {
          activo: boolean
          created_at: string
          id: string
          lider_nombre: string | null
          nombre: string
          updated_at: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          id?: string
          lider_nombre?: string | null
          nombre: string
          updated_at?: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          id?: string
          lider_nombre?: string | null
          nombre?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          subscribed: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          subscribed?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          subscribed?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      noticias: {
        Row: {
          autor: string | null
          categoria: string
          contenido: string | null
          created_at: string
          destacada: boolean
          es_externo: boolean
          estado: string
          extracto: string | null
          fecha_publicacion: string | null
          fuente: string | null
          id: string
          imagen_portada: string | null
          slug: string
          titulo: string
          updated_at: string
          url_externa: string | null
        }
        Insert: {
          autor?: string | null
          categoria?: string
          contenido?: string | null
          created_at?: string
          destacada?: boolean
          es_externo?: boolean
          estado?: string
          extracto?: string | null
          fecha_publicacion?: string | null
          fuente?: string | null
          id?: string
          imagen_portada?: string | null
          slug: string
          titulo: string
          updated_at?: string
          url_externa?: string | null
        }
        Update: {
          autor?: string | null
          categoria?: string
          contenido?: string | null
          created_at?: string
          destacada?: boolean
          es_externo?: boolean
          estado?: string
          extracto?: string | null
          fecha_publicacion?: string | null
          fuente?: string | null
          id?: string
          imagen_portada?: string | null
          slug?: string
          titulo?: string
          updated_at?: string
          url_externa?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          organization: string | null
          position: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization?: string | null
          position?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          organization?: string | null
          position?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      responsables_ciclo: {
        Row: {
          ciclo_id: string
          created_at: string
          id: string
          nombre: string
          updated_at: string
        }
        Insert: {
          ciclo_id: string
          created_at?: string
          id?: string
          nombre: string
          updated_at?: string
        }
        Update: {
          ciclo_id?: string
          created_at?: string
          id?: string
          nombre?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "responsables_ciclo_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos_voluntariado"
            referencedColumns: ["id"]
          },
        ]
      }
      solicitudes_aliados: {
        Row: {
          acepta_comunicaciones: boolean
          acepta_tratamiento_datos: boolean
          beneficios_esperados: string[]
          cargo_representante: string
          ciudad: string
          correo_contacto: string
          created_at: string
          estado: string
          explicaciones_adicionales: string | null
          formas_alianza: string[]
          id: string
          motivo_interes: string
          nombre_entidad: string
          objetivo_alianza: string
          otras_formas_alianza: string | null
          pais: string
          representante: string
          telefono: string
          tipo_entidad: string
          updated_at: string
        }
        Insert: {
          acepta_comunicaciones?: boolean
          acepta_tratamiento_datos?: boolean
          beneficios_esperados: string[]
          cargo_representante: string
          ciudad: string
          correo_contacto: string
          created_at?: string
          estado?: string
          explicaciones_adicionales?: string | null
          formas_alianza: string[]
          id?: string
          motivo_interes: string
          nombre_entidad: string
          objetivo_alianza: string
          otras_formas_alianza?: string | null
          pais: string
          representante: string
          telefono: string
          tipo_entidad: string
          updated_at?: string
        }
        Update: {
          acepta_comunicaciones?: boolean
          acepta_tratamiento_datos?: boolean
          beneficios_esperados?: string[]
          cargo_representante?: string
          ciudad?: string
          correo_contacto?: string
          created_at?: string
          estado?: string
          explicaciones_adicionales?: string | null
          formas_alianza?: string[]
          id?: string
          motivo_interes?: string
          nombre_entidad?: string
          objetivo_alianza?: string
          otras_formas_alianza?: string | null
          pais?: string
          representante?: string
          telefono?: string
          tipo_entidad?: string
          updated_at?: string
        }
        Relationships: []
      }
      solicitudes_voluntarios: {
        Row: {
          acepta_comunicaciones: boolean
          acepta_terminos: boolean
          anios_experiencia: string | null
          aporte_equipo: string | null
          area_liderazgo: string | null
          areas_interes: string[]
          ciclo_id: string | null
          ciudad: string
          como_conocio: string | null
          confirma_horas: boolean
          confirma_no_remunerado: boolean
          confirma_video: boolean
          correo_electronico: string
          created_at: string
          duracion_compromiso: string | null
          equipo_principal: string | null
          equipo_secundario: string | null
          estado: string
          estado_actual: string | null
          estado_proceso: string
          expectativas: string | null
          experiencia_area: string | null
          experiencia_voluntariado: string | null
          habilidades_equipo: string[] | null
          horas_semanales: string
          id: string
          interes_liderazgo: string | null
          linkedin: string | null
          motivacion: string
          nombre_completo: string
          ocupacion: string | null
          organizacion: string | null
          pais: string
          responsable_id: string | null
          sobre_ti: string | null
          telefono: string
          trabaja_edtech: string | null
          universidad_programa: string | null
          updated_at: string
          varita_magica: string | null
        }
        Insert: {
          acepta_comunicaciones?: boolean
          acepta_terminos?: boolean
          anios_experiencia?: string | null
          aporte_equipo?: string | null
          area_liderazgo?: string | null
          areas_interes?: string[]
          ciclo_id?: string | null
          ciudad: string
          como_conocio?: string | null
          confirma_horas?: boolean
          confirma_no_remunerado?: boolean
          confirma_video?: boolean
          correo_electronico: string
          created_at?: string
          duracion_compromiso?: string | null
          equipo_principal?: string | null
          equipo_secundario?: string | null
          estado?: string
          estado_actual?: string | null
          estado_proceso?: string
          expectativas?: string | null
          experiencia_area?: string | null
          experiencia_voluntariado?: string | null
          habilidades_equipo?: string[] | null
          horas_semanales: string
          id?: string
          interes_liderazgo?: string | null
          linkedin?: string | null
          motivacion: string
          nombre_completo: string
          ocupacion?: string | null
          organizacion?: string | null
          pais?: string
          responsable_id?: string | null
          sobre_ti?: string | null
          telefono: string
          trabaja_edtech?: string | null
          universidad_programa?: string | null
          updated_at?: string
          varita_magica?: string | null
        }
        Update: {
          acepta_comunicaciones?: boolean
          acepta_terminos?: boolean
          anios_experiencia?: string | null
          aporte_equipo?: string | null
          area_liderazgo?: string | null
          areas_interes?: string[]
          ciclo_id?: string | null
          ciudad?: string
          como_conocio?: string | null
          confirma_horas?: boolean
          confirma_no_remunerado?: boolean
          confirma_video?: boolean
          correo_electronico?: string
          created_at?: string
          duracion_compromiso?: string | null
          equipo_principal?: string | null
          equipo_secundario?: string | null
          estado?: string
          estado_actual?: string | null
          estado_proceso?: string
          expectativas?: string | null
          experiencia_area?: string | null
          experiencia_voluntariado?: string | null
          habilidades_equipo?: string[] | null
          horas_semanales?: string
          id?: string
          interes_liderazgo?: string | null
          linkedin?: string | null
          motivacion?: string
          nombre_completo?: string
          ocupacion?: string | null
          organizacion?: string | null
          pais?: string
          responsable_id?: string | null
          sobre_ti?: string | null
          telefono?: string
          trabaja_edtech?: string | null
          universidad_programa?: string | null
          updated_at?: string
          varita_magica?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "solicitudes_voluntarios_ciclo_id_fkey"
            columns: ["ciclo_id"]
            isOneToOne: false
            referencedRelation: "ciclos_voluntariado"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "solicitudes_voluntarios_responsable_id_fkey"
            columns: ["responsable_id"]
            isOneToOne: false
            referencedRelation: "responsables_ciclo"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_public_associate_fields: {
        Args: never
        Returns: {
          calificacion_colombia_edtech: number
          correo_contacto: string
          descripcion: string
          fecha_ingreso: string
          id: string
          linkedin: string
          logo_url: string
          nombre_empresa: string
          pagina_web: string
          segmento: Database["public"]["Enums"]["company_segment"]
          servicios: string[]
          tamano_empresa: Database["public"]["Enums"]["company_size"]
          tipo_organizacion: string
          twitter: string
          ubicacion: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "visitante" | "administrador" | "asociado"
      company_segment:
        | "educacion_basica"
        | "educacion_superior"
        | "capacitacion_empresarial"
        | "educacion_continua"
        | "edtech_tools"
        | "infrastructure"
        | "other"
      company_size: "startup" | "pequena" | "mediana" | "grande"
      membership_status: "activo" | "inactivo" | "pendiente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["visitante", "administrador", "asociado"],
      company_segment: [
        "educacion_basica",
        "educacion_superior",
        "capacitacion_empresarial",
        "educacion_continua",
        "edtech_tools",
        "infrastructure",
        "other",
      ],
      company_size: ["startup", "pequena", "mediana", "grande"],
      membership_status: ["activo", "inactivo", "pendiente"],
    },
  },
} as const
