/** Verified papers here power both the library and their landing pages. */
import competenciasCover from "@/assets/research/competencias-digitales-cover.svg"
export const researchLines = [
  { id: "stem", title: "STEM, datos y pedagogía" },
  { id: "ia", title: "Inteligencia artificial y uso ético" },
  { id: "socioemocional", title: "Educación socioemocional y neuroeducación" },
] as const

export type ResearchLineId = (typeof researchLines)[number]["id"]

export interface ResearchPublication {
  slug: string
  title: string
  subtitle: string
  description: string
  type: string
  line: ResearchLineId
  date: string // ISO yyyy-mm or yyyy-mm-dd; never infer an unknown day
  dateLabel?: string
  authors: { name: string; role?: string }[]
  cover: string
  coverAlt: string
  socialImage?: string // Absolute HTTPS URL of the same cover, optimized for sharing
  pdfUrl: string
  summary: string[]
  findings: { value?: string; statement: string; context?: string }[]
}

export const publications: ResearchPublication[] = [{
  slug: "competencias-digitales-transformar-educacion-colombia",
  title: "Competencias Digitales para Transformar la Educación en Colombia",
  subtitle: "De la conectividad al desarrollo de capacidades",
  description: "Este white paper analiza la situación de las competencias digitales en Colombia a partir de indicadores oficiales, investigaciones nacionales, evidencia internacional y una encuesta exploratoria aplicada a 15 docentes colombianos en agosto de 2026.",
  type: "White Paper · WP-2026-01",
  line: "stem",
  date: "2026-08",
  dateLabel: "Agosto de 2026",
  authors: [{ name: "Diana Lizeth Mora", role: "Equipo de Investigación" }],
  cover: competenciasCover,
  coverAlt: "Portada de Competencias Digitales para Transformar la Educación en Colombia, white paper WP-2026-01",
  pdfUrl: "https://drive.google.com/file/d/19_Kne78pfnnVSU44u8NqJgL00qh0o3sB/view?usp=drivesdk",
  summary: [
    "Colombia ha avanzado de manera significativa en conectividad, infraestructura tecnológica y digitalización. Sin embargo, el acceso a internet y la disponibilidad de dispositivos no garantizan, por sí solos, mejores aprendizajes ni el desarrollo de las capacidades necesarias para desenvolverse en una sociedad marcada por la inteligencia artificial, la circulación masiva de información y la creciente automatización.",
    "Este white paper analiza la situación de las competencias digitales en Colombia a partir de indicadores oficiales, investigaciones nacionales, evidencia internacional y una encuesta exploratoria aplicada a 15 docentes colombianos en agosto de 2026. La evidencia muestra brechas territoriales importantes y señala que el principal desafío ya no es únicamente conectar a la población, sino desarrollar capacidades para utilizar la tecnología de manera crítica, ética, segura y creativa.",
    "A partir de esta evidencia, el documento propone cuatro líneas de acción: desarrollar un Marco Nacional de Competencias Digitales adaptado al contexto del país; fortalecer la formación docente en diseño de recursos y evaluación con tecnología; implementar una medición periódica de las competencias digitales de los estudiantes; y focalizar la inversión en los territorios con mayores brechas.",
  ],
  findings: [
    { value: "Habilidades digitales", statement: "Es la dimensión con mayor nivel de brecha dentro del Índice de Brecha Digital 2024.", context: "La brecha es especialmente alta en las regiones Orinoquía-Amazonía, Pacífica y Caribe." },
    { value: "38,46 / 78", statement: "Nivel básico de competencia digital en un estudio con 777 estudiantes de secundaria en Bogotá.", context: "Las mayores dificultades aparecen en alfabetización informacional, evaluación crítica de la información y creación de contenidos digitales." },
    { value: "15 docentes", statement: "La encuesta exploratoria identifica barreras que siguen limitando la integración efectiva de tecnología en el aula.", context: "Entre ellas: falta de tiempo institucional, conectividad intermitente y necesidad de formación aplicada. La muestra es limitada y se concentra principalmente en Cundinamarca." },
    { value: "4 líneas de acción", statement: "El documento propone pasar de una agenda centrada en infraestructura a una estrategia nacional enfocada en capacidades.", context: "Marco nacional, formación docente continua, medición periódica y focalización territorial de la inversión." },
  ],
}]

export const getResearchLine = (id: ResearchLineId) => researchLines.find((line) => line.id === id)?.title ?? id
export const getPublication = (slug: string) => publications.find((publication) => publication.slug === slug)
export const sortedPublications = () => [...publications].sort((a, b) => b.date.localeCompare(a.date))
