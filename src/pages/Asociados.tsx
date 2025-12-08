import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { LogoGrid } from "@/components/ui/logo-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Network, Award, BookOpen, Users, Target, TrendingUp, Users2, Globe, Building2, GraduationCap, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Image paths - using public folder for better performance
const eventoAsociadosImg = "/images/evento-edtech-fondo.jpg";
const eventoPonenteImg = "/images/asamblea-evento-ponente.jpg";
const eventoAudienciaImg = "/images/asamblea-evento-audiencia.jpg";
const angelaAndradeImg = "/images/testimonios/angela-andrade-v2.png";
const santiagoCarrilloImg = "/images/testimonios/santiago-carrillo.png";
const oscarIvanImg = "/images/testimonios/oscar-ivan-rodriguez.png";

const formSchema = z.object({
  nombre_empresa: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(200, "El nombre es muy largo"),
  tipo_organizacion: z.string().min(1, "Por favor selecciona el tipo de organización"),
  nombre_contacto: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  cargo_contacto: z.string().trim().min(2, "El cargo debe tener al menos 2 caracteres").max(100, "El cargo es muy largo"),
  telefono: z.string().trim().min(7, "Teléfono inválido").max(20, "Teléfono inválido"),
  correo_contacto: z.string().trim().email("Correo electrónico inválido").max(255, "Correo muy largo"),
  pagina_web: z.string().trim().url("URL inválida").or(z.literal("")).optional(),
  descripcion: z.string().trim().min(20, "Por favor describe tu organización (mínimo 20 caracteres)").max(1000, "La descripción es muy larga"),
  motivo_asociarse: z.string().trim().min(20, "Por favor explica tu motivación (mínimo 20 caracteres)").max(1000, "El texto es muy largo"),
  acepta_uso_datos: z.boolean().refine((val) => val === true, "Debes aceptar el uso de datos para continuar")
});

