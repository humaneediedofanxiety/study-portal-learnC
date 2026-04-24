import React from 'react';
import { User, LogOut, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Settings */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Preferences</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            System Configuration | Personalization
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            User Settings
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-8">
        <div className="grid gap-8 lg:grid-cols-4 items-start">
          {/* Settings Nav Sidebar */}
          <div className="lg:col-span-1 border border-border bg-gray-50/50 rounded-none shadow-none overflow-hidden">
            <div className="bg-gray-100 p-4 border-b border-border">
               <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Configuration Menu</span>
            </div>
            <nav className="divide-y divide-gray-100">
              {[
                { label: 'Profile Records', icon: User, active: true },
              ].map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center px-5 py-4 text-[12px] font-bold uppercase tracking-tight transition-none text-left",
                    item.active 
                      ? "bg-white text-[#005b94] border-l-4 border-l-[#005b94]" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#005b94]"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-3 opacity-60" />
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="p-4 bg-gray-50 border-t border-border">
              <Button 
                onClick={logout}
                className="w-full bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-none transition-none font-bold uppercase text-[10px] h-10 shadow-none flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout from System
              </Button>
            </div>
          </div>

          {/* Settings Content Area */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="border border-border bg-white rounded-none shadow-none p-8 space-y-8">
              <div className="border-b border-gray-100 pb-2">
                 <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Identity Information</h2>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Full Legal Name</label>
                  <Input defaultValue={user?.fullName} className="rounded-none border-gray-300 h-10 focus-visible:border-[#005b94] focus-visible:ring-0 bg-gray-50/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Primary Email Address</label>
                  <Input defaultValue={user?.email} className="rounded-none border-gray-300 h-10 focus-visible:border-[#005b94] focus-visible:ring-0 bg-gray-50/30" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Academic Biography</label>
                  <textarea 
                    placeholder="Provide a brief summary of your academic background..." 
                    className="w-full h-32 rounded-none border border-gray-300 p-4 text-sm focus:border-[#005b94] outline-none bg-gray-50/30 font-sans" 
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end border-t border-gray-50">
                <Button className="bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none transition-none px-10 h-11 text-xs font-bold uppercase tracking-widest shadow-sm">
                  Commit Registry Changes
                </Button>
              </div>
            </Card>

            <div className="border border-red-200 border-dashed p-8 text-center bg-red-50/30">
              <p className="text-[10px] font-bold uppercase text-red-600 tracking-[0.2em] mb-4">Critical Action Zone</p>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-none transition-none uppercase font-bold text-[10px] px-10 h-10">
                Purge Personal Identity & Records
              </Button>
              <p className="mt-4 text-[10px] text-gray-400 italic">This action is irreversible and will remove all course engagement history.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
