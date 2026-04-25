import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Lock,
  Loader2,
  ChevronRight,
  ChevronDown,
  Unlock,
  CheckCircle2,
  FileUp,
  Send,
  Calendar,
  FileText,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CourseView: React.FC = () => {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [assignmentContent, setAssignmentContent] = useState('');
  const [assignmentFile, setAssignmentFile] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchCourse = async () => {
    try {
      setError(null);
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
      if (response.data.sections?.length > 0) {
        const firstVisibleSection = response.data.sections.find((s: any) => !s.is_locked || user?.role === 'admin') || response.data.sections[0];
        setExpandedSections([firstVisibleSection.id]);
        if (firstVisibleSection.items?.length > 0) {
          setActiveItem(firstVisibleSection.items[0]);
        }
      }
    } catch (err: any) {
      console.error('Error fetching course:', err);
      const serverMessage = err.response?.data?.message;
      if (err.response?.status === 404) {
        setError('Course not found. Please verify the course ID.');
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Access denied. You may not have permission to view this course.');
      } else {
        setError(serverMessage || 'Failed to load course materials. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id, token]);

  useEffect(() => {
    if (activeItem?.type === 'assignment' && activeItem.user_submission) {
      setAssignmentContent(activeItem.user_submission.content || '');
      setAssignmentFile(activeItem.user_submission.file_url || '');
    } else {
      setAssignmentContent('');
      setAssignmentFile('');
    }
    // Scroll content area to top when changing items
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeItem?.id]);

  const handleMarkComplete = async (lessonId: number) => {
    try {
      await api.post('/courses/items/complete', { lessonId });
      fetchCourse();
    } catch (error) {
      alert('Failed to mark complete');
    }
  };

  const handleSubmitAssignment = async () => {
    setSubmitting(true);
    try {
      await api.post('/courses/items/submit', {
        lesson_id: activeItem.id,
        content: assignmentContent,
        file_url: assignmentFile
      });
      fetchCourse();
      alert('Assignment submitted successfully!');
    } catch (error) {
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await api.post('/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      setAssignmentFile(response.data.url);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) ? prev.filter(s => s !== sectionId) : [...prev, sectionId]
    );
  };

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Syncing course materials...</div>;
  
  if (error) return (
    <div className="p-8 max-w-2xl mx-auto text-center space-y-4">
      <div className="text-red-600 font-bold uppercase tracking-widest text-xs">Error Detected</div>
      <h2 className="text-2xl font-medium text-gray-800">{error}</h2>
      <Button onClick={() => fetchCourse()} variant="outline" className="rounded-none border-gray-300 uppercase font-bold text-[11px] h-10 px-6">Retry Connection</Button>
      <div className="pt-4">
        <Link to="/courses" className="text-[#005b94] text-xs font-bold uppercase hover:underline flex items-center justify-center gap-1">
          <ChevronRight size={12} className="rotate-180" /> Back to Catalog
        </Link>
      </div>
    </div>
  );

  if (!course) return <div className="p-8 text-center text-gray-500 uppercase tracking-widest text-xs font-bold">Course record unavailable.</div>;

  const hasAccess = course.hasAccess || user?.role === 'admin';

  // Helper to convert Archive.org detail links to direct download links
  const getDirectUrl = (url: string) => {
    if (!url) return '';
    
    // Handle Archive.org specifically
    if (url.includes('archive.org/')) {
      // If it's already a direct download or embed link, return it
      if (url.includes('/download/') || url.includes('/embed/')) return url;
      
      // If it's an archive.org details link
      if (url.includes('/details/')) {
        const parts = url.split('/');
        const identifier = parts[parts.indexOf('details') + 1];
        
        // If the URL ends with a file extension, convert to download link
        if (url.match(/\.(pdf|mp4|jpg|png|webp|zip)$/i)) {
          return url.replace('/details/', '/download/');
        }
        
        // Otherwise, return an embed link for the whole item (best for reader/player)
        return `https://archive.org/embed/${identifier}`;
      }
    }
    return url;
  };

  return (
    <div>
      {/* Classic Blue Course Banner */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <Link to="/courses" className="hover:underline">Courses</Link>
            <ChevronRight size={10} />
            <span className="opacity-70 truncate">{course.title}</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            {course.department || 'LearnC.-OCW'} | {course.education_level || 'General'}
          </div>
          <h1 className="text-3xl font-medium tracking-tight">
            {course.title}
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto bg-white border border-gray-300 shadow-sm mt-8 mb-12 flex flex-col md:flex-row min-h-[700px]">
         
         {/* LEFT COLUMN: Course Navigation (Classic OCW Sidebar) */}
         <div className="w-full md:w-56 border-r border-gray-200 bg-gray-50/50 p-6 space-y-4 shrink-0">
            <h3 className="text-[11px] font-bold uppercase text-gray-400 tracking-widest mb-4">Course Menu</h3>
            <nav className="space-y-3">
              {course.sections?.map((section: any) => (
                <div key={section.id} className="space-y-1">
                  <button 
                    onClick={() => !section.is_locked && toggleSection(section.id)}
                    className="flex items-center gap-2 text-[#005b94] font-bold text-[13px] hover:underline w-full text-left"
                  >
                    {section.is_locked ? <Lock size={12} className="text-gray-400" /> : expandedSections.includes(section.id) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    {section.title}
                  </button>
                  {!section.is_locked && expandedSections.includes(section.id) && (
                    <ul className="pl-4 space-y-1 mt-1 border-l border-gray-200">
                      {section.items?.map((item: any) => (
                        <li key={item.id} className="flex items-start gap-1">
                          <button 
                            onClick={() => setActiveItem(item)}
                            className={cn(
                              "text-[12px] text-left transition-none hover:underline",
                              activeItem?.id === item.id ? "font-bold text-gray-900 underline" : "text-[#005b94]"
                            )}
                          >
                            {item.title}
                          </button>
                          {item.is_completed && <CheckCircle2 size={10} className="text-green-600 mt-1 shrink-0" />}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
         </div>

         {/* CENTER COLUMN: Main Content Area */}
         <div ref={contentRef} className="flex-1 p-8 md:p-10 border-r border-gray-100 bg-white">
            {!hasAccess ? (
              <div className="text-center py-20">
                <Lock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h2 className="text-xl font-bold text-gray-800 uppercase">Access Restricted</h2>
                <p className="text-sm text-gray-500 mt-2">Enrollment is required to view these course materials.</p>
                <Button className="mt-8 bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none uppercase font-bold text-xs h-10 px-8">Enroll Now</Button>
              </div>
            ) : (
              <div className="space-y-10">
                 {activeItem ? (
                   <div>
                      {/* Item Title */}
                      <div className="border-b border-gray-200 pb-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">{activeItem.title}</h2>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-[10px] font-bold uppercase text-[#005b94] tracking-widest">{activeItem.type}</span>
                           {activeItem.is_completed && (
                             <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                               <CheckCircle2 size={12} /> Completed
                             </span>
                           )}
                        </div>
                      </div>
                      
                      {activeItem.is_locked ? (
                         <div className="bg-gray-50 border border-gray-200 p-12 text-center">
                            <Lock className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm font-medium text-gray-500 italic">This content has not been released yet.</p>
                         </div>
                      ) : (
                        <div className="space-y-10">
                           {/* Live Alert */}
                           {activeItem.type === 'live' && activeItem.schedule_config && (
                              <div className="bg-blue-50 border border-blue-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                  <h4 className="text-[10px] font-bold uppercase text-[#005b94] tracking-widest">Live Interactive Session</h4>
                                  <p className="text-sm font-bold text-gray-700 flex items-center justify-center sm:justify-start gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {activeItem.schedule_config.day} | {activeItem.schedule_config.startTime} - {activeItem.schedule_config.endTime}
                                  </p>
                                </div>
                                <Button className="bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none uppercase font-bold text-[10px] h-9 px-6 transition-none">
                                  Join Now
                                </Button>
                              </div>
                           )}

                           {/* Content Text */}
                           <div className="prose prose-blue max-w-none text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap font-normal">
                              {activeItem.content || <p className="italic text-gray-400">No supplemental text available.</p>}
                           </div>

                           {/* Media Display */}
                           {activeItem.file_url && (
                             <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center justify-between bg-gray-50 p-3 border border-gray-200">
                                  <span className="text-[11px] font-bold uppercase text-gray-600 tracking-wider flex items-center gap-2">
                                    <FileText size={14} /> Resource Material
                                  </span>
                                  <div className="flex gap-4">
                                    <a href={getDirectUrl(activeItem.file_url)} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#005b94] hover:underline uppercase flex items-center gap-1">
                                      <ExternalLink size={12} /> Open in New Tab
                                    </a>
                                    <a href={getDirectUrl(activeItem.file_url)} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#005b94] hover:underline uppercase">
                                      Download
                                    </a>
                                  </div>
                                </div>

                                <div className="border border-gray-200 p-2 bg-gray-50">
                                  {getDirectUrl(activeItem.file_url).includes('archive.org/embed/') ? (
                                    <iframe src={getDirectUrl(activeItem.file_url)} className="w-full h-[600px] border border-gray-300 bg-white" title="Archive.org Preview" allowFullScreen />
                                  ) : getDirectUrl(activeItem.file_url).match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) ? (
                                    <img src={getDirectUrl(activeItem.file_url)} alt="Resource" className="max-w-full h-auto mx-auto shadow-sm" />
                                  ) : getDirectUrl(activeItem.file_url).match(/\.(mp4|webm|ogg)$/i) ? (
                                    <video src={getDirectUrl(activeItem.file_url)} controls className="max-w-full h-auto mx-auto shadow-sm" />
                                  ) : getDirectUrl(activeItem.file_url).match(/\.pdf$/i) ? (
                                    <iframe src={getDirectUrl(activeItem.file_url)} className="w-full h-[600px] border border-gray-300 bg-white" title="Document Preview" />
                                  ) : (
                                    <div className="p-8 text-center text-gray-400 italic text-xs">
                                      Preview not available. Please download to view.
                                    </div>
                                  )}
                                </div>
                             </div>
                           )}

                           {/* Assignment Form */}
                           {activeItem.type === 'assignment' && (
                              <div className="bg-gray-50 border border-gray-200 p-8 space-y-6">
                                <h3 className="text-[11px] font-bold uppercase text-gray-800 tracking-widest border-b border-gray-200 pb-2">Assignment Submission</h3>
                                
                                <textarea 
                                  value={assignmentContent}
                                  onChange={(e) => setAssignmentContent(e.target.value)}
                                  placeholder="Type your submission details here..."
                                  className="w-full h-48 border border-gray-300 p-4 text-sm font-sans focus:border-[#005b94] outline-none rounded-none bg-white shadow-inner"
                                />
                                
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                  <div className="flex-1 w-full">
                                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                                    <Button 
                                      variant="outline"
                                      onClick={() => fileInputRef.current?.click()}
                                      disabled={uploading}
                                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-100 font-bold uppercase text-[10px] h-10 rounded-none transition-none"
                                    >
                                      {uploading ? <Loader2 size={14} className="animate-spin mr-2" /> : <FileUp size={14} className="mr-2" />}
                                      {assignmentFile ? 'Change File' : 'Upload Solution'}
                                    </Button>
                                    {assignmentFile && <p className="text-[10px] font-medium mt-1 text-green-600 truncate">{assignmentFile.split('/').pop()}</p>}
                                  </div>
                                  
                                  <Button 
                                    onClick={handleSubmitAssignment}
                                    disabled={submitting || (!assignmentContent && !assignmentFile)}
                                    className="w-full sm:w-48 bg-[#005b94] hover:bg-[#004a7a] text-white font-bold uppercase text-[11px] h-10 rounded-none transition-none"
                                  >
                                    {submitting ? <Loader2 size={14} className="animate-spin mr-2" /> : <Send size={14} className="mr-2" />}
                                    Submit Work
                                  </Button>
                                </div>
                              </div>
                           )}

                           {/* Footer Action */}
                           {!activeItem.is_completed && activeItem.type !== 'assignment' && (
                              <div className="flex justify-center pt-10">
                                 <Button 
                                    onClick={() => handleMarkComplete(activeItem.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-none border-none uppercase font-bold text-xs h-10 px-12 transition-none"
                                 >
                                    Mark Section as Complete
                                 </Button>
                              </div>
                           )}
                        </div>
                      )}
                   </div>
                 ) : (
                   <div className="text-center py-32">
                      <div className="text-gray-300 mb-4 flex justify-center"><Info size={48} strokeWidth={1} /></div>
                      <p className="text-sm font-bold uppercase text-gray-400 tracking-[0.2em]">Select a material to begin</p>
                   </div>
                 )}
              </div>
            )}
         </div>

         {/* RIGHT COLUMN: Metadata & Graphics */}
         <div className="w-full md:w-72 bg-gray-50 p-8 border-l border-gray-200 space-y-10 shrink-0">
            <div className="aspect-[4/3] bg-white border border-gray-300 p-2 shadow-sm">
               <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-300 gap-2">
                  {course.thumbnail_url ? (
                    <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <FileText size={32} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-center px-4">Course Visual Representation</span>
                    </>
                  )}
               </div>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Instructor</h4>
                  <p className="text-[13px] font-bold text-[#005b94] hover:underline cursor-pointer">
                    {course.instructor_name || 'Mahmudul Hasan'}
                  </p>
               </div>
               
               <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Department</h4>
                  <p className="text-[13px] font-bold text-[#005b94] hover:underline cursor-pointer leading-tight">
                    {course.department || 'EECS | Electrical Engineering & Computer Science'}
                  </p>
               </div>

               <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Educational Level</h4>
                  <p className="text-[13px] font-medium text-gray-700">
                    {course.education_level || 'General Level'}
                  </p>
               </div>
            </div>

            <div className="pt-10 border-t border-gray-200">
               <Button className="w-full bg-white border border-[#005b94] text-[#005b94] hover:bg-[#005b94] hover:text-white rounded-none transition-none font-bold uppercase text-[11px] h-11">
                  Download Course
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default CourseView;
