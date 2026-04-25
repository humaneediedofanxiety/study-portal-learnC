import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Shield, ChevronRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      alert('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  if (loading) return <div className="p-8 font-sans text-sm text-[#005b94] animate-pulse">Accessing scholar registry...</div>;

  return (
    <div className="-mt-8">
      {/* Admin User Header */}
      <div className="bg-[#333] text-white px-8 py-6 -mx-4 lg:-mx-8">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-1 text-[11px] font-medium opacity-70 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={10} />
            <Link to="/admin" className="hover:underline">Admin</Link>
            <ChevronRight size={10} />
            <span className="opacity-50">User Registry</span>
          </nav>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">
            Account Management | Institutional Identity
          </div>
          <h1 className="text-3xl font-medium tracking-tight uppercase">
            User Manager
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-8 mb-12 space-y-8">
        <div className="border-b border-primary pb-2 flex items-center justify-between">
           <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase">Registry Members</h2>
           <div className="text-[10px] font-bold text-[#005b94] uppercase tracking-widest px-3 py-1 bg-blue-50 border border-blue-100">
             {users.length} Records Authenticated
           </div>
        </div>

        <Card className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-none">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Identity & Credentials</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Privilege Level</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">Registry Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="h-9 w-9 bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                          <UserCheck size={18} />
                       </div>
                       <div>
                        <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">{user.full_name}</p>
                        <p className="text-[11px] text-[#005b94] font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <select 
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="text-[11px] font-bold uppercase tracking-wider border border-gray-300 rounded-none px-3 py-1.5 bg-white focus:outline-none focus:border-[#005b94] shadow-sm"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-300 hover:text-red-600 p-2 transition-colors"
                      title="Purge Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        
        <div className="p-6 bg-gray-50 border border-gray-200 border-l-4 border-l-[#005b94]">
           <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-1">Administrative Protocol</p>
           <p className="text-[12px] text-gray-600 italic">User role modifications take effect immediately upon next session initialization.</p>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
