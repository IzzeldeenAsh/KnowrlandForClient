'use client';

import { useIndustryStatistic } from '@/hooks/industries/useIndustryStatistic';
import { useSubIndustryStatistic } from '@/hooks/industries/useSubIndustryStatistic';
import { useTopicStatistic } from '@/hooks/industries/useTopicStatistic';
import styles from '@/app/[locale]/industry/[id]/[slug]/industry.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface StatisticsCardsProps {
  type: 'industry' | 'subIndustry' | 'topic';
  id: number;
}

export default function StatisticsCards({ type, id }: StatisticsCardsProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  const useStatisticHook = {
    industry: useIndustryStatistic,
    subIndustry: useSubIndustryStatistic,
    topic: useTopicStatistic
  }[type];

  const { statistics, isLoading, error } = useStatisticHook(id);

  if (error) {
    return (
      <div className={`${styles.statsContainer} flex-row md:flex-col`}>
        <div className={styles.statsCard}>
          <div className="text-red-500">Error loading statistics</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${styles.statsContainer}`}>
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
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${styles.statsContainer}`}>
      {statistics.map((stat) => (
        <Link 
          key={stat.type} 
          href={`/${locale}/knowledges?taxonomy=${type =='subIndustry' ? 'sub_industry' : type}&id=${id}&type=${stat.type}`}
        >
          <div key={stat.type} className={styles.statsCard}>
            <div className={styles.statsNumber}>{stat.count}</div>
            <div className={styles.statsLabel}>{stat.type}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
