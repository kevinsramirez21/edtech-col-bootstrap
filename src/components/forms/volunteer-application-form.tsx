import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send, CheckCircle, ArrowLeft, ArrowRight, Handshake, Users, Megaphone, FlaskConical } from "lucide-react";

const equipos = [
  {
    value: "alianzas",
    label: "Alianzas estratégicas",
    description: "Eventos, proyectos y atracción de asociados",
    icon: Handshake,
    habilidades: [
      { value: "relacionamiento", label: "Relacionamiento institucional" },
      { value: "eventos", label: "Producción de eventos" },
      { value: "patrocinios", label: "Ventas y patrocinios" },
      { value: "proyectos", label: "Gestión de proyectos" },
    ],
  },
  {
    value: "talent",
    label: "Talent Management",
    description: "Talento humano, atracción y retención de voluntarios",
    icon: Users,
    habilidades: [
      { value: "reclutamiento", label: "Reclutamiento y selección" },
      { value: "onboarding", label: "Onboarding y cultura" },
      { value: "formacion", label: "Formación y desarrollo" },
      { value: "bienestar", label: "Bienestar y retención" },
    ],
  },
  {
    value: "comunicaciones",
    label: "Comunicaciones",
    description: "Redes sociales, comunicación estratégica, edición y contenido",
    icon: Megaphone,
    habilidades: [
      { value: "redes", label: "Redes sociales" },
      { value: "copywriting", label: "Copywriting" },
      { value: "diseno", label: "Diseño gráfico" },
      { value: "video", label: "Video y edición" },
      { value: "prensa", label: "Prensa y vocería" },
    ],
  },
  {
    value: "investigacion",
    label: "Investigación",
    description: "Gestión y creación de conocimiento",
    icon: FlaskConical,
    habilidades: [
      { value: "literatura", label: "Revisión de literatura" },
      { value: "cuantitativa", label: "Metodología cuantitativa" },
      { value: "cualitativa", label: "Metodología cualitativa" },
      { value: "redaccion", label: "Redacción académica" },
      { value: "datos", label: "Análisis de datos" },
    ],
  },
] as const;

