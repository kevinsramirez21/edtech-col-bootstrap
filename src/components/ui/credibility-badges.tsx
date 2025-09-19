import * as React from "react"
import { cn } from "@/lib/utils"
import { Award, Shield, Globe } from "lucide-react"

interface BadgeProps {
  icon: React.ElementType
  text: string
  delay?: number
}

interface CredibilityBadgesProps {
  className?: string
}

function CredibilityBadge({ icon: Icon, text, delay = 0 }: BadgeProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={cn(
        "flex items-center gap-2 text-sm text-white/90 transform transition-all duration-700",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-4 opacity-0"
      )}
    >
      <Icon className="w-4 h-4 text-accent flex-shrink-0" />
      <span>{text}</span>
    </div>
  )
}

export function CredibilityBadges({ className }: CredibilityBadgesProps) {
  const badges = [
    {
      icon: Award,
      text: "Reconocidos por MinEducación"
    },
    {
      icon: Shield,
      text: "Aliados estratégicos del gobierno colombiano"
    },
    {
      icon: Globe,
      text: "Presencia en medios nacionales"
    }
  ]

  return (
    <div className={cn("flex flex-col md:flex-row gap-4 md:gap-8", className)}>
      {badges.map((badge, index) => (
        <CredibilityBadge
          key={index}
          icon={badge.icon}
          text={badge.text}
          delay={1000 + (index * 200)}
        />
      ))}
    </div>
  )
}