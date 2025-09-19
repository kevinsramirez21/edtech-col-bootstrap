import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"

interface TimelineItem {
  year: string
  title: string
  description: string
  highlight?: boolean
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set([items.length - 1]))

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {items.map((item, index) => (
        <div key={index} className="relative">
          {/* Timeline Line */}
          {index !== items.length - 1 && (
            <div 
              className="absolute left-8 top-16 w-0.5 h-16 bg-primary-200"
              style={{ backgroundColor: 'hsl(var(--primary) / 0.2)' }}
            />
          )}
          
          {/* Timeline Item */}
          <div 
            className="flex items-start cursor-pointer group"
            onClick={() => toggleItem(index)}
          >
            {/* Year Circle */}
            <div className={cn(
              "flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-white transition-all duration-300",
              item.highlight 
                ? "bg-accent border-accent text-white" 
                : "bg-primary-700 border-primary-700",
              "group-hover:scale-110"
            )}>
              <span className="text-sm">{item.year}</span>
            </div>
            
            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold text-primary-700 mr-2">
                  {item.title}
                </h3>
                {expandedItems.has(index) ? (
                  <ChevronDown className="w-5 h-5 text-primary-500 transition-transform" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-primary-500 transition-transform" />
                )}
              </div>
              
              {/* Expandable Description */}
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                expandedItems.has(index) 
                  ? "max-h-96 opacity-100" 
                  : "max-h-0 opacity-0"
              )}>
                <p className="text-primary-800 leading-relaxed pb-4">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}