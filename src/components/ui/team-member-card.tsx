import * as React from "react"
import { cn } from "@/lib/utils"
import { Mail, Linkedin } from "lucide-react"

interface TeamMemberCardProps {
  name: string
  position: string
  email: string
  linkedin: string
  image: string
  bio: string
  className?: string
}

export function TeamMemberCard({
  name,
  position,
  email,
  linkedin,
  image,
  bio,
  className
}: TeamMemberCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]",
        className
      )}
    >
      {/* Photo container with aspect ratio */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={`${name} - ${position}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 font-funnel">
            {name}
          </h3>
          <p className="text-white/80 text-sm sm:text-base mb-2">
            {position}
          </p>
          <p className="text-white/70 text-xs sm:text-sm line-clamp-2 mb-3">
            {bio}
          </p>
          
          {/* Contact info */}
          <div className="flex items-center justify-between gap-3">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-white/80 hover:text-white text-xs sm:text-sm transition-colors duration-300 truncate"
              aria-label={`Enviar email a ${name}`}
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white transition-colors duration-300 shadow-lg flex-shrink-0"
              aria-label={`Ver perfil de LinkedIn de ${name}`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
