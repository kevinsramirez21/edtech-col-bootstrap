import * as React from "react"
import { cn } from "@/lib/utils"

interface CopySlotProps {
  file: string
  fallback?: string
  className?: string
}

/**
 * CopySlot component for injecting MDX content
 * This component reads from MDX files in the content/copies/ directory
 * If the file doesn't exist or has no content, shows a fallback message
 */
export function CopySlot({ 
  file, 
  fallback = "Contenido aún no cargado - Este contenido será inyectado desde archivos MDX.",
  className 
}: CopySlotProps) {
  const [content, setContent] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to dynamically import the MDX file
        const mdxModule = await import(`../../content/copies/${file}`)
        
        if (mdxModule.default) {
          // If we have content, we'll render it
          setContent("loaded")
        } else {
          setContent(null)
        }
      } catch (err) {
        // File doesn't exist or can't be loaded
        setContent(null)
        setError(null) // Don't show error, just show fallback
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [file])

  if (loading) {
    return (
      <div className={cn(
        "animate-pulse p-6 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300",
        className
      )}>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className={cn(
        "p-6 bg-sand/50 rounded-lg border-2 border-dashed border-accent-brand/30 text-center",
        className
      )}>
        <div className="text-gray-700 italic">
          <p className="text-sm font-medium mb-2 text-accent-brand">
            📝 Slot de contenido: {file}
          </p>
          <p className="text-sm">{fallback}</p>
          <p className="text-xs text-gray-500 mt-2">
            Para agregar contenido, crear el archivo MDX correspondiente en content/copies/
          </p>
        </div>
      </div>
    )
  }

  // This would be where we render the actual MDX content
  // For now, we show a placeholder that content is loaded
  return (
    <div className={cn(
      "prose prose-lg max-w-none",
      "prose-headings:text-gray-900 prose-p:text-gray-700",
      "prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline",
      "prose-strong:text-gray-900 prose-em:text-gray-600",
      className
    )}>
      {/* Placeholder for actual MDX content */}
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-700 font-medium">
          ✅ Contenido MDX cargado desde: {file}
        </p>
        <p className="text-green-600 text-sm mt-1">
          Este espacio será reemplazado por el contenido real del archivo MDX.
        </p>
      </div>
    </div>
  )
}