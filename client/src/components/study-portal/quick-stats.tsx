import { BookOpen, Clock, Trophy, Target } from "lucide-react"
import { Card } from "@/components/ui/card"

const stats = [
  {
    label: "Courses",
    value: "6",
    change: "+2 this month",
    icon: BookOpen,
  },
  {
    label: "Hours",
    value: "47.5",
    change: "+12.3 this week",
    icon: Clock,
  },
  {
    label: "Badges",
    value: "12",
    change: "+3 unlocked",
    icon: Trophy,
  },
  {
    label: "Goals",
    value: "89%",
    change: "On track",
    icon: Target,
  },
]

export function QuickStats() {
  return (
    <section className="mt-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border border-border bg-card p-4 rounded-none shadow-none flex flex-col gap-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-secondary/30">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold font-mono">{stat.value}</p>
                <p className="text-xs font-mono text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
