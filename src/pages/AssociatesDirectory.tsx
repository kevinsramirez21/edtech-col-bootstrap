import { Helmet } from "react-helmet-async"
import { useState, useEffect, useMemo } from "react"
import { Users, Building2, Loader2, Settings, ChevronDown, ChevronUp, X, Filter, Search } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { AssociateCard } from "@/components/ui/associate-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAdmin } from "@/hooks/use-admin"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface Associate {
  id: string
  nombre_empresa: string
  descripcion?: string
  pagina_web?: string
  segmento?: string
  servicios?: string[]
  correo_contacto?: string
  logo_url?: string
  ubicacion?: string
  tamano_empresa?: string
  linkedin?: string
  twitter?: string
  fecha_ingreso?: string
  calificacion_colombia_edtech?: number
  tipo_organizacion?: string
}

interface FiltersState {
  search: string
  tiposOrganizacion: string[]
}

const ORGANIZATION_TYPES = [
  "K12 (Colegios)",
  "Educación Superior",
  "Educación para la Vida",
  "Cajas de Compensación",
  "Universidades"
]

export default function AssociatesDirectory() {
  const [associates, setAssociates] = useState<Associate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>('name-asc')
  const [tiposExpanded, setTiposExpanded] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { isAdmin } = useAdmin()
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    tiposOrganizacion: []
  })

  // Fetch associates from Supabase using secure RPC function
  useEffect(() => {
    const fetchAssociates = async () => {
      try {
        setLoading(true)
        // Use the secure RPC function that only exposes public-safe fields
        // This excludes sensitive data like telefono, nombre_contacto, cargo_contacto
        const { data, error } = await supabase
          .rpc('get_public_associate_fields')
          .order('nombre_empresa', { ascending: true })

        if (error) throw error
        setAssociates(data || [])
      } catch (err) {
        console.error('Error fetching associates:', err)
        setError('Error al cargar los asociados')
      } finally {
        setLoading(false)
      }
    }

    fetchAssociates()
  }, [])

  // Parse tipo_organizacion which can be a JSON array string or a single value
  const parseOrganizationTypes = (tipoOrg: string | undefined): string[] => {
    if (!tipoOrg) return []
    try {
      const parsed = JSON.parse(tipoOrg)
      return Array.isArray(parsed) ? parsed : [tipoOrg]
    } catch {
      return [tipoOrg]
    }
  }

  // Get counts for each organization type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    associates.forEach(associate => {
      const types = parseOrganizationTypes(associate.tipo_organizacion)
      types.forEach(type => {
        counts[type] = (counts[type] || 0) + 1
      })
    })
    return counts
  }, [associates])

  // Filter associates based on current filters
  const filteredAssociates = useMemo(() => {
    let filtered = associates.filter(associate => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesName = associate.nombre_empresa.toLowerCase().includes(searchTerm)
        const matchesDescription = associate.descripcion?.toLowerCase().includes(searchTerm)
        if (!matchesName && !matchesDescription) return false
      }

      // Organization type filter (multi-select)
      if (filters.tiposOrganizacion.length > 0) {
        const associateTypes = parseOrganizationTypes(associate.tipo_organizacion)
        const hasMatchingType = filters.tiposOrganizacion.some(type => 
          associateTypes.includes(type)
        )
        if (!hasMatchingType) return false
      }

      return true
    })

    // Sort filtered results
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.nombre_empresa.localeCompare(b.nombre_empresa))
        break
      case 'name-desc':
        filtered.sort((a, b) => b.nombre_empresa.localeCompare(a.nombre_empresa))
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.fecha_ingreso || '').getTime() - new Date(a.fecha_ingreso || '').getTime())
        break
      default:
        break
    }

    return filtered
  }, [associates, filters, sortBy])

  // Handle filter changes
  const handleTipoToggle = (tipo: string) => {
    setFilters(prev => ({
      ...prev,
      tiposOrganizacion: prev.tiposOrganizacion.includes(tipo)
        ? prev.tiposOrganizacion.filter(t => t !== tipo)
        : [...prev.tiposOrganizacion, tipo]
    }))
  }

  const resetFilters = () => {
    setFilters({
      search: "",
      tiposOrganizacion: []
    })
  }

  const hasActiveFilters = filters.search || filters.tiposOrganizacion.length > 0
  const totalAssociates = associates.length
  const activeFiltersCount = filters.tiposOrganizacion.length

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Conoce los Asociados - Colombia EdTech</title>
          <meta name="description" content="Descubre las empresas EdTech que forman parte de Colombia EdTech" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#0B47CE]" />
            <p className="text-primary-900/70">Cargando asociados...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Conoce los Asociados - Colombia EdTech</title>
          <meta name="description" content="Descubre las empresas EdTech que forman parte de Colombia EdTech" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-primary-700/50" />
            <p className="text-primary-900/70 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-[#0B47CE] hover:text-[#003889] font-medium"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </>
    )
  }

  // Filter section component for reuse
  const FilterSection = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-4">
      {/* Organization Type Filter */}
      <div className={isMobile ? "border-b pb-4" : ""}>
        <button
          onClick={() => setTiposExpanded(!tiposExpanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold text-primary-900">Tipo de Organización</h3>
          {tiposExpanded ? (
            <ChevronUp className="w-4 h-4 text-primary-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary-700" />
          )}
        </button>
        {tiposExpanded && (
          <div className="space-y-3">
            {ORGANIZATION_TYPES.map(tipo => (
              <div key={tipo} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`${isMobile ? 'mobile-' : ''}tipo-${tipo}`}
                    checked={filters.tiposOrganizacion.includes(tipo)}
                    onCheckedChange={() => handleTipoToggle(tipo)}
                  />
                  <Label 
                    htmlFor={`${isMobile ? 'mobile-' : ''}tipo-${tipo}`}
                    className="text-sm cursor-pointer text-primary-900/80"
                  >
                    {tipo}
                  </Label>
                </div>
                {typeCounts[tipo] ? (
                  <span className="text-xs text-primary-700/60">
                    ({typeCounts[tipo]})
                  </span>
                ) : (
                  <span className="text-xs text-primary-700/40">(0)</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Conoce los Asociados - Colombia EdTech</title>
        <meta name="description" content="Descubre las empresas EdTech que forman parte de Colombia EdTech y conecta con líderes en tecnología educativa en Colombia" />
        <meta name="keywords" content="EdTech Colombia, asociados, empresas educación, tecnología educativa" />
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Directorio de Asociados
                </h1>
                <Badge className="bg-[#F73C5C] hover:bg-[#F73C5C] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 animate-pulse">
                  BETA
                </Badge>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-3 sm:mb-4 md:mb-6">
                Explora las empresas EdTech que están transformando la educación en Colombia
              </p>
              {isAdmin && (
                <Button 
                  asChild
                  size="sm"
                  className="bg-white text-[#0B47CE] hover:bg-white/90 font-semibold text-xs sm:text-sm"
                >
                  <Link to="/admin" className="flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Panel de Administración
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-3 sm:mb-4">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrar por tipo
                  </span>
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtrar por tipo
                  </span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="bg-[#0B47CE] text-white">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <span>Filtros</span>
                    {hasActiveFilters && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          resetFilters()
                          setMobileFiltersOpen(false)
                        }}
                        className="text-[#F73C5C] hover:text-[#F73C5C]/90 hover:bg-[#F73C5C]/10"
                      >
                        Limpiar todo
                      </Button>
                    )}
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6">
                  <FilterSection isMobile />
                </div>

                <div className="mt-6 pt-4 border-t">
                  <Button 
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-[#0B47CE] hover:bg-[#003889]"
                  >
                    Ver {filteredAssociates.length} resultados
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-6 lg:gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="w-72 xl:w-80 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Filters Header */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary-900">Filtros</h2>
                    {hasActiveFilters && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={resetFilters}
                        className="text-[#F73C5C] hover:text-[#F73C5C]/90 hover:bg-[#F73C5C]/10"
                      >
                        Limpiar todo
                      </Button>
                    )}
                  </div>

                  <FilterSection />
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#0B47CE]/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-[#0B47CE]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary-900">{totalAssociates}</p>
                      <p className="text-sm text-primary-900/60">Asociados activos</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Search and Sort Bar */}
              <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar por nombre..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                  
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px] text-sm">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                      <SelectItem value="recent">Más recientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    {filters.search && (
                      <Badge variant="secondary" className="gap-1 bg-gray-100 text-xs">
                        Búsqueda: "{filters.search}"
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, search: "" }))}
                          className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {filters.tiposOrganizacion.map(tipo => (
                      <Badge key={tipo} variant="secondary" className="gap-1 bg-[#0B47CE]/10 text-[#0B47CE] text-xs">
                        {tipo}
                        <button
                          onClick={() => handleTipoToggle(tipo)}
                          className="ml-1 hover:bg-[#0B47CE]/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-primary-900/60">
                  Mostrando <span className="font-semibold text-primary-900">{filteredAssociates.length}</span> de {totalAssociates} asociados
                </p>
              </div>

              {/* Results Grid */}
              {filteredAssociates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {filteredAssociates.map((associate) => (
                    <AssociateCard
                      key={associate.id}
                      associate={{
                        id: associate.id,
                        nombre_empresa: associate.nombre_empresa,
                        descripcion: associate.descripcion,
                        logo_url: associate.logo_url,
                        segmento: associate.segmento,
                        ubicacion: associate.ubicacion,
                        pagina_web: associate.pagina_web,
                        linkedin: associate.linkedin,
                        twitter: associate.twitter,
                        servicios: associate.servicios,
                        tamano_empresa: associate.tamano_empresa,
                        calificacion_colombia_edtech: associate.calificacion_colombia_edtech,
                        correo_contacto: associate.correo_contacto,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 sm:py-12 lg:py-16 bg-white rounded-lg border px-4">
                  <Building2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-primary-700/30" />
                  <h3 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">
                    No se encontraron asociados
                  </h3>
                  <p className="text-sm sm:text-base text-primary-900/60 mb-4 sm:mb-6 max-w-md mx-auto">
                    No hay asociados que coincidan con los filtros seleccionados. 
                    Intenta ajustar tus criterios de búsqueda.
                  </p>
                  <Button onClick={resetFilters} variant="outline" size="sm">
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
