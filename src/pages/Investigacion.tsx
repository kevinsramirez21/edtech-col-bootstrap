import { Helmet } from "react-helmet-async"
import { ArrowDown, BookOpen } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { PublicationCard, PublicationCTA, ResearchLine } from "@/components/research/research-sections"
import { researchLines, sortedPublications } from "@/content/research/publications"
import researchPhoto from "@/assets/evento-colombia-edtech-presentacion-v2.jpg"

const description = "Investigaciones, white papers y reportes de Colombia EdTech sobre educación y tecnología en Colombia y Latinoamérica."
const url = "https://colombiaedtech.org/investigacion"

export default function Investigacion() {
  const publications = sortedPublications()
  return <>
    <Helmet>
      <title>Investigación | Colombia EdTech</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content="Investigación | Colombia EdTech" />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
    </Helmet>

    <div className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <nav aria-label="Ruta de navegación" className="text-sm text-muted-foreground"><Link to="/" className="hover:text-primary">Inicio</Link> <span aria-hidden="true" className="px-2">/</span> Investigación</nav>
      </div>
    </div>
    <header className="bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] items-center gap-8 lg:gap-14 py-10 sm:py-14 lg:py-16">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">Conocimiento para la transformación</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">Investigación<span className="text-accent">.</span></h1>
          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed mt-6 max-w-2xl">Generamos conocimiento para comprender los retos, oportunidades y transformaciones de la educación y la tecnología en Colombia y Latinoamérica.</p>
          <Button asChild variant="link" className="px-0 mt-7 text-primary font-semibold"><a href="#publicaciones">Explorar publicaciones <ArrowDown aria-hidden="true" /></a></Button>
        </div>
        <div className="w-full h-56 sm:h-72 lg:h-96 overflow-hidden bg-primary-900">
          <img src={researchPhoto} alt="Encuentro del ecosistema Colombia EdTech" className="w-full h-full object-cover object-center" fetchPriority="high" />
        </div>
      </div>
    </header>

    <section id="publicaciones" className="py-16 sm:py-20 scroll-mt-20" aria-labelledby="publicaciones-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border pb-7 flex items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Biblioteca de conocimiento</p><h2 id="publicaciones-heading" className="text-3xl sm:text-4xl font-bold text-foreground">Publicaciones</h2></div>
          {publications.length > 0 && <span className="text-sm text-muted-foreground shrink-0">{publications.length} {publications.length === 1 ? "publicación" : "publicaciones"}</span>}
        </div>
        {publications.length ? <div className="grid md:grid-cols-2 gap-x-10">{publications.map((publication, index) => <div key={publication.slug} className={index === 0 ? "md:col-span-2" : ""}><PublicationCard publication={publication} featured={index === 0} /></div>)}</div> :
          <div className="py-14 sm:py-20 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start max-w-3xl">
            <div className="w-14 h-14 border border-primary/20 flex items-center justify-center text-primary"><BookOpen size={27} strokeWidth={1.5} aria-hidden="true" /></div>
            <div><h3 className="text-2xl font-semibold text-foreground">Pronto, nuevas perspectivas para compartir.</h3><p className="mt-4 text-muted-foreground leading-relaxed">Estamos preparando este espacio para publicar nuestras investigaciones y reportes. Aquí encontrarás cada documento con su contexto, hallazgos y versión completa.</p></div>
          </div>}
      </div>
    </section>

    <section className="bg-secondary py-16 sm:py-20" aria-labelledby="lineas-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 lg:gap-20">
        <div><p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Lo que nos mueve</p><h2 id="lineas-heading" className="text-3xl sm:text-4xl font-bold text-foreground">Líneas de investigación</h2></div>
        <div>{researchLines.map((line, index) => <ResearchLine key={line.id} number={String(index + 1).padStart(2, "0")} title={line.title} />)}</div>
      </div>
    </section>
    <PublicationCTA />
  </>
}
