import { Helmet } from "react-helmet-async"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPublication } from "@/content/research/publications"
import { KeyFindings, PublicationAuthors, PublicationHero, PublicationShare } from "@/components/research/research-sections"

export default function InvestigacionPublicacion() {
  const { slug } = useParams<{ slug: string }>()
  const publication = slug ? getPublication(slug) : undefined

  if (!publication) return <>
    <Helmet><title>Publicación no disponible | Colombia EdTech</title><meta name="robots" content="noindex" /></Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[50vh]">
      <h1 className="text-3xl font-bold text-foreground">Publicación no disponible</h1>
      <p className="mt-4 text-muted-foreground">Esta publicación no está disponible en la biblioteca.</p>
      <Button asChild className="mt-8"><Link to="/investigacion"><ArrowLeft aria-hidden="true" /> Volver a Investigación</Link></Button>
    </div>
  </>

  const url = `https://colombiaedtech.org/investigacion/${publication.slug}`
  const image = publication.socialImage?.startsWith("https://") ? publication.socialImage : undefined
  const documentLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    headline: publication.title,
    description: publication.description,
    datePublished: publication.date,
    author: publication.authors.map((author) => ({ "@type": "Person", name: author.name })),
    url,
  }

  return <>
    <Helmet>
      <title>{publication.title} | Colombia EdTech</title>
      <meta name="description" content={publication.description} />
      <meta name="author" content={publication.authors.map((author) => author.name).join(", ")} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={publication.title} />
      <meta property="og:description" content={publication.description} />
      <meta property="og:url" content={url} />
      <meta property="article:published_time" content={publication.date} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      {image && <meta name="twitter:image" content={image} />}
      <script type="application/ld+json">{JSON.stringify(documentLd)}</script>
    </Helmet>
    <div className="bg-secondary">
      <nav aria-label="Ruta de navegación" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 text-sm text-muted-foreground flex flex-wrap gap-2">
        <Link to="/" className="hover:text-primary">Inicio</Link><span aria-hidden="true">/</span><Link to="/investigacion" className="hover:text-primary">Investigación</Link><span aria-hidden="true">/</span><span aria-current="page" className="truncate max-w-52 sm:max-w-sm">{publication.title}</span>
      </nav>
    </div>
    <PublicationHero publication={publication} />
    <section className="py-16 sm:py-20" aria-labelledby="summary-heading"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">El documento en contexto</p>
      <h2 id="summary-heading" className="text-3xl font-bold text-foreground mb-8">Resumen ejecutivo</h2>
      <div className="space-y-5 text-lg leading-relaxed text-foreground/85">{publication.summary.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
    </div></section>
    <KeyFindings findings={publication.findings} />
    <section className="py-16 sm:py-20" aria-labelledby="document-heading"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">Lectura completa</p>
      <h2 id="document-heading" className="text-3xl font-bold text-foreground">Documento completo</h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">Descarga el documento o ábrelo en una nueva pestaña para leerlo a tu ritmo.</p>
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button asChild size="lg"><a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer" download={publication.pdfUrl.startsWith("/") ? true : undefined}><Download aria-hidden="true" /> Descargar publicación</a></Button>
        <Button asChild variant="outline" size="lg"><a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> Ver documento</a></Button>
      </div>
      <PublicationAuthors authors={publication.authors} />
      <PublicationShare url={url} />
    </div></section>
  </>
}
