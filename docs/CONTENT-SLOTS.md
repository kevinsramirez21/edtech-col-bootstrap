# Content Slots System - Colombia EdTech

## Qué son los Content Slots

Los Content Slots son un sistema que permite inyectar contenido desde archivos MDX sin modificar los componentes React. Esto separa el contenido de la estructura y facilita las actualizaciones.

## Estructura de Archivos

```
src/content/copies/
├── home.mdx                           # Página principal
├── somos.mdx                          # Quiénes somos
├── asociados.mdx                      # Organizaciones asociadas
├── aliados.mdx                        # Aliados estratégicos
├── voluntariado.mdx                   # Programa de voluntariado
├── investigacion-politica-publica.mdx # Investigación
├── blog.mdx                           # Blog adicional
├── eventos.mdx                        # Eventos adicional
├── contacto.mdx                       # Contacto adicional
└── legal.mdx                          # Información legal
```

## Formato de Delimitadores

### Estructura Básica

```mdx
# Título de la Sección

===START COPY: NOMBRE_SECCION===
Contenido que será reemplazado por el copy final aprobado.
===END COPY===

## Otra Sección

===START COPY: OTRA_SECCION===
Más contenido placeholder que será reemplazado.
===END COPY===
```

### Ejemplo Completo

```mdx
# Sobre Colombia EdTech

===START COPY: INTRO===
Colombia EdTech es el gremio que representa y fortalece el ecosistema de tecnología educativa en Colombia. Trabajamos para conectar organizaciones, impulsar la innovación y desarrollar políticas públicas que transformen la educación nacional.
===END COPY===

## Nuestra Misión

===START COPY: MISION===
Fortalecer el ecosistema EdTech colombiano a través de la representación gremial, la articulación entre actores y el desarrollo de políticas públicas que impulsen la innovación educativa.
===END COPY===

## Nuestros Valores

===START COPY: VALORES===
- **Innovación**: Promovemos la adopción de nuevas tecnologías educativas
- **Colaboración**: Fomentamos la cooperación entre actores del ecosistema
- **Calidad**: Garantizamos estándares de excelencia en educación
- **Equidad**: Trabajamos por el acceso universal a la educación de calidad
===END COPY===
```

## Cómo Usar el Sistema

### 1. Identificar la Página

Cada página del sitio tiene su archivo MDX correspondiente:

- `/` → `home.mdx`
- `/somos` → `somos.mdx`
- `/asociados` → `asociados.mdx`
- etc.

### 2. Localizar la Sección

Busca el delimitador correspondiente:
```
===START COPY: SECCION_QUE_QUIERES_EDITAR===
```

### 3. Reemplazar el Contenido

**❌ INCORRECTO:**
```mdx
# Mi Título
===START COPY: INTRO===
Aquí va mi nuevo contenido...
```

**✅ CORRECTO:**
```mdx
# Mi Título
===START COPY: INTRO===
Aquí va mi nuevo contenido...
===END COPY===
```

## Sintaxis MDX Soportada

### Elementos Básicos

```mdx
# Título Principal (H1)
## Título Secundario (H2)
### Subtítulo (H3)

Párrafo normal con texto.

**Texto en negrita**
*Texto en cursiva*
`Código inline`

- Lista con bullets
- Segundo item
- Tercer item

1. Lista numerada
2. Segundo item
3. Tercer item

[Enlace externo](https://ejemplo.com)
[Enlace interno](/otra-pagina)
```

### Elementos Avanzados

```mdx
> Cita o blockquote importante
> que puede ocupar varias líneas

```javascript
// Bloque de código
const ejemplo = "Hola mundo";
```

| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |
| Dato 4    | Dato 5    | Dato 6    |
```

## Ejemplos por Tipo de Contenido

### 1. Página Institucional (somos.mdx)

