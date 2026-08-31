// Mapeo de afectación educativa — Terremoto 10 de agosto de 2026.
// Fuentes: Brief Ejecutivo Misión Educación v2.2 (corte 28 ago 2026) +
// mapeo consolidado de fuentes públicas (corte 31 ago 2026).
// Semáforo: "oficial" = dato oficial confirmado, "estimacion" = estimación de
// organismo/multilateral, "mesa" = dato de mesa territorial sujeto a validación.

export type Confiabilidad = "oficial" | "estimacion" | "mesa";

export const CONFIABILIDAD_LABEL: Record<Confiabilidad, string> = {
  oficial: "Oficial confirmado",
  estimacion: "Estimación de organismo",
  mesa: "Dato de mesa · por validar",
};

export const IMPACTO_FECHA_CORTE =
  "Datos con corte al 31 de agosto de 2026. Las cifras del sismo cambian a diario: cada dato se publica con su fuente y fecha.";

export const IMPACTO_RESUMEN = {
  instituciones: "+3.800",
  personas: "+447.000",
  nota:
    "El terremoto (Mw 7,4, epicentro en San José del Palmar, Chocó) es el mayor golpe reciente a la educación colombiana. No existe una sola cifra nacional: el inventario crece a medida que avanza la evaluación sede por sede. Aquí publicamos lo que hay, con su nivel de confiabilidad.",
};

export const IMPACTO_CIFRAS_NACIONALES: {
  valor: string;
  etiqueta: string;
  fuente: string;
  confiabilidad: Confiabilidad;
}[] = [
  {
    valor: "Mw 7,4",
    etiqueta: "Sismo del 10 de agosto, 7:34 a.m. Epicentro San José del Palmar (Chocó), prof. ~103 km",
    fuente: "SGC / USGS",
    confiabilidad: "oficial",
  },
  {
    valor: "+3.800",
    etiqueta: "sedes y centros educativos afectados (de 1.631 el 13 ago a +3.800 el 29 ago)",
    fuente: "MEN, 29 ago",
    confiabilidad: "oficial",
  },
  {
    valor: "811",
    etiqueta: "instituciones educativas con colapso total",
    fuente: "MEN, 20 ago",
    confiabilidad: "oficial",
  },
  {
    valor: "+447.000",
    etiqueta: "estudiantes con matrícula afectada (la ONU habla de +1 millón en municipios afectados)",
    fuente: "MEN, 29 ago",
    confiabilidad: "oficial",
  },
  {
    valor: "~178.000",
    etiqueta: "estudiantes en sedes con daño estructural grave",
    fuente: "ONU, 29 ago",
    confiabilidad: "estimacion",
  },
  {
    valor: "84%",
    etiqueta: "de las sedes del país (10.773) no cumple la norma sismorresistente NSR-10",
    fuente: "MEN / FFIE, 14 ago",
    confiabilidad: "oficial",
  },
  {
    valor: "15",
    etiqueta: "departamentos con daño confirmado; hasta 19 con reportes en sedes",
    fuente: "UNGRD / MEN",
    confiabilidad: "oficial",
  },
  {
    valor: "114.855",
    etiqueta: "estudiantes de educación superior afectados (117 IES, 91 suspendieron actividades)",
    fuente: "MEN + ICETEX, 16 ago",
    confiabilidad: "oficial",
  },
];

