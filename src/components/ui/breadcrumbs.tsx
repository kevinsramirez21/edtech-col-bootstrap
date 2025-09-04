import * as React from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Navegación de ruta"
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <Link
        to="/"
        className="flex items-center text-gray-500 hover:text-primary-700 transition-colors"
        aria-label="Inicio"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-gray-500 hover:text-primary-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className="text-gray-900 font-medium"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}