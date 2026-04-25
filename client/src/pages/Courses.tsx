import React, { useEffect, useState } from 'react';
import { ExternalLink, Users, ChevronRight, GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getArchiveThumbnailUrl } from '@/lib/utils';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Establishing curriculum registry...</div>;

  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Courses */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Courses</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            LearnC. | Undergraduate & Graduate
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Browse Curriculum
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-8">
        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block group">
                <Card
                  className="h-full border border-border bg-card hover:border-primary transition-all overflow-hidden flex flex-col gap-0 rounded-none shadow-none group-hover:shadow-sm"
                >
                  <div className="aspect-video bg-gray-100 flex items-center justify-center border-b border-border group-hover:bg-primary/5">
                    {course.thumbnail_url ? (
                      <img
                        src={getArchiveThumbnailUrl(course.thumbnail_url)}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <GraduationCap className="h-12 w-12 text-gray-300" />
                    )}
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-bold bg-secondary text-[#333] px-1.5 py-0.5 rounded-none uppercase tracking-widest border border-border">
                        {course.education_level || 'General'}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Module {course.id}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-[#005b94] leading-tight mb-2 group-hover:underline">
                      {course.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-6 line-clamp-3 leading-relaxed italic">
                      {course.description || "Course materials for students pursuing advanced study in this subject area."}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-100 pt-4 font-bold uppercase mt-auto tracking-widest">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{course.instructor_name || 'Public LearnC.'}</span>
                      </div>
                      <div className="flex items-center gap-1 group-hover:text-primary">
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-20 border border-dashed border-border text-center bg-gray-50">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-10" />
            <h2 className="text-xl font-bold uppercase text-gray-400">No Registry Matches</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Status: [No_Articles_Found]</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
