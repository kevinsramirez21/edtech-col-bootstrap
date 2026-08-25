# Columna de estado del proceso en Voluntarios

Agregar a la tabla de voluntarios una nueva columna "Estado del proceso" que se pueda actualizar directamente desde la tabla con un menú desplegable.

## Estados disponibles

- Pendiente de primer contacto (por defecto)
- Primer contacto realizado
- Agendado para Assessment
- Asistió al Assessment
- No asistió al Assessment (marca automáticamente como Rechazado)
- Confirma asistencia a Onboarding
- Asistió a Onboarding
- No asistió a Onboarding
- No responde
- Desistió
- Rechazado

## Comportamiento

- Cada postulante arranca en "Pendiente de primer contacto".
- El cambio se guarda al instante al seleccionarlo, igual que la asignación de ciclo y responsable.
- Al elegir "No asistió al Assessment", el estado general de la solicitud pasa a "rechazado" automáticamente.
- Cada estado tiene un color distintivo (neutro, en progreso, positivo, negativo) para leer la tabla de un vistazo.
- El nuevo filtro superior permite filtrar por estado del proceso, y la búsqueda también lo tiene en cuenta.
- El detalle de cada postulante muestra el estado del proceso actual.
- Se mantiene la columna de estado existente (pendiente / aprobado / rechazado); la nueva es el seguimiento operativo del embudo.

## Detalles técnicos

- Migración: nueva columna `estado_proceso` (texto, `NOT NULL DEFAULT 'pendiente_primer_contacto'`) en `public.solicitudes_voluntarios`. Sin cambios de RLS: los admins ya pueden actualizar esa tabla.
- `src/components/admin/volunteers-admin.tsx`: constante con la lista de estados y sus etiquetas/colores, función `updateEstadoProceso` (con la regla de rechazo para "No asistió al Assessment"), nueva columna con `Select` en la tabla, filtro adicional y ancho mínimo de la tabla ajustado para conservar el scroll horizontal.
