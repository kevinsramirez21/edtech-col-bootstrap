import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  nombre_entidad: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(200, "El nombre es muy largo"),
  tipo_entidad: z.string().min(1, "Por favor selecciona el tipo de entidad"),
  representante: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  cargo_representante: z.string().trim().min(2, "El cargo debe tener al menos 2 caracteres").max(100, "El cargo es muy largo"),
  pais: z.string().trim().min(2, "El país debe tener al menos 2 caracteres").max(100, "El país es muy largo"),
  ciudad: z.string().trim().min(2, "La ciudad debe tener al menos 2 caracteres").max(100, "La ciudad es muy larga"),
  correo_contacto: z.string().trim().email("Correo electrónico inválido").max(255, "Correo muy largo"),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(20, "Teléfono inválido"),
  formas_alianza: z.array(z.string()).min(1, "Por favor selecciona al menos una forma de alianza"),
  beneficios_esperados: z.array(z.string()).min(1, "Por favor selecciona al menos un beneficio esperado"),
  acepta_tratamiento_datos: z.boolean().refine((val) => val === true, "Debes aceptar el tratamiento de datos para continuar"),
  acepta_comunicaciones: z.boolean()
});

const formasAlianzaOpciones = [
  { id: "financiacion", label: "Financiación o donación económica" },
  { id: "donacion_productos", label: "Donación de productos, servicios o recursos" },
  { id: "capacidades_estrategicas", label: "Oferta de capacidades estratégicas (acceso a mercados, tecnología, networking)" }
];

const beneficiosEsperadosOpciones = [
  { id: "visibilidad", label: "Visibilidad/marca en el ecosistema EdTech" },
  { id: "contribucion_educativa", label: "Contribución al sector educativo" },
  { id: "incentivos_fiscales", label: "Interés en incentivos fiscales" },
  { id: "vender_servicios", label: "Interés en vender productos/servicios a EdTech" },
  { id: "impacto_social", label: "Crear impacto social y/o empresarial" }
];

