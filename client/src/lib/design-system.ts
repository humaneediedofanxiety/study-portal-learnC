/**
 * Classic LearnC. Style Design System
 * Focus: Simple, flat, old-fashioned academic look
 */

export const colors = {
  light: {
    background: "#f5f5f5",
    foreground: "#333333",
    card: "#FFFFFF",
    cardForeground: "#333333",
    primary: "#005b94", // Classic OCW Blue
    secondary: "#f5f5f5",
    secondaryForeground: "#333333",
    muted: "#f5f5f5",
    mutedForeground: "#666666",
    border: "#CCCCCC",
    input: "#FFFFFF",
    header: "#000000",
    banner: "#005b94",
    accent: "#A31F34", // Give Now Red
  },
  dark: {
    background: "#121212",
    foreground: "#e0e0e0",
    card: "#1e1e1e",
    cardForeground: "#e0e0e0",
    primary: "#3399ff",
    secondary: "#121212",
    secondaryForeground: "#e0e0e0",
    muted: "#1e1e1e",
    mutedForeground: "#999999",
    border: "#333333",
    input: "#1e1e1e",
  },
} as const

export const typography = {
  fontFamily: {
    sans: "'Helvetica Neue', 'Arial', sans-serif",
    serif: "'Georgia', 'Times New Roman', serif",
    mono: "monospace",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.8125rem", // Slightly smaller for that classic feel
    base: "0.9375rem",
    lg: "1.125rem",
    xl: "1.375rem",
    "2xl": "1.75rem",
    "3xl": "2.25rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
} as const

export const borders = {
  width: "1px",
  radius: "0px", // Strict flat design
} as const

export const componentPatterns = {
  card: {
    base: "border border-border bg-card rounded-none shadow-none",
    hover: "hover:border-primary",
    padding: "p-6",
  },
  
  sectionHeader: {
    wrapper: "mb-6 border-b border-border pb-1",
    title: "text-xl font-bold text-foreground",
  },
  
  link: {
    base: "text-primary hover:underline cursor-pointer transition-none",
  },
  
  button: {
    primary: "bg-primary text-white rounded-none border-none transition-none font-bold uppercase py-2 px-4",
    accent: "bg-[#A31F34] text-white rounded-none border-none transition-none font-bold uppercase py-2 px-4",
    outline: "border border-primary text-primary rounded-none bg-transparent hover:bg-primary hover:text-white transition-none",
  },
} as const
