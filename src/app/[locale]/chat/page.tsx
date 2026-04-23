'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import axios from 'axios';
import Cookies from 'js-cookie';
import ChatWindow from '@/components/chat/ChatWindow';
import { useSearchParams } from 'next/navigation';

export default function ChatPage() {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const recipientIdFromQuery = searchParams.get('sellerId');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const token = Cookies.get('token');
    if (token) {
      axios.get(`${apiBase}/api/chat/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setConversations(res.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [apiBase]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Conversation List */}
        <div className="md:col-span-1 border rounded-xl bg-white overflow-hidden h-[600px] overflow-y-auto">
          {loading ? (
             <div className="p-4 text-center">Loading...</div>
          ) : conversations.length === 0 && !recipientIdFromQuery ? (
            <div className="p-4 text-center text-gray-500">{t('noConversations')}</div>
          ) : (
            <div className="divide-y">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition ${selectedConvId === conv.id ? 'bg-green-50' : ''}`}
                >
                  <p className="font-bold truncate">Conversation</p>
                  <p className="text-xs text-gray-500 truncate">
                    {conv.messages[0]?.content || 'No messages yet'}
                  </p>
                </button>
              ))}
              {recipientIdFromQuery && !selectedConvId && (
                 <div className="p-4 bg-green-50 text-green-700 text-sm">
                    New message to seller...
                 </div>
              )}
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div className="md:col-span-3">
          {selectedConvId || recipientIdFromQuery ? (
            <ChatWindow 
              conversationId={selectedConvId || undefined} 
              recipientId={recipientIdFromQuery || undefined}
              currentUser={user} 
            />
          ) : (
            <div className="h-[600px] flex items-center justify-center bg-gray-50 border border-dashed rounded-xl text-gray-400">
              {t('selectConversation')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
