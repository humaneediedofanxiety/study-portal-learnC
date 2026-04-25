import React, { useState, useEffect } from 'react';
import { FileText, Search, Archive, ChevronRight, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Resources: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get('/user/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Scanning resource vaults...</div>;

  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Resources */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Resources</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Archive | Global Repository
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Supplemental Materials
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4 pb-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full bg-white border border-gray-300 h-10 pl-10 px-4 text-sm focus:border-[#005b94] outline-none shadow-sm transition-colors" 
              placeholder="Search documents..." 
            />
          </div>
        </div>

        {resources.length > 0 ? (
          <div className="grid gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between group hover:border-[#005b94] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#005b94] transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold uppercase text-[#005b94] tracking-widest border border-[#005b94]/20 px-1.5 py-0.5 bg-blue-50/50">
                        {resource.type}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{resource.course_title}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 uppercase leading-tight group-hover:underline cursor-pointer">{resource.title}</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  {resource.file_url ? (
                    <a 
                      href={resource.file_url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-[11px] font-bold text-[#005b94] hover:underline uppercase tracking-widest"
                    >
                      <Download size={14} /> Download
                    </a>
                  ) : (
                    <span className="text-[10px] text-gray-400 italic">No file attached</span>
                  )}
                  <Link to={`/courses/${resource.course_id}`}>
                    <Button variant="outline" className="border-gray-300 text-gray-500 hover:border-[#005b94] hover:text-[#005b94] hover:bg-blue-50 rounded-none h-9 text-[10px] font-bold uppercase transition-none px-4">
                      View Context <ExternalLink size={12} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 border border-dashed border-gray-300 text-center bg-gray-50/50">
            <Archive className="h-16 w-16 mx-auto mb-4 text-gray-300 opacity-20" />
            <h2 className="text-xl font-bold uppercase text-gray-400">Registry Is Empty</h2>
          </div>
        )}

        <div className="pt-12 border-t border-gray-200 text-center">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">End of Archive</p>
        </div>
      </div>
    </div>
  );
};

export default Resources;
