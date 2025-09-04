# Colombia EdTech Brand Assets Guide

## Logo System Overview

The Colombia EdTech brand system includes two main logo types that can be used individually or together:

### 1. ET Symbol Logo
- Modern, geometric "ET" lettermark
- Compact and versatile for small spaces
- Available in all brand colors

### 2. Colombia EdTech Text Logo  
- Full organization name with accent dot
- Professional and readable
- Primary logo for formal communications

## Available Logo Variants

### ET Symbol Logos
Based on your uploaded assets, we have:

1. **Blue ET on White** (`et-logo-blue.png`)
   - Primary symbol logo
   - Use: Website headers, business cards, letterhead
   - Background: White/light surfaces

2. **Sand ET on Blue** (`et-logo-sand-on-blue.png`)
   - Reversed color version
   - Use: Blue branded sections, hero areas
   - Background: Deep blue (#003889)

3. **Sand ET on Red** (`et-logo-sand-on-red.png`)
   - Accent version  
   - Use: Red themed content, call-to-action areas
   - Background: Accent red (#F73C5C)

4. **Red ET on White** (`et-logo-red.png`)
   - Accent color version
   - Use: Special campaigns, secondary branding
   - Background: White/light surfaces

### Text Logos

1. **Black Text** (`colombia-edtech-black.png`)
   - Most professional version
   - Use: Legal documents, formal communications
   - Background: White/light surfaces

2. **Blue Text + Red Dot** (`colombia-edtech-blue-red-dot.png`)
   - Primary text logo
   - Use: Website headers, digital materials
   - Colors: Blue text (#003889) + Red dot (#F73C5C)

3. **Sand Text on Blue + Red Dot** (`colombia-edtech-sand-on-blue-red-dot.png`)
   - Reversed version with accent
   - Use: Blue backgrounds, hero sections
   - Background: Deep blue (#003889)

4. **Sand Text on Blue + Blue Dot** (`colombia-edtech-sand-on-blue-blue-dot.png`)
   - Monochromatic blue version
   - Use: Subtle blue branded areas
   - Background: Deep blue (#003889)

5. **Sand Text on Red + Blue Dot** (`colombia-edtech-sand-on-red-blue-dot.png`)
   - High-energy version
   - Use: Red branded sections, alerts
   - Background: Accent red (#F73C5C)

## Brand Colors

### Primary Colors
- **Deep Blue**: `#003889` - Primary brand color
- **Bright Blue**: `#0B47CE` - Secondary brand color  
- **Accent Red**: `#F73C5C` - Energy, calls-to-action
- **Sand**: `#F4E8DD` - Warm, approachable backgrounds

### Usage Guidelines

#### Logo Selection by Context

**Website Headers**: Use `colombia-edtech-blue-red-dot`
**Website Footers**: Use `et-logo-blue` or text logo
**Hero Sections**: Use white/sand variants on colored backgrounds
**Navigation**: Use `et-logo-blue` for compact spaces
**Business Cards**: Use `et-logo-blue` or `colombia-edtech-black`
**Social Media**: Use `et-logo-blue` (adapts to platform requirements)

#### Background Combinations

**White Backgrounds**:
- Blue ET logo
- Red ET logo  
- Blue text logo
- Black text logo

**Blue Backgrounds (#003889)**:
- Sand ET logo
- Sand text logo (with red or blue dot)

**Red Backgrounds (#F73C5C)**:
- Sand ET logo
- Sand text logo with blue dot

**Sand Backgrounds (#F4E8DD)**:
- Blue ET logo
- Blue text logo
- Black text logo

## Implementation

### React Components

```tsx
import { ColombiaEdTechLogo } from '@/components/ui/placeholder-logo';

// Symbol only
<ColombiaEdTechLogo 
  variant="symbol-only" 
  colorScheme="blue" 
  size="default" 
/>

// Text only  
<ColombiaEdTechLogo 
  variant="text-only" 
  colorScheme="blue" 
  size="lg" 
/>

// Full logo (symbol + text)
<ColombiaEdTechLogo 
  variant="full" 
  colorScheme="white" 
  size="xl" 
/>
```

### Available Props

- **variant**: `"symbol-only" | "text-only" | "full"`
- **colorScheme**: `"blue" | "red" | "sand" | "white" | "black"`
- **size**: `"sm" | "default" | "lg" | "xl"`

## Accessibility

All logo combinations maintain proper contrast ratios:
- Blue on white: AAA compliant
- White/sand on blue: AAA compliant  
- Red on white: AA compliant
- White/sand on red: AA compliant

## File Organization

```
src/assets/logos/
├── colombia-edtech-logo.tsx     # React component system
├── et-logo-blue.png            # Primary ET symbol
├── et-logo-red.png             # Accent ET symbol  
├── et-logo-sand-on-blue.png    # Reversed ET symbol
├── et-logo-sand-on-red.png     # Accent reversed ET
├── colombia-edtech-black.png   # Professional text logo
├── colombia-edtech-blue-red-dot.png      # Primary text logo
├── colombia-edtech-sand-on-blue-red-dot.png   # Reversed text
├── colombia-edtech-sand-on-blue-blue-dot.png  # Monochrome text
└── colombia-edtech-sand-on-red-blue-dot.png   # Accent text
```

## Brand Assets System

The complete brand system is available in `src/lib/brand-assets.ts` with:
- Color definitions
- Usage guidelines  
- Context-specific recommendations
- Accessibility standards
- Helper functions for logo selection

This ensures consistent, high-quality brand representation across all touchpoints.