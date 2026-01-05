
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '../context/auth.context.js';

const SignupPage: React.FC = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(form.username, form.email, form.password);
      // Navigate to OTP page and pass email for context
      navigate('/verify-otp', { state: { email: form.email, type: 'signup' } });
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-light-muted dark:text-dark-muted">Join the SyncCode developer community</p>
        </div>

        <div className="bg-white dark:bg-dark-secondary p-8 rounded-2xl border border-light-secondary dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-light-muted dark:text-dark-muted" size={20} />
                <input 
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none transition-all"
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-light-muted dark:text-dark-muted" size={20} />
                <input 
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-light-muted dark:text-dark-muted" size={20} />
                <input 
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none transition-all"
                  placeholder="Minimum 8 characters"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark-accent text-dark-bg font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
              {!isLoading && <UserPlus size={20} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-light-secondary dark:border-slate-800 text-center">
            <p className="text-light-muted dark:text-dark-muted text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-dark-accent font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
