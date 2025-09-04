# Colombia EdTech - Style Guide

This document outlines the design system implementation for the Colombia EdTech website.

## Design Tokens System

All design tokens are defined in `src/styles/tokens.css` using CSS custom properties. This approach allows for easy theming and consistent design across the entire application.

### Color Palette

#### Brand Colors
- `--color-primary-900`: #003889 (Navy Blue - Primary Dark)
- `--color-primary-700`: #0B47CE (Royal Blue - Primary)
- `--color-accent`: #F73C5C (Coral Red - Accent)
- `--color-sand`: #F4E8DD (Sand - Secondary)

#### Grayscale
- `--gray-900`: #111111 (Almost Black)
- `--gray-700`: #3A3A3A (Dark Gray)
- `--gray-500`: #7A7A7A (Medium Gray)
- `--gray-300`: #D1D5DB (Light Gray)
- `--gray-50`: #FAFAFA (Almost White)

### Typography

#### Font Families
- `--font-ui`: Poppins (UI text, currently used for both UI and display)
- `--font-display`: Poppins (Display headings, will be replaced with custom font)

#### Fluid Typography Scale
- `--fs-xs`: clamp(0.78rem, 0.73rem + 0.2vw, 0.84rem)
- `--fs-sm`: clamp(0.9rem, 0.86rem + 0.2vw, 0.98rem)
- `--fs-base`: clamp(1rem, 0.96rem + 0.25vw, 1.1rem)
- `--fs-lg`: clamp(1.12rem, 1.06rem + 0.3vw, 1.28rem)
- `--fs-xl`: clamp(1.35rem, 1.2rem + 0.8vw, 1.8rem)
- `--fs-2xl`: clamp(1.7rem, 1.4rem + 1.4vw, 2.4rem)
- `--fs-3xl`: clamp(2.1rem, 1.7rem + 2vw, 3rem)

### Spacing Scale
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 24px
- `--space-5`: 32px
- `--space-6`: 48px
- `--space-7`: 64px
- `--space-8`: 80px

## Utility Classes

Global utility classes are defined in `src/styles/utilities.css`:

### Layout
- `.container`: Max-width container with responsive padding
- `.section`: Standard section padding (48px vertical)

### Typography
- `.prose`: Content styling for MDX/markdown content
- Heading styles (h1-h4) with proper hierarchy

### Components
- `.card`: Standard card component with hover effects
- `.btn`, `.btn-primary`, `.btn-secondary`, etc.: Button variants
- `.badge`: Small label component
- `.kpi`: Key Performance Indicator component
- Grid utilities (`.grid-2`, `.grid-3`, `.grid-auto`)

## Component Guidelines

### Buttons
Use the utility classes for consistent button styling:
```css
.btn-primary /* Blue primary button */
.btn-secondary /* Sand secondary button */
.btn-accent /* Coral accent button */
.btn-outline /* Outlined button */
```

### Cards
Use the `.card` class for consistent card styling with hover effects.

### Focus States
All interactive elements should use the focus ring utility:
```css
.focus-ring /* or use :focus-visible with --ring variable */
```

## Changing Colors and Fonts

### To Change Brand Colors:
1. Update the color values in `src/styles/tokens.css`
2. Optionally update the HSL values in `src/index.css` for Tailwind integration

### To Add Custom Display Font:
1. Add font files to `public/fonts/`
2. Update `src/lib/fonts.ts` with font-face definitions
3. Update `--font-display` variable in `src/styles/tokens.css`
4. Call font loading function in application

### To Adjust Spacing:
Update the `--space-*` variables in `src/styles/tokens.css`

### To Modify Typography Scale:
Adjust the `clamp()` values in the `--fs-*` variables for responsive typography

## Responsive Design

The design system includes responsive utilities:
- Container padding adjusts on mobile
- Section padding reduces on smaller screens
- Grid layouts stack to single column on mobile
- Typography scales fluidly with viewport width

## Accessibility

- All interactive elements have proper focus states
- Color contrast meets WCAG guidelines
- Focus rings use the `--ring` color (accent color)
- Font sizes are accessible and scale appropriately

## Implementation Notes

- Always use CSS variables instead of hardcoded values
- Prefer utility classes over component-specific styles
- Maintain the cascade: tokens → utilities → components → pages
- Test color changes across light/dark modes
- Ensure proper font fallbacks are maintained

## File Structure

```
src/
├── styles/
│   ├── tokens.css      # Design tokens and CSS variables
│   └── utilities.css   # Global utility classes
├── lib/
│   └── fonts.ts        # Font configuration and loading
└── index.css          # Tailwind integration and base styles
```

This system ensures consistent styling across the application while making it easy to update the brand appearance globally.