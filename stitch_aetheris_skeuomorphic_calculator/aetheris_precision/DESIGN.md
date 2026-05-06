---
name: Aetheris Precision
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#00e639'
  on-tertiary: '#003907'
  tertiary-container: '#001701'
  on-tertiary-container: '#009220'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#72ff70'
  tertiary-fixed-dim: '#00e639'
  on-tertiary-fixed: '#002203'
  on-tertiary-fixed-variant: '#00530e'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-brand:
    fontFamily: Instrument Serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.05em
  lcd-main:
    fontFamily: Barlow
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  button-label:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-small:
    fontFamily: workSans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  button-gap: 12px
  bezel-margin: 24px
  display-padding: 20px
  section-gutter: 32px
---

## Brand & Style

This design system embodies the essence of "Technical Luxury." It is a high-fidelity skeuomorphic interface that merges the tactile reliability of 20th-century laboratory instruments with the sleek minimalism of modern aerospace engineering. The target audience includes professionals who value precision, tactile feedback, and a premium aesthetic that transcends standard flat UI.

The style is **Tactile Skeuomorphism**. It leverages physical metaphors—brushed metals, matte resins, and recessed glass—to create a sense of permanence and professional-grade quality. Every interaction is designed to feel weighted and intentional, evoking an emotional response of absolute confidence and sophisticated control.

## Colors

The palette is rooted in monochromatic depth to emphasize material texture over flat color.

- **Primary (Matte Carbon):** Used for the main chassis and button faces. It provides a non-reflective, high-end finish.
- **Secondary (Brushed Titanium):** Used for structural accents, bezels, and highlights to define the physical boundaries of the device.
- **Tertiary (LCD Phosphor):** A glowing electronic green used exclusively for digital readouts and active states, mimicking heritage vacuum fluorescent displays.
- **Neutral:** Pure white is used sparingly for high-contrast labels and laser-etched iconography.

## Typography

Typography is divided into two distinct roles: Branding and Interface.

- **Branding:** 'Instrument Serif' (mapped to Noto Serif for system fidelity) is used for the "Aetheris" wordmark and high-level headers. It should be treated as if it were laser-etched or silk-screened onto the metal casing.
- **Interface:** 'Barlow' (mapped to Work Sans for versatility) handles all functional data. It provides the necessary geometric clarity for mathematical digits and condensed button labels. 
- **Readout:** Large numeric values in the LCD display should utilize tight tracking and high weights to maximize legibility against the glow effects.

## Layout & Spacing

The layout follows a **fixed grid** model, mimicking the physical constraints of a handheld or desktop scientific instrument. 

- **Chassis Margins:** A generous 24px outer margin represents the physical bezel of the device.
- **Button Matrix:** Buttons are arranged in a strict 4 or 5 column grid with 12px gaps. This density ensures a professional, tool-like feel.
- **The "Display" Area:** The top section is reserved for the LCD, isolated by a significant 32px gutter from the input controls to prevent visual clutter and accidental interactions.

## Elevation & Depth

Depth is the core differentiator of this system. It is achieved through a "Dual-Light" technique:

- **Positive Elevation (Buttons):** Buttons use a top-left highlight (#FFFFFF at 10% opacity) and a bottom-right deep shadow (#000000 at 60% opacity). When pressed, these values invert and the element shifts 1px downward to simulate physical travel.
- **Negative Elevation (The Display):** The LCD screen is recessed. Use a heavy inner shadow (top and left) to create a "glass-under-metal" effect.
- **Surface Texture:** A subtle noise overlay (2-3% opacity) should be applied to the primary carbon background to simulate the matte grain of titanium.
- **Glare:** A diagonal linear gradient (white to transparent at 5% opacity) should be overlaid on the display glass to simulate environmental light reflection.

## Shapes

The shape language is precise and "machined." 

- **Primary Elements:** Buttons and the main display use a subtle 4px (Soft) radius, reflecting high-end milling where edges are eased but remain structural.
- **Interactive States:** Active indicators (LEDs) are perfectly circular (Pill-shaped) to distinguish them from functional interaction points.
- **Containers:** The main device chassis may use a larger 12px radius to feel ergonomic in the hand.

## Components

### Buttons
- **Standard:** Matte Carbon (#121212) with white Barlow text.
- **Function Keys:** Slightly lighter gray (#1A1A1A) to distinguish from numerals.
- **Action (Enter/Equal):** Features the tertiary green glow as a subtle outer shadow when active.
- **Interaction:** Must include a 'click' haptic feel (1px Y-axis shift and shadow reduction).

### The Display (LCD)
- A recessed container with a background of #080808.
- Text uses a "Glow" effect: a CSS drop-shadow with 0px blur and 8px spread in the tertiary green at 30% opacity.
- Incorporate a subtle scanline pattern (1px horizontal lines) at 5% opacity.

### Toggle Switches
- Mode selections (e.g., Rad/Deg) should use physical-style sliding toggles or rocker switches rather than checkboxes.
- Use a brushed metal texture for the switch handle.

### Status LEDs
- Small circular indicators that "light up" using a radial gradient from the center (Tertiary color) to a dark outer ring.

### Input Fields
- Numeric inputs are treated as "live" readouts. There are no traditional text boxes; instead, data is entered into the "Recessed Display" component.