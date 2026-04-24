"use client"

import { useState } from "react"
import { Header } from "@/components/study-portal/header"
import { Sidebar } from "@/components/study-portal/sidebar"
import { TodaysFocus } from "@/components/study-portal/todays-focus"
import { CourseGrid } from "@/components/study-portal/course-grid"
import { AskGemini } from "@/components/study-portal/ask-gemini"

export default function StudyPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-72">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="px-4 py-6 lg:px-8">
          {/* Today's Focus Strip */}
          <TodaysFocus />
          
          {/* Main Content Grid */}
          <div className="mt-8">
            <CourseGrid />
          </div>
        </main>
        
        {/* Floating Ask Gemini Button */}
        <AskGemini />
      </div>
    </div>
  )
}
