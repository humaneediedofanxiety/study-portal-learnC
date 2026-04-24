import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './study-portal/sidebar';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout: React.FC = () => {
  const { token, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if we are in a course detail view
  const isCourseView = location.pathname.startsWith('/courses/') && location.pathname.split('/').length > 2;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="font-sans text-sm animate-pulse">Loading course data...</div>
    </div>
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#333333] font-sans antialiased">
      {/* Mobile Menu Toggle (Visible only when sidebar is closed and on small screens) */}
      {!isCourseView && (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 z-[60] lg:hidden rounded-full h-14 w-14 bg-[#005b94] hover:bg-[#004a7a] shadow-lg border-none"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
      )}

      <div className={`${isCourseView ? 'w-full' : 'max-w-[1200px] mx-auto'} px-4 lg:px-8 py-0 transition-all duration-300`}>
         <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar (Always visible on LG, toggleable on smaller screens) */}
            {!isCourseView && (
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            )}
            
            <main className={`flex-1 min-h-screen ${isCourseView ? 'pt-0' : 'pt-8'}`}>
              <Outlet />
            </main>
         </div>
      </div>
      
      {/* Footer Placeholder (Classic OCW Style) */}
      <footer className={`mt-20 border-t border-gray-300 py-12 px-8 ${isCourseView ? 'w-full' : 'max-w-[1200px] mx-auto'} text-[11px] text-gray-500`}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-4">
             <div className="font-black text-lg tracking-tighter text-gray-800">LearnC.</div>
          </div>
          <p>© 2001–2026 LearnC. Learning System</p>
          <nav className="flex gap-4 mt-2">
             <a href="#" className="hover:underline">Accessibility</a>
             <a href="#" className="hover:underline">Creative Commons License</a>
             <a href="#" className="hover:underline">Terms and Conditions</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
