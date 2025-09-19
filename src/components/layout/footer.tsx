import { Link } from "react-router-dom"
import { Mail, MapPin, Phone, Linkedin, Twitter, Instagram, Youtube } from "lucide-react"
import { ColombiaEdTechLogo } from "@/components/ui/placeholder-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { name: "Somos", href: "/somos" },
  { name: "Asociados", href: "/asociados" },
  { name: "Aliados", href: "/aliados" },
  { name: "Voluntariado", href: "/voluntariado" },
]

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent-brand rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side - Brand & Contact */}
          <div className="space-y-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 text-white mb-6">
                <ColombiaEdTechLogo className="h-10 w-auto text-white" />
              </Link>
              <p className="text-white text-lg max-w-md leading-relaxed font-medium">
                Fortaleciendo el ecosistema EdTech colombiano a través de la colaboración, 
                investigación y políticas públicas que transformen la educación.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white font-medium">info@colombiaedtech.org</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white font-medium">+57 (1) 234-5678</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white font-medium">Bogotá, Colombia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-accent-brand hover:text-white transition-colors duration-300 hover:scale-110 transform"
                  aria-label={`Seguir en ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Navigation & Newsletter */}
          <div className="space-y-12">
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                Navegación
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sand hover:text-white transition-colors duration-300 text-lg font-medium hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="bg-primary-700/30 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-3">
                Mantente conectado
              </h3>
              <p className="text-white/90 text-lg mb-6 leading-relaxed">
                Únete a +500 líderes EdTech que reciben nuestras actualizaciones
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 bg-white border-0 text-primary-900 placeholder:text-primary-900/60 focus:ring-2 focus:ring-accent-brand h-12 text-lg rounded-xl"
                  aria-label="Dirección de correo electrónico"
                />
                <Button 
                  className="bg-accent-brand hover:bg-accent-brand/90 text-white font-bold px-8 py-3 h-12 rounded-xl text-lg whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Suscribirse
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <p className="text-sand text-sm font-medium">
              © {new Date().getFullYear()} Colombia EdTech. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/legal" className="text-sand hover:text-white transition-colors text-sm">
                Términos y Condiciones
              </Link>
              <Link to="/legal" className="text-sand hover:text-white transition-colors text-sm">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}