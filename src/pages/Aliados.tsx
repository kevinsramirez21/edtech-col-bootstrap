import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd, trackCTA, GA_EVENTS } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Heart, Network, Globe, Users, DollarSign, Gift, Zap, Megaphone, HandHeart, Eye, CreditCard } from "lucide-react";
import eventoAliadosPresentacion from "@/assets/evento-aliados-presentacion.jpg";
import eventoCapacitacionAliados from "@/assets/evento-capacitacion-aliados.jpg";
import { AllyApplicationForm } from "@/components/forms/ally-application-form";
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
      <Section className="py-24 md:py-40 lg:py-52 bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white relative overflow-hidden min-h-[85vh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={eventoAliadosPresentacion} 
            alt="Evento Colombia EdTech - Aliados" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003889]/80 via-[#0B47CE]/65 to-[#003889]/50"></div>
        </div>
        <div className="relative z-10 container max-w-7xl mx-auto h-full flex items-center pt-20 md:pt-24">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight drop-shadow-2xl">
              Aliados
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-10 leading-relaxed drop-shadow-lg max-w-3xl">
              Si eres una entidad pública o privada que quiere 
              <strong className="text-[#F73C5C]"> CONTRIBUIR</strong> para que las EdTech cumplan su misión, 
              bienvenido al mundo de los <strong className="text-[#F73C5C]">ALIADOS</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{
              animationDelay: '0.2s'
            }}>
              <CTAButton 
                size="lg" 
                className="text-lg px-8 py-6 bg-[#F73C5C] hover:bg-[#F73C5C]/90 text-white font-bold hover-scale shadow-2xl hover:shadow-[0_20px_50px_rgba(247,60,92,0.5)] transition-all duration-300" 
                onClick={handleAllyContactClick}
                asChild
              >
                <Link to="/aliados#form">
                  Únete como aliado <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* ¿Por qué unirte? */}
      <Section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-[#F73C5C]">¿Por que unirte como aliado a Colombia Edtech?</span>
          </h2>
          
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-[#0B47CE] mb-4">
              Si estás buscando una manera de <span className="text-[#F73C5C] font-bold">dejar una huella real</span> y <span className="text-[#0B47CE]">aportar al cambio en la educación de Latinoamérica</span>, <span className="text-[#F73C5C] font-bold">esta es tu oportunidad.</span>
            </p>
            
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-left">
              <div className="space-y-4">
                <p className="text-lg text-[#0B47CE]">
                  El mercado EdTech en América Latina <span className="text-[#F73C5C] font-bold">está experimentando un crecimiento significativo.</span> En 2023, <span className="text-[#F73C5C] font-bold">este mercado generó ingresos de aproximadamente 2,645 millones de dólares</span>, y se espera que continúe creciendo a una tasa compuesta anual (CAGR) <span className="text-[#F73C5C] font-bold">del 15.3% hasta alcanzar 7,156 millones de dólares en 2030.</span>
                </p>
                
                <p className="text-lg text-[#0B47CE]">
                  Porque ser ALIADO no solo se trata de aportar dinero, recursos o contactos; se trata de <span className="text-[#F73C5C] font-bold">invertir en el futuro de miles de estudiantes, docentes, instituciones y emprendedores</span> que están creando el futuro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Beneficios */}
      <Section className="py-16 bg-[#F4E8DD]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-[#0B47CE]">¿Qué gana tu entidad siendo</span><br />
            <span className="text-[#0B47CE]">ALIADO</span> <span className="text-[#0B47CE]">de Colombia EdTech?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {beneficios.map((beneficio, index) => <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-[#F73C5C] rounded-full flex items-center justify-center flex-shrink-0">
                    <beneficio.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0B47CE] mb-3">
                      {beneficio.title}
                    </h3>
                    <p className="text-[#0B47CE] leading-relaxed">
                      {beneficio.description}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Formas de aliarse */}
      <Section className="py-16 bg-[#0B47CE] text-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿De qué formas te puedes ALIAR con Colombia EdTech?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {formasAlianza.map((forma, index) => <div key={index} className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-[#F73C5C] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h3 className="text-xl font-bold">{forma.title}</h3>
                </div>
                <p className="text-base leading-relaxed opacity-90 ml-9">
                  {forma.description}
                </p>
              </div>)}
          </div>

          <div className="relative mb-12">
            <img 
              src={eventoCapacitacionAliados} 
              alt="Evento de capacitación Colombia EdTech" 
              className="w-full aspect-[16/9] object-cover rounded-lg shadow-2xl"
            />
          </div>

          <div className="text-center">
            <CTAButton size="lg" className="bg-[#F73C5C] text-white hover:bg-[#F73C5C]/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F73C5C]/30" onClick={handleAllyContactClick} asChild>
              <Link to="/aliados#form">
                Regístrate para ser aliado hoy
              </Link>
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* Formulario */}
      <div id="form" className="py-16 bg-[#F4E8DD]">
        <div className="container max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-[#0B47CE] mb-4 text-center">¿Quieres ser aliado?</h3>
          <p className="text-[#0B47CE] mb-8 text-center max-w-2xl mx-auto">
            Completa el siguiente formulario y nos pondremos en contacto contigo para explorar cómo podemos trabajar juntos
          </p>
          
          <AllyApplicationForm />
        </div>
      </div>
    </>;
};
export default Aliados;