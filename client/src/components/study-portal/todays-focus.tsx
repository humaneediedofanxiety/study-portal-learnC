import { ShieldAlert } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export function TodaysFocus() {
  const { user } = useAuth()

  return (
    <section>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between border-b border-primary pb-2 gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">Today's Focus</h2>
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-sm">
          Welcome: {user?.fullName || 'Guest User'}
        </div>
      </div>
      
      <div className="p-12 border border-dashed border-border flex flex-col items-center justify-center text-center bg-secondary/20 rounded-md">
        <ShieldAlert className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">No active course sessions scheduled for today.</p>
        <p className="text-[10px] font-mono text-muted-foreground mt-2 uppercase italic">Registry_Status: [Clear]</p>
      </div>
    </section>
  )
}
