/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LayoutGrid, List, Search, ArrowRight, Code } from 'lucide-react';
import { ProgrammingLanguage } from '../types.js';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'join'>('create');
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [language, setLanguage] = useState<ProgrammingLanguage>(ProgrammingLanguage.JAVASCRIPT);
  const navigate = useNavigate();

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substring(2, 9);
    // In real app, this would be an API call
    navigate(`/editor/${id}`, { state: { language, name: roomName } });
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId) navigate(`/editor/${roomId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Developer Dashboard</h1>
          <p className="text-light-muted dark:text-dark-muted">Collaborate on code with your team in real-time.</p>
        </div>
        <div className="flex bg-light-secondary dark:bg-dark-secondary p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('create')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'create' ? 'bg-white dark:bg-slate-800 shadow-sm text-dark-accent' : 'text-light-muted dark:text-dark-muted'}`}
          >
            <Plus size={18} />
            Create Room
          </button>
          <button 
            onClick={() => setActiveTab('join')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'join' ? 'bg-white dark:bg-slate-800 shadow-sm text-dark-accent' : 'text-light-muted dark:text-dark-muted'}`}
          >
            <Users size={18} />
            Join Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Action Card */}
        <div className="lg:col-span-7 bg-white dark:bg-dark-secondary p-8 rounded-3xl border border-light-secondary dark:border-slate-800 shadow-xl">
          {activeTab === 'create' ? (
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Create a New Session</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Room Name</label>
                <input 
                  type="text"
                  required
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g. Algorithm Challenge"
                  className="w-full px-4 py-3 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Programming Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as ProgrammingLanguage)}
                  className="w-full px-4 py-3 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none appearance-none transition-all"
                >
                  <option value={ProgrammingLanguage.JAVASCRIPT}>JavaScript (Node.js)</option>
                  <option value={ProgrammingLanguage.PYTHON}>Python 3</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-dark-accent text-dark-bg font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Launch Workspace
                <ArrowRight size={20} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoinRoom} className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Join Existing Room</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Room ID</label>
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 text-light-muted dark:text-dark-muted" size={20} />
                  <input 
                    type="text"
                    required
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter unique room ID"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-light-secondary dark:border-slate-800 bg-light-bg dark:bg-dark-bg focus:ring-2 focus:ring-dark-accent outline-none transition-all"
                  />
                </div>
              </div>
              <p className="text-sm text-light-muted dark:text-dark-muted bg-light-bg dark:bg-dark-bg p-4 rounded-xl border border-dashed border-light-secondary dark:border-slate-800">
                You will automatically inherit the programming language and permissions configured by the room creator.
              </p>
              <button 
                type="submit"
                className="w-full bg-dark-accent text-dark-bg font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all"
              >
                Join Collaborative Session
                <ArrowRight size={20} />
              </button>
            </form>
          )}
        </div>

        {/* Recent Activity / Side Panels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-light-secondary dark:bg-slate-900 p-6 rounded-3xl border border-light-secondary dark:border-slate-800">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Code size={18} className="text-dark-accent" />
              Recent Rooms
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Backend Auth Module', lang: 'JavaScript', time: '2 hours ago' },
                { name: 'Data Visualization', lang: 'Python', time: '1 day ago' },
              ].map((room, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-dark-secondary hover:translate-x-1 transition-transform cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">{room.name}</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">{room.lang} • {room.time}</p>
                  </div>
                  <ArrowRight size={14} className="text-light-muted dark:text-dark-muted" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-accent/10 border border-dark-accent/20 p-6 rounded-3xl">
            <h3 className="font-bold text-dark-accent mb-2">Quick Tip</h3>
            <p className="text-sm text-light-text dark:text-dark-text opacity-80 leading-relaxed">
              Share your Room ID with teammates to start collaborating. All changes are saved automatically to the cloud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
