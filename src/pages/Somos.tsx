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
import { ArrowRight, Lightbulb, Users, Globe, Building2, BookOpen, Handshake, Target, Heart, ChevronDown } from "lucide-react";
import heroLeadershipMeeting from "@/assets/hero-leadership-meeting.jpg";

const Somos = () => {
  const meta = generatePageMeta({
    title: "Lideramos la revolución EdTech en Colombia - Quiénes Somos",
    description: "De una idea en 2020 a transformar la educación de +15M personas. Conoce la historia, liderazgo y crecimiento de Colombia EdTech como la asociación líder del ecosistema educativo."
  });

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Somos", item: `${window.location.origin}/somos` }
  ]);

  const timelineData = [
    {
      year: "2020",
      title: "Antecedentes",
      description: "Nace el ecosistema EdTech en un grupo de WhatsApp. Para ese momento nunca se había escuchado la palabra en Colombia."
    },
    {
      year: "2022", 
      title: "La unión",
      description: "Finalizando el año se constituye Colombia EdTech, una asociación de organizaciones que buscan innovación y/o tecnología para cambiar y mejorar la educación."
    },
    {
      year: "2024",
      title: "El inicio",
      description: "En marzo llegamos a 40 organizaciones y conformamos la Junta directiva. En agosto contratamos a nuestro Presidente Ejecutivo."
    },
    {
      year: "2025",
      title: "Actualizado",
      description: "Llegamos a 90 asociados y más de 50 voluntarios, múltiples proyectos y varios acuerdos de entendimiento.",
      highlight: true
    }
  ];

  const liderazgo = [
    {
      name: "Andrés Méndez",
      position: "Presidente Ejecutivo",
      bio: "Líder visionario con más de 15 años de experiencia en transformación digital educativa. Ha dirigido iniciativas que han impactado a millones de estudiantes en Latinoamérica."
    },
    {
      name: "Kevin Ramírez",
      position: "Vicepresidencia de Operaciones",
      bio: "Experto en operaciones y gestión de ecosistemas EdTech. Especialista en desarrollo organizacional y optimización de procesos."
    },
    {
      name: "Sofía Orjuela", 
      position: "Vicepresidencia de Alianzas",
      bio: "Estratega de alianzas con experiencia en desarrollo de partnerships institucionales y corporativos a nivel regional."
    },
    {
      name: "Valentina Villalobos",
      position: "Chief of Staff",
      bio: "Coordinadora ejecutiva especializada en gestión estratégica y articulación de iniciativas de alto impacto."
    },
    {
      name: "Sara Moreno",
      position: "Lead de Alianzas Universitarias", 
      bio: "Especialista en relaciones académicas y desarrollo de programas universitarios para el fortalecimiento del ecosistema EdTech."
    }
  ];

  const valores = [
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "Impulsamos soluciones que revolucionan el aprendizaje"
    },
    {
      icon: Handshake,
      title: "Colaboración",
      description: "Creemos en el poder del ecosistema conectado"
    },
    {
      icon: Heart,
      title: "Impacto",
      description: "Medimos nuestro éxito en vidas transformadas"
    }
  ];

  const asociados = [
    "Universidad EAFIT", "Cymetria", "Coschool", "Hypercubus", "CGSO",
    "EduLabs", "Geek Girls LATAM", "Laboratoria", "Mangus Academy", "Mind Hub",
    "TOMI", "Buen Data", "RDC", "Naska Digital", "Núcleo Software",
    "Platzi", "Blackboard", "Microsoft", "Google for Education", "Pearson"
  ];

  const impactMetrics = [
    { value: "90+", label: "Asociados transformando la educación", icon: Building2 },
    { value: "+15M", label: "Personas impactadas en Latinoamérica", icon: Users },
    { value: "50+", label: "Voluntarios comprometidos", icon: Users },
    { value: "+25", label: "Países con presencia EdTech colombiana", icon: Globe }
  ];

  return (
    <>
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

      {/* HERO DE LIDERAZGO - EXPERIENCIA FULLSCREEN */}
      <section 
        className="min-h-[80vh] relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroLeadershipMeeting})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-[1px]"></div>
        
        {/* Contenido principal */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-12 space-y-6">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Somos la voz que lidera la<br />
              <span className="text-accent">transformación educativa</span><br />
              en Colombia
            </h1>
            
            <p 
              className="text-xl md:text-2xl lg:text-3xl mb-6 text-white/95 max-w-5xl mx-auto leading-relaxed"
              style={{ animationDelay: '0.3s' }}
            >
              <span className="font-semibold text-accent">90+</span> organizaciones EdTech unidas. 
              <span className="font-semibold text-accent"> +15M</span> personas impactadas.
              <br className="hidden md:block" />
              Una sola misión: <span className="font-semibold">revolucionar la educación.</span>
            </p>
            
            <p 
              className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-12"
              style={{ animationDelay: '0.6s' }}
            >
              Conoce a los líderes que están escribiendo el futuro de la educación en Latinoamérica
            </p>
          </div>

          {/* Estadísticas Animadas */}
          <div className="mb-12" style={{ animationDelay: '0.9s' }}>
            <AnimatedStats 
              stats={[
                { value: "90+", label: "EdTechs Asociadas" },
                { value: "15M+", label: "Personas Impactadas" },
                { value: "25+", label: "Países Alcanzados" },
                { value: "5", label: "Años Liderando" }
              ]}
            />
          </div>

          {/* CTAs Estratégicos */}
          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            style={{ animationDelay: '1.2s' }}
          >
            <CTAButton 
              size="xl" 
              variant="accent" 
              className="text-lg px-8 py-4 bg-accent hover:bg-accent-600 shadow-2xl"
            >
              Conoce nuestro impacto
              <ArrowRight className="ml-2 w-6 h-6" />
            </CTAButton>
            <CTAButton 
              size="xl" 
              className="text-lg px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 shadow-2xl"
            >
              Únete al liderazgo
              <Users className="ml-2 w-6 h-6" />
            </CTAButton>
          </div>

          {/* Badges de Credibilidad */}
          <CredibilityBadges className="mb-8" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Descubre más</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>

      {/* TIMELINE HISTORIA - FONDO SAND */}
      <Section className="py-16 bg-sand">
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
      <Section className="py-16 bg-primary-700">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            El equipo que lidera la transformación
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Conoce a los líderes que impulsan la revolución educativa en Colombia
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {liderazgo.map((leader, index) => (
            <LeadershipCard
              key={index}
              name={leader.name}
              position={leader.position}
              bio={leader.bio}
            />
          ))}
        </div>
        
        <div className="text-center">
          <CTAButton size="lg" className="bg-accent hover:bg-accent-600">
            Únete a nuestro equipo de voluntarios
            <ArrowRight className="ml-2 w-5 h-5" />
          </CTAButton>
        </div>
      </Section>

      {/* IMPACTO - FONDO SAND */}
      <Section className="py-16 bg-sand">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">
            El impacto que generamos juntos
          </h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Nuestros números reflejan el crecimiento y transformación del ecosistema EdTech
          </p>
        </div>
        
        <div className="bg-primary-700 rounded-2xl p-12">
          <ImpactMetrics 
            metrics={impactMetrics}
          />
        </div>
      </Section>

      {/* ASOCIADOS - FONDO BLANCO */}
      <Section className="py-16 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-700">
            Quienes forman parte de la revolución
          </h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Más de 90 organizaciones comprometidas con transformar la educación
          </p>
        </div>
        
        <div className="mb-8">
          <LogoGrid 
            partners={asociados.slice(0, 12)}
            columns={4}
            className="mb-8"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton size="lg" className="bg-primary-700 hover:bg-primary-800">
            Junta Directiva
          </CTAButton>
          <CTAButton size="lg" variant="accent" asChild>
            <Link to="/asociados">
              Todos nuestros asociados
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
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
          {valores.map((valor, index) => (
            <Card key={index} className="p-8 text-center bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                <valor.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {valor.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {valor.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA FINAL - FONDO SAND */}
      <Section className="py-20 bg-sand text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-primary-700">
            Sé parte de la historia que estamos escribiendo
          </h2>
          
          <p className="text-lg text-primary-600 mb-12 max-w-3xl mx-auto">
            Únete a la comunidad de líderes que están transformando el futuro de la educación en Colombia y Latinoamérica
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CTAButton size="xl" asChild>
              <Link to="/asociados">
                Quiero ser asociado
                <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </CTAButton>
            <CTAButton size="xl" variant="accent" asChild>
              <Link to="/voluntariado">
                Quiero ser voluntario
                <Users className="ml-2 w-6 h-6" />
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Somos;