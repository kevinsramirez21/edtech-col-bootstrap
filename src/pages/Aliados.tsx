import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Heart, Network, Globe, Users, DollarSign, Gift, Zap, Megaphone, HandHeart, Eye, CreditCard } from "lucide-react";
import { AllyApplicationForm } from "@/components/forms/ally-application-form";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Image paths - using public folder for better performance
const eventoAliadosPresentacion = "/images/evento-aliados-presentacion.jpg";
const eventoCapacitacionAliados = "/images/evento-capacitacion-aliados.jpg";
const Aliados = () => {
  const meta = generatePageMeta({
    title: "Aliados",
    description: "Si eres una entidad pública o privada que quiere contribuir para que las EdTech cumplan su misión, únete como aliado de Colombia EdTech"
  });
  const breadcrumbLd = generateBreadcrumbJsonLd([{
    name: "Aliados",
    item: `${window.location.origin}/aliados`
  }]);
  const handleAllyContactClick = () => {
    trackCTA(GA_EVENTS.ALLY_CONTACT_CLICK, 'aliados_cta');
  };
  const beneficios = [{
    icon: Megaphone,
    title: "Visibilidad de alto nivel",
    description: "Al apoyar este ecosistema, tu marca será vista como un líder en responsabilidad social y educación transformadora, lo cual refuerza tu reputación en el mercado."
  }, {
    icon: Users,
    title: "Contribuir a la educación",
    description: "El sistema educativo tradicional necesita ser repensado y las EdTech están haciendo este cambio posible, hoy tu puedes ser parte de la creación de soluciones tecnológicas para llegar a miles de estudiantes, docentes e instituciones"
  }, {
    icon: CreditCard,
    title: "Reducir impuestos",
    description: "Como aliado, puedes beneficiarte de incentivos fiscales por tu contribución a la educación y al sector de la innovación."
  }, {
    icon: TrendingUp,
    title: "Vender productos y servicios a las EdTech",
    description: "Como aliado, puedes beneficiarte de incentivos fiscales por tu contribución a la educación y al sector de la innovación."
  }, {
    icon: HandHeart,
    title: "Impacto social y empresarial",
    description: "Estás apostando por un modelo sostenible y estratégico, donde cada dólar invertido se multiplica en un impacto social y educativo que mejora la calidad de vida de millones de personas."
  }, {
    icon: Eye,
    title: "Transparencia total",
    description: "El sistema educativo tradicional necesita ser repensado y las EdTech están haciendo este cambio posible, hoy tu puedes ser parte de la creación de soluciones tecnológicas para llegar a miles de estudiantes, docentes e instituciones"
  }];
  const formasAlianza = [{
    icon: DollarSign,
    title: "Financiación o donaciones económicas",
    description: "Puedes hacer donaciones económicas para que la organización pueda ampliar sus operaciones o financiar alguna de las inversiones propuestas para crecimiento.",
    color: "text-[hsl(var(--color-accent))]"
  }, {
    icon: Gift,
    title: "Donando tus productos, servicios o recursos",
    description: "Puedes contribuir directamente a los proyectos y necesidades de las EdTech, ofreciendo tus productos o servicios a precios reducidos o gratuitamente.",
    color: "text-[hsl(var(--color-accent))]"
  }, {
    icon: Zap,
    title: "Prestando capacidades",
    description: "Si tu empresa tiene capacidades estratégicas (acceso a mercados, financiamiento, tecnología, etc.), puedes ponerlas al servicio del ecosistema de EdTech para crear un impacto conjunto que sea mucho mayor que la suma de las partes.",
    color: "text-[hsl(var(--color-accent))]"
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
        
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>

      {/* Hero */}
      <Section className="py-10 sm:py-14 md:py-20 lg:py-28 bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] lg:min-h-[75vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src={eventoAliadosPresentacion} 
            alt="Evento Colombia EdTech - Aliados" 
            className="w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003889]/80 via-[#0B47CE]/65 to-[#003889]/50"></div>
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center pt-8 sm:pt-12 md:pt-16 lg:pt-20">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight drop-shadow-2xl">
              Aliados
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 lg:mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
              Si eres una entidad pública o privada que quiere 
              <strong className="text-[#F73C5C]"> CONTRIBUIR</strong> para que las EdTech cumplan su misión, 
              bienvenido al mundo de los <strong className="text-[#F73C5C]">ALIADOS</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
              <CTAButton 
                size="lg" 
                className="text-xs sm:text-sm lg:text-base px-5 sm:px-6 py-3 sm:py-4 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold hover-scale shadow-2xl hover:shadow-[0_20px_50px_rgba(247,60,92,0.5)] transition-all duration-300 w-full sm:w-auto" 
                onClick={handleAllyContactClick}
                asChild
              >
                <Link to="/aliados#form">
                  Únete como aliado <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* ¿Por qué unirte? */}
      <Section className="py-8 sm:py-10 lg:py-14 bg-white">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-5">
            <span className="text-[#F73C5C]">¿Por que unirte como aliado a Colombia Edtech?</span>
          </h2>
          
          <div className="max-w-4xl mx-auto mb-6 sm:mb-10">
            <p className="text-sm sm:text-base text-[#0B47CE] mb-3">
              Si estás buscando una manera de <span className="text-[#F73C5C] font-bold">dejar una huella real</span> y <span className="text-[#0B47CE]">aportar al cambio en la educación de Latinoamérica</span>, <span className="text-[#F73C5C] font-bold">esta es tu oportunidad.</span>
            </p>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-5 lg:p-6 text-left">
              <div className="space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm lg:text-base text-[#0B47CE]">
                  El mercado EdTech en América Latina <span className="text-[#F73C5C] font-bold">está experimentando un crecimiento significativo.</span> En 2023, <span className="text-[#F73C5C] font-bold">este mercado generó ingresos de aproximadamente 2,645 millones de dólares</span>, y se espera que continúe creciendo a una tasa compuesta anual (CAGR) <span className="text-[#F73C5C] font-bold">del 15.3% hasta alcanzar 7,156 millones de dólares en 2030.</span>
                </p>
                
                <p className="text-xs sm:text-sm lg:text-base text-[#0B47CE]">
                  Porque ser ALIADO no solo se trata de aportar dinero, recursos o contactos; se trata de <span className="text-[#F73C5C] font-bold">invertir en el futuro de miles de estudiantes, docentes, instituciones y emprendedores</span> que están creando el futuro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="py-8 sm:py-10 lg:py-14 bg-[#F4E8DD]">
        <div className="container px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-10">
            <span className="text-[#0B47CE]">¿Qué gana tu entidad siendo</span><br />
            <span className="text-[#0B47CE]">ALIADO</span> <span className="text-[#0B47CE]">de Colombia EdTech?</span>
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
            {beneficios.map((beneficio, index) => <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-5 lg:p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#F73C5C] rounded-full flex items-center justify-center flex-shrink-0">
                    <beneficio.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#0B47CE] mb-1 sm:mb-2">
                      {beneficio.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0B47CE] leading-relaxed">
                      {beneficio.description}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Formas de aliarse */}
      <Section className="py-8 sm:py-10 lg:py-14 bg-[#0B47CE] text-white">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 lg:mb-10">
            ¿De qué formas te puedes ALIAR con Colombia EdTech?
          </h2>
          
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-6 sm:mb-8 lg:mb-10">
            {formasAlianza.map((forma, index) => <div key={index} className="text-left">
                <div className="flex items-start mb-2 sm:mb-3">
                  <div className="w-5 h-5 bg-[#F73C5C] rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">{forma.title}</h3>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 ml-7">
                  {forma.description}
                </p>
              </div>)}
          </div>

          <div className="relative mb-6 sm:mb-10">
            <OptimizedImage 
              src={eventoCapacitacionAliados} 
              alt="Evento de capacitación Colombia EdTech" 
              className="w-full rounded-lg shadow-2xl"
              aspectRatio="video"
            />
          </div>

          <div className="text-center">
            <CTAButton size="lg" className="bg-[#F73C5C] text-white hover:bg-[#F73C5C]/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F73C5C]/30 text-xs sm:text-sm" onClick={handleAllyContactClick} asChild>
              <Link to="/aliados#form">
                Regístrate para ser aliado hoy
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-8 sm:py-10 lg:py-14 bg-[#F4E8DD]">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B47CE] mb-2 sm:mb-3 text-center">¿Quieres ser aliado?</h3>
          <p className="text-xs sm:text-sm text-[#0B47CE] mb-4 sm:mb-6 text-center max-w-2xl mx-auto">
            Completa el siguiente formulario y nos pondremos en contacto contigo para explorar cómo podemos trabajar juntos
          </p>
          
          <AllyApplicationForm />
        </div>
      </div>
    </>;
};
export default Aliados;