
# Plan: Implementar Página de Eventos LATAM 2026 con Filtros por País

## Resumen

Transformar la página de eventos actual (que muestra "En construcción") en una página funcional que muestre el calendario completo de eventos EdTech LATAM 2026 con filtros por país. Los datos se basarán en el MD proporcionado con las correcciones verificadas durante la investigación.

---

## Correcciones Verificadas al Calendario

Durante la investigación de cada enlace oficial, se identificaron las siguientes correcciones necesarias:

| Evento | Dato Original | Corrección | Fuente |
|--------|---------------|------------|--------|
| BMI THE Latin America Schools Forum | 4-6 marzo 2026 | **5-6 marzo 2026** | bmiglobaled.com |
| Universidad Palermo (Semana Diseño) | 13-31 julio continuo | **13-17 julio (presencial) + 27-31 julio (virtual)** | palermo.edu |
| 4th LAICSEE | 19-20 junio Lima, Peru | **Estado: Por confirmar** - El organizador (IFERP Academy) indica Tokyo para 2026 | acsee.net |
| ExpoEduc Brasil (Norte-Nordeste) | 23-25 julio Natal | **23-25 julio 2026** (basado en patrón anual) | expoeduc.com.br |

**Eventos verificados como correctos:**
- Congreso Futuro: 12-17 enero, Santiago, Chile
- IFE Conference: 27-29 enero, Monterrey, México
- III Congreso ASCOFAME: 25-27 marzo, Medellín, Colombia
- IV Congreso Educación (UIS): 15-17 abril, Bucaramanga, Colombia
- Bett Brasil: 5-8 mayo, São Paulo, Brasil
- THE Latin America Summit: 12-14 mayo, Barranquilla, Colombia
- LACCEI: 15-17 julio, Santiago, Chile
- 31º CIAED: 27-30 abril, João Pessoa, Brasil
- Edutechnia: 26-28 agosto, Bogotá, Colombia
- ICEF Latin America: 4-6 octubre, Rio de Janeiro, Brasil
- Primer Congreso ALIE: 6-9 septiembre, Curitiba, Brasil

---

## Arquitectura de la Solución

### 1. Estructura de Datos

Crear un archivo de datos TypeScript con todos los eventos:

```text
src/data/eventos-latam-2026.ts
```

Cada evento tendrá:
- id (único)
- nombre
- fechaInicio / fechaFin (formato ISO)
- fechaDisplay (texto legible)
- ciudad
- pais
- modalidad (Presencial | Virtual | Híbrido)
- estado (Confirmado | Tentativo | Por confirmar)
- enlace (URL oficial o null)
- descripcion (opcional)
- categoria (EdTech | Educación Superior | Innovación | etc.)

### 2. Componentes a Crear

**EventCard** (`src/components/ui/event-card.tsx`)
- Tarjeta visual para cada evento
- Muestra: fecha, nombre, ciudad/país, modalidad, estado
- Botón de enlace externo cuando disponible
- Badge de estado (colores según confirmación)
- Icono de bandera del país

**EventFilters** (`src/components/ui/event-filters.tsx`)
- Filtro por país (Select con banderas)
- Filtro por modalidad
- Filtro por mes
- Botón de reset

### 3. Página de Eventos Rediseñada

**`src/pages/Eventos.tsx`**
- Header con título y descripción
- Barra de filtros
- Grid de eventos (responsive)
- Sección de "Eventos adicionales a monitorear"
- Footer con CTA para sugerir eventos

---

## Diseño Visual

### Paleta de Colores para Estados
- **Confirmado**: Verde (bg-green-100, text-green-800)
- **Tentativo**: Amarillo (bg-amber-100, text-amber-800)
- **Por confirmar**: Gris (bg-gray-100, text-gray-600)

### Paleta de Colores para Modalidad
- **Presencial**: Azul (bg-blue-100, text-blue-800)
- **Virtual**: Púrpura (bg-purple-100, text-purple-800)
- **Híbrido**: Teal (bg-teal-100, text-teal-800)

