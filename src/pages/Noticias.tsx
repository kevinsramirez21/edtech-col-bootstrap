import * as React from "react"
import { Link } from "react-router-dom"
import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ExternalLink, TrendingUp } from "lucide-react";

// Seed data for news
const noticias = [
  {
    id: "1",
    title: "Colombia se posiciona como hub EdTech de Latinoamérica",
    excerpt: "El país atrae inversión internacional y se consolida como líder regional en innovación educativa.",
    source: "TechCrunch Latam",
    date: "2024-03-18",
    category: "Inversión",
    external: true,
    url: "#",
    featured: true
  },
  {
    id: "2", 
    title: "Ministerio de Educación lanza programa de digitalización",
    excerpt: "Nueva iniciativa busca capacitar a 50,000 docentes en herramientas digitales educativas.",
    source: "Colombia EdTech",
    date: "2024-03-15",
    category: "Política Pública",
    external: false,
    featured: true
  },
  {
    id: "3",
    title: "Startup colombiana gana premio internacional de innovación",
    excerpt: "Reconocimiento mundial destaca solución de IA para personalización del aprendizaje.",
    source: "Portafolio",
    date: "2024-03-12",
    category: "Innovación",
    external: true,
    url: "#"
  },
  {
    id: "4",
    title: "Análisis: El futuro del aprendizaje híbrido en Colombia",
    excerpt: "Estudio revela preferencias de estudiantes y instituciones por modelos educativos flexibles.",
    source: "Colombia EdTech",
    date: "2024-03-10",
    category: "Análisis",
    external: false
  },
  {
    id: "5",
    title: "Record de financiación para EdTech en el primer trimestre",
    excerpt: "Inversión supera los $12M USD, marcando el mejor inicio de año del sector.",
    source: "Venture Capital Journal",
    date: "2024-03-08",
    category: "Inversión",
    external: true,
    url: "#"
  },
  {
    id: "6",
    title: "Universidad Nacional adopta blockchain para certificados",
    excerpt: "Primera institución pública en implementar tecnología blockchain para validar títulos.",
    source: "El Tiempo",
    date: "2024-03-05",
    category: "Tecnología",
    external: true,
    url: "#"
  }
];

const Noticias = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Todas")
  
  const categories = ["Todas", ...Array.from(new Set(noticias.map(n => n.category)))]
  
  const filteredNews = noticias.filter(noticia => {
    const matchesSearch = noticia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         noticia.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || noticia.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews.filter(n => n.featured)
  const regularNews = filteredNews.filter(n => !n.featured)

  const getCategoryColor = (category: string) => {
    const colors = {
      "Inversión": "bg-green-100 text-green-800",
      "Política Pública": "bg-blue-100 text-blue-800", 
      "Innovación": "bg-purple-100 text-purple-800",
      "Análisis": "bg-orange-100 text-orange-800",
      "Tecnología": "bg-red-100 text-red-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Mundo EdTech", href: "/mundo-edtech" },
            { label: "Noticias" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Noticias EdTech"
          subtitle="Actualidad del sector"
          description="Las últimas noticias, análisis y tendencias del ecosistema EdTech colombiano e internacional"
        />
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar noticias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="w-5 h-5 text-primary-700" />
              <h2 className="text-2xl font-bold text-gray-900">Destacadas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredNews.map((noticia) => (
                <Card key={noticia.id} className="group hover:shadow-lg transition-shadow border-l-4 border-primary-700">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(noticia.category)}>
                        {noticia.category}
                      </Badge>
                      {noticia.external && (
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary-700 transition-colors">
                      {noticia.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{noticia.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(noticia.date).toLocaleDateString('es-CO')}</span>
                        </div>
                        <span className="font-medium">{noticia.source}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News */}
        {regularNews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Todas las Noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((noticia) => (
                <Card key={noticia.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(noticia.category)}>
                        {noticia.category}
                      </Badge>
                      {noticia.external && (
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary-700 transition-colors">
                      {noticia.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{noticia.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(noticia.date).toLocaleDateString('es-CO')}</span>
                      </div>
                      <span className="font-medium">{noticia.source}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron noticias con los criterios seleccionados.</p>
          </div>
        )}

        {/* Copy slot for additional news content */}
        <div className="mt-16">
          <CopySlot file="noticias.mdx" />
        </div>
      </Section>
    </>
  );
};

export default Noticias;