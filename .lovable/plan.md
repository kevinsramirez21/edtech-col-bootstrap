

# Plan: Restaurar Lenguaje Original del PDF en Acuerdo por la Educacion

## Problema

La pagina actual reescribio el contenido del PDF con lenguaje tipico de AI: frases tipo "no es X, es Y", em dashes decorativos, y reformulaciones innecesarias. El documento original ya fue redactado cuidadosamente y debe respetarse tal cual.

---

## Cambios Linea por Linea

### Archivo: `src/pages/AcuerdoEducacion.tsx`

### 1. Hero - Quitar subtitulo inventado (linea 64)

**Actual:** "No es un plan de gobierno. Es un piso comun para que todos -- sector publico, privado y tercer sector -- jueguen con las mismas reglas."

**Accion:** Eliminar esta linea. No existe en el PDF.

---

### 2. El Problema - Texto principal (lineas 82-85)

**Actual:** "El sistema educativo colombiano no esta roto por falta de voluntad. Esta desarticulado. El sector publico regula sin experimentar. El privado innova sin marco. El tercer sector conecta sin datos. Cada uno empuja, pero no hacia el mismo lado."

**Original PDF:** "El sistema educativo colombiano esta desarticulado. El sector publico disena politicas desde Bogota, el sector privado innova por su cuenta y el tercer sector interviene donde puede. Cada uno con su agenda, sin rendicion de cuentas compartida."

---

### 3. La Propuesta - Intro (lineas 120-123)

**Actual:** "Este acuerdo plantea 3 pilares que unen a los 3 sectores bajo un piso comun. No es un curriculo unico ni una politica publica cerrada. Es un marco de accion compartido."

**Original PDF:** "Colombia EdTech convoca a los tres sectores (publico, privado y tercer sector) a un acuerdo minimo basado en tres pilares. Un piso comun desde el cual trabajar juntos."

---

### 4. Pilar 1 - Descripcion completa (lineas 147-150)

**Actual:** "Colombia regula la innovacion educativa antes de probarla. Eso frena al sector privado, limita la experimentacion y deja al pais rezagado frente a modelos que ya funcionan en el mundo."

**Original PDF:** "Colombia ya lo hizo en telecomunicaciones con la Resolucion 5980 de 2020. Singapur y Corea del Sur usaron el mismo principio para transformar sus sistemas educativos. Reino Unido y Francia ya operan sandbox especificos para EdTech. Colombia tiene el precedente legal, mas de 500 instituciones de educacion y un ecosistema de mas de 140 organizaciones EdTech activas. Falta adaptar el modelo al sector educativo."

---

### 5. Pilar 1 - Cards de propuestas (lineas 163-196)

**Actual:** Dos cards con titulos inventados ("Zona de pruebas controlada" y "Regulacion basada en evidencia") con texto resumido.

**Original PDF - Card 1:**
- Titulo: "Sandbox Nacional de Innovacion Educativa"
- Texto: "Crear un Sandbox Nacional de Innovacion Educativa donde soluciones EdTech se prueben en instituciones reales, con metricas claras, evaluacion independiente y proteccion de datos obligatoria."

**Original PDF - Card 2:**
- Titulo: "Cohortes con resultados publicos"
- Texto: "Cohortes de 12 a 24 meses. Resultados publicos. Lo que funciona, se escala. Lo que no, se descarta."

---

### 6. Pilar 2 - Stat PISA corregir (linea 226)

**Actual:** "de los estudiantes colombianos alcanzan nivel minimo de competencia en lectura (PISA)"

**Original PDF:** "de los estudiantes colombianos alcanzo el nivel minimo de competencia en matematicas" (PISA 2022, OECD 2023)

---

### 7. Pilar 2 - Stat OCDE (linea 232)

**Actual:** "es el promedio OCDE. Colombia esta 40 puntos porcentuales por debajo."

**Original PDF:** "es el promedio OCDE (OECD, 2023). Esa brecha no se cierra con mas cobertura. Se cierra con claridad sobre que se debe ensenar y a que nivel."

---

### 8. Pilar 2 - Las 3 cards de propuestas (lineas 239-254)

**Actual:** Cards inventadas ("Estandares minimos por nivel", "Pensamiento computacional + IA", "Evaluacion por competencias") con textos resumidos.