const formSchema = z.object({
  // Paso 1
  nombre_completo: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "El nombre es muy largo"),
  correo_electronico: z.string().trim().email("Correo electrónico inválido").max(255, "Correo muy largo"),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(20, "Teléfono inválido"),
  ciudad: z.string().trim().min(2, "Ingresa tu ciudad").max(100, "Ciudad inválida"),
  pais: z.string().trim().min(2, "Ingresa tu país").max(100, "País inválido"),
  linkedin: z.string().trim().url("URL inválida").max(255, "URL muy larga"),
  sobre_ti: z.string().trim().min(50, "Cuéntanos un poco más (mínimo 50 caracteres)").max(1000, "Texto muy largo"),
  // Paso 2
  estado_actual: z.string().min(1, "Selecciona una opción"),
  universidad_programa: z.string().trim().max(200, "Texto muy largo").optional(),
  organizacion: z.string().trim().max(200, "Texto muy largo").optional(),
  ocupacion: z.string().trim().max(150, "Texto muy largo").optional(),
  trabaja_edtech: z.string().min(1, "Selecciona una opción"),
  anios_experiencia: z.string().min(1, "Selecciona una opción"),
  // Paso 3
  equipo_principal: z.string().min(1, "Selecciona un equipo"),
  equipo_secundario: z.string().optional(),
  habilidades_equipo: z.array(z.string()).min(1, "Selecciona al menos una habilidad"),
  experiencia_area: z.string().trim().max(1000, "Texto muy largo").optional(),
  // Paso 4
  motivacion: z.string().trim().min(75, "Mínimo 75 caracteres").max(1500, "Texto muy largo"),
  expectativas: z.string().trim().min(75, "Mínimo 75 caracteres").max(1500, "Texto muy largo"),
  aporte_equipo: z.string().trim().min(75, "Mínimo 75 caracteres").max(1500, "Texto muy largo"),
  varita_magica: z.string().trim().min(75, "Mínimo 75 caracteres").max(1500, "Texto muy largo"),
  // Paso 5
  horas_semanales: z.string().min(1, "Selecciona las horas disponibles"),
  duracion_compromiso: z.string().min(1, "Selecciona una opción"),
  interes_liderazgo: z.string().min(1, "Selecciona una opción"),
  area_liderazgo: z.string().trim().max(500, "Texto muy largo").optional(),
  como_conocio: z.string().trim().max(200, "Texto muy largo").optional(),
  // Paso 6
  confirma_video: z.boolean().refine((v) => v === true, "Debes confirmar para continuar"),
  confirma_no_remunerado: z.boolean().refine((v) => v === true, "Debes confirmar para continuar"),
  confirma_horas: z.boolean().refine((v) => v === true, "Debes confirmar para continuar"),
  acepta_terminos: z.boolean().refine((v) => v === true, "Debes aceptar los términos para continuar"),
  acepta_comunicaciones: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const horasOptions = [
  { value: "4-6", label: "4-6 horas por semana" },
  { value: "6-8", label: "6-8 horas por semana" },
  { value: "8-10", label: "8-10 horas por semana" },
  { value: "10+", label: "10+ horas por semana" },
];

const duracionOptions = [
  { value: "3", label: "3 meses" },
  { value: "6", label: "6 meses" },
  { value: "12+", label: "12 meses o más" },
];

const experienciaOptions = [
  { value: "0-2", label: "0-2 años" },
  { value: "3-5", label: "3-5 años" },
  { value: "6-10", label: "6-10 años" },
  { value: "10+", label: "Más de 10 años" },
];

const steps: { title: string; description: string; fields: (keyof FormValues)[] }[] = [
  {
    title: "Datos personales",
    description: "Cuéntanos quién eres y cómo contactarte",
    fields: ["nombre_completo", "correo_electronico", "telefono", "ciudad", "pais", "linkedin", "sobre_ti"],
  },
  {
    title: "Perfil académico y profesional",
    description: "Tu momento actual y experiencia",
    fields: ["estado_actual", "universidad_programa", "organizacion", "ocupacion", "trabaja_edtech", "anios_experiencia"],
  },
  {
    title: "Equipo de voluntariado",
    description: "Dónde quieres aportar tu talento",
    fields: ["equipo_principal", "equipo_secundario", "habilidades_equipo", "experiencia_area"],
  },
  {
    title: "Motivación",
    description: "Queremos conocer tu porqué",
    fields: ["motivacion", "expectativas", "aporte_equipo", "varita_magica"],
  },
  {
    title: "Disponibilidad",
    description: "Tiempo y nivel de compromiso",
    fields: ["horas_semanales", "duracion_compromiso", "interes_liderazgo", "area_liderazgo", "como_conocio"],
  },
  {
    title: "Confirmación",
    description: "Revisa y acepta antes de enviar",
    fields: ["confirma_video", "confirma_no_remunerado", "confirma_horas", "acepta_terminos", "acepta_comunicaciones"],
  },
];

const inputClass = "border-gray-300 focus:border-[#0B47CE] placeholder:text-gray-400";

function RadioCard({ value, label, id, description }: { value: string; label: string; id: string; description?: string }) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 rounded-lg border border-gray-300 p-3 cursor-pointer hover:border-[#0B47CE] transition-colors has-[:checked]:border-[#0B47CE] has-[:checked]:bg-[#0B47CE]/5"
    >
      <RadioGroupItem value={value} id={id} className="mt-0.5" />
      <span className="flex-1">
        <span className="block text-sm font-medium text-[#0B47CE]">{label}</span>
        {description && <span className="block text-xs text-gray-500 mt-0.5">{description}</span>}
      </span>
    </label>
  );
}

