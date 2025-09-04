import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  as?: 'section' | 'div' | 'article' | 'aside'
}

export function Section({ 
  children, 
  className, 
  as: Component = 'section',
  ...props 
}: SectionProps) {
  return (
    <Component
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </Component>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  className,
  centered = false 
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12",
      centered && "text-center",
      className
    )}>
      {subtitle && (
        <p className="text-sm font-semibold text-accent-brand uppercase tracking-wider mb-2">
          {subtitle}
        </p>
      )}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-gray-500 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  )
}