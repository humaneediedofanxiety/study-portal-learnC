import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Assignments", href: "/assignments" },
  { name: "Exams", href: "/exams" },
  { name: "Resources", href: "/resources" },
  { name: "Schedule", href: "/schedule" },
  { name: "Profile", href: "/profile" },
]

const adminNavigation = [
  { name: "Admin Stats", href: "/admin" },
  { name: "Manage Users", href: "/admin/users" },
  { name: "Student Access", href: "/admin/students" },
  { name: "Manage Courses", href: "/admin/courses" },
]

const bottomNavigation = [
  { name: "Preferences", href: "/settings" },
]

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuth()

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-48 bg-white lg:bg-transparent border-r lg:border-r-0 border-gray-200 transition-transform duration-200 lg:translate-x-0 shrink-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col pt-8 px-2">
          {/* Simple Text-Based Navigation */}
          <nav className="flex-1 space-y-1">
            <div className="px-4 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Navigation</span>
            </div>
            
            {navigation.map((item) => {
              const isCurrent = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-1.5 text-[13px] font-medium transition-none border-b border-transparent",
                    isCurrent
                      ? "text-[#005b94] font-bold"
                      : "text-[#333333] hover:text-[#005b94] hover:underline"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Admin Panel Section */}
            {user?.role === 'admin' && (
              <div className="pt-6 space-y-1">
                <div className="px-4 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Admin Panel</span>
                </div>
                {adminNavigation.map((item) => {
                  const isCurrent = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "block px-4 py-1.5 text-[13px] font-medium transition-none border-b border-transparent",
                        isCurrent
                          ? "text-[#005b94] font-bold"
                          : "text-[#333333] hover:text-[#005b94] hover:underline"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            )}
          </nav>

          {/* Bottom Navigation */}
          <div className="pb-8 space-y-1 border-t border-gray-200 mt-6 pt-6">
            {bottomNavigation.map((item) => {
              const isCurrent = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-1.5 text-[13px] font-medium transition-none border-b border-transparent",
                    isCurrent
                      ? "text-[#005b94] font-bold"
                      : "text-[#333333] hover:text-[#005b94] hover:underline"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
