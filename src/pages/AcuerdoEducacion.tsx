import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { generatePageMeta } from "@/lib/seo";

const AcuerdoEducacion = () => {
  const meta = generatePageMeta({
    title: "Acuerdo Básico por la Educación de Colombia 2030",
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
              Colombia EdTech · Febrero 2026
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-2xl">
              Acuerdo Básico por la Educación de Colombia 2030
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl mx-auto text-white/90 leading-relaxed mb-6 sm:mb-8 md:mb-12 font-medium">
              Reglas del Juego: Educación en Colombia
            </p>
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-white/70 leading-relaxed">
              No es un plan de gobierno. Es un piso común para que todos —sector público, privado y tercer sector— jueguen con las mismas reglas.
            </p>
          </div>
        </div>
      </Section>

      {/* El Problema */}
      <Section className="py-10 sm:py-14 md:py-20 bg-sand">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-accent flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-primary-700 leading-tight">
              El Problema
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-900 leading-relaxed">
              El sistema educativo colombiano no está roto por falta de voluntad. Está desarticulado.
              El sector público regula sin experimentar. El privado innova sin marco. El tercer sector
              conecta sin datos. Cada uno empuja, pero no hacia el mismo lado.
            </p>
          </div>

          {/* 5 KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
            {[
              { value: "6/10", label: "Empresas no encuentran talento", icon: Briefcase, color: "bg-accent" },
              { value: "~50%", label: "Deserción en educación superior", icon: GraduationCap, color: "bg-primary-700" },
              { value: "2.3M", label: "Jóvenes NINIs en Colombia", icon: Users, color: "bg-accent" },
              { value: "79.8%", label: "Hogares rurales sin internet", icon: Wifi, color: "bg-primary-700" },
              { value: "68%", label: "Docentes sin formación en IA", icon: Brain, color: "bg-accent" },
            ].map((kpi) => (
              <Card key={kpi.label} className="p-4 sm:p-5 md:p-6 text-center bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full ${kpi.color} flex items-center justify-center`}>
                  <kpi.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-accent">{kpi.value}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-primary-900 leading-snug">{kpi.label}</div>
              </Card>
            ))}
          </div>

          <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-700 max-w-3xl mx-auto">
            No faltan diagnósticos. Falta un marco común para actuar.
          </p>
        </div>
      </Section>

      {/* La Propuesta - Intro */}
      <Section className="py-10 sm:py-14 md:py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-primary-700 leading-tight">
            La Propuesta
          </h2>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-6 sm:mb-8 md:mb-10 rounded-full"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary-900 leading-relaxed max-w-3xl mx-auto mb-6">
            Este acuerdo plantea <span className="font-bold text-accent">3 pilares</span> que unen a los 3 sectores bajo un piso común.
            No es un currículo único ni una política pública cerrada. Es un marco de acción compartido.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Badge className="bg-primary-700 text-white text-xs sm:text-sm md:text-base px-4 py-2">Sector Público</Badge>
            <Badge className="bg-accent text-white text-xs sm:text-sm md:text-base px-4 py-2">Sector Privado</Badge>
            <Badge className="bg-primary-900 text-white text-xs sm:text-sm md:text-base px-4 py-2">Tercer Sector</Badge>
          </div>
        </div>
      </Section>

      {/* Pilar 1 - Sandbox Regulatorio */}
      <Section className="py-10 sm:py-14 md:py-20 bg-white">
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
              Colombia regula la innovación educativa antes de probarla. Eso frena al sector privado,
              limita la experimentación y deja al país rezagado frente a modelos que ya funcionan en el mundo.
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
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-700/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-700 mb-2">
                    Zona de pruebas controlada
                  </h3>
                  <p className="text-sm sm:text-base text-primary-900 leading-relaxed">
                    Crear una zona de pruebas controlada para nuevos modelos educativos con tecnología,
                    con métricas claras y tiempos definidos antes de legislar.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary-700 mb-2">
                    Regulación basada en evidencia
                  </h3>
                  <p className="text-sm sm:text-base text-primary-900 leading-relaxed">
                    Las reglas deben nacer de la evidencia, no de la intuición.
                    Solo se regula lo que ya se probó con datos reales.
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Acuerdos Mínimos Curriculares
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-accent-brand to-white mx-auto mb-6 sm:mb-8 md:mb-10 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white/90 max-w-3xl mx-auto mb-4">
              Piso de calidad, no currículo único.
            </p>
          </div>

          {/* Stat PISA */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12 md:mb-16">
            <Card className="p-6 sm:p-8 md:p-10 text-center bg-white/10 border-0 backdrop-blur-sm">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3">29%</div>
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                de los estudiantes colombianos alcanzan nivel mínimo de competencia en lectura (PISA)
              </p>
            </Card>
            <Card className="p-6 sm:p-8 md:p-10 text-center bg-white/10 border-0 backdrop-blur-sm">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent-brand mb-2 sm:mb-3">69%</div>
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                es el promedio OCDE. Colombia está 40 puntos porcentuales por debajo.
              </p>
            </Card>
          </div>

          {/* 3 propuestas */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Target,
                title: "Estándares mínimos por nivel",
                desc: "Definir qué debe saber un estudiante al terminar cada ciclo, no cómo debe aprenderlo.",
              },
              {
                icon: Brain,
                title: "Pensamiento computacional + IA",
                desc: "Incorporar pensamiento computacional e IA como competencia transversal desde básica.",
              },
              {
                icon: BarChart3,
                title: "Evaluación por competencias",
                desc: "Pasar de evaluar memorización a evaluar habilidades aplicadas y resolución de problemas.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-5 sm:p-6 md:p-8 bg-white/10 border-0 backdrop-blur-sm hover:bg-white/20 transition-all duration-500">
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-accent-brand mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.desc}</p>
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
              Colombia tiene datos educativos dispersos en SIMAT, SNIES, ICFES y SPADIES. 
              Ninguno se habla entre sí. Sin datos integrados no hay política pública efectiva.
            </p>
          </div>

          {/* 4 propuestas en grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: FileCheck,
                title: "SUIE: Sistema Único de Información Educativa",
                desc: "Integrar todos los sistemas existentes en una sola plataforma con interoperabilidad real.",
              },
              {
                icon: Fingerprint,
                title: "ID Único del Estudiante",
                desc: "Un identificador que acompañe al estudiante desde preescolar hasta su vida laboral.",
              },
              {
                icon: FolderOpen,
                title: "Datos abiertos",
                desc: "Liberar datos de resultados educativos para que investigadores, EdTechs y sociedad civil puedan innovar.",
              },
              {
                icon: BarChart3,
                title: "Recursos atados a resultados",
                desc: "Vincular la asignación de recursos públicos a indicadores de impacto, no solo a cobertura.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-5 sm:p-6 md:p-8 bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
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

          {/* Sistemas actuales */}
          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <p className="text-xs sm:text-sm text-primary-900/70 mb-3">Sistemas actuales que necesitan integración:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["SIMAT", "SNIES", "ICFES", "SPADIES"].map((s) => (
                <Badge key={s} variant="outline" className="text-xs sm:text-sm border-primary-700/40 text-primary-700">{s}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Llamado a la Acción - 3 columnas */}
      <Section className="py-10 sm:py-14 md:py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-primary-700 leading-tight">
              Llamado a la Acción
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-primary-700 to-accent-brand mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
            <p className="text-sm sm:text-base md:text-lg text-primary-900 max-w-3xl mx-auto leading-relaxed">
              El cambio no depende de un solo sector. Cada uno tiene compromisos concretos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Sector Público */}
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-primary-700 to-primary-900 text-white border-0 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">Sector Público</h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Crear el sandbox regulatorio",
                  "Integrar sistemas de datos (SUIE)",
                  "Vincular recursos a resultados",
                  "Adoptar estándares mínimos de competencias",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-brand flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm md:text-base text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Sector Privado */}
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-accent to-accent/80 text-white border-0 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">Sector Privado</h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Participar activamente en el sandbox",
                  "Reportar métricas de impacto",
                  "Alinearse a estándares curriculares mínimos",
                  "Invertir en formación docente en IA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm md:text-base text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Tercer Sector */}
            <Card className="p-5 sm:p-6 md:p-8 bg-gradient-to-br from-primary-900 to-primary-700 text-white border-0 shadow-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center">Tercer Sector</h3>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Ser puente entre público y privado",
                  "Facilitar investigación con datos abiertos",
                  "Validar modelos en territorio",
                  "Amplificar voces de comunidades educativas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent-brand flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm md:text-base text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
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
              Colombia EdTech marca la parada. ¿Quién se suma?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl shadow-2xl hover:shadow-accent/40 transition-all duration-500 hover:scale-105 text-sm sm:text-base md:text-lg" asChild>
                <Link to="/asociados" className="flex items-center space-x-2 sm:space-x-3">
                  <span>Únete al Gremio</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white hover:text-primary-900 font-bold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl transition-all duration-500 text-sm sm:text-base md:text-lg" asChild>
                <Link to="/aliados" className="flex items-center space-x-2 sm:space-x-3">
                  <span>Sé un Aliado</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AcuerdoEducacion;
