import { Calendar, MapPin, ExternalLink, Info, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Evento, getCountryEmoji } from "@/data/eventos-latam-2026";

interface EventCardProps {
  evento: Evento;
}

const estadoStyles = {
  'Confirmado': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
  'Tentativo': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  'Por confirmar': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700',
};

const modalidadStyles = {
  'Presencial': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'Virtual': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'Híbrido': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800',
};

const paisColors: Record<string, string> = {
  'Colombia': 'from-yellow-500 via-blue-600 to-red-600',
  'Chile': 'from-blue-600 via-white to-red-600',
  'México': 'from-green-600 via-white to-red-600',
  'Brasil': 'from-green-500 via-yellow-400 to-blue-600',
  'Argentina': 'from-sky-400 via-white to-sky-400',
  'Perú': 'from-red-600 via-white to-red-600',
  'Virtual': 'from-purple-500 via-indigo-500 to-blue-500',
};

export function EventCard({ evento }: EventCardProps) {
  return (
    <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden bg-card">
      {/* Country accent bar */}
      <div className={cn(
        "h-1.5 w-full bg-gradient-to-r",
        paisColors[evento.pais] || 'from-primary to-primary'
      )} />
      
      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
        {/* Date badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 dark:bg-primary/10 rounded-lg">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{evento.fechaDisplay}</span>
          </div>
        </div>

        {/* Event name */}
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
          {evento.nombre}
        </h3>

        {/* Description - full text, no truncation */}
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {evento.descripcion}
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{getCountryEmoji(evento.pais)}</span>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-medium">{evento.ciudad}</span>
            <span className="text-muted-foreground/60">•</span>
            <span>{evento.pais}</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>{evento.organizador}</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={cn("text-xs font-medium border", estadoStyles[evento.estado])}>
            {evento.estado}
          </Badge>
          <Badge className={cn("text-xs font-medium border", modalidadStyles[evento.modalidad])}>
            {evento.modalidad}
          </Badge>
        </div>

        {/* Notes if present */}
        {evento.notas && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start gap-2 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 p-2.5 rounded-lg mb-3 cursor-help border border-amber-200 dark:border-amber-800/50">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{evento.notas}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{evento.notas}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Action button */}
        {evento.enlace ? (
          <Button
            variant="default"
            size="sm"
            className="w-full mt-auto group/btn"
            asChild
          >
            <a href={evento.enlace} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 transition-transform" />
              Ver evento oficial
            </a>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-auto opacity-60 cursor-not-allowed"
            disabled
          >
            Enlace por confirmar
          </Button>
        )}
      </CardContent>
    </Card>
  );
}