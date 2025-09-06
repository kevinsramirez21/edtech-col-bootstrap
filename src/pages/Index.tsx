import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KPI } from "@/components/ui/kpi";
import { LogoGrid } from "@/components/ui/logo-grid";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Lightbulb, Monitor, Edit, Code, Zap, Globe, Heart, Star, BookOpen, Rocket } from "lucide-react";

const segmentationCards = [
  {
    title: "EdTechs",
    subtitle: "(Asociadas)",
    description: "Si eres una organización con ánimo o sin ánimo de lucro que está TRANSFORMANDO la educación con tecnología",
    cta: "ÚNETE",
    href: "/asociados",
    image: "/images/edtechs-card.jpg",
    icon: Zap,
    gradient: "from-primary-700 to-primary-900"
  },
  {
    title: "Aliados", 
    subtitle: "(Gobierno / Privados / Universidades / Cajas)",
    description: "Si eres una entidad pública o privada que quiere CONTRIBUIR para que las EdTech cumplan su misión",
    cta: "ÚNETE",
    href: "/aliados",
    image: "/images/aliados-card.jpg",
    icon: Globe,
    gradient: "from-accent-brand to-primary-700"
  },
  {
    title: "Voluntariado",
    subtitle: "",
    description: "Si eres experta/o, profesional o estudiante y quieres DONAR tu tiempo y talento en esta revolución",
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
    title: "Transformar",
    subtitle: "la educación con Tecnología",
    description: "Impulsar soluciones tecnológicas que revolucionen el aprendizaje y hagan la educación más accesible para todos."
  },
  {
    icon: Edit,
    title: "Incidir", 
    subtitle: "en el diseño institucional de la educación regulada",
    description: "Influir en políticas educativas para crear un sistema más efectivo y adaptado a las necesidades actuales."
  },
  {
    icon: Code,
    title: "Promover",
    subtitle: "políticas públicas, sandbox y proyectos con el Estado",
    description: "Colaborar estratégicamente con el gobierno en iniciativas que transformen la educación nacional."
  }
];

const impactStats = [
  {
    icon: Users,
    number: "15M+",
    label: "Personas Impactadas",
    description: "en toda Latinoamérica"
  },
  {
    icon: Globe,
    number: "25+",
    label: "Países Alcanzados",
    description: "con presencia EdTech colombiana"
  },
  {
    icon: Rocket,
    number: "70+",
    label: "EdTechs Asociadas",
    description: "transformando la educación"
  }
];

