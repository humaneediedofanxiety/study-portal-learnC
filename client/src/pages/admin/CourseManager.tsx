import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Plus, Book, Edit2, Trash2, ChevronRight, X, FileUp, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
  thumbnail_url: string;
  education_level?: string;
  department?: string;
}

const repoThumbnails = [
  { name: 'ENIAC Computing', url: '/thumbnails/ENIAC-changing_a_tube_(cropped).jpg' },
  { name: 'Fiber Optics', url: '/thumbnails/cable-network-fiber-optic-cable-connect-to-switch-port-in-server-room-concept-network-management-free-photo.jpg' },
];

const CourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({ 
    title: '', 
    description: '', 
    thumbnail_url: '',
    education_level: '',
    instructor_name: '',
    department: ''
  });
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      console.log('Fetching courses from registry...');
      const response = await api.get('/courses');
      const data = Array.isArray(response.data) ? response.data : [];
      console.log(`Successfully fetched ${data.length} courses.`);
      setCourses(data);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      setError(`Connection Error: ${error.message || 'Registry unavailable'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await api.delete(`/courses/${courseId}`);
      await fetchCourses();
    } catch (error) {
      alert('Failed to delete course');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Committing new course to registry...', newCourse);
      const response = await api.post('/courses', newCourse);
      console.log('Course registered successfully:', response.data);
      setShowAddForm(false);
      setNewCourse({ 
        title: '', 
        description: '', 
        thumbnail_url: '',
        education_level: '',
        instructor_name: '',
        department: ''
      });
      await fetchCourses();
    } catch (error: any) {
      console.error('Submission error:', error);
      alert(`Registration Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading && courses.length === 0) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Syncing catalog...</div>;

  return (
    <div className="-mt-8">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 text-center font-bold text-xs border-b border-red-100">
          {error} <button onClick={() => fetchCourses()} className="underline ml-2">Retry</button>
        </div>
      )}
      {/* Admin Course Header */}
      <div className="bg-[#333] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-70 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <Link to="/admin" className="hover:underline">Admin</Link>
            <ChevronRight size={10} />
            <span className="opacity-50">Catalog Manager</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
             <div>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
                  Global Curriculum | Course Registry
                </div>
                <h1 className="text-3xl font-medium tracking-tight uppercase">
                  Course Management
                </h1>
             </div>
             <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none transition-none font-bold uppercase text-[11px] h-11 px-8 shadow-sm flex items-center gap-2"
              >
                <Plus size={16} />
                Create New Module
              </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12">
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <Card className="bg-white rounded-none border border-gray-300 p-8 w-full max-w-2xl shadow-2xl space-y-6 overflow-y-auto max-h-[90vh]">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                 <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Register New Course</h2>
                 <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Course Identifier (Title)</label>
                  <input 
                    type="text" 
                    required
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-4 py-2.5 text-sm focus:border-[#005b94] outline-none bg-gray-50/30"
                    placeholder="e.g., Introduction to Computer Science"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Education Level</label>
                    <input 
                      type="text"
                      value={newCourse.education_level}
                      onChange={(e) => setNewCourse({...newCourse, education_level: e.target.value})}
                      className="w-full border border-gray-300 rounded-none px-4 py-2.5 text-sm focus:border-[#005b94] outline-none bg-gray-50/30"
                      placeholder="e.g., Undergraduate"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Instructor</label>
                    <input 
                      type="text"
                      value={newCourse.instructor_name}
                      onChange={(e) => setNewCourse({...newCourse, instructor_name: e.target.value})}
                      className="w-full border border-gray-300 rounded-none px-4 py-2.5 text-sm focus:border-[#005b94] outline-none bg-gray-50/30"
                      placeholder="Instructor Name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Department</label>
                    <input 
                      type="text"
                      value={newCourse.department}
                      onChange={(e) => setNewCourse({...newCourse, department: e.target.value})}
                      className="w-full border border-gray-300 rounded-none px-4 py-2.5 text-sm focus:border-[#005b94] outline-none bg-gray-50/30"
                      placeholder="e.g., EECS"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Summary Description</label>
                  <textarea 
                    required
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-4 py-2.5 text-sm focus:border-[#005b94] outline-none h-32 bg-gray-50/30 font-sans"
                    placeholder="Provide curriculum details..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Graphic Asset (URL or Repository Selection)</label>
                  <div className="flex flex-col gap-4">
                    {newCourse.thumbnail_url && (
                      <div className="w-full h-32 bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                        <img src={newCourse.thumbnail_url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        value={newCourse.thumbnail_url}
                        onChange={(e) => setNewCourse({...newCourse, thumbnail_url: e.target.value})}
                        className="w-full border border-gray-300 rounded-none px-4 py-2.5 text-sm focus:border-[#005b94] outline-none bg-gray-50/30 font-mono"
                        placeholder="Image path or URL..."
                      />
                      
                      <div className="space-y-2">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Select from Repository</label>
                        <div className="grid grid-cols-4 gap-2">
                          {repoThumbnails.map((thumb) => (
                            <button
                              key={thumb.url}
                              type="button"
                              onClick={() => setNewCourse({...newCourse, thumbnail_url: thumb.url})}
                              className={`group relative aspect-[4/3] border-2 transition-all overflow-hidden ${
                                newCourse.thumbnail_url === thumb.url ? 'border-[#005b94]' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <img src={thumb.url} alt={thumb.name} className="w-full h-full object-cover" />
                              {newCourse.thumbnail_url === thumb.url && (
                                <div className="absolute top-1 right-1 bg-[#005b94] text-white p-0.5">
                                  <Plus size={8} className="rotate-45" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 italic">These images are stored permanently in the repository.</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 rounded-none border-gray-300 uppercase font-bold text-[11px] h-11"
                  >
                    Discard
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-[#005b94] text-white hover:bg-[#004a7a] rounded-none border-none uppercase font-bold text-[11px] h-11"
                  >
                    Commit to Registry
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.filter(c => c && c.id).map((course) => (
            <Card key={course.id} className="bg-white rounded-none border border-gray-200 overflow-hidden group hover:border-[#005b94] transition-colors shadow-none">
              <div className="h-40 bg-gray-100 border-b border-gray-100 relative group-hover:bg-blue-50 transition-colors flex items-center justify-center">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt={course.title || 'Course'} className="w-full h-full object-cover" />
                ) : (
                  <Book size={48} strokeWidth={1} className="text-gray-300" />
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                    onClick={() => navigate(`/admin/courses/${course.id}`)}
                    className="p-2 bg-white border border-gray-200 hover:text-[#005b94] text-gray-400 shadow-sm"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 bg-white border border-gray-200 hover:text-red-600 text-gray-400 shadow-sm"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">REF_ID: {course.id}</span>
                      <span className="text-[9px] font-bold text-gray-500 uppercase">{course.department || 'General'} | {course.education_level || 'N/A'}</span>
                   </div>
                   <span className="text-[9px] font-bold uppercase text-[#005b94] tracking-widest border border-[#005b94]/20 px-1.5 py-0.5 bg-blue-50/50">Active</span>
                </div>
                <h3 className="font-bold text-lg text-gray-800 leading-tight group-hover:text-[#005b94] transition-colors">{course.title || 'Untitled Module'}</h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 italic leading-relaxed">{course.description || 'No description provided.'}</p>
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                   <span className="text-[10px] font-bold text-gray-400 uppercase">Prof. {course.instructor_name || 'Staff'}</span>
                   <Link to={`/courses/${course.id}`} className="text-[10px] font-bold text-[#005b94] uppercase hover:underline">View Live</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseManager;
