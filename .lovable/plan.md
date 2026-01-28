
# Plan: Corregir Enlaces y Fechas Faltantes en Eventos LATAM 2026

## Resumen del Problema

Tras una investigación exhaustiva, identifiqué **6 eventos sin enlaces** y **5 eventos con fechas tentativas**. La investigación reveló que varios eventos necesitan correcciones significativas o deben ser eliminados por falta de información verificable.

---

## Hallazgos de la Investigación

### Eventos a CORREGIR (con nueva información verificada):

| # | Evento | Problema | Solución |
|---|--------|----------|----------|
| 1 | **I Congreso Internacional de Educación Digital** | Sin enlace | ✅ Añadir: `https://educaciondigital.entropiaeducativa.com/` + Organizador: **Entropía Educativa** |
| 2 | **15º Congreso Educación Superior** | Error de ubicación y sin enlace | ✅ Corregir: Es en **La Habana, Cuba** (no Buenos Aires, Argentina). Enlace: `https://www.congresouniversidad.cu/`. Organizador: **Ministerio de Educación Superior de Cuba** |
| 3 | **XIII EDUTIC Santiago** | Fecha tentativa | ✅ Actualizar fecha: **10-11 junio 2026** (Summit día 10, Seminario día 11) |

### Eventos a ELIMINAR (sin información verificable para 2026):

| # | Evento | Razón |
|---|--------|-------|
| 4 | **ICCIHER** | No aparece en el calendario IFERP 2026. Sin evidencia de que exista para 2026 |
| 5 | **ICCRTP** | No aparece en el calendario IFERP 2026. Sin evidencia de que exista para 2026 |
| 6 | **UTED Global Education Technology Congress** | No existe información en ninguna fuente. Evento no verificable |
| 7 | **V EDUTIC Medellín** | No aparece en próximos eventos EDUTIC. Solo se anuncian Santiago, CDMX y CIAED para 2026 |
| 8 | **I EDUTIC Brasil** | No aparece en próximos eventos EDUTIC para 2026 |
| 9 | **VII EDUTIC Lima** | No aparece en próximos eventos EDUTIC para 2026 (el VI fue en 2025) |
| 10 | **Foro Educativo Nacional** | El Foro 2024 sirvió para preparar el Plan Decenal 2026-2035. No hay confirmación de edición 2026 |

### Evento a MARCAR como "Por confirmar":

| # | Evento | Problema | Solución |
|---|--------|----------|----------|
| 11 | **QS Higher Ed Summit: Americas** | 2025 es en Buenos Aires. 2026 no tiene sede confirmada | Cambiar estado a "Por confirmar" y añadir nota: "Sede y fechas 2026 pendientes de anuncio oficial" |

---

## Cambios en el Archivo de Datos

### Archivo: `src/data/eventos-latam-2026.ts`

**Total eventos actuales:** 32
**Eventos después de correcciones:** 24 (eliminando 8 eventos no verificables)

### Correcciones Específicas:

#### 1. I Congreso Internacional de Educación Digital (líneas 71-84)
```typescript
{
  id: 'congreso-educacion-digital-2026',
  nombre: 'I Congreso Internacional de Educación Digital',
  fechaInicio: '2026-01-22',
  fechaFin: '2026-01-23',
  fechaDisplay: '22-23 enero 2026',
  ciudad: 'Virtual',
  pais: 'Virtual',
  modalidad: 'Virtual',
  estado: 'Confirmado',
  enlace: 'https://educaciondigital.entropiaeducativa.com/', // AÑADIDO
  descripcion: 'Escenarios emergentes para la investigación y la educación del futuro.',
  organizador: 'Entropía Educativa', // CORREGIDO
}
```

#### 2. 15º Congreso Educación Superior (líneas 113-126)
```typescript
{
  id: 'universidad-2026-cuba',
  nombre: '15º Congreso Universidad 2026',
  fechaInicio: '2026-02-09',
  fechaFin: '2026-02-13',
  fechaDisplay: '9-13 febrero 2026',
  ciudad: 'La Habana', // CORREGIDO de Buenos Aires
  pais: 'Virtual', // Cambiar a Virtual ya que Cuba no está en la lista de países, o añadir nota
  modalidad: 'Híbrido', // Tiene formato presencial y virtual
  estado: 'Confirmado',
  enlace: 'https://www.congresouniversidad.cu/', // AÑADIDO
  descripcion: 'Congreso internacional de educación superior organizado por Cuba.',
  organizador: 'Ministerio de Educación Superior de Cuba', // CORREGIDO
  notas: 'Sede: La Habana, Cuba. Formato híbrido disponible.',
}
```

