import { Link } from "react-router-dom"
import { Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react"
import footerLogo from "@/assets/isotipo-footer.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"

const quickLinks = [
  { name: "Inicio", href: "/" },
  { name: "Somos", href: "/somos" },
  { name: "Asociados", href: "/asociados" },
  { name: "Directorio", href: "/directorio" },
  { name: "Aliados", href: "/aliados" },
  { name: "Voluntariado", href: "/voluntariado" },
  { name: "Eventos", href: "/eventos" },
]

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/colombiaedtech", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/colombiaedtech", icon: Instagram },
]

const newsletterSchema = z.object({
  email: z.string().email("Por favor ingresa un email válido")
})

type NewsletterForm = z.infer<typeof newsletterSchema>

export function Footer() {
  const { toast } = useToast()
  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (data: NewsletterForm) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: data.email }])

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Ya estás suscrito",
            description: "Este email ya está registrado en nuestra newsletter.",
            variant: "destructive"
          })
        } else {
          throw error
        }
        return
      }

      toast({
        title: "¡Suscripción exitosa!",
        description: "Recibirás nuestras actualizaciones en tu email."
      })
      form.reset()
    } catch (error) {
      console.error("Error subscribing:", error)
      toast({
        title: "Error",
        description: "No se pudo completar la suscripción. Intenta de nuevo.",
        variant: "destructive"
      })
    }
  }
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
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 lg:py-16 xl:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          
          {/* Left Side - Brand & Contact */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div>
              <Link to="/" className="inline-block mb-4 sm:mb-6">
                <img src={footerLogo} alt="Colombia EdTech" className="h-12 sm:h-16 w-auto" />
              </Link>
              <p className="text-white text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Fortaleciendo el ecosistema EdTech colombiano a través de la colaboración, 
                investigación y políticas públicas que transformen la educación.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white text-sm sm:text-base font-medium">info@colombiaedtech.org</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white text-sm sm:text-base font-medium">+57 (1) 234-5678</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white text-sm sm:text-base font-medium">Bogotá, Colombia</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-5 sm:space-x-6 pt-2 sm:pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-accent-brand hover:text-white transition-colors duration-300 hover:scale-110 transform"
                  aria-label={`Seguir en ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Navigation & Newsletter */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            
            {/* Quick Links */}
            <div className="text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                Navegación
              </h3>
              <nav aria-label="Enlaces del footer">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sand hover:text-white transition-colors duration-300 text-base font-medium hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Newsletter Section */}
            <div className="bg-primary-700/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 text-center lg:text-left">
                Mantente conectado
              </h3>
              <p className="text-white/90 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed text-center lg:text-left">
                Únete a +500 líderes EdTech que reciben nuestras actualizaciones
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="tu@email.com"
                            className="bg-white border-0 text-primary-900 placeholder:text-primary-900/60 focus:ring-2 focus:ring-accent-brand h-10 sm:h-12 text-base sm:text-lg rounded-lg sm:rounded-xl"
                            aria-label="Dirección de correo electrónico"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="bg-accent-brand hover:bg-accent-brand/90 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 h-10 sm:h-12 rounded-lg sm:rounded-xl text-base sm:text-lg whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {form.formState.isSubmitting ? "Enviando..." : "Suscribirse"}
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-white/20">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 text-center lg:text-left">
            <p className="text-sand text-xs sm:text-sm font-medium">
              © {new Date().getFullYear()} Colombia EdTech. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link to="/legal" className="text-sand hover:text-white transition-colors text-xs sm:text-sm">
                Términos y Condiciones
              </Link>
              <Link to="/legal" className="text-sand hover:text-white transition-colors text-xs sm:text-sm">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}