"use client";

import { useEffect, useRef, useState } from 'react';
import { IconInfoCircle, IconLanguage } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface LanguageMismatchNotifierProps {
  knowledgeLanguage: string;
  currentLocale: string;
}

export default function LanguageMismatchNotifier({ 
  knowledgeLanguage, 
  currentLocale 
}: LanguageMismatchNotifierProps) {
  const isRTL = currentLocale === 'ar';
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const hasShownWarning = useRef(false);
  const [showWarning, setShowWarning] = useState(false);
  const [animationState, setAnimationState] = useState('hidden'); // 'hidden', 'entering', 'visible', 'exiting'
  const [targetLanguage, setTargetLanguage] = useState('');

  // Helper to clear duplicate cookies similar to header.tsx
  const clearDuplicateCookies = (cookieName: string) => {
    const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('insightabusiness.com');
    const clearVariations = [
      `${cookieName}=; Path=/; Max-Age=-1`,
      `${cookieName}=; Domain=.foresighta.co; Path=/; Max-Age=-1; Secure; SameSite=None`,
      `${cookieName}=; Path=/; Max-Age=-1; ${isProduction ? 'Secure; SameSite=None' : 'SameSite=Lax'}`
    ];
    clearVariations.forEach(variation => {
      document.cookie = variation;
    });
  };

  const switchLocale = (locale: 'en' | 'ar') => {
    // Clear any existing duplicate cookies first
    clearDuplicateCookies('preferred_language');

    setTimeout(() => {
      const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('insightabusiness.com');
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      const cookieParts = [
        `preferred_language=${locale}`,
        `Path=/`,
        `Expires=${expirationDate.toUTCString()}`,
        `Max-Age=${60 * 60 * 24 * 365}`,
        `SameSite=Lax`
      ];

      if (isProduction) {
        cookieParts.push(`Domain=.foresighta.co`);
        cookieParts.push(`Secure`);
      }

      document.cookie = cookieParts.join('; ');

      // Compute current path without locale prefix
      const segments = (pathname || '/').split('/').filter(Boolean);
      const currentPath = segments.slice(1).join('/'); // drop existing locale segment
      const newPath = currentPath ? `/${currentPath}` : '/';
      const currentSearch = typeof window !== 'undefined' ? window.location.search : '';

      // Navigate to same route with new locale
      const fullUrl = `/${locale}${newPath}${currentSearch}`;
      window.location.href = fullUrl;
    }, 100);
  };

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
  
  // Animation and positioning styles - sliding from bottom
  const getAnimationStyles = () => {
    switch (animationState) {
      case 'hidden':
        return { opacity: 0, transform: 'translateY(100px)' };
      case 'entering':
        return { opacity: 1, transform: 'translateY(0px)' };
      case 'visible':
        return { opacity: 1, transform: 'translateY(0px)' };
      case 'exiting':
        return { opacity: 0, transform: 'translateY(100px)' };
      default:
        return { opacity: 0, transform: 'translateY(100px)' };
    }
  };

  return (
    <div 
      className={`fixed z-50 px-2 w-full max-w-sm ${isRTL ? 'left-4' : 'right-4'}`}
      style={{
        // When logged out, keep it above the auth banner (uses a CSS var set by the banner)
        bottom: isLoggedIn ? '1rem' : 'calc(var(--auth-banner-offset, 0px) + 1rem)',
        transform: `${getAnimationStyles().transform || ''} scale(0.9)`,
        opacity: getAnimationStyles().opacity,
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' // Slower, smoother animation
      }}
    >
      <div 
        className="relative overflow-hidden backdrop-blur-sm w-full"
        style={{ 
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 50%, rgba(29, 78, 216, 0.95) 100%)',
          boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        {/* Decorative background elements - smaller on mobile */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-14 h-14 sm:w-24 sm:h-24 bg-white rounded-full -translate-y-8 translate-x-8 sm:-translate-y-12 sm:translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-20 sm:h-20 bg-white rounded-full translate-y-6 -translate-x-6 sm:translate-y-10 sm:-translate-x-10"></div>
        </div>
        
        <div className="relative py-2 px-3 sm:py-3 sm:px-4">
          {/* Top row with icon and close button */}
          <div className="flex items-center justify-between mb-2 sm:mb-3" style={{direction:'ltr'}}>
            <div className="flex items-center">
              <div 
                className="rounded-full p-1.5 mr-2 sm:p-2 sm:mr-3 backdrop-blur-sm"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                <IconLanguage size={16} stroke={2} className="text-white sm:w-5 sm:h-5" />
              </div>
              <div className="text-white font-semibold text-sm sm:text-base">
                Language Suggestion
              </div>
            </div>
            
            <button 
              type="button" 
              className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-1 sm:p-1.5 transition-all duration-200"
              onClick={handleClose} 
              aria-label="Close"
            >
              <span className="text-lg sm:text-xl font-normal">&times;</span>
            </button>
          </div>
          
          {/* Content area with both messages */}
          <div className="text-left space-y-2 sm:space-y-3">
            {/* English message */}
            <div className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed">
              For better experience, it's recommended to switch to{' '}
              <button
                type="button"
                className="underline underline-offset-2 decoration-white/80 hover:decoration-white font-semibold"
                onClick={() => switchLocale(targetLanguage === 'Arabic' ? 'ar' : 'en')}
              >
                {targetLanguage}
              </button>
            </div>
            
            {/* Arabic message (force RTL direction so placement is correct on LTR pages) */}
            <div className="text-white/90 text-xs sm:text-sm font-medium text-right leading-relaxed" dir="rtl">
              للحصول على تجربة أفضل، يُفضل التبديل إلى اللغة{' '}
              <button
                type="button"
                className="underline underline-offset-2 decoration-white/80 hover:decoration-white font-semibold"
                onClick={() => switchLocale(targetLanguage === 'Arabic' ? 'ar' : 'en')}
              >
                {targetLanguage === 'Arabic' ? 'العربية' : 'الإنجليزية'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}