# Misión Educación · Terremoto 2026

Nueva página pública en `/mision-educacion`, inspirada en la estructura de la Asociación de Emprendedores pero con nuestros tres caminos de entrada y foco educativo.

## Estructura de la página

1. **Hero con tres caminos** (lo que más te gustó)
   - Titular tipo "El terremoto golpeó la educación. Queremos conocerte."
   - Subtítulo con la promesa: mapear, visibilizar y conectar la respuesta educativa.
   - Tres tarjetas que llevan directo a su formulario:
     - *Hago parte de una organización afectada* — alcaldías, gobernaciones, secretarías de educación, instituciones educativas.
     - *Tengo una solución o estoy trabajando en territorio* — empresas EdTech, fundaciones, iniciativas activas.
     - *Quiero aportar mi tiempo* — voluntariado, conectar, acompañar.
   - Nota corta: registro gratuito, toma pocos minutos.

2. **La crisis no dura dos semanas: dura años**
   - Narrativa de educacionismo: territorios olvidados, infraestructura débil, respuesta de largo plazo.
   - Cuatro pasos numerados: Conocer · Mapear · Canalizar · Acompañar.

3. **La dimensión del impacto**
   - Grid de tarjetas por departamento (Risaralda, Valle, Quindío, Caldas, Antioquia, Cauca) + indicadores porcentuales + bloque resumen con fecha de corte.
   - Cifras fijas en el código con placeholders claros para que me pases los datos reales del mapeo.

4. **¿Qué haremos con tu registro?**
   - Cuatro tarjetas: mapear el caso, amplificar la voz, conectar oportunidades, construir comunidad.
   - Aviso honesto: no garantizamos ayuda económica; sí visibilidad y conexión.

5. **Formularios** (uno por camino, ancla propia, misma página)
   - Cada uno multi-paso corto (2–3 pasos) con barra de progreso, igual al patrón del formulario de voluntariado ya existente.
   - **Organización afectada:** entidad, tipo (alcaldía / gobernación / secretaría / IE / otra), departamento, municipio, contacto, afectaciones (infraestructura, conectividad, materiales, docentes, continuidad escolar), población estudiantil afectada, necesidades prioritarias, descripción libre.
   - **Solución / territorio:** organización, tipo, contacto, tipo de aporte (tecnología, contenidos, formación, infraestructura, financiación, logística), cobertura geográfica, descripción de la solución o del trabajo en territorio, enlace, disponibilidad.
   - **Aportar tiempo:** nombre, contacto, ciudad, perfil/ocupación, horas semanales, áreas en las que puede ayudar, experiencia, motivación.
   - Todos con consentimiento de tratamiento de datos y de comunicaciones, y confirmación visual al enviar.

6. **Cierre**
   - "No estás solo en esto" con logos de Colombia EdTech y aliados de la misión.

## Estilo

Usa los tokens semánticos existentes del proyecto (nada hardcodeado, compatible con modo oscuro). Tomo de la referencia la composición —hero con degradado, tarjetas suaves con bordes redondeados, números grandes en las métricas, pasos numerados— pero con nuestra paleta e identidad, sin copiar sus colores.

## Detalles técnicos

- Ruta nueva `/mision-educacion` en `src/App.tsx` + entrada en el navbar.
- Tabla nueva `public.mision_educacion_registros` con:
  - `tipo_registro` (organizacion_afectada | solucion_territorio | voluntario_tiempo)
  - campos comunes (nombre, organización, cargo, correo, teléfono, departamento, municipio)
  - `detalle jsonb` con las respuestas específicas de cada camino
  - `estado` con default `pendiente`, timestamps + trigger `updated_at`
  - GRANT `INSERT` a `anon` y `authenticated`, `ALL` a `service_role`; RLS: cualquiera puede enviar, solo administradores pueden ver y actualizar.
- Componentes nuevos en `src/components/mision-educacion/` (hero, narrativa, impacto, qué haremos, los tres formularios).
- Cifras de impacto en un archivo de constantes para actualizarlas en un solo lugar.
- SEO: title y meta description propios de la página.
- Pendiente para después (fuera de este alcance): panel de administración para ver los registros y sección de video/reel.
