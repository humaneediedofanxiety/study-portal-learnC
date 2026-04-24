"use client"

import { CheckCircle2, Circle, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const tasks = [
  {
    id: 1,
    title: "Complete Math Quiz",
    course: "Advanced Mathematics",
    dueDate: "Today, 6:00 PM",
    status: "pending",
    priority: "high",
  },
  {
    id: 2,
    title: "Read Chapter 5",
    course: "Quantum Mechanics",
    dueDate: "Tomorrow",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    title: "Submit Essay Draft",
    course: "Creative Writing",
    dueDate: "Apr 26",
    status: "completed",
    priority: "low",
  },
  {
    id: 4,
    title: "Watch Video Lecture",
    course: "Data Science",
    dueDate: "Apr 27",
    status: "pending",
    priority: "medium",
  },
]

const priorityLabels = {
  high: "[HIGH]",
  medium: "[MED]",
  low: "[LOW]",
}

export function UpcomingTasks() {
  return (
    <Card className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-3 bg-secondary/50">
        <h3 className="font-bold">
          Task List
        </h3>
        <span className="text-xs text-muted-foreground uppercase">
          This Week
        </span>
      </div>
      
      <div className="divide-y divide-border">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-start gap-3 p-3 hover:bg-secondary transition-colors"
          >
            {/* Checkbox */}
            <button className="mt-0.5 shrink-0">
              {task.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              )}
            </button>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {priorityLabels[task.priority as keyof typeof priorityLabels]}
                </span>
              </div>
              <p className={cn(
                "text-sm",
                task.status === "completed" 
                  ? "text-muted-foreground line-through" 
                  : "text-foreground"
              )}>
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {task.course}
              </p>
            </div>
            
            {/* Due Date */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="h-3 w-3" />
              <span>{task.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Link */}
      <div className="border-t border-border p-3">
        <button className="w-full text-center text-sm underline hover:text-muted-foreground transition-colors">
          View All Tasks
        </button>
      </div>
    </Card>
  )
}
