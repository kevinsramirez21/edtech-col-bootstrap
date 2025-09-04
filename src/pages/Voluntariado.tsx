import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, BookOpen, Award, UserCheck, Target, CheckCircle } from "lucide-react";

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
      <Section className="py-20 bg-gradient-to-br from-primary-700 to-accent-brand text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Si eres <span className="text-sand-200">experto, profesional o estudiante</span> y quieres <span className="text-sand-200">donar tu tiempo y talento</span> en esta revolución de la educación, <span className="text-sand-200">bienvenido</span> al mundo de los <span className="text-sand-200">VOLUNTARIOS</span>
          </h1>
          <p className="text-xl mb-6 text-white/90 leading-relaxed">
            Aquí podrás conectar tus <strong>intereses profesionales</strong> con un <strong>propósito profundo</strong>: 
            mejorar el sistema educativo de Colombia y el mundo.
          </p>
          <p className="text-lg mb-8 text-white/80">
            Creemos que juntos podemos <strong>cambiar vidas</strong> y el futuro de millones de personas. 
            Hoy te invitamos a <strong>unirte como Voluntario</strong>, aportando tu tiempo y conocimiento para transformar la educación.
          </p>
          <CTAButton 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={handleVolunteerApplyClick}
            asChild
          >
            <Link to="/voluntariado#form">
              QUIERO SER PARTE DE COLOMBIA EDTECH
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Motivaciones */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Si estás aquí es porque sientes que…
          </h2>
          <div className="bg-primary-50 p-8 rounded-lg mb-8">
            <ul className="space-y-4 text-lg text-gray-700">
              {motivaciones.map((motivacion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent-brand font-bold mr-3 text-xl">•</span>
                  {motivacion}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700 mb-6">
              ¡Bienvenido! Hay un lugar esperando por ti en nuestros <strong>grupos de voluntariado</strong>.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              <strong>Colombia EdTech</strong> integra tecnología innovadora y une a todos los actores del ecosistema 
              para construir una <strong>educación de calidad, accesible y personalizable</strong>.
            </p>
            <CTAButton 
              onClick={handleVolunteerApplyClick}
              asChild
            >
              <Link to="/voluntariado#form">
                VOLUNTARIADO: ¡AQUÍ VOY!
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="py-16 bg-gray-50">
        <SectionHeader
          title="Beneficios de ser voluntario/a"
          subtitle="Lo que obtienes"
          description="Todo lo que recibes por donar tu tiempo y talento"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {beneficios.map((beneficio, index) => (
            <Card key={index} className="p-6 h-full">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <beneficio.icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{beneficio.title}</h3>
                <p className="text-gray-700">{beneficio.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Propósito */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Propósito
          </h2>
          <div className="bg-accent-50 p-8 rounded-lg">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              La vida no se trata solo de lo que <strong>conseguimos</strong>, sino de lo que <strong>podemos dar</strong>.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              A través del voluntariado, contribuyes a una <strong>causa más grande</strong> que tú: encuentras propósito y alineas 
              tus conocimientos, habilidades y pasión con <strong>impacto social real</strong>.
            </p>
            <CTAButton 
              size="lg"
              onClick={handleVolunteerApplyClick}
              asChild
            >
              <Link to="/voluntariado#form">
                SÍ, QUIERO SER VOLUNTARIO/A EN COLOMBIA EDTECH
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Requisitos */}
      <Section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Requisitos y compromisos
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-bold text-primary-900 mb-6">Es muy simple. Respóndete:</h3>
            <ul className="space-y-3 mb-8">
              {requisitos.map((requisito, index) => (
                <li key={index} className="flex items-start text-lg text-gray-700">
                  <CheckCircle className="w-5 h-5 text-primary-700 mr-3 mt-1 flex-shrink-0" />
                  {requisito}
                </li>
              ))}
            </ul>
            <div className="bg-primary-50 p-6 rounded-lg">
              <p className="text-lg text-primary-800 font-semibold">
                Si respondiste <strong>SÍ</strong> a todo, ¡<strong>bienvenido/a</strong>! 
                Tienes lo necesario para ser <strong>voluntario/a</strong> en Colombia EdTech.
              </p>
            </div>
          </div>
          
          <div className="bg-white border-2 border-accent-200 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-accent-brand mb-4">Tu compromiso principal</h3>
            <p className="text-lg text-gray-700 mb-6">
              Es cumplir con los <strong>tiempos y responsabilidades</strong> acordadas.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Este es un <strong>pacto de confianza y respeto</strong>, donde cada voluntario/a entrega lo mejor de sí, 
              asegurando que la <strong>transformación educativa</strong> que buscamos sea real y efectiva.
            </p>
            <div className="text-center">
              <CTAButton 
                onClick={handleVolunteerApplyClick}
                asChild
              >
                <Link to="/voluntariado#form">
                  ¿DÓNDE FIRMO? ESTOY LISTO/A PARA SER VOLUNTARIO/A
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Cierre */}
      <Section className="py-20 bg-gradient-to-br from-primary-900 to-accent-brand text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Querido/a voluntario/a</h2>
          <p className="text-xl mb-6 text-white/90 leading-relaxed">
            Tu <strong>tiempo</strong> y tu <strong>talento</strong> tienen un propósito <strong>enorme</strong>, más allá de lo que imaginas.
          </p>
          <p className="text-lg mb-8 text-white/80">
            Más que un voluntariado, es la oportunidad de <strong>dejar tu legado</strong> en la educación de Colombia y Latinoamérica.
          </p>
          <p className="text-2xl font-bold mb-8">¡Nos vemos dentro!</p>
          <CTAButton 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={handleVolunteerApplyClick}
            asChild
          >
            <Link to="/voluntariado#form">
              ¡HECHO! SERÉ VOLUNTARIO/A
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-16 bg-sand-100">
        <div className="max-w-2xl mx-auto text-center">
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