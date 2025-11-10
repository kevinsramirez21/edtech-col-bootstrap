import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoGridProps {
  partners: string[]
  title?: string
  className?: string
  columns?: 3 | 4 | 5 | 6
}

// Mapping of partner names to their logo paths
const logoMap: Record<string, string> = {
  "mangus": "/images/logos/mangus.png",
}

function LogoPlaceholder({ name }: { name: string }) {
  const logoPath = logoMap[name.toLowerCase()]
  
  // If we have a real logo, use it
  if (logoPath) {
    return (
      <div className="flex items-center justify-center h-16 w-32 p-4 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:border-primary-700 hover:shadow-md">
        <img 
          src={logoPath} 
          alt={`Logo de ${name}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    )
  }
  
  // Fallback to placeholder
  const initials = name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2).toUpperCase()
  
  return (
    <div className="flex items-center justify-center h-16 w-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 transition-all duration-200 hover:border-primary-700 hover:bg-primary-700/5">
      <div className="text-center">
        <div className="text-xl font-bold text-gray-400 mb-1">{initials}</div>
        <div className="text-xs text-gray-500 truncate px-2 max-w-full">{name}</div>
      </div>
    </div>
  )
}

export function LogoGrid({ 
  partners, 
  title = "Nuestros Partners",
  className,
  columns = 4 
}: LogoGridProps) {
  const gridCols = {
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  }

  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          {title}
        </h3>
      )}
      <div className={cn(
        "grid gap-6 items-center justify-items-center",
        gridCols[columns]
      )}>
        {partners.map((partner, index) => (
          <LogoPlaceholder key={index} name={partner} />
        ))}
      </div>
    </div>
  )
}