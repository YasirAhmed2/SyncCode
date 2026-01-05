/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Play, Share2, Users, Save, ChevronLeft, Terminal, Copy, Check } from 'lucide-react';
import { ProgrammingLanguage } from '../types.js';

const EditorPage: React.FC = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(() => {
    return location.state?.language === ProgrammingLanguage.PYTHON 
      ? `def hello_world():\n    print("Hello from SyncCode!")\n\nhello_world()` 
      : `console.log("Hello from SyncCode!");\n\nfunction greet(name) {\n    return \`Hello \${name}\`;\n}\n\nconsole.log(greet("Developer"));`;
  });
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [collaborators, setCollaborators] = useState([
    { id: '1', name: 'John (You)', color: 'bg-blue-500' },
    { id: '2', name: 'Alice', color: 'bg-green-500' },
  ]);

  const language = location.state?.language || ProgrammingLanguage.JAVASCRIPT;

  const handleRun = () => {
    setIsRunning(true);
    setOutput(['Compiling...', 'Running...']);
    setTimeout(() => {
      setOutput(prev => [...prev, `[Output]: Hello from SyncCode!`, `[Output]: Greeted Developer`]);
      setIsRunning(false);
    }, 800);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-dark-bg">
      {/* Editor Header */}
      <div className="bg-dark-secondary border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-dark-muted transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-dark-text leading-tight">{location.state?.name || 'Collaborative Room'}</h2>
            <p className="text-[10px] text-dark-muted uppercase tracking-widest font-bold">Room ID: {roomId}</p>
          </div>
          <div className="h-6 w-px bg-slate-800 mx-2" />
          <div className="flex items-center gap-1.5 bg-dark-bg px-2.5 py-1 rounded-md border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-dark-accent" />
            <span className="text-xs font-mono text-dark-muted">{language === 'python' ? 'Python 3' : 'Node.js'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Collaborators */}
          <div className="flex -space-x-2 mr-4">
            {collaborators.map(c => (
              <div 
                key={c.id} 
                title={c.name}
                className={`w-8 h-8 rounded-full border-2 border-dark-secondary ${c.color} flex items-center justify-center text-[10px] font-bold text-white uppercase`}
              >
                {c.name.charAt(0)}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-dark-secondary bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
              +3
            </div>
          </div>

          <button 
            onClick={copyRoomId}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-all"
          >
            {copied ? <Check size={14} className="text-dark-success" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Share ID'}
          </button>

          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-1.5 bg-dark-accent text-dark-bg font-extrabold rounded-lg text-xs hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isRunning ? <div className="w-3 h-3 border-2 border-dark-bg border-t-transparent animate-spin rounded-full" /> : <Play size={14} fill="currentColor" />}
            Run Code
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar / Tools */}
        <div className="w-12 bg-dark-secondary border-r border-slate-800 flex flex-col items-center py-4 gap-6">
          <Users size={20} className="text-dark-accent" />
          <Terminal size={20} className="text-dark-muted hover:text-dark-accent cursor-pointer" />
          <Save size={20} className="text-dark-muted hover:text-dark-accent cursor-pointer" />
          <div className="mt-auto mb-2">
             <Share2 size={20} className="text-dark-muted hover:text-dark-accent cursor-pointer" />
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="flex-grow bg-slate-900 overflow-hidden flex flex-col">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-grow w-full bg-transparent p-6 font-mono text-sm resize-none outline-none text-slate-300 code-ligatures leading-relaxed no-scrollbar"
              placeholder="// Write your code here..."
            />
          </div>

          {/* Console / Output */}
          <div className="w-full md:w-80 lg:w-96 bg-dark-bg border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2 bg-dark-secondary">
              <Terminal size={14} className="text-dark-muted" />
              <span className="text-[10px] font-bold text-dark-muted uppercase tracking-wider">Console Output</span>
            </div>
            <div className="flex-grow p-4 font-mono text-xs overflow-y-auto no-scrollbar space-y-1">
              {output.length === 0 ? (
                <p className="text-slate-600 italic">Click "Run Code" to see execution results...</p>
              ) : (
                output.map((line, idx) => (
                  <p key={idx} className={line.includes('Error') ? 'text-red-400' : 'text-slate-400'}>
                    <span className="text-slate-600 mr-2">{">"}</span>
                    {line}
                  </p>
                ))
              )}
              {isRunning && (
                <div className="flex items-center gap-2 text-dark-accent mt-2">
                  <div className="w-2 h-2 rounded-full bg-dark-accent animate-pulse" />
                  <span>Executing environment...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Footer Status Bar */}
      <div className="bg-dark-secondary border-t border-slate-800 px-4 py-1 flex items-center justify-between text-[10px] font-medium text-dark-muted uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Server Connected
          </span>
          <span>UTF-8</span>
        </div>
        <div>
          Line 1, Column 1
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
