/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import { type User, type ChatMessage } from '../types';
import { roomService} from '../lib/roomService';
import { executionService } from '../lib/executionService';

interface RemoteCursor {
  userId: string;
  name: string;
  color: string;
  lineNumber: number;
  column: number;
}

interface CodingRoomProps {
  user: User;
  roomId: string;
  onExit: () => void;
}

const USER_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'
];

const CodingRoom: React.FC<CodingRoomProps> = ({ user, roomId, onExit }) => {
  const [code, setCode] = useState('// SyncCode session started...');
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [participants, setParticipants] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [output, setOutput] = useState('');
  const [executing, setExecuting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);
  const decorationIdsRef = useRef<string[]>([]);

  // Initialize Room and Sync Channel
  useEffect(() => {
    const init = async () => {
      const p = await roomService.getParticipants(roomId);
      setParticipants(p);
      const c = await roomService.loadCode(roomId);
      if (c.code) setCode(c.code);
      if (c.language) setLanguage(c.language as any);
    };
    init();

    broadcastChannel.current = new BroadcastChannel(`synccode-room-${roomId}`);
    
    broadcastChannel.current.onmessage = (event) => {
      const { type, payload, senderId } = event.data;
      if (senderId === user.id) return;

      switch (type) {
        case 'CHAT_MESSAGE':
          setMessages((prev) => [...prev, payload]);
          if (!showChat) setShowChat(true);
          break;
        case 'CODE_UPDATE':
          if (editorRef.current && payload !== editorRef.current.getValue()) {
            const model = editorRef.current.getModel();
            if (model) {
              // Using pushEditOperations to maintain undo/redo stack where possible
              editorRef.current.executeEdits('remote-sync', [{
                range: model.getFullModelRange(),
                text: payload,
                forceMoveMarkers: true
              }]);
            }
          }
          break;
        case 'CURSOR_UPDATE':
          updateRemoteCursor(payload);
          break;
        case 'LANGUAGE_UPDATE':
          setLanguage(payload);
          break;
        case 'USER_JOIN':
          // Request current state from existing users if needed
          break;
      }
    };

    return () => {
      broadcastChannel.current?.close();
    };
  }, [roomId, user.id]);

  // Handle Remote Cursor Rendering
  const updateRemoteCursor = (remoteCursor: RemoteCursor) => {
    if (!editorRef.current || !monacoRef.current) return;

    const monaco = monacoRef.current;
    const editor = editorRef.current;

    // Remove old decorations for this user
    const otherDecorations = decorationIdsRef.current;
    
    const newDecorations = [
      {
        range: new monaco.Range(remoteCursor.lineNumber, remoteCursor.column, remoteCursor.lineNumber, remoteCursor.column + 1),
        options: {
          className: `remote-cursor-${remoteCursor.userId}`,
          beforeContentClassName: `remote-cursor-widget-${remoteCursor.userId}`,
          stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          hoverMessage: { value: remoteCursor.name }
        }
      }
    ];

    // Create dynamic CSS for the cursor color if it doesn't exist
    if (!document.getElementById(`style-${remoteCursor.userId}`)) {
      const style = document.createElement('style');
      style.id = `style-${remoteCursor.userId}`;
      style.innerHTML = `
        .remote-cursor-${remoteCursor.userId} {
          border-left: 2px solid ${remoteCursor.color} !important;
        }
        .remote-cursor-widget-${remoteCursor.userId}::after {
          content: '${remoteCursor.name}';
          position: absolute;
          top: -18px;
          left: 0;
          background: ${remoteCursor.color};
          color: white;
          font-size: 10px;
          padding: 0 4px;
          border-radius: 2px;
          white-space: nowrap;
          font-weight: bold;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }

    decorationIdsRef.current = editor.deltaDecorations(decorationIdsRef.current, newDecorations);
  };

  useEffect(() => {
    if (showChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showChat]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Listen for cursor movements to broadcast
    editor.onDidChangeCursorPosition((e: any) => {
      broadcastChannel.current?.postMessage({
        type: 'CURSOR_UPDATE',
        senderId: user.id,
        payload: {
          userId: user.id,
          name: user.name,
          color: USER_COLORS[user.id.length % USER_COLORS.length],
          lineNumber: e.position.lineNumber,
          column: e.position.column
        }
      });
    });
  };

  const handleUndo = () => editorRef.current?.trigger('keyboard', 'undo', null);
  const handleRedo = () => editorRef.current?.trigger('keyboard', 'redo', null);
  const handleCopy = () => {
    const text = editorRef.current?.getValue();
    if (text) navigator.clipboard.writeText(text);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      broadcastChannel.current?.postMessage({
        type: 'CODE_UPDATE',
        senderId: user.id,
        payload: value
      });
    }
  };

  const handleLanguageChange = (newLang: 'javascript' | 'python') => {
    setLanguage(newLang);
    broadcastChannel.current?.postMessage({
      type: 'LANGUAGE_UPDATE',
      senderId: user.id,
      payload: newLang
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: user,
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput('');
    broadcastChannel.current?.postMessage({ type: 'CHAT_MESSAGE', senderId: user.id, payload: newMessage });
  };

  const handleExecute = async () => {
    setExecuting(true);
    setOutput('Running code...');
    try {
      const res = await executionService.execute(code, language);
      setOutput(res.output || res.error || 'Done.');
    } catch (err) {
      setOutput('Execution failed.');
    } finally {
      setExecuting(false);
    }
  };

  const handleSave = async () => {
    await roomService.saveCode(roomId, code, language);
    const btn = document.getElementById('save-btn');
    if (btn) {
      const original = btn.innerText;
      btn.innerText = 'Saved!';
      setTimeout(() => btn.innerText = original, 2000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white overflow-hidden">
      <nav className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between z-30 shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowParticipants(!showParticipants)}
            className={`p-2 rounded-lg transition-colors ${showParticipants ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </button>
          <h2 className="font-bold text-lg text-indigo-400 hidden sm:block">SyncCode</h2>
          <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg">
            <button onClick={handleUndo} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Undo"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" /></svg></button>
            <button onClick={handleRedo} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Redo"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10h-10a8 8 0 00-8 8v2m18-10l-5 5m5-5l-5-5" /></svg></button>
            <button onClick={handleCopy} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white" title="Copy"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-100 cursor-pointer"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <button id="save-btn" onClick={handleSave} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-all border border-slate-700">Save</button>
          <button 
            onClick={handleExecute} 
            disabled={executing}
            className="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-xs font-bold rounded-lg flex items-center gap-2 transition-all"
          >
            {executing ? <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>}
            Run Code
          </button>
          <button onClick={onExit} className="px-3 py-1.5 text-slate-400 hover:text-white text-xs font-medium transition-colors hidden sm:block">Exit</button>
          <button 
            onClick={() => setShowChat(!showChat)}
            className={`p-2 rounded-lg transition-colors ml-1 ${showChat ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <aside className={`bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col ${showParticipants ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
          <div className="p-4 border-b border-slate-800 flex justify-between items-center"><h3 className="text-xs font-black uppercase text-slate-500">Mates</h3></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {participants.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-xs font-bold border border-white/10">{p.name.charAt(0)}</div>
                <div className="flex flex-col"><span className={`text-sm font-medium ${p.id === user.id ? 'text-indigo-400' : 'text-slate-300'}`}>{p.name}</span><span className="text-[10px] text-slate-500 uppercase tracking-tighter">Live</span></div>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          <div className="flex-1 overflow-hidden relative">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              value={code}
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 20 },
                lineNumbers: 'on',
                glyphMargin: true,
                folding: true
              }}
            />
          </div>
          <div className="h-40 bg-slate-900 border-t border-slate-800 flex flex-col shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
            <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Output</span>
              <button onClick={() => setOutput('')} className="text-[10px] text-slate-500 hover:text-slate-300 uppercase font-bold">Clear</button>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap text-emerald-400/90 bg-[#0b121e]">
              {output || <span className="text-slate-600 italic">Ready for execution...</span>}
            </div>
          </div>
        </div>

        <aside className={`bg-slate-900 border-l border-slate-800 transition-all duration-300 ease-in-out flex flex-col ${showChat ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
          <div className="p-4 border-b border-slate-800 flex justify-between items-center"><h3 className="text-xs font-black uppercase text-slate-500">Live Chat</h3></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender.id === user.id ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1 px-1"><span className="text-[10px] font-black text-slate-500 uppercase">{msg.sender.name}</span></div>
                <div className={`px-4 py-2 rounded-2xl text-sm leading-relaxed max-w-[90%] ${msg.sender.id === user.id ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}`}>{msg.message}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900">
            <input 
              type="text" placeholder="Message mates..." value={chatInput} onChange={(e) => setChatInput(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </form>
        </aside>
      </div>
    </div>
  );
};

export default CodingRoom;
