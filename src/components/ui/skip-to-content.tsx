import { cn } from "@/lib/utils"

interface SkipToContentProps {
  className?: string
}

export function SkipToContent({ className }: SkipToContentProps) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium",
        "transition-all duration-200 transform focus:translate-x-0",
        className
      )}
    >
      Saltar al contenido principal
    </a>
  )
}