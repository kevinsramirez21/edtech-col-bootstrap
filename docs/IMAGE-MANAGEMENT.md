# Colombia EdTech - Sistema de Gestión de Imágenes

## Estructura de Archivos

Todas las imágenes deben subirse a la carpeta `public/images/` con los siguientes nombres específicos:

### Imágenes Requeridas

```
public/
└── images/
    ├── logo-colombia-edtech.svg          # Logo principal Colombia EdTech
    ├── logo-colombia-edtech-white.svg    # Logo blanco para fondos oscuros
    ├── hero-bg.jpg                       # Imagen de fondo del hero (1920x1080px)
    ├── edtechs-card.jpg                  # Imagen para tarjeta EdTechs (870x580px)
    ├── aliados-card.jpg                  # Imagen para tarjeta Aliados (870x580px)
    ├── voluntarios-card.jpg              # Imagen para tarjeta Voluntarios (870x580px)
    └── placeholder.jpg                   # Imagen de respaldo (400x300px)
```

## Especificaciones Técnicas

### Tamaños Recomendados
- **Hero Background**: 1920x1080px (16:9) - Formato JPG, máximo 500KB
- **Cards de Segmentación**: 870x580px (3:2) - Formato JPG, máximo 300KB
- **Logo Principal**: Formato SVG para máxima calidad
- **Logo Blanco**: Formato SVG para fondos oscuros

### Calidad y Optimización
- **JPG**: Calidad 80-85% para balance entre tamaño y calidad
- **SVG**: Optimizado con herramientas como SVGO
- **Alt Text**: Descriptivo para SEO y accesibilidad

## Instrucciones para Usuarios No-Técnicos

### Cómo Subir Imágenes

1. **Acceder a los archivos del proyecto**
   - En Lovable, click en "Dev Mode" (arriba izquierda)
   - Navegar a `public/images/`

2. **Subir imagen específica**
   - Drag & drop o click "Upload"
   - **IMPORTANTE**: Usar EXACTAMENTE el nombre especificado arriba
   - Ejemplo: `hero-bg.jpg` (no `hero-background.jpg` o `Hero-BG.JPG`)

3. **Verificar la carga**
   - La imagen debe aparecer automáticamente en la página
   - Si no aparece, verificar el nombre del archivo

### Reemplazar Imágenes Existentes

1. **Eliminar imagen anterior** (si existe)
2. **Subir nueva imagen con el MISMO nombre**
3. **Refrescar el navegador** para ver cambios

## Rutas de Implementación en Código

```tsx
// Hero Background
backgroundImage: `url('/images/hero-bg.jpg')`

// Cards de Segmentación
<OptimizedImage 
  src="/images/edtechs-card.jpg" 
  alt="EdTechs - Transformando la educación"
/>

// Logo en Header
<img src="/images/logo-colombia-edtech.svg" alt="Colombia EdTech" />
```

## Troubleshooting

### Imagen no aparece
- ✅ Verificar nombre exacto del archivo
- ✅ Confirmar que está en `public/images/`
- ✅ Refrescar navegador (Ctrl+F5)
- ✅ Verificar formato (JPG para fotos, SVG para logos)

### Imagen se ve pixelada
- ✅ Verificar tamaño mínimo recomendado
- ✅ Usar formato correcto (JPG para fotos, SVG para gráficos)
- ✅ Optimizar calidad vs tamaño de archivo

## Componente Reutilizable

El sistema utiliza `OptimizedImage` component que incluye:
- ✅ Loading states elegantes
- ✅ Fallbacks automáticos
- ✅ Optimización de carga
- ✅ Responsive design
- ✅ Accesibilidad integrada