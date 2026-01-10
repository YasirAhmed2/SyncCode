import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Github, Code2, Sparkles, Zap, Users } from 'lucide-react';
import { useTheme } from '../context/theme.context';
import { Moon, Sun } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Github className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </a>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-float">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Real-time Collaborative Coding</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Sync<span className="text-blue-600 dark:text-blue-400">Code</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Code together in real-time with your team
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">Real-time Collaboration</h3>
            <p className="text-gray-600 dark:text-gray-300">
              See your teammates' cursors and edits live. Code together seamlessly from anywhere.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-4">
              <Code2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">Multi-language Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Write code in JavaScript, Python, and more with syntax highlighting and autocomplete.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="inline-flex p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mb-4">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">Built-in Chat</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Communicate with your team directly in the editor. Share ideas and solve problems together.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="group relative px-12 py-6 text-xl font-bold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform"
          >
            <span className="relative z-10">Get Started →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
          </button>
          
          <p className="mt-6 text-gray-500 dark:text-gray-400">
            Join thousands of developers coding together
          </p>
        </div>
      </main>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default LandingPage;