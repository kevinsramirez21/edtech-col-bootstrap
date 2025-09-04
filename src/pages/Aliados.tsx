import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const Aliados = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Aliados" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Aliados Estratégicos"
          subtitle="Nuestras alianzas"
          description="Conoce las organizaciones aliadas que nos ayudan a fortalecer el ecosistema EdTech"
        />
        <CopySlot file="aliados.mdx" />
        
        <div id="form" className="mt-16 p-8 bg-sand/30 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Propón una alianza</h3>
          <p className="text-gray-600 mb-4">
            Formulario para proponer alianzas será implementado aquí
          </p>
        </div>
      </Section>
    </>
  );
};

export default Aliados;