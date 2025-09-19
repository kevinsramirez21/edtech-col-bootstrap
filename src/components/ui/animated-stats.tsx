import * as React from "react"
import { cn } from "@/lib/utils"

interface StatProps {
  value: string
  label: string
  delay?: number
  className?: string
}

interface AnimatedStatsProps {
  stats: StatProps[]
  className?: string
}

function AnimatedStat({ value, label, delay = 0, className }: StatProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [displayValue, setDisplayValue] = React.useState("0")

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  React.useEffect(() => {
    if (!isVisible) return

    // Extract number from value for animation
    const numericValue = value.match(/\d+/)
    if (!numericValue) {
      setDisplayValue(value)
      return
    }

    const targetNumber = parseInt(numericValue[0])
    const prefix = value.substring(0, value.indexOf(numericValue[0]))
    const suffix = value.substring(value.indexOf(numericValue[0]) + numericValue[0].length)
    
    let currentNumber = 0
    const increment = Math.ceil(targetNumber / 30)
    
    const counter = setInterval(() => {
      currentNumber += increment
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber
        clearInterval(counter)
      }
      setDisplayValue(`${prefix}${currentNumber}${suffix}`)
    }, 50)

    return () => clearInterval(counter)
  }, [isVisible, value])

  return (
    <div 
      className={cn(
        "text-center transform transition-all duration-700",
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-4 opacity-0",
        className
      )}
    >
      <div className="text-2xl md:text-4xl font-bold text-accent mb-2">
        {displayValue}
      </div>
      <div className="text-sm md:text-base text-white/80">
        {label}
      </div>
    </div>
  )
}

export function AnimatedStats({ stats, className }: AnimatedStatsProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-8", className)}>
      {stats.map((stat, index) => (
        <AnimatedStat
          key={index}
          value={stat.value}
          label={stat.label}
          delay={index * 200}
        />
      ))}
    </div>
  )
}