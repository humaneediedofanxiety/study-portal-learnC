import { Card } from "@/components/ui/card"

const progressData = [
  { label: "Math", value: 75 },
  { label: "Science", value: 45 },
  { label: "Arts", value: 100 },
  { label: "Tech", value: 20 },
]

function ProgressBar({ 
  value, 
  label 
}: { 
  value: number
  label: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-xs text-muted-foreground uppercase">{label}</span>
      <div className="flex-1 h-3 border border-border bg-secondary">
        <div 
          className="h-full bg-foreground transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-10 text-xs text-right">{value}%</span>
    </div>
  )
}

export function ProgressPanel() {
  const overallProgress = Math.round(
    progressData.reduce((acc, item) => acc + item.value, 0) / progressData.length
  )

  return (
    <Card className="border border-border bg-card rounded-none shadow-none flex flex-col gap-0">
      <div className="border-b border-border p-3 bg-secondary/50">
        <h3 className="font-bold">
          Statistics
        </h3>
      </div>
      
      <div className="p-4">
        {/* Overall Progress */}
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-2xl font-bold">{overallProgress}%</span>
          </div>
          <div className="h-5 border border-border bg-secondary">
            <div 
              className="h-full bg-foreground transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
        
        {/* Individual Course Progress */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">By Category</span>
          {progressData.map((item, index) => (
            <ProgressBar key={index} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </Card>
  )
}
