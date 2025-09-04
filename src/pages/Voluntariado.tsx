import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, BookOpen, Award, UserCheck, Target, CheckCircle, Lightbulb, Handshake } from "lucide-react";

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
      description: "Si demuestras habilidades destacadas, recibirás una certificación adicional por tus logros."
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

      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Voluntariado" }
          ]} 
        />
      </Section>
      
      {/* Hero */}
      <Section className="py-20 bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white relative overflow-hidden">
        {/* Background placeholder for volunteer/community image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30">
          <div className="w-full h-full bg-gradient-to-br from-[#003889] to-[#0B47CE]/80"></div>
        </div>
        <div className="relative z-10 container max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Voluntariado
              </h1>
              <p className="text-xl mb-6 leading-relaxed opacity-90">
                Si eres experto, profesional o estudiante y quieres 
                <strong className="text-[#F73C5C]"> donar tu tiempo y talento</strong> en esta revolución de la educación, 
                bienvenido al mundo de los <strong className="text-[#F73C5C]">VOLUNTARIOS</strong>
              </p>
              <p className="text-lg mb-8 opacity-80">
                Aquí podrás conectar tus <strong>intereses profesionales</strong> con un <strong>propósito profundo</strong>: 
                mejorar el sistema educativo de Colombia y el mundo.
              </p>
            </div>
            <div className="relative">
              {/* Placeholder for volunteer/community image */}
              <div className="aspect-video bg-gray-300 rounded-lg border-4 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-center">
                  Volunteer Community Image<br/>
                  <small>Placeholder</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Motivaciones */}
      <Section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="text-[#F73C5C]">Si estás aquí es porque sientes que…</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <ul className="space-y-4 text-lg text-gray-700">
                {motivaciones.map((motivacion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#F73C5C] font-bold mr-3 text-xl">•</span>
                    {motivacion}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              {/* Placeholder for motivation/purpose image */}
              <div className="aspect-[4/3] bg-gray-300 rounded-lg border-4 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-center">
                  Purpose/Motivation Image<br/>
                  <small>Placeholder</small>
                </span>
              </div>
            </div>
          </div>

          <div className="text-center bg-[#F4E8DD] p-8 rounded-lg">
            <div className="flex items-center justify-center mb-6">
              <Lightbulb className="w-12 h-12 text-[#0B47CE] mr-4" />
              <h3 className="text-2xl font-bold text-[#0B47CE]">¡Bienvenido/a!</h3>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Hay un lugar esperando por ti en nuestros <strong>grupos de voluntariado</strong>.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              <strong className="text-[#0B47CE]">Colombia EdTech</strong> integra tecnología innovadora y une a todos los actores del ecosistema 
              para construir una <strong>educación de calidad, accesible y personalizable</strong>.
            </p>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="py-16 bg-[#F4E8DD]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#0B47CE]">Beneficios de ser</span> <span className="text-[#F73C5C]">voluntario/a</span>
          </h2>
          <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Todo lo que recibes por donar tu tiempo y talento
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 h-full">
                <div className="w-12 h-12 bg-[#F73C5C] rounded-full flex items-center justify-center mb-4">
                  <beneficio.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0B47CE] mb-3">{beneficio.title}</h3>
                <p className="text-gray-700">{beneficio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Propósito */}
      <Section className="py-16 bg-[#0B47CE] text-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Propósito</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl mb-8 leading-relaxed">
                La vida no se trata solo de lo que <strong>conseguimos</strong>, sino de lo que <strong>podemos dar</strong>.
              </p>
              <p className="text-lg mb-8 opacity-90">
                A través del voluntariado, contribuyes a una <strong>causa más grande</strong> que tú: encuentras propósito y alineas 
                tus conocimientos, habilidades y pasión con <strong>impacto social real</strong>.
              </p>
            </div>
            <div className="relative">
              {/* Placeholder for purpose/impact image */}
              <div className="aspect-video bg-white/10 rounded-lg border-4 border-dashed border-white/30 flex items-center justify-center">
                <span className="text-white/70 text-center">
                  Purpose Impact Image<br/>
                  <small>Placeholder</small>
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <CTAButton 
              size="lg"
              className="bg-white text-[#0B47CE] hover:bg-gray-100"
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
      <Section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            <span className="text-[#0B47CE]">Requisitos y</span> <span className="text-[#F73C5C]">compromisos</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-[#0B47CE] mr-3" />
                <h3 className="text-xl font-bold text-[#0B47CE]">Es muy simple. Respóndete:</h3>
              </div>
              <ul className="space-y-3">
                {requisitos.map((requisito, index) => (
                  <li key={index} className="flex items-start text-base text-gray-700">
                    <span className="text-[#F73C5C] font-bold mr-3 mt-1">•</span>
                    {requisito}
                  </li>
                ))}
              </ul>
              <div className="bg-[#F4E8DD] p-6 rounded-lg mt-6">
                <p className="text-lg text-[#0B47CE] font-semibold">
                  Si respondiste <strong>SÍ</strong> a todo, ¡<strong>bienvenido/a</strong>! 
                  Tienes lo necesario para ser <strong>voluntario/a</strong> en Colombia EdTech.
                </p>
              </div>
            </div>
            
            <div className="bg-white border-2 border-[#F73C5C] p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <Handshake className="w-8 h-8 text-[#F73C5C] mr-3" />
                <h3 className="text-xl font-bold text-[#F73C5C]">Tu compromiso principal</h3>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Es cumplir con los <strong>tiempos y responsabilidades</strong> acordadas.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Este es un <strong>pacto de confianza y respeto</strong>, donde cada voluntario/a entrega lo mejor de sí, 
                asegurando que la <strong>transformación educativa</strong> que buscamos sea real y efectiva.
              </p>
            </div>
          </div>

          <div className="text-center">
            <CTAButton 
              size="lg"
              className="btn-primary"
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
      <Section className="py-20 bg-gradient-to-br from-[#003889] to-[#F73C5C] text-white">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Querido/a voluntario/a</h2>
          <p className="text-xl mb-6 opacity-90 leading-relaxed">
            Tu <strong>tiempo</strong> y tu <strong>talento</strong> tienen un propósito <strong>enorme</strong>, más allá de lo que imaginas.
          </p>
          <p className="text-lg mb-8 opacity-80">
            Más que un voluntariado, es la oportunidad de <strong>dejar tu legado</strong> en la educación de Colombia y Latinoamérica.
          </p>
          <p className="text-2xl font-bold mb-8">¡Nos vemos dentro!</p>
          <CTAButton 
            size="lg"
            className="bg-white text-[#0B47CE] hover:bg-gray-100"
            onClick={handleVolunteerApplyClick}
            asChild
          >
            <Link to="/voluntariado#form">
              ¡HECHO! SERÉ VOLUNTARIO/A
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-16 bg-[#F4E8DD]">
        <div className="container max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Quieres ser voluntario/a?</h3>
          <p className="text-gray-600 mb-6">
            Formulario de aplicación próximamente disponible
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-500 italic">
              Mientras tanto, contáctanos a voluntariado@colombiaedtech.org
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voluntariado;