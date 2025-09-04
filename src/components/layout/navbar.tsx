import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ColombiaEdTechLogo } from "@/components/ui/placeholder-logo"

const navItems = [
  { name: "Somos", href: "/somos" },
  { name: "Asociados", href: "/asociados" },
  { name: "Aliados", href: "/aliados" },
  { name: "Voluntariado", href: "/voluntariado" },
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
              <ColombiaEdTechLogo 
                variant="text-only" 
                colorScheme="blue" 
                size="default"
                className="h-8 w-auto" 
              />
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

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center">
            {/* Removed CTA buttons as requested */}
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
            <div className="space-y-2">
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
          </div>
        )}
      </nav>
    </header>
  )
}