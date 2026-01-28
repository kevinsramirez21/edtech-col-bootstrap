import { Calendar, MapPin, ExternalLink, Info } from "lucide-react";
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
  'Confirmado': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Tentativo': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  'Por confirmar': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const modalidadStyles = {
  'Presencial': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Virtual': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Híbrido': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
};

export function EventCard({ evento }: EventCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-border/50">
      <CardContent className="p-4 sm:p-5 flex flex-col h-full">
        {/* Header with date and badges */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{evento.fechaDisplay}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge className={cn("text-xs font-medium", estadoStyles[evento.estado])}>
              {evento.estado}
            </Badge>
            <Badge className={cn("text-xs font-medium", modalidadStyles[evento.modalidad])}>
              {evento.modalidad}
            </Badge>
          </div>
        </div>

        {/* Event name */}
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-tight">
          {evento.nombre}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>
            {getCountryEmoji(evento.pais)} {evento.ciudad}, {evento.pais}
          </span>
        </div>

        {/* Notes if present */}
        {evento.notas && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 mb-3 cursor-help">
                  <Info className="w-3.5 h-3.5" />
                  <span className="truncate">{evento.notas}</span>
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
            variant="outline"
            size="sm"
            className="w-full mt-3"
            asChild
          >
            <a href={evento.enlace} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver evento
            </a>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 opacity-50 cursor-not-allowed"
            disabled
          >
            Enlace no disponible
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
