-- Create noticias table for blog/news system
CREATE TABLE public.noticias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  extracto TEXT,
  contenido TEXT,
  imagen_portada TEXT,
  categoria TEXT NOT NULL DEFAULT 'General',
  autor TEXT,
  fuente TEXT,
  url_externa TEXT,
  es_externo BOOLEAN NOT NULL DEFAULT false,
  destacada BOOLEAN NOT NULL DEFAULT false,
  estado TEXT NOT NULL DEFAULT 'borrador',
  fecha_publicacion TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;

-- Public can view published news
CREATE POLICY "Anyone can view published news"
ON public.noticias
FOR SELECT
USING (estado = 'publicado');

-- Admins can manage all news
CREATE POLICY "Admins can manage all news"
ON public.noticias
FOR ALL
USING (has_role(auth.uid(), 'administrador'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_noticias_updated_at
BEFORE UPDATE ON public.noticias
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for slug lookups
CREATE INDEX idx_noticias_slug ON public.noticias(slug);

-- Create index for filtering by category and status
CREATE INDEX idx_noticias_categoria_estado ON public.noticias(categoria, estado);