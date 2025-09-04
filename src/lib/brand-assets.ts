/**
 * Colombia EdTech Brand Assets System
 * Complete guide for logo usage, colors, and brand consistency
 */

// Brand Colors (exact hex values from brand guidelines)
export const brandColors = {
  primary: {
    deep: '#003889',      // Azul primario profundo
    bright: '#0B47CE',    // Azul primario brillante
  },
  accent: '#F73C5C',      // Acento (coral/rojo)
  sand: '#F4E8DD',        // Arena (fondo cálido)
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      900: '#111111',
      700: '#3A3A3A', 
      500: '#7A7A7A',
      300: '#D1D5DB',
      50: '#FAFAFA',
    }
  }
} as const;

// Logo Variants Usage Guide
export const logoUsage = {
  // ET Symbol Logo
  symbol: {
    // Blue variants
    'blue-on-white': {
      description: 'Primary ET logo - blue symbol on white background',
      useCase: 'Main logo for light backgrounds, headers, business cards',
      file: 'et-logo-blue.png',
      colors: { symbol: brandColors.primary.deep, background: brandColors.neutral.white }
    },
    'white-on-blue': {
      description: 'ET logo - white symbol on blue background', 
      useCase: 'Dark blue backgrounds, hero sections, branded materials',
      file: 'et-logo-sand-on-blue.png',
      colors: { symbol: brandColors.sand, background: brandColors.primary.deep }
    },
    
    // Red variants  
    'red-on-white': {
      description: 'ET logo - red symbol on white background',
      useCase: 'Accent usage, special campaigns, secondary branding',
      file: 'et-logo-red.png', 
      colors: { symbol: brandColors.accent, background: brandColors.neutral.white }
    },
    'white-on-red': {
      description: 'ET logo - white symbol on red background',
      useCase: 'Red branded backgrounds, event materials, calls-to-action',
      file: 'et-logo-sand-on-red.png',
      colors: { symbol: brandColors.sand, background: brandColors.accent }
    }
  },

  // Colombia EdTech Text Logo
  text: {
    'black-on-white': {
      description: 'Colombia EdTech text in black',
      useCase: 'Professional documents, formal communications, print materials',
      file: 'colombia-edtech-black.png',
      colors: { text: brandColors.neutral.black, dot: brandColors.accent }
    },
    'blue-red-dot': {
      description: 'Colombia EdTech in blue with red dot accent',
      useCase: 'Primary text logo, website headers, digital materials',
      file: 'colombia-edtech-blue-red-dot.png',
      colors: { text: brandColors.primary.deep, dot: brandColors.accent }
    },
    'white-on-blue': {
      description: 'Colombia EdTech in white on blue background',
      useCase: 'Blue branded sections, hero areas, dark backgrounds',
      file: 'colombia-edtech-sand-on-blue-red-dot.png',
      colors: { text: brandColors.sand, dot: brandColors.accent, background: brandColors.primary.deep }
    },
    'white-on-blue-alt': {
      description: 'Colombia EdTech in white on blue with blue dot',
      useCase: 'Monochromatic blue sections, subtle branding',
      file: 'colombia-edtech-sand-on-blue-blue-dot.png', 
      colors: { text: brandColors.sand, dot: brandColors.primary.bright, background: brandColors.primary.deep }
    },
    'white-on-red': {
      description: 'Colombia EdTech in white on red background',
      useCase: 'Red branded sections, emergency communications, accent areas',
      file: 'colombia-edtech-sand-on-red-blue-dot.png',
      colors: { text: brandColors.sand, dot: brandColors.primary.bright, background: brandColors.accent }
    }
  }
} as const;

// Usage Guidelines by Context
export const contextualUsage = {
  website: {
    header: 'Use colombia-edtech-blue-red-dot for main navigation',
    footer: 'Use et-logo-blue or colombia-edtech-blue-red-dot',
    heroSections: 'Use white variants on colored backgrounds',
    cards: 'Use symbol logos (ET) for compact spaces'
  },
  
  print: {
    businessCards: 'Use et-logo-blue or colombia-edtech-black',
    letterhead: 'Use colombia-edtech-black for professional look', 
    brochures: 'Mix symbol and text logos based on layout needs',
    presentations: 'Use appropriate contrast variants for slide backgrounds'
  },
  
  digital: {
    socialMedia: 'Use et-logo variants optimized for platform requirements',
    emailSignature: 'Use colombia-edtech-blue-red-dot in smaller sizes',
    webApp: 'Use symbol logo in navigation, text logo for branding sections',
    mobile: 'Prioritize symbol logo for space constraints'
  },
  
  merchandise: {
    apparel: 'Use single-color variants (blue or white) for printing',
    accessories: 'Symbol logos work best for small items',
    promotional: 'Full text logo for maximum brand recognition'
  }
} as const;

// Color Combinations Guide
export const colorCombinations = {
  primary: {
    background: brandColors.neutral.white,
    text: brandColors.primary.deep,
    accent: brandColors.accent,
    description: 'Main brand combination - high contrast, professional'
  },
  
  inverted: {
    background: brandColors.primary.deep,
    text: brandColors.sand,
    accent: brandColors.accent,
    description: 'Dark backgrounds - maintains readability and brand integrity'
  },
  
  accent: {
    background: brandColors.accent,
    text: brandColors.sand,
    accent: brandColors.primary.bright,
    description: 'High-energy sections - calls-to-action, highlights'
  },
  
  warm: {
    background: brandColors.sand,
    text: brandColors.primary.deep,
    accent: brandColors.accent,
    description: 'Soft, approachable feel - testimonials, welcome sections'
  }
} as const;

// Accessibility Guidelines  
export const accessibility = {
  contrast: {
    'blue-on-white': 'AAA compliant - excellent readability',
    'white-on-blue': 'AAA compliant - excellent readability', 
    'red-on-white': 'AA compliant - good readability',
    'white-on-red': 'AA compliant - good readability'
  },
  
  recommendations: [
    'Always test logo visibility on intended backgrounds',
    'Ensure minimum size requirements for symbol recognition',
    'Provide alternative text for screen readers',
    'Test with color blindness simulators',
    'Maintain adequate spacing around logos'
  ]
} as const;

// Export utility function for getting logo by context
export function getLogoForContext(
  context: 'header' | 'footer' | 'hero-blue' | 'hero-red' | 'card' | 'print' | 'social',
  size: 'sm' | 'default' | 'lg' | 'xl' = 'default'
) {
  const contextMap = {
    header: { variant: 'text-only' as const, colorScheme: 'blue' as const },
    footer: { variant: 'symbol-only' as const, colorScheme: 'blue' as const },
    'hero-blue': { variant: 'full' as const, colorScheme: 'white' as const },
    'hero-red': { variant: 'full' as const, colorScheme: 'sand' as const },
    card: { variant: 'symbol-only' as const, colorScheme: 'blue' as const },
    print: { variant: 'text-only' as const, colorScheme: 'black' as const },
    social: { variant: 'symbol-only' as const, colorScheme: 'blue' as const }
  };
  
  return {
    ...contextMap[context],
    size
  };
}