export function VolunteerApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      nombre_completo: "",
      correo_electronico: "",
      telefono: "",
      ciudad: "",
      pais: "Colombia",
      linkedin: "",
      sobre_ti: "",
      estado_actual: "",
      universidad_programa: "",
      organizacion: "",
      ocupacion: "",
      trabaja_edtech: "",
      anios_experiencia: "",
      equipo_principal: "",
      equipo_secundario: "",
      habilidades_equipo: [],
      experiencia_area: "",
      motivacion: "",
      expectativas: "",
      aporte_equipo: "",
      varita_magica: "",
      horas_semanales: "",
      duracion_compromiso: "",
      interes_liderazgo: "",
      area_liderazgo: "",
      como_conocio: "",
      confirma_video: false,
      confirma_no_remunerado: false,
      confirma_horas: false,
      acepta_terminos: false,
      acepta_comunicaciones: false,
    },
  });

  const isLastStep = step === steps.length - 1;
  const estadoActual = form.watch("estado_actual");
  const equipoPrincipal = form.watch("equipo_principal");
  const interesLiderazgo = form.watch("interes_liderazgo");
  const equipoSeleccionado = equipos.find((e) => e.value === equipoPrincipal);

  const goNext = async () => {
    const valid = await form.trigger(steps[step].fields as never, { shouldFocus: true });
    if (!valid) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
    document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("solicitudes_voluntarios").insert([{
        nombre_completo: values.nombre_completo,
        correo_electronico: values.correo_electronico,
        telefono: values.telefono,
        ciudad: values.ciudad,
        pais: values.pais,
        linkedin: values.linkedin,
        sobre_ti: values.sobre_ti,
        estado_actual: values.estado_actual,
        universidad_programa: values.universidad_programa || null,
        organizacion: values.organizacion || null,
        ocupacion: values.ocupacion || null,
        trabaja_edtech: values.trabaja_edtech,
        anios_experiencia: values.anios_experiencia,
        equipo_principal: values.equipo_principal,
        equipo_secundario: values.equipo_secundario || null,
        habilidades_equipo: values.habilidades_equipo,
        areas_interes: [values.equipo_principal, ...(values.equipo_secundario ? [values.equipo_secundario] : [])],
        experiencia_area: values.experiencia_area || null,
        motivacion: values.motivacion,
        expectativas: values.expectativas,
        aporte_equipo: values.aporte_equipo,
        varita_magica: values.varita_magica,
        horas_semanales: values.horas_semanales,
        duracion_compromiso: values.duracion_compromiso,
        interes_liderazgo: values.interes_liderazgo,
        area_liderazgo: values.area_liderazgo || null,
        como_conocio: values.como_conocio || null,
        confirma_video: values.confirma_video,
        confirma_no_remunerado: values.confirma_no_remunerado,
        confirma_horas: values.confirma_horas,
        acepta_terminos: values.acepta_terminos,
        acepta_comunicaciones: values.acepta_comunicaciones,
      }]);

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "¡Solicitud enviada!",
        description: "Gracias por tu interés en ser voluntario/a. Te contactaremos pronto.",
      });
      form.reset();
      setStep(0);
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0B47CE] mb-4">¡Gracias por aplicar!</h3>
        <p className="text-lg text-[#0B47CE] mb-6">
          Hemos recibido tu solicitud de voluntariado. Nuestro equipo la revisará y te contactará pronto.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="border-[#0B47CE] text-[#0B47CE] hover:bg-[#0B47CE] hover:text-white"
        >
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#0B47CE]">
            Paso {step + 1} de {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((step + 1) / steps.length) * 100)}% completado
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-[#F73C5C] transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <h4 className="text-lg font-semibold text-[#0B47CE] mt-4">{steps[step].title}</h4>
        <p className="text-sm text-gray-500">{steps[step].description}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isLastStep) e.preventDefault();
          }}
          className="space-y-6"
        >
          {/* Paso 1 - Datos personales */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nombre_completo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">Nombre completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" {...field} className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="correo_electronico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">Correo electrónico *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@email.com" {...field} className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">Teléfono (con indicativo) *</FormLabel>
                      <FormControl>
                        <Input placeholder="+57 300 123 4567" {...field} className={inputClass} />
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
                      <FormLabel className="text-[#0B47CE]">LinkedIn *</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/tu-perfil" {...field} className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ciudad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">Ciudad *</FormLabel>
                      <FormControl>
                        <Input placeholder="Bogotá" {...field} className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">País *</FormLabel>
                      <FormControl>
                        <Input placeholder="Colombia" {...field} className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sobre_ti"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Cuéntanos sobre ti *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tu perfil, tus intereses y aquello que consideres relevante compartir."
                        className={`${inputClass} min-h-[110px]`}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Mínimo 50 caracteres.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Paso 2 - Perfil académico y profesional */}
          {step === 1 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="estado_actual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">¿Eres estudiante o trabajas actualmente? *</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="grid sm:grid-cols-3 gap-3">
                        <RadioCard value="estudiante" label="Estudiante" id="estado-estudiante" />
                        <RadioCard value="profesional" label="Profesional" id="estado-profesional" />
                        <RadioCard value="ambos" label="Ambos" id="estado-ambos" />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(estadoActual === "estudiante" || estadoActual === "ambos") && (
                <FormField
                  control={form.control}
                  name="universidad_programa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">¿De qué universidad y programa?</FormLabel>
                      <FormControl>
                        <Input placeholder="Universidad y programa académico" {...field} className={inputClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {(estadoActual === "profesional" || estadoActual === "ambos") && (
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="organizacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0B47CE]">¿En qué organización?</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de la organización" {...field} className={inputClass} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ocupacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#0B47CE]">¿Cuál es tu cargo?</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Diseñador UX, Docente..." {...field} className={inputClass} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="trabaja_edtech"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">¿Trabajas actualmente en el sector EdTech? *</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="grid sm:grid-cols-2 gap-3">
                        <RadioCard value="si" label="Sí" id="edtech-si" />
                        <RadioCard value="no" label="No" id="edtech-no" />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="anios_experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Años de experiencia en tu área *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Selecciona una opción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white z-50">
                        {experienciaOptions.map((o) => (
                          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Paso 3 - Equipo */}
          {step === 2 && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="equipo_principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">¿En qué equipo quieres participar? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                          form.setValue("habilidades_equipo", []);
                          if (form.getValues("equipo_secundario") === v) form.setValue("equipo_secundario", "");
                        }}
                        className="grid sm:grid-cols-2 gap-3"
                      >
                        {equipos.map((e) => (
                          <RadioCard
                            key={e.value}
                            value={e.value}
                            label={e.label}
                            description={e.description}
                            id={`equipo-${e.value}`}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipo_secundario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Segundo equipo de interés (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={inputClass}>
                          <SelectValue placeholder="Selecciona un equipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white z-50">
                        {equipos
                          .filter((e) => e.value !== equipoPrincipal)
                          .map((e) => (
                            <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {equipoSeleccionado && (
                <FormField
                  control={form.control}
                  name="habilidades_equipo"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">
                        ¿Qué habilidades puedes aportar en {equipoSeleccionado.label}? *
                      </FormLabel>
                      <div className="grid sm:grid-cols-2 gap-3 mt-2">
                        {equipoSeleccionado.habilidades.map((h) => (
                          <FormField
                            key={h.value}
                            control={form.control}
                            name="habilidades_equipo"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-3 rounded-lg border border-gray-300 p-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(h.value)}
                                    onCheckedChange={(checked) =>
                                      field.onChange(
                                        checked
                                          ? [...(field.value || []), h.value]
                                          : (field.value || []).filter((v) => v !== h.value)
                                      )
                                    }
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                                  {h.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="experiencia_area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Cuéntanos tu experiencia en esa área</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Proyectos, roles o logros relacionados con el equipo que elegiste."
                        className={`${inputClass} min-h-[100px]`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Paso 4 - Motivación */}
          {step === 3 && (
            <div className="space-y-5">
              {[
                { name: "motivacion" as const, label: "¿Qué te motiva a ser parte de Colombia EdTech? *", placeholder: "Comparte tu motivación genuina. ¿Por qué quieres ser parte de esto?" },
                { name: "expectativas" as const, label: "¿Qué expectativas tienes de esta experiencia? *", placeholder: "¿Qué esperas obtener? ¿Qué esperas aportar?" },
                { name: "aporte_equipo" as const, label: "¿Qué puedes aportar concretamente al equipo que elegiste? *", placeholder: "Habilidades, tiempo, red de contactos, experiencia..." },
                { name: "varita_magica" as const, label: "Si tuvieras una varita mágica para cambiar algo en la educación, ¿qué sería y por qué? *", placeholder: "Esta es LA pregunta. Sé específico y auténtico." },
              ].map((q) => (
                <FormField
                  key={q.name}
                  control={form.control}
                  name={q.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE] leading-snug">{q.label}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={q.placeholder} className={`${inputClass} min-h-[110px]`} {...field} />
                      </FormControl>
                      <FormDescription>
                        {(field.value?.length || 0)}/75 caracteres mínimos
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}

          {/* Paso 5 - Disponibilidad */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="horas_semanales"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">¿Cuántas horas por semana puedes dedicar? *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          {horasOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duracion_compromiso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">¿Por cuánto tiempo puedes comprometerte? *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={inputClass}>
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white z-50">
                          {duracionOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interes_liderazgo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">¿Te interesa un rol de liderazgo? *</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="grid sm:grid-cols-3 gap-3">
                        <RadioCard value="si" label="Sí, me interesa liderar" id="lider-si" />
                        <RadioCard value="tal_vez" label="Tal vez más adelante" id="lider-talvez" />
                        <RadioCard value="no" label="Prefiero contribuir como miembro" id="lider-no" />
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {interesLiderazgo === "si" && (
                <FormField
                  control={form.control}
                  name="area_liderazgo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#0B47CE]">¿En qué área o tema te gustaría liderar?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ejemplo: coordinar el equipo de eventos, liderar la estrategia de contenidos..."
                          className={`${inputClass} min-h-[90px]`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="como_conocio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">¿Cómo conociste Colombia EdTech?</FormLabel>
                    <FormControl>
                      <Input placeholder="Redes sociales, un amigo, un evento..." {...field} className={inputClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Paso 6 - Confirmación */}
          {step === 5 && (
            <div className="space-y-4">
              {[
                { name: "confirma_video" as const, label: "Confirmo que vi el video y entiendo el alcance del voluntariado. *" },
                { name: "confirma_no_remunerado" as const, label: "Entiendo que este es un rol voluntario y no remunerado. *" },
                { name: "confirma_horas" as const, label: "Me comprometo con las horas semanales que indiqué. *" },
                { name: "acepta_terminos" as const, label: "Acepto el tratamiento de mis datos personales según la política de privacidad. *" },
                { name: "acepta_comunicaciones" as const, label: "Quiero recibir comunicaciones de Colombia EdTech (opcional)." },
              ].map((c) => (
                <FormField
                  key={c.name}
                  control={form.control}
                  name={c.name}
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-3 rounded-lg border border-gray-300 p-4 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} className="mt-0.5" />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-normal text-gray-700 leading-relaxed cursor-pointer">
                          {c.label}
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          )}

          {/* Navegación */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-between pt-4 border-t border-gray-100">
            {step > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={goBack}
                className="border-[#0B47CE] text-[#0B47CE] hover:bg-[#0B47CE] hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            ) : (
              <span />
            )}

            {!isLastStep ? (
              <Button
                type="button"
                onClick={goNext}
                className="bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold"
              >
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    Enviar solicitud <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
