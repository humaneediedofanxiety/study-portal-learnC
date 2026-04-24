"use client"

import { 
  SectionHeader, 
  WikiBadge, 
  CategoryLabel, 
  IconBox, 
  WikiCard, 
  WikiCardHeader, 
  WikiCardBody, 
  WikiCardFooter,
  WikiLink,
  StatusIndicator,
  NavItem,
  SectionDivider,
  StatDisplay,
  WikiProgress,
} from "@/components/ui/wiki-primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { BookOpen, Search, Bell, Settings, Check, X, ChevronRight } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-8 py-4">
        <h1 className="text-2xl font-bold">StudyWiki Design System</h1>
        <p className="text-muted-foreground">Black and white, retro wiki-style theme</p>
      </header>

      <main className="px-8 py-8 space-y-12">
        {/* Colors */}
        <section>
          <SectionHeader title="Colors" subtitle="Monochrome palette only" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-border p-4">
              <div className="h-16 bg-background border border-border mb-2" />
              <p className="text-sm font-bold">Background</p>
              <p className="text-xs text-muted-foreground">#FAFAFA / #0A0A0A</p>
            </div>
            <div className="border border-border p-4">
              <div className="h-16 bg-foreground mb-2" />
              <p className="text-sm font-bold">Foreground</p>
              <p className="text-xs text-muted-foreground">#1A1A1A / #E8E8E8</p>
            </div>
            <div className="border border-border p-4">
              <div className="h-16 bg-secondary border border-border mb-2" />
              <p className="text-sm font-bold">Secondary</p>
              <p className="text-xs text-muted-foreground">#F0F0F0 / #1F1F1F</p>
            </div>
            <div className="border border-border p-4">
              <div className="h-16 bg-muted border border-border mb-2" />
              <p className="text-sm font-bold">Muted</p>
              <p className="text-xs text-muted-foreground">#E8E8E8 / #262626</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <SectionHeader title="Typography" subtitle="Inter font family" />
          <div className="space-y-4 border border-border p-4">
            <div>
              <span className="text-xs text-muted-foreground">text-3xl font-bold</span>
              <p className="text-3xl font-bold">Page Title</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">text-2xl font-bold</span>
              <p className="text-2xl font-bold">Section Header</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">text-xl font-bold</span>
              <p className="text-xl font-bold">Subsection Header</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">text-lg</span>
              <p className="text-lg">Large Body Text</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">text-base</span>
              <p className="text-base">Regular body text for content and descriptions.</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">text-sm</span>
              <p className="text-sm">Small text for labels and captions.</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">text-xs</span>
              <p className="text-xs">Extra small text for metadata and badges.</p>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <SectionHeader title="Badges & Labels" />
          <div className="flex flex-wrap gap-4 border border-border p-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">WikiBadge default</span>
              <WikiBadge>Completed</WikiBadge>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">WikiBadge muted</span>
              <WikiBadge variant="muted">Draft</WikiBadge>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">WikiBadge filled</span>
              <WikiBadge variant="filled">New</WikiBadge>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">CategoryLabel</span>
              <CategoryLabel category="Mathematics" />
            </div>
          </div>
        </section>

        {/* Status Indicators */}
        <section>
          <SectionHeader title="Status Indicators" />
          <div className="flex flex-wrap gap-4 border border-border p-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Urgent</span>
              <StatusIndicator status="urgent" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Soon</span>
              <StatusIndicator status="soon" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Custom label</span>
              <StatusIndicator status="urgent" label="Due Today" />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <SectionHeader title="Buttons" />
          <div className="flex flex-wrap gap-4 border border-border p-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Primary</span>
              <Button className="border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground">
                Primary Action
              </Button>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Secondary</span>
              <Button variant="outline" className="border border-border hover:bg-secondary">
                Secondary
              </Button>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Ghost</span>
              <Button variant="ghost" className="border border-border hover:bg-secondary">
                Ghost
              </Button>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Link</span>
              <Button variant="link" className="underline p-0 h-auto">
                View All
              </Button>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Icon</span>
              <Button variant="ghost" size="icon" className="border border-border">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <SectionHeader title="Inputs" />
          <div className="space-y-4 border border-border p-4 max-w-md">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Text Input</span>
              <Input 
                placeholder="Search articles..." 
                className="border border-border focus-visible:ring-0 focus-visible:border-foreground"
              />
            </div>
            <div>
              <span className="text-xs text-muted-foreground block mb-2">With Icon</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 border border-border focus-visible:ring-0 focus-visible:border-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Icon Boxes */}
        <section>
          <SectionHeader title="Icon Containers" />
          <div className="flex flex-wrap gap-4 border border-border p-4">
            <div className="text-center">
              <span className="text-xs text-muted-foreground block mb-2">Small</span>
              <IconBox size="sm"><BookOpen className="h-4 w-4" /></IconBox>
            </div>
            <div className="text-center">
              <span className="text-xs text-muted-foreground block mb-2">Medium</span>
              <IconBox size="md"><BookOpen className="h-5 w-5" /></IconBox>
            </div>
            <div className="text-center">
              <span className="text-xs text-muted-foreground block mb-2">Large</span>
              <IconBox size="lg"><BookOpen className="h-6 w-6" /></IconBox>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <SectionHeader title="Cards" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Basic Card */}
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Basic Card</span>
              <WikiCard>
                <WikiCardBody>
                  <p>Simple card with content.</p>
                </WikiCardBody>
              </WikiCard>
            </div>
            
            {/* Card with Header */}
            <div>
              <span className="text-xs text-muted-foreground block mb-2">With Header</span>
              <WikiCard>
                <WikiCardHeader>
                  <CategoryLabel category="Science" />
                  <h3 className="font-bold underline">Article Title</h3>
                </WikiCardHeader>
                <WikiCardBody>
                  <p className="text-sm text-muted-foreground">Card body content here.</p>
                </WikiCardBody>
              </WikiCard>
            </div>
            
            {/* Full Card */}
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Full Structure</span>
              <WikiCard>
                <WikiCardHeader>
                  <CategoryLabel category="Math" />
                  <h3 className="font-bold underline">Complete Card</h3>
                </WikiCardHeader>
                <WikiCardBody>
                  <p className="text-sm text-muted-foreground mb-3">With all sections.</p>
                  <WikiProgress value={75} />
                </WikiCardBody>
                <WikiCardBody>
                  <WikiCardFooter>
                    <span>Last edit: 2 hours ago</span>
                  </WikiCardFooter>
                </WikiCardBody>
              </WikiCard>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section>
          <SectionHeader title="Navigation Items" />
          <div className="border border-border max-w-xs">
            <SectionDivider label="Navigation" />
            <div className="py-2">
              <NavItem 
                href="#" 
                icon={<BookOpen className="h-4 w-4" />} 
                label="Courses" 
                active 
              />
              <NavItem 
                href="#" 
                icon={<Bell className="h-4 w-4" />} 
                label="Notifications" 
                badge={5}
              />
              <NavItem 
                href="#" 
                icon={<Settings className="h-4 w-4" />} 
                label="Settings"
              />
            </div>
          </div>
        </section>

        {/* Progress */}
        <section>
          <SectionHeader title="Progress Bars" />
          <div className="space-y-4 border border-border p-4 max-w-md">
            <WikiProgress value={25} />
            <WikiProgress value={50} />
            <WikiProgress value={75} />
            <WikiProgress value={100} />
          </div>
        </section>

        {/* Stats */}
        <section>
          <SectionHeader title="Stat Displays" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatDisplay label="Courses" value={12} icon={<BookOpen className="h-4 w-4" />} />
            <StatDisplay label="Completed" value={8} icon={<Check className="h-4 w-4" />} />
            <StatDisplay label="In Progress" value={4} icon={<ChevronRight className="h-4 w-4" />} />
            <StatDisplay label="Hours" value="48" />
          </div>
        </section>

        {/* Links */}
        <section>
          <SectionHeader title="Links" />
          <div className="border border-border p-4">
            <p>
              This is a paragraph with a <WikiLink href="#">wiki-style link</WikiLink> that 
              follows the underline pattern. Links should always be underlined for clarity.
            </p>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <SectionHeader title="Spacing Scale" />
          <div className="border border-border p-4">
            <div className="space-y-2">
              {[
                { name: "gap-1", size: "4px" },
                { name: "gap-2", size: "8px" },
                { name: "gap-3", size: "12px" },
                { name: "gap-4", size: "16px" },
                { name: "gap-6", size: "24px" },
                { name: "gap-8", size: "32px" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="text-sm w-16">{item.name}</span>
                  <div className="h-4 bg-foreground" style={{ width: item.size }} />
                  <span className="text-xs text-muted-foreground">{item.size}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <SectionHeader title="Border Radius" subtitle="Always 0px - no rounding" />
          <div className="flex gap-4 border border-border p-4">
            <div className="h-16 w-16 border border-border bg-secondary" />
            <div className="h-16 w-16 border border-border bg-secondary" />
            <div className="h-16 w-16 border border-border bg-secondary" />
          </div>
        </section>
      </main>
    </div>
  )
}
