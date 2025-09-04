/**
 * Font Configuration for Colombia EdTech
 * 
 * This file is prepared for future local font loading.
 * Currently using Poppins from Google Fonts as both UI and display font.
 * 
 * To add a custom display font later:
 * 1. Add the font files (woff2) to public/fonts/
 * 2. Define @font-face rules here
 * 3. Update --font-display CSS variable in tokens.css
 */

// Future implementation for local fonts:
/*
export const displayFont = {
  fontFamily: 'ColombiaEdTechDisplay',
  src: [
    {
      path: '/fonts/display-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/display-semibold.woff2', 
      weight: '600',
      style: 'normal',
    },
    {
      path: '/fonts/display-bold.woff2',
      weight: '700', 
      style: 'normal',
    },
  ],
};

export function loadDisplayFont() {
  // Implementation to load and register the display font
  // This will update the CSS variable --font-display
}
*/

// Current configuration - using Poppins for everything
export const fonts = {
  ui: 'Poppins, system-ui, sans-serif',
  display: 'Poppins, system-ui, sans-serif', // Will be replaced with custom font
} as const;

export type FontFamily = keyof typeof fonts;