#### 3. XIII EDUTIC Santiago (líneas 325-338)
```typescript
{
  id: 'edutic-santiago-2026',
  nombre: 'XIII EDUTIC Santiago',
  fechaInicio: '2026-06-10',
  fechaFin: '2026-06-11',
  fechaDisplay: '10-11 junio 2026', // CORREGIDO
  ciudad: 'Santiago',
  pais: 'Chile',
  modalidad: 'Presencial',
  estado: 'Confirmado', // CORREGIDO de Tentativo
  enlace: 'https://event.edutic.org',
  descripcion: 'Conferencia sobre tecnología educativa e innovación pedagógica en Chile.',
  organizador: 'EDUTIC.org',
  // notas eliminada ya que fecha está confirmada
}
```

#### 4-9. Eventos a ELIMINAR:
- `icciher-2026` (líneas 100-112)
- `iccrtp-2026` (líneas 127-139)
- `uted-2026` (líneas 239-252)
- `edutic-medellin-2026` (líneas 399-412)
- `edutic-brasil-2026` (líneas 428-441)
- `edutic-lima-2026` (líneas 472-485)
- `foro-educativo-nacional-2026` (líneas 486-499)

#### 10. QS Higher Ed Summit (líneas 457-471)
```typescript
{
  id: 'qs-summit-americas-2026',
  nombre: 'QS Higher Ed Summit: Americas',
  fechaInicio: '2026-10-01',
  fechaFin: '2026-10-02',
  fechaDisplay: 'Octubre 2026', // CAMBIAR a genérico
  ciudad: 'Por confirmar',
  pais: 'México', // Mantener como tentativo
  modalidad: 'Presencial',
  estado: 'Por confirmar', // CAMBIAR de Confirmado
  enlace: 'https://qshesummits.com/americas',
  descripcion: 'Cumbre de QS sobre rankings, empleabilidad y estrategias universitarias.',
  organizador: 'Quacquarelli Symonds',
  notas: 'Sede y fechas 2026 pendientes de anuncio oficial. 2025 fue en Buenos Aires.',
}
```

---

## Resumen de Cambios

| Acción | Cantidad | Eventos |
|--------|----------|---------|
| **Añadir enlace** | 2 | I Congreso Educación Digital, 15º Congreso Universidad Cuba |
| **Corregir ubicación** | 1 | 15º Congreso (Argentina → Cuba) |
| **Corregir fecha** | 1 | XIII EDUTIC Santiago (10-11 junio) |
| **Cambiar estado** | 2 | XIII EDUTIC Santiago (Tentativo→Confirmado), QS Summit (Confirmado→Por confirmar) |
| **Eliminar** | 7 | ICCIHER, ICCRTP, UTED, V EDUTIC Medellín, I EDUTIC Brasil, VII EDUTIC Lima, Foro Educativo Nacional |

**Resultado final:** 25 eventos verificados y con información completa

---

## Nota sobre Cuba

El 15º Congreso Universidad 2026 se realiza en **La Habana, Cuba**. Como "Cuba" no está en la lista de países del filtro actual (`PAISES`), tengo dos opciones:

1. **Añadir Cuba a la lista de países** (recomendado)
2. **Mantener el evento pero marcarlo como "Virtual"** (ya que tiene formato híbrido)

Recomiendo la opción 1: añadir Cuba a `PAISES`:
```typescript
{ value: 'Cuba', label: 'Cuba', emoji: '🇨🇺' },
```

---

## Sección Técnica

### Lista final de eventos por mes (25 eventos):

**Enero (3):** Congreso Futuro, I Congreso Educación Digital, IFE Conference
**Febrero (2):** 15º Congreso Universidad Cuba, #ELEDU Cajicá
**Marzo (4):** BMI THE Latin America, II EDUTIC CDMX, GEduc, III Congreso ASCOFAME
**Abril (3):** 7º Congreso EDUTIC Online, IV Congreso UIS, 31º CIAED
**Mayo (3):** Bett Brasil, THE Latin America Summit, Congreso DOKUMA
**Junio (3):** #ELEDU Brote Principal, XIII EDUTIC Santiago, 4th LAICSEE
**Julio (3):** Semana Diseño UP, LACCEI, ExpoEduc
**Agosto (1):** Edutechnia
**Septiembre (1):** Primer Congreso ALIE
**Octubre (2):** QS Higher Ed Summit, ICEF Latin America
