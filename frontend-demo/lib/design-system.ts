/**
 * StudyWiki Design System
 * A black and white, retro wiki-style theme with sans-serif typography
 * 
 * Core Principles:
 * - Monochrome color palette (black, white, grays only)
 * - No rounded corners (0px radius everywhere)
 * - No shadows (flat design)
 * - Solid 1px borders only
 * - Sans-serif typography (Inter)
 * - Utilitarian, information-dense layouts
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
  light: {
    background: "#FAFAFA",      // Page background - off-white
    foreground: "#1A1A1A",      // Primary text - near-black
    card: "#FFFFFF",            // Card/panel backgrounds - pure white
    cardForeground: "#1A1A1A",  // Card text
    secondary: "#F0F0F0",       // Secondary backgrounds, hover states
    secondaryForeground: "#1A1A1A",
    muted: "#E8E8E8",           // Disabled states, dividers
    mutedForeground: "#666666", // Secondary text, captions
    border: "#1A1A1A",          // All borders - same as foreground
    input: "#FFFFFF",           // Input backgrounds
  },
  dark: {
    background: "#0A0A0A",      // Page background - near-black
    foreground: "#E8E8E8",      // Primary text - off-white
    card: "#141414",            // Card/panel backgrounds
    cardForeground: "#E8E8E8",  // Card text
    secondary: "#1F1F1F",       // Secondary backgrounds, hover states
    secondaryForeground: "#E8E8E8",
    muted: "#262626",           // Disabled states, dividers
    mutedForeground: "#888888", // Secondary text, captions
    border: "#E8E8E8",          // All borders - same as foreground
    input: "#1F1F1F",           // Input backgrounds
  },
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  fontFamily: {
    sans: "var(--font-inter), 'Helvetica Neue', 'Arial', sans-serif",
  },
  fontSize: {
    xs: "0.75rem",    // 12px - captions, badges
    sm: "0.875rem",   // 14px - body small, labels
    base: "1rem",     // 16px - body text
    lg: "1.125rem",   // 18px - large body
    xl: "1.25rem",    // 20px - section headers
    "2xl": "1.5rem",  // 24px - page headers
    "3xl": "1.875rem", // 30px - large titles
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",  // 2px
  1: "0.25rem",     // 4px
  1.5: "0.375rem",  // 6px
  2: "0.5rem",      // 8px - base unit
  3: "0.75rem",     // 12px
  4: "1rem",        // 16px
  5: "1.25rem",     // 20px
  6: "1.5rem",      // 24px
  8: "2rem",        // 32px
  10: "2.5rem",     // 40px
  12: "3rem",       // 48px
  16: "4rem",       // 64px
} as const

// =============================================================================
// BORDERS
// =============================================================================

export const borders = {
  width: "1px",           // Always 1px
  style: "solid",         // Always solid
  radius: "0",            // Always 0 (no rounded corners)
} as const

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  none: "none",           // No shadows used in this theme
} as const

// =============================================================================
// TRANSITIONS
// =============================================================================

export const transitions = {
  fast: "all 0.1s ease",
  normal: "all 0.15s ease",
  slow: "all 0.2s ease",
} as const

// =============================================================================
// LAYOUT CONSTANTS
// =============================================================================

export const layout = {
  sidebar: {
    width: "256px",       // 16rem / w-64
    collapsedWidth: "0",
  },
  header: {
    height: "56px",       // 3.5rem / h-14
  },
  content: {
    maxWidth: "1280px",   // max-w-6xl
    padding: {
      mobile: "16px",     // px-4
      desktop: "32px",    // px-8
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

// =============================================================================
// COMPONENT PATTERNS
// =============================================================================

export const componentPatterns = {
  // Card pattern - boxed container with border
  card: {
    base: "border border-border bg-card",
    hover: "hover:bg-secondary transition-colors",
    padding: "p-3",
  },
  
  // Section header pattern
  sectionHeader: {
    wrapper: "mb-3 border-b border-border pb-2",
    title: "text-xl font-bold",
    subtitle: "text-sm text-muted-foreground",
  },
  
  // Badge pattern - bordered inline element
  badge: {
    base: "inline-block border border-foreground px-2 py-0.5 text-xs uppercase",
    muted: "inline-block border border-border px-2 py-0.5 text-xs uppercase text-muted-foreground",
  },
  
  // Button patterns
  button: {
    primary: "border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground",
    secondary: "border border-border bg-background text-foreground hover:bg-secondary",
    ghost: "border border-border hover:bg-secondary",
    link: "underline underline-offset-2 decoration-1",
  },
  
  // Input pattern
  input: {
    base: "border border-border bg-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground",
  },
  
  // Navigation item pattern
  navItem: {
    base: "flex items-center gap-3 px-4 py-2 text-sm border-l-2 transition-colors",
    active: "border-l-foreground bg-secondary text-foreground",
    inactive: "border-l-transparent text-muted-foreground hover:border-l-muted-foreground hover:bg-secondary hover:text-foreground",
  },
  
  // Status indicator pattern
  statusIndicator: {
    urgent: "bg-foreground text-primary-foreground px-2 py-0.5 text-xs uppercase",
    soon: "bg-muted-foreground text-primary-foreground px-2 py-0.5 text-xs uppercase",
  },
  
  // Category label pattern (wiki-style)
  categoryLabel: {
    base: "text-xs text-muted-foreground",
    format: (category: string) => `[${category}]`,
  },
  
  // Icon container pattern
  iconContainer: {
    base: "flex items-center justify-center border border-border",
    sizes: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    },
  },
} as const

// =============================================================================
// TAILWIND CLASS HELPERS
// =============================================================================

/**
 * Common Tailwind class combinations for this theme
 */
export const tw = {
  // Boxed container with 1px border
  box: "border border-border",
  
  // Section with bottom border
  section: "border-b border-border pb-2 mb-3",
  
  // Hover state
  hoverBg: "hover:bg-secondary transition-colors",
  
  // Text styles
  textPrimary: "text-foreground",
  textSecondary: "text-muted-foreground",
  textCaption: "text-xs text-muted-foreground",
  
  // Title styles
  titleLg: "text-xl font-bold",
  titleMd: "text-lg font-bold",
  titleSm: "font-bold",
  
  // Link style (wiki-style underline)
  link: "underline cursor-pointer",
  
  // Flex patterns
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexStart: "flex items-start gap-3",
  
  // Grid patterns
  grid2: "grid gap-3 sm:grid-cols-2",
  grid3: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
  grid4: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
  
  // Spacing
  gap2: "gap-2",
  gap3: "gap-3",
  gap4: "gap-4",
  p3: "p-3",
  p4: "p-4",
  px4: "px-4",
  py2: "py-2",
} as const

// =============================================================================
// ICON SIZES
// =============================================================================

export const iconSizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
} as const
