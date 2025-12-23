import { Link } from "react-router-dom"
import { Mail, MapPin, Linkedin, Instagram } from "lucide-react"
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
  { name: "Directorio", href: "/asociados/directorio" },
  { name: "Aliados", href: "/aliados" },
  { name: "Voluntariado", href: "/voluntariado" },
  { name: "Eventos", href: "/eventos" },
  { name: "Noticias", href: "/mundo-edtech/noticias" },
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
    <footer className="bg-primary-900 dark:bg-background text-white dark:text-foreground relative overflow-hidden border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pie de página
      </h2>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent-brand rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10 lg:py-14 xl:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
          
          {/* Left Side - Brand & Contact */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <div>
              <Link to="/" className="inline-block mb-3 sm:mb-4">
                <img src={footerLogo} alt="Colombia EdTech" className="h-10 sm:h-12 w-auto" />
              </Link>
              <p className="text-white text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
                Fortaleciendo el ecosistema EdTech colombiano a través de la colaboración, 
                investigación y políticas públicas que transformen la educación.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent-brand flex-shrink-0" />
                <span className="text-white text-sm sm:text-base font-medium">kevin@colombiaedtech.org</span>
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
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            
            {/* Quick Links */}
            <div className="text-center lg:text-left">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                Navegación
              </h3>
              <nav aria-label="Enlaces del footer">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sand hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Newsletter Section */}
            <div className="bg-primary-700/30 dark:bg-muted rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-white/10 dark:border-border">
              <h3 className="text-base sm:text-lg font-bold text-white dark:text-foreground mb-2 text-center lg:text-left">
                Mantente conectado
              </h3>
              <p className="text-white/90 dark:text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed text-center lg:text-left">
                Únete a +500 líderes EdTech que reciben nuestras actualizaciones
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="tu@email.com"
                            className="bg-card dark:bg-input border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent h-9 sm:h-10 text-sm sm:text-base rounded-lg"
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
                    className="bg-accent-brand hover:bg-accent-brand/90 text-white font-bold px-4 sm:px-6 py-2 h-9 sm:h-10 rounded-lg text-sm sm:text-base whitespace-nowrap transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {form.formState.isSubmitting ? "Enviando..." : "Suscribirse"}
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 border-t border-white/20">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-3 text-center lg:text-left">
            <p className="text-sand text-xs font-medium">
              © {new Date().getFullYear()} Colombia EdTech. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-3 sm:space-x-5">
              <Link to="/legal" className="text-sand hover:text-white transition-colors text-xs">
                Términos y Condiciones
              </Link>
              <Link to="/legal" className="text-sand hover:text-white transition-colors text-xs">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}