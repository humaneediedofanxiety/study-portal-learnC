import React from 'react';
import { User, Settings, Shield, Bell, LogOut, Award, Book, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="-mt-8">
      {/* Classic Blue Course Banner Style for Profile */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">User Profile</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Account Management | System User
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            {user?.fullName || 'Scholar'}
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto bg-white border border-gray-300 shadow-sm mt-8 mb-12 flex flex-col md:flex-row min-h-[500px]">
        {/* User Card Area */}
        <div className="w-full md:w-80 bg-gray-50 p-8 border-r border-gray-200 flex flex-col items-center text-center">
          <div className="h-32 w-32 border border-gray-300 p-1 bg-white shadow-sm mb-6">
            <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-300">
              <User className="h-16 w-16" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 uppercase leading-tight mb-1">{user?.fullName || 'Scholar'}</h2>
          <p className="text-xs text-[#005b94] font-bold uppercase tracking-widest mb-6">{user?.email || 'scholar@learnc.edu'}</p>
          
          <div className="grid grid-cols-2 gap-px w-full bg-gray-200 border border-gray-200 shadow-sm">
            <div className="bg-white p-3">
              <p className="text-[9px] uppercase text-gray-400 font-bold tracking-widest mb-1">Role</p>
              <p className="text-sm font-bold text-gray-700 capitalize">{user?.role || 'Student'}</p>
            </div>
            <div className="bg-white p-3">
              <p className="text-[9px] uppercase text-gray-400 font-bold tracking-widest mb-1">Joined</p>
              <p className="text-sm font-bold text-gray-700">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Apr 2026'}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-8 w-full">
            <Button 
              onClick={logout}
              className="w-full bg-white border border-[#A31F34] text-[#A31F34] hover:bg-[#A31F34] hover:text-white rounded-none transition-none font-bold uppercase text-[11px] h-10 shadow-none flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Terminate Session
            </Button>
          </div>
        </div>

        {/* Profile Settings Content Area */}
        <div className="flex-1 p-8 md:p-12 space-y-8">
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-400 mb-6 tracking-[0.2em] flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#005b94]" /> System Preferences & Account
            </h3>
            
            <div className="border border-gray-200 divide-y divide-gray-100 bg-white">
              <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-none group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#005b94] transition-none">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#005b94]">Security & Privacy</p>
                    <p className="text-[11px] text-gray-500 font-medium">Manage password and 2FA settings</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#005b94] text-[#005b94] hover:bg-[#005b94] hover:text-white rounded-none font-bold uppercase text-[9px] transition-none px-4">Configure</Button>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-none group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#005b94] transition-none">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#005b94]">Notification Settings</p>
                    <p className="text-[11px] text-gray-500 font-medium">Configure alerts and email reports</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#005b94] text-[#005b94] hover:bg-[#005b94] hover:text-white rounded-none font-bold uppercase text-[9px] transition-none px-4">Configure</Button>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-none group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#005b94] transition-none">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#005b94]">Achievements</p>
                    <p className="text-[11px] text-gray-500 font-medium">View your earned badges and rewards</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#005b94] text-[#005b94] hover:bg-[#005b94] hover:text-white rounded-none font-bold uppercase text-[9px] transition-none px-4">View</Button>
              </div>

              <div className="p-5 flex items-center justify-between hover:bg-gray-50 transition-none group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#005b94] transition-none">
                    <Book className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#005b94]">Learning Path</p>
                    <p className="text-[11px] text-gray-500 font-medium">Update your curriculum goals</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-[#005b94] text-[#005b94] hover:bg-[#005b94] hover:text-white rounded-none font-bold uppercase text-[9px] transition-none px-4">Update</Button>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 border border-gray-200 border-l-4 border-l-[#005b94]">
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-widest mb-2">Account Registry Status</p>
            <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
              Your account is currently active and synced with the LearnC. Learning System. 
              Changes made to your profile may take up to 24 hours to propagate across all course materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
