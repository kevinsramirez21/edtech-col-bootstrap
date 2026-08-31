import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { generatePageMeta, generateBreadcrumbJsonLd } from "@/lib/seo";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Clock,
  HeartHandshake,
  Compass,
  Layers,
  LineChart,
  Megaphone,
  Users,
} from "lucide-react";
import {
  CONFIABILIDAD_LABEL,
  IMPACTO_CIFRAS_NACIONALES,
  IMPACTO_FECHA_CORTE,
  IMPACTO_MISION,
  IMPACTO_RESUMEN,
  IMPACTO_TERRITORIOS,
  IMPACTO_VACIOS,
  type Confiabilidad,
} from "@/components/mision-educacion/impact-data";
import {
  FormAportarTiempo,
  FormOrganizacionAfectada,
  FormSolucionTerritorio,
} from "@/components/mision-educacion/mision-forms";

type Ruta = "afectada" | "solucion" | "tiempo";

const RUTAS: {
  id: Ruta;
  icon: typeof Building2;
  titulo: string;
  descripcion: string;
  cta: string;
}[] = [
  {
    id: "afectada",
    icon: Building2,
    titulo: "Hago parte de una organización afectada",
    descripcion:
      "Alcaldías, gobernaciones, secretarías de educación e instituciones educativas que necesitan apoyo para retomar la operación.",
    cta: "Registrar mi organización",
  },
  {
    id: "solucion",
    icon: HeartHandshake,
    titulo: "Tengo una solución o trabajo en territorio",
    descripcion:
      "Empresas EdTech, fundaciones, universidades e iniciativas que pueden aportar tecnología, contenidos, formación o recursos.",
    cta: "Ofrecer nuestra solución",
  },
  {
    id: "tiempo",
    icon: Clock,
    titulo: "Quiero aportar mi tiempo",
    descripcion:
      "Personas que quieren donar su talento para mapear, conectar, comunicar y acompañar la respuesta educativa.",
    cta: "Sumarme como voluntario",
  },
];

const HORIZONTES = [
  {
    icon: Megaphone,
    periodo: "Semanas 1 a 4",
    titulo: "Escuchar y mapear",
    texto:
      "Levantamos información con secretarías, instituciones y organizaciones para entender la afectación educativa real.",
  },
  {
    icon: Layers,
    periodo: "Meses 1 a 3",
    titulo: "Conectar oferta y necesidad",
    texto:
      "Cruzamos lo que el territorio necesita con lo que el ecosistema puede ofrecer y activamos las primeras respuestas.",
  },
  {
    icon: Compass,
    periodo: "Meses 3 a 12",
    titulo: "Acompañar la reconstrucción",
    texto:
      "Sostenemos proyectos de continuidad educativa, formación docente y bienestar de la comunidad educativa.",
  },
  {
    icon: LineChart,
    periodo: "Más allá del año 1",
    titulo: "Cerrar brechas históricas",
    texto:
      "Convertimos la emergencia en una oportunidad para atender territorios que llevan años sin infraestructura ni acompañamiento.",
  },
];

const PROMESAS = [
  {
    titulo: "Tu caso entra al mapeo",
    texto: "Consolidamos la información en un panorama público que ayuda a priorizar la respuesta.",
  },
  {
    titulo: "Te conectamos con quien puede ayudar",
    texto: "Cruzamos necesidades con las soluciones del ecosistema EdTech y de nuestros aliados.",
  },
  {
    titulo: "Hacemos seguimiento",
    texto: "No es un formulario que se archiva: acompañamos el proceso y reportamos avances.",
  },
  {
    titulo: "Convertimos datos en incidencia",
    texto: "Usamos la evidencia para conversar con tomadores de decisión y movilizar recursos.",
  },
];

const CONFIABILIDAD_STYLES: Record<Confiabilidad, string> = {
  oficial: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  estimacion: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  mesa: "bg-accent/10 text-accent-brand border-accent/30",
};

function ConfiabilidadBadge({ nivel }: { nivel: Confiabilidad }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        CONFIABILIDAD_STYLES[nivel],
      )}
    >
      {CONFIABILIDAD_LABEL[nivel]}
    </span>
  );
}



