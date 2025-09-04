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
    <footer className="bg-gray-900 text-gray-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-white mb-4">
              <ColombiaEdTechLogo className="h-8 w-auto text-white" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Fortaleciendo el ecosistema EdTech colombiano a través de la colaboración, 
              investigación y políticas públicas que transformen la educación.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-brand" />
                <span>info@colombiaedtech.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-brand" />
                <span>+57 (1) 234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent-brand" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-accent-brand rounded px-1 py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Mantente conectado
              </h3>
              <p className="text-gray-400 text-sm">
                Recibe las últimas noticias y actualizaciones del ecosistema EdTech colombiano.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-accent-brand"
                aria-label="Dirección de correo electrónico"
              />
              <Button variant="cta" className="whitespace-nowrap">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 lg:mb-0">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Colombia EdTech. Todos los derechos reservados.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors focus:text-white focus:outline-none focus:ring-2 focus:ring-accent-brand rounded p-1"
                  aria-label={`Seguir en ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}