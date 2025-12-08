import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  Play, 
  Pause, 
  Check, 
  X, 
  ExternalLink, 
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  User,
  ListChecks
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndividualEnrichment } from "./individual-enrichment";

interface Enrichment {
  id: string;
  asociado_id: string;
  campo: string;
  valor_actual: string | null;
  valor_sugerido: string | null;
  confianza: "alta" | "media" | "baja";
  fuente: string | null;
  verificado: boolean;
  aprobado: boolean | null;
  created_at: string;
  asociados?: {
    nombre_empresa: string;
  };
}

interface Associate {
  id: string;
  nombre_empresa: string;
  pagina_web: string | null;
}

const BATCH_SIZE = 5;
const BATCH_DELAY = 3000; // 3 seconds between batches

export function EnrichmentAdmin() {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [currentCompany, setCurrentCompany] = useState<string | null>(null);
  const [confirmApproveAll, setConfirmApproveAll] = useState(false);

  // Fetch pending enrichments
  const { data: enrichments, isLoading: loadingEnrichments } = useQuery({
    queryKey: ["enrichments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asociados_enrichment")
        .select(`
          *,
          asociados!inner(nombre_empresa)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Enrichment[];
    },
  });

  // Fetch associates for processing
  const { data: associates } = useQuery({
    queryKey: ["associates-for-enrichment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asociados")
        .select("id, nombre_empresa, pagina_web")
        .eq("estado", "activo")
        .order("nombre_empresa");

      if (error) throw error;
      return data as Associate[];
    },
  });

  // Approve enrichment mutation
  const approveMutation = useMutation({
    mutationFn: async ({ enrichmentId, asociadoId, campo, valor }: { 
      enrichmentId: string; 
      asociadoId: string; 
      campo: string; 
      valor: string | null;
    }) => {
      // Update the asociado field
      let updateData: Record<string, unknown> = {};
      
      if (campo === "servicios" && valor) {
        updateData[campo] = JSON.parse(valor);
      } else {
        updateData[campo] = valor;
      }

      const { error: updateError } = await supabase
        .from("asociados")
        .update(updateData)
        .eq("id", asociadoId);

      if (updateError) throw updateError;

      // Mark as approved
      const { error: enrichmentError } = await supabase
        .from("asociados_enrichment")
        .update({ aprobado: true, verificado: true })
        .eq("id", enrichmentId);

      if (enrichmentError) throw enrichmentError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrichments"] });
      queryClient.invalidateQueries({ queryKey: ["associates"] });
      toast.success("Dato aprobado y actualizado");
    },
    onError: (error) => {
      toast.error(`Error al aprobar: ${error.message}`);
    },
  });

  // Reject enrichment mutation
  const rejectMutation = useMutation({
    mutationFn: async (enrichmentId: string) => {
      const { error } = await supabase
        .from("asociados_enrichment")
        .update({ aprobado: false, verificado: true })
        .eq("id", enrichmentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrichments"] });
      toast.success("Sugerencia rechazada");
    },
    onError: (error) => {
      toast.error(`Error al rechazar: ${error.message}`);
    },
  });

  // Process a single associate
  const processAssociate = async (associate: Associate): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke("enrich-associate", {
        body: { asociado_id: associate.id },
      });

      if (error) {
        console.error(`Error processing ${associate.nombre_empresa}:`, error);
        return false;
      }

      console.log(`Processed ${associate.nombre_empresa}:`, data);
      return true;
    } catch (error) {
      console.error(`Error processing ${associate.nombre_empresa}:`, error);
      return false;
    }
  };

  // Start batch processing
  const startProcessing = async () => {
    if (!associates || associates.length === 0) {
      toast.error("No hay asociados para procesar");
      return;
    }

    setIsProcessing(true);
    setIsPaused(false);
    setProgress({ current: 0, total: associates.length });

    let processed = 0;
    let errors = 0;

    for (let i = 0; i < associates.length; i += BATCH_SIZE) {
      if (isPaused) {
        toast.info("Procesamiento pausado");
        break;
      }

      const batch = associates.slice(i, i + BATCH_SIZE);
      
      for (const associate of batch) {
        if (isPaused) break;
        
        setCurrentCompany(associate.nombre_empresa);
        const success = await processAssociate(associate);
        
        if (success) {
          processed++;
        } else {
          errors++;
        }
        
        setProgress({ current: processed + errors, total: associates.length });
      }

      // Wait between batches to avoid rate limits
      if (i + BATCH_SIZE < associates.length && !isPaused) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
      }
    }

    setIsProcessing(false);
    setCurrentCompany(null);
    queryClient.invalidateQueries({ queryKey: ["enrichments"] });
    
    toast.success(`Procesamiento completado: ${processed} exitosos, ${errors} errores`);
  };

  // Approve all high confidence enrichments
  const approveAllHighConfidence = async () => {
    const highConfidence = enrichments?.filter(
      e => e.confianza === "alta" && !e.verificado
    ) || [];

    let approved = 0;
    for (const enrichment of highConfidence) {
      try {
        await approveMutation.mutateAsync({
          enrichmentId: enrichment.id,
          asociadoId: enrichment.asociado_id,
          campo: enrichment.campo,
          valor: enrichment.valor_sugerido,
        });
        approved++;
      } catch {
        // Error already handled in mutation
      }
    }

    toast.success(`${approved} sugerencias de alta confianza aprobadas`);
    setConfirmApproveAll(false);
  };

  // Stats
  const stats = {
    pending: enrichments?.filter(e => !e.verificado).length || 0,
    approved: enrichments?.filter(e => e.aprobado === true).length || 0,
    rejected: enrichments?.filter(e => e.aprobado === false).length || 0,
    highConfidence: enrichments?.filter(e => e.confianza === "alta" && !e.verificado).length || 0,
  };

  const getConfianzaBadge = (confianza: string) => {
    switch (confianza) {
      case "alta":
        return <Badge className="bg-green-500">Alta</Badge>;
      case "media":
        return <Badge className="bg-yellow-500">Media</Badge>;
      case "baja":
        return <Badge className="bg-red-500">Baja</Badge>;
      default:
        return <Badge variant="outline">{confianza}</Badge>;
    }
  };

  const getCampoLabel = (campo: string) => {
    const labels: Record<string, string> = {
      linkedin: "LinkedIn",
      twitter: "Twitter/X",
      logo_url: "Logo URL",
      servicios: "Servicios",
      tamano_empresa: "Tamaño",
    };
    return labels[campo] || campo;
  };

  const formatValue = (campo: string, valor: string | null) => {
    if (!valor) return <span className="text-muted-foreground italic">Sin valor</span>;
    
    if (campo === "servicios") {
      try {
        const servicios = JSON.parse(valor);
        return servicios.join(", ");
      } catch {
        return valor;
      }
    }

    if (campo === "linkedin" || campo === "twitter" || campo === "logo_url") {
      return (
        <a 
          href={valor} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-1"
        >
          {valor.length > 40 ? valor.substring(0, 40) + "..." : valor}
          <ExternalLink className="h-3 w-3" />
        </a>
      );
    }

    return valor;
  };

  const pendingEnrichments = enrichments?.filter(e => !e.verificado) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Enriquecimiento de Datos</h2>
        <p className="text-muted-foreground">
          Usa IA para buscar y completar información de los asociados
        </p>
      </div>

      {/* Tabs for different modes */}
      <Tabs defaultValue="individual" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="individual" className="gap-2">
            <User className="h-4 w-4" />
            Individual
          </TabsTrigger>
          <TabsTrigger value="batch" className="gap-2">
            <ListChecks className="h-4 w-4" />
            Por Lotes
          </TabsTrigger>
        </TabsList>

        {/* Individual enrichment mode */}
        <TabsContent value="individual">
          <IndividualEnrichment />
        </TabsContent>

        {/* Batch enrichment mode */}
        <TabsContent value="batch" className="space-y-6">
          {/* Header with actions */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div></div>
        
        <div className="flex gap-2">
          {!isProcessing ? (
            <Button onClick={startProcessing} className="gap-2">
              <Play className="h-4 w-4" />
              Iniciar Enriquecimiento
            </Button>
          ) : (
            <Button 
              onClick={() => setIsPaused(true)} 
              variant="outline"
              className="gap-2"
            >
              <Pause className="h-4 w-4" />
              Pausar
            </Button>
          )}
          
          {stats.highConfidence > 0 && (
            <Button 
              variant="secondary" 
              onClick={() => setConfirmApproveAll(true)}
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Aprobar Alta Confianza ({stats.highConfidence})
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar during processing */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Procesando: {currentCompany}</span>
                <span>{progress.current} / {progress.total}</span>
              </div>
              <Progress value={(progress.current / progress.total) * 100} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pendientes</CardDescription>
            <CardTitle className="text-2xl">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Aprobados</CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.approved}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rechazados</CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.rejected}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Alta Confianza</CardDescription>
            <CardTitle className="text-2xl text-blue-600">{stats.highConfidence}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Pending enrichments table */}
      <Card>
        <CardHeader>
          <CardTitle>Sugerencias Pendientes de Verificación</CardTitle>
          <CardDescription>
            Revisa cada sugerencia antes de aprobarla. Los datos se actualizarán solo al aprobar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingEnrichments ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : pendingEnrichments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No hay sugerencias pendientes</p>
              <p className="text-sm">Inicia el enriquecimiento para buscar datos</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Campo</TableHead>
                  <TableHead>Valor Actual</TableHead>
                  <TableHead>Valor Sugerido</TableHead>
                  <TableHead>Confianza</TableHead>
                  <TableHead>Fuente</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingEnrichments.map((enrichment) => (
                  <TableRow key={enrichment.id}>
                    <TableCell className="font-medium">
                      {enrichment.asociados?.nombre_empresa}
                    </TableCell>
                    <TableCell>{getCampoLabel(enrichment.campo)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {formatValue(enrichment.campo, enrichment.valor_actual)}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {formatValue(enrichment.campo, enrichment.valor_sugerido)}
                    </TableCell>
                    <TableCell>{getConfianzaBadge(enrichment.confianza)}</TableCell>
                    <TableCell className="max-w-[150px] truncate text-sm text-muted-foreground">
                      {enrichment.fuente}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => approveMutation.mutate({
                            enrichmentId: enrichment.id,
                            asociadoId: enrichment.asociado_id,
                            campo: enrichment.campo,
                            valor: enrichment.valor_sugerido,
                          })}
                          disabled={approveMutation.isPending}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => rejectMutation.mutate(enrichment.id)}
                          disabled={rejectMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Confirm approve all dialog */}
      <AlertDialog open={confirmApproveAll} onOpenChange={setConfirmApproveAll}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Aprobar todas las sugerencias de alta confianza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto aprobará {stats.highConfidence} sugerencias con confianza "alta" y actualizará 
              los datos de los asociados automáticamente. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={approveAllHighConfidence}>
              Aprobar Todas
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
