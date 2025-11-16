-- Create table for ally applications
CREATE TABLE public.solicitudes_aliados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_entidad TEXT NOT NULL,
  tipo_entidad TEXT NOT NULL CHECK (tipo_entidad IN ('publica', 'privada')),
  representante TEXT NOT NULL,
  cargo_representante TEXT NOT NULL,
  pais TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  correo_contacto TEXT NOT NULL,
  telefono TEXT NOT NULL,
  motivo_interes TEXT NOT NULL,
  objetivo_alianza TEXT NOT NULL,
  formas_alianza TEXT[] NOT NULL,
  otras_formas_alianza TEXT,
  beneficios_esperados TEXT[] NOT NULL,
  explicaciones_adicionales TEXT,
  acepta_tratamiento_datos BOOLEAN NOT NULL DEFAULT false,
  acepta_comunicaciones BOOLEAN NOT NULL DEFAULT false,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.solicitudes_aliados ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting ally applications (anyone can apply)
CREATE POLICY "Anyone can submit ally application" 
ON public.solicitudes_aliados 
FOR INSERT 
WITH CHECK (true);

-- Create policy for viewing ally applications (only admins)
CREATE POLICY "Admins can view ally applications" 
ON public.solicitudes_aliados 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'administrador'
  )
);

-- Create policy for updating ally applications (only admins)
CREATE POLICY "Admins can update ally applications" 
ON public.solicitudes_aliados 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'administrador'
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_solicitudes_aliados_updated_at
BEFORE UPDATE ON public.solicitudes_aliados
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();