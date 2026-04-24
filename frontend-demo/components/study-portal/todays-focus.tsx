"use client"

import { Clock, BookOpen, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

const focusItems = [
  {
    type: "class",
    title: "Advanced Mathematics",
    subtitle: "Live Session",
    time: "10:00 AM",
    status: "starting-soon",
    category: "Mathematics",
  },
  {
    type: "assignment",
    title: "Physics Lab Report",
    subtitle: "Due Today",
    time: "11:59 PM",
    status: "urgent",
    category: "Science",
  },
]

export function TodaysFocus() {
  return (
    <section>
      <div className="mb-3 border-b border-border pb-2">
        <h2 className="text-xl font-bold">Today&apos;s Focus</h2>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {focusItems.map((item, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border border-border bg-card p-4"
          >
            {/* Status Indicator */}
            {item.status === "urgent" && (
              <div className="absolute right-0 top-0 bg-foreground text-primary-foreground px-2 py-0.5 text-xs uppercase">
                Urgent
              </div>
            )}
            {item.status === "starting-soon" && (
              <div className="absolute right-0 top-0 bg-muted-foreground text-primary-foreground px-2 py-0.5 text-xs uppercase">
                Soon
              </div>
            )}
            
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border">
                {item.type === "class" ? (
                  <BookOpen className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  [{item.category}]
                </span>
                <h3 className="font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              
              {/* Time */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
