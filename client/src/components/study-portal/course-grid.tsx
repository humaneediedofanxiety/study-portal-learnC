import { ExternalLink, GraduationCap, Users, BookMarked, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "@/services/api"
import { useAuth } from "@/hooks/useAuth"

export function CourseGrid() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching dashboard courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse uppercase">Fetching_Registry...</div>;

  return (
    <section>
      <div className="mb-6 flex items-center justify-between border-b border-[#005b94] pb-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">Featured Curriculum</h2>
        <Link to="/courses">
           <Button variant="ghost" className="text-xs uppercase font-bold text-[#005b94] hover:bg-[#005b94]/5 p-0 h-auto">
            View All Courses <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </div>
      
      {courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="block group">
              <Card
                className="h-full border border-gray-200 bg-white hover:border-[#005b94] transition-all overflow-hidden flex flex-col gap-0 rounded-none shadow-none group-hover:shadow-sm"
              >
                {/* Course Thumbnail placeholder/image */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center border-b border-gray-200 group-hover:bg-[#005b94]/5 transition-colors">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <GraduationCap className="h-12 w-12 text-gray-300 group-hover:text-[#005b94]/30 transition-colors" />
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-bold bg-gray-50 text-[#333] px-1.5 py-0.5 border border-gray-200 rounded-none uppercase tracking-widest">
                      {course.education_level || 'General'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Module {course.id}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 group-hover:text-[#005b94] group-hover:underline transition-all">
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
                    <div className="flex items-center gap-1 group-hover:text-[#005b94] transition-colors">
                      <span>Enter</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-20 border border-dashed border-gray-200 text-center bg-gray-50">
          <BookMarked className="h-16 w-16 mx-auto mb-4 text-gray-300 opacity-20" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">No Registry Records Found.</h3>
          <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase italic">Status: [Standby]</p>
        </div>
      )}
    </section>
  )
}
