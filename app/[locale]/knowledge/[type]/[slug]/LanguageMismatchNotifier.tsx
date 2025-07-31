"use client";

import { useEffect, useRef, useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

interface LanguageMismatchNotifierProps {
  knowledgeLanguage: string;
  currentLocale: string;
}

export default function LanguageMismatchNotifier({ 
  knowledgeLanguage, 
  currentLocale 
}: LanguageMismatchNotifierProps) {
  const isRTL = currentLocale === 'ar';
  const hasShownWarning = useRef(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    if (knowledgeLanguage && !hasShownWarning.current) {
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
        
        setWarningMessage(message);
        setShowWarning(true);
        hasShownWarning.current = true;

        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowWarning(false);
        }, 5000);
      }
    }
  }, [knowledgeLanguage, currentLocale, isRTL]);

  const handleClose = () => {
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div 
      className={`fixed bottom-4 ${isRTL ? 'right-4' : 'left-4'} z-50 max-w-sm w-full`}
      style={{
        opacity: showWarning ? 1 : 0,
        transition: 'opacity 0.15s ease-in-out'
      }}
    >
      <div 
        className="toast fade show"
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="toast-header">
          <div 
            className="me-2 rounded-full p-1"
            style={{ 
              color: '#009EF7',
              backgroundColor: '#F1FAFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '22px',
              height: '22px'
            }}
          >
            <IconInfoCircle size={10} style={{ fontWeight: 'bold' }} />
          </div>
          <strong className="me-auto text-xs">Information</strong>
          <small className="toast-time">Just now</small>
          <button 
            type="button" 
            className="btn-close" 
            onClick={handleClose} 
            aria-label="Close"
            style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.5 }}
          >
            ×
          </button>
        </div>
        <div className="toast-body">{warningMessage}</div>
      </div>
    </div>
  );
}