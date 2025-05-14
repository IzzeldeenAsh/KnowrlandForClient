'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getMessages } from '@/utils/get-messages';

export function useMessages() {
  const [messages, setMessages] = useState({});
  const params = useParams();
  const locale = params.locale as string || 'en';

  useEffect(() => {
    async function fetchMessages() {
      const msgs = await getMessages(locale);
      setMessages(msgs);
    }
    
    fetchMessages();
  }, [locale]);

  return { messages };
} 