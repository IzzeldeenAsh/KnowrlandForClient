'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getMessages } from '@/utils/get-messages';

// Define interface for the messages object
interface Messages {
  industryKnowledge?: string;
  subIndustryKnowledge?: string;
  topicKnowledge?: string;
  [key: string]: any;
}

export function useMessages() {
  const [messages, setMessages] = useState<Messages>({});
  const params = useParams();
  const locale = params.locale as string || 'en';

  useEffect(() => {
    async function fetchMessages() {
      const msgs = await getMessages(locale);
      setMessages(msgs as Messages);
    }
    
    fetchMessages();
  }, [locale]);

  return { messages };
} 