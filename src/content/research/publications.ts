/** Add verified papers here. Each entry powers both the library and its own landing page.
 * Cover and socialImage should point to actual published assets; pdfUrl to an existing PDF.
 * The optional body/summary fields can be populated from approved MDX copy.
 */
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
  date: string // ISO yyyy-mm-dd
  authors: { name: string; role?: string }[]
  cover: string
  coverAlt: string
  socialImage?: string // Absolute HTTPS URL of the same cover, optimized for sharing
  pdfUrl: string
  summary: string[]
  findings: { value?: string; statement: string; context?: string }[]
}

// No verified white paper title, cover, authors or PDF are currently available.
export const publications: ResearchPublication[] = []

export const getResearchLine = (id: ResearchLineId) => researchLines.find((line) => line.id === id)?.title ?? id
export const getPublication = (slug: string) => publications.find((publication) => publication.slug === slug)
export const sortedPublications = () => [...publications].sort((a, b) => b.date.localeCompare(a.date))
