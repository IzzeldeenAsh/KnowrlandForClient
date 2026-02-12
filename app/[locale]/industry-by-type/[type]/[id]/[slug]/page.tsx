'use client';

import {  IndustryType } from '@/hooks/industries';
import { Container, Text, Skeleton } from '@mantine/core';
;
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import styles from './industry-by-type.module.css';
import IndustryIcon from "@/components/icons/industry-icon";
import { safeAOSInit } from '@/components/aos-provider';
import { useIndustryByType } from '@/hooks/industries/useIndustryByType';
import Stripes from "@/public/images/stripes-dark.svg";
import { useTranslations } from 'next-intl';

interface Topic {
  id: number;
  name: string;
  slug: string;
}

interface SubIndustry {
  id: number;
  name: string;
  slug: string;
  topic: Topic[];
}

const validTypes: IndustryType[] = ['report', 'insight', 'data', 'manual', 'course', 'statistic'];

interface Props {
  params: Promise<{
    type: string;
    id: string;
    slug: string;
    locale?: string;
  }>;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function IndustryByTypePage({ params }: Props) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as IndustryType;
  const id = parseInt(resolvedParams.id, 10);
  const slug = resolvedParams.slug;
  const locale = resolvedParams.locale || 'en';
  const t = useTranslations();
  const isRtl = locale === 'ar';

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

  const { industry, isLoading, error } = useIndustryByType({
    type,
    id,
    slug,
    topTopic: 5,
  });

  if (error) {
    return (
      <>
      
        <Container className={styles.container}>
          <Text color="red">{error}</Text>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
    
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
    
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <Image
            alt="Section background"
            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
            fill
            className="object-cover z-0"
            priority
          />
          <div className={styles.headerContent}>
            <div data-aos="fade-down">
             <span className={styles.typeLabel}>
                {t(`typeLabel.${type}`)}
              </span>
              <h3 className={` text-transparent font-extrabold text-3xl ${isRtl ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text`}>
                {industry?.name || 'Loading...'}
              </h3>
             
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} height={200} radius="md" />
              ))}
            </div>
          ) : (
            <div>
            <h2 className={`text-xl font-bold text-transparent ${isRtl ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} bg-clip-text mb-8`}>
              {locale === 'ar' ? 'المجالات الفرعية' : 'Sub-industries:'}
            </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {industry?.children?.map((subIndustry: SubIndustry) => (
                  <div
                    key={subIndustry.id}
                 className="relative bg-white border border-gray-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    data-aos="fade-up"
                  >
                    <div className="space-y-3">
                      <Link href={`/${locale}/sub-industry-by-type/${type}/${subIndustry.id}/${subIndustry.slug}`} className="block">
                        <div className="flex items-center gap-2">
                          <IndustryIcon />
                          <h3 className="text-sm truncate max-w-[140px] sm:max-w-[220px] md:max-w-[280px] font-semibold text-gray-900 hover:text-blue-600">
                            {subIndustry.name}
                          </h3>
                        </div>
                      </Link>
                      {subIndustry.topic && subIndustry.topic.length > 0 ? (
                        <div>
                          <Text size="xs" color="gray" fw={500} pb={5}>
                          {locale === 'ar' ? 'المواضيع:' : 'Topics:'}
                        </Text>
                          <ul className="space-y-2">
                            {subIndustry.topic.map((topic: Topic) => (
                              <Link href={`/${locale}/topic-by-type/${type}/${topic.id}/${topic.slug}`} key={topic.id} className="block">
                                <li className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                                  <span className="mr-2">•</span>
                                  <h3 className="text-xs truncate max-w-[140px] sm:max-w-[220px] md:max-w-[280px]  text-gray-900 hover:text-blue-600">
                                  {topic.name}</h3>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 italic flex items-center">
                          <span className="mr-2">•</span>
                          <p>No topics available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}