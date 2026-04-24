import React from 'react';
import { TodaysFocus } from '@/components/study-portal/todays-focus';
import { CourseGrid } from '@/components/study-portal/course-grid';
import { useAuth } from '@/hooks/useAuth';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="-mt-8">
      {/* Classic Blue Header for Dashboard */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Dashboard</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Course Portal | Welcome Back
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Hi, {user?.fullName?.split(' ')[0] || 'Scholar'}
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-12">
        {/* Today's Focus Strip */}
        <TodaysFocus />
        
        {/* Main Content Area */}
        <CourseGrid />
      </div>
    </div>
  );
};

export default Dashboard;
