-- Add missing fields to asociados table for the association form
ALTER TABLE public.asociados 
ADD COLUMN IF NOT EXISTS tipo_organizacion text,
ADD COLUMN IF NOT EXISTS nombre_contacto text,
ADD COLUMN IF NOT EXISTS cargo_contacto text,
ADD COLUMN IF NOT EXISTS motivo_asociarse text,
ADD COLUMN IF NOT EXISTS acepta_uso_datos boolean DEFAULT false;

-- Add comment to describe the table
COMMENT ON TABLE public.asociados IS 'Stores information about organizations that want to become associates';

-- Create a public policy to allow anyone to submit association requests
CREATE POLICY "Anyone can submit association request" 
ON public.asociados 
FOR INSERT 
WITH CHECK (true);