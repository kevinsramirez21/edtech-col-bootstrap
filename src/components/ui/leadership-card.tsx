import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

interface LeadershipCardProps {
  name: string
  position: string
  bio?: string
  image?: string
  className?: string
}

export function LeadershipCard({ 
  name, 
  position, 
  bio, 
  image,
  className 
}: LeadershipCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm border border-primary-100 p-6 transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="text-center mb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-primary-100 text-primary-700 font-semibold text-lg">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <h3 className="text-lg font-bold text-primary-900 mb-1">
          {name}
        </h3>
        <p className="text-primary-600 text-sm mb-4">
          {position}
        </p>
      </div>

      {bio && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center text-accent hover:text-accent-600 transition-colors duration-200 mb-2"
          >
            <span className="text-sm font-medium mr-1">
              {isExpanded ? 'Ocultar trayectoria' : 'Ver trayectoria'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <div className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded 
              ? "max-h-96 opacity-100" 
              : "max-h-0 opacity-0"
          )}>
            <p className="text-sm text-primary-700 leading-relaxed">
              {bio}
            </p>
          </div>
        </>
      )}
    </div>
  )
}