export function AllyApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_entidad: "",
      tipo_entidad: "",
      representante: "",
      cargo_representante: "",
      pais: "",
      ciudad: "",
      correo_contacto: "",
      telefono: "",
      formas_alianza: [],
      beneficios_esperados: [],
      acepta_tratamiento_datos: false,
      acepta_comunicaciones: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("solicitudes_aliados").insert([{
        nombre_entidad: values.nombre_entidad,
        tipo_entidad: values.tipo_entidad,
        representante: values.representante,
        cargo_representante: values.cargo_representante,
        pais: values.pais,
        ciudad: values.ciudad,
        correo_contacto: values.correo_contacto,
        telefono: values.telefono,
        motivo_interes: "",
        objetivo_alianza: "",
        formas_alianza: values.formas_alianza,
        otras_formas_alianza: null,
        beneficios_esperados: values.beneficios_esperados,
        explicaciones_adicionales: null,
        acepta_tratamiento_datos: values.acepta_tratamiento_datos,
        acepta_comunicaciones: values.acepta_comunicaciones
      }]);

      if (error) throw error;

      toast({
        title: "¡Solicitud enviada!",
        description: "Gracias por tu interés en ser aliado. Nos pondremos en contacto pronto.",
      });

      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Datos de la organización */}
        <div className="space-y-6 bg-[#F4E8DD]/30 p-6 rounded-lg">
          <h4 className="text-xl font-bold text-[#0B47CE] border-b-2 border-[#F73C5C] pb-2">
            Datos de la organización
          </h4>

          <FormField
            control={form.control}
            name="nombre_entidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0B47CE] font-semibold">Nombre de la entidad *</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Fundación Educativa Colombia" className="placeholder:opacity-50" {...field} />
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
                <FormLabel className="text-[#0B47CE] font-semibold">Tipo de entidad *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="placeholder:opacity-50">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="publica">Pública</SelectItem>
                    <SelectItem value="privada">Privada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="representante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE] font-semibold">Nombre del representante *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: María García López" className="placeholder:opacity-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cargo_representante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE] font-semibold">Cargo del representante *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Director General" className="placeholder:opacity-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="pais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE] font-semibold">País *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Colombia" className="placeholder:opacity-50" {...field} />
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
                  <FormLabel className="text-[#0B47CE] font-semibold">Ciudad *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Bogotá" className="placeholder:opacity-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="correo_contacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0B47CE] font-semibold">Correo electrónico de contacto *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Ej: contacto@ejemplo.com" className="placeholder:opacity-50" {...field} />
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
                  <FormLabel className="text-[#0B47CE] font-semibold">Teléfono de contacto *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: +57 300 123 4567" className="placeholder:opacity-50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Formas de alianza */}
        <div className="space-y-6 bg-[#F4E8DD]/30 p-6 rounded-lg">
          <h4 className="text-xl font-bold text-[#0B47CE] border-b-2 border-[#F73C5C] pb-2">
            Forma(s) de alianza deseada(s)
          </h4>

          <FormField
            control={form.control}
            name="formas_alianza"
            render={() => (
              <FormItem>
                <FormLabel className="text-[#0B47CE] font-semibold">Selecciona al menos una opción *</FormLabel>
                <div className="space-y-3">
                  {formasAlianzaOpciones.map((opcion) => (
                    <FormField
                      key={opcion.id}
                      control={form.control}
                      name="formas_alianza"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0 bg-white p-3 rounded border border-[#0B47CE]/10 hover:border-[#0B47CE]/30 transition-colors">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(opcion.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, opcion.id])
                                  : field.onChange(field.value?.filter((value) => value !== opcion.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-[#0B47CE] cursor-pointer leading-snug">
                            {opcion.label}
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

        {/* Beneficios esperados */}
        <div className="space-y-6 bg-white border-2 border-[#0B47CE]/20 p-6 rounded-lg">
          <h4 className="text-xl font-bold text-[#0B47CE] border-b-2 border-[#F73C5C] pb-2">
            Beneficios esperados
          </h4>

          <FormField
            control={form.control}
            name="beneficios_esperados"
            render={() => (
              <FormItem>
                <FormLabel className="text-[#0B47CE] font-semibold">Selecciona al menos una opción *</FormLabel>
                <div className="space-y-3">
                  {beneficiosEsperadosOpciones.map((opcion) => (
                    <FormField
                      key={opcion.id}
                      control={form.control}
                      name="beneficios_esperados"
                      render={({ field }) => (
                        <FormItem className="flex items-start space-x-3 space-y-0 bg-[#F4E8DD]/20 p-3 rounded border border-[#0B47CE]/10 hover:border-[#0B47CE]/30 transition-colors">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(opcion.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, opcion.id])
                                  : field.onChange(field.value?.filter((value) => value !== opcion.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-[#0B47CE] cursor-pointer leading-snug">
                            {opcion.label}
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

        {/* Consentimientos */}
        <div className="space-y-6 bg-[#F4E8DD]/30 p-6 rounded-lg">
          <h4 className="text-xl font-bold text-[#0B47CE] border-b-2 border-[#F73C5C] pb-2">
            Consentimientos
          </h4>

          <FormField
            control={form.control}
            name="acepta_tratamiento_datos"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-4 rounded border-2 border-[#0B47CE]/20">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#0B47CE] cursor-pointer font-semibold">
                    Acepto el tratamiento de mis datos personales *
                  </FormLabel>
                  <FormDescription className="text-sm text-[#0B47CE]/70">
                    Tus datos serán utilizados únicamente para procesar tu solicitud de alianza
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acepta_comunicaciones"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 bg-white p-4 rounded border-2 border-[#0B47CE]/20">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#0B47CE] cursor-pointer font-semibold">
                    Acepto recibir comunicaciones de Colombia EdTech
                  </FormLabel>
                  <FormDescription className="text-sm text-[#0B47CE]/70">
                    Información sobre eventos, noticias y oportunidades del ecosistema
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold text-lg py-6"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Enviando solicitud...
            </>
          ) : (
            "Enviar solicitud"
          )}
        </Button>
      </form>
    </Form>
  );
}
