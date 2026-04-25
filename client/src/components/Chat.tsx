import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { Send, MessageSquare, Users, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const socketUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:5000');
const socket: Socket = io(socketUrl);

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && user) {
      const messageData = {
        sender: user.fullName,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('send_message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col pt-4">
      <Card className="flex-1 border-2 border-foreground bg-card rounded-none shadow-none flex flex-col gap-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-3 bg-foreground text-background">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider">Main Channel</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-mono uppercase bg-background/20 px-2 py-1">
              <Users className="h-3 w-3" />
              <span>24 Online</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-background hover:bg-background/20 rounded-none">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <div className="border border-border p-4 bg-card text-center">
                <p className="text-xs uppercase font-mono mb-2">Notice</p>
                <p className="text-sm">No transmissions detected in this channel.</p>
              </div>
            </div>
          )}
          
          {messages.map((msg, i) => {
            const isMe = msg.sender === user?.fullName;
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-col max-w-[80%]",
                  isMe ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  {!isMe && <span className="text-[10px] font-bold uppercase text-foreground">[{msg.sender}]</span>}
                  <span className="text-[10px] text-muted-foreground font-mono">{msg.timestamp}</span>
                  {isMe && <span className="text-[10px] font-bold uppercase text-foreground">[Self]</span>}
                </div>
                <div
                  className={cn(
                    "border px-3 py-2 text-sm",
                    isMe
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="border-t-2 border-foreground p-3 bg-card">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Transmit message..."
              className="flex-1 border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground rounded-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim()}
              className="h-12 w-12 border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground disabled:opacity-50 rounded-none"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Chat;
