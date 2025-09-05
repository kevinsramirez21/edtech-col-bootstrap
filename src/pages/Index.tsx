import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KPI } from "@/components/ui/kpi";
import { LogoGrid } from "@/components/ui/logo-grid";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Lightbulb, Monitor, Edit, Code, Zap, Globe, Heart } from "lucide-react";
import { ColombiaEdTechLogo } from "@/components/ui/placeholder-logo";

const segmentationCards = [
  {
    title: "EdTechs",
    description: "Si eres una organización con ánimo o sin ánimo de lucro que está TRANSFORMANDO la educación",
    cta: "ÚNETE",
    href: "/asociados",
    image: "/images/edtechs-card.jpg",
    icon: Zap,
    gradient: "from-primary-700 to-primary-900"
  },
  {
    title: "Aliados", 
    description: "Si eres una entidad pública o privada que quiere CONTRIBUIR para que las EdTech cumplan su misión",
    cta: "ÚNETE",
    href: "/aliados",
    image: "/images/aliados-card.jpg",
    icon: Globe,
    gradient: "from-accent-brand to-primary-700"
  },
  {
    title: "Voluntarios",
    description: "Si eres experto, profesional o estudiante y quieres DONAR tu tiempo y talento en esta revolución",
    cta: "ÚNETE", 
    href: "/voluntariado",
    image: "/images/voluntarios-card.jpg",
    icon: Heart,
    gradient: "from-primary-900 to-accent-brand"
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
      {/* Hero Section Premium */}
      <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Optimized Component */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/hero-bg.jpg"
            alt="Colombia EdTech - Transformando la educación con tecnología"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-700/85 to-primary-900/95"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent-brand/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-primary-700/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-accent-brand/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          {/* Logo Premium Display */}
          <div className="mb-12">
            <div className="inline-flex p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl shadow-primary-900/30 border border-white/20">
              <ColombiaEdTechLogo 
                variant="text-only" 
                colorScheme="white" 
                size="xl"
                className="h-16 w-auto"
              />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight text-white">
            ¿Sabías que las <span className="text-accent-brand bg-gradient-to-r from-accent-brand to-white bg-clip-text text-transparent font-extrabold">EdTechs Colombianas</span> impactan a más de <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-extrabold">15M de personas</span> en más de <span className="text-accent-brand font-extrabold">25 países?</span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-white/90 leading-relaxed font-medium">
            Aún así, <strong className="text-accent-brand">no llegamos a las personas que más lo necesitan.</strong>
          </p>

          <div className="mb-12">
            <p className="text-lg lg:text-xl max-w-4xl mx-auto text-white/80 leading-relaxed">
              En Colombia EdTech promovemos la <strong className="text-white">inversión, colaboración y crecimiento</strong> de todas las organizaciones que reconocen que juntos podemos construir un ecosistema educativo para todas las personas.
            </p>
          </div>

          {/* CTA Premium */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild
              className="bg-gradient-to-r from-accent-brand to-primary-700 hover:from-accent-brand/90 hover:to-primary-700/90 text-white font-bold px-8 py-4 rounded-xl shadow-2xl shadow-accent-brand/30 hover:shadow-accent-brand/50 transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link to="/asociados" className="flex items-center space-x-3">
                <Users className="w-6 h-6" />
                <span>Únete al Ecosistema</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link to="/somos">Conoce Nuestra Misión</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Segmentation Section Premium */}
      <Section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-primary-900 leading-tight">
              Ayudamos a crear un sistema educativo que forme estudiantes, docentes, instituciones y organizaciones para los <span className="bg-gradient-to-r from-primary-700 to-accent-brand bg-clip-text text-transparent">retos de la nueva era</span>
            </h2>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto text-gray-700 leading-relaxed">
              Para <strong className="text-primary-900">SUMAR</strong> en esta revolución de la educación tenemos <strong className="text-accent-brand">3 caminos diferentes:</strong>
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {segmentationCards.map((card, index) => (
              <div key={index} className="group relative">
                <Card className="overflow-hidden border-0 shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-primary-700/20 transition-all duration-500 hover:scale-105 bg-white">
                  {/* Image with Gradient Overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <OptimizedImage 
                      src={card.image} 
                      alt={`${card.title} - Colombia EdTech`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                    
                    {/* Floating Icon */}
                    <div className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full">
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <CardContent className="p-8 text-center relative">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-primary-900">
                      {card.title}
                    </h3>
                    <p className="text-lg mb-8 leading-relaxed text-gray-700">
                      {card.description}
                    </p>
                    <Button 
                      asChild
                      className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-lg hover:shadow-primary-700/30 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105`}
                    >
                      <Link to={card.href} className="flex items-center justify-center space-x-2">
                        <span>{card.cta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission Section Premium */}
      <Section className="py-24 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Imagina un mundo donde todos sean <span className="bg-gradient-to-r from-accent-brand to-white bg-clip-text text-transparent">felices y tengan propósito</span> en lo que hacen
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-8 rounded-full"></div>
            <p className="text-xl lg:text-2xl max-w-5xl mx-auto text-white/90 leading-relaxed mb-8">
              La educación impulsada por la tecnología nos permitirá llegar a eso
            </p>
            <p className="text-2xl lg:text-3xl max-w-4xl mx-auto font-bold">
              Esa es nuestra misión: <span className="text-accent-brand">CONSTRUIR</span> una educación que inspire, motive y transforme.
            </p>
            <p className="text-xl lg:text-2xl mt-6 text-white/80">
              Porque <strong className="text-accent-brand">nadie debería quedar atrás.</strong>
            </p>
          </div>
        </div>
      </Section>

      {/* Why Change Section Premium */}
      <Section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-primary-900 leading-tight">
              ¿Por qué seguir haciendo lo mismo si el mundo ya <span className="bg-gradient-to-r from-accent-brand to-primary-700 bg-clip-text text-transparent">cambió?</span>
            </h2>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-8 text-gray-700 leading-relaxed">
              La educación tradicional no está a la altura de las necesidades de estudiantes, docentes e instituciones actuales.
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-8 rounded-full"></div>
            <p className="text-xl lg:text-2xl max-w-5xl mx-auto mb-12 text-primary-900 font-semibold">
              Nuestro ecosistema <strong className="text-accent-brand">CONECTA</strong> a ONGs, Universidades, Colegios, Startups, Scale Ups, empresas tradicionales, Bigtech, que buscan:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {missionCards.map((card, index) => (
              <div key={index} className="group">
                <Card className="p-8 text-center border-0 shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-primary-700/20 transition-all duration-500 hover:scale-105 bg-white h-full">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent-brand to-primary-700 flex items-center justify-center shadow-lg shadow-accent-brand/30 group-hover:shadow-xl group-hover:shadow-accent-brand/40 transition-all duration-300 group-hover:scale-110">
                    <card.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-6 text-primary-900 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {card.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary-700/10 to-accent-brand/10 rounded-2xl border border-primary-700/20">
              <p className="text-2xl lg:text-3xl font-bold text-primary-900 leading-relaxed">
                Juntos, transformamos el aprendizaje en una experiencia <span className="text-accent-brand">accesible, personalizada y relevante</span> para todos.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;
