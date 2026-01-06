import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { CTAButton } from "@/components/ui/cta-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { KPI } from "@/components/ui/kpi";
import { LogoGrid } from "@/components/ui/logo-grid";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Lightbulb, Monitor, Edit, Code, Zap, Globe, Heart, Star, BookOpen, Rocket, LogIn } from "lucide-react";
const segmentationCards = [{
  title: "EdTechs",
  subtitle: "(Asociadas)",
  description: "Si eres una organización con ánimo o sin ánimo de lucro que está TRANSFORMANDO la educación con tecnología",
  cta: "ÚNETE",
  href: "/asociados",
  image: "/images/edtechs-card.jpg",
  icon: Zap,
  gradient: "from-primary-700 to-primary-900"
}, {
  title: "Aliados",
  subtitle: "(Gobierno / Privados / Universidades / Cajas)",
  description: "Si eres una entidad pública o privada que quiere CONTRIBUIR para que las EdTech cumplan su misión",
  cta: "ÚNETE",
  href: "/aliados",
  image: "/images/aliados-card.jpg",
  icon: Globe,
  gradient: "from-accent-brand to-primary-700"
}, {
  title: "Voluntariado",
  subtitle: "",
  description: "Si eres experta/o, profesional o estudiante y quieres DONAR tu tiempo y talento en esta revolución",
  cta: "ÚNETE",
  href: "/voluntariado",
  image: "/images/voluntarios-card.jpg",
  icon: Heart,
  gradient: "from-primary-900 to-accent-brand"
}];
const missionCards = [{
  icon: Monitor,
  title: "Transformar",
  subtitle: "la educación con Tecnología",
  description: "Impulsar soluciones tecnológicas que revolucionen el aprendizaje y hagan la educación más accesible para todos."
}, {
  icon: Edit,
  title: "Incidir",
  subtitle: "en el diseño institucional de la educación regulada",
  description: "Influir en políticas educativas para crear un sistema más efectivo y adaptado a las necesidades actuales."
}, {
  icon: Code,
  title: "Promover",
  subtitle: "políticas públicas, sandbox y proyectos con el Estado",
  description: "Colaborar estratégicamente con el gobierno en iniciativas que transformen la educación nacional."
}];
const impactStats = [{
  icon: Users,
  number: "15M+",
  label: "Personas Impactadas",
  description: "en toda Latinoamérica"
}, {
  icon: Globe,
  number: "25+",
  label: "Países Alcanzados",
  description: "con presencia EdTech colombiana"
}, {
  icon: Rocket,
  number: "70+",
  label: "EdTechs Asociadas",
  description: "transformando la educación"
}];
const Index = () => {
  const {
    user,
    profile,
    loading
  } = useAuth();
  return <>
      {/* Hero Section Premium */}
      <Section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12">
        {/* Background Image with Multiple Overlays */}
        <div className="absolute inset-0 z-0">
          <OptimizedImage src="/images/hero-bg.JPG" alt="Colombia EdTech - Transformando la educación con tecnología en Latinoamérica" className="w-full h-full object-cover" priority />
          {/* Dark Overlay for Better Text Contrast */}
          <div className="absolute inset-0 bg-primary-900/85"></div>
        </div>

        {/* Floating Elements Premium - hidden on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-brand/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-primary-700/30 rounded-full blur-3xl animate-float animation-delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent-brand/15 rounded-full blur-2xl animate-float animation-delay-500"></div>
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-white/10 rounded-full blur-2xl animate-float animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6">
          {/* Hero Typography */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-10 leading-tight text-white animate-fade-in-up animation-delay-200">
            ¿Sabías que las <span className="text-accent-brand font-extrabold">EdTechs colombianas</span> impactan a más de{" "}
            <span className="text-accent-brand font-extrabold">15 millones de personas</span>{" "}
            en más de <span className="text-accent-brand font-extrabold">25 países?</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 lg:mb-10 max-w-5xl mx-auto text-white/90 leading-relaxed font-medium animate-fade-in-up animation-delay-400">
            Aún así, <strong className="text-accent-brand">no llegamos a quienes más lo necesitan.</strong>
          </p>

          <div className="mb-6 sm:mb-8 lg:mb-12 animate-fade-in-up animation-delay-600">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-5xl mx-auto text-white/85 leading-relaxed font-medium">
              En <strong className="text-white">Colombia EdTech</strong> promovemos la{" "}
              <strong className="text-accent-brand">inversión, colaboración y crecimiento</strong>{" "}
              de todas las organizaciones que reconocen que{" "}
              <strong className="text-white">juntos</strong> podemos construir un ecosistema educativo para todas las personas.
            </p>
          </div>

          {/* User Welcome Message */}
          {!loading && user && <div className="text-center mb-8 animate-fade-in-up animation-delay-600">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
                <p className="text-white text-lg">
                  ¡Hola, {profile?.first_name || user.email?.split('@')[0] || 'EdTecher'}! 👋
                </p>
                <p className="text-white/80 text-sm mt-2">
                  Bienvenido de vuelta a Colombia EdTech
                </p>
              </div>
            </div>}

          {/* CTA Section Premium */}
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 justify-center items-center animate-fade-in-up animation-delay-800">
            
            {/* Primary CTA - Conoce a nuestros asociados */}
            <Button asChild className="bg-white hover:bg-white/90 text-primary-700 font-bold px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl shadow-white/30 hover:shadow-white/50 transition-all duration-500 hover:scale-105 text-xs sm:text-sm lg:text-base xl:text-lg group w-full sm:w-auto border-2 border-white/20">
              <Link to="/asociados/directorio" className="flex items-center justify-center space-x-2 sm:space-x-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="text-center">Conoce a Nuestros Asociados</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 hidden sm:block" />
              </Link>
            </Button>
            
            <Button asChild className="bg-gradient-to-r from-accent-brand to-primary-700 hover:from-accent-brand/90 hover:to-primary-700/90 text-white font-bold px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl shadow-accent-brand/40 hover:shadow-accent-brand/60 transition-all duration-500 hover:scale-105 text-xs sm:text-sm lg:text-base xl:text-lg group w-full sm:w-auto">
              <Link to="/asociados" className="flex items-center justify-center space-x-2 sm:space-x-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="text-center">Quiero ser parte de Colombia EdTech</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 hidden sm:block" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-2 border-white/50 text-white bg-transparent hover:bg-white hover:text-primary-700 font-semibold px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl transition-all duration-500 hover:scale-105 text-xs sm:text-sm lg:text-base xl:text-lg w-full sm:w-auto">
              <Link to="/somos" className="flex items-center justify-center space-x-2 sm:space-x-3">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Conoce Nuestra Misión</span>
              </Link>
            </Button>
          </div>

        </div>
      </Section>


      {/* Segmentation Section Premium */}
      <Section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-secondary dark:bg-background">
        {/* Background Decorations - hidden on mobile */}
        {/* Background Decorations - hidden on mobile */}
        <div className="absolute inset-0 opacity-5 hidden sm:block">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-brand rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-10 lg:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-5 lg:mb-6 text-primary dark:text-primary leading-tight">
              Ayudamos a crear un sistema educativo que forme estudiantes, docentes, instituciones y organizaciones para los{" "}
              <span className="text-primary dark:text-primary">
                retos de la nueva era
              </span>
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl max-w-4xl mx-auto text-foreground leading-relaxed font-medium">
              Para <strong className="text-primary">SUMAR</strong> a esta revolución de la educación, tienes{" "}
              <strong className="text-accent-brand">3 caminos</strong>:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {segmentationCards.map((card, index) => <div key={index} className="group relative animate-fade-in-up h-full" style={{
            animationDelay: `${index * 200}ms`
          }}>
                <Card className="overflow-hidden border-0 shadow-lg sm:shadow-xl shadow-primary/15 hover:shadow-2xl hover:shadow-primary/25 transition-all duration-700 sm:hover:scale-105 bg-card relative sm:group-hover:-translate-y-2 h-full flex flex-col">
                  {/* Image with Subtle Overlay */}
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <OptimizedImage src={card.image} alt={`${card.title} - Únete a Colombia EdTech como ${card.title.toLowerCase()}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary-900/30 transition-opacity duration-500"></div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-5 lg:p-6 text-center relative bg-card flex-1 flex flex-col justify-between">
                    <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-2 text-primary">
                      {card.title}
                      </h3>
                      {card.subtitle && <p className="text-xs sm:text-sm lg:text-base font-semibold text-foreground mb-2 sm:mb-3 opacity-80">
                          {card.subtitle}
                        </p>}
                      <p className="text-sm sm:text-base mb-3 sm:mb-4 lg:mb-6 leading-relaxed text-foreground font-medium">
                        {card.description}
                      </p>
                    </div>
              <Button asChild className="w-full bg-primary-900 dark:bg-primary hover:bg-primary dark:hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 text-primary-foreground font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-500 hover:scale-105 text-sm sm:text-base group">
                      <Link to={card.href} className="flex items-center justify-center space-x-2">
                        <span>{card.cta}</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>)}
          </div>
        </div>
      </Section>

      {/* Inspirational Vision Section Premium */}
      <Section className="py-10 sm:py-14 lg:py-24 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        {/* Premium Background Effects - hidden on mobile */}
        <div className="absolute inset-0 opacity-20 hidden sm:block">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-accent-brand/10"></div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,60,92,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(11,71,206,0.15),transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-10 leading-tight animate-fade-in-up">
              Imagina un mundo donde todas las personas encuentran{" "}
              <span className="text-accent-brand">
                propósito
              </span>{" "}
              en lo que hacen
            </h2>
            <div className="w-16 sm:w-20 lg:w-28 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-4 sm:mb-6 lg:mb-10 rounded-full animate-fade-in-up animation-delay-200"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-6xl mx-auto text-white/90 leading-relaxed mb-4 sm:mb-6 lg:mb-10 font-medium animate-fade-in-up animation-delay-400">
              La educación impulsada por la tecnología nos acerca a ese futuro.
            </p>
            <div className="max-w-5xl mx-auto animate-fade-in-up animation-delay-600">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
                Nuestra misión: <span className="text-accent-brand">CONSTRUIR</span> una educación que inspire, motive y transforme.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 font-medium">
                Porque <strong className="text-accent-brand">nadie</strong> debería quedar atrás.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Impact Section Premium */}
      <Section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-secondary dark:bg-background">
        {/* Background Decorations - hidden on mobile */}
        {/* Background Decorations - hidden on mobile */}
        <div className="absolute inset-0 opacity-5 hidden sm:block">
          <div className="absolute top-40 right-20 w-80 h-80 bg-primary-700 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-accent-brand rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-10 lg:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-5 lg:mb-6 text-primary leading-tight">
              ¿Por qué seguir haciendo lo mismo si el mundo ya{" "}
              <span className="text-primary">
                cambió?
              </span>
            </h2>
            <div className="w-20 sm:w-28 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-3 sm:mb-5 lg:mb-6 rounded-full"></div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-5xl mx-auto mb-3 sm:mb-5 lg:mb-6 text-foreground leading-relaxed font-medium">
              La educación tradicional no está a la altura de las necesidades actuales de estudiantes, docentes e instituciones.
            </p>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-6xl mx-auto mb-4 sm:mb-6 lg:mb-10 text-foreground font-semibold">
              Nuestro ecosistema <strong className="text-accent">CONECTA</strong> a ONGs, universidades, colegios, startups, scaleups, empresas y big tech para:
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            {missionCards.map((card, index) => <div key={index} className="group animate-fade-in-up" style={{
            animationDelay: `${index * 200}ms`
          }}>
                <Card className="p-5 sm:p-6 md:p-8 lg:p-10 text-center border-0 shadow-2xl shadow-primary/15 hover:shadow-3xl hover:shadow-primary/25 transition-all duration-700 hover:scale-105 bg-card h-full group-hover:-translate-y-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-6 sm:mb-8 lg:mb-10 rounded-2xl sm:rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:shadow-3xl group-hover:shadow-primary/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <card.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-primary">
                    {card.title}
                  </h3>
                  <h4 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-foreground leading-tight">
                    {card.subtitle}
                  </h4>
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium">
                    {card.description}
                  </p>
                </Card>
              </div>)}
          </div>
          
          <div className="text-center animate-fade-in-up animation-delay-800">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 dark:from-primary/20 dark:via-accent/10 dark:to-primary/20 rounded-2xl sm:rounded-3xl border border-primary/20 shadow-2xl shadow-primary/10">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-relaxed mb-4 sm:mb-6 md:mb-8">
                Juntas/os, convertimos el aprendizaje en una experiencia{" "}
                <span className="text-accent-brand">accesible, personalizada y relevante</span>{" "}
                para todas las personas.
              </p>
              <Button asChild className="bg-gradient-to-r from-accent-brand to-primary-700 hover:from-accent-brand/90 hover:to-primary-700/90 text-white font-bold px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 rounded-xl shadow-2xl shadow-accent-brand/40 hover:shadow-accent-brand/60 transition-all duration-500 hover:scale-105 sm:hover:scale-110 text-sm sm:text-base lg:text-lg group w-full sm:w-auto">
                <Link to="/asociados" className="inline-flex items-center justify-center gap-2 sm:gap-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                  <span>Quiero ser parte</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>;
};
export default Index;