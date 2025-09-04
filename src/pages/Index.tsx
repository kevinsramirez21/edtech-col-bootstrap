import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { KPI } from "@/components/ui/kpi";
import { LogoGrid } from "@/components/ui/logo-grid";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Lightbulb, Monitor, Edit, Code } from "lucide-react";

const segmentationCards = [
  {
    title: "EdTechs",
    description: "Si eres una organización con ánimo o sin ánimo de lucro que está TRANSFORMANDO la educación",
    cta: "ÚNETE",
    href: "/asociados",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    title: "Aliados", 
    description: "Si eres una entidad pública o privada que quiere CONTRIBUIR para que las EdTech cumplan su misión",
    cta: "ÚNETE",
    href: "/aliados",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  },
  {
    title: "Voluntarios",
    description: "Si eres experto, profesional o estudiante y quieres DONAR tu tiempo y talento en esta revolución",
    cta: "ÚNETE", 
    href: "/voluntariado",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  }
];

const missionCards = [
  {
    icon: Monitor,
    title: "Transformar la educación con Tecnología",
    description: "Impulsar soluciones tecnológicas que revolucionen el aprendizaje"
  },
  {
    icon: Edit,
    title: "Incidir en el diseño institucional de la educación regulada", 
    description: "Influir en políticas educativas para crear un mejor sistema"
  },
  {
    icon: Code,
    title: "Promover políticas públicas, Sandbox, y proyectos con el Estado",
    description: "Colaborar con el gobierno en iniciativas de transformación educativa"
  }
];

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="section py-16 lg:py-24" style={{ background: 'var(--color-sand)' }}>
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-32 h-16 mx-auto mb-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
              <div className="text-2xl font-bold">
                <span style={{ color: 'var(--color-accent)' }}>ET</span>
                <span style={{ color: 'var(--color-primary-700)' }}> Colombia EdTech.</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            ¿Sabías qué las <span style={{ color: 'var(--color-accent)' }}>EdTechs Colombianas</span> impactan a más de <span style={{ color: 'var(--color-primary-700)' }}>15M de personas en más de 25 países?</span> Aún así, no llegamos a las personas que más lo necesitan.
          </h1>
          
          <p className="text-lg mb-8 max-w-3xl mx-auto" style={{ fontSize: 'var(--fs-lg)', color: 'var(--muted)' }}>
            En Colombia EdTech promovemos la inversión, colaboración y crecimiento de todas las organizaciones que reconocen que juntos podemos construir un ecosistema educativo para todas las personas.
          </p>
          
          <div className="mb-8 w-full max-w-2xl mx-auto">
            <p className="text-xl font-semibold mb-6" style={{ color: 'var(--color-primary-700)' }}>
              QUIERO CONOCER CÓMO SER PARTE DE COLOMBIA EDTECH
            </p>
            <div className="grid gap-4">
              <CTAButton size="lg" asChild className="w-full">
                <Link to="/asociados">
                  Asociarme como EdTech
                </Link>
              </CTAButton>
              <CTAButton variant="accent" size="lg" asChild className="w-full">
                <Link to="/aliados">
                  Proponer alianza
                </Link>
              </CTAButton>
              <CTAButton variant="accent" size="lg" asChild className="w-full">
                <Link to="/voluntariado">
                  Aplicar a voluntariado
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Segmentation Section */}
      <Section className="section" style={{ background: 'var(--color-sand)' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            Ayudamos a crear un sistema educativo que forme estudiantes, docentes, instituciones y organizaciones para los retos de la nueva era
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ fontSize: 'var(--fs-lg)', color: 'var(--muted)' }}>
            Para <strong>SUMAR</strong> en esta revolución de la educación tenemos 3 caminos diferentes:
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {segmentationCards.map((card, index) => (
            <Card key={index} className="overflow-hidden border-2" style={{ borderColor: 'var(--color-primary-700)' }}>
              <div className="aspect-video overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
                  {card.title}
                </h3>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {card.description}
                </p>
                <CTAButton asChild>
                  <Link to={card.href} className="btn btn-primary w-full font-semibold">
                    {card.cta}
                  </Link>
                </CTAButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="section text-white" style={{ background: 'var(--color-primary-700)' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Imagina un mundo donde todos sean felices y tengan propósito en lo que hacen. La educación impulsada por la tecnología nos permitirá llegar a eso
          </h2>
          <p className="text-lg max-w-4xl mx-auto text-white/90" style={{ fontSize: 'var(--fs-lg)' }}>
            Esa es nuestra misión: <strong>CONSTRUIR</strong> una educación que inspire, motive y transforme. Porque nadie debería quedar atrás.
          </p>
        </div>
      </Section>

      {/* Why Change Section */}
      <Section className="section" style={{ background: 'var(--color-sand)' }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
            ¿Por qué seguir haciendo lo mismo si el mundo ya cambió?
          </h2>
          <p className="text-lg max-w-4xl mx-auto mb-8" style={{ fontSize: 'var(--fs-lg)', color: 'var(--muted)' }}>
            La educación tradicional no está a la altura de las necesidades de estudiantes, docentes e instituciones actuales.
          </p>
          <p className="text-lg max-w-5xl mx-auto mb-12" style={{ fontSize: 'var(--fs-lg)', color: 'var(--color-primary-700)' }}>
            Nuestro ecosistema <strong>CONECTA</strong> a ONGs, Universidades, Colegios, Startups, Scale Ups, empresas tradicionales, Bigtech, que buscan:
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {missionCards.map((card, index) => (
            <Card key={index} className="p-6 text-center border-2" style={{ borderColor: 'var(--color-primary-700)' }}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-700)' }}>
                {card.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {card.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold mb-8" style={{ color: 'var(--color-primary-700)' }}>
            Juntos, transformamos el aprendizaje en una experiencia accesible, personalizada y relevante para todos.
          </p>
          <div className="mb-8 w-full max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-6" style={{ color: 'var(--color-primary-700)' }}>
              Conoce cómo ser parte de esta revolución de la educación
            </p>
            <div className="grid gap-4">
              <CTAButton size="lg" asChild className="w-full">
                <Link to="/asociados">
                  Asociarme como EdTech
                </Link>
              </CTAButton>
              <CTAButton variant="accent" size="lg" asChild className="w-full">
                <Link to="/aliados">
                  Proponer alianza
                </Link>
              </CTAButton>
              <CTAButton variant="accent" size="lg" asChild className="w-full">
                <Link to="/voluntariado">
                  Aplicar a voluntariado
                </Link>
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
