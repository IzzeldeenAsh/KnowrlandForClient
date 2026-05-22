'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface AuthBannerProps {
  onSignUp?: () => void;
  onLogin?: () => void;
}

export default function AuthBanner({ onSignUp, onLogin }: AuthBannerProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = bannerRef.current;
    if (!element) return;

    const updateOffset = () => {
      const height = element.offsetHeight || 0;
      document.body.style.setProperty('--auth-banner-offset', `${height}px`);
    };

    updateOffset();

    const resizeObserver = new ResizeObserver(() => updateOffset());
    resizeObserver.observe(element);
    window.addEventListener('resize', updateOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateOffset);
      document.body.style.removeProperty('--auth-banner-offset');
    };
  }, []);

  const handleSignUp = () => {
    if (onSignUp) {
      onSignUp();
    } else {
      // Default redirect to Angular app signup
      window.location.href = `https://app.insightabusiness.com/auth/sign-up`;
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      // Default redirect to Angular app login
      window.location.href = `https://app.insightabusiness.com/auth/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
    }
  };

  return (
    <div 
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`max-w-7xl
         mx-auto flex 
         sm:flex-row  items-center gap-1 sm:gap-4 justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="text-white max-w-[170px] sm:max-w-none">
          <div className=" text-sm sm:text-lg font-bold mb-1">
            {isRTL ? 
              'اكتشف المعرفة المهنية' :
              'Unlock business insights'
            }
          </div>
          <div className="text-xs sm:text-sm opacity-90">
            {isRTL ? 
              'انضم إلى Insighta واحصل على رؤى حصرية وتقارير متخصصة.' :
              'Join Insighta and access exclusive insights.'
            }
          </div>
        </div>
        
        <div className={`flex  gap-1 sm:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            onClick={handleLogin}
            className="px-6 py-2 text-xs sm:text-sm font-semibold text-white bg-transparent border border-white rounded-full hover:bg-white hover:text-blue-500 transition-colors"
          >
            {isRTL ? 'تسجيل الدخول' : 'Log in'}
          </button>
          
          <button
            onClick={handleSignUp}
            className="px-6 py-2 text-xs sm:text-sm font-semibold text-blue-500 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            {isRTL ? 'إنشاء حساب' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}