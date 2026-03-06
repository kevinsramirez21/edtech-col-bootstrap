import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  FlaskConical,
  BookOpen,
  Database,
  Building2,
  Briefcase,
  Heart,
  ArrowRight,
  Target,
  Shield,
  BarChart3,
  Users,
  GraduationCap,
  Wifi,
  Brain,
  FileCheck,
  Fingerprint,
  FolderOpen,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { generatePageMeta } from "@/lib/seo";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

function EmailCollectorForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .upsert({ email, subscribed: true }, { onConflict: "email" });
      if (error) throw error;
      setSubmitted(true);
      toast.success("¡Listo! Te mantendremos informado.");
    } catch {
      toast.error("Hubo un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary-700/10 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-primary-700" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-primary-700">¡Gracias por suscribirte!</p>
        <p className="text-sm text-primary-900/70">Pronto recibirás noticias sobre nuestras posiciones.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
      <Input
        type="email"
        required
        placeholder="tu@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white border-primary-700/20 text-primary-900 placeholder:text-primary-900/40 h-12 rounded-xl"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-primary-700 hover:bg-primary-900 text-white font-bold px-6 h-12 rounded-xl transition-all duration-300"
      >
        {loading ? "Enviando..." : "Suscribirme"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}

const AcuerdoEducacion = () => {
  const meta = generatePageMeta({
    title: "Acuerdo Básico por la Educación de Colombia",
    description:
      "Tres pilares para transformar la educación en Colombia: sandbox regulatorio, acuerdos curriculares mínimos y gobernanza con datos. Colombia EdTech marca la parada.",
  });

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
      </Helmet>

      {/* Hero */}
      <Section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-accent-brand rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-sand rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 text-xs sm:text-sm md:text-base px-4 py-1.5">
              Colombia EdTech · Marzo 2026
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-2xl">
              Acuerdo Básico por la Educación de Colombia
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl mx-auto text-white/90 leading-relaxed mb-6 sm:mb-8 md:mb-12 font-medium">
              Reglas del Juego: Educación en Colombia
            </p>
          </div>
        </div>
      </Section>

      {/* El Problema */}
      <Section className="py-10 sm:py-14 md:py-20 bg-sand">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-accent flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-primary-700 leading-tight">
            El Problema
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-900 leading-relaxed">
            Muchas ideas, datos y soluciones, pero poca gobernanza democrática de la educación.
          </p>
        </div>
      </Section>

      {/* La Propuesta - Intro */}
      <Section className="py-8 sm:py-10 md:py-14 bg-sand border-b border-primary-700/10">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-primary-700 leading-tight">
            La Propuesta
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-6 sm:mb-8 md:mb-10 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-900 leading-relaxed max-w-3xl mx-auto mb-8">
            Colombia EdTech busca 3 acuerdos con todo el sector de educación.
          </p>
          {/* Preview de los 3 pilares */}
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
            {[
              { num: "1", label: "Sandbox Regulatorio", color: "bg-primary-700" },
              { num: "2", label: "Acuerdos de Pedagogía", color: "bg-accent" },
              { num: "3", label: "Gobernanza y Datos", color: "bg-primary-900" },
            ].map((pilar) => (
              <div key={pilar.num} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${pilar.color} flex items-center justify-center text-white font-bold text-lg sm:text-xl`}>
                  {pilar.num}
                </div>
                <span className="text-[10px] sm:text-xs text-primary-900/70 font-medium">{pilar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pilar 1 - Sandbox Regulatorio */}
      <Section className="py-10 sm:py-14 md:py-20 bg-sand">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-primary-700 flex items-center justify-center">
              <FlaskConical className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <Badge className="mb-3 sm:mb-4 bg-primary-700/10 text-primary-700 border-primary-700/30 text-xs sm:text-sm">Pilar 1</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-primary-700 leading-tight">
              Sandbox Regulatorio EdTech
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-accent max-w-3xl mx-auto mb-4">
              Probar primero, regular después.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-primary-900 max-w-3xl mx-auto leading-relaxed">
              Colombia ya lo hizo en telecomunicaciones con la Resolución 5980 de 2020. Singapur y Corea del Sur usaron el mismo principio para transformar sus sistemas educativos. Reino Unido y Francia ya operan sandbox específicos para EdTech. Colombia tiene el precedente legal, más de 500 instituciones de educación y un ecosistema de más de 140 organizaciones EdTech activas. Falta adaptar el modelo al sector educativo.
            </p>
          </div>

          {/* Referentes internacionales */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            {["🇸🇬 Singapur", "🇰🇷 Corea del Sur", "🇬🇧 Reino Unido", "🇫🇷 Francia"].map((pais) => (
              <Badge key={pais} variant="outline" className="text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-primary-700 text-primary-700 font-semibold">
                {pais}
              </Badge>
            ))}
          </div>

          {/* Propuestas */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
            <Card className="p-5 sm:p-6 md:p-8 bg-white border-0 border-l-4 border-l-primary-700 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-700/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-700 mb-2">
                    Sandbox Nacional de Innovación Educativa
                  </h3>
                  <p className="text-sm sm:text-base text-primary-900 leading-relaxed">
                    Crear un Sandbox Nacional de Innovación Educativa donde soluciones EdTech se prueben en instituciones reales, con métricas claras, evaluación independiente y protección de datos obligatoria.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5 sm:p-6 md:p-8 bg-white border-0 border-l-4 border-l-accent shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-700 mb-2">
                    Cohortes con resultados públicos
                  </h3>
                  <p className="text-sm sm:text-base text-primary-900 leading-relaxed">
                    Cohortes de 12 a 24 meses. Resultados públicos. Lo que funciona, se escala. Lo que no, se descarta.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Pilar 2 - Acuerdos Curriculares */}
      <Section className="py-10 sm:py-14 md:py-20 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(247,60,92,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(11,71,206,0.15),transparent_70%)]"></div>
        </div>
        <div className="container max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 text-xs sm:text-sm">Pilar 2</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-white">
              Acuerdos Mínimos Curriculares
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-6 sm:mb-8 md:mb-10 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white max-w-3xl mx-auto mb-4">
              Piso de calidad, no currículo único.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
              Proponemos acuerdos mínimos sobre qué competencias debe alcanzar un estudiante en cada nivel, en materias clave. Un estándar que permita medir, comparar y mejorar, sin eliminar la autonomía pedagógica de las instituciones.
            </p>
          </div>

          {/* Stat PISA */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12 md:mb-16">
            <Card className="p-6 sm:p-8 md:p-10 text-center bg-white/10 border-0 backdrop-blur-sm">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3">29%</div>
              <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
                de los estudiantes colombianos alcanzó el nivel mínimo de competencia en matemáticas (PISA 2022, OECD 2023)
              </p>
            </Card>
            <Card className="p-6 sm:p-8 md:p-10 text-center bg-white/10 border-0 backdrop-blur-sm">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent-brand mb-2 sm:mb-3">69%</div>
              <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
                es el promedio OCDE (OECD, 2023). Esa brecha no se cierra con más cobertura. Se cierra con claridad sobre qué se debe enseñar y a qué nivel.
              </p>
            </Card>
          </div>

          {/* 3 propuestas */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: "Estándares mínimos de competencias",
                desc: "Definir estándares mínimos de competencias por nivel educativo en áreas prioritarias: matemáticas, lectura, pensamiento computacional, habilidades socioemocionales, inglés y otras.",
              },
              {
                icon: BarChart3,
                title: "Calidad sobre burocracia",
                desc: "Que estos estándares sean el referente para evaluar calidad. No la cantidad de horas en aula ni el cumplimiento burocrático de programas.",
              },
              {
                icon: Brain,
                title: "Autonomía en el cómo",
                desc: "Que cualquier institución pueda innovar en el cómo, siempre que cumpla con el qué.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-5 sm:p-6 md:p-8 bg-white/10 border-0 backdrop-blur-sm hover:bg-white/20 transition-all duration-500">
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent-brand mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-white">{item.title}</h3>
                <p className="text-sm sm:text-base text-white leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Pilar 3 - Gobernanza y Datos */}
      <Section className="py-10 sm:py-14 md:py-20 bg-sand">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-primary-700 flex items-center justify-center">
              <Database className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <Badge className="mb-3 sm:mb-4 bg-primary-700/10 text-primary-700 border-primary-700/30 text-xs sm:text-sm">Pilar 3</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-primary-700 leading-tight">
              Gobernanza y Datos
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-accent max-w-3xl mx-auto mb-4">
              Medir para transformar.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-primary-900 max-w-3xl mx-auto leading-relaxed">
              Lo que no se mide, no se mejora. Lo que no se publica, no se fiscaliza. Colombia tiene datos educativos valiosos dispersos en sistemas que no se comunican entre sí: SIMAT, SNIES, ICFES, SPADIES. Hoy no hay forma de seguir la trayectoria de un estudiante desde primaria hasta el mercado laboral. Sin esa trazabilidad, toda política pública opera a ciegas.
            </p>
          </div>

          {/* 4 propuestas en grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: FileCheck,
                title: "SUIE: Sistema Único de Información Educativa",
                desc: "Integrar las bases de datos existentes en una plataforma interoperable, con dashboards públicos en tiempo real.",
              },
              {
                icon: Fingerprint,
                title: "ID Único del Estudiante",
                desc: "Un identificador único estudiantil que permita el seguimiento longitudinal de trayectorias educativas.",
              },
              {
                icon: FolderOpen,
                title: "Datos abiertos",
                desc: "Datos abiertos con licencias reutilizables para que investigadores, EdTechs y la ciudadanía puedan fiscalizar el sistema.",
              },
              {
                icon: BarChart3,
                title: "Recursos atados a resultados",
                desc: "Vincular la asignación de recursos públicos a resultados verificables de calidad, equidad y pertinencia laboral.",
              },
            ].map((item, index) => (
              <Card key={item.title} className={`p-5 sm:p-6 md:p-8 bg-white border-0 border-l-4 ${index % 2 === 0 ? 'border-l-primary-700' : 'border-l-accent'} shadow-xl hover:shadow-2xl transition-all duration-500`}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-700/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-primary-700 mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-primary-900 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <p className="text-center text-base sm:text-lg md:text-xl font-bold text-accent mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto italic">
            Este es el pilar más complejo y el más incómodo políticamente. Por eso es el más necesario.
          </p>

        </div>
      </Section>





      {/* CTA Final */}
      <Section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-accent-brand rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-8 sm:mb-10 md:mb-12">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white/90">
                Probar y luego regular.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-accent-brand">
                Enseñar lo que importa.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white/90">
                Medir para transformar.
              </p>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
              Fortalecer el ecosistema EdTech y acelerar la educación de Colombia debe ser una política de Estado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl shadow-2xl hover:shadow-accent/40 transition-all duration-500 hover:scale-105 text-sm sm:text-base md:text-lg" asChild>
                <Link to="/asociados" className="flex items-center space-x-2 sm:space-x-3">
                  <span>Únete al Gremio</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90 font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl transition-all duration-500 text-sm sm:text-base md:text-lg border-0" asChild>
                <Link to="/aliados" className="flex items-center space-x-2 sm:space-x-3">
                  <span>Sé un Aliado</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Email Collector */}
      <Section className="py-10 sm:py-14 md:py-20 bg-sand">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-primary-700 flex items-center justify-center">
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-primary-700 leading-tight">
            Mantente informado
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-primary-900 leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto">
            Recibe actualizaciones sobre nuestras posiciones, investigaciones y cómo estamos trabajando para transformar la educación en Colombia.
          </p>
          <EmailCollectorForm />
        </div>
      </Section>
    </>
  );
};

export default AcuerdoEducacion;
