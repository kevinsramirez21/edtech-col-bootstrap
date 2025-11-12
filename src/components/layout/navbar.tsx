import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Users, LogIn, ChevronDown, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { UserMenu } from "@/components/ui/user-menu"
import { useAuth } from "@/hooks/use-auth"
import { useAdmin } from "@/hooks/use-admin"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Somos", href: "/somos" },
  { 
    name: "Asociados", 
    isDropdown: true,
    items: [
      { name: "Conoce los Beneficios", href: "/asociados" },
      { name: "Conoce los Asociados", href: "/asociados/directorio" },
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
  const [isScrolled, setIsScrolled] = React.useState(false)
  const location = useLocation()
  const { user, loading } = useAuth()
  const { isAdmin } = useAdmin()

  const isActive = (href: string) => location.pathname === href

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300",
      isScrolled 
        ? "bg-[#F73C5C] border-[#F73C5C]/30 shadow-xl shadow-[#F73C5C]/20 h-16" 
        : "bg-[#F73C5C] border-[#F73C5C]/20 shadow-lg shadow-[#F73C5C]/10 h-20"
    )}>
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full" aria-label="Navegación principal">
        <div className="flex h-full items-center justify-between">
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
                    src="/images/logo-horizontal-beige-pg.png"
                    alt="Colombia EdTech - Asociación de Organizaciones EdTech"
                    fallback="/placeholder.svg"
                    className={cn(
                      "w-auto transition-all duration-300 group-hover:scale-105",
                      isScrolled ? "h-12" : "h-16"
                    )}
                    priority
                  />
                </div>
                
                {/* Mobile Logo */}
                <div className="block sm:hidden">
                  <OptimizedImage
                    src="/images/isotipo-red-bg.png"
                    alt="Colombia EdTech"
                    fallback="/placeholder.svg"
                    className={cn(
                      "w-auto transition-all duration-300 group-hover:scale-105",
                      isScrolled ? "h-8" : "h-10"
                    )}
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Premium Layout */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.isDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group",
                          "text-white hover:text-white/90 hover:bg-white/10"
                        )}
                      >
                        <span className="flex items-center space-x-1">
                          <span>{item.name}</span>
                          <ChevronDown className="w-3 h-3" />
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[200px] bg-white border border-gray-200 shadow-lg rounded-lg">
                      {item.items?.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.href}
                            className="block px-3 py-2 text-sm font-medium text-primary-900 hover:text-primary-700 hover:bg-primary-700/10 cursor-pointer"
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 group",
                      isActive(item.href)
                        ? "text-white bg-white/20 shadow-sm"
                        : "text-white hover:text-white/90 hover:bg-white/10"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive(item.href) && (
                      <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full"></div>
                    )}
                    <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth/User Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {!loading && (
              user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Button 
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#F73C5C] font-semibold"
                    >
                      <Link to="/admin" className="flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Admin</span>
                      </Link>
                    </Button>
                  )}
                  <UserMenu />
                </div>
              ) : (
                <>
                  <Button 
                    asChild
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#F73C5C] font-semibold px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <Link to="/auth" className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Iniciar Sesión</span>
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    className="bg-white text-[#F73C5C] hover:bg-white/90 font-semibold px-6 py-2 rounded-lg shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:scale-105"
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
              className="text-white hover:bg-white/10"
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
            className="lg:hidden border-t border-white/20 bg-[#F73C5C] backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.isDropdown ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 text-base font-semibold text-white border-b border-white/20">
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
                                ? "text-white bg-white/20 shadow-sm"
                                : "text-white/90 hover:text-white hover:bg-white/10"
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
                          ? "text-white bg-white/20 shadow-sm"
                          : "text-white hover:text-white/90 hover:bg-white/10"
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-white/20">
                {!loading && (
                  user ? (
                    <div className="space-y-3">
                      {isAdmin && (
                        <Button 
                          asChild
                          size="sm"
                          variant="outline"
                          className="w-full border-white text-white hover:bg-white hover:text-[#F73C5C] font-semibold py-3 rounded-lg"
                        >
                          <Link to="/admin" className="flex items-center justify-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Panel Admin</span>
                          </Link>
                        </Button>
                      )}
                      <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <UserMenu />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-white text-white hover:bg-white hover:text-[#F73C5C] font-semibold py-3 rounded-lg"
                      >
                        <Link to="/auth" className="flex items-center justify-center space-x-2">
                          <LogIn className="w-4 h-4" />
                          <span>Iniciar Sesión</span>
                        </Link>
                      </Button>
                      <Button 
                        asChild
                        className="w-full bg-white text-[#F73C5C] hover:bg-white/90 font-semibold py-3 rounded-lg shadow-lg shadow-black/25"
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