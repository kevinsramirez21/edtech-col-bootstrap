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
import eventoAsociadosImg from "@/assets/evento-edtech-fondo.jpg";
import eventoPonenteImg from "@/assets/asamblea-evento-ponente.jpg";
import eventoAudienciaImg from "@/assets/asamblea-evento-audiencia.jpg";
import angelaAndradeImg from "@/assets/testimonios/angela-andrade-v2.png";
import santiagoCarrilloImg from "@/assets/testimonios/santiago-carrillo.png";
import oscarIvanImg from "@/assets/testimonios/oscar-ivan-rodriguez.png";

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
      <Section className="py-24 md:py-40 lg:py-52 bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white relative overflow-hidden min-h-[85vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={eventoAsociadosImg} alt="Evento Colombia EdTech" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003889]/80 via-[#0B47CE]/65 to-[#003889]/50"></div>
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto h-full flex items-center pt-20 md:pt-24">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight drop-shadow-2xl">
              Asociados
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 leading-relaxed drop-shadow-lg max-w-3xl">
              Si eres una organización con o sin ánimo de lucro que está 
              <strong className="text-[#F73C5C]"> TRANSFORMANDO</strong> la educación, 
              bienvenido al mundo de los asociados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <Button size="lg" className="text-lg px-8 py-6 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold hover-scale shadow-2xl hover:shadow-[0_20px_50px_rgba(247,60,92,0.5)] transition-all duration-300" onClick={handleAssociateClick} asChild>
                <Link to="/asociados#form">
                  Únete ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/95 border-white hover:bg-white backdrop-blur-sm hover-scale text-[#0B47CE] font-bold shadow-xl hover:shadow-2xl" asChild>
                <Link to="#beneficios">
                  Conoce los beneficios
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Technology & Union Section */}
      <Section className="py-20 bg-[#F4E8DD] relative overflow-hidden">
        
        <div className="container max-w-7xl mx-auto px-8 lg:px-16">
          {/* First Row - Image Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24 relative">
            {/* Horizontal bar from left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-64 bg-gradient-to-r from-[#F73C5C] via-[#8B3A8B] to-transparent -ml-32 lg:-ml-48"></div>
            
            <div className="relative z-10">
              <img src={eventoPonenteImg} alt="Evento Colombia EdTech - Ponente en escenario" className="aspect-video rounded-lg shadow-xl object-cover w-full" />
            </div>
            <div className="relative z-10">
              <p className="text-lg text-[#0B47CE] mb-6 leading-relaxed">
                Tenemos herramientas capaz de derribar las barreras que han limitado generaciones enteras, una herramienta para abrir puertas a un aprendizaje accesible, personalizado y relevante para todos, y esta herramienta es ...
              </p>
              <h2 className="text-5xl font-bold mb-6 font-funnel">
                <span className="text-[#F73C5C]">La tecnología</span>
              </h2>
              <p className="text-xl text-[#0B47CE] font-medium">
                Pero la tecnología, por sí sola, <span className="text-[#F73C5C] font-bold">no es suficiente.</span>
              </p>
            </div>
          </div>

          {/* Second Row - Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center relative">
            {/* Horizontal bar from right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-64 bg-gradient-to-l from-[#8B3A8B] via-[#F73C5C] to-transparent -mr-32 lg:-mr-48"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-8 leading-tight font-funnel">
                <span className="text-[#F73C5C]">El verdadero cambio necesita unión, sinergia, comunidad</span>
              </h3>
              <p className="text-xl text-[#0B47CE]">
                Aquí es donde entras tú, entra tu organización, por que el éxito está garantizado cuando <span className="text-[#F73C5C] font-bold">trabajamos juntos</span>
              </p>
            </div>
            <div className="relative z-10">
              <img src={eventoAudienciaImg} alt="Evento Colombia EdTech - Audiencia comprometida" className="aspect-[4/3] rounded-lg shadow-xl object-cover w-full" />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-12 bg-[#F4E8DD]">
        <div className="container text-center">
          <CTAButton size="lg" className="btn-primary" onClick={handleAssociateClick} asChild>
            <Link to="/asociados#form">
              Quiero ser asociado de Colombia EdTech
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Testimonios */}
      <Section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-funnel">
            <span className="text-[#F73C5C]">Algunos testimonios de nuestros asociados</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonios.map((testimonio, index) => <div key={index} className={`p-8 rounded-lg text-white ${testimonio.color === 'blue' ? 'bg-[#0B47CE]' : 'bg-[#F73C5C]'}`}>
                <div className="flex items-center mb-4">
                  {testimonio.image ? <img src={testimonio.image} alt={testimonio.name} className="w-16 h-16 rounded-full object-cover mr-4" /> : <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <div className="w-12 h-12 bg-white/40 rounded-full"></div>
                    </div>}
                  <div>
                    <h4 className="font-bold text-lg">{testimonio.name}</h4>
                    <p className="text-sm opacity-90">{testimonio.role}</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  {testimonio.quote}
                </p>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Problemas Reales */}
      <Section className="py-20 md:py-28 bg-[#0B47CE] text-white">
        <div className="container max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-funnel">
            Soluciones reales para problemas reales
          </h2>
          <h3 className="text-2xl md:text-3xl mb-16">Lo sabemos ...</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {statistics.slice(0, 2).map((stat, index) => <div key={index} className="bg-white/15 rounded-xl p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl md:text-6xl font-bold mb-4">{stat.percentage}</div>
                <div className="text-base md:text-lg mb-3">{stat.label}</div>
                <div className="text-lg md:text-xl">{stat.description}</div>
              </div>)}
            <div className="bg-white/15 rounded-xl p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-bold mb-4">{statistics[2].percentage}</div>
              <div className="text-lg md:text-xl">{statistics[2].description}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/15 rounded-xl p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <p className="text-lg md:text-xl leading-relaxed">
                Hay una ausencia de formación especializada en BTC, BTG, y BTBTC enfocado en EdTech
              </p>
            </div>
            <div className="bg-white/15 rounded-xl p-8 border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
              <p className="text-lg md:text-xl leading-relaxed">
                El gobierno es lento en las licitaciones educativas, y le sector B2C enfrenta cambios en la capacidad de pago
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section id="beneficios" className="py-16 bg-[#F4E8DD]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-funnel">
            <span className="text-[#F73C5C]">¿Qué podemos hacer para ayudarte?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => {
            const bgImages = ['bg-gradient-to-br from-blue-900 to-blue-700', 'bg-gradient-to-br from-red-600 to-pink-600', 'bg-gradient-to-br from-purple-900 to-purple-700', 'bg-gradient-to-br from-green-800 to-green-600', 'bg-gradient-to-br from-orange-700 to-yellow-600', 'bg-gradient-to-br from-indigo-900 to-purple-800'];
            return <div key={index} className={`${bgImages[index]} text-white p-8 rounded-lg relative overflow-hidden`}>
                  {/* Background placeholder for images */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 leading-tight">{beneficio.title}</h3>
                    <p className="text-base leading-relaxed text-white">{beneficio.description}</p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </Section>

      {/* Precio */}
      <Section className="py-16 bg-[#F4E8DD]">
        <div className="container text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B47CE] mb-6">
            La mejor inversión costo-eficiente para una EdTech en Colombia
          </h2>
          <p className="text-2xl font-bold text-[#F73C5C] mb-8">
            Sólo pagas 1SMLV/ Año para pertenecer
          </p>
          <CTAButton size="lg" className="btn-primary mb-12" onClick={handleAssociateClick} asChild>
            <Link to="/asociados#form">
              Regístrate para ser asociado hoy
            </Link>
          </CTAButton>

          <h3 className="text-2xl md:text-3xl font-bold text-[#0B47CE] mb-8">
            ¿Qué requisitos debe cumplir tu organización para ser <span className="text-[#F73C5C]">Asociado?</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {requirements.map((requirement, index) => <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#0B47CE] mt-1 flex-shrink-0" />
                <p className="text-[#003889] text-base">{requirement}</p>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Why Associate Now */}
      

      {/* Formulario */}
      <div id="form" className="py-16 bg-[#0B47CE]">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-funnel">¿Quieres asociarte?</h3>
            <p className="text-white/90 text-lg">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-lg shadow-lg">
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

                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="grid md:grid-cols-2 gap-6">
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