---
name: Orion Intelligence System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#40484f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#717880'
  outline-variant: '#c0c7d0'
  surface-tint: '#106492'
  primary: '#004569'
  on-primary: '#ffffff'
  primary-container: '#005e8c'
  on-primary-container: '#a4d5ff'
  inverse-primary: '#8fcdff'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#6ef3f3'
  on-secondary-container: '#006e6e'
  tertiary: '#00494a'
  on-tertiary: '#ffffff'
  tertiary-container: '#006363'
  on-tertiary-container: '#71e1e1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbe6ff'
  primary-fixed-dim: '#8fcdff'
  on-primary-fixed: '#001e30'
  on-primary-fixed-variant: '#004b71'
  secondary-fixed: '#72f6f6'
  secondary-fixed-dim: '#50dad9'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#85f4f4'
  tertiary-fixed-dim: '#67d8d8'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#004f50'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  deep-obsidian: '#0F172A'
  teal-glow: rgba(0, 178, 178, 0.15)
  verification-green: '#10B981'
  suspicious-amber: '#F59E0B'
  counterfeit-red: '#EF4444'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.08em
  mono-data:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  edge-margin-desktop: 80px
  edge-margin-mobile: 20px
  gutter: 32px
  section-gap: 160px
  card-padding: 40px
---

## Brand & Style

This design system embodies the intersection of deep-tech reliability and life-saving precision. The brand personality is **authoritative yet ethereal**, blending the clinical rigor required for healthcare with the fluid, "living" nature of high-end AI software. It targets high-stakes stakeholders—regulators, manufacturers, and medical professionals—who demand absolute trust and a frictionless, premium experience.

The visual style is a hybrid of **Modern Corporate** and **Glassmorphism**. It leverages the structural efficiency of Linear, the aesthetic polish of Apple, and the technical depth of Stripe. The interface feels "alive" through the use of:
- **Atmospheric Depth:** Multi-layered frosted surfaces and soft teal glows that suggest intelligence happening behind the glass.
- **Precision Minimalism:** High-contrast typography and generous whitespace to ensure critical data (Authenticity Scores, Risk Levels) is never obscured.
- **Tactile Intelligence:** Elements that respond to user presence with subtle depth changes and vibrant, glowing status indicators.

## Colors

The palette is anchored in **Deep Obsidian** and **Pure White** to establish a high-contrast foundation for clinical legibility. The primary brand color is a sophisticated **Deep Teal**, used for high-action elements and core branding. 

**Teal and Cyan gradients** act as "intelligence signals." These are used sparingly for active states, data visualizations, and glassmorphic background glows. Functional colors (Red, Amber, Green) are reserved strictly for risk assessment and verification status to maintain their semantic urgency. 

- **Primary:** Deep, trust-inducing blue-teal for buttons and navigation.
- **Secondary/Tertiary:** Bright cyan and soft aquamarine for "scan" animations and glowing highlights.
- **Neutral:** A range of cool grays that prevent the UI from feeling sterile, moving from crisp white backgrounds to subtle "Off-Ice" surface containers.

## Typography

The system uses a tri-font hierarchy to balance expressive brand moments with technical utility:
1. **Plus Jakarta Sans (Headers):** Chosen for its modern, friendly, yet professional geometric structure. Used in massive scales for hero sections and section titles.
2. **Inter (Body):** The industry standard for readability in SaaS. Used for all descriptive text, reporting, and documentation.
3. **Geist (Labels/Data):** A technical, monospaced-leaning font used for "Intelligence Labels," batch numbers, and metadata to reinforce the sense of "coded" accuracy.

Large-scale headlines should always use tight letter-spacing (`-0.02em` to `-0.04em`) to create the "Stripe-like" premium density.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop to maintain a premium "editorial" feel, centered within a 1440px container.

- **Vertical Rhythm:** Extreme whitespace (160px gaps) between major sections mimics the breathing room found in high-end consumer tech (Apple).
- **The Intelligence Grid:** Content cards use a 12-column grid. Key "Floating Intelligence" cards often span 4-6 columns and overlap grid boundaries slightly to create a sense of depth.
- **Mobile Reflow:** On mobile, margins shrink to 20px, and section gaps reduce to 80px. Card-based components stack vertically, maintaining the internal 24px-32px padding for touch targets.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Glassmorphism**, rather than traditional flat borders.

- **Surface 0 (Base):** Pure White or an extremely light Teal-tinted neutral.
- **Surface 1 (Floating Cards):** Uses a white background with 80% opacity and a 20px backdrop blur. These cards feature a "Soft-Deep" shadow: a dual-layered shadow with a tight 4px / 10% opacity core and a diffuse 40px / 5% opacity outer bloom.
- **Intelligence Glows:** Active cards or "Verified" states project a subtle teal drop-shadow (bloom) that mimics light passing through tinted glass.
- **Outlines:** Only used on buttons or as a 1px "inner-glow" stroke on glass cards to define edges against bright backgrounds.

## Shapes

The shape language is defined by **High-Radius Curvature**. 

- **Primary Cards:** Use a 32px corner radius to create a soft, friendly, and premium feel. 
- **Buttons & Inputs:** Use a 12px radius to provide a distinct "utility" feel compared to the softer containers they sit within.
- **Status Pills:** Always fully rounded (pill-shaped) to distinguish them from interactive buttons.
- **Interactive States:** When hovered, cards should subtly "lift" using a scale transform (1.02x) and an increase in shadow diffusion.

## Components

### Buttons
- **Primary:** Deep Teal background, white text, 12px radius. Features a subtle inner-light stroke on the top edge for a tactile feel.
- **Secondary/Ghost:** Transparent background with a 1px "Glass-Stroke" (semi-transparent gray). On hover, fills with a light Teal-tinted glow.

### Floating Intelligence Cards
These are the signature component. They must have a `backdrop-filter: blur(20px)` and a subtle 1px white border at 20% opacity. They should contain "Live" data, such as real-time OCR extraction results or match scores.

### Medicine Scanner UI
The scanner interface should use a "Scanning" animation—a horizontal teal laser line that moves vertically within a glass container. OCR text should "pop" into existence using a staggered fade-in animation.

### Risk Heatmaps
Maps should use "Globs" (metaballs) of color rather than sharp points to represent risk zones, reinforcing the fluid, organic brand identity.

### Input Fields
Inputs are minimalist: no bottom border, only a very soft 4% gray fill and a 12px radius. Upon focus, they develop a 2px teal glow "ring."