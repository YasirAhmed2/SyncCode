
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/verify-otp', { state: { email, type: 'forgot' } });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-dark-accent mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Login
        </Link>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-light-muted dark:text-dark-muted">No worries, we'll send you reset instructions.</p>
        </div>

        <div className="bg-white dark:bg-dark-secondary p-8 rounded-2xl border border-light-secondary dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-light-muted dark:text-dark-muted" size={20} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark-accent text-dark-bg font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
              {!isLoading && <Send size={20} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
