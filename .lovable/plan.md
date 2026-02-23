

# Plan: Nueva Sección "Nuestra Posición" con Página "Acuerdo por la Educación"

## Resumen

Crear una nueva sección de navegacion "Nuestra Posicion" con una pagina dedicada al "Acuerdo Basico por la Educacion de Colombia 2030", usando el mismo estilo visual que la pagina Panorama (hero con gradientes, cards con KPIs, secciones alternadas, iconos).

---

## Contenido del PDF (Estructura)

El documento tiene 4 secciones principales:

1. **El Problema**: Sistema educativo desarticulado con 5 datos clave (desercion, NINIs, brecha digital, formacion docente, talento)
2. **Pilar 1 - Sandbox Regulatorio**: Probar primero, regular despues
3. **Pilar 2 - Acuerdos Minimos Curriculares**: Piso de calidad, no curriculo unico
4. **Pilar 3 - Gobernanza y Datos**: Medir para transformar
5. **Llamado a la Accion**: Compromisos por sector (publico, privado, tercer sector)

---

## Cambios a Implementar

### 1. Nueva Pagina: `src/pages/AcuerdoEducacion.tsx`

Pagina con el mismo estilo visual que Panorama.tsx:

- **Hero Section**: Gradiente azul oscuro, titulo "Acuerdo Basico por la Educacion 2030", subtitulo "Reglas del Juego: Educacion en Colombia", badge "Colombia EdTech - Febrero 2026"
- **Seccion El Problema**: Fondo sand, texto del problema + 5 KPI cards con los datos:
  - 6/10 empresas no encuentran talento
  - ~50% desercion en educacion superior
  - 2.3M jovenes NINIs
  - 79.8% hogares rurales sin internet
  - 68% docentes sin formacion en IA
- **Pilar 1 - Sandbox Regulatorio**: Fondo blanco, icono de flask/beaker, descripcion + bullets de propuesta, badges con paises referentes (Singapur, Corea del Sur, Reino Unido, Francia)
- **Pilar 2 - Acuerdos Curriculares**: Fondo gradiente azul (como Panorama Neoeducacion), stat del 29% PISA, propuesta de estandares minimos con 3 bullets
- **Pilar 3 - Gobernanza y Datos**: Fondo sand, 4 propuestas en cards (SUIE, ID unico, datos abiertos, recursos a resultados), mencion de sistemas actuales (SIMAT, SNIES, ICFES, SPADIES)
- **Llamado a la Accion**: 3 columnas (sector publico, privado, tercer sector) con compromisos, frase final: "Probar y luego regular. Ensenar lo que importa. Medir para transformar."
- **CTA Final**: "Colombia EdTech marca la parada. Quien se suma?"

### 2. Actualizar Navegacion: `src/components/layout/navbar.tsx`

Agregar nueva seccion dropdown "Nuestra Posicion" en `navItems`:

```typescript
{
  name: "Nuestra Posición",
  isDropdown: true,
  items: [
    { name: "Acuerdo por la Educación", href: "/nuestra-posicion/acuerdo-educacion" },
  ]
},
```

Ubicacion: despues de "Mundo Edtech" y antes de "Voluntariado".

### 3. Actualizar Rutas: `src/App.tsx`

Agregar:

```typescript
import AcuerdoEducacion from "./pages/AcuerdoEducacion";

// En Routes:
<Route path="/nuestra-posicion/acuerdo-educacion" element={<AcuerdoEducacion />} />
```

---

## Estructura Visual de la Pagina

```text
+--------------------------------------------------+
|  HERO (gradiente azul oscuro)                     |
|  Badge: Colombia EdTech - Febrero 2026            |
|  "Acuerdo Basico por la Educacion 2030"           |
|  "Reglas del Juego: Educacion en Colombia"        |
+--------------------------------------------------+
|  EL PROBLEMA (fondo sand)                         |
|  Texto del problema                               |
|  [KPI] [KPI] [KPI] [KPI] [KPI]  (5 cards)        |
|  Frase: "No faltan diagnosticos. Falta un marco   |
|  comun para actuar."                              |
+--------------------------------------------------+
|  LA PROPUESTA (fondo blanco, intro breve)          |
|  "3 sectores, 3 pilares, un piso comun"           |
+--------------------------------------------------+
|  PILAR 1: SANDBOX (fondo blanco)                  |
|  Icono + Titulo + Descripcion                     |
|  Badges: Singapur, Corea, UK, Francia             |
|  2 bullets de propuesta en cards                  |
+--------------------------------------------------+
|  PILAR 2: CURRICULO (gradiente azul)              |
|  Stat grande: 29% vs 69% PISA                    |
|  3 propuestas en cards claras                     |
+--------------------------------------------------+
|  PILAR 3: DATOS (fondo sand)                      |
|  4 propuestas en grid de cards                    |
|  Sistemas actuales: SIMAT, SNIES, ICFES, SPADIES |
+--------------------------------------------------+
|  LLAMADO A LA ACCION (fondo blanco)               |
|  3 columnas: Publico | Privado | Tercer Sector   |
+--------------------------------------------------+
|  CTA FINAL (gradiente azul)                       |
|  "Probar y luego regular."                        |
|  "Ensenar lo que importa."                        |
|  "Medir para transformar."                        |
|  Boton: Unete / Contactanos                       |
+--------------------------------------------------+
```

---

## Seccion Tecnica

### Archivos a crear:
- `src/pages/AcuerdoEducacion.tsx` (~400-500 lineas, similar a Panorama.tsx)

### Archivos a modificar:
- `src/App.tsx` (agregar import + ruta)
- `src/components/layout/navbar.tsx` (agregar dropdown "Nuestra Posicion")

### Componentes reutilizados:
- `Section` de `@/components/ui/section`
- `Card` de `@/components/ui/card`
- `Badge` de `@/components/ui/badge`
- `Button` de `@/components/ui/button`
- Iconos de `lucide-react`: `AlertTriangle`, `Flask/Beaker`, `BookOpen`, `Database`, `Building2`, `Briefcase`, `Heart`, `ArrowRight`, `Target`, `Shield`, `BarChart3`, `Users`, `GraduationCap`, `Wifi`
- `Helmet` para SEO
- `Link` de react-router-dom

### Patrones de diseno copiados de Panorama.tsx:
- Hero con gradiente `from-primary-900 via-primary-700 to-primary-900`
- Secciones alternadas con fondo `bg-sand` y blanco
- Cards con `border-0 shadow-xl hover:shadow-2xl`
- KPI cards con iconos circulares coloreados
- Linea decorativa bajo titulos de seccion
- Responsive breakpoints consistentes
