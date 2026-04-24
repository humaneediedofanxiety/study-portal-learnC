import React, { useEffect, useState } from 'react';
import { Users, BookOpen, GraduationCap, FileCheck, ChevronRight, Layout } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface Stats {
  users: number;
  courses: number;
  enrollments: number;
  submissions: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Syncing administrative records...</div>;

  const statCards = [
    { label: 'Total Registry Users', value: stats?.users || 0, icon: <Users size={20} />, color: 'text-blue-600' },
    { label: 'Course Catalog Size', value: stats?.courses || 0, icon: <BookOpen size={20} />, color: 'text-green-600' },
    { label: 'Active Enrollments', value: stats?.enrollments || 0, icon: <GraduationCap size={20} />, color: 'text-[#A31F34]' },
    { label: 'Work Submissions', value: stats?.submissions || 0, icon: <FileCheck size={20} />, color: 'text-[#005b94]' },
  ];

  return (
    <div className="-mt-8">
      {/* Admin Blue Banner */}
      <div className="bg-[#333] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-70 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-50">Admin Control</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
            System Administration | Registry Operations
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Master Console
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-10">
        <div className="border-b border-primary pb-2 flex items-center justify-between">
           <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">Registry Statistics</h2>
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-50 border border-gray-100">Live Status: Active</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white p-6 border border-gray-200 group hover:border-[#005b94] transition-colors flex flex-col items-center text-center">
              <div className={`mb-4 p-3 bg-gray-50 border border-gray-100 group-hover:bg-blue-50 transition-colors ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          <div className="bg-white p-8 border border-gray-200">
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-6 tracking-widest border-b border-gray-100 pb-2">Administrative Shortcuts</h2>
            <div className="space-y-2">
              <Link to="/admin/courses" className="flex items-center justify-between p-3 border border-gray-100 hover:border-[#005b94] hover:bg-blue-50 transition-all font-bold uppercase text-[11px] text-gray-700">
                Course Catalog Management
                <ChevronRight size={14} className="text-[#005b94]" />
              </Link>
              <Link to="/admin/users" className="flex items-center justify-between p-3 border border-gray-100 hover:border-[#005b94] hover:bg-blue-50 transition-all font-bold uppercase text-[11px] text-gray-700">
                User Registry & Role Assignment
                <ChevronRight size={14} className="text-[#005b94]" />
              </Link>
              <Link to="/admin/students" className="flex items-center justify-between p-3 border border-gray-100 hover:border-[#005b94] hover:bg-blue-50 transition-all font-bold uppercase text-[11px] text-gray-700">
                Enrollment & Access Control
                <ChevronRight size={14} className="text-[#005b94]" />
              </Link>
            </div>
          </div>

          <div className="p-8 bg-gray-50 border border-gray-200 flex flex-col justify-center text-center space-y-4">
             <div className="text-gray-300 flex justify-center"><Layout size={40} strokeWidth={1} /></div>
             <h3 className="text-xs font-bold uppercase text-gray-600 tracking-widest">System Health: Optimal</h3>
             <p className="text-[11px] text-gray-500 italic max-w-xs mx-auto">The administrative registry is currently synced with the core database. No critical errors detected in the current session.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
