import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, User, LogOut, MessageSquare, Shield, Users as UsersIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BookOpen size={20} />, label: 'My Courses', path: '/courses' },
    { icon: <MessageSquare size={20} />, label: 'Discussions', path: '/discussions' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
  ];

  const adminItems = [
    { icon: <Shield size={20} />, label: 'Admin Panel', path: '/admin' },
    { icon: <UsersIcon size={20} />, label: 'Manage Users', path: '/admin/users' },
    { icon: <BookOpen size={20} />, label: 'Manage Courses', path: '/admin/courses' },
  ];

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      backgroundColor: 'var(--card-bg)',
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 1rem',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '2.5rem', paddingLeft: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 'bold' }}>LMS-AI</h2>
      </div>

      <nav style={{ flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`}
            style={({ isActive }) => ({
              width: '100%',
              justifyContent: 'flex-start',
              gap: '0.75rem',
              marginBottom: '0.5rem',
              backgroundColor: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'white' : 'var(--text-muted)',
            })}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <div style={{ marginTop: '2rem', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>System Admin</p>
            </div>
            {adminItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `btn ${isActive ? 'btn-primary' : ''}`}
                style={({ isActive }) => ({
                  width: '100%',
                  justifyContent: 'flex-start',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-muted)',
                })}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <button
        onClick={logout}
        className="btn"
        style={{
          width: '100%',
          justifyContent: 'flex-start',
          gap: '0.75rem',
          color: '#ef4444',
          marginTop: 'auto'
        }}
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
