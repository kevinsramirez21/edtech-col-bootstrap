import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormShell, SuccessCard } from "./form-shell";

const scrollToForm = (id: string) => {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

const consentimientos = {
  acepta_tratamiento_datos: z
    .boolean()
    .refine((v) => v === true, "Debes autorizar el tratamiento de datos para continuar"),
  acepta_comunicaciones: z.boolean(),
};

const contactoBase = {
  nombre: z.string().trim().min(2, "Ingresa tu nombre").max(120),
  correo: z.string().trim().email("Correo electrónico inválido").max(255),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(20),
};

const DEPARTAMENTOS = [
  "Risaralda",
  "Valle del Cauca",
  "Quindío",
  "Caldas",
  "Antioquia",
  "Cauca",
  "Tolima",
  "Chocó",
  "Otro",
];

function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const checked = value.includes(option);
        return (
          <label
            key={option}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:border-primary/50"
          >
            <Checkbox
              checked={checked}
              onCheckedChange={(state) =>
                onChange(state ? [...value, option] : value.filter((v) => v !== option))
              }
            />
            <span className="text-foreground">{option}</span>
          </label>
        );
      })}
    </div>
  );
}

function ConsentFields({ form }: { form: any }) {
  return (
    <div className="space-y-3">
      <FormField
        control={form.control}
        name="acepta_tratamiento_datos"
        render={({ field }) => (
          <FormItem className="flex items-start gap-3 rounded-lg border border-border p-4">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div>
              <FormLabel className="font-normal">
                Autorizo el tratamiento de mis datos personales por parte de Colombia EdTech.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="acepta_comunicaciones"
        render={({ field }) => (
          <FormItem className="flex items-start gap-3 rounded-lg border border-border p-4">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="font-normal">
              Quiero recibir información y actualizaciones de Misión Educación.
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}

async function enviarRegistro(payload: {
  tipo_registro: string;
  nombre: string;
  organizacion?: string | null;
  cargo?: string | null;
  correo: string;
  telefono?: string | null;
  departamento?: string | null;
  municipio?: string | null;
  detalle: Record<string, unknown>;
  acepta_tratamiento_datos: boolean;
  acepta_comunicaciones: boolean;
}) {
  const { error } = await supabase.from("mision_educacion_registros").insert([
    {
      ...payload,
      detalle: payload.detalle as never,
    },
  ]);
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* 1. Organización afectada                                            */
/* ------------------------------------------------------------------ */

const afectadaSchema = z.object({
  entidad: z.string().trim().min(2, "Ingresa el nombre de la entidad").max(200),
  tipo_entidad: z.string().min(1, "Selecciona el tipo de entidad"),
  cargo: z.string().trim().min(2, "Ingresa tu cargo").max(120),
  departamento: z.string().min(1, "Selecciona el departamento"),
  municipio: z.string().trim().min(2, "Ingresa el municipio").max(120),
  ...contactoBase,
  afectaciones: z.array(z.string()).min(1, "Selecciona al menos una afectación"),
  poblacion_afectada: z.string().min(1, "Selecciona un rango"),
  necesidades: z.array(z.string()).min(1, "Selecciona al menos una necesidad"),
  descripcion: z.string().trim().min(30, "Cuéntanos un poco más (mínimo 30 caracteres)").max(2000),
  ...consentimientos,
});

const AFECTACIONES = [
  "Daño en infraestructura escolar",
  "Pérdida de conectividad",
  "Pérdida de equipos o materiales",
  "Interrupción de clases",
  "Afectación socioemocional de estudiantes o docentes",
  "Desplazamiento de la comunidad educativa",
];

const NECESIDADES = [
  "Infraestructura y adecuación de espacios",
  "Conectividad y equipos",
  "Contenidos y plataformas educativas",
  "Formación docente",
  "Apoyo socioemocional",
  "Financiación",
  "Coordinación y articulación institucional",
];

export function FormOrganizacionAfectada() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const steps = ["Entidad", "Afectación", "Confirmación"];

  const form = useForm<z.infer<typeof afectadaSchema>>({
    resolver: zodResolver(afectadaSchema),
    mode: "onTouched",
    defaultValues: {
      entidad: "",
      tipo_entidad: "",
      cargo: "",
      departamento: "",
      municipio: "",
      nombre: "",
      correo: "",
      telefono: "",
      afectaciones: [],
      poblacion_afectada: "",
      necesidades: [],
      descripcion: "",
      acepta_tratamiento_datos: false,
      acepta_comunicaciones: false,
    },
  });

  const fieldsByStep: (keyof z.infer<typeof afectadaSchema>)[][] = [
    ["entidad", "tipo_entidad", "cargo", "departamento", "municipio", "nombre", "correo", "telefono"],
    ["afectaciones", "poblacion_afectada", "necesidades", "descripcion"],
    ["acepta_tratamiento_datos"],
  ];

  const next = async () => {
    const ok = await form.trigger(fieldsByStep[step]);
    if (!ok) return;
    setStep((s) => s + 1);
    scrollToForm("form-organizacion-afectada");
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    scrollToForm("form-organizacion-afectada");
  };

  const submit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await enviarRegistro({
        tipo_registro: "organizacion_afectada",
        nombre: values.nombre,
        organizacion: values.entidad,
        cargo: values.cargo,
        correo: values.correo,
        telefono: values.telefono,
        departamento: values.departamento,
        municipio: values.municipio,
        detalle: {
          tipo_entidad: values.tipo_entidad,
          afectaciones: values.afectaciones,
          poblacion_afectada: values.poblacion_afectada,
          necesidades: values.necesidades,
          descripcion: values.descripcion,
        },
        acepta_tratamiento_datos: values.acepta_tratamiento_datos,
        acepta_comunicaciones: values.acepta_comunicaciones,
      });
      setDone(true);
      scrollToForm("form-organizacion-afectada");
    } catch (error) {
      toast({
        title: "No pudimos enviar tu registro",
        description: "Intenta de nuevo en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  });

  if (done) {
    return (
      <SuccessCard
        id="form-organizacion-afectada"
        title="Registro recibido"
        message="Gracias por contarnos. Vamos a incorporar tu caso al mapeo y te contactaremos con las oportunidades y ayudas que podamos canalizar."
      />
    );
  }

  return (
    <Form {...form}>
      <FormShell
        id="form-organizacion-afectada"
        title="Hago parte de una organización afectada"
        description="Alcaldías, gobernaciones, secretarías de educación, instituciones educativas y organizaciones del territorio."
        steps={steps}
        current={step}
        isSubmitting={submitting}
        onBack={back}
        onNext={next}
        onSubmit={submit}
      >
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="entidad"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Nombre de la entidad *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Secretaría de Educación de Pereira" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo_entidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de entidad *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="alcaldia">Alcaldía</SelectItem>
                      <SelectItem value="gobernacion">Gobernación</SelectItem>
                      <SelectItem value="secretaria_educacion">Secretaría de Educación</SelectItem>
                      <SelectItem value="institucion_educativa">Institución educativa</SelectItem>
                      <SelectItem value="organizacion_social">Organización social o fundación</SelectItem>
                      <SelectItem value="otra">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu cargo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Secretario de Educación" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTAMENTOS.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
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
              name="municipio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipio *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Dosquebradas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. María Gómez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@correo.com" {...field} />
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
                  <FormLabel>Celular *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 300 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="afectaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cómo los afectó la emergencia? *</FormLabel>
                  <CheckboxGroup options={AFECTACIONES} value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="poblacion_afectada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Población estudiantil afectada *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-100">1 a 100 estudiantes</SelectItem>
                      <SelectItem value="101-500">101 a 500 estudiantes</SelectItem>
                      <SelectItem value="501-2000">501 a 2.000 estudiantes</SelectItem>
                      <SelectItem value="2001-10000">2.001 a 10.000 estudiantes</SelectItem>
                      <SelectItem value="10000+">Más de 10.000 estudiantes</SelectItem>
                      <SelectItem value="no_se">Aún no lo sabemos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="necesidades"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Necesidades prioritarias *</FormLabel>
                  <CheckboxGroup options={NECESIDADES} value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuéntanos qué pasó y qué necesitan *</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Describe la situación actual…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && <ConsentFields form={form} />}
      </FormShell>
    </Form>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Solución / territorio                                            */
/* ------------------------------------------------------------------ */

const solucionSchema = z.object({
  organizacion: z.string().trim().min(2, "Ingresa el nombre de tu organización").max(200),
  tipo_organizacion: z.string().min(1, "Selecciona el tipo de organización"),
  cargo: z.string().trim().min(2, "Ingresa tu cargo").max(120),
  ...contactoBase,
  tipos_aporte: z.array(z.string()).min(1, "Selecciona al menos un tipo de aporte"),
  cobertura: z.string().trim().min(3, "Indica la cobertura geográfica").max(200),
  descripcion: z.string().trim().min(30, "Cuéntanos un poco más (mínimo 30 caracteres)").max(2000),
  enlace: z.string().trim().max(300).optional().or(z.literal("")),
  disponibilidad: z.string().min(1, "Selecciona la disponibilidad"),
  ...consentimientos,
});

const TIPOS_APORTE = [
  "Tecnología o plataformas",
  "Contenidos educativos",
  "Formación docente",
  "Infraestructura y dotación",
  "Financiación o donaciones",
  "Logística y operación en territorio",
  "Voluntariado corporativo",
  "Investigación y datos",
];

export function FormSolucionTerritorio() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const steps = ["Organización", "Aporte", "Confirmación"];

  const form = useForm<z.infer<typeof solucionSchema>>({
    resolver: zodResolver(solucionSchema),
    mode: "onTouched",
    defaultValues: {
      organizacion: "",
      tipo_organizacion: "",
      cargo: "",
      nombre: "",
      correo: "",
      telefono: "",
      tipos_aporte: [],
      cobertura: "",
      descripcion: "",
      enlace: "",
      disponibilidad: "",
      acepta_tratamiento_datos: false,
      acepta_comunicaciones: false,
    },
  });

  const fieldsByStep: (keyof z.infer<typeof solucionSchema>)[][] = [
    ["organizacion", "tipo_organizacion", "cargo", "nombre", "correo", "telefono"],
    ["tipos_aporte", "cobertura", "descripcion", "disponibilidad"],
    ["acepta_tratamiento_datos"],
  ];

  const next = async () => {
    const ok = await form.trigger(fieldsByStep[step]);
    if (!ok) return;
    setStep((s) => s + 1);
    scrollToForm("form-solucion-territorio");
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    scrollToForm("form-solucion-territorio");
  };

  const submit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await enviarRegistro({
        tipo_registro: "solucion_territorio",
        nombre: values.nombre,
        organizacion: values.organizacion,
        cargo: values.cargo,
        correo: values.correo,
        telefono: values.telefono,
        detalle: {
          tipo_organizacion: values.tipo_organizacion,
          tipos_aporte: values.tipos_aporte,
          cobertura: values.cobertura,
          descripcion: values.descripcion,
          enlace: values.enlace || null,
          disponibilidad: values.disponibilidad,
        },
        acepta_tratamiento_datos: values.acepta_tratamiento_datos,
        acepta_comunicaciones: values.acepta_comunicaciones,
      });
      setDone(true);
      scrollToForm("form-solucion-territorio");
    } catch (error) {
      toast({
        title: "No pudimos enviar tu registro",
        description: "Intenta de nuevo en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  });

  if (done) {
    return (
      <SuccessCard
        id="form-solucion-territorio"
        title="Gracias por sumarte"
        message="Registramos tu solución. Te contactaremos para conectarla con las necesidades que estamos mapeando en el territorio."
      />
    );
  }

  return (
    <Form {...form}>
      <FormShell
        id="form-solucion-territorio"
        title="Tengo una solución o estoy trabajando en territorio"
        description="Empresas EdTech, fundaciones, universidades e iniciativas que ya están aportando o pueden aportar."
        steps={steps}
        current={step}
        isSubmitting={submitting}
        onBack={back}
        onNext={next}
        onSubmit={submit}
      >
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="organizacion"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Organización *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu organización" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo_organizacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de organización *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="edtech">Empresa EdTech</SelectItem>
                      <SelectItem value="empresa">Empresa de otro sector</SelectItem>
                      <SelectItem value="fundacion">Fundación u ONG</SelectItem>
                      <SelectItem value="universidad">Universidad o centro de investigación</SelectItem>
                      <SelectItem value="colectivo">Colectivo o iniciativa ciudadana</SelectItem>
                      <SelectItem value="otra">Otra</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu cargo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Directora de impacto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@correo.com" {...field} />
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
                  <FormLabel>Celular *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 300 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="tipos_aporte"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Con qué pueden aportar? *</FormLabel>
                  <CheckboxGroup options={TIPOS_APORTE} value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="cobertura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cobertura geográfica *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nacional, regional, municipio…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disponibilidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponibilidad *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inmediata">Inmediata</SelectItem>
                        <SelectItem value="1_3_meses">En 1 a 3 meses</SelectItem>
                        <SelectItem value="mediano_plazo">A mediano plazo</SelectItem>
                        <SelectItem value="ya_operando">Ya estamos operando en territorio</SelectItem>
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
                  <FormLabel>Describe la solución o el trabajo que están haciendo *</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="¿Qué hacen, a quién llega y cómo puede ayudar?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enlace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && <ConsentFields form={form} />}
      </FormShell>
    </Form>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Aportar tiempo                                                   */
/* ------------------------------------------------------------------ */

const tiempoSchema = z.object({
  ...contactoBase,
  ciudad: z.string().trim().min(2, "Ingresa tu ciudad").max(120),
  ocupacion: z.string().trim().min(2, "Ingresa tu perfil u ocupación").max(160),
  horas_semanales: z.string().min(1, "Selecciona tu disponibilidad"),
  areas: z.array(z.string()).min(1, "Selecciona al menos un área"),
  experiencia: z.string().trim().max(1500).optional().or(z.literal("")),
  motivacion: z.string().trim().min(30, "Cuéntanos un poco más (mínimo 30 caracteres)").max(1500),
  ...consentimientos,
});

const AREAS_VOLUNTARIADO = [
  "Mapeo y levantamiento de información",
  "Conexión con aliados y organizaciones",
  "Comunicaciones y contenidos",
  "Formación y acompañamiento docente",
  "Gestión de proyectos",
  "Datos e investigación",
  "Logística en territorio",
];

export function FormAportarTiempo() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const steps = ["Tus datos", "Tu aporte", "Confirmación"];

  const form = useForm<z.infer<typeof tiempoSchema>>({
    resolver: zodResolver(tiempoSchema),
    mode: "onTouched",
    defaultValues: {
      nombre: "",
      correo: "",
      telefono: "",
      ciudad: "",
      ocupacion: "",
      horas_semanales: "",
      areas: [],
      experiencia: "",
      motivacion: "",
      acepta_tratamiento_datos: false,
      acepta_comunicaciones: false,
    },
  });

  const fieldsByStep: (keyof z.infer<typeof tiempoSchema>)[][] = [
    ["nombre", "correo", "telefono", "ciudad", "ocupacion"],
    ["horas_semanales", "areas", "motivacion"],
    ["acepta_tratamiento_datos"],
  ];

  const next = async () => {
    const ok = await form.trigger(fieldsByStep[step]);
    if (!ok) return;
    setStep((s) => s + 1);
    scrollToForm("form-aportar-tiempo");
  };

  const back = () => {
    setStep((s) => Math.max(0, s - 1));
    scrollToForm("form-aportar-tiempo");
  };

  const submit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await enviarRegistro({
        tipo_registro: "voluntario_tiempo",
        nombre: values.nombre,
        correo: values.correo,
        telefono: values.telefono,
        municipio: values.ciudad,
        detalle: {
          ocupacion: values.ocupacion,
          horas_semanales: values.horas_semanales,
          areas: values.areas,
          experiencia: values.experiencia || null,
          motivacion: values.motivacion,
        },
        acepta_tratamiento_datos: values.acepta_tratamiento_datos,
        acepta_comunicaciones: values.acepta_comunicaciones,
      });
      setDone(true);
      scrollToForm("form-aportar-tiempo");
    } catch (error) {
      toast({
        title: "No pudimos enviar tu registro",
        description: "Intenta de nuevo en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  });

  if (done) {
    return (
      <SuccessCard
        id="form-aportar-tiempo"
        title="¡Bienvenido a la misión!"
        message="Gracias por donar tu tiempo. Te escribiremos para contarte en qué frente puedes empezar a aportar."
      />
    );
  }

  return (
    <Form {...form}>
      <FormShell
        id="form-aportar-tiempo"
        title="Quiero aportar mi tiempo"
        description="Personas que quieren acompañar, conectar y sumar su talento a la respuesta educativa."
        steps={steps}
        current={step}
        isSubmitting={submitting}
        onBack={back}
        onNext={next}
        onSubmit={submit}
      >
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Ana Rodríguez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@correo.com" {...field} />
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
                  <FormLabel>Celular *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 300 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Manizales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ocupacion"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Perfil u ocupación *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Docente, diseñadora, ingeniero de datos…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="horas_semanales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas semanales disponibles *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-3">1 a 3 horas</SelectItem>
                      <SelectItem value="4-6">4 a 6 horas</SelectItem>
                      <SelectItem value="7-10">7 a 10 horas</SelectItem>
                      <SelectItem value="10+">Más de 10 horas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿En qué áreas puedes ayudar? *</FormLabel>
                  <CheckboxGroup options={AREAS_VOLUNTARIADO} value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experiencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiencia relevante (opcional)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Cuéntanos brevemente tu experiencia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motivacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Por qué quieres sumarte? *</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Tu motivación" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && <ConsentFields form={form} />}
      </FormShell>
    </Form>
  );
}
