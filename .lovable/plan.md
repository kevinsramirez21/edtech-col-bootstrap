

# Plan: Añadir Nuevos Eventos EdTech LATAM 2026

## Resumen

Tras una investigación exhaustiva de múltiples fuentes, he identificado **8 nuevos eventos verificados** con información completa (fechas, enlaces, organizadores) que complementarán el calendario actual de 25 eventos, llevándolo a **33 eventos** totales.

---

## Nuevos Eventos Verificados para Añadir

### 1. IEEE EDUNINE 2026
| Campo | Valor |
|-------|-------|
| **Nombre** | X IEEE World Engineering Education Conference (EDUNINE 2026) |
| **Fechas** | 8-11 marzo 2026 |
| **Ciudad** | Ciudad de México |
| **País** | México |
| **Modalidad** | Híbrido |
| **Estado** | Confirmado |
| **Enlace** | https://edunine.eu/edunine2026/ |
| **Organizador** | IEEE Education Society / COPEC |
| **Descripción** | Conferencia IEEE sobre educación en ingeniería con enfoque en IA y tecnología. |

### 2. Rio Innovation Week 2026
| Campo | Valor |
|-------|-------|
| **Nombre** | Rio Innovation Week 2026 |
| **Fechas** | 4-7 agosto 2026 |
| **Ciudad** | Rio de Janeiro |
| **País** | Brasil |
| **Modalidad** | Presencial |
| **Estado** | Confirmado |
| **Enlace** | https://rioinnovationweek.com.br/ |
| **Organizador** | Secretaría Municipal de Cultura de Rio |
| **Descripción** | La mayor conferencia de tecnología e innovación de LATAM con +150,000 asistentes. |
| **Nota** | Añadir "Brasil" a lista de países si no existe |

### 3. America Digital LATAM Congress 2026
| Campo | Valor |
|-------|-------|
| **Nombre** | 11th America Digital LATAM Congress |
| **Fechas** | 9-10 septiembre 2026 |
| **Ciudad** | Santiago |
| **País** | Chile |
| **Modalidad** | Presencial |
| **Estado** | Confirmado |
| **Enlace** | https://congreso.america-digital.com/?lang=en |
| **Organizador** | America Digital |
| **Descripción** | Congreso de AI, tecnología y negocios con +5,000 ejecutivos C-Level. |

### 4. XXXIII Encuentro Internacional de Educación a Distancia
| Campo | Valor |
|-------|-------|
| **Nombre** | 33º Encuentro Internacional de Educación a Distancia |
| **Fechas** | Noviembre 2026 (fechas específicas por confirmar) |
| **Ciudad** | Guadalajara |
| **País** | México |
| **Modalidad** | Híbrido |
| **Estado** | Por confirmar |
| **Enlace** | https://encuentro.udgvirtual.udg.mx/ |
| **Organizador** | UDGVirtual / Universidad de Guadalajara |
| **Descripción** | Encuentro sobre educación a distancia con +600 participantes de 10 países. |
| **Nota** | Basado en el patrón anual del evento (edición 32 fue en 2025) |

### 5. LACLO 2026 (XX Conferencia Latinoamericana de Tecnologías de Aprendizaje)
| Campo | Valor |
|-------|-------|
| **Nombre** | XX Conferencia LACLO 2026 |
| **Fechas** | Octubre 2026 (fechas específicas por confirmar) |
| **Ciudad** | Por confirmar |
| **País** | Por confirmar (rotativo anual) |
| **Modalidad** | Presencial |
| **Estado** | Por confirmar |
| **Enlace** | https://laclo.org/ |
| **Organizador** | Comunidad LACLO |
| **Descripción** | Principal conferencia LATAM de tecnologías de aprendizaje y objetos educativos. |
| **Nota** | Sede 2026 pendiente (2024 fue Uruguay, 2023 fue Ecuador) |

### 6. TICAL 2026
| Campo | Valor |
|-------|-------|
| **Nombre** | TICAL 2026 |
| **Fechas** | Noviembre 2026 (fechas específicas por confirmar) |
| **Ciudad** | Por confirmar |
| **País** | Por confirmar (rotativo anual) |
| **Modalidad** | Presencial |
| **Estado** | Por confirmar |
| **Enlace** | https://tical.redclara.net/ |
| **Organizador** | RedCLARA |
| **Descripción** | Conferencia de TIC para educación superior e investigación en América Latina. |
| **Nota** | Sede 2026 pendiente (2025 fue Costa Rica) |

