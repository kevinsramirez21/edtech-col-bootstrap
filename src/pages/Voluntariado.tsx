import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const Voluntariado = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Voluntariado" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Programa de Voluntariado"
          subtitle="Únete al movimiento"
          description="Contribuye al crecimiento del ecosistema EdTech como voluntario"
        />
        <CopySlot file="voluntariado.mdx" />
        
        <div id="form" className="mt-16 p-8 bg-sand/30 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Aplicar a voluntariado</h3>
          <p className="text-gray-600 mb-4">
            Formulario de aplicación será implementado aquí
          </p>
        </div>
      </Section>
    </>
  );
};

export default Voluntariado;