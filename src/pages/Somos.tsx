import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { LogoGrid } from "@/components/ui/logo-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { Helmet } from "react-helmet-async";
import { generatePageMeta, generateBreadcrumbJsonLd } from "@/lib/seo";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Globe, Award } from "lucide-react";

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
      description: "La tecnología está presente en todas las áreas de nuestra vida; adaptarnos a sus beneficios y crear sobre ella mejora la calidad de vida de profesorado, estudiantes e instituciones."
    },
    {
      icon: Users,
      title: "Colaboración", 
      description: "Transformar con tecnología es retador. Promovemos aprendizaje y acompañamiento para EdTechs, entidades públicas y todas las organizaciones que buscan cambiar la educación."
    },
    {
      icon: Globe,
      title: "Accesibilidad",
      description: "Facilitamos procesos educativos acercando la tecnología de manera sencilla, intuitiva y participativa. Nadie debe quedar atrás."
    },
    {
      icon: Award,
      title: "Impacto social",
      description: "Contribuimos al mejoramiento y a la expansión de la calidad educativa del país, identificando y fortaleciendo a las EdTech en Colombia."
    }
  ];

  const asociados = [
    "EdTech A", "Startup B", "Universidad C", "Fundación D", "ONG E", "Empresa F"
  ];

  const medios = [
    "Semana", "El Tiempo", "Portafolio", "La República", "RCN", "Caracol"
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
      
      {/* Hero */}
      <Section className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            La revolución de la educación ha comenzado
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Sabemos que la educación es el motor de transformación social y económica que nuestro país y el mundo necesitan. 
            Hoy, cuando la tecnología transforma cada rincón de nuestras vidas, no podemos quedarnos atrás: 
            <strong> la educación debe evolucionar al ritmo de la sociedad</strong>, y estamos aquí para facilitar ese cambio.
          </p>
        </div>
      </Section>

      {/* #OrgulloEdTech */}
      <Section className="py-16 bg-primary-50">
        <SectionHeader
          title="#OrgulloEdTech"
          subtitle="Nuestros asociados están transformando la educación"
          description="Nuestros asociados están transformando la educación en Colombia y el mundo"
        />
        
        <LogoGrid 
          partners={asociados}
          className="mt-12"
        />
      </Section>

      {/* Misión */}
      <Section className="py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Nuestra misión y cómo lo hacemos
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Tenemos un norte claro para dejar huella y <strong>cambiar el mundo desde la educación</strong> gracias a la tecnología. 
              Nuestra misión es clara: <strong>transformar la calidad, inclusión y accesibilidad de la educación en Colombia y Latinoamérica</strong>.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              No se trata solo de enseñar, sino de <strong>abrir caminos hacia un aprendizaje significativo</strong> que conecte estudiantes, 
              docentes e instituciones con las oportunidades del mundo moderno.
            </p>
            <div className="bg-primary-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-primary-900 mb-4">¿Cómo lo hacemos?</h3>
              <p className="text-primary-800">
                Tejiendo lazos de <strong>colaboración multiactor</strong> entre organizaciones con y sin ánimo de lucro que trabajan por la educación, 
                e impulsando <strong>soluciones innovadoras</strong> que impacten a millones de personas.
              </p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-500">Imagen Hero Placeholder</span>
          </div>
        </div>
      </Section>

      {/* Visión 2030 */}
      <Section className="py-16 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Nuestro horizonte (Visión 2030)
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Para <strong>2030</strong> seremos líderes en Latinoamérica en la creación de un 
            <strong> ecosistema EdTech ético, dinámico y colaborativo</strong> que transforme el aprendizaje, 
            impulse la globalización y priorice la personalización educativa.
          </p>
          <p className="text-xl text-gray-700">
            Queremos un modelo donde <strong>aprender sea tan natural como respirar</strong>, 
            y <strong>enseñar</strong> sea la puerta hacia un futuro lleno de progreso y equidad.
          </p>
        </div>
      </Section>

      {/* Nos has visto en */}
      <Section className="py-16">
        <SectionHeader
          title="Nos has visto en"
          description="Medios y plataformas donde hemos aparecido"
        />
        
        <LogoGrid 
          partners={medios}
          className="mt-12"
        />
      </Section>

      {/* Valores */}
      <Section className="py-16 bg-gray-50">
        <SectionHeader
          title="Nuestros valores"
          subtitle="Lo que nos guía"
          description="Los principios que orientan nuestro trabajo diario"
        />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {valores.map((valor, index) => (
            <Card key={index} className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <valor.icon className="w-6 h-6 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{valor.title}</h3>
                  <p className="text-gray-700">{valor.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Impacto */}
      <Section className="py-16">
        <SectionHeader
          title="El impacto de nuestro trabajo"
          subtitle="Cifras que nos enorgullecen"
          description="Los números que reflejan nuestro compromiso"
        />
        
        <div className="mt-12 overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicador</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 text-sm text-gray-900">Personas impactadas</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">4,800,000+</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">Instituciones acompañadas</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">29,550+</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">Docentes</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">40,000</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">Empresas</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">15,000</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">EdTechs con presencia en 5–6 países</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">—</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">Voluntarios activos</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">40+</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">Equipos de voluntariado</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">9+</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">EdTechs que iniciaron con recursos propios</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">72.2%</td></tr>
              <tr><td className="px-6 py-4 text-sm text-gray-900">Founders con posgrado</td><td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">~2/3</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Manifiesto */}
      <Section className="py-20 bg-gradient-to-br from-primary-900 to-accent-brand text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Nuestro manifiesto de marca
          </h2>
          <CopySlot file="somos.mdx" />
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="py-16 bg-primary-50">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Únete a la revolución educativa
          </h3>
          <CTAButton size="lg" asChild>
            <Link to="/asociados">
              ÚNETE A COLOMBIA EDTECH
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </CTAButton>
        </div>
      </Section>
    </>
  );
};

export default Somos;