const Index = () => {
  return (
    <>
      {/* Hero Section Premium */}
      <Section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Multiple Overlays */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage
            src="/images/hero-bg.JPG"
            alt="Colombia EdTech - Transformando la educación con tecnología en Latinoamérica"
            className="w-full h-full object-cover"
            priority
          />
          {/* Dark Overlay for Better Text Contrast */}
          <div className="absolute inset-0 bg-primary-900/55"></div>
        </div>

        {/* Floating Elements Premium */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-brand/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-primary-700/30 rounded-full blur-3xl animate-float animation-delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent-brand/15 rounded-full blur-2xl animate-float animation-delay-500"></div>
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-white/10 rounded-full blur-2xl animate-float animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-6">
          {/* Hero Typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 leading-tight text-white animate-fade-in-up animation-delay-200">
            ¿Sabías que las <span className="text-accent-brand font-extrabold">EdTechs colombianas</span> impactan a más de{" "}
            <span className="text-accent-brand font-extrabold">15 millones de personas</span>{" "}
            en más de <span className="text-accent-brand font-extrabold">25 países?</span>
          </h1>
          
          <p className="text-xl lg:text-2xl xl:text-3xl mb-12 max-w-5xl mx-auto text-white/90 leading-relaxed font-medium animate-fade-in-up animation-delay-400">
            Aún así, <strong className="text-accent-brand">no llegamos a quienes más lo necesitan.</strong>
          </p>

          <div className="mb-16 animate-fade-in-up animation-delay-600">
            <p className="text-lg lg:text-xl xl:text-2xl max-w-5xl mx-auto text-white/85 leading-relaxed font-medium">
              En <strong className="text-white">Colombia EdTech</strong> promovemos la{" "}
              <strong className="text-accent-brand">inversión, colaboración y crecimiento</strong>{" "}
              de todas las organizaciones que reconocen que{" "}
              <strong className="text-white">juntos</strong> podemos construir un ecosistema educativo para todas las personas.
            </p>
          </div>

          {/* CTA Section Premium */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-fade-in-up animation-delay-800">
            <Button 
              asChild
              className="bg-gradient-to-r from-accent-brand to-primary-700 hover:from-accent-brand/90 hover:to-primary-700/90 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-accent-brand/40 hover:shadow-accent-brand/60 transition-all duration-500 hover:scale-110 text-lg lg:text-xl group"
            >
              <Link to="/asociados" className="flex items-center space-x-4">
                <Users className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
                <span>Quiero conocer cómo ser parte de Colombia EdTech</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-2 border-primary-700 text-primary-700 bg-white hover:bg-primary-700 hover:text-white font-semibold px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-110 text-lg lg:text-xl"
            >
              <Link to="/somos" className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6" />
                <span>Conoce Nuestra Misión</span>
              </Link>
            </Button>
          </div>

        </div>
      </Section>

      {/* Impact Stats Section */}
      <Section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-primary-900 leading-tight">
              El Impacto de Colombia EdTech
            </h2>
            <div className="w-24 h-1 bg-primary-700 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-700 flex items-center justify-center group-hover:bg-accent-brand transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-900 mb-3">{stat.number}</div>
                <div className="text-xl font-semibold text-primary-700 mb-2">{stat.label}</div>
                <div className="text-lg text-primary-900/80 font-medium">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Segmentation Section Premium */}
      <Section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-brand rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 text-primary-900 leading-tight">
              Ayudamos a crear un sistema educativo que forme estudiantes, docentes, instituciones y organizaciones para los{" "}
              <span className="bg-gradient-to-r from-primary-700 to-accent-brand bg-clip-text text-transparent">
                retos de la nueva era
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-12 rounded-full"></div>
            <p className="text-xl lg:text-2xl xl:text-3xl max-w-5xl mx-auto text-primary-900 leading-relaxed font-medium">
              Para <strong className="text-primary-700">SUMAR</strong> a esta revolución de la educación, tienes{" "}
              <strong className="text-accent-brand">3 caminos</strong>:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {segmentationCards.map((card, index) => (
              <div key={index} className="group relative animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <Card className="overflow-hidden border-0 shadow-2xl shadow-primary-900/15 hover:shadow-3xl hover:shadow-primary-700/25 transition-all duration-700 hover:scale-105 bg-white relative group-hover:-translate-y-2">
                  {/* Image with Premium Gradient Overlay */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <OptimizedImage 
                      src={card.image} 
                      alt={`${card.title} - Únete a Colombia EdTech como ${card.title.toLowerCase()}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-85 group-hover:opacity-75 transition-opacity duration-500`}></div>
                    
                    {/* Floating Icon Premium */}
                    <div className="absolute top-8 right-8 p-4 bg-white/25 backdrop-blur-md rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-300">
                      <card.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Card Number Badge */}
                    <div className="absolute top-8 left-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary-900 font-bold text-lg shadow-xl">
                      {index + 1}
                    </div>
                  </div>
                  
                  <CardContent className="p-10 text-center relative bg-gradient-to-br from-white to-gray-50/30">
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 text-primary-700">
                      {card.title}
                    </h3>
                    {card.subtitle && (
                      <p className="text-lg font-semibold text-primary-900 mb-6 opacity-80">
                        {card.subtitle}
                      </p>
                    )}
                    <p className="text-lg lg:text-xl mb-10 leading-relaxed text-primary-900 font-medium">
                      {card.description}
                    </p>
                    <Button 
                      asChild
                      className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-2xl hover:shadow-primary-700/40 text-white font-bold py-4 px-8 rounded-xl transition-all duration-500 hover:scale-105 text-lg group`}
                    >
                      <Link to={card.href} className="flex items-center justify-center space-x-3">
                        <span>{card.cta}</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Inspirational Vision Section Premium */}
      <Section className="py-32 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-accent-brand/10"></div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,60,92,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(11,71,206,0.15),transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 leading-tight animate-fade-in-up">
              Imagina un mundo donde todas las personas encuentran{" "}
              <span className="bg-gradient-to-r from-accent-brand via-white to-accent-brand bg-clip-text text-transparent animate-gradient-x">
                propósito
              </span>{" "}
              en lo que hacen
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-12 rounded-full animate-fade-in-up animation-delay-200"></div>
            <p className="text-xl lg:text-2xl xl:text-3xl max-w-6xl mx-auto text-white/90 leading-relaxed mb-12 font-medium animate-fade-in-up animation-delay-400">
              La educación impulsada por la tecnología nos acerca a ese futuro.
            </p>
            <div className="max-w-5xl mx-auto animate-fade-in-up animation-delay-600">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-8 leading-tight">
                Nuestra misión: <span className="text-accent-brand">CONSTRUIR</span> una educación que inspire, motive y transforme.
              </p>
              <p className="text-xl lg:text-2xl text-white/85 font-medium">
                Porque <strong className="text-accent-brand">nadie</strong> debería quedar atrás.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Impact Section Premium */}
      <Section className="py-32 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 right-20 w-80 h-80 bg-primary-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-accent-brand rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 text-primary-900 leading-tight">
              ¿Por qué seguir haciendo lo mismo si el mundo ya{" "}
              <span className="bg-gradient-to-r from-accent-brand to-primary-700 bg-clip-text text-transparent">
                cambió?
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-12 rounded-full"></div>
            <p className="text-xl lg:text-2xl xl:text-3xl max-w-5xl mx-auto mb-12 text-primary-900 leading-relaxed font-medium">
              La educación tradicional no está a la altura de las necesidades actuales de estudiantes, docentes e instituciones.
            </p>
            <p className="text-xl lg:text-2xl xl:text-3xl max-w-6xl mx-auto mb-16 text-primary-900 font-semibold">
              Nuestro ecosistema <strong className="text-accent-brand">CONECTA</strong> a ONGs, universidades, colegios, startups, scaleups, empresas y big tech para:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-20">
            {missionCards.map((card, index) => (
              <div key={index} className="group animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <Card className="p-10 text-center border-0 shadow-2xl shadow-primary-900/15 hover:shadow-3xl hover:shadow-primary-700/25 transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white to-gray-50/30 h-full group-hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-10 rounded-3xl bg-gradient-to-br from-accent-brand to-primary-700 flex items-center justify-center shadow-2xl shadow-accent-brand/40 group-hover:shadow-3xl group-hover:shadow-accent-brand/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <card.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-primary-700">
                    {card.title}
                  </h3>
                  <h4 className="text-xl lg:text-2xl font-semibold mb-8 text-primary-900 leading-tight">
                    {card.subtitle}
                  </h4>
                  <p className="text-lg lg:text-xl text-primary-900 leading-relaxed font-medium">
                    {card.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-fade-in-up animation-delay-800">
            <div className="max-w-6xl mx-auto p-12 bg-gradient-to-r from-primary-700/10 via-accent-brand/5 to-primary-700/10 rounded-3xl border border-primary-700/20 shadow-2xl shadow-primary-900/10">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-900 leading-relaxed mb-8">
                Juntas/os, convertimos el aprendizaje en una experiencia{" "}
                <span className="text-accent-brand">accesible, personalizada y relevante</span>{" "}
                para todas las personas.
              </p>
              <Button 
                asChild
                className="bg-gradient-to-r from-accent-brand to-primary-700 hover:from-accent-brand/90 hover:to-primary-700/90 text-white font-bold px-10 py-4 rounded-xl shadow-2xl shadow-accent-brand/40 hover:shadow-accent-brand/60 transition-all duration-500 hover:scale-110 text-lg group"
              >
                <Link to="/asociados" className="flex items-center space-x-3">
                  <Users className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Quiero conocer cómo ser parte de Colombia EdTech</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Index;