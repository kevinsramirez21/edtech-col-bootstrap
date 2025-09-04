import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { CTAButton } from "@/components/ui/cta-button";
import { KPI } from "@/components/ui/kpi";
import { LogoGrid } from "@/components/ui/logo-grid";
import { ArrowRight, Users, Target, Lightbulb } from "lucide-react";

const kpiData = [
  { value: "150+", label: "Organizaciones", description: "Asociadas y aliadas" },
  { value: "50k+", label: "Estudiantes", description: "Impactados anualmente" },
  { value: "25+", label: "Políticas", description: "Influenciadas" },
  { value: "100+", label: "Eventos", description: "Realizados" },
];

const samplePartners = [
  "Universidad Nacional", "Ministerio Educación", "Google for Education",
  "Microsoft Education", "Fundación Compartir", "Corporación Minuto de Dios",
  "Universidad de los Andes", "ICETEX"
];

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 via-primary-700 to-accent-brand text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Transformamos la educación en Colombia
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
              Fortalecemos el ecosistema EdTech colombiano conectando organizaciones, 
              impulsando la investigación y desarrollando políticas públicas que 
              revolucionen la educación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton variant="hero" size="xl">
                Conoce más <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton variant="accent" size="xl">
                Únete al movimiento
              </CTAButton>
            </div>
          </div>
          <div className="hidden lg:block">
            {/* Placeholder for hero image */}
            <div className="aspect-square bg-white/10 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center">
              <div className="text-center text-white/60">
                <Lightbulb className="w-16 h-16 mx-auto mb-4" />
                <p className="text-sm">Hero Image Placeholder</p>
                <p className="text-xs mt-1">2000x2000px recomendado</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* KPI Section */}
      <Section className="py-16 bg-sand/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestro impacto en cifras
          </h2>
          <p className="text-lg text-gray-600">
            Resultados que demuestran nuestro compromiso con la transformación educativa
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPI
              key={index}
              value={kpi.value}
              label={kpi.label}
              description={kpi.description}
              variant={index % 2 === 0 ? "default" : "accent"}
            />
          ))}
        </div>
      </Section>

      {/* Copy Slot for Main Content */}
      <Section className="py-16">
        <SectionHeader
          title="Quiénes Somos"
          subtitle="Nuestra misión"
          description="Conoce más sobre Colombia EdTech y nuestro compromiso con la transformación educativa"
        />
        <CopySlot file="home.mdx" />
      </Section>

      {/* Partners Section */}
      <Section className="py-16 bg-gray-50">
        <LogoGrid 
          partners={samplePartners}
          title="Organizaciones que confían en nosotros"
          columns={4}
        />
      </Section>

      {/* CTA Section */}
      <Section className="py-16 bg-gradient-to-r from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para ser parte del cambio?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Únete a la comunidad líder de EdTech en Colombia y ayuda a construir 
            el futuro de la educación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton variant="hero" size="xl">
              <Users className="w-5 h-5" />
              Asociarme
            </CTAButton>
            <CTAButton variant="accent" size="xl">
              <Target className="w-5 h-5" />
              Explorar oportunidades
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
