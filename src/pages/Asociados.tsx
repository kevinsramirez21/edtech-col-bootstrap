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
import eventoAsociadosImg from "@/assets/evento-edtech-fondo.jpg";

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
      title: "Red de Contactos estratégica",
      description: "Podrás conectar con líderes del sector, posibles aliados y oportunidades de negocio a nivel nacional e internacional. Un pase directo a la comunidad de fundadores de Ed Tech, networking y grupos focales"
    },
    {
      icon: Award,
      title: "Visibilidad y respaldo de una marca de confianza", 
      description: "Podrás participar en eventos, publicaciones y plataformas que amplifican tu impacto. Recuerda que en el mundo actual, no se vende el mejor, sino el más conocido. Y tener un aval de una marca de valor te abre puertas ante usuarios, donantes e inversionistas"
    },
    {
      icon: Building2,
      title: "Articulación con el estado",
      description: "Podrás conectar con líderes del sector, posibles aliados y oportunidades de negocio a nivel nacional e internacional. Un pase directo a la comunidad de fundadores de Ed Tech, networking y grupos focales"
    },
    {
      icon: Users,
      title: "Participación en proyectos colaborativos",
      description: "Podrás aliarte con otros asociados para crear soluciones innovadoras que cambien vidas, presentar proyectos, abrir mercados y todo aprovechando sus fortalezas y acelerando su crecimiento."
    },
    {
      icon: BookOpen,
      title: "Biblioteca de recursos relevantes y actualizados.",
      description: "Podrás tener acceso a estudios, investigaciones e informes actualizados sobre el sector con sus insights y mapeo anual"
    },
    {
      icon: GraduationCap,
      title: "Formación y consultoría basada en tus necesidades",
      description: "Podrás capacitarte con talleres y programas en vivo y grabados enfocados en temas como: gestión de inversión, ventas, modelo de negocio, toma de decisiones, gestión de equipos, internacionalización, marketing, comunicación. Todos liderados por expertos y referentes del mercado actual."
    }
  ];

  const testimonios = [
    {
      name: "Angela Andrade",
      role: "Managing Director | Scala Higher Education",
      quote: "Nos dieron la mirada que nos faltaba para crear lared Latinoamericana de Universidades Católicas.",
      color: "blue"
    },
    {
      name: "Santiago Carrillo",
      role: "CEO Ada School",
      quote: "Colombia EdTech predica con el ejemplo, inspirando a otros a través de la acción. Su voluntad de compartir ideas de su trayectoria empresarial, incluida su experiencia en Y Combinator, ha demostrado ser invaluable.",
      color: "red"
    },
    {
      name: "Valeria Velandia",
      role: "Estrategia | Innovate Learning",
      quote: "Nos ayudaron a crear nuestra ruta para escalar el equipo y construir capacidades empresariales. Por ende mi negocio ha crecido",
      color: "blue"
    },
    {
      name: "Oscar Ivan Rodriguez",
      role: "CEO y Co-founder | InnovaHub",
      quote: "Ser aliado de Colombia Ed Tech me ha ayudado a ver aspectos fundamentales de la planeación estratégica y el trabajo en equipo, siempre desde una lógica muy aterrizada y propia del mundo Startup",
      color: "red"
    }
  ];

  const statistics = [
    {
      percentage: "30%",
      description: "De las EdTechs están en proceso de quiebra o pivot en Colombia"
    },
    {
      percentage: "27.8%",
      description: "De las EdTechs logró apoyo externo",
      label: "Existe poca financiación, sólo"
    },
    {
      percentage: "35%",
      description: "De las EdTechs nunca pasó por un proceso de aceleración"
    }
  ];

  const requirements = [
    "Estar Comprometido con la educación del país",
    "Operar con o sin ánimo de lucro en sectores relacionados con educación, tecnología o innovación.",
    "Compartir los valores de colaboración, impacto social y accesibilidad que definen a Colombia EdTech.",
    "Tener interés en contribuir activamente al fortalecimiento del ecosistema EdTech de Colombia y Latinoamérica"
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
          <img 
            src={eventoAsociadosImg} 
            alt="Evento Colombia EdTech" 
            className="w-full h-full object-cover object-center"
          />
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
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold hover-scale shadow-2xl hover:shadow-[0_20px_50px_rgba(247,60,92,0.5)] transition-all duration-300"
                onClick={handleAssociateClick}
                asChild
              >
                <Link to="/asociados#form">
                  Únete ahora <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* Technology & Union Section */}
      <Section className="py-20 bg-[#F4E8DD] relative overflow-hidden">
        {/* Decorative bars */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-b from-[#F73C5C] to-[#8B3A8B]"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-b from-[#8B3A8B] to-[#F73C5C]"></div>
        
        <div className="container max-w-7xl mx-auto px-8 lg:px-16">
          {/* First Row - Image Left, Text Right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative">
              {/* Placeholder for Colombia EdTech stage image */}
              <div className="aspect-video bg-gray-300 rounded-lg shadow-xl border-4 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-center">
                  Colombia EdTech Stage<br/>
                  <small>Placeholder</small>
                </span>
              </div>
            </div>
            <div>
              <p className="text-lg text-[#0B47CE] mb-6 leading-relaxed">
                Tenemos herramientas capaz de derribar las barreras que han limitado generaciones enteras, una herramienta para abrir puertas a un aprendizaje accesible, personalizado y relevante para todos, y esta herramienta es ...
              </p>
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-[#F73C5C]">La tecnología</span>
              </h2>
              <p className="text-xl text-[#0B47CE] font-medium">
                Pero la tecnología, por sí sola, <span className="text-[#F73C5C] font-bold">no es suficiente.</span>
              </p>
            </div>
          </div>

          {/* Second Row - Text Left, Image Right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-8 leading-tight">
                <span className="text-[#F73C5C]">El verdadero cambio necesita unión, sinergia, comunidad</span>
              </h3>
              <p className="text-xl text-[#0B47CE]">
                Aquí es donde entras tú, entra tu organización, por que el éxito está garantizado cuando <span className="text-[#F73C5C] font-bold">trabajamos juntos</span>
              </p>
            </div>
            <div className="relative">
              {/* Placeholder for Google office image */}
              <div className="aspect-[4/3] bg-gray-300 rounded-lg shadow-xl border-4 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-gray-600 text-center">
                  Google Office Community Image<br/>
                  <small>Placeholder</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-12 bg-[#F4E8DD]">
        <div className="container text-center">
          <CTAButton 
            size="lg"
            className="btn-primary"
            onClick={handleAssociateClick}
            asChild
          >
            <Link to="/asociados#form">
              Quiero ser asociado de Colombia EdTech
            </Link>
          </CTAButton>
        </div>
      </Section>

      {/* Testimonios */}
      <Section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-[#F73C5C]">Algunos testimonios de nuestros asociados</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonios.map((testimonio, index) => (
              <div 
                key={index}
                className={`p-8 rounded-lg text-white ${
                  testimonio.color === 'blue' 
                    ? 'bg-[#0B47CE]' 
                    : 'bg-[#F73C5C]'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <div className="w-12 h-12 bg-white/40 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonio.name}</h4>
                    <p className="text-sm opacity-90">{testimonio.role}</p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  {testimonio.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Problemas Reales */}
      <Section className="py-16 bg-[#0B47CE] text-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Soluciones reales para problemas reales
          </h2>
          <h3 className="text-2xl mb-12 opacity-90">Lo sabemos ...</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {statistics.slice(0, 2).map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6 border-2 border-white/20">
                <div className="text-4xl font-bold mb-2">{stat.percentage}</div>
                <div className="text-sm mb-2 opacity-80">{stat.label}</div>
                <div className="text-base">{stat.description}</div>
              </div>
            ))}
            <div className="bg-white/10 rounded-lg p-6 border-2 border-white/20">
              <div className="text-4xl font-bold mb-2">{statistics[2].percentage}</div>
              <div className="text-base">{statistics[2].description}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-base leading-relaxed">
                Hay una ausencia de formación especializada en BTC, BTG, y BTBTC enfocado en EdTech
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-base leading-relaxed">
                El gobierno es lento en las licitaciones educativas, y le sector B2C enfrenta cambios en la capacidad de pago
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section id="beneficios" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-[#F73C5C]">¿Cómo podemos hacer para ayudarte?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => {
              const bgImages = [
                'bg-gradient-to-br from-blue-900 to-blue-700',
                'bg-gradient-to-br from-red-600 to-pink-600', 
                'bg-gradient-to-br from-purple-900 to-purple-700',
                'bg-gradient-to-br from-green-800 to-green-600',
                'bg-gradient-to-br from-orange-700 to-yellow-600',
                'bg-gradient-to-br from-indigo-900 to-purple-800'
              ];
              
              return (
                <div 
                  key={index} 
                  className={`${bgImages[index]} text-white p-8 rounded-lg relative overflow-hidden`}
                >
                  {/* Background placeholder for images */}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 leading-tight">{beneficio.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{beneficio.description}</p>
                  </div>
                </div>
              );
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
          <CTAButton 
            size="lg"
            className="btn-primary mb-12"
            onClick={handleAssociateClick}
            asChild
          >
            <Link to="/asociados#form">
              Regístrate para ser asociado hoy
            </Link>
          </CTAButton>

          <h3 className="text-2xl md:text-3xl font-bold text-[#0B47CE] mb-8">
            ¿Qué requisitos debe cumplir tu organización para ser <span className="text-[#F73C5C]">Asociado?</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {requirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-[#0B47CE] mt-1 flex-shrink-0" />
                <p className="text-gray-800 text-base">{requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Associate Now */}
      <Section className="py-16 bg-[#0B47CE] text-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">¿Por que asociarte ahora?</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 leading-relaxed">
                El mundo está cambiando rápido, y la tecnología educativa está marcando el camino. Pero si queremos que ese cambio sea profundo y sostenible, necesitamos hacerlo juntos
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Juntos, creamos conexiones estratégicas, compartimos buenas prácticas y construimos soluciones reales para los desafíos más urgentes del sector educativo.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Tú puedes ser parte de esta red, donde no solo estás contribuyendo al desarrollo del país, sino también encontrando aliados que te ayudan a avanzar en tu propio propósito. Donde la innovación deja de ser una idea lejana y se convierte en algo tangible, en proyectos que benefician a millones de personas.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Nosotros creemos profundamente en la fuerza de actuar juntos.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                En Colombia EdTech no creemos en las soluciones individuales ni en los cambios pequeños. Creemos en una revolución educativa que solo puede ocurrir si unimos talentos, recursos y voluntades.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="aspect-video bg-white/10 rounded-lg border-4 border-dashed border-white/30 flex items-center justify-center">
                <span className="text-white/70 text-center">
                  Community Group Photo<br/>
                  <small>Placeholder</small>
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-white/10 rounded-lg border-4 border-dashed border-white/30 flex items-center justify-center">
                  <span className="text-white/70 text-xs text-center">Speaker 1</span>
                </div>
                <div className="aspect-square bg-white/10 rounded-lg border-4 border-dashed border-white/30 flex items-center justify-center">
                  <span className="text-white/70 text-xs text-center">Speaker 2</span>
                </div>
                <div className="aspect-square bg-white/10 rounded-lg border-4 border-dashed border-white/30 flex items-center justify-center">
                  <span className="text-white/70 text-xs text-center">Speaker 3</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-3xl font-bold mb-8">Bienvenido</h3>
            <CTAButton 
              size="lg"
              className="bg-white text-[#0B47CE] hover:bg-gray-100"
              onClick={handleAssociateClick}
              asChild
            >
              <Link to="/asociados#form">
                Regístrate para ser asociado hoy
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-16 bg-[#F4E8DD]">
        <div className="container max-w-2xl mx-auto text-center">
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