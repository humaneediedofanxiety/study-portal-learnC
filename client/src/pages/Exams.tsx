import React, { useState, useEffect } from 'react';
import { Award, ChevronRight, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exams: React.FC = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/exams', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [token]);

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Syncing examination records...</div>;

  return (
    <div className="-mt-8">
      {/* Classic Blue Banner for Exams */}
      <div className="bg-[#005b94] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-90 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <span className="opacity-70">Examination Center</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">
            Assessments | Academic Integrity
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            Scheduled Exams
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-10">
        {exams.length > 0 ? (
          <div className="grid gap-6">
             {exams.map((exam) => (
               <Card key={exam.id} className="border border-border rounded-none shadow-none p-8 flex flex-col md:flex-row gap-8 items-center bg-white group hover:border-red-600 transition-colors">
                 <div className="h-16 w-16 bg-red-50 flex items-center justify-center text-red-600 border border-red-100 shrink-0">
                   <ShieldAlert size={32} />
                 </div>
                 
                 <div className="flex-1 space-y-3">
                   <div className="flex items-center gap-3">
                     <span className="text-[9px] font-bold uppercase text-red-600 tracking-wider border border-red-600/20 px-2 py-0.5 bg-red-50/50">
                        {exam.course_title}
                     </span>
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">REF_ID: OCW-EXM-{exam.id}</span>
                   </div>
                   <h2 className="text-2xl font-bold text-gray-800 leading-tight uppercase group-hover:text-red-600">{exam.title}</h2>
                   <p className="text-sm italic text-gray-500 max-w-2xl leading-relaxed">
                     {exam.content || "Assessment materials and proctoring protocols are finalized by the department. Please review the syllabus for prerequisite details."}
                   </p>
                 </div>

                 <div className="w-full md:w-auto shrink-0">
                    <Link to={`/courses/${exam.course_id || ''}`}>
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-none border-none transition-none font-bold uppercase text-[11px] h-11 px-8 shadow-sm">
                        Access Exam Site
                      </Button>
                    </Link>
                 </div>
               </Card>
             ))}
          </div>
        ) : (
          <div className="p-24 border border-dashed border-border text-center bg-gray-50/50 rounded-md">
            <Award className="h-16 w-16 mx-auto mb-4 text-gray-300 opacity-30" />
            <h2 className="text-xl font-bold uppercase text-gray-400">No Scheduled Assessments</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Examination_Status: [Standby]</p>
          </div>
        )}

        <div className="bg-[#A31F34]/5 border border-[#A31F34]/20 p-10 text-center space-y-4">
          <h3 className="text-sm font-bold uppercase text-[#A31F34] tracking-widest">Protocol Deviation Request</h3>
          <p className="text-xs text-gray-600 max-w-lg mx-auto italic font-medium leading-relaxed">Applications for retakes or rescheduling must be submitted via formal petition to the academic registry no later than 48 hours before the session.</p>
          <Button variant="outline" className="border-[#A31F34] text-[#A31F34] hover:bg-[#A31F34] hover:text-white rounded-none font-bold uppercase text-[10px] px-8 h-10 transition-none mt-4">
            Initialize Request Form
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Exams;