**Original PDF - 3 propuestas:**
1. "Definir estandares minimos de competencias por nivel educativo en areas prioritarias: matematicas, lectura, pensamiento computacional, habilidades socioemocionales, ingles y otras."
2. "Que estos estandares sean el referente para evaluar calidad. No la cantidad de horas en aula ni el cumplimiento burocratico de programas."
3. "Que cualquier institucion pueda innovar en el como, siempre que cumpla con el que."

---

### 9. Pilar 2 - Intro (linea 218 area)

**Actual:** Solo dice "Piso de calidad, no curriculo unico."

**Agregar despues:** "Proponemos acuerdos minimos sobre que competencias debe alcanzar un estudiante en cada nivel, en materias clave. Un estandar que permita medir, comparar y mejorar, sin eliminar la autonomia pedagogica de las instituciones."

---

### 10. Pilar 3 - Descripcion (lineas 281-284)

**Actual:** "Colombia tiene datos educativos dispersos en SIMAT, SNIES, ICFES y SPADIES. Ninguno se habla entre si. Sin datos integrados no hay politica publica efectiva."

**Original PDF:** "Lo que no se mide, no se mejora. Lo que no se publica, no se fiscaliza. Colombia tiene datos educativos valiosos dispersos en sistemas que no se comunican entre si: SIMAT, SNIES, ICFES, SPADIES. Hoy no hay forma de seguir la trayectoria de un estudiante desde primaria hasta el mercado laboral. Sin esa trazabilidad, toda politica publica opera a ciegas."

---

### 11. Pilar 3 - Cards de propuestas (lineas 289-309)

Restaurar textos al original del PDF:

- **SUIE:** "Integrar las bases de datos existentes en una plataforma interoperable, con dashboards publicos en tiempo real."
- **ID Unico:** "Un identificador unico estudiantil que permita el seguimiento longitudinal de trayectorias educativas."
- **Datos abiertos:** "Datos abiertos con licencias reutilizables para que investigadores, EdTechs y la ciudadania puedan fiscalizar el sistema."
- **Recursos a resultados:** "Vincular la asignacion de recursos publicos a resultados verificables de calidad, equidad y pertinencia laboral."

---

### 12. Pilar 3 - Frase faltante

**Agregar despues de las cards:** "Este es el pilar mas complejo y el mas incomodo politicamente. Por eso es el mas necesario."

---

### 13. Llamado a la Accion - Texto intro (linea 346)

**Actual:** "El cambio no depende de un solo sector. Cada uno tiene compromisos concretos."

**Original PDF:** "Este acuerdo pide reglas claras para trabajar juntos."

---

### 14. Llamado a la Accion - Compromisos por sector (lineas 358-410)

**Actual:** Listas largas inventadas con 4 items cada una.

**Original PDF (simple y directo):**
- **Sector publico:** "Implementar un sandbox educativo piloto y abrir los datos del sistema."
- **Sector privado:** "Transparencia en resultados cuando se reciban recursos publicos."
- **Tercer sector:** "Compartir datos de impacto en formato abierto."

---

### 15. Frase final faltante antes del CTA

**Agregar:** "El marco legal existe. La capacidad existe. Los actores comprometidos existen. Falta firmar."

---

## Resumen de Cambios

| Seccion | Tipo de cambio |
|---------|---------------|
| Hero | Eliminar subtitulo inventado |
| El Problema | Restaurar texto original |
| La Propuesta | Restaurar texto original |
| Pilar 1 descripcion | Restaurar texto completo del PDF |
| Pilar 1 cards | Restaurar propuestas originales |
| Pilar 2 stat PISA | Corregir "lectura" a "matematicas" |
| Pilar 2 stat OCDE | Restaurar texto completo |
| Pilar 2 cards | Reemplazar con 3 propuestas originales |
| Pilar 2 intro | Agregar parrafo faltante |
| Pilar 3 descripcion | Restaurar texto completo |
| Pilar 3 cards | Restaurar textos originales |
| Pilar 3 frase | Agregar "el pilar mas incomodo" |
| Llamado a la accion intro | Restaurar texto original |
| Llamado a la accion cards | Simplificar a texto original (1 item por sector) |
| CTA | Agregar frase "Falta firmar" |

**Archivo modificado:** `src/pages/AcuerdoEducacion.tsx` (unico archivo, solo cambios de texto)

