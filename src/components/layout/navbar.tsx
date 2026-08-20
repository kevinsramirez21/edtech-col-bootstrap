import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Users, LogIn, ChevronDown, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  {
    name: "Nuestra Postura",
    isDropdown: true,
    items: [
      { name: "Acuerdo por la Educación", href: "/nuestra-postura/acuerdo-educacion" },
    ]
  },
  { name: "Somos", href: "/somos" },
  { 
    name: "Mundo Edtech", 
    isDropdown: true,
    items: [
      { name: "Panorama", href: "/mundo-edtech/panorama" },
      { name: "Eventos", href: "/eventos" },
      { name: "Noticias", href: "/mundo-edtech/noticias" },
      { name: "Asociados", href: "/asociados" },
      { name: "Directorio", href: "/asociados/directorio" },
      { name: "Aliados", href: "/aliados" },
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
      "sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300 safe-top",
      isScrolled 
        ? "bg-accent border-accent/30 shadow-xl shadow-accent/20" 
        : "bg-accent border-accent/20 shadow-lg shadow-accent/10"
    )}>
      <nav className={cn(
        "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300",
        isScrolled ? "h-16" : "h-16 sm:h-20"
      )} aria-label="Navegación principal">
        <div className="flex h-full items-center justify-between gap-2 min-w-0">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0 group"
            aria-label="Colombia EdTech - Ir al inicio"
          >
            <img
              src="/images/isotipo-azul-transparent.png"
              alt="Colombia EdTech"
              className={cn(
                "w-auto object-contain transition-all duration-300 group-hover:scale-105",
                isScrolled ? "h-12 sm:h-14" : "h-14 sm:h-16"
              )}
            />
          </Link>

          {/* Desktop Navigation - Premium Layout */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="flex items-center">
                {item.isDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "h-10 px-4 text-sm font-semibold rounded-lg transition-all duration-300 group",
                          "text-white hover:text-white/90 hover:bg-white/10"
                        )}
                      >
                        <span className="flex items-center space-x-1">
                          <span>{item.name}</span>
                          <ChevronDown className="w-3 h-3" />
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[200px] bg-popover border border-border shadow-lg rounded-lg z-50">
                      {item.items?.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.href}
                            className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
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
                      "flex items-center h-10 px-4 text-sm font-semibold rounded-lg transition-all duration-300 group",
                      isActive(item.href)
                        ? "text-white bg-white/20 shadow-sm"
                        : "text-white hover:text-white/90 hover:bg-white/10"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth/User Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2 flex-shrink-0">
            {!loading && (
              user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Button 
                      asChild
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md hover:shadow-lg transition-all duration-300 border-0"
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
                    size="sm"
                    className="border-2 border-white/90 bg-white/10 text-white hover:bg-white hover:text-accent font-semibold px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <Link to="/auth" className="flex items-center space-x-1.5">
                      <LogIn className="w-4 h-4" />
                      <span>Iniciar Sesión</span>
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    size="sm"
                    className="bg-white text-accent hover:bg-white/90 font-bold px-3 py-2 rounded-lg shadow-lg shadow-black/30 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Link to="/asociados" className="flex items-center space-x-1.5">
                      <Users className="w-4 h-4" />
                      <span className="hidden xl:inline">Únete al Gremio</span>
                      <span className="xl:hidden">Únete</span>
                    </Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Tablet/Mobile Auth/User Menu */}
          <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
            {!loading && (
              user ? (
                <UserMenu />
              ) : (
                <Button 
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-2 border-white/90 bg-white/10 text-white hover:bg-white hover:text-accent font-semibold px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <Link to="/auth" className="flex items-center space-x-1.5">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Iniciar Sesión</span>
                  </Link>
                </Button>
              )
            )}
          </div>


          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden text-white hover:bg-white/10 min-w-[44px] min-h-[44px]"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Premium */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-white/20 bg-accent backdrop-blur-md"
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
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 rounded-lg shadow-md border-0"
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
                    <Button 
                      asChild
                      className="w-full bg-white text-accent hover:bg-white/90 font-semibold py-3 rounded-lg shadow-lg shadow-black/25"
                    >
                      <Link to="/asociados" className="flex items-center justify-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Únete al Gremio</span>
                      </Link>
                    </Button>
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