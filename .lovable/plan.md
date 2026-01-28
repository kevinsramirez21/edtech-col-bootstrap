

# Plan: Agregar Sección EdTech Hub Latam en Homepage

## Resumen

Agregar una sección promocional llamativa que invite a los usuarios a conocer **EdTech Hub Latam** - la expansión regional de Colombia EdTech. Esta sección se ubicará después de "Imagina un mundo donde todas las personas encuentran propósito..." y antes de "¿Por qué seguir haciendo lo mismo si el mundo ya cambió?".

---

## Diseño Visual Propuesto

La sección será visualmente distintiva con:

- **Fondo con gradiente diferenciado** - Usando tonos que representen la expansión regional (azul profundo → turquesa/verde azulado)
- **Mapa o iconografía de Latinoamérica** - Representación visual del alcance regional
- **Animaciones sutiles** - Elementos flotantes y efectos de entrada
- **Badge/etiqueta** - "🌎 NUEVO" o "REGIONAL" para destacar la novedad
- **CTA prominente** - Botón llamativo que abra https://edtechhublatam.org/ en nueva pestaña

---

## Contenido de la Sección

**Título principal:**
> "Llevamos la revolución EdTech a toda **Latinoamérica**"

**Subtítulo:**
> "EdTech Hub Latam conecta ecosistemas educativos de Argentina, México, Chile, Perú, Brasil y más países para acelerar la transformación de la educación en la región."

**Elementos destacados (3 cards o iconos):**
1. 🌎 **+10 Países** - Ecosistemas EdTech conectados
2. 🤝 **Red Regional** - Colaboración transfronteriza
3. 🚀 **Oportunidades** - Expansión y alianzas internacionales

**CTA:**
> "Conoce EdTech Hub Latam →" (enlace externo)

---

## Ubicación en el Código

```text
Línea 255: </Section> ← Fin de "Inspirational Vision Section"

[NUEVA SECCIÓN: EdTech Hub Latam]

Línea 257: {/* Mission & Impact Section Premium */}
```

---

## Implementación Técnica

### Archivo a modificar
- `src/pages/Index.tsx`

### Cambios específicos

1. **Agregar nueva sección** entre líneas 255-257 con:
   - Gradiente de fondo distintivo (turquesa/verde azulado para diferenciarlo)
   - Efectos de fondo premium (blur, gradientes radiales)
   - Contenido centrado con animaciones
   - Badge "NUEVO" o icono de globo
   - Grid de 3 elementos destacados
   - Botón CTA que abre enlace externo

2. **Iconos a utilizar** (ya disponibles en lucide-react):
   - `Globe2` o `Globe` - Para representar lo regional
   - `MapPin` - Para países
   - `Handshake` - Para colaboración
   - `Rocket` - Para oportunidades
   - `ExternalLink` - Para el CTA

### Código de ejemplo para el CTA externo:
```tsx
<a 
  href="https://edtechhublatam.org/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="..."
>
  Conoce EdTech Hub Latam
  <ExternalLink className="w-5 h-5" />
</a>
```

---

## Paleta de Colores Propuesta

Para diferenciar esta sección del resto:

- **Gradiente principal**: `from-teal-900 via-cyan-800 to-teal-900` o similar con tonos turquesa/verde azulado
- **Acento**: El mismo `accent-brand` (rojo) para mantener coherencia
- **Texto**: Blanco con opacidades para jerarquía

Alternativamente, podría usar un gradiente que combine el azul corporativo con tonos más cálidos para representar la diversidad regional.

---

## Resultado Esperado

Una sección que:
1. ✅ Sea visualmente distintiva pero coherente con el diseño
2. ✅ Comunique claramente la expansión regional
3. ✅ Tenga un CTA claro que lleve a https://edtechhublatam.org/
4. ✅ Sea responsive (móvil, tablet, desktop)
5. ✅ Use animaciones sutiles para engagement

