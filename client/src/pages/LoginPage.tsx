import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4 font-sans">
      <Card className="w-full max-w-[420px] border border-gray-300 bg-white p-10 rounded-none shadow-md flex flex-col">
        <div className="flex flex-col items-center mb-10">
          <div className="flex h-14 w-14 items-center justify-center bg-black text-white mb-4">
             <div className="flex flex-col leading-none items-center">
                <span className="text-xl font-black tracking-tighter">LearnC.</span>
                <span className="text-[6px] font-bold uppercase -mt-0.5">OCW</span>
             </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Portal Access</h1>
          <div className="h-1 w-12 bg-[#005b94] mt-2"></div>
        </div>

        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 p-3 text-[11px] font-bold uppercase tracking-wider mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">Academic Identifier (Email)</label>
            <Input
              type="email"
              placeholder="scholar@mit-ocw.edu"
              className="rounded-none border-gray-300 h-11 focus-visible:border-[#005b94] focus-visible:ring-0 bg-gray-50/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">Security Credentials</label>
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
            className="w-full bg-[#005b94] hover:bg-[#004a7a] text-white rounded-none border-none transition-none font-bold uppercase tracking-widest h-12 mt-2 shadow-sm"
          >
            Authenticate
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
            Registry Status: Unregistered? <Link to="/register" className="text-[#005b94] hover:underline ml-1">Create Account</Link>
          </p>
        </div>
      </Card>
      
      {/* Floating corner decoration */}
      <div className="fixed bottom-8 right-8 hidden lg:block opacity-20">
         <ShieldCheck size={120} strokeWidth={0.5} className="text-gray-400" />
      </div>
    </div>
  );
};

export default LoginPage;
