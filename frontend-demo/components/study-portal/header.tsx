"use client"

import { Bell, Menu, Search, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle("dark", newIsDark)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-8">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden border border-border"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10 bg-input border border-border text-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-foreground"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="border border-border hover:bg-secondary"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative border border-border hover:bg-secondary"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 bg-foreground" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Info */}
          <div className="hidden sm:flex items-center gap-2 border border-border px-3 py-1.5">
            <span className="font-mono text-sm">User:JohnD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
