import { useParams, Link } from "react-router-dom"
import { Section, SectionHeader } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, ArrowLeft, ExternalLink, Download } from "lucide-react";

const EventoDetail = () => {
  const { slug } = useParams()
  
  // This would normally fetch the event from an API or data source
  const evento = {
    title: "Colombia EdTech Summit 2024",
    description: "El evento más importante del ecosistema EdTech colombiano donde se reúnen líderes, innovadores y emprendedores para compartir conocimientos y crear conexiones valiosas.",
    date: "2024-05-15",
    time: "09:00 - 18:00",
    location: "Centro de Convenciones Ágora, Bogotá",
    address: "Calle 24 # 38-47, Bogotá, Colombia",
    type: "Presencial",
    status: "upcoming",
    attendees: 500,
    price: "Gratis",
    organizer: "Colombia EdTech",
    agenda: [
      { time: "09:00 - 09:30", session: "Registro y networking", speaker: "" },
      { time: "09:30 - 10:15", session: "Keynote: El Futuro de la EdTech", speaker: "Dr. Ana María López" },
      { time: "10:15 - 11:00", session: "Panel: Políticas Públicas en EdTech", speaker: "Varios expertos" },
      { time: "11:00 - 11:15", session: "Coffee break", speaker: "" },
      { time: "11:15 - 12:00", session: "Startups Pitch Competition", speaker: "Emprendedores seleccionados" },
      { time: "12:00 - 13:00", session: "Almuerzo y networking", speaker: "" },
      { time: "13:00 - 14:30", session: "Workshops paralelos", speaker: "Facilitadores especializados" },
      { time: "14:30 - 15:15", session: "Casos de éxito internacionales", speaker: "Invitados internacionales" },
      { time: "15:15 - 16:00", session: "Mesa redonda: Futuro de la educación", speaker: "Panel de expertos" },
      { time: "16:00 - 18:00", session: "Networking y cierre", speaker: "" }
    ]
  }

  return (
    <>
      <Section className="py-8 bg-gray-50">
        <div className="flex items-center justify-between">
          <Breadcrumbs 
            items={[
              { label: "Eventos", href: "/eventos" },
              { label: evento.title }
            ]} 
          />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/eventos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a eventos
            </Link>
          </Button>
        </div>
      </Section>
      
      <Section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-green-100 text-green-800">Próximo</Badge>
                <Badge>Presencial</Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {evento.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {evento.description}
              </p>
            </header>

            {/* Agenda */}
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-2xl font-semibold">Agenda del Evento</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evento.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex-shrink-0 w-24 text-sm font-medium text-primary-700">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.session}</h4>
                        {item.speaker && (
                          <p className="text-sm text-gray-600 mt-1">{item.speaker}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Información Adicional</h3>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p>
                    El Colombia EdTech Summit 2024 es el encuentro anual más importante 
                    del ecosistema EdTech colombiano. Durante este evento podrás:
                  </p>
                  <ul>
                    <li>Conectar con líderes del sector educativo y tecnológico</li>
                    <li>Conocer las últimas tendencias en educación digital</li>
                    <li>Participar en workshops especializados</li>
                    <li>Presenciar pitches de startups innovadoras</li>
                    <li>Acceder a oportunidades de colaboración y alianzas</li>
                  </ul>
                  <p>
                    ¡No te pierdas esta oportunidad única de ser parte del futuro 
                    de la educación en Colombia!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info Card */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Detalles del Evento</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <p className="font-medium">Fecha</p>
                    <p className="text-sm text-gray-600">
                      {new Date(evento.date).toLocaleDateString('es-CO', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-sm text-gray-600">{evento.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-gray-600">{evento.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{evento.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary-700 mt-0.5" />
                  <div>
                    <p className="font-medium">Asistentes</p>
                    <p className="text-sm text-gray-600">{evento.attendees} esperados</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-2xl font-bold text-primary-700">{evento.price}</p>
                  <p className="text-sm text-gray-500">Registro requerido</p>
                </div>
              </CardContent>
            </Card>

            {/* Registration Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Button size="lg" className="w-full mb-3">
                  Registrarse Ahora
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-500 mb-4">
                  El registro es gratuito pero los cupos son limitados
                </p>
                
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar agenda (PDF)
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full">
                    Agregar al calendario
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Organizador</h3>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{evento.organizer}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Gremio que representa y fortalece el ecosistema EdTech colombiano
                </p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <Link to="/contacto">Contactar organizador</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
};

export default EventoDetail;