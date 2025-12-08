import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Share2, Linkedin, Twitter } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { Section } from "@/components/ui/section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Noticia {
  id: string
  titulo: string
  slug: string
  extracto: string | null
  contenido: string | null
  imagen_portada: string | null
  categoria: string
  autor: string | null
  fuente: string | null
  url_externa: string | null
  es_externo: boolean
  fecha_publicacion: string | null
  created_at: string
}

export default function NoticiaDetail() {
  const { slug } = useParams<{ slug: string }>()

  const { data: noticia, isLoading, error } = useQuery({
    queryKey: ["noticia", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("slug", slug)
        .eq("estado", "publicado")
        .maybeSingle()

      if (error) throw error
      return data as Noticia | null
    },
    enabled: !!slug,
  })

  const { data: relatedNews } = useQuery({
    queryKey: ["related-news", noticia?.categoria, noticia?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("id, titulo, slug, extracto, imagen_portada, categoria, fecha_publicacion")
        .eq("estado", "publicado")
        .eq("categoria", noticia?.categoria || "")
        .neq("id", noticia?.id || "")
        .order("fecha_publicacion", { ascending: false })
        .limit(3)

      if (error) throw error
      return data
    },
    enabled: !!noticia?.categoria && !!noticia?.id,
  })

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = (platform: "linkedin" | "twitter") => {
    const text = encodeURIComponent(noticia?.titulo || "")
    const url = encodeURIComponent(shareUrl)

    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    }

    window.open(urls[platform], "_blank", "width=600,height=400")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Section className="py-12">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-12 w-full max-w-2xl mb-8" />
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Section>
      </div>
    )
  }

  if (error || !noticia) {
    return (
      <div className="min-h-screen bg-background">
        <Section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Noticia no encontrada</h1>
          <p className="text-muted-foreground mb-8">
            Lo sentimos, la noticia que buscas no existe o ya no está disponible.
          </p>
          <Button asChild>
            <Link to="/mundo-edtech/noticias">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Noticias
            </Link>
          </Button>
        </Section>
      </div>
    )
  }

  const fechaPublicacion = noticia.fecha_publicacion
    ? format(new Date(noticia.fecha_publicacion), "d 'de' MMMM, yyyy", { locale: es })
    : format(new Date(noticia.created_at), "d 'de' MMMM, yyyy", { locale: es })

  return (
    <>
      <Helmet>
        <title>{noticia.titulo} - Colombia EdTech</title>
        <meta name="description" content={noticia.extracto || `Lee más sobre ${noticia.titulo}`} />
        <meta property="og:title" content={noticia.titulo} />
        <meta property="og:description" content={noticia.extracto || ""} />
        {noticia.imagen_portada && <meta property="og:image" content={noticia.imagen_portada} />}
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <Section className="py-4 border-b border-border/50">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Noticias", href: "/mundo-edtech/noticias" },
              { label: noticia.titulo },
            ]}
          />
        </Section>

        {/* Article Header */}
        <Section className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/mundo-edtech/noticias"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Noticias
            </Link>

            {/* Category Badge */}
            <Badge variant="secondary" className="mb-4">
              <Tag className="w-3 h-3 mr-1" />
              {noticia.categoria}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {noticia.titulo}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{fechaPublicacion}</span>
              </div>
              {noticia.autor && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{noticia.autor}</span>
                </div>
              )}
              {noticia.fuente && (
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Fuente: {noticia.fuente}</span>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Compartir:
              </span>
              <Button variant="outline" size="sm" onClick={() => handleShare("linkedin")}>
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("twitter")}>
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Section>

        {/* Featured Image */}
        {noticia.imagen_portada && (
          <Section className="pb-8">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={noticia.imagen_portada}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Section>
        )}

        {/* Article Content */}
        <Section className="pb-12">
          <div className="max-w-4xl mx-auto">
            {noticia.extracto && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-primary pl-6">
                {noticia.extracto}
              </p>
            )}

            {noticia.contenido && (
              <div
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: noticia.contenido }}
              />
            )}

            {noticia.es_externo && noticia.url_externa && (
              <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
                <p className="text-muted-foreground mb-4">
                  Esta noticia proviene de una fuente externa. Lee el artículo completo en:
                </p>
                <Button asChild>
                  <a href={noticia.url_externa} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Leer artículo original
                  </a>
                </Button>
              </div>
            )}
          </div>
        </Section>

        {/* Related News */}
        {relatedNews && relatedNews.length > 0 && (
          <Section className="py-12 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Noticias Relacionadas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedNews.map((news) => (
                  <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {news.imagen_portada && (
                      <div className="aspect-video">
                        <img
                          src={news.imagen_portada}
                          alt={news.titulo}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {news.categoria}
                      </Badge>
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                        <Link
                          to={`/mundo-edtech/noticias/${news.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {news.titulo}
                        </Link>
                      </h3>
                      {news.extracto && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{news.extracto}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>
        )}
      </div>
    </>
  )
}
