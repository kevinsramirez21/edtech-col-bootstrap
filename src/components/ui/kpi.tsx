import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface KPIProps {
  value: string | number
  label: string
  description?: string
  variant?: 'default' | 'accent' | 'sand'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  className?: string
}

export function KPI({ 
  value, 
  label, 
  description, 
  variant = 'default',
  size = 'md',
  icon: Icon,
  className 
}: KPIProps) {
  return (
    <div className={cn(
      "kpi text-center p-6 rounded-xl",
      variant === 'accent' && "bg-accent-50",
      variant === 'sand' && "bg-sand",
      className
    )}>
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon className="w-8 h-8" style={{ color: variant === 'accent' ? 'var(--color-accent)' : 'var(--color-primary-900)' }} />
        </div>
      )}
      <div 
        className="value"
        style={{ 
          fontSize: size === 'sm' ? 'var(--fs-xl)' : size === 'lg' ? 'var(--fs-3xl)' : 'var(--fs-2xl)',
          color: variant === 'accent' ? 'var(--color-accent)' : 'var(--color-primary-900)'
        }}
      >
        {value}
      </div>
      <div className="label">
        {label}
      </div>
      {description && (
        <div className="description">
          {description}
        </div>
      )}
    </div>
  )
}