/**
 * Wiki-Style UI Primitives
 * Reusable components implementing the StudyWiki design system
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// =============================================================================
// SECTION HEADER
// =============================================================================

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, subtitle, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-3 border-b border-border pb-2", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {action}
      </div>
      {subtitle && (
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      )}
    </div>
  )
}

// =============================================================================
// WIKI BADGE
// =============================================================================

interface WikiBadgeProps {
  children: React.ReactNode
  variant?: "default" | "muted" | "filled"
  className?: string
}

export function WikiBadge({ children, variant = "default", className }: WikiBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs uppercase",
        {
          "border border-foreground": variant === "default",
          "border border-border text-muted-foreground": variant === "muted",
          "bg-foreground text-primary-foreground": variant === "filled",
        },
        className
      )}
    >
      {children}
    </span>
  )
}

// =============================================================================
// CATEGORY LABEL
// =============================================================================

interface CategoryLabelProps {
  category: string
  className?: string
}

export function CategoryLabel({ category, className }: CategoryLabelProps) {
  return (
    <span className={cn("text-xs text-muted-foreground", className)}>
      [{category}]
    </span>
  )
}

// =============================================================================
// ICON BOX
// =============================================================================

interface IconBoxProps {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

export function IconBox({ children, size = "md", className }: IconBoxProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-border",
        {
          "h-8 w-8": size === "sm",
          "h-10 w-10": size === "md",
          "h-12 w-12": size === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  )
}

// =============================================================================
// WIKI CARD
// =============================================================================

interface WikiCardProps {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export function WikiCard({ children, hover = true, className }: WikiCardProps) {
  return (
    <div
      className={cn(
        "border border-border bg-card",
        hover && "hover:bg-secondary transition-colors",
        className
      )}
    >
      {children}
    </div>
  )
}

interface WikiCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function WikiCardHeader({ children, className }: WikiCardHeaderProps) {
  return (
    <div className={cn("border-b border-border p-3 bg-secondary/50", className)}>
      {children}
    </div>
  )
}

interface WikiCardBodyProps {
  children: React.ReactNode
  className?: string
}

export function WikiCardBody({ children, className }: WikiCardBodyProps) {
  return <div className={cn("p-3", className)}>{children}</div>
}

interface WikiCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function WikiCardFooter({ children, className }: WikiCardFooterProps) {
  return (
    <div className={cn("border-t border-border pt-2 text-xs text-muted-foreground", className)}>
      {children}
    </div>
  )
}

// =============================================================================
// WIKI LINK
// =============================================================================

interface WikiLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

export function WikiLink({ children, className, ...props }: WikiLinkProps) {
  return (
    <a
      className={cn("underline cursor-pointer hover:text-muted-foreground", className)}
      {...props}
    >
      {children}
    </a>
  )
}

// =============================================================================
// STATUS INDICATOR
// =============================================================================

interface StatusIndicatorProps {
  status: "urgent" | "soon" | "normal"
  label?: string
  className?: string
}

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  if (status === "normal") return null
  
  return (
    <div
      className={cn(
        "px-2 py-0.5 text-xs uppercase",
        {
          "bg-foreground text-primary-foreground": status === "urgent",
          "bg-muted-foreground text-primary-foreground": status === "soon",
        },
        className
      )}
    >
      {label || (status === "urgent" ? "Urgent" : "Soon")}
    </div>
  )
}

// =============================================================================
// NAV ITEM
// =============================================================================

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  badge?: number
  active?: boolean
  className?: string
}

export function NavItem({ href, icon, label, badge, active, className }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-center gap-3 px-4 py-2 text-sm border-l-2 transition-colors",
        active
          ? "border-l-foreground bg-secondary text-foreground"
          : "border-l-transparent text-muted-foreground hover:border-l-muted-foreground hover:bg-secondary hover:text-foreground",
        className
      )}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="flex h-5 min-w-5 items-center justify-center border border-foreground px-1.5 text-xs">
          {badge}
        </span>
      )}
    </a>
  )
}

// =============================================================================
// SECTION DIVIDER
// =============================================================================

interface SectionDividerProps {
  label?: string
  className?: string
}

export function SectionDivider({ label, className }: SectionDividerProps) {
  return (
    <div className={cn("border-b border-border", className)}>
      {label && (
        <div className="px-4 py-2 bg-secondary">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// STAT DISPLAY
// =============================================================================

interface StatDisplayProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  className?: string
}

export function StatDisplay({ label, value, icon, className }: StatDisplayProps) {
  return (
    <div className={cn("border border-border bg-card p-3", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs uppercase text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

// =============================================================================
// PROGRESS BAR
// =============================================================================

interface WikiProgressProps {
  value: number
  showLabel?: boolean
  className?: string
}

export function WikiProgress({ value, showLabel = true, className }: WikiProgressProps) {
  return (
    <div className={cn("", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold">{value}%</span>
        </div>
      )}
      <div className="h-2 bg-secondary border border-border">
        <div
          className="h-full bg-foreground transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
