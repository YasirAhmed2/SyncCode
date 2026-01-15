/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';

interface Participant {
  id: string;
  name: string;
  avatarColor: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

interface Room {
  id: string;
  name: string;
  createdBy: string;
  participants: Participant[];
  createdAt: Date;
}

interface RoomContextType {
  currentRoom: Room | null;
  rooms: Room[];
  messages: Message[];
  code: string;
  language: 'javascript' | 'python';
  createRoom: (name: string) => Promise<Room>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: () => void;
  sendMessage: (content: string) => void;
  updateCode: (newCode: string) => void;
  setLanguage: (lang: 'javascript' | 'python') => void;
  executeCode: () => Promise<{ output: string; error: string | null }>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

const mockParticipants: Participant[] = [
  { id: '1', name: 'You', avatarColor: '#00D9FF', isOnline: true },
];

export function RoomProvider({ children }: { children: ReactNode }) {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState<string>('// Start coding here...\nconsole.log("Hello, SyncCode!");');
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');

  const createRoom = async (name: string): Promise<Room> => {
    const newRoom: Room = {
      id: 'room_' + Math.random().toString(36).substr(2, 9),
      name,
      createdBy: 'current_user',
      participants: mockParticipants,
      createdAt: new Date(),
    };
    
    setRooms(prev => [...prev, newRoom]);
    setCurrentRoom(newRoom);
    setMessages([]);
    setCode(language === 'javascript' 
      ? '// Start coding here...\nconsole.log("Hello, SyncCode!");'
      : '# Start coding here...\nprint("Hello, SyncCode!")'
    );
    
    return newRoom;
  };

  const joinRoom = async (roomId: string) => {
    // Simulate joining a room
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingRoom = rooms.find(r => r.id === roomId);
    if (existingRoom) {
      setCurrentRoom(existingRoom);
    } else {
      const joinedRoom: Room = {
        id: roomId,
        name: 'Joined Room',
        createdBy: 'other_user',
        participants: [
          ...mockParticipants,
          { id: '2', name: 'Collaborator', avatarColor: '#00E5A0', isOnline: true },
        ],
        createdAt: new Date(),
      };
      setRooms(prev => [...prev, joinedRoom]);
      setCurrentRoom(joinedRoom);
    }
    setMessages([]);
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
    setMessages([]);
  };

  const sendMessage = (content: string) => {
    const newMessage: Message = {
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      userId: 'current_user',
      userName: 'You',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const updateCode = (newCode: string) => {
    setCode(newCode);
  };

  const executeCode = async (): Promise<{ output: string; error: string | null }> => {
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (language === 'javascript') {
        // Very basic simulation
        if (code.includes('console.log')) {
          const match = code.match(/console\.log\(["'](.*)["']\)/);
          return { output: match ? match[1] + '\n' : 'Executed successfully\n', error: null };
        }
      } else {
        if (code.includes('print')) {
          const match = code.match(/print\(["'](.*)["']\)/);
          return { output: match ? match[1] + '\n' : 'Executed successfully\n', error: null };
        }
      }
      return { output: 'Code executed successfully\n', error: null };
    } catch (err) {
      return { output: '', error: 'Execution error' };
    }
  };

  return (
    <RoomContext.Provider
      value={{
        currentRoom,
        rooms,
        messages,
        code,
        language,
        createRoom,
        joinRoom,
        leaveRoom,
        sendMessage,
        updateCode,
        setLanguage,
        executeCode,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
}
