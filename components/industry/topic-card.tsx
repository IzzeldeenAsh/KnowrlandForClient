'use client';

import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import FolderIcon from '@/components/icons/folder-icon';
import { TopicWithKnowledge } from '@/hooks/industries/types';

interface TopicCardProps {
  topic: TopicWithKnowledge;
  locale: string;
  isRTL: boolean;
}

export default function TopicCard({ topic, locale, isRTL }: TopicCardProps) {
  const t = useTranslations();
  const isDisabled = topic.weight === 0;
  const isArabicFirstWord = (text: string): boolean => {
    if (!text) return false;
    const firstWord = text.trim().split(/\s+/)[0] || '';
    for (let i = 0; i < firstWord.length; i++) {
      const ch = firstWord[i];
      if (/[\u0600-\u06FF]/.test(ch)) return true;
      if (/[A-Za-z0-9]/.test(ch)) return false;
    }
    return false;
  };

  return (
    <div className={`
    relative 
    group 
    bg-gradient-to-br 
    from-white 
    to-slate-50 
    rounded-sm 
    p-6 
    shadow-md 
    border 
    border-slate-100 
    h-full 
    flex 
    flex-col ${!isDisabled ? 'hover:shadow-lg hover:border-blue-100 hover:from-white hover:to-blue-50 transition-all duration-300 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
      <div className="space-y-2 flex-grow">
        <div className={`flex items-center gap-2 ${isRTL ? 'text-right' : 'text-left'} justify-start`} dir={isRTL ? 'rtl' : 'ltr'}>
          <FolderIcon 
            width={20} 
            height={20} 
            className={`${!isDisabled ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <h3 title={topic.name} className={`flex-1 min-w-0 truncate text-base font-bold ${!isDisabled ? `text-transparent ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text` : 'text-gray-900'}`}>
            {topic.name}
            {isDisabled && <span className="ml-2 text-xs text-gray-500"></span>}
          </h3>
        </div>
        
        {topic.knowledge && topic.knowledge.length > 0 ? (
          <>
            <Text size="xs" color="gray" fw={500} pb={5} className={isRTL ? 'text-right' : 'text-left'}>
              { (locale === 'ar' ? 'المعرفة:' : 'Insights:')}
            </Text>
            <ul className="space-y-1">
              {topic.knowledge.map((item, index) => {
                const itemRTL = isArabicFirstWord(item.title);
                return (
                  <li
                    key={`${item.id}-${index}`}
                    dir={itemRTL ? 'rtl' : 'ltr'}
                    className={`text-sm text-gray-700 flex items-center ${itemRTL ? 'text-right' : 'text-left'}`}
                  >
                    <span className={itemRTL ? 'ml-2' : 'mr-2'}>•</span>
                    <span title={item.title} dir="auto" className="flex-1 min-w-0 truncate">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="text-xs text-gray-500 italic flex items-center">
            <span className={isRTL ? "ml-2" : "mr-2"}>•</span>
            <p>{ (locale === 'ar' ? 'لا يوجد منشورات حالياً' : 'No knowledge items available')}</p>
          </div>
        )}
      </div>
      
      <div className={`absolute top-6 ${isRTL ? 'left-2' : 'right-2'}`}>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d={isRTL ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} 
          />
        </svg>
      </div>
      
      {isDisabled && (
        <div className="min-w-[250px] absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded shadow-md bottom-1/2 mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
          { (locale === 'ar' ? 'البيانات غير متوفرة' : 'No Knowledge Available Yet')}
        </div>
      )}
    </div>
  );
}