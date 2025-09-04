import * as React from "react"
import { cn } from "@/lib/utils"

interface KPIProps {
  value: string | number
  label: string
  description?: string
  variant?: 'default' | 'accent' | 'sand'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function KPI({ 
  value, 
  label, 
  description, 
  variant = 'default',
  size = 'md',
  className 
}: KPIProps) {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl lg:text-5xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl'
  }

  const variantClasses = {
    default: 'text-primary-900',
    accent: 'text-accent-brand',
    sand: 'text-gray-900'
  }

  const backgroundClasses = {
    default: 'bg-white',
    accent: 'bg-accent-brand/5',
    sand: 'bg-sand'
  }

  return (
    <div className={cn(
      "p-6 rounded-xl text-center transition-all duration-200 hover:shadow-lg",
      backgroundClasses[variant],
      className
    )}>
      <div className={cn(
        "font-bold mb-2 tabular-nums",
        sizeClasses[size],
        variantClasses[variant]
      )}>
        {value}
      </div>
      <div className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">
        {label}
      </div>
      {description && (
        <p className="text-xs text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}