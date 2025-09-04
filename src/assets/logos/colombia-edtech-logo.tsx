import React from 'react';

// ET Symbol Logo Component
export function ETLogo({ 
  className = "", 
  variant = "blue", 
  size = "default" 
}: { 
  className?: string; 
  variant?: "blue" | "red" | "sand" | "white";
  size?: "sm" | "default" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  const colors = {
    blue: "#003889",
    red: "#F73C5C", 
    sand: "#F4E8DD",
    white: "#FFFFFF"
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Colombia EdTech ET Logo"
    >
      {/* Stylized "E" */}
      <path 
        d="M40 50 L40 150 L120 150 L120 130 L65 130 L65 110 L110 110 L110 90 L65 90 L65 70 L120 70 L120 50 Z" 
        fill={colors[variant]}
      />
      
      {/* Stylized "T" */}
      <path 
        d="M130 50 L130 70 L150 70 L150 150 L170 150 L170 70 L190 70 L190 50 Z" 
        fill={colors[variant]}
      />
      
      {/* Modern accent curves */}
      <path 
        d="M40 50 Q60 30 80 50" 
        stroke={colors[variant]} 
        strokeWidth="4" 
        fill="none"
      />
      <path 
        d="M120 150 Q140 170 160 150" 
        stroke={colors[variant]} 
        strokeWidth="4" 
        fill="none"
      />
    </svg>
  );
}

// Colombia EdTech Text Logo Component
export function ColombiaEdTechTextLogo({ 
  className = "", 
  variant = "blue", 
  dotColor = "red",
  size = "default" 
}: { 
  className?: string; 
  variant?: "blue" | "black" | "sand" | "white";
  dotColor?: "red" | "blue";
  size?: "sm" | "default" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "h-6",
    default: "h-8", 
    lg: "h-12",
    xl: "h-16"
  };

  const textColors = {
    blue: "#003889",
    black: "#000000", 
    sand: "#F4E8DD",
    white: "#FFFFFF"
  };

  const dotColors = {
    red: "#F73C5C",
    blue: "#0B47CE"
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 400 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Colombia EdTech"
    >
      {/* "Colombia" text */}
      <text 
        x="20" 
        y="28" 
        fontSize="24" 
        fontFamily="var(--font-ui)" 
        fontWeight="400" 
        fill={textColors[variant]}
      >
        Colombia
      </text>
      
      {/* "EdTech" text - bold */}
      <text 
        x="20" 
        y="58" 
        fontSize="32" 
        fontFamily="var(--font-ui)" 
        fontWeight="700" 
        fill={textColors[variant]}
      >
        EdTech
      </text>
      
      {/* Dot accent */}
      <circle 
        cx="360" 
        cy="45" 
        r="8" 
        fill={dotColors[dotColor]}
      />
    </svg>
  );
}

// Combined Logo Component 
export function ColombiaEdTechLogo({ 
  className = "", 
  variant = "full",
  colorScheme = "blue",
  size = "default"
}: { 
  className?: string; 
  variant?: "symbol-only" | "text-only" | "full";
  colorScheme?: "blue" | "red" | "sand" | "white" | "black";
  size?: "sm" | "default" | "lg" | "xl";
}) {
  if (variant === "symbol-only") {
    return <ETLogo className={className} variant={colorScheme as any} size={size} />;
  }
  
  if (variant === "text-only") {
    return (
      <ColombiaEdTechTextLogo 
        className={className} 
        variant={colorScheme as any} 
        size={size}
        dotColor={colorScheme === "red" ? "blue" : "red"}
      />
    );
  }
  
  // Full logo with symbol and text
  const sizeClasses = {
    sm: "h-8",
    default: "h-12", 
    lg: "h-16",
    xl: "h-24"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ETLogo variant={colorScheme as any} size={size} />
      <ColombiaEdTechTextLogo 
        variant={colorScheme as any} 
        size={size}
        dotColor={colorScheme === "red" ? "blue" : "red"}
      />
    </div>
  );
}