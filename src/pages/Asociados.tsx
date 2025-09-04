import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { LogoGrid } from "@/components/ui/logo-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Network, Award, BookOpen, Users, Target, TrendingUp } from "lucide-react";

const Asociados = () => {
  const meta = generatePageMeta({
    title: "Asociados",
    description: "Si eres una organización que transforma la educación con tecnología, únete a Colombia EdTech. Red de contactos, visibilidad y articulación con el Estado"
  });

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Asociados", item: `${window.location.origin}/asociados` }
  ]);

  const handleAssociateClick = () => {
    trackCTA(GA_EVENTS.CTA_ASSOCIATE_CLICK, 'asociados_cta');
  };

  const beneficios = [
    {
      icon: Network,
      title: "Red de contactos estratégica",
      description: "Conecta con líderes del sector, potenciales aliados y oportunidades de negocio nacionales e internacionales."
    },
    {
      icon: Award,
      title: "Visibilidad y respaldo de marca", 
      description: "Participa en eventos, publicaciones y plataformas que amplifican tu impacto. Contar con el aval del gremio abre puertas."
    },
    {
      icon: Target,
      title: "Articulación con el Estado",
      description: "Participa en la construcción de políticas públicas de educación con impacto a 10 años."
    },
    {
      icon: Users,
      title: "Proyectos colaborativos",
      description: "Alíate con otros asociados para crear soluciones, presentar proyectos y acelerar crecimiento."
    },
    {
      icon: BookOpen,
      title: "Biblioteca sector / Inteligencia",
      description: "Acceso a estudios, investigaciones e informes con insights y mapeo anual del sector."
    },
    {
      icon: TrendingUp,
      title: "Formación y consultoría",
      description: "Talleres y programas sobre inversión, ventas, modelo de negocio, decisiones y equipos."
    }
  ];

  const asociados = [
    "EdTech A", "Startup B", "Universidad C", "Fundación D", "ONG E", "Empresa F"
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
            { label: "Asociados" }
          ]} 
        />
      </Section>
      
      {/* Hero */}
      <Section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Si eres una organización que está <span className="text-accent-brand">TRANSFORMANDO</span> la educación, bienvenida al mundo de los <span className="text-accent-brand">ASOCIADOS</span>
          </h1>
          <p className="text-xl mb-8 text-primary-100 leading-relaxed">
            Tenemos una herramienta capaz de derribar las barreras que han limitado a generaciones enteras: <strong>la tecnología</strong>. 
            Pero la tecnología, por sí sola, no es suficiente. El verdadero cambio necesita <strong>unión, sinergia, comunidad</strong>. 
            Aquí entras tú; aquí entra tu organización: el éxito es posible <strong>cuando trabajamos juntos</strong>.
          </p>
          <CTAButton 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={handleAssociateClick}
            asChild
          >
            <Link to="/asociados#form">
              QUIERO SER PARTE DE COLOMBIA EDTECH
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Testimonios */}
      <Section className="py-16">
        <SectionHeader
          title="Testimonios de asociados"
          subtitle="Historias de éxito"
          description="Lo que dicen nuestros asociados sobre Colombia EdTech"
        />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="p-8">
            <p className="text-lg text-gray-700 mb-4 italic">
              "Colombia EdTech nos conectó con aliados clave y aceleró nuestra expansión."
            </p>
            <p className="text-primary-700 font-medium">— Nombre, EdTech A</p>
          </Card>
          <Card className="p-8">
            <p className="text-lg text-gray-700 mb-4 italic">
              "Participar en mesas de política pública nos dio voz y visibilidad sectorial."
            </p>
            <p className="text-primary-700 font-medium">— Nombre, EdTech B</p>
          </Card>
        </div>
      </Section>

      {/* Problemas Reales */}
      <Section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Soluciones reales, para problemas reales
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Lo sabemos...</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3">•</span>
                El <strong>30%</strong> de las EdTech está en proceso de <strong>quiebra o pivot</strong> en Colombia.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3">•</span>
                Existe <strong>poca financiación</strong> inicial; solo <strong>27.8%</strong> logró apoyo externo.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3">•</span>
                El <strong>35%</strong> nunca pasó por <strong>programas de aceleración</strong>.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3">•</span>
                Falta formación especializada en <strong>B2B, B2C, B2G y B2B2C</strong> enfocada en EdTech.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3">•</span>
                El Gobierno es <strong>lento</strong> en licitaciones educativas.
              </li>
              <li className="flex items-start">
                <span className="text-accent-brand font-bold mr-3">•</span>
                El <strong>B2C</strong> enfrenta <strong>cambios en capacidad de pago</strong>.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="py-16">
        <SectionHeader
          title="¿Qué podemos hacer para ayudarte?"
          subtitle="Beneficios de ser asociado"
          description="Todo lo que obtienes al unirte a nuestra comunidad"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {beneficios.map((beneficio, index) => (
            <Card key={index} className="p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <beneficio.icon className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{beneficio.title}</h3>
              <p className="text-gray-700">{beneficio.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Precio */}
      <Section className="py-16 bg-accent-50">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">La mejor inversión costo-eficiente</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-2xl font-bold text-accent-brand mb-4">Solo pagas 1 SMLV/año para pertenecer</p>
            <CTAButton 
              size="lg"
              onClick={handleAssociateClick}
              asChild
            >
              <Link to="/asociados#form">
                REGÍSTRATE PARA SER UN ASOCIADO HOY
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Contexto */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contexto y autoridad</h2>
          <div className="bg-primary-50 p-8 rounded-lg">
            <p className="text-lg text-gray-700 mb-6">
              Actuamos <strong>basados en datos</strong>, no en opinión.
            </p>
            <ul className="space-y-4 text-gray-700 mb-6">
              <li>• Hay <strong>fragmentación</strong> del sistema educativo y <strong>desconexión</strong> entre actores.</li>
              <li>• La <strong>deserción</strong>, los <strong>cierres de instituciones</strong> y la <strong>infraestructura</strong> rezagada alcanzan máximos de la década.</li>
              <li>• Persisten <strong>brechas de acceso</strong> a tecnología que limitan oportunidades.</li>
            </ul>
            <p className="text-lg text-gray-700">
              Aun así, existen <strong>170+ EdTech</strong> en Colombia que <strong>ya crearon soluciones</strong>; 
              <strong> 50+</strong> hacen parte de nuestro ecosistema.
            </p>
          </div>
        </div>
      </Section>

      {/* #OrgulloEdTech */}
      <Section className="py-16 bg-gray-50">
        <SectionHeader
          title="#OrgulloEdTech"
          subtitle="Conoce a quienes ya están transformando"
          description="¿Las conoces? ¿Has aprovechado sus soluciones?"
        />
        
        <LogoGrid 
          partners={asociados}
          className="mt-12"
        />
        
        <div className="text-center mt-12">
          <CTAButton 
            onClick={handleAssociateClick}
            asChild
          >
            <Link to="/asociados#form">
              ÚNETE A QUIENES YA ESTÁN TRANSFORMANDO LA EDUCACIÓN
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Requisitos */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Claridad: requisitos para ser asociado
          </h2>
          <div className="bg-white border-2 border-primary-200 p-8 rounded-lg">
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Compromiso con la <strong>transformación educativa</strong> del país.
              </li>
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Operar (con o sin ánimo de lucro) en <strong>educación, tecnología o innovación</strong>.
              </li>
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Compartir nuestros valores de <strong>colaboración, impacto social y accesibilidad</strong>.
              </li>
              <li className="flex items-start">
                <span className="text-primary-700 font-bold mr-3">✓</span>
                Interés en <strong>contribuir activamente</strong> al fortalecimiento del ecosistema EdTech en Colombia y Latinoamérica.
              </li>
            </ul>
            <div className="text-center mt-8">
              <CTAButton 
                onClick={handleAssociateClick}
                asChild
              >
                <Link to="/asociados#form">
                  REGÍSTRATE PARA SER UN ASOCIADO HOY
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Prueba Social */}
      <Section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prueba social</h2>
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-xl font-bold text-primary-700 mb-6">#OrgulloEdTech — logros actuales</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <ul className="space-y-2">
                  <li>• <strong>85+</strong> EdTech asociadas</li>
                  <li>• Impacto: <strong>4.8M+ personas</strong>, <strong>29,550+ instituciones</strong></li>
                  <li>• <strong>40,000+ docentes</strong> y <strong>1,500+ empresas</strong></li>
                  <li>• <strong>65.35%</strong> mide su impacto</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li>• <strong>38.2%</strong> llega a <strong>2–5 países</strong> y <strong>35%</strong> a <strong>6+</strong></li>
                  <li>• <strong>72.2%</strong> comenzó con <strong>recursos propios</strong></li>
                  <li>• <strong>79.62%</strong> de fundadores tiene <strong>posgrado</strong></li>
                  <li>• <strong>2/3</strong> de equipos fundadores incluyen <strong>mujeres</strong></li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <CTAButton 
                onClick={handleAssociateClick}
                asChild
              >
                <Link to="/asociados#form">
                  YO TAMBIÉN QUIERO SER PARTE DE COLOMBIA EDTECH
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
          <h2 className="text-3xl md:text-4xl font-bold mb-8">¿Por qué asociarte ahora?</h2>
          <p className="text-xl mb-6 text-white/90 leading-relaxed">
            El mundo cambia rápido y la tecnología educativa marca el camino. Si queremos un impacto <strong>profundo y sostenible</strong>, 
            debemos hacerlo <strong>juntos</strong>.
          </p>
          <p className="text-lg mb-8 text-white/80">
            Aquí <strong>creas conexiones estratégicas</strong>, compartes buenas prácticas y construyes <strong>soluciones reales</strong> a los desafíos urgentes del sector. 
            Contribuyes al desarrollo del país, encuentras aliados y conviertes la innovación en <strong>proyectos tangibles</strong> que benefician a millones.
          </p>
          <p className="text-lg mb-8 text-white/80">
            No creemos en soluciones individuales ni cambios pequeños: creemos en una <strong>revolución educativa</strong> que une <strong>talentos, recursos y voluntades</strong>.
          </p>
          <p className="text-2xl font-bold mb-8">Bienvenida/o.</p>
          <CTAButton 
            variant="primary" 
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={handleAssociateClick}
            asChild
          >
            <Link to="/asociados#form">
              HAZ PARTE DEL CAMBIO, REGÍSTRATE AHORA
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-16 bg-sand-100">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Quieres asociarte?</h3>
          <p className="text-gray-600 mb-6">
            Formulario de asociación próximamente disponible
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

export default Asociados;