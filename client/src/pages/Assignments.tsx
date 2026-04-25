import React, { useState, useEffect } from 'react';
import { ClipboardList, BookOpen, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get('/user/assignments');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [token]);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Syncing course assignments...</div>;

  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Assignments */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Assignments</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Tasks | Academic Problem Sets
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            My Assignments
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-8">
        {assignments.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="h-full border border-border bg-white p-6 flex flex-col group hover:border-[#005b94] transition-all rounded-none shadow-none hover:shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-10 w-10 bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#005b94] transition-colors border border-gray-100">
                    <BookOpen size={20} />
                  </div>
                  <span className="text-[9px] font-bold uppercase text-[#005b94] tracking-wider border border-[#005b94]/20 px-2 py-0.5 bg-blue-50/50">
                    {assignment.course_title}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 leading-tight mb-3 truncate group-hover:text-[#005b94]">
                  {assignment.title}
                </h3>
                
                <div className="flex-1">
                  <p className="text-xs text-gray-500 line-clamp-3 mb-6 leading-relaxed italic">
                    {assignment.content || "Problem set details and supplemental materials available in the course module."}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">ID: OCW-{assignment.id}</span>
                  <Link to={`/courses/${assignment.course_id || ''}`}>
                    <Button variant="ghost" size="sm" className="text-[#005b94] hover:bg-primary/5 rounded-none font-bold uppercase text-[10px] h-8 p-0 gap-1">
                      View Module <ChevronRight size={12} />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-20 border border-dashed border-border text-center bg-gray-50">
            <ClipboardList className="h-16 w-16 mx-auto mb-4 opacity-10" />
            <h2 className="text-xl font-bold uppercase text-gray-400">No Registry Tasks</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Status: [Queue_Empty]</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
