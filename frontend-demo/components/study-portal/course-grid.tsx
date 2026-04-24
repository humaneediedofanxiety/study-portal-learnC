"use client"

import { ExternalLink, MoreHorizontal, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Sarah Chen",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    category: "Mathematics",
    status: "in-progress",
    students: 156,
    lastEdited: "2 hours ago",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Physics: Quantum Mechanics",
    instructor: "Prof. Michael Torres",
    progress: 45,
    totalLessons: 30,
    completedLessons: 14,
    category: "Science",
    status: "in-progress",
    students: 89,
    lastEdited: "Yesterday",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    instructor: "Emma Williams",
    progress: 100,
    totalLessons: 16,
    completedLessons: 16,
    category: "Arts",
    status: "completed",
    students: 234,
    lastEdited: "3 days ago",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Data Science Fundamentals",
    instructor: "Dr. James Park",
    progress: 20,
    totalLessons: 40,
    completedLessons: 8,
    category: "Technology",
    status: "in-progress",
    students: 412,
    lastEdited: "1 week ago",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
  },
]

export function CourseGrid() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
        <h2 className="text-xl font-bold">Course Articles</h2>
        <Button variant="link" className="text-sm underline p-0 h-auto">
          View All
        </Button>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="group border border-border bg-card hover:bg-secondary transition-colors"
          >
            {/* Course Image */}
            <div className="relative h-32 w-full border-b border-border overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all"
              />
            </div>
            
            {/* Course Header */}
            <div className="border-b border-border p-3 bg-secondary/50">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-muted-foreground">
                    [{course.category}]
                  </span>
                  <h3 className="font-bold text-foreground underline cursor-pointer">
                    {course.title}
                  </h3>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7 border border-border">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Course Info */}
            <div className="p-3">
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-medium">Instructor:</span> {course.instructor}
              </p>
              
              {/* Status Badge */}
              {course.status === "completed" && (
                <div className="inline-block border border-foreground px-2 py-0.5 text-xs uppercase mb-3">
                  Completed
                </div>
              )}
              
              {/* Progress */}
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Progress: {course.completedLessons}/{course.totalLessons} lessons
                  </span>
                  <span className="font-bold">{course.progress}%</span>
                </div>
                <Progress 
                  value={course.progress} 
                  className="h-2 bg-secondary border border-border"
                />
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{course.students} enrolled</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Last edit: {course.lastEdited}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
