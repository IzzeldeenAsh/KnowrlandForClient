"use client";

import { useEffect, useRef } from 'react';
import { useToast } from '@/components/toast/ToastContext';

interface LanguageMismatchNotifierProps {
  knowledgeLanguage: string;
  currentLocale: string;
}

export default function LanguageMismatchNotifier({ 
  knowledgeLanguage, 
  currentLocale 
}: LanguageMismatchNotifierProps) {
  const toast = useToast();
  const isRTL = currentLocale === 'ar';
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (knowledgeLanguage && !hasShownToast.current) {
      const normalizedKnowledgeLanguage = knowledgeLanguage.toLowerCase();
      const normalizedCurrentLocale = currentLocale.toLowerCase();
      
      // Map knowledge language to locale format
      const languageMap: { [key: string]: string } = {
        'arabic': 'ar',
        'english': 'en',
        'ar': 'ar',
        'en': 'en'
      };
      
      const mappedKnowledgeLanguage = languageMap[normalizedKnowledgeLanguage] || normalizedKnowledgeLanguage;
      
      if (mappedKnowledgeLanguage !== normalizedCurrentLocale) {
        const targetLanguage = mappedKnowledgeLanguage === 'ar' ? 'Arabic' : 'English';
        const message = isRTL 
          ? `للحصول على قراءة أفضل، يُفضل التبديل إلى اللغة ${mappedKnowledgeLanguage === 'ar' ? 'العربية' : 'الإنجليزية'}`
          : `For better readability, it's recommended to switch to ${targetLanguage}`;
        
        toast.info(message, '', 5000);
        hasShownToast.current = true;
      }
    }
  }, [knowledgeLanguage, currentLocale, isRTL, toast]);

  return null; // This component doesn't render anything
}