
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/auth.context.js';

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';
  const type = location.state?.type || 'signup';

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== '' && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    try {
      await verifyOTP(otpValue, email);
      if (type === 'forgot') {
        navigate('/reset-password', { state: { email, otp: otpValue } });
      } else {
        alert('Account activated successfully! Please login.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Try 123456');
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    // Simulate resend API
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-dark-accent/10 text-dark-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Verify Account</h2>
        <p className="text-light-muted dark:text-dark-muted mb-8">
          We've sent a 6-digit code to <span className="text-light-text dark:text-dark-text font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2 sm:gap-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl border-light-secondary dark:border-slate-800 bg-white dark:bg-dark-secondary focus:border-dark-accent focus:ring-0 outline-none transition-all"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dark-accent text-dark-bg font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Verify OTP'}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <p className="text-light-muted dark:text-dark-muted">Didn't receive code?</p>
          <button
            onClick={handleResend}
            disabled={resendTimer > 0}
            className={`font-bold flex items-center gap-1 ${resendTimer > 0 ? 'text-light-muted dark:text-dark-muted cursor-not-allowed' : 'text-dark-accent hover:underline'}`}
          >
            <RefreshCw size={14} className={resendTimer > 0 ? '' : 'animate-spin-slow'} />
            Resend {resendTimer > 0 ? `(${resendTimer}s)` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
