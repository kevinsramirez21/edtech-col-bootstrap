import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, BookOpen, Award, UserCheck, Target, CheckCircle, Lightbulb, Handshake, Sparkles } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { VolunteerApplicationForm } from "@/components/forms/volunteer-application-form";

// Image paths - using public folder for better performance
const eventoVoluntariosAsamblea = "/images/evento-voluntarios-asamblea.jpg";
const eventoVision2030 = "/images/evento-vision-2030-hq.jpg";

const Voluntariado = () => {
  const meta = generatePageMeta({
    title: "Voluntariado",
    description: "Si eres experto, profesional o estudiante y quieres donar tu tiempo y talento en la revolución de la educación, únete como voluntario"
  });

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Voluntariado", item: `${window.location.origin}/voluntariado` }
  ]);

  const handleVolunteerApplyClick = () => {
    trackCTA(GA_EVENTS.VOLUNTEER_APPLY_CLICK, 'voluntariado_cta');
  };

  const motivaciones = [
    "Quieres conectar con un propósito más profundo y significativo.",
    "Buscas una comunidad auténtica donde tus pasiones y habilidades generen impacto real.",
    "Aspiras a dejar un legado que inspire a futuras generaciones.",
    "Sabes que existe una manera más innovadora de transformar vidas, lejos del modelo tradicional que se quedó atrás.",
    "Quieres un espacio dinámico y enriquecedor para crecer, compartir y construir un futuro más justo con otros."
  ];

  const beneficios = [
    {
      icon: BookOpen,
      title: "Acceso a la misma formación que reciben las EdTech",
      description: "Recursos de formación, actualizaciones del sector y herramientas de aprendizaje."
    },
    {
      icon: Users,
      title: "Comunidades y espacios privados",
      description: "Conversaciones entre pares, networking y apoyo de expertos/as del sector."
    },
    {
      icon: Award,
      title: "Certificación del tiempo",
      description: "Al finalizar, certificado oficial de horas de servicio para tu CV o LinkedIn."
    },
    {
      icon: UserCheck,
      title: "Certificación de conocimientos",
      description: "Si demuestras habilidades destacadas, recibirás una certificación adicional por tus logos."
    },
    {
      icon: Target,
      title: "Recomendación para hoja de vida",
      description: "Voluntarios/as sobresalientes obtendrán recomendación personal (CV/LinkedIn)."
    },
    {
      icon: Heart,
      title: "Liderazgo y proyectos reales",
      description: "Oportunidad de liderar o participar en proyectos estratégicos que potencian tu carrera."
    }
  ];

  const requisitos = [
    "¿La educación y la tecnología te apasionan?",
    "¿Crees que la educación es motor de transformación social y económica?",
    "¿Tienes mínimo 4 horas a la semana para donar tus conocimientos y talentos?",
    "¿Te gusta trabajar en equipo y aportar desde tus talentos?",
    "¿Eres comprometido/a y responsable con tus tareas?",
    "¿Te gustaría profundizar en tecnología y educación?"
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
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>
      
      {/* Hero */}
      <Section className="py-24 md:py-40 lg:py-52 bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white relative overflow-hidden min-h-[85vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src={eventoVoluntariosAsamblea} 
            alt="Evento Colombia EdTech - Voluntarios" 
            className="w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003889]/80 via-[#0B47CE]/65 to-[#003889]/50"></div>
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto h-full flex items-center pt-20 md:pt-24">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight drop-shadow-2xl">
              Voluntariado
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 leading-relaxed drop-shadow-lg max-w-3xl">
              Si eres experto, profesional o estudiante y quieres 
              <strong className="text-[#F73C5C]"> donar tu tiempo y talento</strong> en esta revolución de la educación, 
              bienvenido al mundo de los <strong className="text-[#F73C5C]">VOLUNTARIOS</strong>
            </p>
            <p className="text-lg md:text-xl mb-10 opacity-90 drop-shadow-lg max-w-3xl">
              Aquí podrás conectar tus <strong>intereses profesionales</strong> con un <strong>propósito profundo</strong>: 
              mejorar el sistema educativo de Colombia y el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold hover-scale shadow-2xl hover:shadow-[0_20px_50px_rgba(247,60,92,0.5)] transition-all duration-300"
                onClick={handleVolunteerApplyClick}
                asChild
              >
                <Link to="/voluntariado#form">
                  Quiero ser voluntario/a <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 bg-white/95 border-white hover:bg-white backdrop-blur-sm hover-scale text-[#0B47CE] font-bold shadow-xl hover:shadow-2xl"
                asChild
              >
                <Link to="#beneficios">
                  Conoce los beneficios
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Motivaciones */}
      <Section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-funnel">
            <span className="text-[#F73C5C]">Si estás aquí es porque sientes que…</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
            <div>
              <ul className="space-y-6 text-lg text-[#0B47CE]">
                {motivaciones.map((motivacion, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-[#F73C5C] mr-4 flex-shrink-0 mt-1" />
                    <span>{motivacion}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <OptimizedImage 
                src={eventoVision2030} 
                alt="Colombia EdTech - Visión 2030" 
                className="rounded-lg shadow-xl w-full"
                aspectRatio="4/3"
              />
            </div>
          </div>

          <div className="text-center bg-[#F4E8DD] p-10 md:p-12 rounded-xl">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-[#F73C5C] mr-4" />
              <h3 className="text-3xl md:text-4xl font-bold text-[#0B47CE] font-funnel">¡Bienvenido/a!</h3>
            </div>
            <p className="text-xl text-[#0B47CE] mb-6 max-w-3xl mx-auto">
              Hay un lugar esperando por ti en nuestros <strong>grupos de voluntariado</strong>.
            </p>
            <p className="text-lg text-[#0B47CE] max-w-3xl mx-auto">
              <strong className="text-[#F73C5C]">Colombia EdTech</strong> integra tecnología innovadora y une a todos los actores del ecosistema 
              para construir una <strong>educación de calidad, accesible y personalizable</strong>.
            </p>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section id="beneficios" className="py-20 bg-[#F4E8DD]">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 font-funnel">
            <span className="text-[#0B47CE]">Beneficios de ser</span><br className="md:hidden" /> <span className="text-[#F73C5C]">voluntario/a</span>
          </h2>
          <p className="text-xl text-center text-[#0B47CE] mb-16 max-w-3xl mx-auto">
            Todo lo que recibes por donar tu tiempo y talento
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-[#F73C5C] rounded-full flex items-center justify-center mb-6">
                  <beneficio.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0B47CE] mb-4">{beneficio.title}</h3>
                <p className="text-[#0B47CE] leading-relaxed">{beneficio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Propósito */}
      <Section className="py-20 bg-[#0B47CE] text-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-funnel">Propósito</h2>
          
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl mb-8 leading-relaxed">
              La vida no se trata solo de lo que <strong>conseguimos</strong>, sino de lo que <strong>podemos dar</strong>.
            </p>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              A través del voluntariado, contribuyes a una <strong>causa más grande</strong> que tú: encuentras propósito y alineas 
              tus conocimientos, habilidades y pasión con <strong>impacto social real</strong>.
            </p>
            
            <CTAButton 
              size="lg"
              className="bg-white text-[#0B47CE] hover:bg-gray-100 text-lg px-8 py-6 font-bold shadow-2xl"
              onClick={handleVolunteerApplyClick}
              asChild
            >
              <Link to="/voluntariado#form">
                SÍ, QUIERO SER VOLUNTARIO/A EN COLOMBIA EDTECH
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Requisitos */}
      <Section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-funnel">
            <span className="text-[#0B47CE]">Requisitos y</span> <span className="text-[#F73C5C]">compromisos</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="bg-white border-2 border-[#0B47CE]/20 p-10 rounded-xl shadow-lg">
              <div className="flex items-center mb-8">
                <CheckCircle className="w-10 h-10 text-[#0B47CE] mr-4" />
                <h3 className="text-2xl font-bold text-[#0B47CE] font-funnel">Es muy simple. Respóndete:</h3>
              </div>
              <ul className="space-y-4 mb-8">
                {requisitos.map((requisito, index) => (
                  <li key={index} className="flex items-start text-lg text-[#0B47CE]">
                    <span className="text-[#F73C5C] font-bold mr-3 mt-1 text-xl">•</span>
                    {requisito}
                  </li>
                ))}
              </ul>
              <div className="bg-[#F4E8DD] p-8 rounded-lg">
                <p className="text-xl text-[#0B47CE] font-semibold">
                  Si respondiste <strong>SÍ</strong> a todo, ¡<strong>bienvenido/a</strong>! 
                  Tienes lo necesario para ser <strong>voluntario/a</strong> en Colombia EdTech.
                </p>
              </div>
            </div>
            
            <div className="bg-white border-2 border-[#F73C5C] p-10 rounded-xl shadow-lg">
              <div className="flex items-center mb-8">
                <Handshake className="w-10 h-10 text-[#F73C5C] mr-4" />
                <h3 className="text-2xl font-bold text-[#F73C5C] font-funnel">Tu compromiso principal</h3>
              </div>
              <p className="text-xl text-[#0B47CE] mb-8">
                Es cumplir con los <strong>tiempos y responsabilidades</strong> acordadas.
              </p>
              <p className="text-xl text-[#0B47CE] mb-8">
                Este es un <strong>pacto de confianza y respeto</strong>, donde cada voluntario/a entrega lo mejor de sí, 
                asegurando que la <strong>transformación educativa</strong> que buscamos sea real y efectiva.
              </p>
            </div>
          </div>

          <div className="text-center">
            <CTAButton 
              size="lg"
              className="btn-primary text-lg px-8 py-6"
              onClick={handleVolunteerApplyClick}
              asChild
            >
              <Link to="/voluntariado#form">
                ¿DÓNDE FIRMO? ESTOY LISTO/A PARA SER VOLUNTARIO/A
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Cierre */}
      <Section className="py-24 md:py-32 bg-gradient-to-br from-[#003889] via-[#8B3A8B] to-[#F73C5C] text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 font-funnel drop-shadow-lg">Querido/a voluntario/a</h2>
          <p className="text-2xl md:text-3xl mb-8 leading-relaxed drop-shadow-md">
            Tu <strong>tiempo</strong> y tu <strong>talento</strong> tienen un propósito <strong>enorme</strong>, más allá de lo que imaginas.
          </p>
          <p className="text-xl mb-10 opacity-90 drop-shadow-md leading-relaxed">
            Más que un voluntariado, es la oportunidad de <strong>dejar tu legado</strong> en la educación de Colombia y Latinoamérica.
          </p>
          <p className="text-3xl font-bold mb-12 drop-shadow-lg">¡Nos vemos dentro!</p>
          <CTAButton 
            size="lg"
            className="bg-white text-[#0B47CE] hover:bg-gray-100 text-lg px-8 py-6 font-bold shadow-2xl hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all duration-300"
            onClick={handleVolunteerApplyClick}
            asChild
          >
            <Link to="/voluntariado#form">
              ¡HECHO! SERÉ VOLUNTARIO/A <Heart className="ml-2 h-5 w-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-20 bg-[#F4E8DD]">
        <div className="container max-w-3xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-[#0B47CE] mb-4 text-center font-funnel">
            ¿Quieres ser voluntario/a?
          </h3>
          <p className="text-lg text-[#0B47CE] mb-8 text-center max-w-2xl mx-auto">
            Completa el siguiente formulario y nos pondremos en contacto contigo para comenzar esta increíble experiencia
          </p>
          
          <VolunteerApplicationForm />
        </div>
      </div>
    </>
  );
};

export default Voluntariado;
