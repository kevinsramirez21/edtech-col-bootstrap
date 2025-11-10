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
import juntaDirectiva2024 from "@/assets/junta-directiva-2024.jpg";
import eventoColombiaEdtech from "@/assets/evento-colombia-edtech-wide.jpg";
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
    description: "Llegamos a 90 asociados y más de 50 voluntarios, múltiples proyectos y varios acuerdos de entendimiento.",
    highlight: true
  }, {
    year: "2030",
    title: "Nuestra visión",
    description: "Nuestro horizonte es ambicioso. Para 2030, seremos líderes en Latinoamérica en la creación de un ecosistema EdTech ético, dinámico y colaborativo que transforme el aprendizaje, impulse la globalización y priorice la personalización educativa.",
    highlight: true
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
      <section className="min-h-[70vh] lg:min-h-[80vh] bg-primary-900 relative overflow-hidden flex items-center">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-sand/20 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Layout Grid Principal */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* COLUMNA IZQUIERDA - CONTENIDO CENTRADO */}
            <div className="text-center space-y-8 lg:pr-8">
              {/* Título Principal */}
            <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in" style={{
                fontFamily: 'var(--font-display)'
              }}>
                  La evolución de la educación ha comenzado
                </h1>
                
                <h2 className="text-lg md:text-xl lg:text-2xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto" style={{
                animationDelay: '0.2s'
              }}>
                  Conectamos a startups, scaleups, empresas tradicionales, universidades, colegios, ONG, Bigtech, el estado y la comunidad todos unidos por un objetivo común, dispuestos a revolucionar desde la raíz la manera en que se enseña y aprende.
                </h2>
              </div>
              
              {/* CTA Principal */}
              <div className="pt-8" style={{
              animationDelay: '0.6s'
            }}>
                <button onClick={() => {
                document.getElementById('historia')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }} className="bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent/30">
                  Conoce nuestra historia
                  <ArrowRight className="ml-2 w-6 h-6 inline-block" />
                </button>
              </div>
            </div>
            
            {/* COLUMNA DERECHA - IMAGEN OPTIMIZADA */}
            <div className="relative order-first lg:order-last" style={{
            animationDelay: '1s'
          }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img src={juntaDirectiva2024} alt="Junta Directiva de Colombia EdTech 2024" className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover" />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                
                {/* Badge flotante optimizado */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-xl">
                  <p className="text-sm font-bold text-primary-700">Junta Directiva</p>
                  <p className="text-xs text-primary-500 font-medium">2024</p>
                </div>
              </div>
              
              {/* Elementos decorativos optimizados */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-sand/30 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Separador visual hacia la siguiente sección */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-sand/20"></div>
      </section>

      {/* JUNTA DIRECTIVA - DESPUÉS DEL HERO */}
      <Section id="junta-directiva" className="py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700 font-funnel">
            Conoce nuestra Junta Directiva
          </h2>
          <p className="text-lg text-primary-900 max-w-2xl mx-auto">Líderes comprometidos con la transformación educativa en Colombia y latinoamérica</p>
        </div>
        
        <LogoGrid partners={asociados} columns={4} title="" className="mb-12" />
        
        <div className="flex justify-center mb-20">
          <CTAButton size="lg" variant="accent" asChild>
            <Link to="/asociados">
              Ver todos nuestros asociados
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>

        {/* NOS HAN VISTO EN - MISMA SECCIÓN */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700 font-funnel">
            Nos has visto en
          </h2>
        </div>
        
        <LogoGrid partners={medios} columns={5} title="" className="max-w-5xl mx-auto" />
      </Section>

      {/* MISIÓN Y CÓMO LO HACEMOS */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[700px] lg:min-h-[80vh]">
          {/* Columna izquierda - Contenido */}
          <div className="bg-primary-700 text-white p-8 md:p-12 lg:p-20 flex flex-col justify-center">
            <div className="space-y-10 max-w-2xl">
              {/* Misión */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-accent flex-shrink-0" />
                  <h2 className="text-3xl md:text-4xl font-bold font-funnel">Nuestra misión es clara</h2>
                </div>
                <p className="text-lg md:text-xl leading-relaxed">
                  Transformar la calidad, inclusión y accesibilidad de la educación en Colombia y Latinoamérica.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-white/90">
                  No se trata solo de enseñar, sino de abrir caminos hacia un aprendizaje significativo que conecte estudiantes, docentes e instituciones con las oportunidades del mundo moderno.
                </p>
              </div>

              {/* Cómo lo hacemos */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-accent flex-shrink-0" />
                  <h3 className="text-3xl md:text-4xl font-bold font-funnel">¿Cómo lo hacemos?</h3>
                </div>
                <p className="text-lg md:text-xl leading-relaxed">
                  Tejiendo lazos de colaboración entre organizaciones con ánimo y sin ánimo de lucro que trabajan por la educación, impulsando soluciones innovadoras que impacten a millones de personas.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha - Imagen */}
          <div className="relative h-[400px] lg:h-auto">
            <img 
              src={eventoColombiaEdtech} 
              alt="Evento Colombia EdTech - Formando líderes que transforman el país" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* VALORES - FONDO BLANCO */}
      <Section className="py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">
            Estos son los valores que nos mueven en Colombia EdTech
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Card className="p-8 bg-white border-primary-200">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary-700 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary-700">
              Innovación
            </h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              La tecnología está presente en todas las áreas de nuestra vida, adaptarnos a sus beneficios, y crear sobre ella, mejorará significativamente la calidad de vida de profesores, estudiantes e instituciones educativas.
            </p>
          </Card>
          
          <Card className="p-8 bg-white border-primary-200">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary-700 flex items-center justify-center">
              <Handshake className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary-700">
              Colaboración
            </h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              Tejemos una red de alianzas estratégicas entre organizaciones, instituciones y profesionales comprometidos con transformar la educación a través de la innovación y el trabajo conjunto.
            </p>
          </Card>
          
          <Card className="p-8 bg-white border-primary-200">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary-700 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary-700">
              Accesibilidad
            </h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              Trabajamos para democratizar el acceso a una educación de calidad, eliminando barreras tecnológicas y económicas que limitan las oportunidades de aprendizaje en Colombia y Latinoamérica.
            </p>
          </Card>
          
          <Card className="p-8 bg-white border-primary-200">
            <div className="w-16 h-16 mb-6 rounded-full bg-accent flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary-700">
              Impacto Social
            </h3>
            <p className="text-lg text-primary-600 leading-relaxed">
              Contribuimos al mejoramiento de la calidad y a la maximización de la cobertura y calidad educativa del país, identificando y fortaleciendo las edtech en Colombia.
            </p>
          </Card>
        </div>
      </Section>

      {/* IMPACTO - FONDO BLANCO */}
      <Section className="py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">
            El impacto de nuestro trabajo
          </h2>
        </div>
        
        {/* Estadísticas principales */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-8 text-center bg-primary-700 border-primary-800">
            <div className="text-5xl font-bold text-white mb-3">
              29.550
            </div>
            <p className="text-lg text-white/90 font-medium">
              Instituciones
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-primary-700 border-primary-800">
            <div className="text-5xl font-bold text-white mb-3">
              40.000
            </div>
            <p className="text-lg text-white/90 font-medium">
              Docentes
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-primary-700 border-primary-800">
            <div className="text-5xl font-bold text-white mb-3">
              4.8M
            </div>
            <p className="text-lg text-white/90 font-medium">
              Personas
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-primary-700 border-primary-800">
            <div className="text-5xl font-bold text-white mb-3">
              15.000
            </div>
            <p className="text-lg text-white/90 font-medium">
              Empresas
            </p>
          </Card>
        </div>
        
        {/* Estadísticas adicionales */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-8 text-center bg-sand border-primary-200">
            <div className="text-4xl font-bold text-accent mb-3">
              38.2%
            </div>
            <p className="text-base text-primary-700 leading-relaxed">
              De nuestros asociados llegan a 5-6 países
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-sand border-primary-200">
            <div className="text-4xl font-bold text-accent mb-3">
              72.2%
            </div>
            <p className="text-base text-primary-700 leading-relaxed">
              De nuestras EdTechs asociadas comenzó con recursos propios
            </p>
          </Card>
          
          <Card className="p-8 text-center bg-sand border-primary-200">
            <div className="text-4xl font-bold text-accent mb-3">
              79.62%
            </div>
            <p className="text-base text-primary-700 leading-relaxed">
              De los founders de nuestras EdTech tienen un título de postgrado
            </p>
          </Card>
        </div>
      </Section>

      {/* TIMELINE HISTORIA - FONDO SAND */}
      <Section id="historia" className="py-16 bg-sand">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">
            Nuestra historia
          </h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            El crecimiento que nos ha llevado a liderar el ecosistema EdTech colombiano
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Timeline items={timelineData} />
        </div>
      </Section>

      {/* LIDERAZGO - FONDO AZUL */}
      <Section id="liderazgo" className="py-16 bg-primary-700">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            El equipo que lidera la transformación
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Conoce a los líderes que impulsan la revolución educativa en Colombia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {liderazgo.map((leader, index) => <LeadershipCard key={index} name={leader.name} position={leader.position} bio={leader.bio} />)}
        </div>
        
        <div className="text-center">
          <CTAButton size="lg" className="bg-accent hover:bg-accent-600">
            Únete a nuestro equipo de voluntarios
            <ArrowRight className="ml-2 w-5 h-5" />
          </CTAButton>
        </div>
      </Section>

      {/* IMPACTO - FONDO SAND */}
      <Section id="impacto" className="py-16 bg-sand">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">
            El impacto que generamos juntos
          </h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Nuestros números reflejan el crecimiento y transformación del ecosistema EdTech
          </p>
        </div>
        
        <div className="bg-primary-700 rounded-2xl p-12">
          <ImpactMetrics metrics={impactMetrics} />
        </div>
      </Section>


      {/* VALORES - FONDO AZUL */}
      <Section className="py-16 bg-primary-700">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Los valores que nos mueven
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Nuestros principios fundamentales que guían cada decisión y acción
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {valores.map((valor, index) => <Card key={index} className="p-8 text-center bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <valor.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {valor.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {valor.description}
              </p>
            </Card>)}
        </div>
      </Section>

      {/* CTA FINAL - FONDO SAND */}
      <Section className="py-20 bg-primary-700 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">
            Hoy todos somos Colombia EdTech
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            ¡Bienvenidos! Unidos, construiremos una educación que no solo inspire y transforme, sino que lidere el cambio que el mundo necesita, una generación a la vez.
          </p>
          
          <CTAButton size="xl" variant="accent" asChild>
            <Link to="/asociados">
              Quiero ser parte de Colombia EdTech
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </CTAButton>
        </div>
      </Section>
    </>;
};
export default Somos;