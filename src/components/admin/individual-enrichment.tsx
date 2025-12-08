import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Search, 
  Check, 
  X, 
  ExternalLink, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  Image,
  Link2,
  Briefcase,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle
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

interface Associate {
  id: string;
  nombre_empresa: string;
  pagina_web: string | null;
  linkedin: string | null;
  logo_url: string | null;
  servicios: string[] | null;
}

interface EnrichmentSuggestion {
  campo: string;
  valor_sugerido: string;
  confianza: "alta" | "media" | "baja";
  fuente: string;
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
  const [suggestion, setSuggestion] = useState<EnrichmentSuggestion | null>(null);
  const [brokenLogos, setBrokenLogos] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>("all");

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

  // Set initial selected associate
  useEffect(() => {
    if (filteredAssociates.length > 0 && !selectedAssociate) {
      setSelectedAssociate(filteredAssociates[0]);
      setSelectedIndex(0);
    }
  }, [filteredAssociates, selectedAssociate]);

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
        // Show first suggestion (we'll handle multiple later)
        setSuggestion(data.enrichments[0]);
        toast.success(`Encontrado: ${data.enrichments.length} sugerencia(s)`);
      } else {
        toast.info("No se encontró información nueva");
        setSuggestion(null);
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
        updateData[campo] = JSON.parse(valor);
      } else {
        updateData[campo] = valor;
      }

      const { error: updateError } = await supabase
        .from("asociados")
        .update(updateData)
        .eq("id", associateId);

      if (updateError) throw updateError;

      // Mark enrichment as approved
      const { error: enrichmentError } = await supabase
        .from("asociados_enrichment")
        .update({ aprobado: true, verificado: true })
        .eq("asociado_id", associateId)
        .eq("campo", campo);

      if (enrichmentError) throw enrichmentError;
    },
    onSuccess: () => {
      toast.success("Dato aprobado y guardado");
      setSuggestion(null);
      queryClient.invalidateQueries({ queryKey: ["associates-individual-enrichment"] });
      queryClient.invalidateQueries({ queryKey: ["enrichment-status"] });
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Reject suggestion
  const rejectSuggestion = async () => {
    if (!suggestion || !selectedAssociate) return;

    const { error } = await supabase
      .from("asociados_enrichment")
      .update({ aprobado: false, verificado: true })
      .eq("asociado_id", selectedAssociate.id)
      .eq("campo", suggestion.campo);

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.info("Sugerencia rechazada");
      setSuggestion(null);
      queryClient.invalidateQueries({ queryKey: ["enrichments"] });
    }
  };

  // Navigation
  const goToNext = () => {
    if (selectedIndex < filteredAssociates.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedIndex(nextIndex);
      setSelectedAssociate(filteredAssociates[nextIndex]);
      setSuggestion(null);
    }
  };

  const goToPrevious = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedIndex(prevIndex);
      setSelectedAssociate(filteredAssociates[prevIndex]);
      setSuggestion(null);
    }
  };

  const selectAssociate = (associate: Associate, index: number) => {
    setSelectedAssociate(associate);
    setSelectedIndex(index);
    setSuggestion(null);
  };

  // Search handlers
  const handleSearch = (field: FieldType) => {
    if (!selectedAssociate) return;
    setSearchingField(field);
    setSuggestion(null);
    searchMutation.mutate({ associateId: selectedAssociate.id, fields: [field] });
  };

  const handleSearchAll = () => {
    if (!selectedAssociate) return;
    setSearchingField("all");
    setSuggestion(null);
    searchMutation.mutate({ 
      associateId: selectedAssociate.id, 
      fields: ["linkedin", "logo_url", "servicios"] 
    });
  };

  // Field status icon component
  const FieldStatusIcon = ({ status }: { status: "empty" | "has_data" | "approved" | "broken" }) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "has_data":
        return <div className="h-2 w-2 rounded-full bg-blue-500" />;
      case "broken":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <XCircle className="h-4 w-4 text-muted-foreground/40" />;
    }
  };

  // Confidence badge
  const getConfianzaBadge = (confianza: string) => {
    switch (confianza) {
      case "alta":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/30">Alta</Badge>;
      case "media":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">Media</Badge>;
      case "baja":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/30">Baja</Badge>;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column: Associate list */}
      <Card className="lg:col-span-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Empresas</CardTitle>
            <Badge variant="outline">{filteredAssociates.length}</Badge>
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Filtrar por..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las empresas</SelectItem>
              <SelectItem value="missing_logo">Sin logo / Logo roto</SelectItem>
              <SelectItem value="missing_linkedin">Sin LinkedIn</SelectItem>
              <SelectItem value="missing_servicios">Sin servicios</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {filteredAssociates.map((associate, index) => {
              const status = getFieldStatus(associate);
              const isSelected = selectedAssociate?.id === associate.id;
              
              return (
                <div
                  key={associate.id}
                  onClick={() => selectAssociate(associate, index)}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b transition-colors ${
                    isSelected ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{associate.nombre_empresa}</p>
                    {associate.pagina_web && (
                      <p className="text-xs text-muted-foreground truncate">
                        {associate.pagina_web.replace(/^https?:\/\//, "")}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
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
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{selectedAssociate?.nombre_empresa || "Selecciona una empresa"}</CardTitle>
              {selectedAssociate?.pagina_web && (
                <CardDescription className="flex items-center gap-1 mt-1">
                  <a 
                    href={selectedAssociate.pagina_web} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    {selectedAssociate.pagina_web}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardDescription>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToPrevious}
                disabled={selectedIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                {selectedIndex + 1} / {filteredAssociates.length}
              </span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={goToNext}
                disabled={selectedIndex === filteredAssociates.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {selectedAssociate && (
          <CardContent className="space-y-6">
            {/* Current data section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Datos Actuales
              </h3>
              
              <div className="grid gap-4">
                {/* Logo */}
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg border bg-background flex items-center justify-center overflow-hidden">
                    {selectedAssociate.logo_url ? (
                      brokenLogos.has(selectedAssociate.id) ? (
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      ) : (
                        <img 
                          src={selectedAssociate.logo_url} 
                          alt="Logo" 
                          className="w-full h-full object-contain"
                          onError={() => setBrokenLogos(prev => new Set(prev).add(selectedAssociate.id))}
                        />
                      )
                    ) : (
                      <Image className="h-6 w-6 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Logo</span>
                      {brokenLogos.has(selectedAssociate.id) && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600/30">
                          URL rota
                        </Badge>
                      )}
                    </div>
                    {selectedAssociate.logo_url ? (
                      <p className="text-sm text-muted-foreground truncate">
                        {selectedAssociate.logo_url}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Sin logo</p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSearch("logo_url")}
                    disabled={searchMutation.isPending}
                    className="flex-shrink-0"
                  >
                    {searchingField === "logo_url" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-1" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg border bg-background flex items-center justify-center">
                    <Link2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">LinkedIn</span>
                    {selectedAssociate.linkedin ? (
                      <a 
                        href={selectedAssociate.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-sm text-primary hover:underline truncate"
                      >
                        {selectedAssociate.linkedin}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Sin LinkedIn</p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSearch("linkedin")}
                    disabled={searchMutation.isPending}
                    className="flex-shrink-0"
                  >
                    {searchingField === "linkedin" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-1" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>

                {/* Servicios */}
                <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg border bg-background flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium">Servicios</span>
                    {selectedAssociate.servicios && selectedAssociate.servicios.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedAssociate.servicios.map((s, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Sin servicios</p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSearch("servicios")}
                    disabled={searchMutation.isPending}
                    className="flex-shrink-0"
                  >
                    {searchingField === "servicios" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-1" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Search all button */}
              <Button 
                onClick={handleSearchAll}
                disabled={searchMutation.isPending}
                className="w-full"
              >
                {searchingField === "all" ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Buscar todos los campos
              </Button>
            </div>

            <Separator />

            {/* Suggestion section */}
            {suggestion && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Sugerencia de IA
                </h3>
                
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{getCampoLabel(suggestion.campo)}</span>
                          {getConfianzaBadge(suggestion.confianza)}
                        </div>

                        {/* Value preview */}
                        {suggestion.campo === "logo_url" ? (
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-lg border bg-background flex items-center justify-center overflow-hidden">
                              <img 
                                src={suggestion.valor_sugerido} 
                                alt="Logo sugerido" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                            <a 
                              href={suggestion.valor_sugerido}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline break-all"
                            >
                              {suggestion.valor_sugerido}
                            </a>
                          </div>
                        ) : suggestion.campo === "servicios" ? (
                          <div className="flex flex-wrap gap-1">
                            {JSON.parse(suggestion.valor_sugerido).map((s: string, i: number) => (
                              <Badge key={i} variant="secondary">
                                {s}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <a 
                            href={suggestion.valor_sugerido}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline break-all"
                          >
                            {suggestion.valor_sugerido}
                          </a>
                        )}

                        <p className="text-sm text-muted-foreground">
                          <strong>Fuente:</strong> {suggestion.fuente}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={() => approveMutation.mutate({
                          associateId: selectedAssociate.id,
                          campo: suggestion.campo,
                          valor: suggestion.valor_sugerido,
                        })}
                        disabled={approveMutation.isPending}
                        className="flex-1"
                      >
                        {approveMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        Aprobar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={rejectSuggestion}
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Rechazar
                      </Button>
                      <Button 
                        variant="ghost"
                        onClick={goToNext}
                        disabled={selectedIndex === filteredAssociates.length - 1}
                      >
                        Siguiente
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
