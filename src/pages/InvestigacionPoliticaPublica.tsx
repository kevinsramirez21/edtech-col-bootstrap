import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const InvestigacionPoliticaPublica = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Investigación & Política Pública" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Investigación & Política Pública"
          subtitle="Nuestro impacto"
          description="Conoce nuestros proyectos de investigación y desarrollo de políticas públicas en EdTech"
        />
        <CopySlot file="investigacion-politica-publica.mdx" />
      </Section>
    </>
  );
};

export default InvestigacionPoliticaPublica;