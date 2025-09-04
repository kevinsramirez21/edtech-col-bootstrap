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
  return (
    <div className={cn(
      "kpi text-center p-6 rounded-xl",
      variant === 'accent' && "bg-accent-50",
      variant === 'sand' && "bg-sand",
      className
    )}>
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