# Assets Integration Guide - Colombia EdTech

Esta guía explica cómo integrar assets reales (logos, fuentes, imágenes) reemplazando los placeholders actuales.

## 1. Logo Principal

### Ubicación Actual
- Componente: `src/components/ui/placeholder-logo.tsx`
- Uso: Navbar y Footer

### Pasos para Reemplazar

1. **Colocar archivo del logo:**
```bash
# Colocar logo en formato SVG (preferido) o PNG
/public/brand/colombia-edtech-logo.svg
# O alternativo:
/public/brand/colombia-edtech-logo.png
```

2. **Actualizar componente:**
```tsx
// src/components/ui/placeholder-logo.tsx
export function ColombiaEdTechLogo({ className }: { className?: string }) {
  return (
    <img
      src="/brand/colombia-edtech-logo.svg"
      alt="Colombia EdTech"
      className={className}
      width="200"    // Ajustar según tamaño real
      height="40"    // Ajustar según tamaño real
    />
  )
}
```

3. **Para mejor performance (Next.js):**
```tsx
import Image from 'next/image'

export function ColombiaEdTechLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/colombia-edtech-logo.svg"
      alt="Colombia EdTech"
      width={200}
      height={40}
      className={className}
      priority // Para el logo principal
    />
  )
}
```

### Especificaciones Recomendadas
- **Formato**: SVG (escalable) o PNG de alta resolución
- **Tamaño**: Mínimo 400x80px para PNG
- **Fondo**: Transparente
- **Variantes**: Logo normal y logo blanco (para fondo oscuro)

## 2. Tipografía Display

### Ubicación Actual
Sistema usa fonts del sistema con fallback preparado

### Pasos para Integrar Fuente Personalizada

1. **Colocar archivos de fuente:**
```bash
# Colocar fuentes en formatos modernos
/public/fonts/display-font-regular.woff2
/public/fonts/display-font-medium.woff2
/public/fonts/display-font-semibold.woff2
/public/fonts/display-font-bold.woff2
```

2. **Crear archivo de configuración:**
```typescript
// src/lib/fonts.ts
import localFont from 'next/font/local'

export const displayFont = localFont({
  src: [
    {
      path: '/fonts/display-font-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/display-font-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/fonts/display-font-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '/fonts/display-font-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
})
```

3. **Actualizar configuración de Tailwind:**
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-display)', 'system-ui', 'sans-serif'],
        // Mantener 'sans' para UI con system fonts
        'sans': ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
}
```

4. **Aplicar en layout:**
```tsx
// src/app/layout.tsx
import { displayFont } from '@/lib/fonts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={displayFont.variable}>
      <body>{children}</body>
    </html>
  )
}
```

5. **Usar en componentes:**
```tsx
// Para títulos principales
<h1 className="font-display text-4xl font-bold">
  Título con fuente personalizada
</h1>

// Para UI mantener sans
<button className="font-sans text-sm">
  Botón con fuente del sistema
</button>
```

## 3. Imágenes de Contenido

### Estructura de Directorios Recomendada
```
/public/images/
├── hero/
│   ├── hero-home.jpg        # 2000x1333px (3:2)
│   ├── hero-about.jpg       # 2000x1333px
│   └── hero-events.jpg      # 2000x1333px
├── content/
│   ├── team/
│   │   ├── director-1.jpg   # 800x800px (1:1)
│   │   └── director-2.jpg   # 800x800px
│   ├── events/
│   │   ├── summit-2024.jpg  # 1200x800px (3:2)
│   │   └── webinar-ai.jpg   # 1200x800px
│   └── blog/
│       ├── post-1.jpg       # 1200x630px (1.9:1)
│       └── post-2.jpg       # 1200x630px
└── misc/
    ├── og-image.jpg         # 1200x630px para OpenGraph
    └── twitter-image.jpg    # 1200x600px para Twitter
```

### Reemplazar Placeholders de Imágenes

1. **Hero Images (Index.tsx):**
```tsx
// Reemplazar el div placeholder por:
<div className="relative">
  <Image
    src="/images/hero/hero-home.jpg"
    alt="Transformamos la educación en Colombia"
    width={2000}
    height={1333}
    className="rounded-2xl shadow-2xl"
    priority
  />
</div>
```

2. **Images en Blog/Eventos:**
```tsx
// En BlogPost.tsx o EventoDetail.tsx
<Image
  src="/images/blog/post-slug.jpg"
  alt="Descripción de la imagen"
  width={1200}
  height={630}
  className="rounded-lg"
