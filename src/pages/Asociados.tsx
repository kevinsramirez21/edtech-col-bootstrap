import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const Asociados = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Asociados" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Organizaciones Asociadas"
          subtitle="Nuestra comunidad"
          description="Descubre las organizaciones que forman parte de nuestro ecosistema EdTech"
        />
        <CopySlot file="asociados.mdx" />
        
        <div id="form" className="mt-16 p-8 bg-sand/30 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Quieres asociarte?</h3>
          <p className="text-gray-600 mb-4">
            Formulario de asociación será implementado aquí
          </p>
        </div>
      </Section>
    </>
  );
};

export default Asociados;