const Asociados = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_empresa: "",
      tipo_organizacion: "",
      nombre_contacto: "",
      cargo_contacto: "",
      telefono: "",
      correo_contacto: "",
      pagina_web: "",
      descripcion: "",
      motivo_asociarse: "",
      acepta_uso_datos: false
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("asociados").insert([{
        nombre_empresa: values.nombre_empresa,
        tipo_organizacion: values.tipo_organizacion,
        nombre_contacto: values.nombre_contacto,
        cargo_contacto: values.cargo_contacto,
        telefono: values.telefono,
        correo_contacto: values.correo_contacto,
        pagina_web: values.pagina_web || null,
        descripcion: values.descripcion,
        motivo_asociarse: values.motivo_asociarse,
        acepta_uso_datos: values.acepta_uso_datos,
        estado: "activo"
      }]);

      if (error) throw error;

      toast({
        title: "¡Solicitud enviada!",
        description: "Gracias por tu interés. Nos pondremos en contacto pronto.",
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
  const meta = generatePageMeta({
    title: "Asociados",
    description: "Si eres una organización que transforma la educación con tecnología, únete a Colombia EdTech. Red de contactos, visibilidad y articulación con el Estado"
  });
  const breadcrumbLd = generateBreadcrumbJsonLd([{
    name: "Asociados",
    item: `${window.location.origin}/asociados`
  }]);
  const handleAssociateClick = () => {
    trackCTA(GA_EVENTS.CTA_ASSOCIATE_CLICK, 'asociados_cta');
  };
  const beneficios = [{
    icon: Network,
    title: "Red de Contactos estratégica",
    description: "Accede a una comunidad de líderes y aliados, generando oportunidades de negocio, colaboración y crecimiento en el sector EdTech."
  }, {
    icon: Award,
    title: "Visibilidad y respaldo de una marca de confianza",
    description: "Destaca tu organización en eventos y medios de alto alcance, potenciando tu impacto y reputación ante usuarios, donantes e inversionistas."
  }, {
    icon: Building2,
    title: "Articulación con el estado",
    description: "Facilitamos el vínculo con entidades gubernamentales para impulsar proyectos educativos disruptivos y participar en iniciativas públicas transformadoras."
  }, {
    icon: Users,
    title: "Participación en proyectos colaborativos",
    description: "Impulsa soluciones junto a otros asociados, presentando proyectos conjuntos y aprovechando fortalezas compartidas para lograr resultados reales."
  }, {
    icon: BookOpen,
    title: "Biblioteca de recursos relevantes y actualizados.",
    description: "Disfruta acceso a estudios, informes y datos estratégicos del sector, manteniéndote siempre a la vanguardia de la innovación EdTech."
  }, {
    icon: GraduationCap,
    title: "Formación y consultoría basada en tus necesidades",
    description: "Capacítate con expertos en temas clave (equipos, ventas, internacionalización y más) ajustados a las demandas reales de tu organización."
  }];
  const testimonios = [{
    name: "Angela Andrade",
    role: "Managing Director | Scala Higher Education",
    quote: "Nos dieron la mirada que nos faltaba para crear lared Latinoamericana de Universidades Católicas.",
    color: "blue",
    image: angelaAndradeImg
  }, {
    name: "Santiago Carrillo",
    role: "CEO Ada School",
    quote: "Colombia EdTech predica con el ejemplo, inspirando a otros a través de la acción. La voluntad del equipo de compartir experiencias y aprendizajes empresariales valiosos ha demostrado ser invaluable.",
    color: "red",
    image: santiagoCarrilloImg
  }, {
    name: "Valeria Velandia",
    role: "Estrategia | Innovate Learning",
    quote: "Nos ayudaron a crear nuestra ruta para escalar el equipo y construir capacidades empresariales. Por ende mi negocio ha crecido",
    color: "blue"
  }, {
    name: "Oscar Ivan Rodriguez",
    role: "CEO y Co-founder | InnovaHub",
    quote: "Ser aliado de Colombia Ed Tech me ha ayudado a ver aspectos fundamentales de la planeación estratégica y el trabajo en equipo, siempre desde una lógica muy aterrizada y propia del mundo Startup",
    color: "red",
    image: oscarIvanImg
  }];
  const statistics = [{
    percentage: "30%",
    description: "De las EdTechs están en proceso de quiebra o pivot en Colombia"
  }, {
    percentage: "27.8%",
    description: "De las EdTechs logró apoyo externo",
    label: "Poca financiación disponible"
  }, {
    percentage: "35%",
    description: "De las EdTechs nunca pasó por un proceso de aceleración"
  }];
  const requirements = ["Estar Comprometido con la educación del país", "Operar con o sin ánimo de lucro en sectores relacionados con educación, tecnología o innovación.", "Compartir los valores de colaboración, impacto social y accesibilidad que definen a Colombia EdTech.", "Tener interés en contribuir activamente al fortalecimiento del ecosistema EdTech de Colombia y Latinoamérica"];
  return <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />
        
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:image" content={meta.ogImage} />
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>
      
      {/* Hero */}
      <Section className="py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white relative overflow-hidden min-h-[70vh] sm:min-h-[75vh] lg:min-h-[85vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src={eventoAsociadosImg} 
            alt="Evento Colombia EdTech" 
            className="w-full h-full" 
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003889]/80 via-[#0B47CE]/65 to-[#003889]/50"></div>
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-4 h-full flex items-center pt-16 sm:pt-20 md:pt-24">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-2xl">
              Asociados
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-10 leading-relaxed drop-shadow-lg max-w-3xl">
              Si eres una organización con o sin ánimo de lucro que está 
              <strong className="text-[#F73C5C]"> TRANSFORMANDO</strong> la educación, 
              bienvenido al mundo de los asociados
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <Button size="lg" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold hover-scale shadow-2xl hover:shadow-[0_20px_50px_rgba(247,60,92,0.5)] transition-all duration-300" onClick={() => {
                handleAssociateClick();
                document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Únete ahora <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-white/95 border-white hover:bg-white backdrop-blur-sm hover-scale text-[#0B47CE] font-bold shadow-xl hover:shadow-2xl" onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}>
                Conoce los beneficios
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Technology & Union Section */}
      <Section className="py-12 sm:py-16 lg:py-20 bg-[#F4E8DD] relative overflow-hidden">
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* First Row - Image Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-24 relative">
            {/* Horizontal bar from left - hidden on mobile */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-64 bg-gradient-to-r from-[#F73C5C] via-[#8B3A8B] to-transparent -ml-48"></div>
            
            <div className="relative z-10 order-2 lg:order-1">
              <OptimizedImage 
                src={eventoPonenteImg} 
                alt="Evento Colombia EdTech - Ponente en escenario" 
                className="rounded-lg shadow-xl w-full"
                aspectRatio="video"
              />
            </div>
            <div className="relative z-10 order-1 lg:order-2">
              <p className="text-base sm:text-lg text-[#0B47CE] mb-4 sm:mb-6 leading-relaxed">
                Tenemos herramientas capaz de derribar las barreras que han limitado generaciones enteras, una herramienta para abrir puertas a un aprendizaje accesible, personalizado y relevante para todos, y esta herramienta es ...
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-funnel">
                <span className="text-[#F73C5C]">La tecnología</span>
              </h2>
              <p className="text-lg sm:text-xl text-[#0B47CE] font-medium">
                Pero la tecnología, por sí sola, <span className="text-[#F73C5C] font-bold">no es suficiente.</span>
              </p>
            </div>
          </div>

          {/* Second Row - Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative">
            {/* Horizontal bar from right - hidden on mobile */}
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-64 bg-gradient-to-l from-[#8B3A8B] via-[#F73C5C] to-transparent -mr-48"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-8 leading-tight font-funnel">
                <span className="text-[#F73C5C]">El verdadero cambio necesita unión, sinergia, comunidad</span>
              </h3>
              <p className="text-lg sm:text-xl text-[#0B47CE]">
                Aquí es donde entras tú, entra tu organización, por que el éxito está garantizado cuando <span className="text-[#F73C5C] font-bold">trabajamos juntos</span>
              </p>
            </div>
            <div className="relative z-10">
              <OptimizedImage 
                src={eventoAudienciaImg} 
                alt="Evento Colombia EdTech - Audiencia comprometida" 
                className="rounded-lg shadow-xl w-full"
                aspectRatio="4/3"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-8 sm:py-12 bg-[#F4E8DD]">
        <div className="container text-center px-4">
          <CTAButton size="lg" className="btn-primary" onClick={() => {
            handleAssociateClick();
            document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Quiero ser asociado de Colombia EdTech
          </CTAButton>
        </div>
      </Section>

      {/* Testimonios */}
      <Section className="py-12 sm:py-16 bg-white">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 font-funnel">
            <span className="text-[#F73C5C]">Algunos testimonios de nuestros asociados</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonios.map((testimonio, index) => <div key={index} className={`p-5 sm:p-6 lg:p-8 rounded-lg text-white ${testimonio.color === 'blue' ? 'bg-[#0B47CE]' : 'bg-[#F73C5C]'}`}>
                <div className="flex items-center mb-3 sm:mb-4">
                  {testimonio.image ? (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                      <OptimizedImage 
                        src={testimonio.image} 
                        alt={testimonio.name} 
                        className="w-full h-full"
                        aspectRatio="square"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/40 rounded-full"></div>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-base sm:text-lg">{testimonio.name}</h4>
                    <p className="text-xs sm:text-sm opacity-90">{testimonio.role}</p>
                  </div>
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  {testimonio.quote}
                </p>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Problemas Reales */}
      <Section className="py-8 sm:py-12 md:py-16 lg:py-28 bg-[#0B47CE] text-white">
        <div className="container max-w-7xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 font-funnel">
            Soluciones reales para problemas reales
          </h2>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-8 md:mb-12 lg:mb-16">Lo sabemos ...</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-4 sm:mb-8 md:mb-12 lg:mb-16">
            {statistics.slice(0, 2).map((stat, index) => <div key={index} className="bg-white/15 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 md:mb-4">{stat.percentage}</div>
                <div className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2 md:mb-3">{stat.label}</div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl">{stat.description}</div>
              </div>)}
            <div className="bg-white/15 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 md:mb-4">{statistics[2].percentage}</div>
              <div className="text-sm sm:text-base md:text-lg lg:text-xl">{statistics[2].description}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-left">
            <div className="bg-white/15 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Hay una ausencia de formación especializada en BTC, BTG, y BTBTC enfocado en EdTech
              </p>
            </div>
            <div className="bg-white/15 rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                El gobierno es lento en las licitaciones educativas, y le sector B2C enfrenta cambios en la capacidad de pago
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section id="beneficios" className="py-12 sm:py-16 bg-[#F4E8DD]">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 font-funnel">
            <span className="text-[#F73C5C]">¿Qué podemos hacer para ayudarte?</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {beneficios.map((beneficio, index) => {
            const bgImages = ['bg-gradient-to-br from-blue-900 to-blue-700', 'bg-gradient-to-br from-red-600 to-pink-600', 'bg-gradient-to-br from-purple-900 to-purple-700', 'bg-gradient-to-br from-green-800 to-green-600', 'bg-gradient-to-br from-orange-700 to-yellow-600', 'bg-gradient-to-br from-indigo-900 to-purple-800'];
            return <div key={index} className={`${bgImages[index]} text-white p-5 sm:p-6 lg:p-8 rounded-lg relative overflow-hidden`}>
                  {/* Background placeholder for images */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight">{beneficio.title}</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-white">{beneficio.description}</p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </Section>

      {/* Precio */}
      <Section className="py-12 sm:py-16 bg-[#F4E8DD]">
        <div className="container text-center max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B47CE] mb-4 sm:mb-6">
            La mejor inversión costo-eficiente para una EdTech en Colombia
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-[#F73C5C] mb-6 sm:mb-8">
            Sólo pagas 1SMLV/ Año para pertenecer
          </p>
          <CTAButton size="lg" className="btn-primary mb-8 sm:mb-12" onClick={() => {
            handleAssociateClick();
            document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Regístrate para ser asociado hoy
          </CTAButton>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B47CE] mb-6 sm:mb-8">
            ¿Qué requisitos debe cumplir tu organización para ser <span className="text-[#F73C5C]">Asociado?</span>
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-left">
            {requirements.map((requirement, index) => <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B47CE] mt-0.5 sm:mt-1 flex-shrink-0" />
                <p className="text-sm sm:text-base text-[#003889]">{requirement}</p>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Why Associate Now */}
      

      {/* Formulario */}
      <div id="form" className="py-12 sm:py-16 bg-[#0B47CE]">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 font-funnel">¿Quieres asociarte?</h3>
            <p className="text-white/90 text-base sm:text-lg">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </div>
          
          <div className="bg-white p-5 sm:p-8 md:p-10 rounded-lg shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nombre_empresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003889]">Nombre de la organización *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: EdTech Colombia SAS" className="placeholder:text-muted-foreground/50" {...field} />
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
                      <FormLabel className="text-[#003889]">Tipo de organización *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="[&>span]:text-[#003889]">
                            <SelectValue placeholder="Selecciona una opción" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="con_animo_lucro">Con ánimo de lucro</SelectItem>
                          <SelectItem value="sin_animo_lucro">Sin ánimo de lucro</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="ong">ONG</SelectItem>
                          <SelectItem value="empresa_educativa">Empresa educativa</SelectItem>
                          <SelectItem value="colegio">Colegio</SelectItem>
                          <SelectItem value="caja_compensacion">Caja de compensación</SelectItem>
                          <SelectItem value="universidad">Universidad</SelectItem>
                          <SelectItem value="red_instituciones">Red de instituciones</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nombre_contacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#003889]">Nombre de contacto *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: María González" className="placeholder:text-muted-foreground/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cargo_contacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#003889]">Cargo *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Directora" className="placeholder:text-muted-foreground/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#003889]">Teléfono *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: +57 300 123 4567" className="placeholder:text-muted-foreground/50" {...field} />
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
                        <FormLabel className="text-[#003889]">Correo electrónico *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contacto@ejemplo.com" className="placeholder:text-muted-foreground/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="pagina_web"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003889]">Sitio web o redes sociales</FormLabel>
                      <FormControl>
                        <Input placeholder="https://ejemplo.com" className="placeholder:text-muted-foreground/50" {...field} />
                      </FormControl>
                      <FormDescription className="text-sm">
                        Opcional: Puedes incluir tu sitio web, LinkedIn, o redes sociales
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003889]">Descripción de tu organización *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe qué hace tu organización, su misión y su impacto..."
                          className="min-h-[120px] placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="motivo_asociarse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003889]">¿Por qué quieres asociarte? *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cuéntanos tu motivación e interés para unirte a Colombia EdTech..."
                          className="min-h-[120px] placeholder:text-muted-foreground/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acepta_uso_datos"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-[#003889] font-normal">
                          Autorizo el uso de mis datos personales y de mi organización para fines de gestión de la asociación y comunicación relacionada con Colombia EdTech. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>;
};
export default Asociados;