export const IMPACTO_TERRITORIOS: {
  departamento: string;
  valor: string;
  etiquetaValor: string;
  estudiantes: string;
  retorno: string;
  detalle: string;
  fuente: string;
  confiabilidad: Confiabilidad;
}[] = [
  {
    departamento: "Chocó",
    valor: "796",
    etiquetaValor: "escuelas afectadas",
    estudiantes: "Sin dato oficial desagregado",
    retorno: "~80% de presencialidad a fin de agosto; Quibdó con 25 planteles y ~8.000 estudiantes",
    detalle:
      "Epicentro. Antes del sismo, 60,3% de las sedes rurales no tenía electricidad. El colegio más grande del departamento sigue cerrado.",
    fuente: "UNICEF, ~14 ago",
    confiabilidad: "estimacion",
  },
  {
    departamento: "Valle del Cauca",
    valor: "324+",
    etiquetaValor: "sedes con daño",
    estudiantes: "Cali: 116.000 retornaron, ~26.000 no. Buenaventura: ~2.800 sin colegio",
    retorno: "Cali ~97% de sedes habilitadas; resto del Valle ~70% de matrícula en cabeceras",
    detalle:
      "214 sedes en Cali + 102 en el resto del departamento + 8 instituciones colapsadas en Buenaventura. Seis estudiantes murieron en Calima-El Darién y Yumbo.",
    fuente: "Secretarías / MEN, 24 ago",
    confiabilidad: "oficial",
  },
  {
    departamento: "Cauca",
    valor: "267",
    etiquetaValor: "instituciones educativas",
    estudiantes: "100.000–102.000 (dato de mesa territorial)",
    retorno: "Sin fecha pública de retorno; Popayán y el consolidado departamental siguen pendientes",
    detalle:
      "885 reportes de daño (426 menor, 301 parcial, 92 riesgo de colapso, 57 colapso parcial, 9 colapso total) y 158 sedes críticas, según la mesa territorial del 27 de agosto. El desglose no es verificable en fuentes públicas.",
    fuente: "Gobernación, 19 ago + mesa Colombia EdTech, 27 ago",
    confiabilidad: "mesa",
  },
  {
    departamento: "Risaralda",
    valor: "165",
    etiquetaValor: "colegios públicos con daño severo (Pereira)",
    estudiantes: "~58.000 sin presencialidad en Pereira; ~44.000 en los 12 municipios no certificados",
    retorno: "Pereira en alternancia desde el 31 de agosto (presencial rotativo, virtual y guías impresas)",
    detalle:
      "De 111 sedes evaluadas en Pereira: 47 habitables, 48 con uso restringido y 13 en riesgo de colapso. La Secretaría departamental perdió su espacio de trabajo y lleva ~20% del inventario físico de ~585 sedes.",
    fuente: "Alcaldía de Pereira, 28 ago + mesa Colombia EdTech, 28 ago",
    confiabilidad: "oficial",
  },
  {
    departamento: "Quindío",
    valor: "~62%",
    etiquetaValor: "de la infraestructura educativa afectada",
    estudiantes: "~22.000 de 32.000",
    retorno: "Armenia 95% desde el 25 de agosto; resto del departamento progresivo",
    detalle: "Montenegro reporta cerca del 90% de su infraestructura educativa dañada.",
    fuente: "Gobernación / MEN, 25 ago",
    confiabilidad: "estimacion",
  },
  {
    departamento: "Caldas",
    valor: "356",
    etiquetaValor: "sedes con daño (de 975 públicas)",
    estudiantes: "40.000 en presencial y 32.000 en escuela en casa",
    retorno: "Manizales retomó el 18 de agosto; el resto avanza sede por sede",
    detalle:
      "Adscritas a 161 instituciones en 26 municipios, sin contar Manizales, donde 24 colegios públicos y 16 privados quedaron con mayor afectación.",
    fuente: "Secretaría de Educación de Caldas",
    confiabilidad: "oficial",
  },
];

export const IMPACTO_MISION: { valor: string; etiqueta: string }[] = [
  { valor: "80", etiqueta: "registros de organizaciones y personas dispuestas a sumar" },
  { valor: "2", etiqueta: "diagnósticos territoriales iniciados: Cauca y Risaralda" },
  { valor: "1", etiqueta: "siguiente piloto: Quibdó, para escalar en Chocó" },
  { valor: "~170", etiqueta: "personas conectadas en la sesión intersectorial" },
];

export const IMPACTO_VACIOS: string[] = [
  "Desagregación municipal de sedes, estudiantes y docentes en Chocó, Cauca y los 12 municipios no certificados de Risaralda.",
  "Docentes afectados por departamento: casi no hay dato oficial público, solo estimaciones de mesa.",
  "Sedes usadas como albergue, clave para planear la continuidad. Solo existe dato parcial en Buenaventura.",
  "Consolidado único de niñas, niños y adolescentes desescolarizados por sede dañada.",
  "Estado real de la conectividad escolar sede por sede después del sismo.",
  "Cobertura del PAE: cuántas sedes lo tienen interrumpido y bajo qué modalidad se entrega.",
];
