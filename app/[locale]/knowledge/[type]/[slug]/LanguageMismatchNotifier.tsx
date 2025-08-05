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
        hasShownWarning.current = true;
        setShowWarning(true);
        
        // Start with hidden state, then trigger entering animation
        setTimeout(() => setAnimationState('entering'), 50);
        
        // After entering animation completes (slower)
        setTimeout(() => setAnimationState('visible'), 850);

        // Auto-hide after 8 seconds
        setTimeout(() => {
          setAnimationState('exiting');
          setTimeout(() => setShowWarning(false), 800);
        }, 8000);
      }
    }
  }, [knowledgeLanguage, currentLocale]);

  const handleClose = () => {
    setAnimationState('exiting');
    setTimeout(() => setShowWarning(false), 800);
  };

  if (!showWarning) return null;
  
  // Animation and positioning styles - sliding from top
  const getAnimationStyles = () => {
    switch (animationState) {
      case 'hidden':
        return { opacity: 0, transform: 'translateY(-100px)' };
      case 'entering':
        return { opacity: 1, transform: 'translateY(0px)' };
      case 'visible':
        return { opacity: 1, transform: 'translateY(0px)' };
      case 'exiting':
        return { opacity: 0, transform: 'translateY(-100px)' };
      default:
        return { opacity: 0, transform: 'translateY(-100px)' };
    }
  };

  return (
    <div 
      className="fixed top-20 left-1/2 z-50"
      style={{
        transform: `translateX(-50%) ${getAnimationStyles().transform || ''}`,
        opacity: getAnimationStyles().opacity,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Slower, smoother animation
      }}
    >
      <div 
        className="relative overflow-hidden backdrop-blur-sm"
        style={{ 
          maxWidth: '500px', 
          width: '500px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(29, 78, 216, 0.95) 100%)',
          boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>
        
        <div className="relative py-4 px-6">
          {/* Top row with icon and close button */}
          <div className="flex items-center justify-between mb-4" style={{direction:'ltr'}}>
            <div className="flex items-center">
              <div 
                className="rounded-full p-3 mr-4 backdrop-blur-sm"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <IconLanguage size={24} stroke={2} className="text-white" />
              </div>
              <div className="text-white font-semibold text-lg">
                Language Suggestion
              </div>
            </div>
            
            <button 
              type="button" 
              className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
              onClick={handleClose} 
              aria-label="Close"
            >
              <span className="text-xl font-normal">&times;</span>
            </button>
          </div>
          
          {/* Content area with both messages */}
          <div className="text-left space-y-3">
            {/* English message */}
            <div className="text-white/90 text-base font-medium leading-relaxed">
              For better readability, it's recommended to switch to {targetLanguage}
            </div>
            
            {/* Arabic message (with explicit left alignment) */}
            <div className="text-white/90 text-base font-medium text-left leading-relaxed">
              للحصول على قراءة أفضل، يُفضل التبديل إلى اللغة {targetLanguage === 'Arabic' ? 'العربية' : 'الإنجليزية'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}