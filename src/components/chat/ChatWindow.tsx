'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Send } from 'lucide-react';

export default function ChatWindow({ conversationId, recipientId, currentUser }: { conversationId?: string, recipientId?: string, currentUser: any }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const s = io(apiBase);
    setSocket(s);

    if (conversationId) {
      // Fetch existing messages
      const token = Cookies.get('token');
      axios.get(`${apiBase}/api/chat/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setMessages(res.data));
      
      // Join room
      s.emit('join_room', conversationId);
    }

    s.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      s.disconnect();
    };
  }, [conversationId, apiBase]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const token = Cookies.get('token');
    try {
      const res = await axios.post(`${apiBase}/api/chat/send`, {
        conversationId,
        recipientId,
        content: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const message = res.data;
      // Socket emission would happen here in a full implementation
      // For now we manually update UI if socket server isn't broadcasting back to sender
      if (!conversationId) {
          // If it was a new conversation, we'd need to redirect or refresh
          window.location.reload();
      } else {
          setMessages([...messages, message]);
          setNewMessage('');
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border rounded-xl shadow-sm">
      {/* Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] p-3 rounded-lg ${
              msg.senderId === currentUser.id 
                ? 'bg-green-600 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-sm">{msg.content}</p>
              <span className="text-[10px] opacity-70 mt-1 block">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button 
          type="submit"
          className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