### Países con Banderas
Los países en el calendario son:
- Colombia
- Chile
- México
- Brasil
- Argentina
- Perú
- Virtual (sin país específico)

---

## Datos de Eventos (Lista Completa Verificada)

### Enero 2026
1. **Congreso Futuro 2026** - 12-17 enero - Santiago/regiones - Chile - Presencial - Confirmado - https://congresofuturo.cl
2. **I Congreso Internacional de Educación Digital** - 22-23 enero - Virtual - Virtual - Confirmado - (URL por verificar)
3. **IFE Conference 2026** - 27-29 enero - Monterrey - México - Presencial - Confirmado - https://ifeconference.tec.mx

### Febrero 2026
4. **ICCIHER** - 5 febrero - Medellín - Colombia - Presencial - Confirmado - Por confirmar URL
5. **15º Congreso Internacional de Educación Superior** - 9-13 febrero - Argentina - Presencial - Confirmado - Por confirmar URL
6. **ICCRTP** - 11 febrero - Medellín - Colombia - Presencial - Confirmado - Por confirmar URL
7. **#ELEDU Cajicá** - 26 febrero - Cajicá - Colombia - Presencial - Confirmado - https://interlat.co

### Marzo 2026
8. **BMI THE Latin America Schools Forum** - 5-6 marzo - Bogotá - Colombia - Presencial - Confirmado - https://bmiglobaled.com
9. **II EDUTIC CDMX** - 18-19 marzo - Ciudad de México - México - Presencial - Confirmado - https://conference.edutic.org
10. **GEduc 2026** - 25-27 marzo - São Paulo - Brasil - Presencial - Confirmado - https://geducoficial.com.br
11. **III Congreso Mundial Educación Médica ASCOFAME** - 25-27 marzo - Medellín - Colombia - Presencial - Confirmado - https://congreso2026.ascofame.org.co

### Abril 2026
12. **7º Congreso EDUTIC Online** - 14-16 abril - Virtual - Virtual - Confirmado - https://congreso.edutic.org
13. **IV Congreso Internacional de Educación (UIS)** - 15-17 abril - Bucaramanga - Colombia - Presencial - Confirmado - https://ivcongresointernacionaleducacion.com
14. **UTED Global Education Technology Congress** - 17-18 abril - Medellín - Colombia - Presencial - Confirmado - (URL por verificar)
15. **31º CIAED** - 27-30 abril - João Pessoa - Brasil - Presencial - Confirmado - https://abed.org.br

### Mayo 2026
16. **Bett Brasil 2026** - 5-8 mayo - São Paulo - Brasil - Presencial - Confirmado - https://brasil.bettshow.com
17. **THE Latin America Universities Summit** - 12-14 mayo - Barranquilla - Colombia - Presencial - Confirmado - https://timeshighered-events.com
18. **Congreso DOKUMA 2026** - 28-29 mayo - Bogotá - Colombia - Presencial - Confirmado - https://dokuma.tech

### Junio 2026
19. **#ELEDU Brote Principal** - 4-5 junio - Bogotá - Colombia - Presencial - Confirmado - https://interlat.co
20. **XIII EDUTIC Santiago** - junio 2026 - Santiago - Chile - Presencial - Tentativo - https://event.edutic.org
21. **4th LAICSEE** - 19-20 junio - Lima - Perú - Híbrido - **Por confirmar** - https://acsee.net (nota: verificar sede 2026)

### Julio 2026
22. **Semana Internacional de Diseño UP** - 13-17 julio (presencial) + 27-31 julio (virtual) - Buenos Aires - Argentina - Mixto - Confirmado - https://palermo.edu
23. **LACCEI 2026** - 15-17 julio - Santiago - Chile - Presencial - Confirmado - https://laccei.org
24. **ExpoEduc 2026** - 23-25 julio - Natal - Brasil - Presencial - Confirmado - https://expoeduc.com.br

