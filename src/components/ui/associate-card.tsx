import * as React from "react"
import { Link } from "react-router-dom"
import { Globe, Mail, MapPin, Building2, ExternalLink, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { cn } from "@/lib/utils"

interface Associate {
  id: string
  nombre_empresa: string
  descripcion?: string
  pagina_web?: string
  segmento?: string
  servicios?: string[]
  correo_contacto?: string
  logo_url?: string
  ubicacion?: string
  tamano_empresa?: string
  tipo_membresia?: string
  calificacion_colombia_edtech?: number
}

interface AssociateCardProps {
  associate: Associate
  className?: string
}

const segmentLabels: Record<string, string> = {
  educacion_basica: "Educación Básica",
  educacion_superior: "Educación Superior", 
  capacitacion_empresarial: "Capacitación Empresarial",
  educacion_continua: "Educación Continua",
  edtech_tools: "Herramientas EdTech",
  infrastructure: "Infraestructura",
  other: "Otros"
}

const sizeLabels: Record<string, string> = {
  startup: "Startup",
  pequena: "Pequeña",
  mediana: "Mediana", 
  grande: "Grande"
}

export function AssociateCard({ associate, className }: AssociateCardProps) {
  const renderStars = (rating?: number) => {
    if (!rating) return null
    
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "w-4 h-4",
                star <= rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
          <span className="text-xs font-semibold text-gray-700 ml-1">{rating}/5</span>
        </div>
        <p className="text-xs text-primary-700 font-medium">
          Calidad Certificada Colombia EdTech
        </p>
      </div>
    )
  }

  return (
    <Card className={cn("group h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-700/10 hover:-translate-y-1", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {associate.logo_url ? (
            <OptimizedImage
              src={associate.logo_url}
              alt={`Logo de ${associate.nombre_empresa}`}
              fallback="/placeholder.svg"
              className="w-16 h-16 rounded-lg object-contain bg-gray-50 p-2"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary-700" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-primary-900 group-hover:text-primary-700 transition-colors line-clamp-2">
              {associate.nombre_empresa}
            </CardTitle>
            {associate.calificacion_colombia_edtech && (
              <div className="mt-2 mb-2">
                {renderStars(associate.calificacion_colombia_edtech)}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {associate.segmento && (
                <Badge variant="secondary" className="text-xs">
                  {segmentLabels[associate.segmento] || associate.segmento}
                </Badge>
              )}
              {associate.tamano_empresa && (
                <Badge variant="outline" className="text-xs">
                  {sizeLabels[associate.tamano_empresa] || associate.tamano_empresa}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {associate.descripcion && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {associate.descripcion}
          </p>
        )}

        {associate.servicios && associate.servicios.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Servicios
            </p>
            <div className="flex flex-wrap gap-1">
              {associate.servicios.slice(0, 4).map((servicio, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100"
                >
                  {servicio}
                </Badge>
              ))}
              {associate.servicios.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{associate.servicios.length - 4} más
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600">
          {associate.ubicacion && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="truncate">{associate.ubicacion}</span>
            </div>
          )}
          
          {associate.correo_contacto && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <a 
                href={`mailto:${associate.correo_contacto}`}
                className="truncate hover:text-primary-700 transition-colors"
              >
                {associate.correo_contacto}
              </a>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {associate.pagina_web && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              asChild
            >
              <a 
                href={associate.pagina_web} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Sitio Web</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
          
          {associate.correo_contacto && (
            <Button 
              size="sm" 
              className="bg-primary-700 hover:bg-primary-800"
              asChild
            >
              <a 
                href={`mailto:${associate.correo_contacto}`}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contactar</span>
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}