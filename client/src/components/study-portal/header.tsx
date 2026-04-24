import { Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-black text-white h-14">
      <div className="flex h-full items-center justify-between px-4 lg:px-8 max-w-[1200px] mx-auto">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter">LearnC.</span>
            <span className="text-[10px] font-bold tracking-tight uppercase -mt-1">LearnC.</span>
          </div>
        </div>

        {/* Global Navigation Links (LearnC. Classic Style) */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-wider">
          <a href="#" className="hover:text-gray-300">About OCW</a>
          <a href="#" className="hover:text-gray-300">Help & FAQs</a>
          <a href="#" className="hover:text-gray-300">Contact Us</a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search Icon Only */}
          <button className="text-white hover:text-gray-300">
            <Search className="h-5 w-5" />
          </button>

          {/* Give Now Button (Classic Red Rectangle) */}
          <Button
            variant="default"
            size="sm"
            className="bg-[#A31F34] hover:bg-[#8B1A2C] text-white rounded-none font-bold uppercase text-[10px] px-4 h-9 border-none transition-none flex items-center gap-2 shadow-none"
          >
            Give Now <Heart className="h-3 w-3 fill-white" />
          </Button>
        </div>
      </div>
    </header>
  )
}