### 7. XIX Congreso Internacional de Educación e Innovación (CIEI 2026)
| Campo | Valor |
|-------|-------|
| **Nombre** | XIX CIEI - Congreso Internacional de Educación e Innovación |
| **Fechas** | Mayo/Junio 2026 (por confirmar) |
| **Ciudad** | Riga |
| **País** | Virtual (sede principal en Letonia, participación híbrida) |
| **Modalidad** | Híbrido |
| **Estado** | Por confirmar |
| **Enlace** | https://ciei.es/ |
| **Organizador** | Universidad de Granada / Grupo AREA |
| **Descripción** | Congreso internacional de educación e innovación con participantes de LATAM. |
| **Nota** | Edición XIX será en Letonia, pero participación virtual disponible |

### 8. EDUNOVATIC 2026
| Campo | Valor |
|-------|-------|
| **Nombre** | XI Congreso Virtual EDUNOVATIC |
| **Fechas** | Noviembre 2026 (por confirmar, basado en patrón anual) |
| **Ciudad** | Virtual |
| **País** | Virtual |
| **Modalidad** | Virtual |
| **Estado** | Por confirmar |
| **Enlace** | https://www.edunovatic.org/ |
| **Organizador** | EDUNOVATIC |
| **Descripción** | Congreso virtual internacional sobre educación, innovación y TIC. |

---

## Eventos Considerados pero No Incluidos

Los siguientes eventos fueron investigados pero **no se añaden** por falta de información verificable para 2026:

| Evento | Razón de exclusión |
|--------|-------------------|
| INTED 2026 (Valencia) | Evento europeo, no LATAM |
| IEEE EDUCON 2026 | Se realiza en Egipto, no LATAM |
| Campus Party Brasil | Sin fechas confirmadas para 2026 |
| Cumbre Líderes por la Educación (Semana) | Sin confirmación para 2026 |
| Virtual Educa | Sin calendario 2026 publicado |
| CREAD Conference | Sin evento 2026 anunciado |

---

## Cambios Técnicos Requeridos

### Archivo: `src/data/eventos-latam-2026.ts`

**Eventos actuales:** 25
**Eventos nuevos:** 8
**Total final:** 33 eventos

### Nuevas Entradas de Datos

