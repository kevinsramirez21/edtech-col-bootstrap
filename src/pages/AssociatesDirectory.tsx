import { Helmet } from "react-helmet-async"
import { useState, useEffect, useMemo } from "react"
import { Users, Building2, Loader2, Settings, ChevronDown, ChevronUp, X } from "lucide-react"
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
  tipo_membresia?: string
  created_at: string
}

interface FiltersState {
  search: string
  segmentos: string[]
  tamanos: string[]
  servicios: string[]
}

const segmentOptions = [
  { value: "educacion_basica", label: "Educación Básica" },
  { value: "educacion_superior", label: "Educación Superior" },
  { value: "capacitacion_empresarial", label: "Capacitación Empresarial" },
  { value: "educacion_continua", label: "Educación Continua" },
  { value: "edtech_tools", label: "Herramientas EdTech" },
  { value: "infrastructure", label: "Infraestructura" },
  { value: "other", label: "Otros" }
]

const sizeOptions = [
  { value: "startup", label: "Startup" },
  { value: "pequena", label: "Pequeña" },
  { value: "mediana", label: "Mediana" },
  { value: "grande", label: "Grande" }
]

export default function AssociatesDirectory() {
  const [associates, setAssociates] = useState<Associate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>('name-asc')
  const [segmentosExpanded, setSegmentosExpanded] = useState(true)
  const [tamanosExpanded, setTamanosExpanded] = useState(true)
  const [serviciosExpanded, setServiciosExpanded] = useState(true)
  const { isAdmin } = useAdmin()
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    segmentos: [],
    tamanos: [],
    servicios: []
  })

  // Fetch associates from Supabase
  useEffect(() => {
    const fetchAssociates = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('asociados')
          .select('*')
          .eq('estado', 'activo')
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

  // Get all unique services for filtering
  const availableServices = useMemo(() => {
    const services = new Set<string>()
    associates.forEach(associate => {
      associate.servicios?.forEach(service => services.add(service))
    })
    return Array.from(services).sort()
  }, [associates])

  // Get counts for each filter option
  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    associates.forEach(associate => {
      if (associate.segmento) {
        counts[associate.segmento] = (counts[associate.segmento] || 0) + 1
      }
    })
    return counts
  }, [associates])

  const sizeCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    associates.forEach(associate => {
      if (associate.tamano_empresa) {
        counts[associate.tamano_empresa] = (counts[associate.tamano_empresa] || 0) + 1
      }
    })
    return counts
  }, [associates])

  const serviceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    associates.forEach(associate => {
      associate.servicios?.forEach(service => {
        counts[service] = (counts[service] || 0) + 1
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

      // Segment filter (multi-select)
      if (filters.segmentos.length > 0) {
        if (!associate.segmento || !filters.segmentos.includes(associate.segmento)) {
          return false
        }
      }

      // Size filter (multi-select)
      if (filters.tamanos.length > 0) {
        if (!associate.tamano_empresa || !filters.tamanos.includes(associate.tamano_empresa)) {
          return false
        }
      }

      // Services filter
      if (filters.servicios.length > 0) {
        const hasMatchingService = filters.servicios.some(service => 
          associate.servicios?.includes(service)
        )
        if (!hasMatchingService) return false
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
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      default:
        break
    }

    return filtered
  }, [associates, filters, sortBy])

  // Handle filter changes
  const handleSegmentoToggle = (segmento: string) => {
    setFilters(prev => ({
      ...prev,
      segmentos: prev.segmentos.includes(segmento)
        ? prev.segmentos.filter(s => s !== segmento)
        : [...prev.segmentos, segmento]
    }))
  }

  const handleTamanoToggle = (tamano: string) => {
    setFilters(prev => ({
      ...prev,
      tamanos: prev.tamanos.includes(tamano)
        ? prev.tamanos.filter(t => t !== tamano)
        : [...prev.tamanos, tamano]
    }))
  }

  const handleServicioToggle = (servicio: string) => {
    setFilters(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }))
  }

  const resetFilters = () => {
    setFilters({
      search: "",
      segmentos: [],
      tamanos: [],
      servicios: []
    })
  }

  const hasActiveFilters = filters.search || filters.segmentos.length > 0 || filters.tamanos.length > 0 || filters.servicios.length > 0
  const totalAssociates = associates.length

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
            <p className="text-gray-600">Cargando asociados...</p>
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
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">{error}</p>
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

  return (
    <>
      <Helmet>
        <title>Conoce los Asociados - Colombia EdTech</title>
        <meta name="description" content="Descubre las empresas EdTech que forman parte de Colombia EdTech y conecta con líderes en tecnología educativa en Colombia" />
        <meta name="keywords" content="EdTech Colombia, asociados, empresas educación, tecnología educativa" />
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white py-12">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Directorio de Asociados
              </h1>
              <p className="text-lg text-white/90 mb-6">
                Explora las empresas EdTech que están transformando la educación en Colombia
              </p>
              {isAdmin && (
                <Button 
                  asChild
                  size="sm"
                  className="bg-white text-[#0B47CE] hover:bg-white/90 font-semibold"
                >
                  <Link to="/admin" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Panel de Administración
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="w-80 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Filters Header */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
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

                  {/* Segmentos Filter */}
                  <div className="border-t pt-4">
                    <button
                      onClick={() => setSegmentosExpanded(!segmentosExpanded)}
                      className="flex items-center justify-between w-full text-left mb-3"
                    >
                      <h3 className="font-semibold text-gray-900">Segmentos</h3>
                      {segmentosExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {segmentosExpanded && (
                      <div className="space-y-2">
                        {segmentOptions.map(option => (
                          <div key={option.value} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`segmento-${option.value}`}
                                checked={filters.segmentos.includes(option.value)}
                                onCheckedChange={() => handleSegmentoToggle(option.value)}
                              />
                              <Label 
                                htmlFor={`segmento-${option.value}`}
                                className="text-sm cursor-pointer text-gray-700"
                              >
                                {option.label}
                              </Label>
                            </div>
                            {segmentCounts[option.value] && (
                              <span className="text-xs text-gray-500">
                                ({segmentCounts[option.value]})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tamaño Filter */}
                  <div className="border-t pt-4 mt-4">
                    <button
                      onClick={() => setTamanosExpanded(!tamanosExpanded)}
                      className="flex items-center justify-between w-full text-left mb-3"
                    >
                      <h3 className="font-semibold text-gray-900">Tamaño</h3>
                      {tamanosExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {tamanosExpanded && (
                      <div className="space-y-2">
                        {sizeOptions.map(option => (
                          <div key={option.value} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`tamano-${option.value}`}
                                checked={filters.tamanos.includes(option.value)}
                                onCheckedChange={() => handleTamanoToggle(option.value)}
                              />
                              <Label 
                                htmlFor={`tamano-${option.value}`}
                                className="text-sm cursor-pointer text-gray-700"
                              >
                                {option.label}
                              </Label>
                            </div>
                            {sizeCounts[option.value] && (
                              <span className="text-xs text-gray-500">
                                ({sizeCounts[option.value]})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Servicios Filter */}
                  {availableServices.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <button
                        onClick={() => setServiciosExpanded(!serviciosExpanded)}
                        className="flex items-center justify-between w-full text-left mb-3"
                      >
                        <h3 className="font-semibold text-gray-900">Servicios</h3>
                        {serviciosExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      {serviciosExpanded && (
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {availableServices.map(service => (
                            <div key={service} className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`servicio-${service}`}
                                  checked={filters.servicios.includes(service)}
                                  onCheckedChange={() => handleServicioToggle(service)}
                                />
                                <Label 
                                  htmlFor={`servicio-${service}`}
                                  className="text-sm cursor-pointer text-gray-700"
                                >
                                  {service}
                                </Label>
                              </div>
                              {serviceCounts[service] && (
                                <span className="text-xs text-gray-500">
                                  ({serviceCounts[service]})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {/* Search and Sort Bar */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Buscar por nombre o descripción..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 whitespace-nowrap">Ordenar por:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                        <SelectItem value="recent">Más recientes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {filters.search && (
                      <Badge variant="secondary" className="gap-1 bg-[#0B47CE]/10 text-[#0B47CE]">
                        Búsqueda: "{filters.search}"
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, search: "" }))}
                          className="hover:bg-[#0B47CE]/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {filters.segmentos.map(seg => (
                      <Badge key={seg} variant="secondary" className="gap-1 bg-[#0B47CE]/10 text-[#0B47CE]">
                        {segmentOptions.find(s => s.value === seg)?.label}
                        <button
                          onClick={() => handleSegmentoToggle(seg)}
                          className="hover:bg-[#0B47CE]/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {filters.tamanos.map(tam => (
                      <Badge key={tam} variant="secondary" className="gap-1 bg-[#0B47CE]/10 text-[#0B47CE]">
                        {sizeOptions.find(s => s.value === tam)?.label}
                        <button
                          onClick={() => handleTamanoToggle(tam)}
                          className="hover:bg-[#0B47CE]/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {filters.servicios.map(serv => (
                      <Badge key={serv} variant="secondary" className="gap-1 bg-[#0B47CE]/10 text-[#0B47CE]">
                        {serv}
                        <button
                          onClick={() => handleServicioToggle(serv)}
                          className="hover:bg-[#0B47CE]/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600 mb-4">
                Mostrando <span className="font-bold text-[#0B47CE]">{filteredAssociates.length}</span> de{' '}
                <span className="font-bold text-[#0B47CE]">{totalAssociates}</span> asociados
              </div>

              {/* Associates Grid */}
              {filteredAssociates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAssociates.map(associate => (
                    <AssociateCard 
                      key={associate.id} 
                      associate={associate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                  <Building2 className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No se encontraron asociados
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {hasActiveFilters 
                      ? "Intenta ajustar los filtros para encontrar más resultados" 
                      : "No hay asociados disponibles en este momento"}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      onClick={resetFilters}
                      className="bg-[#0B47CE] hover:bg-[#003889]"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
