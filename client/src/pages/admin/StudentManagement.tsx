import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Users, BookOpen, CheckCircle, XCircle, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface Course {
  id: number;
  title: string;
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/courses')
        ]);
        setStudents(usersRes.data.filter((u: User) => u.role === 'student'));
        setCourses(coursesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (selectedCourse) {
      const fetchEnrollments = async () => {
        try {
          const res = await api.get(`/admin/enrollments/${selectedCourse.id}`);
          setEnrolledIds(res.data.map((u: User) => u.id));
        } catch (error) {
          console.error('Error fetching enrollments:', error);
        }
      };
      fetchEnrollments();
    }
  }, [selectedCourse, token]);

  const toggleEnrollment = async (studentId: number) => {
    if (!selectedCourse) return;
    const isEnrolled = enrolledIds.includes(studentId);
    const url = isEnrolled ? 'unenroll' : 'enroll';
    
    try {
      await api.post(`/admin/${url}`, {
        user_id: studentId,
        course_id: selectedCourse.id
      });
      
      setEnrolledIds(prev => 
        isEnrolled ? prev.filter(id => id !== studentId) : [...prev, studentId]
      );
    } catch (error) {
      alert('Failed to update enrollment');
    }
  };

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Establishing enrollment registry connection...</div>;

  return (
    <div className="-mt-8">
      {/* Admin Access Header */}
      <div className="bg-[#333] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-70 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <Link to="/admin" className="hover:underline">Admin</Link>
            <ChevronRight size={10} />
            <span className="opacity-50">Access Control</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
            Student Permissions | Course Enrollment
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Enrollment Registry
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 flex flex-col md:flex-row gap-8">
        {/* Course Selection Sidebar */}
        <div className="w-full md:w-72 shrink-0 space-y-4">
           <h3 className="text-[11px] font-bold uppercase text-gray-400 tracking-widest border-b border-gray-200 pb-2">Course Selection</h3>
           <div className="space-y-1">
             {courses.map(course => (
               <button
                 key={course.id}
                 onClick={() => setSelectedCourse(course)}
                 className={`w-full text-left px-4 py-3 border transition-none font-bold uppercase text-[11px] ${
                   selectedCourse?.id === course.id 
                     ? 'border-[#005b94] bg-blue-50 text-[#005b94] border-l-4' 
                     : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                 }`}
               >
                 {course.title}
               </button>
             ))}
           </div>
        </div>

        {/* Access Control Area */}
        <div className="flex-1 space-y-8">
          {selectedCourse ? (
            <div className="animate-in fade-in duration-300 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-primary pb-4">
                <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight flex items-center gap-2">
                  <Users size={18} className="text-[#005b94]" /> Managing Access: {selectedCourse.title}
                </h2>
                <div className="relative w-full sm:w-64">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input className="w-full bg-white border border-gray-300 h-9 pl-10 px-4 text-xs focus:border-[#005b94] outline-none shadow-sm" placeholder="Search scholar name..." />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map(student => {
                  const isEnrolled = enrolledIds.includes(student.id);
                  return (
                    <Card key={student.id} className="p-5 border border-gray-200 bg-white flex items-center justify-between group hover:border-[#005b94] transition-colors rounded-none shadow-none">
                      <div>
                        <p className="font-bold text-gray-800 uppercase text-[12px] tracking-tight">{student.full_name}</p>
                        <p className="text-[10px] text-[#005b94] font-medium mt-0.5">{student.email}</p>
                      </div>
                      <Button
                        onClick={() => toggleEnrollment(student.id)}
                        className={`rounded-none border-none h-8 text-[9px] font-bold uppercase tracking-widest transition-none px-4 shadow-sm ${
                          isEnrolled ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-[#005b94] hover:bg-[#004a7a] text-white'
                        }`}
                      >
                        {isEnrolled ? <><CheckCircle size={12} className="mr-1.5" /> Enrolled</> : <><XCircle size={12} className="mr-1.5" /> Grant Access</>}
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
              <BookOpen size={48} strokeWidth={1} className="text-gray-300 mb-4 opacity-40" />
              <h3 className="text-sm font-bold uppercase text-gray-400 tracking-widest">Select a Course Module</h3>
              <p className="text-[11px] text-gray-400 mt-1 uppercase">To Begin Scholar Permission Management</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
