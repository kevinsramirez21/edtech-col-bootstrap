import { Helmet } from "react-helmet-async"
import { useState, useEffect, useMemo } from "react"
import { Users, Building2, Loader2, Settings, Grid3x3, List } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { AssociateCard } from "@/components/ui/associate-card"
import { AssociatesFilters } from "@/components/ui/associates-filters"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"
import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
}

interface FiltersState {
  search: string
  segmento: string
  tamano: string
  servicios: string[]
}

export default function AssociatesDirectory() {
  const [associates, setAssociates] = useState<Associate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { isAdmin } = useAdmin()
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    segmento: "",
    tamano: "",
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

  // Filter associates based on current filters
  const filteredAssociates = useMemo(() => {
    return associates.filter(associate => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesName = associate.nombre_empresa.toLowerCase().includes(searchTerm)
        const matchesDescription = associate.descripcion?.toLowerCase().includes(searchTerm)
        if (!matchesName && !matchesDescription) return false
      }

      // Segment filter
      if (filters.segmento && associate.segmento !== filters.segmento) {
        return false
      }

      // Size filter
      if (filters.tamano && associate.tamano_empresa !== filters.tamano) {
        return false
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
  }, [associates, filters])

  // Calculate KPIs
  const totalAssociates = associates.length
  const segmentCounts = associates.reduce((acc, associate) => {
    if (associate.segmento) {
      acc[associate.segmento] = (acc[associate.segmento] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Conoce los Asociados - Colombia EdTech</title>
          <meta name="description" content="Descubre las empresas EdTech que forman parte de Colombia EdTech" />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-700" />
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
              className="text-primary-700 hover:text-primary-800 font-medium"
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

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <Section className="bg-gradient-to-br from-[#003889] via-[#0B47CE] to-[#003889] text-white pt-24 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F73C5C] rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Users className="w-5 h-5" />
              <span className="text-sm font-semibold">Ecosistema EdTech Colombia</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Conoce Nuestros <span className="text-[#F73C5C]">Asociados</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Descubre las empresas EdTech que están transformando la educación en Colombia. 
              Conecta con líderes en tecnología educativa y encuentra los servicios que necesitas.
            </p>
            
            {isAdmin && (
              <Button 
                asChild
                size="lg"
                className="bg-white text-[#0B47CE] hover:bg-white/90 font-semibold"
              >
                <Link to="/admin" className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Panel de Administración
                </Link>
              </Button>
            )}
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-[#F73C5C]" />
                </div>
                <div className="text-5xl font-bold mb-2">
                  {totalAssociates}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Asociados Activos
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Building2 className="w-8 h-8 text-[#F73C5C]" />
                </div>
                <div className="text-5xl font-bold mb-2">
                  {availableServices.length}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Servicios Diferentes
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Building2 className="w-8 h-8 text-[#F73C5C]" />
                </div>
                <div className="text-5xl font-bold mb-2">
                  {Object.keys(segmentCounts).length}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  Segmentos EdTech
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Filters and Results */}
        <Section className="py-16">
          <div className="space-y-8">
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <AssociatesFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableServices={availableServices}
              />
            </div>

            {/* Results Summary and View Toggle */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <p>
                  Mostrando <span className="font-bold text-[#0B47CE]">{filteredAssociates.length}</span> de{' '}
                  <span className="font-bold text-[#0B47CE]">{totalAssociates}</span> asociados
                </p>
                {filters.search || filters.segmento || filters.tamano || filters.servicios.length > 0 ? (
                  <p className="text-[#F73C5C] mt-1">
                    {filteredAssociates.length === 0 ? 
                      "No se encontraron resultados con los filtros actuales" :
                      "Resultados filtrados"
                    }
                  </p>
                ) : null}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[#0B47CE]' : ''}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#0B47CE]' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Associates Grid/List */}
            {filteredAssociates.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
              }>
                {filteredAssociates.map(associate => (
                  <AssociateCard 
                    key={associate.id} 
                    associate={associate}
                    className={viewMode === 'list' ? 'hover:shadow-xl' : ''}
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
                  {filters.search || filters.segmento || filters.tamano || filters.servicios.length > 0 ? 
                    "Intenta ajustar los filtros para encontrar más resultados" :
                    "No hay asociados disponibles en este momento"
                  }
                </p>
                {(filters.search || filters.segmento || filters.tamano || filters.servicios.length > 0) && (
                  <Button
                    onClick={() => setFilters({ search: "", segmento: "", tamano: "", servicios: [] })}
                    className="bg-[#0B47CE] hover:bg-[#003889]"
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            )}
          </div>
        </Section>
      </main>
    </>
  )
}