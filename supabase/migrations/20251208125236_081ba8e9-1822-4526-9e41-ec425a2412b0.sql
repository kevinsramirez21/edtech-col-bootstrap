-- Drop the existing function first
DROP FUNCTION IF EXISTS public.get_public_associate_fields();

-- Create the updated function with correo_contacto but without telefono
CREATE OR REPLACE FUNCTION public.get_public_associate_fields()
RETURNS TABLE(
  id uuid, 
  nombre_empresa text, 
  descripcion text, 
  pagina_web text, 
  logo_url text, 
  segmento company_segment, 
  tamano_empresa company_size, 
  servicios text[], 
  ubicacion text, 
  linkedin text, 
  twitter text, 
  fecha_ingreso date,
  correo_contacto text,
  tipo_organizacion text,
  calificacion_colombia_edtech numeric
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    id,
    nombre_empresa,
    descripcion,
    pagina_web,
    logo_url,
    segmento,
    tamano_empresa,
    servicios,
    ubicacion,
    linkedin,
    twitter,
    fecha_ingreso,
    correo_contacto,
    tipo_organizacion,
    calificacion_colombia_edtech
  FROM public.asociados
  WHERE estado = 'activo'::membership_status;
$$;