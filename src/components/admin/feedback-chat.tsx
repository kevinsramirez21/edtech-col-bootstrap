import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  MessageCircle, 
  Send, 
  Loader2, 
  Sparkles,
  User,
  Bot,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FeedbackMessage {
  id: string;
  asociado_id: string;
  mensaje: string;
  rol: "usuario" | "asistente";
  contexto_usado: boolean;
  created_at: string;
}

interface FeedbackChatProps {
  asociadoId: string;
  nombreEmpresa: string;
  onEnrichWithContext: (feedback: string[]) => void;
  isEnriching?: boolean;
}

export function FeedbackChat({ 
  asociadoId, 
  nombreEmpresa, 
  onEnrichWithContext,
  isEnriching = false 
}: FeedbackChatProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  // Fetch feedback messages for this associate
  const { data: messages, isLoading } = useQuery({
    queryKey: ["associate-feedback", asociadoId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asociados_feedback")
        .select("*")
        .eq("asociado_id", asociadoId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as FeedbackMessage[];
    },
    enabled: isOpen,
  });

  // Add new message mutation
  const addMessageMutation = useMutation({
    mutationFn: async (mensaje: string) => {
      const { error } = await supabase
        .from("asociados_feedback")
        .insert({
          asociado_id: asociadoId,
          mensaje,
          rol: "usuario"
        });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["associate-feedback", asociadoId] });
      toast.success("Feedback registrado");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    addMessageMutation.mutate(newMessage.trim());
  };

  const handleEnrichWithContext = () => {
    const feedbackMessages = messages?.map(m => m.mensaje) || [];
    onEnrichWithContext(feedbackMessages);
  };

  const feedbackCount = messages?.length || 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-12 border-dashed hover:border-solid hover:bg-muted/50"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="font-medium">Feedback del Asociado</span>
            {feedbackCount > 0 && (
              <Badge variant="secondary" className="font-mono text-xs">
                {feedbackCount}
              </Badge>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-3">
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          {/* Header */}
          <div className="text-sm text-muted-foreground">
            Registra lo que {nombreEmpresa} ha comentado sobre sus datos. La AI usará este contexto para hacer mejores sugerencias.
          </div>

          {/* Messages area */}
          <ScrollArea className="h-48 rounded-lg border bg-muted/20 p-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : messages && messages.length > 0 ? (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${msg.rol === "asistente" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center ${
                      msg.rol === "usuario" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-violet-500/10 text-violet-600"
                    }`}>
                      {msg.rol === "usuario" ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Bot className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className={`flex-1 rounded-lg px-3 py-2 text-sm ${
                      msg.rol === "usuario"
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-violet-500/5 border border-violet-500/20"
                    }`}>
                      <p className="text-foreground">{msg.mensaje}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(msg.created_at).toLocaleDateString("es-CO", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="h-8 w-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No hay feedback registrado aún
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Escribe lo que el asociado quiere cambiar
                </p>
              </div>
            )}
          </ScrollArea>

          {/* Input area */}
          <div className="flex gap-2">
            <Input
              placeholder="Ej: El asociado dice que su logo está desactualizado..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={addMessageMutation.isPending}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || addMessageMutation.isPending}
            >
              {addMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Enrich with context button */}
          {feedbackCount > 0 && (
            <Button
              className="w-full"
              onClick={handleEnrichWithContext}
              disabled={isEnriching}
            >
              {isEnriching ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Enriquecer con contexto del feedback
            </Button>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
