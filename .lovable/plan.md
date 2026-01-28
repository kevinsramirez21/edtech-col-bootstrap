
# Plan: Transferir Sección "Mundo EdTech" a EdTech Hub Latam

## Resumen

La sección "Mundo EdTech" incluye tres páginas principales conectadas a la misma base de datos Supabase que ya comparten ambos proyectos:
- **Panorama** (`/mundo-edtech/panorama`) - Análisis del futuro de la educación
- **Noticias** (`/mundo-edtech/noticias`) - Listado de noticias EdTech
- **Noticia Detalle** (`/mundo-edtech/noticias/:slug`) - Vista individual de cada noticia

Dado que ambos proyectos ya comparten el mismo Supabase, las noticias creadas en cualquier proyecto aparecerán en ambos.

---

## Archivos a Copiar

### Fase 1: Páginas Principales (3 archivos)

| Archivo | Descripción |
|---------|-------------|
| `src/pages/Panorama.tsx` | Página completa del panorama del futuro de la educación (~1100 líneas) |
| `src/pages/Noticias.tsx` | Listado de noticias con filtros y búsqueda (~394 líneas) |
| `src/pages/NoticiaDetail.tsx` | Vista de detalle de cada noticia (~293 líneas) |

### Fase 2: Componentes UI Compartidos (4 archivos)

| Archivo | Descripción |
|---------|-------------|
| `src/components/ui/section.tsx` | Componente de sección reutilizable |
| `src/components/ui/breadcrumbs.tsx` | Navegación de migas de pan |
| `src/components/content/copy-slot.tsx` | Inyección de contenido MDX |
| `src/lib/seo.ts` | Funciones de SEO y meta tags |

### Fase 3: Contenido MDX (2 archivos)

| Archivo | Descripción |
|---------|-------------|
| `src/content/copies/panorama.mdx` | Contenido del panorama |
| `src/content/copies/noticias.mdx` | Contenido de noticias |

### Fase 4: Panel de Administración de Noticias (2 archivos)

| Archivo | Descripción |
|---------|-------------|
| `src/components/admin/noticias-admin.tsx` | Gestión de noticias (CRUD) |
| `src/components/admin/noticia-form.tsx` | Formulario de crear/editar noticias |

---

## Configuración de Rutas

Agregar en `App.tsx` del proyecto EdTech Hub Latam:

```text
<Route path="/mundo-edtech/panorama" element={<Panorama />} />
<Route path="/mundo-edtech/noticias" element={<Noticias />} />
<Route path="/mundo-edtech/noticias/:slug" element={<NoticiaDetail />} />
```

---

## Dependencias Necesarias

El proyecto debe tener instaladas estas dependencias (probablemente ya las tiene):
- `date-fns` - Formateo de fechas
- `dompurify` - Sanitización de HTML
- `@types/dompurify` - Types para DOMPurify
- `react-helmet-async` - Meta tags SEO
- `lucide-react` - Iconos

---

## Personalización para EdTech Hub Latam

Después de copiar los archivos, adaptar:

1. **Textos y branding**: Cambiar referencias a "Colombia EdTech" por "EdTech Hub Latam"
2. **Meta tags SEO**: Actualizar títulos y descripciones en `generatePageMeta()`
3. **Estilos**: Ajustar colores si el branding es diferente
4. **Navegación**: Agregar enlaces a "Mundo EdTech" en el Navbar

---

## Proceso Paso a Paso

1. **En EdTech Hub Latam**, pide al asistente que cree cada archivo con el contenido que te proporcionaré
2. **Actualiza App.tsx** para agregar las nuevas rutas
3. **Verifica** que los componentes UI (`section`, `breadcrumbs`, `seo`) existan o cópialos
4. **Adapta textos** al branding de EdTech Hub Latam
5. **Prueba** la navegación y que las noticias se carguen desde Supabase

---

## Nota Importante

Como ambos proyectos comparten el mismo Supabase:
- **Las noticias son compartidas**: Una noticia creada en Colombia EdTech aparecerá en EdTech Hub Latam y viceversa
- **El admin de noticias funciona en ambos**: Puedes gestionar noticias desde cualquier proyecto
- **La tabla `noticias` ya existe**: No necesitas crear tablas ni migraciones

---

## Sección Técnica

### Estructura de la tabla `noticias` (ya existe en Supabase compartido)

```text
- id (uuid)
- titulo (text)
- slug (text)
- extracto (text, nullable)
- contenido (text, nullable)
- imagen_portada (text, nullable)
- categoria (text)
- autor (text, nullable)
- fuente (text, nullable)
- url_externa (text, nullable)
- es_externo (boolean)
- destacada (boolean)
- estado (text: 'borrador' | 'publicado')
- fecha_publicacion (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

### Archivos de contenido MDX

Los archivos MDX en `src/content/copies/` contienen textos que pueden ser editados sin tocar código. Se pueden personalizar para cada proyecto.

