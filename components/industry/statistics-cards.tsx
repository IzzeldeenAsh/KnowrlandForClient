'use client';

import { useIndustryStatistic } from '@/hooks/industries/useIndustryStatistic';
import { useSubIndustryStatistic } from '@/hooks/industries/useSubIndustryStatistic';
import { useTopicStatistic } from '@/hooks/industries/useTopicStatistic';
import styles from '@/app/[locale]/industry/[id]/[slug]/industry.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import CourseIcon from "@/components/icons/CourseIcon";
interface StatisticsCardsProps {
  type: 'industry' | 'subIndustry' | 'topic';
  id: number;
}

export default function StatisticsCards({ type, id }: StatisticsCardsProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const isRTL = locale === 'ar';
  
  const useStatisticHook = {
    industry: useIndustryStatistic,
    subIndustry: useSubIndustryStatistic,
    topic: useTopicStatistic
  }[type];

  const { statistics, isLoading, error } = useStatisticHook(id);

  // Translations for stat types - handle both singular and plural forms
  const getStatLabel = (statType: string) => {
    if (locale !== 'ar') return statType;
    
    const typeLower = statType.toLowerCase();
    
    const translations: Record<string, string> = {
      'report': 'تقرير',
      'reports': 'تقارير',
      'insight': 'رؤية',
      'insights': 'رؤى',
      'data': 'بيانات',
      'manual': 'دليل',
      'manuals': 'أدلة',
      'course': 'دورة',
      'courses': 'دورات'
    };
    
    return translations[typeLower] || statType;
  };

  // Function to get the appropriate icon based on type
  const getStatIcon = (statType: string) => {
    const typeLower = statType.toLowerCase();
    switch (typeLower) {
      case 'reports':
      case 'report':
        return <ReportIcon width={24} height={24} />;
      case 'insights':
      case 'insight':
        return <InsightIcon width={24} height={24} />;
      case 'data':
        return <DataIcon width={21} height={21} />;
      case 'manuals':
      case 'manual':
        return <ManualIcon width={24} height={24} />;
      case 'courses':
      case 'course':
        return <CourseIcon width={24} height={24} />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className={`${styles.statsContainer} flex-row md:flex-col`}>
        <div className={styles.statsCard}>
          <div className="text-red-500">
            {locale === 'ar' ? 'خطأ في تحميل الإحصائيات' : 'Error loading statistics'}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${styles.statsContainer}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={styles.statsCard}>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
        </div>
        <div className={styles.statsCard}>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
        </div>
        <div className={styles.statsCard}>
          <div className="animate-pulse bg-gray-200 h-8 w-16 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${styles.statsContainer}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {statistics.map((stat) => (
        <Link 
          key={stat.type} 
          href={`/${locale}/knowledges?taxonomy=${type =='subIndustry' ? 'sub_industry' : type}&id=${id}&type=${stat.type}`}
        >
          <div key={stat.type} className={styles.statsCard}>
            <div className="flex items-center gap-2 mb-1">
              {getStatIcon(stat.type)}
              <div className={styles.statsNumber}>{stat.count}</div>
            </div>
            <div className={styles.statsLabel}>{getStatLabel(stat.type)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
