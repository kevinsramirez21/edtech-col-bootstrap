

# Optimizacion Visual de la Pagina "Acuerdo por la Educacion"

## Problemas Detectados

1. **"La Propuesta" y "Pilar 1" se funden**: Ambas secciones tienen fondo blanco, sin separacion visual. Se sienten como una sola seccion.
2. **Cards del Pilar 1 poco visibles**: Fondo gradient "from-white to-gray-50/30" es practicamente invisible sobre fondo blanco.
3. **Ritmo de colores desbalanceado**: Hay dos secciones blancas consecutivas (Propuesta + Pilar 1), y luego otra blanca (Llamado a la Accion) que tambien se pierde.
4. **Cards del Pilar 3** podrian tener mas presencia visual con bordes laterales de color.

## Solucion: Nuevo Ritmo de Fondos

```text
Hero           -> gradiente azul (se mantiene)
El Problema    -> sand (se mantiene)
La Propuesta   -> blanco (se mantiene, pero se fusiona visualmente CON los 3 pilares como intro)
Pilar 1        -> gray-50 con borde superior de color (CAMBIAR de blanco)
Pilar 2        -> gradiente azul (se mantiene)
Pilar 3        -> sand (se mantiene)
Llamado        -> gray-50 (CAMBIAR de blanco para separar de sand)
CTA Final      -> gradiente azul (se mantiene)
```

## Cambios Especificos

### 1. Seccion "La Propuesta" - Hacerla mas compacta y con separador visual

- Reducir padding vertical (es una intro breve, no necesita tanto espacio)
- Agregar un borde inferior sutil o un separador visual con gradiente
- Agregar los 3 numeros de los pilares como preview visual (circulos con 1, 2, 3) debajo de los badges de sector

### 2. Pilar 1 - Cambiar fondo a `bg-gray-50` para separar de la propuesta

- Cambiar `bg-white` a `bg-gray-50` en la Section
- Dar a las cards fondo blanco puro con un borde izquierdo de color (`border-l-4 border-primary-700`)
- Quitar el gradient sutil de las cards que no se nota

### 3. Pilar 1 Cards - Mejorar diseño

- Agregar `border-l-4 border-primary-700` a la primera card y `border-l-4 border-accent` a la segunda
- Fondo `bg-white` solido en vez del gradient invisible
- Aumentar ligeramente el padding

### 4. Pilar 3 Cards - Agregar borde lateral de color

- Agregar `border-l-4 border-primary-700` para que las cards tengan mas presencia sobre el fondo sand
- Alternar colores de borde entre primary y accent

### 5. Seccion "Llamado a la Accion" - Cambiar fondo

- Cambiar de `bg-white` a `bg-gray-50` para separar visualmente del Pilar 3 (sand)
- Las 3 cards de sectores ya tienen colores fuertes, asi que se veran bien en cualquier fondo

### 6. Ajustes menores de espaciado

- Reducir padding de "La Propuesta" de `py-10 sm:py-14 md:py-20` a `py-8 sm:py-10 md:py-14` (es una intro corta)
- Asegurar que cada pilar tenga suficiente padding para "respirar"

---

## Seccion Tecnica

### Archivo a modificar:
- `src/pages/AcuerdoEducacion.tsx`

### Cambios linea por linea:

**Linea 111** - La Propuesta: reducir padding
- De: `py-10 sm:py-14 md:py-20 bg-white`
- A: `py-8 sm:py-10 md:py-14 bg-white border-b border-gray-300/50`

**Linea 129** - Pilar 1: cambiar fondo
- De: `py-10 sm:py-14 md:py-20 bg-white`
- A: `py-10 sm:py-14 md:py-20 bg-gray-50`

**Lineas 159, 174** - Pilar 1 cards: mejorar estilo
- Card 1: cambiar `bg-gradient-to-br from-white to-gray-50/30` a `bg-white border-l-4 border-l-primary-700`
- Card 2: cambiar `bg-gradient-to-br from-white to-gray-50/30` a `bg-white border-l-4 border-l-accent`

**Lineas 306** - Pilar 3 cards: agregar borde lateral
- Cambiar `bg-white border-0` a `bg-white border-0 border-l-4 border-l-primary-700` para cards impares y `border-l-accent` para pares (usando indice del map)

**Linea 337** - Llamado a la Accion: cambiar fondo
- De: `py-10 sm:py-14 md:py-20 bg-white`
- A: `py-10 sm:py-14 md:py-20 bg-gray-50`

### Resultado visual esperado:

```text
Hero           [gradiente azul]
El Problema    [sand]         -- contraste con azul
La Propuesta   [blanco]       -- separador inferior
Pilar 1        [gray-50]      -- se diferencia de propuesta
Pilar 2        [gradiente azul] -- contraste fuerte
Pilar 3        [sand]         -- coherente con problema
Llamado        [gray-50]      -- se diferencia de sand
CTA Final      [gradiente azul] -- cierre fuerte
```

Cada seccion ahora tiene un fondo distinto al de sus vecinas, creando ritmo visual claro.

