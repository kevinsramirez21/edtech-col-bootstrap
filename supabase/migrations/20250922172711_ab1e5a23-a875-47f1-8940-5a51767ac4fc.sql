-- Create enum for company segments
CREATE TYPE company_segment AS ENUM ('educacion_basica', 'educacion_superior', 'capacitacion_empresarial', 'educacion_continua', 'edtech_tools', 'infrastructure', 'other');

-- Create enum for company size
CREATE TYPE company_size AS ENUM ('startup', 'pequena', 'mediana', 'grande');

-- Create enum for membership status
CREATE TYPE membership_status AS ENUM ('activo', 'inactivo', 'pendiente');

-- Create asociados table
CREATE TABLE public.asociados (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre_empresa TEXT NOT NULL,
    descripcion TEXT,
    pagina_web TEXT,
    segmento company_segment,
    servicios TEXT[], -- Array of service tags
    correo_contacto TEXT,
    logo_url TEXT,
    ubicacion TEXT,
    fecha_fundacion DATE,
    tamano_empresa company_size,
    estado membership_status NOT NULL DEFAULT 'activo',
    fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
    tipo_membresia TEXT DEFAULT 'basica',
    telefono TEXT,
    linkedin TEXT,
    twitter TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.asociados ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Anyone can view active associates (public information)
CREATE POLICY "Anyone can view active associates" 
ON public.asociados 
FOR SELECT 
USING (estado = 'activo');

-- Only admins can manage associates
CREATE POLICY "Admins can manage associates" 
ON public.asociados 
FOR ALL 
USING (has_role(auth.uid(), 'administrador'::app_role));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_asociados_updated_at
BEFORE UPDATE ON public.asociados
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO public.asociados (
    nombre_empresa, 
    descripcion, 
    pagina_web, 
    segmento, 
    servicios, 
    correo_contacto,
    ubicacion,
    tamano_empresa
) VALUES 
(
    'EduTech Solutions',
    'Plataforma de aprendizaje adaptativo para instituciones educativas con IA avanzada.',
    'https://edutechsolutions.co',
    'educacion_superior',
    ARRAY['LMS', 'Inteligencia Artificial', 'Analytics', 'Evaluación'],
    'contacto@edutechsolutions.co',
    'Bogotá, Colombia',
    'mediana'
),
(
    'Capacita Pro',
    'Soluciones de capacitación empresarial y desarrollo de talento humano.',
    'https://capacitapro.com',
    'capacitacion_empresarial',
    ARRAY['Capacitación', 'E-learning', 'Desarrollo Humano', 'Certificaciones'],
    'info@capacitapro.com',
    'Medellín, Colombia',
    'pequena'
),
(
    'CodeAcademy Kids',
    'Enseñanza de programación y pensamiento computacional para niños y adolescentes.',
    'https://codeacademykids.co',
    'educacion_basica',
    ARRAY['Programación', 'STEM', 'Robótica', 'Pensamiento Computacional'],
    'hola@codeacademykids.co',
    'Cali, Colombia',
    'startup'
);