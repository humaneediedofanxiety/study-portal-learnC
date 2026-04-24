import React from 'react';
import { Trophy, Star, Award, Target, Zap, Shield, Crown, Medal, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const achievements = [
  { id: 1, title: "Consistent Learner", desc: "Maintained a 7-day study streak.", date: "2026-04-10", icon: Zap, rarity: "Common" },
  { id: 2, title: "Perfect Score", desc: "Achieved 100% in a mid-term exam.", date: "2026-03-22", icon: Crown, rarity: "Legendary" },
  { id: 3, title: "Top Contributor", desc: "Most active user in Discussions.", date: "2026-04-05", icon: Star, rarity: "Epic" },
  { id: 4, title: "Early Bird", desc: "Submitted 10 assignments before deadline.", date: "2026-03-15", icon: Award, rarity: "Rare" },
  { id: 5, title: "Subject Specialist", desc: "Completed all Math courses.", date: "2026-02-28", icon: Medal, rarity: "Rare" },
];

const Achievements: React.FC = () => {
  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Achievements */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Achievements</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Milestones | Personal Academic Progress
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Scholar Status
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-12">
        {/* Rank Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-border bg-[#333] text-white p-8 rounded-none shadow-none group">
            <div className="flex items-center gap-8">
              <div className="h-20 w-20 border-2 border-white/20 flex items-center justify-center bg-white/5">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Current Standing</p>
                <h2 className="text-3xl font-bold tracking-tight uppercase group-hover:text-[#005b94] transition-colors">Elite Student</h2>
                <div className="mt-4">
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2 text-gray-400">
                    <span>Level 42</span>
                    <span>XP: 8,450 / 10,000</span>
                  </div>
                  <div className="h-1.5 bg-white/10 overflow-hidden rounded-none border border-white/5">
                    <div className="h-full bg-[#005b94] w-[84.5%]" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-border bg-white p-8 rounded-none shadow-none flex items-center justify-between group hover:border-[#005b94] transition-colors">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Global Registry Rank</p>
              <h2 className="text-5xl font-bold text-gray-800 tracking-tighter group-hover:text-[#005b94]">#248</h2>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Top 2% of Global Scholars</p>
            </div>
            <div className="flex gap-2">
               {[1,2,3].map(i => (
                 <div key={i} className="h-12 w-12 border border-gray-100 bg-gray-50 flex items-center justify-center grayscale opacity-40">
                   <Shield className="h-6 w-6 text-gray-300" />
                 </div>
               ))}
            </div>
          </Card>
        </div>

        {/* Badges Grid */}
        <div className="space-y-6">
          <div className="border-b border-primary pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase flex items-center gap-2">
              Recent Endorsements
            </h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registry Verified</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => (
              <Card key={item.id} className="border border-border bg-white p-5 rounded-none shadow-none group hover:border-[#005b94] transition-all">
                <div className="flex gap-5">
                  <div className="h-16 w-16 shrink-0 border border-gray-100 flex items-center justify-center bg-gray-50 group-hover:bg-blue-50 transition-colors">
                    <item.icon className="h-8 w-8 text-gray-300 group-hover:text-[#005b94] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-bold uppercase text-[#005b94] tracking-widest">{item.rarity}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 uppercase leading-tight group-hover:underline">{item.title}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-2 italic leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Locked Badge */}
            {Array.from({ length: 1 }).map((_, i) => (
              <Card key={i} className="border border-dashed border-gray-200 bg-gray-50/30 p-5 rounded-none shadow-none opacity-40">
                <div className="flex gap-5 items-center">
                  <div className="h-16 w-16 shrink-0 border border-dashed border-gray-200 flex items-center justify-center">
                    <Target className="h-8 w-8 text-gray-200" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase text-gray-300">Milestone Locked</h3>
                    <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">Maintain Engagement</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
