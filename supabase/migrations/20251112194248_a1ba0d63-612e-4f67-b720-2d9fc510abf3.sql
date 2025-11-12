-- Add Colombia EdTech rating column to asociados table
ALTER TABLE public.asociados 
ADD COLUMN calificacion_colombia_edtech numeric CHECK (calificacion_colombia_edtech >= 1 AND calificacion_colombia_edtech <= 5);

COMMENT ON COLUMN public.asociados.calificacion_colombia_edtech IS 'Calificación de Colombia EdTech de 1 a 5 estrellas';