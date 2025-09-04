# Content Directory - Colombia EdTech

Este directorio contiene los archivos MDX que almacenan el contenido de cada página del sitio web.

## Estructura de Archivos

- `copies/` - Archivos MDX para cada página
  - `home.mdx` - Contenido de la página principal
  - `somos.mdx` - Contenido de la página "Quiénes Somos"
  - `asociados.mdx` - Contenido de organizaciones asociadas
  - `aliados.mdx` - Contenido de aliados estratégicos
  - `voluntariado.mdx` - Contenido del programa de voluntariado
  - `investigacion-politica-publica.mdx` - Contenido de investigación
  - `blog.mdx` - Contenido adicional del blog
  - `eventos.mdx` - Contenido adicional de eventos
  - `contacto.mdx` - Información adicional de contacto
  - `legal.mdx` - Información legal completa

## Formato Estándar para Pegar Contenido

Cada archivo MDX usa delimitadores especiales para identificar las secciones que serán reemplazadas:

### Formato:
```
===START COPY: <NOMBRE_SECCION>===
[Contenido que será reemplazado]
===END COPY===
```

### Ejemplo de uso:
```mdx
# Mi Título

===START COPY: INTRODUCCION===
Este texto será reemplazado por el contenido final aprobado.
===END COPY===

## Subsección

===START COPY: DETALLES===
Aquí va el contenido detallado que será proporcionado más tarde.
===END COPY===
```

## Instrucciones para Agregar Contenido

1. **Identificar la sección**: Localiza el delimitador `===START COPY: <SECCION>===`
2. **Reemplazar contenido**: Sustituye solo el texto entre los delimitadores
3. **Mantener formato MDX**: Usar sintaxis de Markdown para títulos, listas, etc.
4. **Preservar delimitadores**: NO eliminar las líneas de inicio y fin

## Sintaxis MDX Soportada

- Títulos: `# ## ### ####`
- Párrafos: Texto normal
- Listas: `- item` o `1. item`
- Enlaces: `[texto](url)`
- Énfasis: `**negrita**` y `*cursiva*`
- Código: `` `código` `` o bloques con ``` 

## Notas Importantes

- Los archivos están organizados por página del sitio web
- Cada archivo puede tener múltiples secciones delimitadas
- El contenido se renderiza automáticamente en el sitio
- Mantener la estructura de delimitadores para facilitar actualizaciones futuras