import * as React from "react"
import { Link } from "react-router-dom"
import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

// Seed data for blog posts
const blogPosts = [
  {
    slug: "futuro-edtech-colombia-2024",
    title: "El Futuro del EdTech en Colombia: Tendencias 2024",
    excerpt: "Analizamos las principales tendencias que marcarán el desarrollo del sector EdTech colombiano en 2024.",
    author: "Equipo Colombia EdTech",
    date: "2024-03-15",
    tags: ["Tendencias", "2024", "Análisis"],
    readTime: "5 min"
  },
  {
    slug: "politicas-publicas-educacion-digital",
    title: "Políticas Públicas para la Educación Digital",
    excerpt: "Revisión de las políticas públicas necesarias para impulsar la transformación digital educativa.",
    author: "Dr. María González",
    date: "2024-03-10",
    tags: ["Política Pública", "Gobierno", "Digital"],
    readTime: "8 min"
  },
  {
    slug: "casos-exito-startups-edtech",
    title: "Casos de Éxito: Startups EdTech Colombianas",
    excerpt: "Conoce las historias inspiradoras de startups EdTech que están transformando la educación.",
    author: "Carlos Rodríguez",
    date: "2024-03-05",
    tags: ["Startups", "Casos de Éxito", "Innovación"],
    readTime: "6 min"
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Blog" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Blog"
          subtitle="Nuestras publicaciones"
          description="Contenido actualizado sobre EdTech, políticas públicas e innovación educativa"
        />
        
        {/* Search */}
        <div className="relative max-w-md mb-12">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary-700 transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('es-CO')}</span>
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary-700 hover:text-primary-900 font-medium transition-colors group"
                >
                  Leer más 
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron artículos con los criterios de búsqueda.</p>
          </div>
        )}

        {/* Copy slot for additional blog content */}
        <div className="mt-16">
          <CopySlot file="blog.mdx" />
        </div>
      </Section>
    </>
  );
};

export default Blog;