### Agosto 2026
25. **V EDUTIC Medellín** - agosto 2026 - Medellín - Colombia - Presencial - Tentativo - https://event.edutic.org
26. **Edutechnia 2026** - 26-28 agosto - Bogotá - Colombia - Presencial - Confirmado - https://edutechnia.com

### Septiembre 2026
27. **I EDUTIC Brasil** - septiembre 2026 - Florianópolis - Brasil - Presencial - Tentativo - https://event.edutic.org
28. **Primer Congreso ALIE** - 6-9 septiembre - Curitiba - Brasil - Presencial - Confirmado - https://alie.lat

### Octubre 2026
29. **QS Higher Ed Summit: Americas** - 1-2 octubre - Por verificar - México - Presencial - Confirmado - https://qs.com
30. **VII EDUTIC Lima** - octubre 2026 - Lima - Perú - Presencial - Tentativo - https://event.edutic.org
31. **Foro Educativo Nacional** - octubre 2026 - Bogotá - Colombia - Presencial - Tentativo - Por confirmar
32. **ICEF Latin America** - 4-6 octubre - Rio de Janeiro - Brasil - Presencial - Confirmado - https://icef.com

---

## Implementación Técnica

### Archivos a Crear

1. **`src/data/eventos-latam-2026.ts`** - Datos de todos los eventos
2. **`src/components/ui/event-card.tsx`** - Componente de tarjeta de evento
3. **`src/components/ui/event-filters.tsx`** - Componente de filtros

### Archivos a Modificar

1. **`src/pages/Eventos.tsx`** - Reemplazar contenido "en construcción" por página funcional

### Dependencias Existentes Utilizadas
- React state para filtros
- Componentes UI existentes (Badge, Button, Card, Select)
- Lucide icons (Calendar, MapPin, ExternalLink, Globe, etc.)

---

## Flujo de Usuario

1. Usuario entra a /eventos
2. Ve todos los eventos ordenados cronológicamente
3. Puede filtrar por país usando el Select
4. Puede filtrar por modalidad (Presencial/Virtual/Híbrido)
5. Puede ver eventos de un mes específico
6. Click en evento muestra detalle y botón a enlace oficial
7. Al final, CTA para sugerir eventos

---

## Consideraciones de UX

- Mostrar contador de eventos filtrados
- Indicar claramente cuando no hay resultados
- Scroll suave a resultados después de filtrar
- Responsive: 1 columna en móvil, 2 en tablet, 3 en desktop
- Loading state mientras se filtran eventos
- Empty state cuando no hay eventos que coincidan

---

## Sección Técnica: Estructura del Código

```text
// Estructura del tipo Event
interface Event {
  id: string;
  nombre: string;
  fechaInicio: string;      // ISO format
  fechaFin?: string;        // ISO format  
  fechaDisplay: string;     // "12-17 enero 2026"
  ciudad: string;
  pais: 'Colombia' | 'Chile' | 'México' | 'Brasil' | 'Argentina' | 'Perú' | 'Virtual';
  modalidad: 'Presencial' | 'Virtual' | 'Híbrido';
  estado: 'Confirmado' | 'Tentativo' | 'Por confirmar';
  enlace: string | null;
  descripcion?: string;
  notas?: string;
}

// Filtros
interface EventFilters {
  pais: string | 'todos';
  modalidad: string | 'todos';
  mes: number | null;
}
```

### Lógica de Filtrado

```text
const filteredEvents = useMemo(() => {
  return events.filter(event => {
    if (filters.pais !== 'todos' && event.pais !== filters.pais) return false;
    if (filters.modalidad !== 'todos' && event.modalidad !== filters.modalidad) return false;
    if (filters.mes !== null) {
      const eventMonth = new Date(event.fechaInicio).getMonth() + 1;
      if (eventMonth !== filters.mes) return false;
    }
    return true;
  });
}, [events, filters]);
```
