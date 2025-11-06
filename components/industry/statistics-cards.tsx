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
import IntlMessageFormat from 'intl-messageformat';
import { useMessages } from '@/hooks/useMessages';
import { useTranslations } from 'next-intl';

interface StatisticsCardsProps {
  type: 'industry' | 'subIndustry' | 'topic';
  id: number;
  entityName?: string;
}

export default function StatisticsCards({ type, id, entityName }: StatisticsCardsProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const isRTL = locale === 'ar';
  const { messages } = useMessages();
  const t = useTranslations();
  
  const useStatisticHook = {
    industry: useIndustryStatistic,
    subIndustry: useSubIndustryStatistic,
    topic: useTopicStatistic
  }[type];

  const { statistics, isLoading, error } = useStatisticHook(id);

  // Return null if there are no statistics to display
  if (!isLoading && (!statistics || statistics.length === 0)) {
    return null;
  }

  // Get the appropriate message key based on the type
   const getMessageKey = () => {
      switch (type) {
        case 'industry': return 'industryInsights';
        case 'subIndustry': return 'subIndustryInsights';
        case 'topic': return 'topic Insights';
        default: return '';
      }
    };
  const key = getMessageKey();

  // Get the format parameter name based on the type
  // const getFormatParam = () => {
  //   const paramMap = {
  //     'industry': 'industry',
  //     'subIndustry': 'subIndustry',
  //     'topic': 'topic'
  //   };
    
  //   return { [paramMap[type]]: entityName };
  // };

  // Translations for stat types - handle both singular and plural forms
  const getStatLabel = (statType: string) => {
    if (locale !== 'ar') return statType;
    
    const typeLower = statType.toLowerCase();
    
    const translations: Record<string, string> = {
      'report': 'التقارير',
      'reports': 'التقارير',
      'statistic': 'الإحصائيات',
      'data': 'البيانات',
      'manual': 'الأدلة',
      'manuals': 'الأدلة',
      'course': 'الدورات',
      'courses': 'الدورات'
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
      case 'statistic':
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
    <div className="flex flex-col w-full">
      {entityName && (
        <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase w-fit">
          {
          t.rich(getMessageKey(), {
              industry: () => <span className="font-extrabold underline">{entityName}</span>,
              subIndustry: () => <span className="font-extrabold underline">{entityName}</span>,
              topic: () => <span className="font-extrabold underline">{entityName}</span>,
            })
        }
    </span>
      )}
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${styles.statsContainer}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {statistics.map((stat) => (
          <Link 
            key={stat.type} 
            href={`/${locale}/knowledges?taxonomy=${type =='subIndustry' ? 'sub_industry' : type}&id=${id}&type=${stat.type}&entityName=${entityName}`}
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
    </div>
  );
}
