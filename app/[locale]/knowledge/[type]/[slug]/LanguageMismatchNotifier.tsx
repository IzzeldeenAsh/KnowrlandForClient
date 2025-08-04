"use client";

import { useEffect, useRef, useState } from 'react';
import { IconInfoCircle, IconLanguage } from '@tabler/icons-react';

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
  const [animationState, setAnimationState] = useState('hidden'); // 'hidden', 'entering', 'visible', 'exiting'
  const [targetLanguage, setTargetLanguage] = useState('');

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
        const language = mappedKnowledgeLanguage === 'ar' ? 'Arabic' : 'English';
        setTargetLanguage(language);
        
        // Show with animation sequence
        setAnimationState('entering');
        hasShownWarning.current = true;
        setShowWarning(true);
        
        // After entering animation completes
        setTimeout(() => setAnimationState('visible'), 500);

        // Auto-hide after 8 seconds
        setTimeout(() => {
          setAnimationState('exiting');
          setTimeout(() => setShowWarning(false), 500);
        }, 8000);
      }
    }
  }, [knowledgeLanguage, currentLocale]);

  const handleClose = () => {
    setAnimationState('exiting');
    setTimeout(() => setShowWarning(false), 500);
  };

  if (!showWarning) return null;
  
  // Animation and positioning styles
  const getAnimationStyles = () => {
    switch (animationState) {
      case 'hidden':
        return { opacity: 0, transform: 'translateY(20px) scale(0.95)' };
      case 'entering':
        return { opacity: 1, transform: 'translateY(0) scale(1)' };
      case 'visible':
        return { opacity: 1, transform: 'translateY(0) scale(1)' };
      case 'exiting':
        return { opacity: 0, transform: 'translateY(20px) scale(0.95)' };
      default:
        return {};
    }
  };

  return (
    <div 
      className="fixed bottom-8 left-8 z-50 rounded-sm"
      style={{
        ...getAnimationStyles(),
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Bouncy animation
      }}
    >
      <div 
        className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
        style={{ 
          maxWidth: '500px', 
          width: '500px',
          borderRadius: '4px',
          border: '2px solid rgb(254, 185, 119)' // Bright orange border
        }}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="py-3 px-5">
          {/* Top row with icon and close button */}
          <div className="flex items-center justify-between mb-3">
          
            <button 
              type="button" 
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              onClick={handleClose} 
              aria-label="Close"
            >
              <span className="text-xl font-normal">&times;</span>
            </button>
            <div className="flex items-center">
              <div 
                className="rounded-full p-2 mr-3"
                style={{ 
                  color: '#009EF7',
                  backgroundColor: '#F1FAFF',
                }}
              >
                <IconLanguage size={24} stroke={2} />
              </div>
            </div>
          </div>
          
          {/* Content area with both messages */}
          <div className="text-left">
            {/* English message */}
            <div className="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
              For better readability, it's recommended to switch to {targetLanguage}
            </div>
            
            {/* Arabic message (with explicit left alignment) */}
            <div className="text-gray-700 dark:text-gray-300 text-lg font-medium text-left">
              للحصول على قراءة أفضل، يُفضل التبديل إلى اللغة {targetLanguage === 'Arabic' ? 'العربية' : 'الإنجليزية'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}