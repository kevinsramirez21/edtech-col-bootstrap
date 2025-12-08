import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Search, 
  Check, 
  X, 
  ExternalLink, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Linkedin,
  Briefcase,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Pencil,
  Plus,
  Globe,
  Sparkles
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Associate {
  id: string;
  nombre_empresa: string;
  pagina_web: string | null;
  linkedin: string | null;
  logo_url: string | null;
  servicios: string[] | null;
}

interface EnrichmentOption {
  valor: string;
  confianza: "alta" | "media" | "baja";
  fuente: string;
}

interface EnrichmentSuggestion {
  campo: string;
  opciones: EnrichmentOption[];
  currentIndex: number;
}

interface FieldStatus {
  linkedin: "empty" | "has_data" | "approved" | "broken";
  logo_url: "empty" | "has_data" | "approved" | "broken";
  servicios: "empty" | "has_data" | "approved";
}

type FieldType = "linkedin" | "logo_url" | "servicios";
type FilterType = "all" | "missing_logo" | "missing_linkedin" | "missing_servicios";

export function IndividualEnrichment() {
  const queryClient = useQueryClient();
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchingField, setSearchingField] = useState<FieldType | "all" | null>(null);
  const [suggestions, setSuggestions] = useState<Map<string, EnrichmentSuggestion>>(new Map());
  const [brokenLogos, setBrokenLogos] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>("all");
  
  // Manual edit state
  const [manualEditField, setManualEditField] = useState<FieldType | null>(null);
  const [manualValue, setManualValue] = useState("");
  const [manualLogoPreviewError, setManualLogoPreviewError] = useState(false);
  const [manualServicios, setManualServicios] = useState<string[]>([]);
  const [newServicio, setNewServicio] = useState("");

  // Fetch all active associates
  const { data: associates, isLoading } = useQuery({
    queryKey: ["associates-individual-enrichment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asociados")
        .select("id, nombre_empresa, pagina_web, linkedin, logo_url, servicios")
        .eq("estado", "activo")
        .order("nombre_empresa");

      if (error) throw error;
      return data as Associate[];
    },
  });

  // Fetch enrichment status for all associates
  const { data: enrichmentStatus } = useQuery({
    queryKey: ["enrichment-status"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asociados_enrichment")
        .select("asociado_id, campo, aprobado")
        .eq("aprobado", true);

      if (error) throw error;
      
      // Group by associate
      const statusMap = new Map<string, Set<string>>();
      data?.forEach((e) => {
        if (!statusMap.has(e.asociado_id)) {
          statusMap.set(e.asociado_id, new Set());
        }
        statusMap.get(e.asociado_id)!.add(e.campo);
      });
      
      return statusMap;
    },
  });

  // Filter associates based on selection
  const filteredAssociates = associates?.filter(a => {
    if (filter === "all") return true;
    if (filter === "missing_logo") return !a.logo_url || brokenLogos.has(a.id);
    if (filter === "missing_linkedin") return !a.linkedin;
    if (filter === "missing_servicios") return !a.servicios || a.servicios.length === 0;
    return true;
  }) || [];

  // Set initial selected associate and keep it synced with data
  useEffect(() => {
    if (filteredAssociates.length > 0) {
      if (!selectedAssociate) {
        setSelectedAssociate(filteredAssociates[0]);
        setSelectedIndex(0);
      } else {
        // Keep selectedAssociate in sync with latest data
        const updated = filteredAssociates.find(a => a.id === selectedAssociate.id);
        if (updated) {
          setSelectedAssociate(updated);
        } else if (filteredAssociates.length > 0) {
          // Selected was filtered out, select first
          setSelectedAssociate(filteredAssociates[0]);
          setSelectedIndex(0);
        }
      }
    }
  }, [filteredAssociates]);

  // Check for broken logo images
  const checkLogoImage = (associate: Associate) => {
    if (!associate.logo_url) return;
    
    const img = new window.Image();
    img.onload = () => {
      setBrokenLogos(prev => {
        const next = new Set(prev);
        next.delete(associate.id);
        return next;
      });
    };
    img.onerror = () => {
      setBrokenLogos(prev => new Set(prev).add(associate.id));
    };
    img.src = associate.logo_url;
  };

  // Check logos when associates load
  useEffect(() => {
    associates?.forEach(checkLogoImage);
  }, [associates]);

  // Get field status for an associate
  const getFieldStatus = (associate: Associate): FieldStatus => {
    const approved = enrichmentStatus?.get(associate.id) || new Set();
    
    return {
      linkedin: approved.has("linkedin") ? "approved" : associate.linkedin ? "has_data" : "empty",
      logo_url: brokenLogos.has(associate.id) ? "broken" : 
                approved.has("logo_url") ? "approved" : 
                associate.logo_url ? "has_data" : "empty",
      servicios: approved.has("servicios") ? "approved" : 
                 (associate.servicios && associate.servicios.length > 0) ? "has_data" : "empty",
    };
  };

  // Search mutation for a specific field
  const searchMutation = useMutation({
    mutationFn: async ({ associateId, fields }: { associateId: string; fields: FieldType[] }) => {
      const { data, error } = await supabase.functions.invoke("enrich-associate", {
        body: { 
          asociado_id: associateId,
          force_fields: fields
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.enrichments && data.enrichments.length > 0) {
        // Store ALL suggestions with their options
        const newSuggestions = new Map<string, EnrichmentSuggestion>();
        
        data.enrichments.forEach((enrichment: any) => {
          newSuggestions.set(enrichment.campo, {
            campo: enrichment.campo,
            opciones: enrichment.opciones || [],
            currentIndex: 0
          });
        });
        
        setSuggestions(newSuggestions);
        
        const totalOptions = data.enrichments.reduce((sum: number, e: any) => sum + (e.opciones?.length || 0), 0);
        toast.success(`Encontrado: ${totalOptions} opción(es) en ${data.enrichments.length} campo(s)`);
      } else {
        toast.info("No se encontró información nueva");
        setSuggestions(new Map());
      }
      setSearchingField(null);
      queryClient.invalidateQueries({ queryKey: ["enrichments"] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      setSearchingField(null);
    },
  });

  // Approve suggestion mutation
  const approveMutation = useMutation({
    mutationFn: async ({ associateId, campo, valor }: { 
      associateId: string; 
      campo: string; 
      valor: string;
    }) => {
      // Update the asociado field
      let updateData: Record<string, unknown> = {};
      
      if (campo === "servicios") {
        try {
          updateData[campo] = JSON.parse(valor);
        } catch {
          updateData[campo] = valor.split(",").map(s => s.trim()).filter(Boolean);
        }
      } else {
        updateData[campo] = valor;
      }

      const { error: updateError } = await supabase
        .from("asociados")
        .update(updateData)
        .eq("id", associateId);

      if (updateError) throw updateError;

      // Mark enrichment as approved
      await supabase
        .from("asociados_enrichment")
        .upsert({
          asociado_id: associateId,
          campo: campo,
          valor_sugerido: valor,
          aprobado: true,
          verificado: true
        }, {
          onConflict: "asociado_id,campo"
        });
    },
    onSuccess: (_, variables) => {
      toast.success("Dato guardado");
      // Remove the approved suggestion
      setSuggestions(prev => {
        const next = new Map(prev);
        next.delete(variables.campo);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["associates-individual-enrichment"] });
      queryClient.invalidateQueries({ queryKey: ["enrichment-status"] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Navigate to next option for a field
  const nextOption = (campo: string) => {
    setSuggestions(prev => {
      const next = new Map(prev);
      const suggestion = next.get(campo);
      if (suggestion && suggestion.currentIndex < suggestion.opciones.length - 1) {
        next.set(campo, { ...suggestion, currentIndex: suggestion.currentIndex + 1 });
      }
      return next;
    });
  };

  // Navigate to previous option for a field
  const prevOption = (campo: string) => {
    setSuggestions(prev => {
      const next = new Map(prev);
      const suggestion = next.get(campo);
      if (suggestion && suggestion.currentIndex > 0) {
        next.set(campo, { ...suggestion, currentIndex: suggestion.currentIndex - 1 });
      }
      return next;
    });
  };

  // Reject current suggestion option
  const rejectCurrentOption = async (campo: string) => {
    const suggestion = suggestions.get(campo);
    if (!suggestion || !selectedAssociate) return;

    if (suggestion.opciones.length > 1) {
      // Remove current option and show next
      setSuggestions(prev => {
        const next = new Map(prev);
        const updated = { ...suggestion };
        updated.opciones = updated.opciones.filter((_, i) => i !== updated.currentIndex);
        if (updated.currentIndex >= updated.opciones.length) {
          updated.currentIndex = Math.max(0, updated.opciones.length - 1);
        }
        if (updated.opciones.length > 0) {
          next.set(campo, updated);
        } else {
          next.delete(campo);
        }
        return next;
      });
      toast.info("Opción descartada, mostrando siguiente");
    } else {
      // Last option, remove completely
      setSuggestions(prev => {
        const next = new Map(prev);
        next.delete(campo);
        return next;
      });
      toast.info("Sin más opciones");
    }
  };

  // Clear suggestions when changing associates
  const selectAssociateById = (associate: Associate, index: number) => {
    setSelectedAssociate(associate);
    setSelectedIndex(index);
    setSuggestions(new Map());
    setSearchingField(null);
  };

  // Navigation
  const goToNext = () => {
    if (selectedIndex < filteredAssociates.length - 1) {
      const nextIndex = selectedIndex + 1;
      selectAssociateById(filteredAssociates[nextIndex], nextIndex);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      selectAssociateById(filteredAssociates[prevIndex], prevIndex);
    }
  };

  const selectAssociate = (associate: Associate, index: number) => {
    selectAssociateById(associate, index);
  };

  // Search handlers
  const handleSearch = (field: FieldType) => {
    if (!selectedAssociate) return;
    setSearchingField(field);
    setSuggestions(new Map());
    searchMutation.mutate({ associateId: selectedAssociate.id, fields: [field] });
  };

  const handleSearchAll = () => {
    if (!selectedAssociate) return;
    setSearchingField("all");
    setSuggestions(new Map());
    searchMutation.mutate({ 
      associateId: selectedAssociate.id, 
      fields: ["linkedin", "logo_url", "servicios"] 
    });
  };

  // Manual edit handlers
  const openManualEdit = (field: FieldType) => {
    if (!selectedAssociate) return;
    setManualEditField(field);
    setManualLogoPreviewError(false);
    
    if (field === "logo_url") {
      setManualValue(selectedAssociate.logo_url || "");
    } else if (field === "linkedin") {
      setManualValue(selectedAssociate.linkedin || "");
    } else if (field === "servicios") {
      setManualServicios(selectedAssociate.servicios || []);
      setNewServicio("");
    }
  };

  const handleSaveManual = () => {
    if (!selectedAssociate || !manualEditField) return;
    
    let valueToSave = "";
    if (manualEditField === "servicios") {
      valueToSave = JSON.stringify(manualServicios);
    } else {
      valueToSave = manualValue.trim();
    }

    if (!valueToSave || valueToSave === "[]") {
      toast.error("Por favor ingresa un valor");
      return;
    }

    approveMutation.mutate({
      associateId: selectedAssociate.id,
      campo: manualEditField,
      valor: valueToSave
    });
    
    setManualEditField(null);
  };

  const addServicio = () => {
    if (newServicio.trim()) {
      setManualServicios([...manualServicios, newServicio.trim()]);
      setNewServicio("");
    }
  };

  const removeServicio = (index: number) => {
    setManualServicios(manualServicios.filter((_, i) => i !== index));
  };

  // Field status icon component
  const FieldStatusIcon = ({ status }: { status: "empty" | "has_data" | "approved" | "broken" }) => {
    switch (status) {
      case "approved":
        return (
          <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          </div>
        );
      case "has_data":
        return (
          <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
        );
      case "broken":
        return (
          <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center">
            <AlertTriangle className="h-3 w-3 text-amber-600" />
          </div>
        );
      default:
        return (
          <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
            <XCircle className="h-3 w-3 text-muted-foreground/50" />
          </div>
        );
    }
  };

  // Confidence badge
  const getConfianzaBadge = (confianza: string) => {
    switch (confianza) {
      case "alta":
        return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/30 font-medium">✓ Alta</Badge>;
      case "media":
        return <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30 font-medium">○ Media</Badge>;
      case "baja":
        return <Badge className="bg-rose-500/15 text-rose-700 border-rose-500/30 font-medium">⚠ Baja</Badge>;
      default:
        return <Badge variant="outline">{confianza}</Badge>;
    }
  };

  const getCampoLabel = (campo: string) => {
    const labels: Record<string, string> = {
      linkedin: "LinkedIn",
      logo_url: "Logo",
      servicios: "Servicios",
    };
    return labels[campo] || campo;
  };

  const getCampoIcon = (campo: string) => {
    switch (campo) {
      case "logo_url":
        return <ImageIcon className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "servicios":
        return <Briefcase className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Render suggestion card for a field
  const renderSuggestionCard = (campo: string) => {
    const suggestion = suggestions.get(campo);
    if (!suggestion || suggestion.opciones.length === 0 || !selectedAssociate) return null;
    
    const currentOption = suggestion.opciones[suggestion.currentIndex];
    if (!currentOption) return null;

    return (
      <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm overflow-hidden">
        <CardContent className="pt-4">
          <div className="space-y-3">
            {/* Header with navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                  {getCampoIcon(campo)}
                </div>
                <span className="font-semibold text-foreground">{getCampoLabel(campo)}</span>
                {getConfianzaBadge(currentOption.confianza)}
              </div>
              
              {suggestion.opciones.length > 1 && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => prevOption(campo)}
                    disabled={suggestion.currentIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[50px] text-center">
                    {suggestion.currentIndex + 1} / {suggestion.opciones.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => nextOption(campo)}
                    disabled={suggestion.currentIndex === suggestion.opciones.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Value preview */}
            {campo === "logo_url" ? (
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg border bg-background flex items-center justify-center overflow-hidden">
                  <img 
                    src={currentOption.valor} 
                    alt="Logo sugerido" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <a 
                  href={currentOption.valor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {currentOption.valor}
                </a>
              </div>
            ) : campo === "servicios" ? (
              <div className="flex flex-wrap gap-1">
                {(typeof currentOption.valor === 'string' ? JSON.parse(currentOption.valor) : currentOption.valor).map((s: string, i: number) => (
                  <Badge key={i} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            ) : (
              <a 
                href={currentOption.valor}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline break-all"
              >
                {currentOption.valor}
              </a>
            )}

            <p className="text-sm text-muted-foreground">
              <strong>Fuente:</strong> {currentOption.fuente}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              onClick={() => approveMutation.mutate({
                associateId: selectedAssociate.id,
                campo: campo,
                valor: currentOption.valor,
              })}
              disabled={approveMutation.isPending}
              className="flex-1"
              size="sm"
            >
              {approveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <Check className="h-4 w-4 mr-1" />
              )}
              Aprobar
            </Button>
            <Button 
              variant="outline"
              onClick={() => rejectCurrentOption(campo)}
              size="sm"
            >
              <X className="h-4 w-4 mr-1" />
              {suggestion.opciones.length > 1 ? "Descartar" : "Rechazar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column: Associate list */}
        <Card className="lg:col-span-1 shadow-sm border-border/50">
          <CardHeader className="pb-3 bg-gradient-to-b from-muted/30 to-transparent">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Empresas</CardTitle>
              <Badge variant="secondary" className="font-mono">{filteredAssociates.length}</Badge>
            </div>
            <Select value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
              <SelectTrigger className="w-full mt-2 bg-background">
                <SelectValue placeholder="Filtrar por..." />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Todas las empresas</SelectItem>
                <SelectItem value="missing_logo">Sin logo / Logo roto</SelectItem>
                <SelectItem value="missing_linkedin">Sin LinkedIn</SelectItem>
                <SelectItem value="missing_servicios">Sin servicios</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {filteredAssociates.map((associate, index) => {
                const status = getFieldStatus(associate);
                const isSelected = selectedAssociate?.id === associate.id;
                
                return (
                  <div
                    key={associate.id}
                    onClick={() => selectAssociate(associate, index)}
                    className={`group flex items-center justify-between px-4 py-3.5 cursor-pointer border-b border-border/40 transition-all duration-150 ${
                      isSelected 
                        ? "bg-primary/8 border-l-3 border-l-primary shadow-sm" 
                        : "hover:bg-muted/40 border-l-3 border-l-transparent"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate transition-colors ${isSelected ? "text-primary" : "group-hover:text-foreground"}`}>
                        {associate.nombre_empresa}
                      </p>
                      {associate.pagina_web && (
                        <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                          <Globe className="h-3 w-3 flex-shrink-0" />
                          {associate.pagina_web.replace(/^https?:\/\/(www\.)?/, "")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <FieldStatusIcon status={status.logo_url} />
                      <FieldStatusIcon status={status.linkedin} />
                      <FieldStatusIcon status={status.servicios} />
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right column: Detail view */}
        <Card className="lg:col-span-2 shadow-sm border-border/50">
          <CardHeader className="bg-gradient-to-b from-muted/30 to-transparent">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">
                  {selectedAssociate?.nombre_empresa || "Selecciona una empresa"}
                </CardTitle>
                {selectedAssociate?.pagina_web && (
                  <a 
                    href={selectedAssociate.pagina_web.startsWith('http') ? selectedAssociate.pagina_web : `https://${selectedAssociate.pagina_web}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {selectedAssociate.pagina_web.replace(/^https?:\/\/(www\.)?/, "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={goToPrevious}
                    disabled={selectedIndex === 0}
                    className="h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1 min-w-[80px] justify-center">
                    <Input
                      type="number"
                      min={1}
                      max={filteredAssociates.length}
                      value={selectedIndex + 1}
                      onChange={(e) => {
                        const page = parseInt(e.target.value) - 1;
                        if (page >= 0 && page < filteredAssociates.length) {
                          selectAssociateById(filteredAssociates[page], page);
                        }
                      }}
                      className="h-7 w-12 text-center text-sm font-medium p-0 border-0 bg-transparent"
                    />
                    <span className="text-sm text-muted-foreground">/ {filteredAssociates.length}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={goToNext}
                    disabled={selectedIndex === filteredAssociates.length - 1}
                    className="h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          {selectedAssociate && (
            <CardContent className="space-y-6">
              {/* Current data section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">
                    Datos Actuales
                  </h3>
                </div>
                
                <div className="grid gap-3">
                  {/* Logo */}
                  <div className="group relative flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/20 hover:border-border transition-all">
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-border/50 bg-muted/30 flex items-center justify-center overflow-hidden">
                      {selectedAssociate.logo_url ? (
                        brokenLogos.has(selectedAssociate.id) ? (
                          <div className="text-center p-2">
                            <AlertTriangle className="h-6 w-6 text-amber-500 mx-auto" />
                            <span className="text-[10px] text-amber-600 mt-1 block">Error</span>
                          </div>
                        ) : (
                          <img 
                            src={selectedAssociate.logo_url} 
                            alt="Logo" 
                            className="w-full h-full object-contain p-1"
                            onError={() => setBrokenLogos(prev => new Set(prev).add(selectedAssociate.id))}
                          />
                        )
                      ) : (
                        <div className="text-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground/40 mx-auto" />
                          <span className="text-[10px] text-muted-foreground mt-1 block">Sin logo</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <ImageIcon className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-foreground">Logo</span>
                        {brokenLogos.has(selectedAssociate.id) && (
                          <Badge className="bg-amber-500/15 text-amber-700 border-amber-500/30 text-[10px] px-1.5">
                            URL rota
                          </Badge>
                        )}
                      </div>
                      {selectedAssociate.logo_url ? (
                        <p className="text-xs text-muted-foreground truncate font-mono">
                          {selectedAssociate.logo_url}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground/60 italic">No configurado</p>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleSearch("logo_url")}
                        disabled={searchMutation.isPending}
                        className="shadow-sm"
                      >
                        {searchingField === "logo_url" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Search className="h-3.5 w-3.5 mr-1.5" />
                            Buscar
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openManualEdit("logo_url")}
                        className="h-9 w-9"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/20 hover:border-border transition-all">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center">
                      <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-foreground">LinkedIn</span>
                      </div>
                      {selectedAssociate.linkedin ? (
                        <a 
                          href={selectedAssociate.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-[#0A66C2] hover:underline truncate block font-medium"
                        >
                          {selectedAssociate.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/company\//, "")}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground/60 italic">No configurado</p>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleSearch("linkedin")}
                        disabled={searchMutation.isPending}
                        className="shadow-sm"
                      >
                        {searchingField === "linkedin" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Search className="h-3.5 w-3.5 mr-1.5" />
                            Buscar
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openManualEdit("linkedin")}
                        className="h-9 w-9"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Servicios */}
                  <div className="group relative flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/20 hover:border-border transition-all">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-foreground">Servicios</span>
                        {selectedAssociate.servicios && selectedAssociate.servicios.length > 0 && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 font-mono">
                            {selectedAssociate.servicios.length}
                          </Badge>
                        )}
                      </div>
                      {selectedAssociate.servicios && selectedAssociate.servicios.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedAssociate.servicios.map((s, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="text-xs bg-violet-500/5 text-violet-700 border-violet-500/20 font-normal"
                            >
                              {s}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground/60 italic">No configurado</p>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleSearch("servicios")}
                        disabled={searchMutation.isPending}
                        className="shadow-sm"
                      >
                        {searchingField === "servicios" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Search className="h-3.5 w-3.5 mr-1.5" />
                            Buscar
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openManualEdit("servicios")}
                        className="h-9 w-9"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Search all button */}
                <Button 
                  onClick={handleSearchAll}
                  disabled={searchMutation.isPending}
                  className="w-full h-12 text-base font-medium shadow-sm"
                  size="lg"
                >
                  {searchingField === "all" ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="h-5 w-5 mr-2" />
                  )}
                  Buscar todos los campos
                </Button>
              </div>

              {/* Suggestions section */}
              {suggestions.size > 0 && (
                <>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">
                        Sugerencias Encontradas
                      </h3>
                      <Badge variant="secondary" className="ml-auto font-mono text-xs">
                        {suggestions.size} campo{suggestions.size > 1 ? "s" : ""}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {renderSuggestionCard("logo_url")}
                      {renderSuggestionCard("linkedin")}
                      {renderSuggestionCard("servicios")}
                    </div>

                    <Button 
                      variant="outline"
                      onClick={goToNext}
                      disabled={selectedIndex === filteredAssociates.length - 1}
                      className="w-full"
                    >
                      Siguiente empresa
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          )}
        </Card>
      </div>

      {/* Manual Edit Dialog */}
      <Dialog open={!!manualEditField} onOpenChange={() => setManualEditField(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar {manualEditField && getCampoLabel(manualEditField)}</DialogTitle>
            <DialogDescription>
              Ingresa el valor manualmente para {selectedAssociate?.nombre_empresa}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {manualEditField === "logo_url" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="logo-url">URL del logo</Label>
                  <Input
                    id="logo-url"
                    placeholder="https://ejemplo.com/logo.png"
                    value={manualValue}
                    onChange={(e) => {
                      setManualValue(e.target.value);
                      setManualLogoPreviewError(false);
                    }}
                  />
                </div>
                {manualValue && (
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg border bg-muted/20 flex items-center justify-center overflow-hidden">
                      {manualLogoPreviewError ? (
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      ) : (
                        <img 
                          src={manualValue} 
                          alt="Preview" 
                          className="w-full h-full object-contain"
                          onError={() => setManualLogoPreviewError(true)}
                          onLoad={() => setManualLogoPreviewError(false)}
                        />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {manualLogoPreviewError ? "No se pudo cargar la imagen" : "Vista previa"}
                    </span>
                  </div>
                )}
              </>
            )}

            {manualEditField === "linkedin" && (
              <div className="space-y-2">
                <Label htmlFor="linkedin-url">URL de LinkedIn</Label>
                <Input
                  id="linkedin-url"
                  placeholder="https://linkedin.com/company/nombre"
                  value={manualValue}
                  onChange={(e) => setManualValue(e.target.value)}
                />
              </div>
            )}

            {manualEditField === "servicios" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Agregar servicio..."
                    value={newServicio}
                    onChange={(e) => setNewServicio(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addServicio())}
                  />
                  <Button type="button" onClick={addServicio} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {manualServicios.map((s, i) => (
                    <Badge key={i} variant="secondary" className="flex items-center gap-1">
                      {s}
                      <button
                        type="button"
                        onClick={() => removeServicio(i)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {manualServicios.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    Agrega al menos un servicio
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setManualEditField(null)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveManual}
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
