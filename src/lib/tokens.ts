/**
 * Colombia EdTech Design Tokens
 * Centralized design system tokens for consistent styling
 */

export const colors = {
  brand: {
    primary900: 'hsl(213 100% 27%)', // #003889
    primary700: 'hsl(225 85% 43%)',  // #0B47CE
    accent: 'hsl(350 91% 60%)',      // #F73C5C
    sand: 'hsl(28 50% 92%)',         // #F4E8DD
  },
  gray: {
    900: 'hsl(0 0% 7%)',     // #111111
    700: 'hsl(0 0% 23%)',    // #3A3A3A
    500: 'hsl(0 0% 48%)',    // #7A7A7A
    300: 'hsl(220 13% 82%)', // #D1D5DB
    50: 'hsl(0 0% 98%)',     // #FAFAFA
  },
} as const;

export const typography = {
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  leading: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
  '5xl': '6rem',   // 96px
  '6xl': '8rem',   // 128px
} as const;

export const radius = {
  sm: '0.25rem',   // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  full: '9999px',
} as const;

export const shadows = {
  card: 'var(--shadow-card)',
  lg: 'var(--shadow-lg)',
  brand: 'var(--shadow-brand)',
} as const;

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const gradients = {
  primary: 'var(--gradient-primary)',
  accent: 'var(--gradient-accent)',
  sand: 'var(--gradient-sand)',
} as const;

export const transitions = {
  fast: 'var(--transition-fast)',
  smooth: 'var(--transition-smooth)',
} as const;