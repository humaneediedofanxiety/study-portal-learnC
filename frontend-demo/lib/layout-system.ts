/**
 * StudyWiki Layout System
 * Defines the structural patterns and layout components for the application
 */

// =============================================================================
// LAYOUT STRUCTURE
// =============================================================================

/**
 * Application Shell Layout
 * 
 * ┌─────────────────────────────────────────────────────────┐
 * │                                                         │
 * │  ┌──────────┐  ┌─────────────────────────────────────┐  │
 * │  │          │  │           HEADER                    │  │
 * │  │          │  │  [Menu] [Search...] [Icons] [User]  │  │
 * │  │          │  ├─────────────────────────────────────┤  │
 * │  │          │  │                                     │  │
 * │  │  SIDEBAR │  │           MAIN CONTENT              │  │
 * │  │          │  │                                     │  │
 * │  │  - Nav   │  │  ┌─────────────────────────────┐    │  │
 * │  │  - Links │  │  │  SECTION HEADER             │    │  │
 * │  │          │  │  ├─────────────────────────────┤    │  │
 * │  │          │  │  │  CONTENT GRID               │    │  │
 * │  │          │  │  │  ┌──────┐ ┌──────┐          │    │  │
 * │  │          │  │  │  │ Card │ │ Card │          │    │  │
 * │  │          │  │  │  └──────┘ └──────┘          │    │  │
 * │  │          │  │  └─────────────────────────────┘    │  │
 * │  │          │  │                                     │  │
 * │  └──────────┘  └─────────────────────────────────────┘  │
 * │                                            [FAB]        │
 * └─────────────────────────────────────────────────────────┘
 */

// =============================================================================
// PAGE LAYOUT PATTERNS
// =============================================================================

export const pageLayouts = {
  /**
   * Dashboard Layout
   * - Full-width header strip (Today's Focus)
   * - Content grid below
   */
  dashboard: {
    structure: `
      <main className="px-4 py-6 lg:px-8">
        {/* Focus Strip - Full width */}
        <TodaysFocus />
        
        {/* Content Grid */}
        <div className="mt-8">
          <CourseGrid />
        </div>
      </main>
    `,
    spacing: {
      padding: { mobile: "px-4 py-6", desktop: "lg:px-8" },
      sectionGap: "mt-8",
    },
  },

  /**
   * Two-Column Layout
   * - Main content (2/3 width)
   * - Sidebar panel (1/3 width)
   */
  twoColumn: {
    structure: `
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Main Content */}
        </div>
        <div className="space-y-6">
          {/* Sidebar Panels */}
        </div>
      </div>
    `,
    breakpoint: "lg",
    ratio: "2:1",
  },

  /**
   * List Layout
   * - Section header with title and action
   * - Stacked cards/items
   */
  list: {
    structure: `
      <section>
        <div className="mb-3 border-b border-border pb-2 flex items-center justify-between">
          <h2 className="text-xl font-bold">Section Title</h2>
          <Button variant="link">View All</Button>
        </div>
        <div className="space-y-3">
          {/* List items */}
        </div>
      </section>
    `,
  },
} as const

// =============================================================================
// SIDEBAR LAYOUT
// =============================================================================

export const sidebarLayout = {
  width: "w-64",           // 256px
  position: "fixed inset-y-0 left-0",
  zIndex: "z-50",
  border: "border-r border-sidebar-border",
  background: "bg-sidebar",
  
  // Content offset on desktop
  contentOffset: "lg:pl-64",  // Match sidebar width
  
  // Mobile behavior
  mobile: {
    hidden: "-translate-x-full",
    visible: "translate-x-0",
    overlay: "fixed inset-0 bg-foreground/20",
    transition: "transition-transform duration-200",
  },
  
  structure: {
    header: {
      height: "h-14",
      content: "Logo + Title",
      border: "border-b border-sidebar-border",
    },
    navigation: {
      padding: "py-2",
      itemSpacing: "gap-0",  // Items touch each other
    },
    footer: {
      border: "border-t border-sidebar-border",
      padding: "py-2",
    },
  },
} as const

// =============================================================================
// HEADER LAYOUT
// =============================================================================

export const headerLayout = {
  height: "h-14",          // 56px
  position: "sticky top-0",
  zIndex: "z-40",
  border: "border-b border-border",
  background: "bg-card",
  padding: "px-4 lg:px-8",
  
  structure: {
    left: "Mobile menu button (lg:hidden)",
    center: "Search bar (flex-1 max-w-md)",
    right: "Theme toggle, Notifications, User info",
  },
  
  itemGap: "gap-2",        // Between right-side items
  mainGap: "gap-4",        // Between sections
} as const

