
# Plan: Mejorar Página de Eventos y Verificar Enlaces

## Resumen de Cambios

Optimizar la página de eventos con un hero más compacto, fondo beige de marca, tarjetas más grandes con descripciones completas, añadir organizadores, y verificar/corregir todos los enlaces de eventos.

---

## 1. Hero Section más Compacto

**Cambios en `src/pages/Eventos.tsx`:**
- Reducir padding del hero de `py-10 sm:py-14 lg:py-16` a `py-6 sm:py-8`
- Reducir tamaño del ícono de `w-16 h-16 sm:w-20 sm:h-20` a `w-12 h-12 sm:w-14 sm:h-14`
- Reducir tamaño del título de `text-3xl sm:text-4xl lg:text-5xl` a `text-2xl sm:text-3xl lg:text-4xl`
- Reducir descripción de `text-lg sm:text-xl` a `text-base sm:text-lg`
- Reducir margin de los badges de `mt-6` a `mt-4`

---

## 2. Fondo Beige (Sand) para la página

**Cambios en `src/pages/Eventos.tsx`:**
- Cambiar fondo del grid de eventos de `bg-background` a `bg-secondary` (beige sand: #F4E8DD)
- Hero: mantener gradiente pero ajustar a `from-secondary via-background to-secondary/50`
- Esto usará el color `sand` ya definido en el sistema de tokens

---

## 3. Tarjetas más Grandes con Descripciones Completas

**Cambios en `src/data/eventos-latam-2026.ts`:**
- Añadir campo `organizador` a la interface `Evento`
- Acortar descripciones a máximo 80-100 caracteres para que quepan sin truncar
- Añadir organizador a cada evento

**Cambios en `src/components/ui/event-card.tsx`:**
- Remover `line-clamp-3` de la descripción para mostrar texto completo
- Añadir sección de "Organiza:" con el nombre del organizador
- Aumentar padding de las tarjetas

---

## 4. Datos Actualizados de Eventos

### Enlaces Corregidos/Actualizados

| Evento | Enlace Anterior | Enlace Correcto |
|--------|-----------------|-----------------|
| LACCEI 2026 | https://laccei.org | https://laccei.org/laccei2026 |
| Universidad Palermo | https://palermo.edu | https://palermo.edu/dyc/congreso-latino |
| ICEF Latin America | https://icef.com | https://icef.com/events/icef-latin-america |
| ALIE 2026 | https://alie.lat | https://alie.lat/congresos |
| #ELEDU Interlat | https://interlat.co | https://interlat.co/eledu |
| BMI THE Latin America | https://bmiglobaled.com | https://bmiglobaled.com/recruit-students/south-america-international-schools-forum-workshop |
| QS Summit Americas | https://qs.com | https://qshesummits.com/americas |

### Organizadores por Evento

| Evento | Organizador |
|--------|-------------|
| Congreso Futuro 2026 | Fundación Congreso Futuro |
| I Congreso Educación Digital | Por confirmar |
| IFE Conference 2026 | Tecnológico de Monterrey |
| ICCIHER | IFERP Academy |
| 15º Congreso Educación Superior | Por confirmar |
| ICCRTP | IFERP Academy |
| #ELEDU Cajicá | Interlat |
| BMI THE Latin America | BMI / Times Higher Education |
| II EDUTIC CDMX | EDUTIC.org |
| GEduc 2026 | HUMUS Brasil |
| III Congreso ASCOFAME | ASCOFAME |
| 7º Congreso EDUTIC Online | EDUTIC.org |
| IV Congreso UIS | Universidad Industrial de Santander |
| UTED | Por confirmar |
| 31º CIAED | ABED Brasil |
| Bett Brasil 2026 | Hyve Group |
| THE Latin America Summit | Times Higher Education |
| Congreso DOKUMA 2026 | DOKUMA Tech |
| #ELEDU Brote Principal | Interlat |
| XIII EDUTIC Santiago | EDUTIC.org |
| 4th LAICSEE | ACSEE / IFERP |
| Semana Diseño UP | Universidad de Palermo |
| LACCEI 2026 | LACCEI / OEA |
| ExpoEduc 2026 | ExpoEduc Brasil |
| V EDUTIC Medellín | EDUTIC.org |
| Edutechnia 2026 | Corferias |
| I EDUTIC Brasil | EDUTIC.org |
| Primer Congreso ALIE | ALIE |
| QS Higher Ed Summit | Quacquarelli Symonds |
| VII EDUTIC Lima | EDUTIC.org |
| Foro Educativo Nacional | Ministerio de Educación Colombia |
| ICEF Latin America | ICEF |

### Descripciones Acortadas (ejemplos)

| Evento | Descripción Nueva (completa, sin truncar) |
|--------|-------------------------------------------|
| Congreso Futuro 2026 | Encuentro científico líder de LATAM con premios Nobel y expertos globales. |
| IFE Conference 2026 | Conferencia del Tec de Monterrey sobre innovación y futuro de la educación. |
| Bett Brasil 2026 | La feria EdTech más grande de Latinoamérica con +300 empresas expositoras. |
| GEduc 2026 | El mayor congreso de gestión educacional de Brasil con +3.000 asistentes. |

---

## 5. Archivos a Modificar

### `src/data/eventos-latam-2026.ts`
- Añadir `organizador: string` a la interface `Evento`
- Actualizar todos los eventos con:
  - Organizador verificado
  - Enlaces corregidos
  - Descripciones más cortas (60-80 caracteres)

### `src/components/ui/event-card.tsx`
- Añadir sección de organizador con ícono `Users` o `Building2`
- Remover `line-clamp-3` de descripción
- Ajustar padding y espaciado

### `src/pages/Eventos.tsx`
- Hero más compacto
- Fondo beige (`bg-secondary`)
- Ajustar gradiente del hero

---

## Visualización Final Esperada

```text
┌─────────────────────────────────────────────────────────┐
│  [Hero Compacto - 1/3 del tamaño actual]                │
│  🌐 Eventos EdTech LATAM 2026                           │
│  Calendario completo de eventos...                      │
│  📅 32 eventos | 🌎 6 países                           │
├─────────────────────────────────────────────────────────┤
│  [Filtros]                                              │
├─────────────────────────────────────────────────────────┤
│  [Fondo Beige Sand]                                     │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ 🇨🇱         │ │ 🇲🇽         │ │ 🇨🇴         │          │
│  │ Congreso   │ │ IFE        │ │ #ELEDU     │          │
│  │ Futuro     │ │ Conference │ │ Cajicá     │          │
│  │            │ │            │ │            │          │
│  │ Encuentro  │ │ Conferencia│ │ Encuentro  │          │
│  │ científico │ │ del Tec de │ │ de líderes │          │
│  │ líder...   │ │ Monterrey  │ │ en educ... │          │
│  │            │ │            │ │            │          │
│  │ 🏢 Fundación│ │ 🏢 Tec de  │ │ 🏢 Interlat│          │
│  │ Cong.Futuro│ │ Monterrey  │ │            │          │
│  │            │ │            │ │            │          │
│  │ [Ver ↗]    │ │ [Ver ↗]    │ │ [Ver ↗]    │          │
│  └────────────┘ └────────────┘ └────────────┘          │
└─────────────────────────────────────────────────────────┘
```

---

## Sección Técnica

### Estructura actualizada de Evento

```typescript
export interface Evento {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin?: string;
  fechaDisplay: string;
  ciudad: string;
  pais: Pais;
  modalidad: Modalidad;
  estado: Estado;
  enlace: string | null;
  descripcion: string;      // Acortada a 60-80 chars
  organizador: string;      // NUEVO
  notas?: string;
}
```

### Nueva sección en EventCard

```tsx
{/* Organizador */}
<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
  <Building2 className="w-3.5 h-3.5" />
  <span>{evento.organizador}</span>
</div>
```

### Fondo beige en página

```tsx
<Section className="py-8 sm:py-12 lg:py-16 bg-secondary">
```
