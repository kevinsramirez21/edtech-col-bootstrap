import * as React from "react"
import { Link } from "react-router-dom"
import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";

// Seed data for events
const eventos = [
  {
    slug: "edtech-summit-2024",
    title: "Colombia EdTech Summit 2024",
    description: "El evento más importante del ecosistema EdTech colombiano",
    date: "2024-05-15",
    time: "09:00 - 18:00",
    location: "Centro de Convenciones Ágora, Bogotá",
    type: "Presencial",
    status: "upcoming",
    attendees: 500,
    image: "summit-2024.jpg"
  },
  {
    slug: "webinar-ia-educacion",
    title: "Webinar: IA en la Educación - Oportunidades y Desafíos",
    description: "Exploramos el potencial de la inteligencia artificial en el sector educativo",
    date: "2024-04-20",
    time: "15:00 - 16:30",
    location: "Virtual",
    type: "Virtual",
    status: "upcoming",
    attendees: 200,
    image: "webinar-ia.jpg"
  },
  {
    slug: "demo-day-startups-edtech",
    title: "Demo Day: Startups EdTech Colombianas",
    description: "Presentación de las startups más prometedoras del ecosistema nacional",
    date: "2024-03-25",
    time: "14:00 - 17:00",
    location: "RutaN, Medellín",
    type: "Híbrido",
    status: "past",
    attendees: 150,
    image: "demo-day.jpg"
  }
];

const Eventos = () => {
  const upcomingEvents = eventos.filter(evento => evento.status === "upcoming")
  const pastEvents = eventos.filter(evento => evento.status === "past")

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "upcoming":
        return <Badge className="bg-green-100 text-green-800">Próximo</Badge>
      case "past":
        return <Badge variant="secondary">Realizado</Badge>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      "Presencial": "default",
      "Virtual": "secondary", 
      "Híbrido": "outline"
    }
    return <Badge variant={variants[type as keyof typeof variants] as any}>{type}</Badge>
  }

  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Eventos" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Eventos"
          subtitle="Nuestros encuentros"
          description="Conecta, aprende y colabora en los eventos del ecosistema EdTech colombiano"
        />
        
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Próximos Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((evento) => (
                <Card key={evento.slug} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        {getStatusBadge(evento.status)}
                        {getTypeBadge(evento.type)}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary-700 transition-colors">
                      {evento.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{evento.description}</p>
                    
                    <div className="space-y-3 text-sm text-gray-600 mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary-700" />
                        <span>{new Date(evento.date).toLocaleDateString('es-CO')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary-700" />
                        <span>{evento.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary-700" />
                        <span>{evento.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-primary-700" />
                        <span>{evento.attendees} asistentes esperados</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="flex-1">
                        <Link to={`/eventos/${evento.slug}`}>
                          Ver detalles
                        </Link>
                      </Button>
                      <Button variant="cta" className="flex-1">
                        Registrarse
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Eventos Pasados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((evento) => (
                <Card key={evento.slug} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        {getStatusBadge(evento.status)}
                        {getTypeBadge(evento.type)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary-700 transition-colors">
                      {evento.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{evento.description}</p>
                    
                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(evento.date).toLocaleDateString('es-CO')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3" />
                        <span>{evento.attendees} asistentes</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to={`/eventos/${evento.slug}`}>
                        Ver resumen
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Copy slot for additional events content */}
        <div className="mt-16">
          <CopySlot file="eventos.mdx" />
        </div>
      </Section>
    </>
  );
};

export default Eventos;