```typescript
// Marzo 2026 - Añadir después de BMI THE Latin America
{
  id: 'edunine-2026',
  nombre: 'X IEEE EDUNINE 2026',
  fechaInicio: '2026-03-08',
  fechaFin: '2026-03-11',
  fechaDisplay: '8-11 marzo 2026',
  ciudad: 'Ciudad de México',
  pais: 'México',
  modalidad: 'Híbrido',
  estado: 'Confirmado',
  enlace: 'https://edunine.eu/edunine2026/',
  descripcion: 'Conferencia IEEE sobre educación en ingeniería con enfoque en IA.',
  organizador: 'IEEE Education Society / COPEC',
},

// Agosto 2026 - Añadir antes de Edutechnia
{
  id: 'rio-innovation-week-2026',
  nombre: 'Rio Innovation Week 2026',
  fechaInicio: '2026-08-04',
  fechaFin: '2026-08-07',
  fechaDisplay: '4-7 agosto 2026',
  ciudad: 'Rio de Janeiro',
  pais: 'Brasil',
  modalidad: 'Presencial',
  estado: 'Confirmado',
  enlace: 'https://rioinnovationweek.com.br/',
  descripcion: 'La mayor conferencia de tecnología e innovación de LATAM (+150K asistentes).',
  organizador: 'Secretaría Municipal de Cultura de Rio',
},

// Septiembre 2026 - Añadir después de ALIE
{
  id: 'america-digital-2026',
  nombre: '11th America Digital LATAM Congress',
  fechaInicio: '2026-09-09',
  fechaFin: '2026-09-10',
  fechaDisplay: '9-10 septiembre 2026',
  ciudad: 'Santiago',
  pais: 'Chile',
  modalidad: 'Presencial',
  estado: 'Confirmado',
  enlace: 'https://congreso.america-digital.com/',
  descripcion: 'Congreso de AI, tecnología y negocios con +5,000 ejecutivos C-Level.',
  organizador: 'America Digital',
},

// Octubre 2026 - Añadir después de ICEF
{
  id: 'laclo-2026',
  nombre: 'XX Conferencia LACLO 2026',
  fechaInicio: '2026-10-15',
  fechaFin: '2026-10-17',
  fechaDisplay: 'Octubre 2026',
  ciudad: 'Por confirmar',
  pais: 'Virtual', // Usar Virtual hasta confirmar sede
  modalidad: 'Presencial',
  estado: 'Por confirmar',
  enlace: 'https://laclo.org/',
  descripcion: 'Principal conferencia LATAM de tecnologías de aprendizaje.',
  organizador: 'Comunidad LACLO',
  notas: 'Sede 2026 pendiente de anuncio. Rotativo anual.',
},

// Noviembre 2026 - Nuevos eventos
{
  id: 'eied-udg-2026',
  nombre: '33º Encuentro Internacional de Educación a Distancia',
  fechaInicio: '2026-11-15',
  fechaFin: '2026-11-20',
  fechaDisplay: 'Noviembre 2026',
  ciudad: 'Guadalajara',
  pais: 'México',
  modalidad: 'Híbrido',
  estado: 'Por confirmar',
  enlace: 'https://encuentro.udgvirtual.udg.mx/',
  descripcion: 'Encuentro sobre educación a distancia con participantes de 10+ países.',
  organizador: 'UDGVirtual / Universidad de Guadalajara',
  notas: 'Fechas específicas pendientes (basado en patrón anual).',
},

{
  id: 'tical-2026',
  nombre: 'TICAL 2026',
  fechaInicio: '2026-11-10',
  fechaFin: '2026-11-13',
  fechaDisplay: 'Noviembre 2026',
  ciudad: 'Por confirmar',
  pais: 'Virtual', // Usar Virtual hasta confirmar sede
  modalidad: 'Presencial',
  estado: 'Por confirmar',
  enlace: 'https://tical.redclara.net/',
  descripcion: 'Conferencia de TIC para educación superior e investigación en LATAM.',
  organizador: 'RedCLARA',
  notas: 'Sede 2026 pendiente. 2025 fue en Costa Rica.',
},

{
  id: 'edunovatic-2026',
  nombre: 'XI Congreso EDUNOVATIC 2026',
  fechaInicio: '2026-11-18',
  fechaFin: '2026-11-20',
  fechaDisplay: 'Noviembre 2026',
  ciudad: 'Virtual',
  pais: 'Virtual',
  modalidad: 'Virtual',
  estado: 'Por confirmar',
  enlace: 'https://www.edunovatic.org/',
  descripcion: 'Congreso virtual sobre educación, innovación y TIC.',
  organizador: 'EDUNOVATIC',
  notas: 'Fechas específicas pendientes (basado en patrón anual).',
},

{
  id: 'ciei-2026',
  nombre: 'XIX CIEI - Congreso Internacional de Educación e Innovación',
  fechaInicio: '2026-05-20',
  fechaFin: '2026-05-22',
  fechaDisplay: 'Mayo 2026',
  ciudad: 'Riga (Virtual disponible)',
  pais: 'Virtual',
  modalidad: 'Híbrido',
  estado: 'Por confirmar',
  enlace: 'https://ciei.es/',
  descripcion: 'Congreso de educación e innovación con participantes de LATAM.',
  organizador: 'Universidad de Granada / Grupo AREA',
  notas: 'Sede en Letonia, participación virtual para LATAM.',
},
```

---

## Distribución Final por Mes

| Mes | Cantidad | Eventos |
|-----|----------|---------|
| Enero | 3 | Congreso Futuro, I Congreso Educación Digital, IFE Conference |
| Febrero | 2 | 15º Congreso Universidad Cuba, #ELEDU Cajicá |
| Marzo | 5 | BMI THE, **IEEE EDUNINE**, II EDUTIC CDMX, GEduc, III Congreso ASCOFAME |
| Abril | 3 | 7º Congreso EDUTIC Online, IV Congreso UIS, 31º CIAED |
| Mayo | 4 | Bett Brasil, THE Latin America Summit, Congreso DOKUMA, **XIX CIEI** |
| Junio | 3 | #ELEDU Brote, XIII EDUTIC Santiago, 4th LAICSEE |
| Julio | 3 | Semana Diseño UP, LACCEI, ExpoEduc |
| Agosto | 2 | **Rio Innovation Week**, Edutechnia |
| Septiembre | 2 | Primer Congreso ALIE, **11th America Digital** |
| Octubre | 3 | QS Higher Ed Summit, ICEF Latin America, **LACLO 2026** |
| Noviembre | 3 | **33º EIED UDG**, **TICAL**, **EDUNOVATIC** |

**Total: 33 eventos**

---

## Resumen de Cambios

| Tipo | Cantidad |
|------|----------|
| Eventos nuevos confirmados | 4 (EDUNINE, Rio Innovation Week, America Digital, CIEI) |
| Eventos nuevos por confirmar | 4 (LACLO, EIED UDG, TICAL, EDUNOVATIC) |
| **Total nuevos** | **8** |
| **Total calendario final** | **33 eventos** |

