import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Heart, Network, Globe, Users, DollarSign, Gift, Zap } from "lucide-react";

const Aliados = () => {
  const meta = generatePageMeta({
    title: "Aliados",
    description: "Si eres una entidad pública o privada que quiere contribuir para que las EdTech cumplan su misión, únete como aliado de Colombia EdTech"
  });

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Aliados", item: `${window.location.origin}/aliados` }
  ]);

  const handleAllyContactClick = () => {
    trackCTA(GA_EVENTS.ALLY_CONTACT_CLICK, 'aliados_cta');
  };

  const beneficios = [
    {
      icon: Award,
      title: "Visibilidad de alto nivel",
      description: "Tu marca es vista como líder en responsabilidad social y educación transformadora, reforzando reputación y preferencia."
    },
    {
      icon: Heart,
      title: "Contribuir a la educación", 
      description: "Ayudas a que soluciones tecnológicas lleguen a miles de estudiantes, docentes e instituciones, haciendo el mundo más equitativo, dinámico y próspero."
    },
    {
      icon: TrendingUp,
      title: "Beneficios fiscales",
      description: "Puedes reducir impuestos vía incentivos a contribuciones en educación e innovación (según normativa vigente)."
    },
    {
      icon: Network,
      title: "Negocio con EdTech",
      description: "Conecta con una red de empresas y proyectos innovadores listos para usar tus productos/servicios."
    },
    {
      icon: Globe,
      title: "Impacto social y empresarial",
      description: "Cada dólar invertido se multiplica en impacto educativo con mejoras reales en calidad de vida."
    },
    {
      icon: Users,
      title: "Transparencia total",
      description: "Informes periódicos y claros sobre uso de recursos y resultados logrados."
    }
  ];

  const formasAlianza = [
    {
      icon: DollarSign,
      title: "Financiación o donaciones económicas",
      description: "Aporta para ampliar operaciones o financiar inversiones estratégicas de crecimiento."
    },
    {
      icon: Gift,
      title: "Donación de productos, servicios o recursos",
      description: "Contribuye directamente a proyectos y necesidades EdTech, con descuentos o gratuidad."
    },
    {
      icon: Zap,
      title: "Prestando capacidades",
      description: "Ofrece capacidades estratégicas (acceso a mercados, fondeo, tecnología, distribución) para acelerar el impacto conjunto."
    }
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
            { label: "Aliados" }
          ]} 
        />
      </Section>
      
      {/* Hero */}
      <Section className="py-20 bg-gradient-to-br from-accent-brand to-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Si eres una entidad pública o privada que quiere <span className="text-sand-200">CONTRIBUIR</span> para que las EdTech cumplan su misión, <span className="text-sand-200">bienvenido</span> al mundo de los <span className="text-sand-200">ALIADOS</span>
          </h1>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Ser aliado de <strong>Colombia EdTech</strong> es una forma concreta de <strong>transformar la educación</strong> del país: 
            ser parte del cambio estructural que impacta positivamente la educación, el emprendimiento y el desarrollo económico de cientos de miles de personas. 
            <strong> Tú</strong> puedes dejar huella en el futuro de las nuevas generaciones.
          </p>
          <CTAButton 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={handleAllyContactClick}
            asChild
          >
            <Link to="/aliados#form">
              QUIERO SER PARTE DE COLOMBIA EDTECH
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* ¿Por qué unirte? */}
      <Section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            ¿Por qué unirte como aliado de Colombia EdTech?
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-gray-700 mb-6">
              Si buscas una manera de <strong>dejar huella real</strong> y aportar al cambio educativo en Latinoamérica, esta es tu oportunidad.
            </p>
            <div className="bg-primary-50 p-6 rounded-lg mb-6">
              <p className="text-lg text-primary-800 mb-4">
                El <strong>mercado EdTech en LATAM</strong> generó alrededor de <strong>US$ 2,645 millones (2023)</strong> y se proyecta un <strong>CAGR de 15.3%</strong> hasta alcanzar <strong>US$ 7,156 millones en 2030</strong>.
              </p>
              <p className="text-lg text-primary-800">
                Un sector <strong>rentable</strong> y en <strong>crecimiento exponencial</strong> donde no solo ganas: <strong>cambias el mundo</strong>.
              </p>
            </div>
            <p className="text-lg text-gray-700">
              Ser aliado no es solo aportar dinero, recursos o contactos; es <strong>invertir en el futuro</strong> de miles de estudiantes, 
              docentes, instituciones y emprendedores que están creando el mañana.
            </p>
          </div>
        </div>
      </Section>

      {/* Ser parte es */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Ser parte de Colombia EdTech es…
          </h2>
          <div className="bg-primary-50 p-8 rounded-lg">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3 text-xl">•</span>
                <strong>Apoyar a 50+ EdTech asociadas</strong> que ya innovan y cambian la educación, ayudándoles a <strong>escalar</strong> y llegar a más estudiantes, docentes e instituciones.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3 text-xl">•</span>
                Alcanzar un <strong>impacto masivo</strong>: hoy las EdTech asociadas impactan <strong>4.8M+ personas</strong>, <strong>29,550+ instituciones</strong> y <strong>40,000+ docentes</strong>.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3 text-xl">•</span>
                Impulsar la <strong>transformación digital</strong> en todos los sectores: <strong>1,500+ empresas</strong> ya se benefician de estas soluciones.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3 text-xl">•</span>
                Asegurar <strong>retorno de inversión transparente</strong>: <strong>65.35%</strong> de los asociados <strong>mide su impacto</strong>.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3 text-xl">•</span>
                Ser un <strong>acelerador</strong>: <strong>72.2%</strong> inició con <strong>recursos propios</strong>; tu apoyo <strong>expande operaciones</strong> y <strong>multiplica</strong> el impacto.
              </li>
            </ul>
            <div className="text-center mt-8">
              <CTAButton 
                onClick={handleAllyContactClick}
                asChild
              >
                <Link to="/aliados#form">
                  HAZ QUE TU MARCA DEJE HUELLA EN LA EDUCACIÓN
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="py-16 bg-gray-50">
        <SectionHeader
          title="¿Qué gana tu entidad siendo aliada?"
          subtitle="Beneficios de ser aliado"
          description="Todo lo que obtienes al unirte como aliado de Colombia EdTech"
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

      {/* Networking */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Networking y comunidad
          </h2>
          <div className="bg-accent-50 p-8 rounded-lg">
            <p className="text-lg text-gray-700 mb-6">
              A través de Colombia EdTech te conectas con líderes de <strong>educación, tecnología, gobierno y empresa</strong> que trabajan juntos para transformar el sistema.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Si buscas <strong>alianzas estratégicas</strong> o expandir tu red de <strong>contactos clave</strong>, este es el lugar.
            </p>
            <p className="text-xl font-semibold text-primary-900 mb-8">
              Ser aliado <strong>no es solo negocio</strong>: es una <strong>inversión en el futuro</strong> del país y de su educación.
            </p>
            <CTAButton 
              size="lg"
              onClick={handleAllyContactClick}
              asChild
            >
              <Link to="/aliados#form">
                QUIERO SER UN ALIADO DE COLOMBIA EDTECH
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Formas de aliarse */}
      <Section className="py-16 bg-gray-50">
        <SectionHeader
          title="¿De qué formas te puedes aliar?"
          subtitle="Opciones de colaboración"
          description="Diferentes maneras de contribuir al ecosistema EdTech"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {formasAlianza.map((forma, index) => (
            <Card key={index} className="p-6 text-center h-full">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <forma.icon className="w-8 h-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{forma.title}</h3>
                <p className="text-gray-700">{forma.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Requisitos */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Requisitos para ser aliado
          </h2>
          <div className="bg-white border-2 border-primary-200 p-8 rounded-lg">
            <p className="text-lg text-gray-700 mb-6">
              Es sencillo. Para sumar valor al ecosistema EdTech de Colombia, tu organización debe:
            </p>
            <ul className="space-y-4 text-lg text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Tener <strong>capacidad de donativos</strong> (recursos financieros y/o estructurales) que apoyen el desarrollo misional.
              </li>
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Contar con <strong>capacidades estratégicas</strong> que aporten valor (acceso a mercados, distribución, fondeo, desarrollo tecnológico, etc.).
              </li>
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Ofrecer un <strong>producto/servicio relevante</strong> para las EdTech (descuentos especiales o acuerdos comerciales).
              </li>
            </ul>
            <div className="text-center">
              <CTAButton 
                onClick={handleAllyContactClick}
                asChild
              >
                <Link to="/aliados#form">
                  QUIERO SER UN ALIADO DE COLOMBIA EDTECH
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
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Queridos aliados…</h2>
          <p className="text-xl mb-6 text-white/90 leading-relaxed">
            La tecnología puede <strong>transformar la educación</strong> y brindar a la juventud herramientas para cambiar sus vidas y las de sus familias.
            Pero este cambio <strong>no se logra en solitario</strong>.
          </p>
          <p className="text-lg mb-6 text-white/80">
            Necesitamos aliados que comprendan que este es un <strong>punto de inflexión</strong>. Al unirte, apoyarás un ecosistema que <strong>revoluciona</strong> la educación 
            y recibirás <strong>informes claros</strong> de cómo tu contribución impulsa el acceso al conocimiento y forma a los profesionales que <strong>cambiarán industrias completas</strong>.
          </p>
          <p className="text-2xl font-bold mb-8">Este es tu legado: una inversión en un futuro lleno de oportunidades.</p>
          <CTAButton 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={handleAllyContactClick}
            asChild
          >
            <Link to="/aliados#form">
              EL MOMENTO DE ACTUAR ES AHORA, ÚNETE AQUÍ
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-16 bg-sand-100">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Quieres ser aliado?</h3>
          <p className="text-gray-600 mb-6">
            Formulario de contacto próximamente disponible
          </p>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-500 italic">
              Mientras tanto, contáctanos a info@colombiaedtech.org
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aliados;