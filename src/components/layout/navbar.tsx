import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CTAButton } from "@/components/ui/cta-button"
import { ColombiaEdTechLogo } from "@/components/ui/placeholder-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Somos", href: "/somos" },
  { name: "Asociados", href: "/asociados" },
  { name: "Aliados", href: "/aliados" },
  { name: "Voluntariado", href: "/voluntariado" },
]

const ctaOptions = [
  { name: "Asociarme", href: "/asociados#form" },
  { name: "Proponer alianza", href: "/aliados#form" },
  { name: "Aplicar a voluntariado", href: "/voluntariado#form" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b"
      style={{ 
        borderColor: 'var(--border)',
        background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <nav className="container" aria-label="Navegación principal">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-900 hover:text-primary-700 transition-colors"
              aria-label="Colombia EdTech - Ir al inicio"
            >
              <ColombiaEdTechLogo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-700 focus:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 rounded px-2 py-1",
                  isActive(item.href)
                    ? "text-primary-900 border-b-2 border-primary-700"
                    : "text-gray-700"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="brand" className="group">
                  Ser parte
                  <ChevronDown className="ml-1 w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ctaOptions.map((option) => (
                  <DropdownMenuItem key={option.name} asChild>
                    <Link to={option.href} className="w-full">
                      {option.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-border/40 py-4"
          >
            <div className="space-y-2 pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-primary-700",
                    isActive(item.href)
                      ? "text-primary-900 bg-primary-700/10"
                      : "text-gray-700"
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-border/40 pt-4 space-y-2">
              <p className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                Ser parte
              </p>
              {ctaOptions.map((option) => (
                <Link
                  key={option.name}
                  to={option.href}
                  className="block px-3 py-2 rounded-md text-sm text-primary-700 hover:bg-primary-700/10 transition-colors focus:bg-primary-700/10 focus:outline-none focus:ring-2 focus:ring-primary-700"
                >
                  {option.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}