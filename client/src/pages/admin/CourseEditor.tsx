import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  Plus, 
  Save, 
  ArrowLeft, 
  Trash2, 
  FileText, 
  Clock,
  FileUp,
  Award,
  BookOpen,
  Loader2,
  Lock,
  Unlock,
  Users,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ContentItem {
  id: number;
  section_id: number;
  title: string;
  type: 'live' | 'note' | 'resource' | 'assignment' | 'exam';
  content?: string;
  file_url?: string;
  schedule_config?: {
    day: string;
    startTime: string;
    endTime: string;
  };
  order_index: number;
}

interface Section {
  id: number;
  title: string;
  order_index: number;
  is_locked: boolean;
  items: ContentItem[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  sections: Section[];
}

const CourseEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id, token]);

  const fetchSubmissions = async (lessonId: number) => {
    setLoadingSubmissions(true);
    try {
      const response = await api.get(`/courses/items/${lessonId}/submissions`);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (activeItem?.type === 'assignment') {
      fetchSubmissions(activeItem.id);
    }
  }, [activeItem?.id]);

  const handleGradeSubmission = async (submissionId: number, grade: string) => {
    try {
      await api.put(`/courses/submissions/${submissionId}/grade`, {
        grade,
        feedback: 'Marked by instructor'
      });
      if (activeItem) fetchSubmissions(activeItem.id);
      alert('Graded successfully');
    } catch (error) {
      alert('Failed to grade');
    }
  };

  const handleToggleSectionLock = async (sectionId: number, currentLockStatus: boolean) => {
    try {
      await api.patch(`/courses/sections/${sectionId}/lock`, {
        is_locked: !currentLockStatus
      });
      fetchCourse();
    } catch (error) {
      alert('Failed to toggle lock');
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/courses/sections', {
        course_id: id,
        title: newSectionTitle,
        order_index: course?.sections.length || 0,
        is_locked: true
      });
      setNewSectionTitle('');
      setShowSectionForm(false);
      fetchCourse();
    } catch (error) {
      alert('Failed to add section');
    }
  };

  const handleAddItem = async (sectionId: number, type: ContentItem['type']) => {
    try {
      const newItem = {
        section_id: sectionId,
        title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        type,
        content: '',
        file_url: '',
        schedule_config: type === 'live' ? { day: 'Sunday', startTime: '16:00', endTime: '17:00' } : null,
        order_index: 0
      };
      const response = await api.post('/courses/items', newItem);
      await fetchCourse();
      setActiveItem(response.data);
    } catch (error) {
      alert('Failed to add item');
    }
  };

  const handleUpdateItem = async () => {
    if (!activeItem) return;
    try {
      await api.put(`/courses/items/${activeItem.id}`, activeItem);
      alert('Changes saved to registry.');
      fetchCourse();
    } catch (error) {
      alert('Failed to save changes.');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeItem) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await api.post('/upload', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });
      setActiveItem({ ...activeItem, file_url: response.data.url });
    } catch (error) {
      console.error('Upload failed:', error);
      alert('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('Discard this curriculum item?')) return;
    try {
      await api.delete(`/courses/items/${itemId}`);
      fetchCourse();
      setActiveItem(null);
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm('Purge entire section and all contained items?')) return;
    try {
      await api.delete(`/courses/sections/${sectionId}`);
      fetchCourse();
      if (activeItem?.section_id === sectionId) setActiveItem(null);
    } catch (error) {
      alert('Failed to delete section');
    }
  };

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Initializing course architect...</div>;
  if (!course) return <div className="p-8">Course registry record not found.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -mt-8 -mx-4 lg:-mx-8">
      {/* Editor Top Bar (LearnC. Classic Dark Style) */}
      <div className="bg-[#333] text-white px-8 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/admin/courses')} className="h-10 w-10 flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <nav className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest opacity-60 mb-0.5">
               <span>Admin</span> <ChevronRight size={8} /> <span>Editor</span>
            </nav>
            <h1 className="text-lg font-medium tracking-tight uppercase">{course.title}</h1>
          </div>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="rounded-none border-white/30 text-white hover:bg-white/10 uppercase font-bold text-[10px] h-10 px-6 transition-none"
            onClick={() => setShowSectionForm(true)}
          >
            <Plus size={14} className="mr-2" /> New Section
          </Button>
          <Button 
            onClick={handleUpdateItem}
            className="rounded-none bg-[#005b94] hover:bg-[#004a7a] text-white border-none uppercase font-bold text-[10px] h-10 px-8 transition-none"
          >
            <Save size={14} className="mr-2" /> Commit Item
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-gray-50">
        {/* Left Sidebar: Curriculum Structure */}
        <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto shrink-0 shadow-sm">
          <div className="p-6 space-y-8">
            <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
               <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Syllabus Explorer</span>
            </div>
            
            {course.sections.map((section) => (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleToggleSectionLock(section.id, section.is_locked)}
                      className={`p-1 transition-none ${section.is_locked ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {section.is_locked ? <Lock size={13} /> : <Unlock size={13} />}
                    </button>
                    <h3 className="font-bold uppercase text-[12px] text-gray-800 tracking-tight">{section.title}</h3>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleAddItem(section.id, 'note')} title="Add Note" className="p-1 hover:text-[#005b94] text-gray-400"><FileText size={12} /></button>
                    <button onClick={() => handleAddItem(section.id, 'live')} title="Add Live" className="p-1 hover:text-[#005b94] text-gray-400"><Clock size={12} /></button>
                    <button onClick={() => handleAddItem(section.id, 'resource')} title="Add Resource" className="p-1 hover:text-[#005b94] text-gray-400"><FileUp size={12} /></button>
                    <button onClick={() => handleAddItem(section.id, 'assignment')} title="Add Assignment" className="p-1 hover:text-[#005b94] text-gray-400"><BookOpen size={12} /></button>
                    <button onClick={() => handleAddItem(section.id, 'exam')} title="Add Exam" className="p-1 hover:text-[#005b94] text-gray-400"><Award size={12} /></button>
                    <button onClick={() => handleDeleteSection(section.id)} title="Delete Section" className="p-1 hover:text-red-600 text-gray-400 ml-1"><Trash2 size={12} /></button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-none border-l-4 ${
                        activeItem?.id === item.id 
                          ? 'bg-blue-50 border-l-[#005b94] text-[#005b94] font-bold' 
                          : 'border-l-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      {item.type === 'live' && <Clock size={13} className="shrink-0" />}
                      {item.type === 'note' && <FileText size={13} className="shrink-0" />}
                      {item.type === 'resource' && <FileUp size={13} className="shrink-0" />}
                      {item.type === 'assignment' && <BookOpen size={13} className="shrink-0" />}
                      {item.type === 'exam' && <Award size={13} className="shrink-0" />}
                      <span className="text-[11px] uppercase truncate">{item.title}</span>
                    </button>
                  ))}
                </div>

                <div className="pl-4 pt-1">
                   <button 
                      onClick={() => handleAddItem(section.id, 'note')}
                      className="text-[9px] font-bold uppercase text-gray-400 hover:text-[#005b94] flex items-center gap-1"
                   >
                      <Plus size={10} /> Add Component
                   </button>
                </div>
              </div>
            ))}

            {showSectionForm ? (
              <form onSubmit={handleAddSection} className="space-y-2 p-4 border border-dashed border-[#005b94]/30 bg-blue-50/20">
                <input 
                  autoFocus
                  className="w-full text-[11px] font-bold uppercase p-2 border border-gray-300 outline-none bg-white focus:border-[#005b94]"
                  placeholder="Registry Section Name..."
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm" className="flex-1 rounded-none h-8 bg-[#005b94] text-white uppercase text-[9px] font-bold">Register</Button>
                  <Button type="button" onClick={() => setShowSectionForm(false)} variant="outline" size="sm" className="flex-1 rounded-none h-8 border-gray-300 uppercase text-[9px] font-bold">Cancel</Button>
                </div>
              </form>
            ) : (
               <Button 
                onClick={() => setShowSectionForm(true)}
                variant="ghost" 
                className="w-full border border-dashed border-gray-200 text-gray-400 hover:bg-gray-50 rounded-none uppercase font-bold text-[10px] h-10"
               >
                 Insert Syllabus Section
               </Button>
            )}
          </div>
        </div>

        {/* Main Content Area: Item Editor */}
        <div className="flex-1 bg-white overflow-y-auto p-12">
          {activeItem ? (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                   <span className="bg-[#005b94] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">{activeItem.type}</span>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">UID: {activeItem.id}</span>
                </div>
                <input 
                  type="text"
                  value={activeItem.title}
                  onChange={(e) => setActiveItem({...activeItem, title: e.target.value})}
                  className="w-full text-4xl font-bold text-gray-800 uppercase tracking-tight border-b border-transparent focus:border-gray-200 outline-none pb-2 transition-colors"
                  placeholder="Item Title..."
                />
              </div>

              {activeItem.type === 'live' && (
                <div className="p-8 border border-gray-200 bg-gray-50 space-y-6">
                  <h4 className="font-bold uppercase text-[11px] text-gray-400 tracking-widest flex items-center gap-2">
                    <Clock size={16} className="text-[#005b94]" /> Live Session Schedule
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-500 block">Weekday</label>
                      <select 
                        className="w-full border border-gray-300 rounded-none p-3 text-[11px] font-bold uppercase outline-none bg-white focus:border-[#005b94]"
                        value={activeItem.schedule_config?.day || 'Sunday'}
                        onChange={(e) => setActiveItem({
                          ...activeItem, 
                          schedule_config: { 
                            startTime: activeItem.schedule_config?.startTime || '16:00', 
                            endTime: activeItem.schedule_config?.endTime || '17:00',
                            day: e.target.value 
                          }
                        })}
                      >
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-500 block">Session Start</label>
                      <input 
                        type="time"
                        className="w-full border border-gray-300 rounded-none p-3 text-xs font-mono outline-none focus:border-[#005b94]"
                        value={activeItem.schedule_config?.startTime || '16:00'}
                        onChange={(e) => setActiveItem({
                          ...activeItem, 
                          schedule_config: { 
                            day: activeItem.schedule_config?.day || 'Sunday', 
                            endTime: activeItem.schedule_config?.endTime || '17:00',
                            startTime: e.target.value 
                          }
                        })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-gray-500 block">Session End</label>
                      <input 
                        type="time"
                        className="w-full border border-gray-300 rounded-none p-3 text-xs font-mono outline-none focus:border-[#005b94]"
                        value={activeItem.schedule_config?.endTime || '17:00'}
                        onChange={(e) => setActiveItem({
                          ...activeItem, 
                          schedule_config: { 
                            day: activeItem.schedule_config?.day || 'Sunday', 
                            startTime: activeItem.schedule_config?.startTime || '16:00', 
                            endTime: e.target.value 
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-2">
                     <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Educational Material</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                       <input 
                        type="text"
                        value={activeItem.file_url || ''}
                        onChange={(e) => setActiveItem({...activeItem, file_url: e.target.value})}
                        className="w-full border border-gray-300 rounded-none p-3 text-xs font-mono outline-none focus:border-[#005b94] bg-gray-50/30"
                        placeholder="Registry URL (https://...) or upload a file"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="rounded-none border border-gray-300 bg-white text-[#005b94] hover:bg-gray-50 h-11 px-5 transition-none"
                      >
                        {uploading ? <Loader2 className="animate-spin" size={16} /> : <><FileUp size={16} className="mr-2" /> Upload</>}
                      </Button>
                    </div>
                  </div>

                  {activeItem.file_url && (
                    <div className="p-5 border border-gray-200 bg-gray-50/50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <FileText size={20} className="text-gray-300" />
                         <span className="text-[11px] font-bold text-gray-600 truncate max-w-lg">{activeItem.file_url.split('/').pop()}</span>
                      </div>
                      <a href={activeItem.file_url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#005b94] uppercase hover:underline">Verify Live Link</a>
                    </div>
                  )}
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Supplemental Instructional Text</label>
                    <textarea 
                      value={activeItem.content || ''}
                      onChange={(e) => setActiveItem({...activeItem, content: e.target.value})}
                      className="w-full h-80 border border-gray-300 rounded-none p-6 text-sm font-sans outline-none focus:border-[#005b94] bg-white leading-relaxed"
                      placeholder="Input comprehensive instructional content or assignment guidelines..."
                    />
                  </div>

                  {activeItem.type === 'assignment' && (
                    <div className="pt-12 space-y-8">
                      <div className="border-b border-primary pb-2 flex items-center justify-between">
                        <h3 className="font-bold uppercase text-xl text-gray-800 tracking-tight">Student Submissions</h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{submissions.length} Records</span>
                      </div>
                      
                      {loadingSubmissions ? (
                        <div className="p-8 text-center font-sans text-xs text-[#005b94] animate-pulse uppercase">Syncing student work...</div>
                      ) : submissions.length > 0 ? (
                        <div className="space-y-6">
                          {submissions.map((sub) => (
                            <Card key={sub.id} className="border border-gray-200 p-6 bg-white space-y-4 rounded-none shadow-sm group hover:border-[#005b94] transition-colors">
                              <div className="flex justify-between items-start border-b border-gray-50 pb-3">
                                <div>
                                  <p className="font-bold text-gray-800 uppercase text-[13px] tracking-tight">{sub.student_name}</p>
                                  <p className="text-[10px] text-[#005b94] font-medium">{sub.student_email}</p>
                                </div>
                                <div className="flex gap-2">
                                  {['Bad', 'Decent', 'Satisfactory'].map((g) => (
                                    <button
                                      key={g}
                                      onClick={() => handleGradeSubmission(sub.id, g)}
                                      className={`px-3 py-1 text-[9px] font-bold uppercase border transition-none ${
                                        sub.grade === g 
                                          ? 'bg-[#005b94] border-[#005b94] text-white' 
                                          : 'bg-white border-gray-200 text-gray-400 hover:border-[#005b94] hover:text-[#005b94]'
                                      }`}
                                    >
                                      {g}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="text-[13px] text-gray-600 font-sans italic leading-relaxed">
                                {sub.content || "No textual response provided."}
                              </div>
                              
                              {sub.file_url && (
                                <div className="pt-2 flex items-center gap-2">
                                  <FileUp size={12} className="text-gray-400" />
                                  <a href={sub.file_url} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#005b94] uppercase hover:underline">Download Solution Attachment</a>
                                </div>
                              )}
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="p-20 border border-dashed border-gray-200 text-center bg-gray-50/50">
                          <p className="text-[11px] font-bold text-gray-400 uppercase italic tracking-widest">Waiting for scholar submissions...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-12 border-t border-gray-100 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  className="text-red-600 hover:text-white hover:bg-red-600 rounded-none uppercase font-bold text-[10px] h-11 px-8 transition-none"
                  onClick={() => handleDeleteItem(activeItem.id)}
                >
                  <Trash2 size={16} className="mr-2" /> Discard Item
                </Button>
                <div className="flex items-center gap-4">
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Registry Sync Required</p>
                   <Button 
                    className="rounded-none bg-[#005b94] hover:bg-[#004a7a] text-white border-none uppercase font-bold text-[11px] h-11 px-12 transition-none shadow-md"
                    onClick={handleUpdateItem}
                  >
                    Commit Changes
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-300">
              <div className="p-16 border border-dashed border-gray-200 text-center space-y-4">
                <div className="flex justify-center"><BookOpen size={64} strokeWidth={1} className="opacity-20" /></div>
                <div>
                   <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Architect View</h3>
                   <p className="text-[10px] font-medium uppercase tracking-widest">Select a curriculum component to begin editing</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseEditor;
