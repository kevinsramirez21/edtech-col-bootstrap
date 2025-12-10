import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { LogoGrid } from "@/components/ui/logo-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { Timeline } from "@/components/ui/timeline";
import { LeadershipCard } from "@/components/ui/leadership-card";
import { ImpactMetrics } from "@/components/ui/impact-metrics";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { CredibilityBadges } from "@/components/ui/credibility-badges";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Globe, Building2, BookOpen, Handshake, Target, Heart, ChevronDown, CheckCircle } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Image paths - using public folder for better performance
const juntaDirectiva2024 = "/images/junta-directiva-2024.jpg";
const eventoColombiaEdtech = "/images/evento-colombia-edtech-hq.jpg";
const eventoVision2030 = "/images/evento-vision-2030-hq.jpg";
const Somos = () => {
  const meta = generatePageMeta({
    title: "Lideramos la revolución EdTech en Colombia - Quiénes Somos",
    description: "De una idea en 2020 a transformar la educación de +15M personas. Conoce la historia, liderazgo y crecimiento de Colombia EdTech como la asociación líder del ecosistema educativo."
  });
  const breadcrumbLd = generateBreadcrumbJsonLd([{
    name: "Somos",
    item: `${window.location.origin}/somos`
  }]);
  const timelineData = [{
    year: "2020",
    title: "Antecedentes",
    description: "Nace el ecosistema EdTech en un grupo de WhatsApp. Para ese momento nunca se había escuchado la palabra en Colombia."
  }, {
    year: "2022",
    title: "La unión",
    description: "Finalizando el año se constituye Colombia EdTech, una asociación de organizaciones que buscan innovación y/o tecnología para cambiar y mejorar la educación."
  }, {
    year: "2024",
    title: "El inicio",
    description: "En marzo llegamos a 40 organizaciones y conformamos la Junta directiva. En agosto contratamos a nuestro Presidente Ejecutivo."
  }, {
    year: "2025",
    title: "Actualizado",
    description: "Llegamos a 90 asociados y más de 50 voluntarios, múltiples proyectos y varios acuerdos de entendimiento."
  }];
  const liderazgo = [{
    name: "Andrés Méndez",
    position: "Presidente Ejecutivo",
    bio: "Líder visionario con más de 15 años de experiencia en transformación digital educativa. Ha dirigido iniciativas que han impactado a millones de estudiantes en Latinoamérica."
  }, {
    name: "Kevin Ramírez",
    position: "Vicepresidencia de Operaciones",
    bio: "Experto en operaciones y gestión de ecosistemas EdTech. Especialista en desarrollo organizacional y optimización de procesos."
  }, {
    name: "Sofía Orjuela",
    position: "Vicepresidencia de Alianzas",
    bio: "Estratega de alianzas con experiencia en desarrollo de partnerships institucionales y corporativos a nivel regional."
  }, {
    name: "Valentina Villalobos",
    position: "Chief of Staff",
    bio: "Coordinadora ejecutiva especializada en gestión estratégica y articulación de iniciativas de alto impacto."
  }, {
    name: "Sara Moreno",
    position: "Lead de Alianzas Universitarias",
    bio: "Especialista en relaciones académicas y desarrollo de programas universitarios para el fortalecimiento del ecosistema EdTech."
  }];
  const valores = [{
    icon: Lightbulb,
    title: "Innovación",
    description: "Impulsamos soluciones que revolucionan el aprendizaje"
  }, {
    icon: Handshake,
    title: "Colaboración",
    description: "Creemos en el poder del ecosistema conectado"
  }, {
    icon: Heart,
    title: "Impacto",
    description: "Medimos nuestro éxito en vidas transformadas"
  }];
  const asociados = ["mangus", "GGL Geek Girls LatAm", "coschool", "HYPERCUBUS", "Laboratoria", "ticmas", "educación estrella", "revive"];
  const medios = ["Blu radio", "mintic", "Forbes", "Portafolio", "Infobae"];
  const impactMetrics = [{
    value: "90+",
    label: "Asociados transformando la educación",
    icon: Building2
  }, {
    value: "+15M",
    label: "Personas impactadas en Latinoamérica",
    icon: Users
  }, {
    value: "50+",
    label: "Voluntarios comprometidos",
    icon: Users
  }, {
    value: "+25",
    label: "Países con presencia EdTech colombiana",
    icon: Globe
  }];
  return <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <link rel="canonical" href={meta.canonical} />
        
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:image" content={meta.ogImage} />
        
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>

      {/* HERO IMPACTANTE */}
      <section className="min-h-[45vh] sm:min-h-[55vh] lg:min-h-[70vh] bg-primary-900 relative overflow-hidden flex items-center">
        {/* Elementos decorativos de fondo - hidden on mobile */}
        <div className="absolute top-10 right-10 w-24 sm:w-32 h-24 sm:h-32 bg-accent/10 rounded-full blur-3xl hidden sm:block"></div>
        <div className="absolute bottom-20 left-10 w-16 sm:w-24 h-16 sm:h-24 bg-sand/20 rounded-full blur-2xl hidden sm:block"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14">
          {/* Layout Grid Principal */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* COLUMNA IZQUIERDA - CONTENIDO CENTRADO */}
            <div className="text-center space-y-3 sm:space-y-5 lg:space-y-6 lg:pr-6">
              {/* Título Principal */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight animate-fade-in" style={{
                fontFamily: 'var(--font-display)'
              }}>
                  La evolución de la educación ha comenzado
                </h1>
                
                <h2 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto" style={{
                animationDelay: '0.2s'
              }}>
                  Conectamos a startups, scaleups, empresas tradicionales, universidades, colegios, ONG, Bigtech, el estado y la comunidad todos unidos por un objetivo común, dispuestos a revolucionar desde la raíz la manera en que se enseña y aprende.
                </h2>
              </div>
              
              {/* CTA Principal */}
              <div className="pt-2 sm:pt-4 lg:pt-6" style={{
              animationDelay: '0.6s'
            }}>
                <button onClick={() => {
                document.getElementById('historia')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }} className="bg-accent hover:bg-accent-600 text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent/30">
                  Conoce nuestra historia
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 inline-block" />
                </button>
              </div>
            </div>
            
            {/* COLUMNA DERECHA - IMAGEN OPTIMIZADA */}
            <div className="relative order-first lg:order-last" style={{
            animationDelay: '1s'
          }}>
              <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl sm:hover:scale-105 transition-transform duration-500">
                <OptimizedImage 
                  src={juntaDirectiva2024} 
                  alt="Junta Directiva de Colombia EdTech 2024" 
                  className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] xl:h-[450px]"
                  priority={true}
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                
                {/* Badge flotante optimizado */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-xl">
                  <p className="text-xs sm:text-sm font-bold text-primary-700">Junta Directiva</p>
                  <p className="text-xs text-primary-500 font-medium">2024</p>
                </div>
              </div>
              
              {/* Elementos decorativos optimizados - hidden on mobile */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl hidden sm:block"></div>
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-sand/30 rounded-full blur-lg hidden sm:block"></div>
            </div>
          </div>
        </div>
        
        {/* Separador visual hacia la siguiente sección */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gradient-to-b from-transparent to-sand/20"></div>
      </section>

      {/* JUNTA DIRECTIVA - DESPUÉS DEL HERO */}
      <Section id="junta-directiva" className="py-8 sm:py-10 lg:py-14 bg-white">
        <div className="text-center mb-6 sm:mb-10 lg:mb-12 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary-700 font-funnel">
            Conoce nuestra Junta Directiva
          </h2>
          <p className="text-sm sm:text-base text-primary-900 max-w-2xl mx-auto">Líderes comprometidos con la transformación educativa en Colombia y latinoamérica</p>
        </div>
        
        <LogoGrid partners={asociados} columns={4} title="" className="mb-6 sm:mb-10" />
        
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <CTAButton size="lg" variant="accent" asChild>
            <Link to="/asociados">
              Ver todos nuestros asociados
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </CTAButton>
        </div>

        {/* NOS HAN VISTO EN - MISMA SECCIÓN */}
        <div className="text-center mb-6 sm:mb-10 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary-700 font-funnel">
            Nos has visto en
          </h2>
        </div>
        
        <LogoGrid partners={medios} columns={5} title="" className="max-w-5xl mx-auto" />
      </Section>

      {/* MISIÓN Y CÓMO LO HACEMOS */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[70vh]">
          {/* Columna izquierda - Contenido */}
          <div className="bg-primary-700 text-white p-5 sm:p-6 md:p-10 lg:p-16 flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 max-w-2xl">
              {/* Misión */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-accent flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-funnel">Nuestra misión es clara</h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Transformar la calidad, inclusión y accesibilidad de la educación en Colombia y Latinoamérica.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  No se trata solo de enseñar, sino de abrir caminos hacia un aprendizaje significativo que conecte estudiantes, docentes e instituciones con las oportunidades del mundo moderno.
                </p>
              </div>

              {/* Cómo lo hacemos */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-accent flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-funnel">¿Cómo lo hacemos?</h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Tejiendo lazos de colaboración entre organizaciones con ánimo y sin ánimo de lucro que trabajan por la educación, impulsando soluciones innovadoras que impacten a millones de personas.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Imagen */}
          <div className="relative h-[200px] sm:h-[250px] lg:h-auto">
            <OptimizedImage 
              src={eventoColombiaEdtech} 
              alt="Evento Colombia EdTech - Formando líderes que transforman el país" 
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* VISIÓN 2030 */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[70vh]">
          {/* Columna izquierda - Imagen */}
          <div className="relative h-[200px] sm:h-[250px] lg:h-auto order-last lg:order-first">
            <OptimizedImage 
              src={eventoVision2030} 
              alt="Evento Colombia EdTech - Visión 2030" 
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Columna derecha - Contenido */}
          <div className="bg-accent text-white p-5 sm:p-6 md:p-10 lg:p-16 flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 max-w-2xl">
              {/* Visión */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white flex-shrink-0" />
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-funnel">Nuestro horizonte es ambicioso.</h2>
                </div>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Para 2030, seremos líderes en Latinoamérica en la creación de un ecosistema EdTech ético, dinámico y colaborativo que transforme el aprendizaje, impulse la globalización y priorice la personalización educativa.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Queremos un modelo donde aprender sea tan natural como respirar, y enseñar sea la puerta hacia un futuro lleno de progreso y equidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES - FONDO SAND */}
      <Section className="py-8 sm:py-10 lg:py-14 bg-sand">
        <div className="text-center mb-6 sm:mb-10 lg:mb-12 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary-700 font-funnel">
            Estos son los valores que nos mueven en Colombia EdTech
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto px-4">
          <Card className="p-4 sm:p-5 lg:p-6 bg-sand/50 border-primary-200 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-5 rounded-full bg-accent flex items-center justify-center">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-primary-700">
              Innovación
            </h3>
            <p className="text-xs sm:text-sm text-primary-900 leading-relaxed">
              La tecnología está presente en todas las áreas de nuestra vida, adaptarnos a sus beneficios, y crear sobre ella, mejorará significativamente la calidad de vida de profesores, estudiantes e instituciones educativas.
            </p>
          </Card>
          
          <Card className="p-4 sm:p-5 lg:p-6 bg-sand/50 border-primary-200 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-5 rounded-full bg-accent flex items-center justify-center">
              <Handshake className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-primary-700">
              Colaboración
            </h3>
            <p className="text-xs sm:text-sm text-primary-900 leading-relaxed">
              Tejemos una red de alianzas estratégicas entre organizaciones, instituciones y profesionales comprometidos con transformar la educación a través de la innovación y el trabajo conjunto.
            </p>
          </Card>
          
          <Card className="p-4 sm:p-5 lg:p-6 bg-sand/50 border-primary-200 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-5 rounded-full bg-accent flex items-center justify-center">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2 sm:mb-3 text-primary-700">
              Accesibilidad
            </h3>
            <p className="text-xs sm:text-sm text-primary-900 leading-relaxed">
              Trabajamos para democratizar el acceso a una educación de calidad, eliminando barreras tecnológicas y económicas que limitan las oportunidades de aprendizaje en Colombia y Latinoamérica.
            </p>
          </Card>
          
          <Card className="p-5 sm:p-6 lg:p-8 bg-sand/50 border-primary-200 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-5 lg:mb-6 rounded-full bg-accent flex items-center justify-center">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-primary-700">
              Impacto Social
            </h3>
            <p className="text-sm sm:text-base text-primary-900 leading-relaxed">
              Contribuimos al mejoramiento de la calidad y a la maximización de la cobertura y calidad educativa del país, identificando y fortaleciendo las edtech en Colombia.
            </p>
          </Card>
        </div>
      </Section>

      {/* IMPACTO - FONDO AZUL */}
      <Section className="py-12 sm:py-16 bg-primary-700">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white font-funnel">
            El impacto de nuestro trabajo
          </h2>
          <p className="text-lg sm:text-xl text-white/90">
            Nuestros asociados impactan a
          </p>
        </div>
        
        {/* Estadísticas principales con iconos */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-5xl mx-auto px-4">
          <Card className="p-4 sm:p-6 bg-transparent border-2 border-white/30 hover:border-white/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                  +29.550
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                  Instituciones
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6 bg-transparent border-2 border-white/30 hover:border-white/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                  40.000
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                  Docentes
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6 bg-transparent border-2 border-white/30 hover:border-white/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                  +4.8M
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                  Personas
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4 sm:p-6 bg-transparent border-2 border-white/30 hover:border-white/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
                  15.000
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-medium">
                  Empresas
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent" />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Estadísticas adicionales */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto px-4">
          <Card className="p-4 sm:p-6 lg:p-8 text-center bg-primary-900/50 border-2 border-white/20">
            <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              38.2%
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed">
              De nuestros asociados llegan a 5-6 países
            </p>
          </Card>
          
          <Card className="p-4 sm:p-6 lg:p-8 text-center bg-primary-900/50 border-2 border-white/20">
            <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              72.2%
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed">
              De nuestras EdTechs asociadas comenzó con recursos propios
            </p>
          </Card>
          
          <Card className="p-4 sm:p-6 lg:p-8 text-center bg-primary-900/50 border-2 border-white/20">
            <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              79.62%
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed">
              De los founders de nuestras EdTech tienen un título de postgrado
            </p>
          </Card>
          
          <Card className="p-4 sm:p-6 lg:p-8 text-center bg-primary-900/50 border-2 border-white/20">
            <div className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
              2/3
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed">
              De los founders de nuestras EdTech tienen un título de postgrado
            </p>
          </Card>
        </div>
      </Section>

      {/* TIMELINE HISTORIA - FONDO SAND */}
      <Section id="historia" className="py-12 sm:py-16 lg:py-20 bg-sand">
        <div className="text-center mb-10 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-primary-700" style={{
          fontFamily: 'var(--font-display)'
        }}>
            Nuestra historia
          </h2>
          <p className="text-base sm:text-lg text-primary-900 max-w-3xl mx-auto">
            El crecimiento que nos ha llevado a liderar el ecosistema EdTech colombiano
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-primary-200"></div>

            {/* Items */}
            <div className="space-y-6 sm:space-y-8">
              {timelineData.map((item, index) => <div key={index} className="relative flex gap-4 sm:gap-6 pl-12 sm:pl-16 animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  {/* Punto */}
                  <div className="absolute left-0 sm:left-0 top-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full ring-4 bg-accent ring-accent/20 shadow"></div>
                  </div>

                  {/* Tarjeta */}
                  <Card className="flex-1 p-4 sm:p-5 lg:p-6 bg-primary-700 text-white border-primary-700 shadow-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-semibold text-white/90">{item.year}</span>
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent/70"></span>
                    </div>
                    <h3 className="mt-1 text-lg sm:text-xl font-bold text-white" style={{
                  fontFamily: 'var(--font-display)'
                }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/90">
                      {item.description}
                    </p>
                  </Card>
                </div>)}
            </div>
          </div>
        </div>
      </Section>

      {/* LIDERAZGO - FONDO AZUL */}
      

      {/* IMPACTO - FONDO SAND */}
      


      {/* VALORES - FONDO AZUL */}
      

      {/* CTA FINAL - FONDO AZUL */}
      <Section className="py-12 sm:py-16 lg:py-20 bg-primary-700 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
            Hoy todos somos Colombia EdTech
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            ¡Bienvenidos! Unidos, construiremos una educación que no solo inspire y transforme, sino que lidere el cambio que el mundo necesita, una generación a la vez.
          </p>
          
          <CTAButton size="lg" variant="accent" asChild className="text-sm sm:text-base w-full sm:w-auto">
            <Link to="/asociados" className="inline-flex items-center justify-center gap-2">
              <span>Quiero ser parte</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </Link>
          </CTAButton>
        </div>
      </Section>
    </>;
};
export default Somos;