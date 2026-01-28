
# Plan: Transferir Sección "Mundo EdTech" a EdTech Hub Latam

## ✅ Estado: LISTO PARA TRANSFERIR

Todos los archivos han sido revisados. Ve al proyecto **EdTech Hub Latam** y pega este mensaje:

---

## Instrucción para EdTech Hub Latam

**Crea la sección "Mundo EdTech" con los siguientes archivos del proyecto Colombia EdTech:**

### Archivos a crear:

1. **Páginas principales:**
   - `src/pages/Panorama.tsx` - Página del panorama de educación (1100 líneas)
   - `src/pages/Noticias.tsx` - Listado de noticias EdTech
   - `src/pages/NoticiaDetail.tsx` - Detalle de cada noticia

2. **Componentes UI:**
   - `src/components/ui/section.tsx` - Componente de sección
   - `src/components/ui/breadcrumbs.tsx` - Navegación breadcrumbs

3. **Lib:**
   - `src/lib/seo.ts` - Funciones SEO

4. **Contenido MDX:**
   - `src/content/copies/panorama.mdx`
   - `src/content/copies/noticias.mdx`

5. **Admin (opcional):**
   - `src/components/admin/noticias-admin.tsx`
   - `src/components/admin/noticia-form.tsx`

### Rutas a agregar en App.tsx:

```tsx
<Route path="/mundo-edtech/panorama" element={<Panorama />} />
<Route path="/mundo-edtech/noticias" element={<Noticias />} />
<Route path="/mundo-edtech/noticias/:slug" element={<NoticiaDetail />} />
```

### Dependencias necesarias:
- `date-fns`
- `dompurify` + `@types/dompurify`
- `react-helmet-async`

### Después de crear:
1. Cambiar "Colombia EdTech" por "EdTech Hub Latam" en los textos
2. Actualizar meta tags SEO en `generatePageMeta()`
3. Agregar enlace "Mundo EdTech" en el Navbar

### Nota importante:
Ambos proyectos comparten el mismo Supabase, así que las noticias se sincronizarán automáticamente.

---

## Contenido de los Archivos

Los archivos están listos en el proyecto Colombia EdTech. El asistente en EdTech Hub Latam puede:
1. Pedirte que copies/pegues el contenido de cada archivo
2. O usar una referencia cruzada si tiene acceso