export default function MisionEducacion() {
  const [ruta, setRuta] = useState<Ruta | null>(null);

  const meta = generatePageMeta({
    title: "Misión Educación | Terremoto 2026",
    description:
      "Respuesta del ecosistema EdTech al terremoto en Colombia: registra tu organización afectada, ofrece una solución o aporta tu tiempo.",
  });

  const breadcrumbLd = generateBreadcrumbJsonLd([
    { name: "Misión Educación", item: `${window.location.origin}/mision-educacion` },
  ]);

  const seleccionar = (id: Ruta) => {
    setRuta(id);
    requestAnimationFrame(() => {
      document.getElementById("mision-formulario")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      {/* Hero + rutas */}
      <Section className="bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] pt-8 text-primary-foreground relative overflow-hidden">
        {/* Decorative glows like other brand heroes */}
        <div className="pointer-events-none absolute -top-16 right-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-sand/10 blur-3xl" />
        <div className="relative z-10">
          <div className="[&_a]:text-primary-foreground/70 [&_span]:text-primary-foreground [&_svg]:text-primary-foreground/70">
            <Breadcrumbs items={[{ label: "Misión Educación" }]} />
          </div>
          <div className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#F73C5C]">
              Terremoto 2026 · Respuesta del ecosistema
            </p>
            <h1
              className="mt-3 text-4xl font-bold text-primary-foreground sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Misión Educación
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/85">
              Cuando la tierra se mueve, la escuela se detiene. Estamos articulando a más de 150 líderes del
              ecosistema educativo para que ningún estudiante quede por fuera. Empieza eligiendo cómo quieres
              participar.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {RUTAS.map((item) => {
            const Icon = item.icon;
            const active = ruta === item.id;
            return (
              <Card
                key={item.id}
                className={cn(
                  "flex h-full flex-col border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg",
                  active && "border-primary ring-2 ring-primary/30",
                )}
              >
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{item.titulo}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{item.descripcion}</p>
                  <Button className="mt-6 w-full" onClick={() => seleccionar(item.id)}>
                    {item.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Formulario */}
      <Section id="mision-formulario" className="scroll-mt-24">
        {ruta === null ? (
          <Card className="border-dashed border-border">
            <CardContent className="p-10 text-center">
              <Users className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground">Elige tu ruta para continuar</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Selecciona una de las tres opciones de arriba y te mostraremos el formulario correspondiente.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setRuta(null)}>
              Cambiar de ruta
            </Button>
            {ruta === "afectada" && <FormOrganizacionAfectada />}
            {ruta === "solucion" && <FormSolucionTerritorio />}
            {ruta === "tiempo" && <FormAportarTiempo />}
          </div>
        )}
      </Section>

      {/* Dimensión del impacto */}
      <Section className="bg-sand">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-brand">
            La dimensión del impacto
          </p>
          <h2
            className="mt-3 text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            El mapeo de la afectación educativa
          </h2>
          <p className="mt-4 text-muted-foreground">{IMPACTO_RESUMEN.nota}</p>
          <p className="mt-2 text-sm text-muted-foreground">{IMPACTO_FECHA_CORTE}</p>
        </div>

        {/* Semáforo de confiabilidad */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(CONFIABILIDAD_LABEL) as Confiabilidad[]).map((c) => (
            <ConfiabilidadBadge key={c} nivel={c} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {IMPACTO_CIFRAS_NACIONALES.map((c) => (
            <Card key={c.etiqueta} className="h-full border-border/70">
              <CardContent className="flex h-full flex-col p-5">
                <p className="text-3xl font-bold text-primary">{c.valor}</p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.etiqueta}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <ConfiabilidadBadge nivel={c.confiabilidad} />
                  <span className="text-xs text-muted-foreground">{c.fuente}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fichas por territorio */}
        <h3 className="mt-14 text-2xl font-bold text-foreground">Territorio por territorio</h3>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {IMPACTO_TERRITORIOS.map((t) => (
            <Card key={t.departamento} className="h-full border-border/70">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-xl font-bold text-foreground">{t.departamento}</h4>
                  <ConfiabilidadBadge nivel={t.confiabilidad} />
                </div>
                <p className="mt-4 text-3xl font-bold text-primary">{t.valor}</p>
                <p className="text-sm text-muted-foreground">{t.etiquetaValor}</p>
                <dl className="mt-4 space-y-3 border-t border-border/60 pt-4 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">Estudiantes</dt>
                    <dd className="text-muted-foreground">{t.estudiantes}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Retorno a clases</dt>
                    <dd className="text-muted-foreground">{t.retorno}</dd>
                  </div>
                </dl>
                <p className="mt-4 flex-1 text-sm text-muted-foreground">{t.detalle}</p>
                <p className="mt-4 text-xs text-muted-foreground">Fuente: {t.fuente}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lo que ya movió la misión */}
        <h3 className="mt-14 text-2xl font-bold text-foreground">Lo que ya movió la misión</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACTO_MISION.map((i) => (
            <Card key={i.etiqueta} className="border-border/70 bg-card">
              <CardContent className="p-5">
                <p className="text-3xl font-bold text-foreground">{i.valor}</p>
                <p className="mt-1 text-sm text-muted-foreground">{i.etiqueta}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vacíos de información */}
        <Card className="mt-14 border-border/70">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-foreground">Lo que todavía no sabemos</h3>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              El vacío de datos es, hoy, uno de los mayores obstáculos para responder bien. Estos son los
              huecos que estamos levantando en terreno con las secretarías y las instituciones educativas.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {IMPACTO_VACIOS.map((v) => (
                <li key={v} className="flex gap-3 text-sm text-muted-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-brand" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Section>


      {/* La crisis dura años */}
      <Section>
        <div className="max-w-3xl">
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            La crisis no dura dos semanas: dura años
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La emergencia sale de los titulares rápido, pero la afectación educativa se queda. Nuestra apuesta
            no termina con la ayuda inmediata: es una oportunidad para atender territorios que llevan años sin
            infraestructura ni acompañamiento.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {HORIZONTES.map((h, index) => {
            const Icon = h.icon;
            return (
              <Card key={h.titulo} className="h-full border-border/70">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-brand">
                    {String(index + 1).padStart(2, "0")} · {h.periodo}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-foreground">{h.titulo}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{h.texto}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Qué haremos con tu registro */}
      <Section className="bg-sand">
        <div className="max-w-3xl">
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Qué haremos con tu registro?
          </h2>
          <p className="mt-4 text-muted-foreground">
            No estás solo en esto. Cada registro entra a un proceso concreto de articulación.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PROMESAS.map((p) => (
            <Card key={p.titulo} className="border-border/70">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground">{p.titulo}</h3>
                <p className="mt-2 text-muted-foreground">{p.texto}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
