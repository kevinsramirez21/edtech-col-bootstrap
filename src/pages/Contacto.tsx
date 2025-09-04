import { Section, SectionHeader } from "@/components/ui/section";
import { CopySlot } from "@/components/content/copy-slot";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contacto = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs 
          items={[
            { label: "Contacto" }
          ]} 
        />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Contáctanos"
          subtitle="Estamos aquí para ayudarte"
          description="¿Tienes preguntas o quieres colaborar? Nos encantaría escucharte"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" type="text" placeholder="Tu nombre" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div>
                <Label htmlFor="organizacion">Organización</Label>
                <Input id="organizacion" type="text" placeholder="Tu organización" />
              </div>
              <div>
                <Label htmlFor="asunto">Asunto</Label>
                <Input id="asunto" type="text" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div>
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea 
                  id="mensaje" 
                  rows={6}
                  placeholder="Cuéntanos más detalles..." 
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Enviar mensaje
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">info@colombiaedtech.org</p>
                    <p className="text-gray-600">contacto@colombiaedtech.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Teléfono</h4>
                    <p className="text-gray-600">+57 (1) 234-5678</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Ubicación</h4>
                    <p className="text-gray-600">Bogotá, Colombia</p>
                    <p className="text-gray-600">Oficinas virtuales</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Horarios de atención</h4>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Zona horaria: GMT-5 (Bogotá)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy slot for additional contact info */}
            <CopySlot file="contacto.mdx" />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contacto;