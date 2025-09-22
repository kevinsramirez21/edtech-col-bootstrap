import * as React from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FiltersState {
  search: string
  segmento: string
  tamano: string
  servicios: string[]
}

interface AssociatesFiltersProps {
  filters: FiltersState
  onFiltersChange: (filters: FiltersState) => void
  availableServices: string[]
  className?: string
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

export function AssociatesFilters({ 
  filters, 
  onFiltersChange, 
  availableServices,
  className 
}: AssociatesFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value })
  }

  const handleSegmentChange = (value: string) => {
    onFiltersChange({ ...filters, segmento: value === "all" ? "" : value })
  }

  const handleSizeChange = (value: string) => {
    onFiltersChange({ ...filters, tamano: value === "all" ? "" : value })
  }

  const handleServiceToggle = (service: string) => {
    const currentServices = filters.servicios || []
    const newServices = currentServices.includes(service)
      ? currentServices.filter(s => s !== service)
      : [...currentServices, service]
    
    onFiltersChange({ ...filters, servicios: newServices })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      segmento: "",
      tamano: "",
      servicios: []
    })
  }

  const activeFiltersCount = [
    filters.segmento,
    filters.tamano,
    ...(filters.servicios || [])
  ].filter(Boolean).length

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 items-center flex-wrap">
          {/* Segment Filter */}
          <Select value={filters.segmento || "all"} onValueChange={handleSegmentChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los segmentos</SelectItem>
              {segmentOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Size Filter */}
          <Select value={filters.tamano || "all"} onValueChange={handleSizeChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tamaños</SelectItem>
              {sizeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Services Filter */}
          {availableServices.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Servicios
                  {filters.servicios?.length > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {filters.servicios.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Filtrar por servicios</Label>
                    <p className="text-xs text-gray-600 mt-1">
                      Selecciona los servicios que te interesan
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                    {availableServices.map(service => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={filters.servicios?.includes(service) || false}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label 
                          htmlFor={service} 
                          className="text-sm cursor-pointer flex-1"
                        >
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Clear Filters */}
          {(activeFiltersCount > 0 || filters.search) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFiltersCount > 0 || filters.search) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Búsqueda: "{filters.search}"
              <button
                onClick={() => handleSearchChange("")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.segmento && (
            <Badge variant="secondary" className="gap-1">
              {segmentOptions.find(s => s.value === filters.segmento)?.label}
              <button
                onClick={() => handleSegmentChange("all")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.tamano && (
            <Badge variant="secondary" className="gap-1">
              {sizeOptions.find(s => s.value === filters.tamano)?.label}
              <button
                onClick={() => handleSizeChange("all")}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          
          {filters.servicios?.map(service => (
            <Badge key={service} variant="secondary" className="gap-1">
              {service}
              <button
                onClick={() => handleServiceToggle(service)}
                className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}