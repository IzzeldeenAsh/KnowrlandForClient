'use client';

import { useIndustriesByType, IndustryType, Industry } from '@/hooks/industries';
import { Container, Text, Skeleton } from '@mantine/core';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { use, useEffect } from 'react';
import styles from './industries.module.css';
import IndustryIcon from "@/components/icons/industry-icon";
import { safeAOSInit } from '@/components/aos-provider';
import Stripes from "@/public/images/stripes-dark.svg";

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
  const messages = require(`@/messages/${locale}.json`);

  const translationKeys: { [key in IndustryType]: string } = {
    report: 'reports',
    insight: 'insights',
    data: 'data',
    manual: 'manuals',
    course: 'courses',
    statistic: 'statistics',
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

  const { industries, isLoading, error } = useIndustriesByType({
    type,
    topSubIndustry: 2,
  });

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
              <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-3xl font-extrabold text-transparent bg-clip-text mb-4">
              {messages[translationKeys[type]]} {messages.byIndustry}
              </h3>
           
            </div>
          </div>
        </div>

        <div className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              // Loading skeletons
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
                {Array(6).fill(0).map((_, index) => (
                  <Skeleton key={index} height={200} radius="md" />
                ))}
              </div>
            ) : (
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
                          <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600">
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
                                className="text-xs text-blue-800 hover:text-blue-600 transition-colors flex items-center"
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
