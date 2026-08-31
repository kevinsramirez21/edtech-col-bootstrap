CREATE TABLE public.mision_educacion_registros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_registro text NOT NULL,
  nombre text NOT NULL,
  organizacion text,
  cargo text,
  correo text NOT NULL,
  telefono text,
  departamento text,
  municipio text,
  detalle jsonb NOT NULL DEFAULT '{}'::jsonb,
  acepta_tratamiento_datos boolean NOT NULL DEFAULT false,
  acepta_comunicaciones boolean NOT NULL DEFAULT false,
  estado text NOT NULL DEFAULT 'pendiente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.mision_educacion_registros TO anon;
GRANT SELECT, INSERT, UPDATE ON public.mision_educacion_registros TO authenticated;
GRANT ALL ON public.mision_educacion_registros TO service_role;

ALTER TABLE public.mision_educacion_registros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit mision educacion registro"
ON public.mision_educacion_registros FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view mision educacion registros"
ON public.mision_educacion_registros FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'administrador'::app_role));

CREATE POLICY "Admins can update mision educacion registros"
ON public.mision_educacion_registros FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'administrador'::app_role))
WITH CHECK (has_role(auth.uid(), 'administrador'::app_role));

CREATE TRIGGER update_mision_educacion_registros_updated_at
BEFORE UPDATE ON public.mision_educacion_registros
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();