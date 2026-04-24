'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Footer from '@/components/ui/footer';
import Breadcrumb from '@/components/ui/breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@mantine/core';
import { fetchBreadcrumb } from '@/utils/breadcrumb';
import StatisticsCards from '@/components/industry/statistics-cards';
import SubIndustryCard from '@/components/industry/sub-industry-card';
import Stripes from '@/public/images/stripes-dark.svg';
import { IndustryChild } from '@/hooks/industries/types';
import { useIndustryDetails } from '@/hooks/industries/useIndustryDetails';
import { useMessages } from '@/hooks/useMessages';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function IndustryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const slug = params.slug as string;
  const locale = (params.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const industryId = parseInt(id, 10);

  const { industry, isLoading, error } = useIndustryDetails({ id: industryId, slug });
  const { messages } = useMessages();

  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    if (!industry) return;
    if (industry.slug && industry.slug !== slug) {
      router.replace(`/${locale}/industry/${id}/${industry.slug}`);
      return;
    }
    fetchBreadcrumb('industry', industryId, locale)
      .then((items) =>
        setBreadcrumbItems(items.map((item) => ({ label: item.label, href: item.url })))
      )
      .catch(() => setBreadcrumbItems([]));
  }, [industry, id, slug, locale, industryId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
          <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
            <div className="mb-8 flex space-x-2">
              <Skeleton height={16} width={80} radius="sm" />
              <Skeleton height={16} width={16} radius="sm" />
              <Skeleton height={16} width={128} radius="sm" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <Skeleton height={48} width={320} radius="sm" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} height={80} width={120} radius="md" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="max-w-container mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <Skeleton height={32} width={200} radius="sm" className="mb-8" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height={160} radius="md" />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error || !industry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'تعذر تحميل بيانات المجال' : 'Unable to load industry details'}
          </h2>
          <p className="text-gray-600 mb-6">{error || ''}</p>
          <Link
            href={`/${locale}`}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {locale === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const safeChildren = Array.isArray(industry.children)
    ? industry.children.filter(
        (child: unknown): child is IndustryChild =>
          !!child && typeof child === 'object' && 'id' in child && 'slug' in child
      )
    : [];

  return (
    <>
      <div className="relative z-10 max-w-6xl mx-auto w-full">
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

      <main className="min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <header className="section-header px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden rounded-lg">
          <Image
            alt="Industry page header background"
            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="relative z-10 max-w-6xl mx-auto mt-5 w-full">
            {breadcrumbItems.length > 0 && (
              <nav className="mb-8" aria-label="Breadcrumb">
                <Breadcrumb items={breadcrumbItems} />
              </nav>
            )}
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="flex-1">
                <div className={`${isRTL ? 'text-right' : 'text-left'} mb-4`}>
                  <h1
                    className={`text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text ${
                      isRTL
                        ? 'bg-gradient-to-l from-blue-400 to-teal-500'
                        : 'bg-gradient-to-r from-blue-500 to-teal-400'
                    } mb-4`}
                  >
                    {industry.name}
                  </h1>
                </div>
              </div>
              <aside className="flex-shrink-0">
                <StatisticsCards type="industry" id={industryId} entityName={industry.name} />
              </aside>
            </div>
          </div>
        </header>

        <section className="max-w-container relative mx-auto mt-10 w-full px-4 sm:px-6 lg:px-8 pb-32">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-xl font-bold text-transparent ${
                isRTL
                  ? 'bg-gradient-to-l from-blue-400 to-teal-500'
                  : 'bg-gradient-to-r from-blue-500 to-teal-400'
              } bg-clip-text mb-8`}
            >
              {messages?.industry?.subIndustries || (locale === 'ar' ? 'المجالات الفرعية' : 'Sub Industries')}
            </h2>

            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
              role="list"
            >
              {safeChildren.map((child: IndustryChild) => {
                const isDisabled = child.weight === 0;
                return isDisabled ? (
                  <div key={child.id} className="h-full" role="listitem">
                    <SubIndustryCard child={child} locale={locale} isRTL={isRTL} />
                  </div>
                ) : (
                  <Link
                    key={child.id}
                    href={`/${locale}/sub-industry/${child.id}/${child.slug}`}
                    className="h-full block"
                    role="listitem"
                  >
                    <SubIndustryCard child={child} locale={locale} isRTL={isRTL} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
