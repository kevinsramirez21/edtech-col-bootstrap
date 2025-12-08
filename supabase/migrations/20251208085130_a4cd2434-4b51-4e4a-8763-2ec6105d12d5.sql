-- Create enrichment suggestions table
CREATE TABLE public.asociados_enrichment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asociado_id uuid NOT NULL REFERENCES public.asociados(id) ON DELETE CASCADE,
  campo text NOT NULL, -- 'logo_url', 'linkedin', 'twitter', 'servicios', 'tamano_empresa'
  valor_actual text,
  valor_sugerido text,
  confianza text CHECK (confianza IN ('alta', 'media', 'baja')),
  fuente text,
  verificado boolean DEFAULT false,
  aprobado boolean DEFAULT null, -- null=pendiente, true=aprobado, false=rechazado
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(asociado_id, campo) -- Solo una sugerencia por campo por asociado
);

-- Enable RLS
ALTER TABLE public.asociados_enrichment ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage enrichment data"
ON public.asociados_enrichment
FOR ALL
USING (has_role(auth.uid(), 'administrador'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_asociados_enrichment_updated_at
BEFORE UPDATE ON public.asociados_enrichment
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_asociados_enrichment_asociado_id ON public.asociados_enrichment(asociado_id);
CREATE INDEX idx_asociados_enrichment_verificado ON public.asociados_enrichment(verificado);