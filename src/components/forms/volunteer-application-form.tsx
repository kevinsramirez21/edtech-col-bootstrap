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
import { Loader2, Send, CheckCircle } from "lucide-react";

const formSchema = z.object({
  nombre_completo: z.string().trim().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "El nombre es muy largo"),
  correo_electronico: z.string().trim().email("Correo electrónico inválido").max(255, "Correo muy largo"),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(20, "Teléfono inválido"),
  ciudad: z.string().trim().min(2, "Ingresa tu ciudad").max(100, "Ciudad inválida"),
  pais: z.string().trim().min(2, "Ingresa tu país").max(100, "País inválido"),
  ocupacion: z.string().trim().min(2, "Ingresa tu ocupación actual").max(100, "Ocupación inválida"),
  organizacion: z.string().trim().max(200, "Nombre muy largo").optional(),
  linkedin: z.string().trim().url("URL inválida").or(z.literal("")).optional(),
  horas_semanales: z.string().min(1, "Selecciona las horas disponibles"),
  areas_interes: z.array(z.string()).min(1, "Selecciona al menos un área de interés"),
  experiencia_voluntariado: z.string().trim().max(500, "Texto muy largo").optional(),
  motivacion: z.string().trim().min(20, "Cuéntanos un poco más sobre tu motivación (mínimo 20 caracteres)").max(1000, "Texto muy largo"),
  como_conocio: z.string().trim().max(200, "Texto muy largo").optional(),
  acepta_terminos: z.boolean().refine((val) => val === true, "Debes aceptar los términos para continuar"),
  acepta_comunicaciones: z.boolean(),
});

const horasOptions = [
  { value: "2-4", label: "2-4 horas por semana" },
  { value: "4-8", label: "4-8 horas por semana" },
  { value: "8-12", label: "8-12 horas por semana" },
  { value: "12+", label: "12+ horas por semana" },
];

const areasInteres = [
  { value: "comunicaciones", label: "Comunicaciones y Marketing" },
  { value: "diseno", label: "Diseño Gráfico y UX/UI" },
  { value: "desarrollo", label: "Desarrollo Web/App" },
  { value: "investigacion", label: "Investigación y Análisis" },
  { value: "contenido", label: "Creación de Contenido" },
  { value: "eventos", label: "Organización de Eventos" },
  { value: "alianzas", label: "Gestión de Alianzas" },
  { value: "educacion", label: "Formación y Capacitación" },
  { value: "estrategia", label: "Estrategia y Planeación" },
  { value: "otro", label: "Otro" },
];

export function VolunteerApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_completo: "",
      correo_electronico: "",
      telefono: "",
      ciudad: "",
      pais: "Colombia",
      ocupacion: "",
      organizacion: "",
      linkedin: "",
      horas_semanales: "",
      areas_interes: [],
      experiencia_voluntariado: "",
      motivacion: "",
      como_conocio: "",
      acepta_terminos: false,
      acepta_comunicaciones: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("solicitudes_voluntarios").insert([{
        nombre_completo: values.nombre_completo,
        correo_electronico: values.correo_electronico,
        telefono: values.telefono,
        ciudad: values.ciudad,
        pais: values.pais,
        ocupacion: values.ocupacion,
        organizacion: values.organizacion || null,
        linkedin: values.linkedin || null,
        horas_semanales: values.horas_semanales,
        areas_interes: values.areas_interes,
        experiencia_voluntariado: values.experiencia_voluntariado || null,
        motivacion: values.motivacion,
        como_conocio: values.como_conocio || null,
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#0B47CE] border-b border-[#0B47CE]/20 pb-2">
              Información Personal
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre_completo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Nombre completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre completo" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
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
                      <Input type="email" placeholder="tu@email.com" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
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
                    <FormLabel className="text-[#0B47CE]">Teléfono *</FormLabel>
                    <FormControl>
                      <Input placeholder="+57 300 123 4567" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
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
                    <FormLabel className="text-[#0B47CE]">LinkedIn (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/tu-perfil" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
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
                      <Input placeholder="Bogotá" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
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
                      <Input placeholder="Colombia" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Información Profesional */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#0B47CE] border-b border-[#0B47CE]/20 pb-2">
              Información Profesional
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ocupacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Ocupación actual *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Diseñador UX, Estudiante, Docente..." {...field} className="border-gray-300 focus:border-[#0B47CE]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="organizacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#0B47CE]">Organización/Universidad (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de tu empresa o universidad" {...field} className="border-gray-300 focus:border-[#0B47CE]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Disponibilidad y Áreas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#0B47CE] border-b border-[#0B47CE]/20 pb-2">
              Disponibilidad y Áreas de Interés
            </h4>
            
            <FormField
              control={form.control}
              name="horas_semanales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE]">¿Cuántas horas semanales puedes dedicar al voluntariado? *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:border-[#0B47CE]">
                        <SelectValue placeholder="Selecciona tu disponibilidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {horasOptions.map((option) => (
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
              name="areas_interes"
              render={() => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE]">¿En qué áreas te gustaría contribuir? *</FormLabel>
                  <FormDescription className="text-gray-500">
                    Selecciona todas las que apliquen
                  </FormDescription>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    {areasInteres.map((area) => (
                      <FormField
                        key={area.value}
                        control={form.control}
                        name="areas_interes"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(area.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, area.value])
                                    : field.onChange(field.value?.filter((value) => value !== area.value));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                              {area.label}
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
          </div>

          {/* Motivación */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#0B47CE] border-b border-[#0B47CE]/20 pb-2">
              Cuéntanos sobre ti
            </h4>
            
            <FormField
              control={form.control}
              name="experiencia_voluntariado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE]">¿Tienes experiencia previa en voluntariado? (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Cuéntanos brevemente sobre tu experiencia anterior en voluntariado, si la tienes..."
                      className="border-gray-300 focus:border-[#0B47CE] min-h-[80px]"
                      {...field} 
                    />
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
                  <FormLabel className="text-[#0B47CE]">¿Por qué quieres ser voluntario/a en Colombia EdTech? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Cuéntanos qué te motiva a unirte y cómo crees que puedes aportar..."
                      className="border-gray-300 focus:border-[#0B47CE] min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="como_conocio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE]">¿Cómo conociste Colombia EdTech? (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Redes sociales, un amigo, evento..." {...field} className="border-gray-300 focus:border-[#0B47CE]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Términos */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <FormField
              control={form.control}
              name="acepta_terminos"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-700 cursor-pointer">
                      Acepto los términos y condiciones del programa de voluntariado y el tratamiento de mis datos personales *
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
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-700 cursor-pointer">
                      Deseo recibir comunicaciones sobre eventos, oportunidades y novedades de Colombia EdTech
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold py-6 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando solicitud...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Enviar mi solicitud de voluntariado
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