```mdx
# Quiénes Somos

===START COPY: HISTORIA===
Colombia EdTech nació en 2020 con la misión de fortalecer el ecosistema de tecnología educativa en el país. Desde entonces, hemos crecido hasta convertirnos en la principal organización gremial del sector.

Nuestro trabajo se centra en tres pilares fundamentales:
- Representación gremial
- Articulación de actores
- Desarrollo de políticas públicas
===END COPY===

## Nuestro Equipo

===START COPY: EQUIPO===
Contamos con un equipo multidisciplinario de expertos en educación, tecnología y políticas públicas:

**Junta Directiva**
- Dr. María González - Presidenta
- Ing. Carlos Rodríguez - Vicepresidente
- Dra. Ana López - Secretaria

**Equipo Técnico**
- Especialistas en EdTech
- Investigadores en políticas educativas
- Coordinadores de programas
===END COPY===
```

### 2. Página de Servicios (asociados.mdx)

```mdx
# Organizaciones Asociadas

===START COPY: BENEFICIOS===
## Beneficios de Asociarse

Al unirte a Colombia EdTech obtienes:

### Representación
- Voz en decisiones del sector
- Participación en políticas públicas
- Representación ante entidades gubernamentales

### Networking
- Acceso a eventos exclusivos
- Conexión con otros miembros
- Oportunidades de colaboración

### Recursos
- Investigaciones del sector
- Herramientas especializadas
- Asesoría técnica
===END COPY===

===START COPY: PROCESO===
## Proceso de Asociación

1. **Solicitud**: Completa el formulario de aplicación
2. **Evaluación**: Revisamos tu perfil organizacional
3. **Aprobación**: La junta directiva evalúa tu solicitud
4. **Bienvenida**: Recibes tu kit de bienvenida y accesos

**Requisitos:**
- Ser una organización legalmente constituida
- Operar en el sector EdTech colombiano
- Cumplir con estándares de calidad
===END COPY===
```

### 3. Página de Recursos (investigacion-politica-publica.mdx)

```mdx
# Investigación y Política Pública

===START COPY: ESTUDIOS_DESTACADOS===
## Estudios Destacados

### Estado del EdTech en Colombia 2023
Análisis comprehensivo del ecosistema educativo tecnológico nacional, incluyendo tendencias, desafíos y oportunidades.

**Hallazgos principales:**
- Crecimiento del 45% en startups EdTech
- Adopción del 60% en instituciones educativas
- Inversión de $50M USD en el sector

[Descargar estudio completo](link-al-pdf)

### Políticas Públicas para la Transformación Digital Educativa
Propuesta de marco regulatorio para impulsar la adopción tecnológica en educación.

**Recomendaciones clave:**
- Infraestructura tecnológica universal
- Formación docente en competencias digitales
- Marcos de calidad para EdTech
===END COPY===
```

## Best Practices

### ✅ Qué SÍ hacer

1. **Mantener delimitadores**: Nunca eliminar las líneas `===START COPY:` y `===END COPY===`
2. **Usar Markdown apropiado**: Títulos, listas, enlaces, etc.
3. **Contenido relevante**: Asegurar que el copy sea apropiado para la sección
4. **Revisar sintaxis**: Validar que el Markdown esté bien formateado

### ❌ Qué NO hacer

1. **Eliminar delimitadores**: Nunca borrar las líneas de inicio y fin
2. **Mezclar secciones**: No combinar contenido de diferentes secciones
3. **HTML directo**: Evitar tags HTML, usar Markdown
4. **Enlaces rotos**: Verificar que todos los enlaces funcionen

## Troubleshooting

### El contenido no aparece
- Verificar que el archivo MDX exista
- Confirmar que los delimitadores estén correctos
- Revisar la sintaxis Markdown

### Error de compilación
- Validar que no haya caracteres especiales problemáticos
- Verificar que las listas y títulos estén bien formateados
- Confirmar que los enlaces tengan formato correcto

### Contenido se ve mal
- Revisar la jerarquía de títulos (H1, H2, H3)
- Verificar espaciado entre elementos
- Confirmar que las listas estén bien estructuradas

## Soporte

Para dudas sobre el sistema de Content Slots:
1. Revisar esta documentación
2. Verificar ejemplos en archivos existentes
3. Contactar al equipo técnico

El sistema está diseñado para ser simple y robusto, permitiendo actualizaciones de contenido sin afectar la estructura del sitio.