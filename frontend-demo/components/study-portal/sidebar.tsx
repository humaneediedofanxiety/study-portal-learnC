"use client"

import { 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  MessageSquare, 
  Settings, 
  X,
  LayoutDashboard,
  FileText,
  Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navigation = [
  { name: "Main Page", icon: LayoutDashboard, href: "#", current: true },
  { name: "Courses", icon: BookOpen, href: "#", current: false },
  { name: "Assignments", icon: FileText, href: "#", current: false, badge: 3 },
  { name: "Schedule", icon: Calendar, href: "#", current: false },
  { name: "Discussion", icon: MessageSquare, href: "#", current: false, badge: 5 },
  { name: "Achievements", icon: Trophy, href: "#", current: false },
]

const bottomNavigation = [
  { name: "Preferences", icon: Settings, href: "#" },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo & Close Button */}
          <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center border border-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">StudyWiki</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden border border-border"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation Title */}
          <div className="border-b border-border px-4 py-2 bg-secondary">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Navigation</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-2 text-sm border-l-2 transition-colors",
                  item.current
                    ? "border-l-foreground bg-secondary text-foreground"
                    : "border-l-transparent text-muted-foreground hover:border-l-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center border border-foreground px-1.5 text-xs">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="border-t border-sidebar-border py-2">
            {bottomNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground border-l-2 border-l-transparent hover:border-l-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
