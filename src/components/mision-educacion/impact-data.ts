// Cifras del mapeo de Misión Educación.
// TODO: reemplazar con los datos reales del mapeo cuando estén consolidados.

export const IMPACTO_FECHA_CORTE = "Corte pendiente de actualización";

export const IMPACTO_RESUMEN = {
  instituciones: "—",
  personas: "—",
  nota:
    "Estamos en la primera fase del mapeo. Cada registro nos ayuda a dimensionar mejor la afectación educativa y a ajustar la respuesta.",
};

export const IMPACTO_TERRITORIOS: {
  departamento: string;
  valor: string;
  porcentaje: string;
  detalle: string;
}[] = [
  { departamento: "Risaralda", valor: "—", porcentaje: "—", detalle: "Pereira, Dosquebradas y Santa Rosa" },
  { departamento: "Valle del Cauca", valor: "—", porcentaje: "—", detalle: "Concentrado en Cali" },
  { departamento: "Quindío", valor: "—", porcentaje: "—", detalle: "Principalmente Armenia" },
  { departamento: "Caldas", valor: "—", porcentaje: "—", detalle: "Principalmente Manizales" },
  { departamento: "Antioquia", valor: "—", porcentaje: "—", detalle: "Casos dispersos" },
  { departamento: "Cauca", valor: "—", porcentaje: "—", detalle: "Casos dispersos" },
];

export const IMPACTO_INDICADORES: { valor: string; etiqueta: string }[] = [
  { valor: "—", etiqueta: "reporta interrupción de clases" },
  { valor: "—", etiqueta: "tiene daño en infraestructura escolar" },
  { valor: "—", etiqueta: "necesita conectividad o equipos" },
  { valor: "—", etiqueta: "pide apoyo socioemocional" },
];
