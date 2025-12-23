-- Create table for storing feedback from associates to provide context for AI enrichment
CREATE TABLE public.asociados_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asociado_id UUID NOT NULL REFERENCES public.asociados(id) ON DELETE CASCADE,
  mensaje TEXT NOT NULL,
  rol TEXT NOT NULL CHECK (rol IN ('usuario', 'asistente')),
  contexto_usado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.asociados_feedback ENABLE ROW LEVEL SECURITY;

-- Create index for faster queries
CREATE INDEX idx_asociados_feedback_asociado_id ON public.asociados_feedback(asociado_id);

-- Only admins can manage feedback
CREATE POLICY "Admins can manage feedback"
ON public.asociados_feedback
FOR ALL
USING (has_role(auth.uid(), 'administrador'::app_role))
WITH CHECK (has_role(auth.uid(), 'administrador'::app_role));