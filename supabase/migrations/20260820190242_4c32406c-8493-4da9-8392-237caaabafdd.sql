CREATE TABLE public.ciclos_voluntariado (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  lider_nombre text,
  activo boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ciclos_voluntariado TO authenticated;
GRANT ALL ON public.ciclos_voluntariado TO service_role;
ALTER TABLE public.ciclos_voluntariado ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage cycles" ON public.ciclos_voluntariado
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'administrador'::app_role))
  WITH CHECK (has_role(auth.uid(), 'administrador'::app_role));

CREATE TABLE public.responsables_ciclo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ciclo_id uuid NOT NULL REFERENCES public.ciclos_voluntariado(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.responsables_ciclo TO authenticated;
GRANT ALL ON public.responsables_ciclo TO service_role;
ALTER TABLE public.responsables_ciclo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage cycle owners" ON public.responsables_ciclo
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'administrador'::app_role))
  WITH CHECK (has_role(auth.uid(), 'administrador'::app_role));

CREATE TRIGGER update_ciclos_voluntariado_updated_at
  BEFORE UPDATE ON public.ciclos_voluntariado
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_responsables_ciclo_updated_at
  BEFORE UPDATE ON public.responsables_ciclo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.solicitudes_voluntarios
  ADD COLUMN ciclo_id uuid REFERENCES public.ciclos_voluntariado(id) ON DELETE SET NULL,
  ADD COLUMN responsable_id uuid REFERENCES public.responsables_ciclo(id) ON DELETE SET NULL;

CREATE INDEX idx_responsables_ciclo_ciclo_id ON public.responsables_ciclo(ciclo_id);
CREATE INDEX idx_solicitudes_voluntarios_responsable ON public.solicitudes_voluntarios(responsable_id);