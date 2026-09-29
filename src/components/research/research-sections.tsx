import { Link } from "react-router-dom"
import { ArrowRight, Download, Linkedin, Link2, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { getResearchLine, type ResearchPublication } from "@/content/research/publications"

export function PublicationCard({ publication, featured = false }: { publication: ResearchPublication; featured?: boolean }) {
  return (
    <article className={`group border-b border-border py-7 md:py-9 ${featured ? "md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] md:gap-12 md:items-center" : ""}`}>
      <Link to={`/investigacion/${publication.slug}`} className="block overflow-hidden bg-secondary aspect-[4/3] max-h-[420px]" aria-label={`Ver ${publication.title}`}>
        <img src={publication.cover} alt={publication.coverAlt} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
      </Link>
      <div className="py-6 md:py-0 min-w-0">
        <p className="text-xs font-bold uppercase text-primary tracking-widest">{publication.type} <span className="text-muted-foreground mx-2">/</span> {getResearchLine(publication.line)}</p>
        <h3 className={`mt-4 font-bold text-foreground leading-tight ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>{publication.title}</h3>
        <time dateTime={publication.date} className="block mt-3 text-sm text-muted-foreground">{formatPublicationDate(publication.date, publication.dateLabel)}</time>
        <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">{publication.description}</p>
        <Button asChild variant="link" className="mt-5 p-0 h-auto font-semibold text-primary">
          <Link to={`/investigacion/${publication.slug}`}>Ver publicación <ArrowRight aria-hidden="true" /></Link>
        </Button>
      </div>
    </article>
  )
}

export function ResearchLine({ number, title }: { number: string; title: string }) {
  return <div className="border-t border-border pt-5 pb-6 flex items-start gap-5">
    <span className="text-sm font-semibold text-accent shrink-0">{number}</span>
     <h3 className="text-base sm:text-lg font-medium leading-snug text-foreground">{title}</h3>
  </div>
}

export function PublicationHero({ publication }: { publication: ResearchPublication }) {
  return <header className="bg-secondary py-10 sm:py-14 lg:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-center">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{publication.type} <span className="mx-2 text-muted-foreground">/</span> {getResearchLine(publication.line)}</p>
        <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">{publication.title}</h1>
        <p className="mt-5 text-lg text-foreground/80 leading-relaxed">{publication.subtitle}</p>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <time dateTime={publication.date}>{formatPublicationDate(publication.date, publication.dateLabel)}</time>
          <span>{publication.authors.map((author) => author.name).join(", ")}</span>
        </div>
        <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
          <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer" download={publication.pdfUrl.startsWith("/") ? true : undefined}><Download aria-hidden="true" /> Descargar publicación</a>
        </Button>
      </div>
      <div className="bg-background border border-border p-3 sm:p-5 max-w-lg lg:max-w-none mx-auto w-full">
        <img src={publication.cover} alt={publication.coverAlt} className="w-full max-h-[530px] object-contain" fetchPriority="high" />
      </div>
    </div>
  </header>
}

export function KeyFindings({ findings }: { findings: ResearchPublication["findings"] }) {
  if (!findings.length) return null
  return <section className="bg-secondary py-16 sm:py-20" aria-labelledby="findings-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">En breve</p>
      <h2 id="findings-heading" className="text-3xl font-bold text-foreground mb-9">Hallazgos principales</h2>
       <div className="grid md:grid-cols-2 gap-x-9">
        {findings.map((finding, index) => <div key={`${index}-${finding.statement}`} className="border-t border-primary/30 py-6">
           {finding.value && <p className="text-3xl sm:text-4xl font-bold text-primary mb-4 break-words">{finding.value}</p>}
          <p className="font-semibold text-foreground text-lg leading-snug">{finding.statement}</p>
          {finding.context && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{finding.context}</p>}
        </div>)}
      </div>
    </div>
  </section>
}

export function PublicationAuthors({ authors }: { authors: ResearchPublication["authors"] }) {
  if (!authors.length) return null
  return <section className="py-14 border-t border-border" aria-labelledby="authors-heading">
    <h2 id="authors-heading" className="text-2xl font-bold text-foreground mb-6">Autores y participantes</h2>
    <div className="grid sm:grid-cols-2 gap-5">{authors.map((author) => <div key={author.name} className="border-t border-border pt-4">
      <p className="font-semibold text-foreground">{author.name}</p>
      {author.role && <p className="text-sm text-muted-foreground mt-1">{author.role}</p>}
    </div>)}</div>
  </section>
}

export function PublicationShare({ title, url }: { title: string; url: string }) {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Enlace copiado")
    } catch { toast.error("No se pudo copiar el enlace") }
  }
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  return <section className="py-10 border-t border-border" aria-label="Compartir publicación">
    <p className="font-semibold text-foreground mb-4">Compartir publicación</p>
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={copyLink}><Link2 aria-hidden="true" /> Copiar enlace</Button>
      <Button asChild variant="outline"><a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn"><Linkedin aria-hidden="true" /> LinkedIn</a></Button>
      <Button asChild variant="outline"><a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Compartir en WhatsApp"><Share2 aria-hidden="true" /> WhatsApp</a></Button>
    </div>
  </section>
}

export function formatPublicationDate(date: string, dateLabel?: string) {
  if (dateLabel) return dateLabel
  const format = new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "long", ...(date.length === 10 ? { day: "numeric" } : {}), timeZone: "UTC" })
  return format.format(new Date(`${date.length === 7 ? `${date}-01` : date}T12:00:00Z`))
}