/>
```

### Especificaciones de Imágenes
- **Formato**: WebP o AVIF (preferido), JPG como fallback
- **Resolución**: Mínimo 2x el tamaño de visualización
- **Compresión**: Optimizada para web (< 200KB por imagen)
- **Alt text**: Descriptivo y accesible

## 4. Logos de Partners

### Ubicación Actual
Componente `LogoGrid` muestra placeholders SVG generados

### Pasos para Integrar

1. **Colocar logos de partners:**
```bash
/public/brand/partners/
├── universidad-nacional.svg
├── ministerio-educacion.png
├── google-education.svg
├── microsoft-education.svg
├── fundacion-compartir.png
└── ...
```

2. **Crear archivo de configuración:**
```typescript
// src/data/partners.ts
export const partners = [
  {
    name: "Universidad Nacional",
    logo: "/brand/partners/universidad-nacional.svg",
    website: "https://unal.edu.co"
  },
  {
    name: "Ministerio de Educación",
    logo: "/brand/partners/ministerio-educacion.png",
    website: "https://mineducacion.gov.co"
  },
  // ... más partners
]
```

3. **Actualizar componente LogoGrid:**
```tsx
// src/components/ui/logo-grid.tsx
import Image from 'next/image'
import { partners } from '@/data/partners'

export function LogoGrid({ title, columns = 4 }: LogoGridProps) {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-6">{title}</h3>}
      <div className={`grid gap-6 ${gridCols[columns]}`}>
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={80}
              className="max-h-16 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Especificaciones de Logos de Partners
- **Formato**: SVG (preferido) o PNG transparente
- **Tamaño**: 320x160px máximo para PNG
- **Fondo**: Transparente
- **Color**: Preferiblemente versión monocromática

## 5. Meta Images (SEO)

### Crear imágenes para redes sociales

1. **Colocar imágenes:**
```bash
/public/og-image.jpg      # 1200x630px - OpenGraph general
/public/twitter-image.jpg # 1200x600px - Twitter card
```

2. **Actualizar meta tags en index.html:**
```html
<meta property="og:image" content="https://colombiaedtech.org/og-image.jpg" />
<meta name="twitter:image" content="https://colombiaedtech.org/twitter-image.jpg" />
```

## 6. Favicons

### Generar set completo de favicons

1. **Colocar archivos:**
```bash
/public/favicon.ico           # 32x32px
/public/apple-touch-icon.png  # 180x180px
/public/favicon-16x16.png     # 16x16px
/public/favicon-32x32.png     # 32x32px
```

2. **Actualizar meta tags:**
```html
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

## 7. Checklist de Implementación

### Pre-implementación
- [ ] Recopilar todos los assets en formatos apropiados
- [ ] Optimizar imágenes para web
- [ ] Verificar licencias y derechos de uso
- [ ] Crear variantes necesarias (dark/light, diferentes tamaños)

### Implementación
- [ ] Colocar archivos en estructura de directorios
- [ ] Actualizar componentes correspondientes
- [ ] Configurar fuentes personalizadas
- [ ] Actualizar meta tags y SEO
- [ ] Probar en diferentes dispositivos y browsers

### Post-implementación
- [ ] Verificar tiempos de carga
- [ ] Validar accesibilidad (alt texts, contraste)
- [ ] Confirmar responsive design
- [ ] Probar en modo oscuro (si aplica)
- [ ] Validar SEO con herramientas

## 8. Performance Tips

### Optimización de Imágenes
```bash
# Usar herramientas de optimización
npx @next/bundle-analyzer
# O herramientas como:
# - tinypng.com para compresión
# - squoosh.app para formato WebP/AVIF
```

### Lazy Loading
```tsx
// Para imágenes que no son critical
<Image
  src="/images/content/team-photo.jpg"
  alt="Equipo Colombia EdTech"
  width={800}
  height={600}
  loading="lazy" // Carga diferida automática
/>
```

### Preload de Recursos Críticos
```html
<!-- En index.html para recursos críticos -->
<link rel="preload" href="/brand/colombia-edtech-logo.svg" as="image" />
<link rel="preload" href="/fonts/display-font-bold.woff2" as="font" type="font/woff2" crossorigin />
```

## 9. Troubleshooting

### Imágenes no cargan
- Verificar rutas relativas correctas
- Confirmar que archivos estén en `/public/`
- Revisar permisos de archivos
- Validar formatos soportados

### Fuentes no se aplican
- Verificar que archivos `.woff2` estén accesibles
- Confirmar configuración de Tailwind
- Revisar que variable CSS esté definida
- Validar fallbacks del sistema

### Performance Issues
- Comprimir imágenes más agresivamente
- Usar formatos modernos (WebP, AVIF)
- Implementar lazy loading correcto
- Reducir número de variantes de fuente

Esta guía garantiza una integración suave de assets sin reestructurar el código existente.