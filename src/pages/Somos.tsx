import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { LogoGrid } from "@/components/ui/logo-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Globe, Award, Handshake, Building2, BookOpen } from "lucide-react";

const Somos = () => {
  const meta = generatePageMeta({
    title: "Quiénes Somos",
    description: "La revolución de la educación ha comenzado. Conoce la misión, visión y valores de Colombia EdTech en la transformación educativa"
  });

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Somos", item: `${window.location.origin}/somos` }
  ]);

  const valores = [
    {
      icon: Lightbulb,
      title: "Innovación",
      description: "La tecnología está presente en todas las áreas de nuestra vida; adaptarnos a sus beneficios, y crear sobre ella mejorará significativamente la calidad de vida de profesores, estudiantes e instituciones educativas."
    },
    {
      icon: Handshake,
      title: "Colaboración", 
      description: "La tecnología está presente en todas las áreas de nuestra vida; adaptarnos a sus beneficios, y crear sobre ella mejorará significativamente la calidad de vida de profesores, estudiantes e instituciones educativas."
    },
    {
      icon: Globe,
      title: "Accesibilidad",
      description: "La tecnología está presente en todas las áreas de nuestra vida; adaptarnos a sus beneficios, y crear sobre ella mejorará significativamente la calidad de vida de profesores, estudiantes e instituciones educativas."
    },
    {
      icon: Users,
      title: "Impacto Social",
      description: "Contribuimos al mejoramiento de la calidad y a la maximización de la cobertura y calidad educativa del país, identificando y fortaleciendo las edtech en Colombia."
    }
  ];

  const asociados = [
    "Universidad EAFIT", "Cymetria", "Coschool", "Hypercubus", "CGSO",
    "EduLabs", "Geek Girls LATAM", "Laboratoria", "Mangus Academy", "Mind Hub",
    "TOMI", "Buen Data", "RDC", "Naska Digital", "Núcleo Software"
  ];

  const medios = [
    "Blu Radio", "TIC", "Forbes", "Portafolio"
  ];

  const impactStats = [
    { value: "+29.550", label: "Instituciones", icon: Building2 },
    { value: "40.000", label: "Docentes", icon: BookOpen },
    { value: "+4.8M", label: "Personas", icon: Users },
    { value: "15.000", label: "Empresas", icon: Building2 }
  ];

  const additionalStats = [
    { value: "38.2%", label: "De nuestros asociados llegan a 5-6 países" },
    { value: "72.2%", label: "De nuestras EdTechs asociadas comenzó con recursos propios" },
    { value: "79.62%", label: "De los founders de nuestras EdTech tienen un título de postgrado" },
    { value: "2/3", label: "De los founders de nuestras EdTech tienen un título de postgrado" }
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

      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Somos" }
          ]} 
        />
      </Section>
      
      {/* Hero Section with Background Image */}
      <Section className="py-20 relative overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
          <div className="w-full h-full bg-gray-400 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-sm opacity-75 mb-2">Hero Background Image</div>
              <div className="text-xs opacity-50">Presentation/Conference Photo</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl text-white">
          <div className="mb-8">
            <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-8">
              <div className="text-lg font-bold">
                <span style={{ color: 'var(--color-accent)' }}>ET</span>
                <span style={{ color: 'var(--color-primary-700)' }}> Colombia EdTech.</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            La evolución de la educación ha comenzado
          </h1>
          
          <div className="space-y-6 text-lg max-w-3xl">
            <p>
              Sabemos que la educación es el motor de transformación social y económico que nuestro país y el mundo necesitan.
            </p>
            <p>
              Conectamos a startups, scaleups, empresas tradicionales, universidades, colegios, ONG, Bigtech, el estado y la comunidad: todos unidos por un objetivo común, dispuestos a revolucionar desde la raíz la manera en que se enseña y aprende.
            </p>
          </div>
        </div>
      </Section>

      {/* Asociados Section */}
      <Section className="section bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            Nuestros asociados están transformando la educación en Colombia y el Mundo
          </h2>
        </div>
        
        <div className="mb-8">
          <LogoGrid 
            partners={asociados.slice(0, 10)}
            className="mt-8"
          />
        </div>
        
        <div className="text-center">
          <button className="btn btn-outline px-6 py-2 text-sm">
            Ver todos los asociados
          </button>
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="section bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            Tenemos un norte claro para dejar huella y cambiar el mundo desde la educación gracias a la tecnología.
          </h2>
          
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}>
              ¿Cómo lo hacemos?
            </h3>
            <p className="text-lg max-w-4xl mx-auto" style={{ color: 'var(--color-primary-700)' }}>
              Tejiendo lazos de colaboración entre organizaciones con ánimo y sin ánimo de lucro que trabajan por la educación, impulsando soluciones innovadoras que impacten a millones de personas.
            </p>
          </div>
        </div>
      </Section>

      {/* Clear Mission Section - Blue Background */}
      <Section className="section text-white" style={{ background: 'var(--color-primary-700)' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'var(--color-accent)' }}>
                <span className="text-white font-bold">✓</span>
              </div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Nuestra misión es clara
              </h2>
            </div>
            
            <div className="space-y-6 text-lg">
              <p>
                <strong>Transformar la calidad, inclusión y accesibilidad de la educación en Colombia y Latinoamérica.</strong>
              </p>
              <p>
                No se trata solo de enseñar, sino de abrir caminos hacia un aprendizaje significativo que conecte estudiantes, docentes e instituciones con las oportunidades del mundo moderno.
              </p>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: 'var(--color-accent)' }}>
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  ¿Cómo lo hacemos?
                </h3>
              </div>
              <p className="text-lg">
                Tejiendo lazos de colaboración entre organizaciones con ánimo y sin ánimo de lucro que trabajan por la educación, impulsando soluciones innovadoras que impacten a millones de personas.
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-sm mb-2">Mission Image Placeholder</div>
              <div className="text-xs">Conference/Event Photo</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Vision 2030 Section - Coral Background */}
      <Section className="section text-white" style={{ background: 'var(--color-accent)' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/10 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="text-sm mb-2">Vision Image Placeholder</div>
              <div className="text-xs">Conference/Event Photo</div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-4">
                <span className="text-accent font-bold">✓</span>
              </div>
              <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                Nuestro horizonte es ambicioso.
              </h2>
            </div>
            
            <div className="space-y-6 text-lg">
              <p>
                Para <strong>2030</strong>, seremos líderes en Latinoamérica en la creación de un ecosistema EdTech ético, dinámico y colaborativo que transforme el aprendizaje, impulse la globalización y priorice la personalización educativa.
              </p>
              <p>
                Queremos un modelo donde <strong>aprender sea tan natural como respirar, y enseñar sea la puerta hacia un futuro lleno de progreso y equidad.</strong>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Media Section */}
      <Section className="section bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            Nos has visto en
          </h2>
        </div>
        
        <LogoGrid 
          partners={medios}
          className="mt-8"
        />
      </Section>

      {/* Values Section */}
      <Section className="section bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            Estos son los valores que nos mueven en Colombia EdTech
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valores.map((valor, index) => (
            <Card key={index} className="p-6 text-center bg-sand/30 border-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                <valor.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
                {valor.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-primary-700)' }}>
                {valor.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Impact Section */}
      <Section className="section text-white" style={{ background: 'var(--color-primary-700)' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            El impacto de nuestro trabajo
          </h2>
          <p className="text-xl">Nuestros asociados impactan a</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg border-2 border-white/20">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
                <stat.icon className="w-6 h-6" style={{ color: 'var(--color-primary-700)' }} />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalStats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-lg border-2 border-white/20">
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section className="section bg-sand/30">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            Somos la revolución de la educación
          </h2>
          
          <div className="mb-8 bg-white/60 rounded-lg aspect-video max-w-4xl mx-auto flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg mb-2">Event Image Placeholder</div>
              <div className="text-sm">Conference/Presentation Photo</div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
              Únete a Colombia EdTech
            </h3>
            <p className="text-lg max-w-4xl mx-auto mb-8" style={{ color: 'var(--muted)' }}>
              Hoy todos somos Colombia EdTech. Unidos, construiremos una educación que no solo inspire y transforme, sino que lidere el cambio que el mundo necesita, una generación a la vez.
            </p>
          </div>
          
          <CTAButton size="lg" asChild>
            <Link to="/asociados">
              Quiero ser parte de Colombia EdTech
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>
    </>
  );
};

export default Somos;