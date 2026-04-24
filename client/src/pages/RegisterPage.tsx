import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', { email, password, fullName });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4 font-sans">
      <Card className="w-full max-w-[440px] border border-gray-300 bg-white p-10 rounded-none shadow-md flex flex-col">
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-14 w-14 items-center justify-center bg-black text-white mb-4">
             <UserPlus className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Scholar Registry</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Enrollment | LearnC.</p>
          <div className="h-1 w-12 bg-[#005b94] mt-4"></div>
        </div>

        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 p-3 text-[11px] font-bold uppercase tracking-wider mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">Legal Name of Scholar</label>
            <Input
              type="text"
              placeholder="e.g., Jane Smith"
              className="rounded-none border-gray-300 h-11 focus-visible:border-[#005b94] focus-visible:ring-0 bg-gray-50/30"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">Primary Contact (Email)</label>
            <Input
              type="email"
              placeholder="jane@mit-ocw.edu"
              className="rounded-none border-gray-300 h-11 focus-visible:border-[#005b94] focus-visible:ring-0 bg-gray-50/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">Secure Access Key (Password)</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="rounded-none border-gray-300 h-11 focus-visible:border-[#005b94] focus-visible:ring-0 bg-gray-50/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none transition-none font-bold uppercase tracking-widest h-12 mt-4 shadow-sm"
          >
            Create Scholar Record
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Already Registered? <Link to="/login" className="text-[#005b94] hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
