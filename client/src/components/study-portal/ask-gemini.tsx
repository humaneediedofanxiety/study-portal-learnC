import { useState } from "react"
import { HelpCircle, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function AskGemini() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    { 
      role: "ai", 
      content: "Welcome to the Help Desk. How may I assist you with your studies today?" 
    }
  ])

  const handleSend = async () => {
    if (!message.trim() || isLoading) return
    
    const userMessage = message.trim()
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setMessage("")
    setIsLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "Based on the available documentation, I recommend reviewing the Quantum Mechanics article, specifically the section on wave functions. Would you like me to provide a direct link?" 
      }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 h-12 w-12 border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background transition-colors",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <HelpCircle className="h-6 w-6" />
        <span className="sr-only">Open Help Desk</span>
      </Button>
      
      {/* Chat Panel */}
      <Card
        className={cn(
          "fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] border border-border bg-card transition-all duration-200 overflow-hidden",
          isOpen 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-foreground p-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-background" />
            <div>
              <h3 className="font-bold text-background">Help Desk</h3>
              <p className="text-xs text-background/70">Study Assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-background hover:bg-background/20 h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Messages */}
        <div className="h-72 overflow-y-auto p-3 space-y-3 bg-secondary/30">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] border px-3 py-2 text-sm",
                  msg.role === "user"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="border border-border bg-card px-3 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Processing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-border bg-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              className="h-10 w-10 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
