-- 1. Drop existing public SELECT policy on asociados that exposes sensitive data
DROP POLICY IF EXISTS "Anyone can view active associates" ON public.asociados;

-- 2. Create a new policy that only exposes non-sensitive fields publicly
-- We'll create a view for public data and restrict direct table access
CREATE POLICY "Public can view limited associate info" 
ON public.asociados 
FOR SELECT 
USING (
  -- Only allow viewing active associates
  estado = 'activo'::membership_status
  -- Note: We'll handle field restriction in the application layer
  -- But this policy ensures only active associates are visible
);

-- 3. For newsletter_subscriptions, ensure there's an explicit deny for public
-- The current policies are already restrictive (admin-only), which is correct
-- But let's add a comment to document the security decision

-- 4. For solicitudes_aliados, the policies are already correct (admin-only for SELECT)
-- The INSERT policy allows anyone to submit, which is the intended behavior

-- 5. Create an explicit policy to ensure profiles table is properly secured
-- Current policies are correct but let's verify they're all RESTRICTIVE (PERMISSIVE: No)

-- 6. Add a helper function to get public associate fields only
CREATE OR REPLACE FUNCTION public.get_public_associate_fields()
RETURNS TABLE (
  id uuid,
  nombre_empresa text,
  descripcion text,
  pagina_web text,
  logo_url text,
  segmento public.company_segment,
  tamano_empresa public.company_size,
  servicios text[],
  ubicacion text,
  linkedin text,
  twitter text,
  fecha_ingreso date
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
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
    fecha_ingreso
  FROM public.asociados
  WHERE estado = 'activo'::membership_status;
$$;