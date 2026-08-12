ALTER TABLE public.solicitudes_voluntarios
  ADD COLUMN IF NOT EXISTS sobre_ti text,
  ADD COLUMN IF NOT EXISTS estado_actual text,
  ADD COLUMN IF NOT EXISTS universidad_programa text,
  ADD COLUMN IF NOT EXISTS trabaja_edtech text,
  ADD COLUMN IF NOT EXISTS anios_experiencia text,
  ADD COLUMN IF NOT EXISTS equipo_principal text,
  ADD COLUMN IF NOT EXISTS equipo_secundario text,
  ADD COLUMN IF NOT EXISTS habilidades_equipo text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS experiencia_area text,
  ADD COLUMN IF NOT EXISTS expectativas text,
  ADD COLUMN IF NOT EXISTS aporte_equipo text,
  ADD COLUMN IF NOT EXISTS varita_magica text,
  ADD COLUMN IF NOT EXISTS duracion_compromiso text,
  ADD COLUMN IF NOT EXISTS interes_liderazgo text,
  ADD COLUMN IF NOT EXISTS area_liderazgo text,
  ADD COLUMN IF NOT EXISTS confirma_video boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS confirma_no_remunerado boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS confirma_horas boolean NOT NULL DEFAULT false;

ALTER TABLE public.solicitudes_voluntarios
  ALTER COLUMN ocupacion DROP NOT NULL,
  ALTER COLUMN areas_interes SET DEFAULT '{}'::text[];