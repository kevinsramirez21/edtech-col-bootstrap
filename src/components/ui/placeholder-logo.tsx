export function ColombiaEdTechLogo({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Colombia EdTech"
    >
      {/* Placeholder logo - replace with real logo later */}
      <rect x="0" y="8" width="32" height="24" rx="4" fill="currentColor" />
      <rect x="6" y="12" width="20" height="4" rx="2" fill="white" />
      <rect x="6" y="20" width="16" height="4" rx="2" fill="white" />
      
      <text x="40" y="18" className="fill-current font-bold text-sm" dominantBaseline="middle">
        Colombia
      </text>
      <text x="40" y="30" className="fill-current font-medium text-xs" dominantBaseline="middle">
        EdTech
      </text>
    </svg>
  )
}