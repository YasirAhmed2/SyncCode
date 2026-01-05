
import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Users2, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-dark-secondary border border-light-secondary dark:border-slate-800 hover:border-dark-accent/50 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-dark-accent/10 text-dark-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-light-muted dark:text-dark-muted leading-relaxed">{desc}</p>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-dark-accent/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-32">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-accent/10 text-dark-accent text-xs font-bold uppercase tracking-wider mb-6 border border-dark-accent/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-dark-accent"></span>
            </span>
            Real-time collaboration is here
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight max-w-4xl mx-auto">
            Code together in <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark-accent to-purple-400">Perfect Sync</span>
          </h1>
          <p className="text-lg md:text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto mb-10">
            The ultimate collaborative workspace for developers. Write, run, and ship code together with zero latency and full synchronization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/signup" 
              className="w-full sm:w-auto px-8 py-4 bg-dark-accent text-dark-bg font-bold rounded-xl flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-dark-accent/20 transition-all"
            >
              Start Coding Free
              <ChevronRight size={20} />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 bg-light-secondary dark:bg-slate-800 font-bold rounded-xl hover:bg-opacity-80 transition-all"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Grid Stats/Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <FeatureCard 
            icon={<Code2 size={24} />} 
            title="Rich Editor" 
            desc="Powerful editor with syntax highlighting for JavaScript and Python, ligatures, and autocomplete."
          />
          <FeatureCard 
            icon={<Users2 size={24} />} 
            title="Collaborative" 
            desc="Join rooms with ease. See other cursors and code changes in real-time without refreshing."
          />
          <FeatureCard 
            icon={<Zap size={24} />} 
            title="Instant Run" 
            desc="Execute your code directly in the browser and see outputs instantly in the shared console."
          />
        </div>

        {/* Project Context (For Viva/Portfolio) */}
        <div className="bg-gradient-to-br from-light-secondary to-white dark:from-dark-secondary dark:to-slate-900 border border-light-secondary dark:border-slate-800 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheck className="text-dark-accent" />
              Built for Modern Standards
            </h2>
            <p className="text-light-muted dark:text-dark-muted mb-8 text-lg">
              SyncCode was engineered with a focus on performance and developer experience. Leveraging WebSockets for real-time state, JWT for secure session management, and a robust OTP-based authentication flow.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['React 18', 'Tailwind CSS', 'Node.js', 'WebSockets', 'OTP Auth', 'TypeScript'].map(tech => (
                <div key={tech} className="bg-white/50 dark:bg-black/20 px-4 py-2 rounded-lg text-sm font-medium text-center">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
