import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface MetricProps {
  value: string
  label: string
  icon?: LucideIcon
  className?: string
}

interface ImpactMetricsProps {
  metrics: MetricProps[]
  title?: string
  className?: string
}

export function ImpactMetrics({ metrics, title, className }: ImpactMetricsProps) {
  return (
    <div className={cn("text-center", className)}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105"
          >
            {metric.icon && (
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="text-3xl font-bold text-white mb-2">
              {metric.value}
            </div>
            <div className="text-sm text-white/80">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}