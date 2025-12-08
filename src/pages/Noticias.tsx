import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Search, Calendar, ArrowRight, ExternalLink, Tag, Newspaper } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { Section } from "@/components/ui/section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Noticia {
  id: string
  titulo: string
  slug: string
  extracto: string | null
  imagen_portada: string | null
  categoria: string
  autor: string | null
  fuente: string | null
  url_externa: string | null
  es_externo: boolean
  destacada: boolean
  fecha_publicacion: string | null
  created_at: string
}

const CATEGORIES = [
  "Todas",
  "Inversión",
  "Política Pública",
  "Innovación",
  "Educación Superior",
  "K-12",
  "Corporativo",
  "Startups",
  "Internacional",
]

export default function Noticias() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const { data: noticias, isLoading } = useQuery({
    queryKey: ["noticias"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("estado", "publicado")
        .order("fecha_publicacion", { ascending: false })

      if (error) throw error
      return data as Noticia[]
    },
  })

  const filteredNews = noticias?.filter((noticia) => {
    const matchesSearch =
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.extracto?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "Todas" || noticia.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews?.filter((n) => n.destacada).slice(0, 1)[0]
  const highlightedNews = filteredNews?.filter((n) => n.destacada && n.id !== featuredNews?.id).slice(0, 2)
  const regularNews = filteredNews?.filter((n) => !n.destacada || (n.id !== featuredNews?.id && !highlightedNews?.find(h => h.id === n.id)))

  const formatDate = (dateString: string | null, fallback: string) => {
    const date = dateString ? new Date(dateString) : new Date(fallback)
    return format(date, "d MMM yyyy", { locale: es })
  }

  return (
    <>
      <Helmet>
        <title>Noticias EdTech - Colombia EdTech</title>
        <meta
          name="description"
          content="Las últimas noticias del sector EdTech en Colombia y el mundo. Inversiones, políticas públicas, innovación y más."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
          <Section className="py-4">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Mundo EdTech", href: "#" },
                { label: "Noticias" },
              ]}
              className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white"
            />
          </Section>

          <Section className="pb-12 pt-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Newspaper className="w-8 h-8 text-accent-brand" />
                <Badge variant="secondary" className="bg-white/10 text-white border-0">
                  Actualidad EdTech
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Noticias del Sector
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                Las últimas novedades del ecosistema EdTech en Colombia y el mundo. 
                Inversiones, políticas públicas, innovación y más.
              </p>
            </div>
          </Section>
        </div>

        {/* Search & Filters */}
        <Section className="py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar noticias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* Loading State */}
        {isLoading && (
          <Section className="py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-96 w-full rounded-2xl" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-44 w-full rounded-xl" />
                <Skeleton className="h-44 w-full rounded-xl" />
              </div>
            </div>
          </Section>
        )}

        {/* Empty State */}
        {!isLoading && (!filteredNews || filteredNews.length === 0) && (
          <Section className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No hay noticias disponibles</h2>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== "Todas"
                  ? "No se encontraron noticias con los filtros seleccionados."
                  : "Próximamente publicaremos noticias del sector EdTech."}
              </p>
              {(searchTerm || selectedCategory !== "Todas") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("Todas")
                  }}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </Section>
        )}

        {/* Featured Section */}
        {!isLoading && featuredNews && (
          <Section className="py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Featured */}
              <div className="lg:col-span-2">
                <NewsCard noticia={featuredNews} variant="featured" formatDate={formatDate} />
              </div>

              {/* Side Highlights */}
              {highlightedNews && highlightedNews.length > 0 && (
                <div className="space-y-6">
                  {highlightedNews.map((noticia) => (
                    <NewsCard
                      key={noticia.id}
                      noticia={noticia}
                      variant="highlight"
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Latest News Grid */}
        {!isLoading && regularNews && regularNews.length > 0 && (
          <Section className="py-12 bg-muted/30">
            <h2 className="text-2xl font-bold text-foreground mb-8">Últimas Noticias</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((noticia) => (
                <NewsCard key={noticia.id} noticia={noticia} variant="card" formatDate={formatDate} />
              ))}
            </div>
          </Section>
        )}
      </div>
    </>
  )
}

// NewsCard Component
interface NewsCardProps {
  noticia: Noticia
  variant: "featured" | "highlight" | "card"
  formatDate: (date: string | null, fallback: string) => string
}

function NewsCard({ noticia, variant, formatDate }: NewsCardProps) {
  const linkProps = noticia.es_externo && noticia.url_externa
    ? { href: noticia.url_externa, target: "_blank", rel: "noopener noreferrer" as const }
    : { to: `/mundo-edtech/noticias/${noticia.slug}` }

  const LinkComponent = noticia.es_externo && noticia.url_externa ? "a" : Link

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
        <div className="relative aspect-[16/10]">
          {noticia.imagen_portada ? (
            <img
              src={noticia.imagen_portada}
              alt={noticia.titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center">
              <Newspaper className="w-20 h-20 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-accent-brand text-white border-0">
                <Tag className="w-3 h-3 mr-1" />
                {noticia.categoria}
              </Badge>
              {noticia.es_externo && (
                <Badge variant="outline" className="border-white/30 text-white">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {noticia.fuente || "Externo"}
                </Badge>
              )}
            </div>
            <LinkComponent {...(linkProps as any)} className="block group">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-accent-brand transition-colors line-clamp-2">
                {noticia.titulo}
              </h2>
            </LinkComponent>
            {noticia.extracto && (
              <p className="text-white/80 line-clamp-2 mb-4 text-lg">{noticia.extracto}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Calendar className="w-4 h-4" />
                {formatDate(noticia.fecha_publicacion, noticia.created_at)}
              </div>
              <LinkComponent {...(linkProps as any)}>
                <Button variant="ghost" size="sm" className="text-white hover:text-accent-brand hover:bg-white/10">
                  Leer más
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </LinkComponent>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === "highlight") {
    return (
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="flex gap-4 p-4">
          {noticia.imagen_portada && (
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={noticia.imagen_portada}
                alt={noticia.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="mb-2 text-xs">
              {noticia.categoria}
            </Badge>
            <LinkComponent {...(linkProps as any)}>
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {noticia.titulo}
              </h3>
            </LinkComponent>
            <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
              <Calendar className="w-3 h-3" />
              {formatDate(noticia.fecha_publicacion, noticia.created_at)}
              {noticia.es_externo && <ExternalLink className="w-3 h-3 ml-1" />}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Card variant
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        {noticia.imagen_portada ? (
          <img
            src={noticia.imagen_portada}
            alt={noticia.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <Newspaper className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
        {noticia.es_externo && (
          <Badge className="absolute top-3 right-3 bg-black/50 text-white border-0">
            <ExternalLink className="w-3 h-3" />
          </Badge>
        )}
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {noticia.categoria}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(noticia.fecha_publicacion, noticia.created_at)}
          </span>
        </div>
        <LinkComponent {...(linkProps as any)} className="flex-1">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {noticia.titulo}
          </h3>
        </LinkComponent>
        {noticia.extracto && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{noticia.extracto}</p>
        )}
        <div className="mt-auto">
          <LinkComponent {...(linkProps as any)}>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
              Leer más
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </LinkComponent>
        </div>
      </CardContent>
    </Card>
  )
}
