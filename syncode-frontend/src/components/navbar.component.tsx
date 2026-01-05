
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Linkedin, Sun, Moon, LogOut, Terminal } from 'lucide-react';
import { useAuth } from '../context/auth.context.js';
import { useTheme } from '../context/theme.context.js';

const Navbar: React.FC = () => {
 
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-light-secondary dark:border-dark-secondary bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md px-4 md:px-8 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-dark-accent p-1.5 rounded-lg text-dark-bg transition-transform group-hover:scale-110">
          <Terminal size={20} />
        </div>
        <span className="text-xl font-bold tracking-tight text-light-text dark:text-dark-text">
          Sync<span className="text-dark-accent">Code</span>
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Social Links */}
        <div className="hidden sm:flex items-center gap-3 border-r pr-4 border-light-secondary dark:border-dark-secondary">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-light-muted dark:text-dark-muted hover:text-dark-accent transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-light-muted dark:text-dark-muted hover:text-dark-accent transition-colors"
          >
            <Github size={20} />
          </a>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors text-light-muted dark:text-dark-muted"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Auth Actions */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm font-medium text-light-muted dark:text-dark-muted">
              {user?.username}
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium hover:text-dark-accent transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-dark-accent hover:opacity-90 text-dark-bg px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
