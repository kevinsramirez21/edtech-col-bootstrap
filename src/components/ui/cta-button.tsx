import * as React from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'accent' | 'hero'
  size?: 'default' | 'lg' | 'xl'
  asChild?: boolean
}

export function CTAButton({ 
  children, 
  className, 
  variant = 'primary',
  size = 'lg',
  ...props 
}: CTAButtonProps) {
  const buttonVariant = variant === 'primary' ? 'brand' : variant === 'accent' ? 'cta' : 'hero'
  
  return (
    <Button
      variant={buttonVariant}
      size={size}
      className={cn(
        "group relative overflow-hidden",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </Button>
  )
}