// =============================================================================
// CARD LAYOUTS
// =============================================================================

export const cardLayouts = {
  /**
   * Article Card (Course Card)
   * 
   * ┌─────────────────────────┐
   * │     IMAGE (grayscale)   │
   * ├─────────────────────────┤
   * │ [Category]        [...] │
   * │ Title (underlined)      │
   * ├─────────────────────────┤
   * │ Instructor: Name        │
   * │ [Completed]             │
   * │ Progress: 18/24  75%    │
   * │ ████████████░░░░        │
   * ├─────────────────────────┤
   * │ 👥 156    Last: 2h ago  │
   * └─────────────────────────┘
   */
  article: {
    image: {
      height: "h-32",
      filter: "grayscale group-hover:grayscale-0",
    },
    header: {
      background: "bg-secondary/50",
      padding: "p-3",
      border: "border-b border-border",
    },
    body: {
      padding: "p-3",
    },
    footer: {
      padding: "pt-2",
      border: "border-t border-border",
    },
  },

  /**
   * Focus Card (Priority Item)
   * 
   * ┌─────────────────────────────┐
   * │ ┌────┐ [Category]    Soon  │
   * │ │Icon│ Title               │
   * │ └────┘ Subtitle     10:00  │
   * └─────────────────────────────┘
   */
  focus: {
    padding: "p-4",
    iconSize: "h-10 w-10",
    layout: "flex items-start gap-3",
    statusBadge: "absolute right-0 top-0",
  },

  /**
   * Stat Card (If used)
   * 
   * ┌─────────────────┐
   * │ Label    [Icon] │
   * │ Value           │
   * └─────────────────┘
   */
  stat: {
    padding: "p-3",
    layout: "flex items-center justify-between",
    valueSize: "text-2xl font-bold",
  },
} as const

// =============================================================================
// GRID SYSTEMS
// =============================================================================

export const gridSystems = {
  /**
   * Responsive Card Grid
   * 1 col on mobile, 2 cols on sm+
   */
  cards: {
    base: "grid gap-3",
    responsive: "sm:grid-cols-2",
    class: "grid gap-3 sm:grid-cols-2",
  },

  /**
   * Three Column Grid
   * For larger content areas
   */
  threeCol: {
    base: "grid gap-3",
    responsive: "sm:grid-cols-2 lg:grid-cols-3",
    class: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
  },

  /**
   * Dashboard Grid
   * Main content + sidebar
   */
  dashboard: {
    base: "grid gap-6",
    responsive: "lg:grid-cols-3",
    mainCol: "lg:col-span-2",
    sideCol: "space-y-6",
  },
} as const

// =============================================================================
// SPACING PATTERNS
// =============================================================================

export const spacingPatterns = {
  // Page-level spacing
  page: {
    padding: "px-4 py-6 lg:px-8",
  },
  
  // Section spacing
  section: {
    marginTop: "mt-8",
    headerMargin: "mb-3",
    headerPadding: "pb-2",
  },
  
  // Card internal spacing
  card: {
    padding: "p-3",
    headerPadding: "p-3",
    gap: "gap-3",
  },
  
  // List item spacing
  list: {
    gap: "gap-3",      // Between items in grid
    space: "space-y-3", // Between items in stack
  },
  
  // Icon spacing
  icon: {
    gap: "gap-2",      // Between icon and text
    containerGap: "gap-3", // Between icon container and content
  },
} as const

// =============================================================================
// Z-INDEX LAYERS
// =============================================================================

export const zIndexLayers = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  header: 40,
  sidebar: 50,
  modal: 60,
  tooltip: 70,
  fab: 50,
} as const

// =============================================================================
// FLOATING ACTION BUTTON (FAB)
// =============================================================================

export const fabLayout = {
  position: "fixed bottom-6 right-6",
  size: "h-12 w-12",
  zIndex: "z-50",
  
  // Expanded panel
  panel: {
    position: "fixed bottom-6 right-6",
    width: "w-96 max-w-[calc(100vw-3rem)]",
    maxHeight: "max-h-[calc(100vh-6rem)]",
  },
} as const

// =============================================================================
// RESPONSIVE BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: "640px",   // Small tablets
  md: "768px",   // Tablets
  lg: "1024px",  // Laptops (sidebar visible)
  xl: "1280px",  // Desktops
  "2xl": "1536px", // Large screens
} as const

/**
 * Common responsive patterns:
 * 
 * - Sidebar: Hidden on mobile, fixed on lg+
 * - Grid: 1 col -> 2 cols at sm
 * - Padding: px-4 -> lg:px-8
 * - Header elements: Some hidden on sm, shown on md+
 */
