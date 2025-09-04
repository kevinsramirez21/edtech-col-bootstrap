import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

const Legal = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Legal" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Aviso Legal"
          subtitle="Términos y condiciones"
          description="Información legal, política de privacidad y términos de uso"
        />
        
        <div className="prose prose-lg max-w-none">
          <h2>Política de Privacidad</h2>
          <p>
            Colombia EdTech se compromete a proteger la privacidad de sus usuarios y 
            visitantes. Esta política describe cómo recopilamos, usamos y protegemos 
            su información personal.
          </p>
          
          <h3>Información que recopilamos</h3>
          <ul>
            <li>Información de contacto (nombre, email, teléfono)</li>
            <li>Información de la organización</li>
            <li>Datos de navegación y uso del sitio web</li>
          </ul>
          
          <h2>Términos de Uso</h2>
          <p>
            Al acceder y usar este sitio web, usted acepta estar sujeto a estos 
            términos y condiciones de uso.
          </p>
          
          <CopySlot file="legal.mdx" />
        </div>
      </Section>
    </>
  );
};

export default Legal;