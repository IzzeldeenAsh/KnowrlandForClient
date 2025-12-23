'use client';

import { useIndustriesByType, IndustryType, Industry } from '@/hooks/industries';
import { Container, Text, Skeleton } from '@mantine/core';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { use, useEffect, useRef } from 'react';
import styles from './industries.module.css';
import IndustryIcon from "@/components/icons/industry-icon";
import { safeAOSInit } from '@/components/aos-provider';
import Stripes from "@/public/images/stripes-dark.svg";
import EmptyStateIllustration from './47718912_9169251.svg';

interface Topic {
  id: number;
  name: string;
  slug: string;
}


const validTypes: IndustryType[] = ['report', 'insight', 'data', 'manual', 'course', 'statistic'];

interface Props {
  params: Promise<{
    type: string;
  }>;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function IndustriesByTypePage({ params }: Props) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as IndustryType;
  const routeParams = useParams();
  const locale = routeParams.locale as string || 'en';
  const isRTL = locale === 'ar';
  const messages = require(`@/messages/${locale}.json`);

  const translationKeys: { [key in IndustryType]: string } = {
    report: 'reports',
    insight: 'insights',
    data: 'data',
    manual: 'manuals',
    course: 'courses',
    statistic: 'statistics',
  };

  const arabicFallbackLabels: { [key in IndustryType]: string } = {
    report: 'تقارير',
    insight: 'رؤى',
    data: 'بيانات',
    manual: 'أدلة',
    course: 'دورات',
    statistic: 'إحصائيات',
  };

  useEffect(() => {
    safeAOSInit({
      duration: 800,
      once: true,
    });
  }, []);

  // Validate type parameter
  if (!validTypes.includes(type)) {
    notFound();
  }
  const formatTypeLabel = (label?: string) => {
    if (!label) return '';
    if (locale !== 'ar') return label;
    return label.replace(/^ال/, '');
  };

  const rawTranslation = messages[translationKeys[type]];
  const typeLabel =
    locale === 'ar'
      ? formatTypeLabel(rawTranslation) || arabicFallbackLabels[type]
      : rawTranslation;
  const englishTypeLabel = capitalizeFirstLetter(type);

  const displayLabel = locale === 'ar' ? typeLabel : typeLabel || englishTypeLabel;


  const { industries, isLoading, error } = useIndustriesByType({
    type,
    topSubIndustry: 2,
  });
  const hasIndustries = Array.isArray(industries) && industries.length > 0;
  // Avoid flicker: show skeletons only on initial load, keep current UI (including empty state) on re-fetches
  const initialLoadRef = useRef(true);
  useEffect(() => {
    if (!isLoading) {
      initialLoadRef.current = false;
    }
  }, [isLoading]);
  const isInitialLoading = initialLoadRef.current && isLoading;

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
        <Container className={styles.container}>
          <Text color="red">{error}</Text>
        </Container>
        <Footer />
      </div>
    );
  }
  const getIndustryIcon = (industry: Industry) => {
    if (!industry.icon) return <IndustryIcon width={20} height={20} />;
    return <Image src={industry.icon} alt={industry.name} width={35} height={35} />;
  }
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <div className="relative z-10 max-w-6xl relative mx-auto  w-full ">
      <div
        className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
        style={{ left: '28%' }}
        aria-hidden="true"
      >
        <Image
          className="max-w-none opacity-50"
          src={Stripes}
          width={768}
          height={768}
          style={{ width: 'auto', height: 'auto' }}
          alt="Stripes"
          priority
        />
      </div>
      </div>
    
      <div className="min-h-screen bg-gray-50">

        <div className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
          <Image
            alt="Section background"
            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="relative z-10 max-w-6xl relative mx-auto mt-5 w-full">
            <div className="text-start" data-aos="fade-down">
              {/* <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
              {messages[translationKeys[type]]}
              </span> */}
              <h3 className={`text-md ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} md:text-3xl font-extrabold text-transparent bg-clip-text mb-4`}>
                {displayLabel} {messages.byIndustry}
              </h3>
           
            </div>
          </div>
        </div>

        <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {isInitialLoading ? (
              // Loading skeletons
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
                {Array(6).fill(0).map((_, index) => (
                  <Skeleton key={index} height={200} radius="md" />
                ))}
              </div>
            ) : (
           hasIndustries ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
                  {industries.map((industry: Industry) => (
                    <div
                      key={industry.id}
                      className="relative bg-white border border-gray-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300"
                      data-aos="fade-up"
                    >
                      <div className="space-y-2">
                        <Link href={`/${locale}/industry-by-type/${type}/${industry.id}/${industry.slug}`} className="block">
                          <div className="flex items-center gap-2">
                            {getIndustryIcon(industry)}
                            <h3 className="text-sm truncate max-w-[140px] sm:max-w-[220px] md:max-w-[280px] font-semibold text-gray-900 hover:text-blue-600">
                              {industry.name}
                            </h3>
                          </div>
                        </Link>
                        <Text size="xs" color="gray" fw={500}>
                          {locale === 'ar' ? ":الصناعات الفرعية" : "Sub-industries:"}
                          </Text>
                        {industry.children && industry.children.length > 0 ? (
                          <ul className="space-y-1">
                            {industry.children.map((child: Industry) => (
                              <Link href={`/${locale}/sub-industry-by-type/${type}/${child.id}/${child.slug}`} key={child.id} className="block">
                                <li
                                  className="text-xs truncate max-w-[140px] sm:max-w-[220px] md:max-w-[280px] text-blue-800 hover:text-blue-600 transition-colors flex items-center"
                                >
                                  <span className="mr-2">•</span>
                                  {child.name}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-xs text-gray-500 italic flex items-center">
                            <span className="mr-2">•</span>
                            <p>No sub-industries available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Image
                  src={EmptyStateIllustration}
                  alt={locale === 'ar' ? 'لا توجد صناعات' : 'No industries illustration'}
                  width={220}
                  height={220}
                  className="opacity-90"
                  priority={false}
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {locale === 'ar' ? 'لا توجد رؤى لهذا النوع' : 'No insights found for this type'}
                </h3>
                <p className="mt-2 text-sm text-gray-600 max-w-md">
                  {locale === 'ar'
                    ? 'حاول اختيار نوع مختلف أو العودة لاحقًا.'
                    : 'Try selecting a different type or check back later.'}
                </p>
                <Link
                  href={`/${locale}`}
                  className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  {locale === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
                </Link>
              </div>
            )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
