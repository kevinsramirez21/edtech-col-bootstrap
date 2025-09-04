# Style Guide - Colombia EdTech

## Design System Overview

Este proyecto utiliza un sistema de tokens de diseño centralizado que garantiza consistencia visual y facilita el mantenimiento.

## Tokens de Diseño

### Colores

Ubicación: `src/lib/tokens.ts` y `src/index.css`

#### Paleta Principal
```css
--primary-900: 213 100% 27%;  /* #003889 */
--primary-700: 225 85% 43%;   /* #0B47CE */
--accent: 350 91% 60%;        /* #F73C5C */
--sand: 28 50% 92%;           /* #F4E8DD */
```

#### Escala de Grises
```css
--gray-900: 0 0% 7%;          /* #111111 */
--gray-700: 0 0% 23%;         /* #3A3A3A */
--gray-500: 0 0% 48%;         /* #7A7A7A */
--gray-300: 220 13% 82%;      /* #D1D5DB */
--gray-50: 0 0% 98%;          /* #FAFAFA */
```

### Uso de Colores

❌ **INCORRECTO - No usar colores directos:**
```tsx
<div className="bg-blue-500 text-white">
```

✅ **CORRECTO - Usar tokens semánticos:**
```tsx
<div className="bg-primary text-primary-foreground">
```

### Tipografía

- **UI**: System fonts (Inter fallback)
- **Display**: System fonts (preparado para fuente personalizada)
- **Escalas**: Definidas en `tokens.ts`

### Espaciado

Usar la escala definida en tokens:
- `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px)
- `xl` (24px), `2xl` (32px), etc.

## Componentes UI

### Estructura de Archivos

```
src/components/ui/
├── button.tsx          # Componente principal con variantes
├── cta-button.tsx      # Botón especializado para CTAs
├── section.tsx         # Contenedor de sección con grid
├── logo-grid.tsx       # Grid de logos con placeholders
├── kpi.tsx            # Componente para métricas
└── ...
```

### Variantes de Botón

```tsx
// Variantes disponibles
<Button variant="default">     // Primary
<Button variant="cta">         // Call-to-action con gradiente
<Button variant="hero">        // Para secciones hero
<Button variant="brand">       // Gradiente de marca
<Button variant="outline">     // Contorno
<Button variant="ghost">       // Sin fondo
```

### Convención de Nombres

1. **Componentes**: PascalCase (`MyComponent`)
2. **Props**: camelCase (`isActive`)
3. **CSS Variables**: kebab-case (`--primary-color`)
4. **Archivos**: kebab-case (`my-component.tsx`)

## Layout y Responsive

### Section Component

```tsx
<Section className="py-16"> // Espaciado vertical estándar
  <SectionHeader 
    title="Título" 
    subtitle="Subtítulo opcional"
    description="Descripción opcional"
    centered={true} // Centra el contenido
  />
  {/* Contenido */}
</Section>
```

### Grid System

- Container máximo: `max-w-7xl mx-auto`
- Padding lateral: `px-4 sm:px-6 lg:px-8`
- Grid responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Accesibilidad

### Focus States

Todos los elementos interactivos deben tener estados de focus visibles:

```tsx
className="focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2"
```

### Semantic HTML

- Usar landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- `aria-current="page"` en links activos
- `aria-label` en botones de iconos
- `role` cuando sea necesario

### Navegación por Teclado

- Tab order lógico
- Skip links implementados
- Menú móvil con focus trap

## Performance

### Lazy Loading

- Imágenes: usar `loading="lazy"`
- Componentes: React.lazy cuando sea apropiado

### Optimización

- Usar `next/image` para imágenes optimizadas
- Minificar assets
- Comprimir imágenes (WebP/AVIF cuando sea posible)

## Ejemplos de Uso

### Página Típica

```tsx
import { Section, SectionHeader } from "@/components/ui/section"
import { CopySlot } from "@/components/content/copy-slot"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

const MyPage = () => {
  return (
    <>
      <Section className="py-8 bg-gray-50">
        <Breadcrumbs items={[{ label: "Mi Página" }]} />
      </Section>
      
      <Section className="py-16">
        <SectionHeader
          title="Título Principal"
          subtitle="Subtítulo"
          description="Descripción de la página"
        />
        <CopySlot file="mi-pagina.mdx" />
      </Section>
    </>
  )
}
```

### Card con KPI

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <KPI 
    value="150+" 
    label="Organizaciones"
    description="Asociadas y aliadas"
    variant="default"
    size="md"
  />
</div>
```

## Best Practices

1. **Consistencia**: Usar siempre los tokens del design system
2. **Reutilización**: Crear variantes en lugar de estilos únicos
3. **Accesibilidad**: Probar con lectores de pantalla
4. **Performance**: Optimizar imágenes y assets
5. **Semántica**: HTML correcto y landmarks apropiados
6. **Responsive**: Mobile-first approach

## Troubleshooting

### Colores no se muestran
- Verificar que los tokens estén en `index.css`
- Confirmar formato HSL correcto
- Revisar que Tailwind esté configurado correctamente

### Componentes no se ven
- Verificar imports correctos
- Confirmar que los estilos se estén aplicando
- Revisar la consola para errores de TypeScript