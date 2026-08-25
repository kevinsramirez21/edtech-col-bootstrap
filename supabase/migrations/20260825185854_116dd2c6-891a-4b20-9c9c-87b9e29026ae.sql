ALTER TABLE public.solicitudes_voluntarios
ADD COLUMN IF NOT EXISTS estado_proceso text NOT NULL DEFAULT 'pendiente_primer_contacto';