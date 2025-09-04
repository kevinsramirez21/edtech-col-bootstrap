import { useParams } from "react-router-dom"
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams()
  
  // This would normally fetch the post from an API or MDX file
  const post = {
    title: "El Futuro del EdTech en Colombia: Tendencias 2024",
    author: "Equipo Colombia EdTech",
    date: "2024-03-15",
    readTime: "5 min",
    tags: ["Tendencias", "2024", "Análisis"],
    content: `
      <p>El sector EdTech en Colombia está experimentando un crecimiento sin precedentes. 
      En este artículo exploramos las principales tendencias que definirán el panorama 
      educativo tecnológico en 2024.</p>
      
      <h2>Inteligencia Artificial en el Aula</h2>
      <p>La implementación de IA personalizada está transformando cómo los estudiantes 
      aprenden y cómo los docentes enseñan...</p>
      
      <h2>Realidad Virtual y Aumentada</h2>
      <p>Las experiencias inmersivas están creando nuevas posibilidades para la 
      educación práctica y experimental...</p>
      
      <h2>Microaprendizaje y Gamificación</h2>
      <p>El aprendizaje en pequeñas dosis combinado con elementos de juego está 
      mejorando la retención y engagement...</p>
    `
  }

  return (
    <>
      <Section className="py-8 bg-gray-50">
        <div className="flex items-center justify-between">
          <Breadcrumbs 
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title }
            ]} 
          />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
          </Button>
        </div>
      </Section>
      
      <Section className="py-16">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('es-CO')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Gremio Position Callout */}
          <Card className="mb-12 bg-primary-700/5 border-primary-700/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-primary-700 rounded-full mr-3"></span>
                Posición del Gremio
              </h3>
              <p className="text-gray-700">
                Como Colombia EdTech, consideramos fundamental que las políticas públicas 
                acompañen el desarrollo tecnológico en educación, garantizando acceso 
                equitativo y calidad educativa para todos los colombianos.
              </p>
            </CardContent>
          </Card>

          {/* Share and Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Compartir:</span>
              <Button variant="outline" size="sm">Twitter</Button>
              <Button variant="outline" size="sm">LinkedIn</Button>
              <Button variant="outline" size="sm">Facebook</Button>
            </div>
            
            <Button variant="ghost" asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ver más artículos
              </Link>
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
};

export default BlogPost;