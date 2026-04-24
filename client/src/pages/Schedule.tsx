import React, { useState, useEffect } from 'react';
import { Clock, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Schedule: React.FC = () => {
  const [scheduleItems, setScheduleItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/schedule', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setScheduleItems(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [token]);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Syncing timeline records...</div>;

  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Schedule */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Schedule</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Sessions | Weekly Academic Plan
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Live Timeline
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pb-4">
          <div className="flex items-center bg-white border border-gray-300 h-10 px-2 shadow-sm">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-none"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Current Week</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-none"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>

        {scheduleItems.length > 0 ? (
          <div className="grid gap-6">
             {scheduleItems.map((item) => (
               <Card key={item.id} className="border border-border rounded-none shadow-none p-0 flex flex-col md:flex-row items-stretch bg-white group hover:border-[#005b94] transition-colors overflow-hidden">
                  <div className="w-full md:w-48 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-6 flex flex-col items-center justify-center text-center shrink-0 group-hover:bg-blue-50 transition-colors">
                    <span className="text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">Session Day</span>
                    <span className="text-2xl font-bold text-gray-800 uppercase tracking-tight">{item.schedule_config?.day || 'TBA'}</span>
                  </div>

                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold uppercase text-blue-600 tracking-wider border border-blue-600/20 px-2 py-0.5 bg-blue-50/50">
                        Live Session
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{item.course_title}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 leading-none group-hover:text-[#005b94] transition-colors uppercase">{item.title}</h3>
                    
                    <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#005b94]" />
                        {item.schedule_config?.startTime || '00:00'} - {item.schedule_config?.endTime || '00:00'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Video size={14} className="text-[#005b94]" />
                        Remote Access Enabled
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex items-center shrink-0 bg-gray-50/50">
                    <Link to={`/courses/${item.course_id || ''}`} className="w-full">
                      <Button className="w-full bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none transition-none font-bold uppercase text-[11px] h-11 px-10 shadow-sm">
                        Enter Classroom
                      </Button>
                    </Link>
                  </div>
               </Card>
             ))}
          </div>
        ) : (
          <div className="p-24 border border-dashed border-border text-center bg-gray-50">
            <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300 opacity-20" />
            <h2 className="text-xl font-bold uppercase text-gray-400">No Scheduled Sessions</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
