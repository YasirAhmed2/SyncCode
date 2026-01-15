import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../context/auth.context';
import { useRoom } from '../context/room.context';
import { motion } from 'framer-motion';
import {
  Play,
  Copy,
  Check,
  Users,
  MessageCircle,
  Code2,
  ChevronLeft,
  Send,
  Terminal,
  X,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import axios from 'axios';

export default function Room() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    currentRoom, 
    code, 
    language, 
    messages, 
    updateCode, 
    setLanguage, 
    sendMessage, 
    executeCode,
    joinRoom,
    leaveRoom 
  } = useRoom();
  const { toast } = useToast();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (roomId && !currentRoom) {
      joinRoom(roomId);
    }
  }, [roomId, currentRoom, joinRoom]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId || '');
    setCopied(true);
    toast({ title: 'Room ID copied!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = async () => {
  if (!code.trim()) {
    toast({ title: 'No code to execute', variant: 'destructive' });
    return;
  }

  setIsExecuting(true);
  setIsOutputOpen(true);
  setOutput('Running...\n');

  try {
    const res = await axios.post(
      'http://localhost:5000/execute',
      {
        code,
        language
      },
      {
        withCredentials: true, // VERY IMPORTANT (JWT cookie)
      }
    );

    setOutput(res.data.stdout || 'No output');
  } catch (error: any) {
    setOutput(
      error?.response?.data?.error || 'Execution failed'
    );
  } finally {
    setIsExecuting(false);
  }
};


const handleSaveCode = async () => {
  try {
    console.log('Saving code...', { code, language });
    console.log('Room ID:', roomId);
    await axios.put(
      `http://localhost:5000/rooms/${roomId}/code`,
      {
        code,
        language,
      },
      { withCredentials: true }
    );

    toast({ title: 'Code saved successfully' });
  } catch (error) {
    toast({
      title: 'Failed to save code',
      variant: 'destructive',
    });
  }
};


  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const handleLeave = () => {
    leaveRoom();
    navigate('/dashboard');
  };

  const participants = currentRoom?.participants || [
    { id: '1', name: user?.name || 'You', avatarColor: user?.avatarColor || '#00D9FF', isOnline: true },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleLeave}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm">
                {currentRoom?.name || 'Coding Room'}
              </h1>
              <button
                onClick={handleCopyRoomId}
                className="text-xs text-muted-foreground hover:text-foreground font-mono flex items-center gap-1"
              >
                {roomId?.slice(0, 15)}...
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Participants */}
          <div className="hidden sm:flex items-center gap-1">
            {participants.slice(0, 4).map((p, i) => (
              <div
                key={p.id}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-background"
                style={{ 
                  backgroundColor: p.avatarColor,
                  marginLeft: i > 0 ? '-8px' : '0',
                  zIndex: 4 - i,
                }}
                title={p.name}
              >
                {p.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {participants.length > 4 && (
              <span className="text-xs text-muted-foreground ml-2">
                +{participants.length - 4}
              </span>
            )}
          </div>

          {/* Language Selector */}
          <Select value={language} onValueChange={(v) => setLanguage(v as 'javascript' | 'python')}>
            <SelectTrigger className="w-32 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectContent>
          </Select>

          {/* Run Button */}
          <Button onClick={handleExecute} disabled={isExecuting} className="gap-2">
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Run</span>
          </Button>

<Button
  variant="outline"
  onClick={handleSaveCode}
  className="gap-2"
>
  <Check className="w-4 h-4" />
  <span className="hidden sm:inline">Save</span>
</Button>


          {/* Chat Toggle */}
          <Button
            variant={isChatOpen ? 'default' : 'outline'}
            size="icon"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="relative"
          >
            <MessageCircle className="w-4 h-4" />
            {messages.length > 0 && !isChatOpen && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[10px] flex items-center justify-center">
                {messages.length}
              </span>
            )}
          </Button>

          {/* Participants Toggle (Mobile) */}
          <Button variant="outline" size="icon" className="sm:hidden">
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => updateCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              minimap: { enabled: false },
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />

          {/* Output Panel */}
          {isOutputOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 200 }}
              exit={{ height: 0 }}
              className="border-t border-border bg-card"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Terminal className="w-4 h-4" />
                  Output
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOutputOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <pre className="p-4 text-sm font-mono text-foreground overflow-auto h-[150px]">
                {output || 'No output yet. Run your code to see results.'}
              </pre>
            </motion.div>
          )}
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-border bg-card flex flex-col shrink-0"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Chat</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm py-8">
                  No messages yet. Start the conversation!
                </p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary">{msg.userName}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground bg-secondary rounded-lg px-3 py-2">
                      {msg.content}
                    </p>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.aside>
        )}
      </div>
    </div>
  );
}