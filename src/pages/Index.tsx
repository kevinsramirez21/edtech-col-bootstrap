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
      <Section className="section py-16 lg:py-24" style={{ background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700), var(--color-accent))' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Transformamos la educación en Colombia
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl" style={{ fontSize: 'var(--fs-lg)' }}>
              Fortalecemos el ecosistema EdTech colombiano conectando organizaciones, 
              impulsando la investigación y desarrollando políticas públicas que 
              revolucionen la educación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-secondary">
                Conoce más <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn btn-accent">
                Únete al movimiento
              </button>
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
      <Section className="section" style={{ background: 'var(--color-sand)' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)' }}>
            Nuestro impacto en cifras
          </h2>
          <p className="text-lg text-gray-600" style={{ fontSize: 'var(--fs-lg)', color: 'var(--muted)' }}>
            Resultados que demuestran nuestro compromiso con la transformación educativa
          </p>
        </div>
        <div className="grid-2 md:grid-cols-4">
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
      <Section className="section">
        <SectionHeader
          title="Quiénes Somos"
          subtitle="Nuestra misión"
          description="Conoce más sobre Colombia EdTech y nuestro compromiso con la transformación educativa"
        />
        <CopySlot file="home.mdx" />
      </Section>

      {/* Partners Section */}
      <Section className="section bg-gray-50">
        <LogoGrid 
          partners={samplePartners}
          title="Organizaciones que confían en nosotros"
          columns={4}
        />
      </Section>

      {/* CTA Section */}
      <Section className="section text-white text-center" style={{ background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-700))' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)' }}>
            ¿Listo para ser parte del cambio?
          </h2>
          <p className="text-lg text-white/90 mb-8" style={{ fontSize: 'var(--fs-lg)' }}>
            Únete a la comunidad líder de EdTech en Colombia y ayuda a construir 
            el futuro de la educación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary">
              <Users className="w-5 h-5" />
              Asociarme
            </button>
            <button className="btn btn-accent">
              <Target className="w-5 h-5" />
              Explorar oportunidades
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
