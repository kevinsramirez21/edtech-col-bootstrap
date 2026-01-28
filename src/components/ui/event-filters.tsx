import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PAISES, MODALIDADES, MESES, Pais, Modalidad } from "@/data/eventos-latam-2026";

export interface EventFiltersState {
  pais: Pais | 'todos';
  modalidad: Modalidad | 'todos';
  mes: number | null;
}

interface EventFiltersProps {
  filters: EventFiltersState;
  onFiltersChange: (filters: EventFiltersState) => void;
  resultCount: number;
  totalCount: number;
}

export function EventFilters({ filters, onFiltersChange, resultCount, totalCount }: EventFiltersProps) {
  const handleReset = () => {
    onFiltersChange({
      pais: 'todos',
      modalidad: 'todos',
      mes: null,
    });
  };

  const hasActiveFilters = filters.pais !== 'todos' || filters.modalidad !== 'todos' || filters.mes !== null;

  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-grow">
          {/* Country filter */}
          <Select
            value={filters.pais}
            onValueChange={(value) => onFiltersChange({ ...filters, pais: value as Pais | 'todos' })}
          >
            <SelectTrigger className="w-full sm:w-[200px] bg-background">
              <SelectValue placeholder="País" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {PAISES.map((pais) => (
                <SelectItem key={pais.value} value={pais.value}>
                  <span className="flex items-center gap-2">
                    <span>{pais.emoji}</span>
                    <span>{pais.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Modality filter */}
          <Select
            value={filters.modalidad}
            onValueChange={(value) => onFiltersChange({ ...filters, modalidad: value as Modalidad | 'todos' })}
          >
            <SelectTrigger className="w-full sm:w-[200px] bg-background">
              <SelectValue placeholder="Modalidad" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {MODALIDADES.map((modalidad) => (
                <SelectItem key={modalidad.value} value={modalidad.value}>
                  {modalidad.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month filter */}
          <Select
            value={filters.mes?.toString() || 'all'}
            onValueChange={(value) => onFiltersChange({ ...filters, mes: value === 'all' ? null : parseInt(value) })}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-background">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {MESES.map((mes) => (
                <SelectItem key={mes.value?.toString() || 'all'} value={mes.value?.toString() || 'all'}>
                  {mes.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count and reset */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span className="text-sm text-muted-foreground">
            {resultCount === totalCount ? (
              <>{totalCount} eventos</>
            ) : (
              <>{resultCount} de {totalCount} eventos</>
            )}
          </span>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
