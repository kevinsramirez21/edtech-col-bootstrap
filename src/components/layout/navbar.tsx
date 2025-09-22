import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Users, LogIn, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { UserMenu } from "@/components/ui/user-menu"
import { useAuth } from "@/hooks/use-auth"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Somos", href: "/somos" },
  { 
    name: "Asociados", 
    isDropdown: true,
    items: [
      { name: "Conoce los Beneficios", href: "/asociados/beneficios" },
      { name: "Conoce los Asociados", href: "/asociados" },
    ]
  },
  { name: "Aliados", href: "/aliados" },
  { 
    name: "Mundo Edtech", 
    isDropdown: true,
    items: [
      { name: "Panorama", href: "/mundo-edtech/panorama" },
      { name: "Eventos", href: "/eventos" },
      { name: "Noticias", href: "/mundo-edtech/noticias" },
    ]
  },
  { name: "Voluntariado", href: "/voluntariado" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const location = useLocation()
  const { user, loading } = useAuth()

  const isActive = (href: string) => location.pathname === href

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-300/20 shadow-lg shadow-primary-900/5">
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegación principal">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Premium */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-all duration-300"
              aria-label="Colombia EdTech - Ir al inicio"
            >
              <div className="relative">
                {/* Desktop Logo */}
                <div className="hidden sm:block">
                  <OptimizedImage
                    src="/images/logo-colombia-edtech-blue.png"
                    alt="Colombia EdTech - Asociación de Organizaciones EdTech"
                    fallback="/placeholder.svg"
                    className="h-16 w-auto transition-all duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                
                {/* Mobile Logo */}
                <div className="block sm:hidden">
                  <OptimizedImage
                    src="/images/isotipo-blue.png"
                    alt="Colombia EdTech"
                    fallback="/placeholder.svg"
                    className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-accent-brand opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Premium Layout */}
          <div className="hidden lg:flex lg:items-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.isDropdown ? (
                      <>
                        <NavigationMenuTrigger className={cn(
                          "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group bg-transparent",
                          "text-primary-900 hover:text-primary-700 hover:bg-primary-700/5"
                        )}>
                          <span className="flex items-center space-x-1">
                            <span>{item.name}</span>
                            <ChevronDown className="w-3 h-3" />
                          </span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px] bg-white/95 backdrop-blur-md border border-gray-300/20 shadow-lg rounded-lg p-2">
                          <div className="space-y-1">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                key={subItem.name}
                                asChild
                              >
                                <Link
                                  to={subItem.href}
                                  className={cn(
                                    "block px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                                    "text-primary-900 hover:text-primary-700 hover:bg-primary-700/10"
                                  )}
                                >
                                  {subItem.name}
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group",
                            isActive(item.href)
                              ? "text-primary-900 bg-gradient-to-r from-primary-700/10 to-accent-brand/10 shadow-sm"
                              : "text-primary-900 hover:text-primary-700 hover:bg-primary-700/5"
                          )}
                          aria-current={isActive(item.href) ? "page" : undefined}
                        >
                          <span className="relative z-10">{item.name}</span>
                          {isActive(item.href) && (
                            <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary-700 to-accent-brand rounded-full"></div>
                          )}
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-700/0 to-accent-brand/0 group-hover:from-primary-700/5 group-hover:to-accent-brand/5 transition-all duration-300"></div>
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Auth/User Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {!loading && (
              user ? (
                <UserMenu />
              ) : (
                <>
                  <Button 
                    asChild
                    variant="outline"
                    className="border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <Link to="/auth" className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Iniciar Sesión</span>
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-primary-700 to-primary-900 hover:from-primary-900 hover:to-primary-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg shadow-primary-700/25 hover:shadow-xl hover:shadow-primary-700/40 transition-all duration-300 hover:scale-105"
                  >
                    <Link to="/asociados" className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Únete al Gremio</span>
                    </Link>
                  </Button>
                </>
              )
            )}
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

        {/* Mobile Navigation Premium */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-gray-300/20 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.isDropdown ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-base font-semibold text-primary-900 border-b border-gray-300/20">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                              isActive(subItem.href)
                                ? "text-primary-900 bg-gradient-to-r from-primary-700/15 to-accent-brand/15 shadow-sm"
                                : "text-primary-800 hover:text-primary-700 hover:bg-primary-700/10"
                            )}
                            aria-current={isActive(subItem.href) ? "page" : undefined}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300",
                        isActive(item.href)
                          ? "text-primary-900 bg-gradient-to-r from-primary-700/15 to-accent-brand/15 shadow-sm"
                          : "text-primary-900 hover:text-primary-700 hover:bg-primary-700/10"
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-300/20">
                {!loading && (
                  user ? (
                    <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                      <UserMenu />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary-900">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white font-semibold py-3 rounded-lg"
                      >
                        <Link to="/auth" className="flex items-center justify-center space-x-2">
                          <LogIn className="w-4 h-4" />
                          <span>Iniciar Sesión</span>
                        </Link>
                      </Button>
                      <Button 
                        asChild
                        className="w-full bg-gradient-to-r from-primary-700 to-primary-900 text-white font-semibold py-3 rounded-lg shadow-lg shadow-primary-700/25"
                      >
                        <Link to="/asociados" className="flex items-center justify-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Únete al Gremio</span>
                        </Link>
                      </Button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}