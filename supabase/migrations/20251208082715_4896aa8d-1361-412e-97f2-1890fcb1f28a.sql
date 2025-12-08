-- Create table for volunteer applications
CREATE TABLE public.solicitudes_voluntarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_completo TEXT NOT NULL,
  correo_electronico TEXT NOT NULL,
  telefono TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  pais TEXT NOT NULL DEFAULT 'Colombia',
  ocupacion TEXT NOT NULL,
  organizacion TEXT,
  linkedin TEXT,
  horas_semanales TEXT NOT NULL,
  areas_interes TEXT[] NOT NULL,
  experiencia_voluntariado TEXT,
  motivacion TEXT NOT NULL,
  como_conocio TEXT,
  acepta_terminos BOOLEAN NOT NULL DEFAULT false,
  acepta_comunicaciones BOOLEAN NOT NULL DEFAULT false,
  estado TEXT NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.solicitudes_voluntarios ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit volunteer application"
ON public.solicitudes_voluntarios
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view volunteer applications"
ON public.solicitudes_voluntarios
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'administrador'::app_role
));

CREATE POLICY "Admins can update volunteer applications"
ON public.solicitudes_voluntarios
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_roles.user_id = auth.uid() 
  AND user_roles.role = 'administrador'::app_role
));

-- Create trigger for updated_at
CREATE TRIGGER update_solicitudes_voluntarios_updated_at
BEFORE UPDATE ON public.solicitudes_voluntarios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();