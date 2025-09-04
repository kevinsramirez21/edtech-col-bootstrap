import { ColombiaEdTechLogo as Logo } from '@/assets/logos/colombia-edtech-logo';

export function ColombiaEdTechLogo({ 
  className,
  variant = "text-only",
  colorScheme = "blue",
  size = "default" 
}: { 
  className?: string;
  variant?: "symbol-only" | "text-only" | "full";
  colorScheme?: "blue" | "red" | "sand" | "white" | "black";
  size?: "sm" | "default" | "lg" | "xl";
}) {
  return (
    <Logo 
      className={className}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
    />
  );
}