import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const Somos = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Somos" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Quiénes Somos"
          subtitle="Nuestra historia"
          description="Conoce la historia, misión y visión de Colombia EdTech"
        />
        <CopySlot file="somos.mdx" />
      </Section>
    </>
  );
};

export default Somos;