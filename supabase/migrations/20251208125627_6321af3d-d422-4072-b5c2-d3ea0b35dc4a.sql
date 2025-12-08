-- Remove the public SELECT policy that exposes all columns
DROP POLICY IF EXISTS "Public can view limited associate info" ON public.asociados;

-- The public must use get_public_associate_fields() RPC function instead
-- which only exposes safe, non-sensitive fields
-- Admin access remains through the "Admins can manage associates" policy