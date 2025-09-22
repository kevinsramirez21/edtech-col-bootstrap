import { Helmet } from "react-helmet-async"
import { useState, useEffect, useMemo } from "react"
import { Users, Building2, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { AssociateCard } from "@/components/ui/associate-card"
import { AssociatesFilters } from "@/components/ui/associates-filters"
import { Section } from "@/components/ui/section"

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

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <Section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">
              Conoce Nuestros <span className="text-primary-700">Asociados</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Descubre las empresas EdTech que están transformando la educación en Colombia. 
              Conecta con líderes en tecnología educativa y encuentra los servicios que necesitas.
            </p>
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary-700" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">
                  {totalAssociates}
                </div>
                <div className="text-sm text-gray-600">
                  Asociados Activos
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="w-6 h-6 text-primary-700" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">
                  {availableServices.length}
                </div>
                <div className="text-sm text-gray-600">
                  Servicios Diferentes
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="w-6 h-6 text-primary-700" />
                </div>
                <div className="text-3xl font-bold text-primary-900 mb-1">
                  {Object.keys(segmentCounts).length}
                </div>
                <div className="text-sm text-gray-600">
                  Segmentos EdTech
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Filters and Results */}
        <Section className="py-12">
          <div className="space-y-8">
            {/* Filters */}
            <AssociatesFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableServices={availableServices}
              className="bg-white rounded-lg p-6 shadow-sm border"
            />

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>
                Mostrando <span className="font-semibold text-primary-900">{filteredAssociates.length}</span> de{' '}
                <span className="font-semibold text-primary-900">{totalAssociates}</span> asociados
              </p>
              {filters.search || filters.segmento || filters.tamano || filters.servicios.length > 0 && (
                <p className="text-primary-700">
                  {filteredAssociates.length === 0 ? 
                    "No se encontraron resultados con los filtros actuales" :
                    "Resultados filtrados"
                  }
                </p>
              )}
            </div>

            {/* Associates Grid */}
            {filteredAssociates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssociates.map(associate => (
                  <AssociateCard 
                    key={associate.id} 
                    associate={associate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron asociados
                </h3>
                <p className="text-gray-600 mb-6">
                  {filters.search || filters.segmento || filters.tamano || filters.servicios.length > 0 ? 
                    "Intenta ajustar los filtros para encontrar más resultados" :
                    "No hay asociados disponibles en este momento"
                  }
                </p>
                {(filters.search || filters.segmento || filters.tamano || filters.servicios.length > 0) && (
                  <button
                    onClick={() => setFilters({ search: "", segmento: "", tamano: "", servicios: [] })}
                    className="text-primary-700 hover:text-primary-800 font-medium"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </Section>
      </main>
    </>
  )
}