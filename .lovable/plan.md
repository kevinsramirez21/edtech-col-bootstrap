# Seguimiento de voluntarios: ciclos, líder y responsables

## Objetivo
Dentro de la pestaña **Voluntarios** del panel admin, agregar una sección de seguimiento donde se define el ciclo de selección, su líder y los responsables, y poder asignar un responsable a cada solicitud desde la tabla.

## Qué se verá
1. **Panel "Ciclo de selección"** arriba de la tabla de voluntarios:
   - Campo de texto libre para el nombre del ciclo (ej. "Agosto 2026", "Ciclo 2 - Sept").
   - Campo de texto para el **nombre del líder** del ciclo.
   - Lista de **responsables**: agregar varios por nombre, editarlos y eliminarlos.
   - Selector para cambiar entre ciclos ya creados y marcar cuál es el ciclo activo.
2. **Nueva columna "Responsable"** en la tabla de solicitudes:
   - Menú desplegable con los responsables del ciclo activo.
   - Se guarda al instante y se puede dejar "Sin asignar".
   - Se agrega el responsable al filtro/búsqueda y al detalle de cada solicitud.

## Base de datos
Migración con dos tablas nuevas:
- `ciclos_voluntariado`: nombre del ciclo (texto), nombre del líder, activo (sí/no).
- `responsables_ciclo`: nombre del responsable, vinculado a un ciclo.
- En `solicitudes_voluntarios`: dos campos nuevos, ciclo asignado y responsable asignado.

Acceso: solo administradores pueden ver, crear, editar y borrar ciclos y responsables; las solicitudes siguen con las reglas actuales (solo admins las ven y actualizan). Se incluyen los GRANT correspondientes y triggers de `updated_at`.

## Detalles técnicos
- Nuevo componente `src/components/admin/volunteer-cycle-panel.tsx` para el panel de ciclo/líder/responsables.
- `src/components/admin/volunteers-admin.tsx`: carga de ciclo activo + responsables, columna nueva con `Select`, `update` sobre `solicitudes_voluntarios.responsable_id`, y muestra del responsable en el diálogo de detalle.
- Al asignar un responsable, si la solicitud no tiene ciclo, se le asigna el ciclo activo.
- Sin cambios en el formulario público de voluntariado.
