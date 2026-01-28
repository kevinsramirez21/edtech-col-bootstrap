import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EventCard } from "@/components/ui/event-card";
import { EventFilters, EventFiltersState } from "@/components/ui/event-filters";
import { eventosLatam2026 } from "@/data/eventos-latam-2026";
import { Calendar, Globe2 } from "lucide-react";

const Eventos = () => {
  const [filters, setFilters] = useState<EventFiltersState>({
    pais: 'todos',
    modalidad: 'todos',
    mes: null,
  });

  const filteredEvents = useMemo(() => {
    return eventosLatam2026.filter(evento => {
      if (filters.pais !== 'todos' && evento.pais !== filters.pais) return false;
      if (filters.modalidad !== 'todos' && evento.modalidad !== filters.modalidad) return false;
      if (filters.mes !== null) {
        const eventMonth = new Date(evento.fechaInicio).getMonth() + 1;
        if (eventMonth !== filters.mes) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <>
      <Helmet>
        <title>Eventos EdTech LATAM 2026 - Colombia EdTech</title>
        <meta 
          name="description" 
          content="Calendario completo de eventos EdTech en Latinoamérica para 2026. Encuentra conferencias, summits y congresos en Colombia, Brasil, Chile, México, Argentina y Perú." 
        />
      </Helmet>

      <Section className="py-6 sm:py-8 bg-muted/30">
        <Breadcrumbs 
          items={[
            { label: "Eventos LATAM 2026" }
          ]} 
        />
      </Section>
      
      {/* Hero Section */}
      <Section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-primary-50 via-background to-primary-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-100 mb-6">
            <Globe2 className="w-8 h-8 sm:w-10 sm:h-10 text-primary-700" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Eventos EdTech LATAM 2026
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            El calendario más completo de eventos de tecnología educativa en Latinoamérica. 
            Encuentra conferencias, summits y congresos en toda la región.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50 text-sm">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span className="text-foreground font-medium">{eventosLatam2026.length} eventos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border/50 text-sm">
              <span>🇨🇴🇧🇷🇨🇱🇲🇽🇦🇷🇵🇪</span>
              <span className="text-foreground font-medium">6 países</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Filters and Events Grid */}
      <Section className="py-8 sm:py-12 lg:py-16">
        <EventFilters
          filters={filters}
          onFiltersChange={setFilters}
          resultCount={filteredEvents.length}
          totalCount={eventosLatam2026.length}
        />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron eventos
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los filtros para ver más resultados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredEvents.map((evento) => (
              <EventCard key={evento.id} evento={evento} />
            ))}
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section className="py-12 sm:py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            ¿Conoces un evento que no está en la lista?
          </h2>
          <p className="text-muted-foreground mb-6">
            Ayúdanos a mantener este calendario actualizado. Comparte información sobre eventos 
            EdTech en Latinoamérica.
          </p>
          <a
            href="mailto:kevin@colombiaedtech.org?subject=Sugerencia de evento EdTech LATAM"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sugerir un evento
          </a>
        </div>
      </Section>
    </>
  );
};

export default Eventos;
