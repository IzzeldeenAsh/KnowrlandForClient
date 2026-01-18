"use client";

import React, { useState } from 'react';
import { Text, Card, Badge, Group, Avatar, Rating } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import CourseIcon from "@/components/icons/CourseIcon";
import { formatDistanceToNow } from "date-fns";
import cardStyles from "./knowledge-card.module.css";
import { useParams } from "next/navigation";
import { arSA, enUS } from 'date-fns/locale';
import axios from 'axios';
import AuthModal from '../../../knowledge/[type]/[slug]/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { getApiUrl } from '@/app/config';
import { getAuthToken } from '@/lib/authToken';

const BookmarkUnselectedIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { width = 33, height = 33, ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M16.658 2.38159C15.1433 2.38159 13.6287 2.38159 12.1172 2.38159C11.3277 2.38159 10.5349 2.38159 9.74536 2.38159C8.63354 2.38159 7.5604 2.59751 6.59038 3.1647C5.21753 3.96714 4.17339 5.36577 3.85112 6.92876C3.74155 7.45405 3.71899 7.97935 3.71899 8.51431V12.1108V17.9406V24.0701V28.4722V29.3971C3.71899 29.8999 3.89302 30.3961 4.26362 30.7506C4.87593 31.3339 5.78149 31.4113 6.50015 30.9794C7.75054 30.2286 8.99771 29.4777 10.2481 28.7268C11.708 27.8502 13.1646 26.9705 14.6245 26.0939C14.7115 26.0423 14.7953 25.9908 14.8823 25.9392C14.5568 25.9392 14.2313 25.9392 13.9058 25.9392C14.3086 26.1809 14.7147 26.4258 15.1175 26.6675C16.0295 27.2154 16.9383 27.7632 17.8503 28.3111C18.7978 28.8815 19.7453 29.4519 20.6927 30.0223C21.2212 30.3381 21.7465 30.6572 22.275 30.973C23.0743 31.4532 24.1023 31.3082 24.6824 30.5605C24.966 30.1931 25.0659 29.7613 25.0659 29.3069C25.0659 28.7075 25.0659 28.1081 25.0659 27.5086C25.0659 26.4774 25.0659 25.4494 25.0659 24.4181C25.0659 23.2547 25.0659 22.0946 25.0659 20.9312C25.0659 19.9354 25.0659 18.9396 25.0659 17.9438C25.0659 17.4121 25.0659 16.8835 25.0659 16.3518C25.0659 16.326 25.0659 16.3035 25.0659 16.2777C25.0659 15.7717 24.6211 15.2883 24.0991 15.3109C23.5738 15.3334 23.1323 15.7363 23.1323 16.2777V17.6022V20.7765V24.5889V27.8825C23.1323 28.4013 23.1419 28.9234 23.1323 29.4455C23.1323 29.4938 23.1291 29.5421 23.1226 29.5937C23.1355 29.5067 23.1452 29.4229 23.1581 29.3359C23.1452 29.4068 23.1258 29.4745 23.0968 29.5389C23.1291 29.4616 23.1613 29.3842 23.1935 29.3069C23.1742 29.3456 23.1548 29.381 23.1355 29.4165C23.0614 29.5583 23.3095 29.2263 23.1709 29.3681C23.0388 29.5002 23.3224 29.2843 23.2386 29.323C23.1935 29.3423 23.1548 29.3713 23.1097 29.3939C23.1871 29.3617 23.2644 29.3294 23.3417 29.2972C23.2741 29.323 23.2096 29.3423 23.1387 29.3584C23.2257 29.3456 23.3095 29.3359 23.3965 29.323C23.316 29.3327 23.2386 29.3327 23.1581 29.3262C23.2451 29.3391 23.3289 29.3488 23.4159 29.3617C23.345 29.352 23.2805 29.3327 23.2161 29.3101L23.4481 29.4068C23.1323 29.2714 22.8358 29.0523 22.5425 28.875C21.8819 28.4754 21.218 28.0791 20.5574 27.6794C19.0234 26.7578 17.4894 25.8329 15.9554 24.9112C15.6009 24.6985 15.2432 24.4826 14.8887 24.2699C14.5955 24.0926 14.2055 24.0926 13.9123 24.2699C12.9455 24.8532 11.9754 25.4333 11.0086 26.0166C9.49077 26.9318 7.96968 27.8438 6.45181 28.759C6.21011 28.9041 5.96841 29.0491 5.72671 29.1973C5.60425 29.2714 5.48501 29.352 5.35288 29.41L5.58491 29.3133C5.51724 29.3359 5.45278 29.3552 5.38511 29.3649C5.47212 29.352 5.55591 29.3423 5.64292 29.3294C5.56235 29.3359 5.48501 29.3359 5.40444 29.3262C5.49145 29.3391 5.57524 29.3488 5.66226 29.3617C5.59136 29.3488 5.52368 29.3294 5.45923 29.3004L5.69126 29.3971C5.65259 29.3778 5.61714 29.3584 5.58169 29.3391C5.43989 29.265 5.77183 29.5131 5.63003 29.3746C5.4979 29.2424 5.71382 29.526 5.67515 29.4422C5.65581 29.3971 5.62681 29.3584 5.60425 29.3133C5.63647 29.3907 5.6687 29.468 5.70093 29.5454C5.67515 29.4777 5.65581 29.4132 5.6397 29.3423C5.65259 29.4293 5.66226 29.5131 5.67515 29.6001C5.64614 29.3746 5.66548 29.1361 5.66548 28.9073C5.66548 28.3852 5.66548 27.8631 5.66548 27.3411C5.66548 25.6105 5.66548 23.8799 5.66548 22.1461C5.66548 20.0579 5.66548 17.9728 5.66548 15.8845C5.66548 14.1088 5.66548 12.3332 5.66548 10.5575C5.66548 9.76147 5.66226 8.96548 5.66548 8.16948C5.66548 7.95679 5.67837 7.74731 5.70737 7.53784C5.69448 7.62485 5.68481 7.70864 5.67192 7.79565C5.72993 7.36382 5.84595 6.94487 6.01353 6.54204C5.9813 6.61938 5.94907 6.69673 5.91685 6.77407C6.03931 6.4937 6.18433 6.22622 6.35513 5.97163C6.39702 5.90718 6.44536 5.84595 6.49048 5.78149C6.57749 5.65903 6.35835 5.94585 6.42925 5.85884C6.45181 5.83306 6.47437 5.80405 6.49692 5.77827C6.59683 5.65903 6.69995 5.54624 6.80952 5.43667C6.91587 5.33354 7.02544 5.23364 7.13823 5.14019C7.16401 5.11763 7.19302 5.09507 7.2188 5.07251C6.98032 5.27554 7.09956 5.16597 7.15757 5.12085C7.21558 5.07895 7.27358 5.03706 7.33159 4.99839C7.59263 4.82437 7.86655 4.67612 8.15659 4.55688C8.07925 4.58911 8.0019 4.62134 7.92456 4.65356C8.3145 4.49243 8.72056 4.38286 9.13628 4.32808C9.04927 4.34097 8.96548 4.35063 8.87847 4.36353C9.2523 4.31519 9.62935 4.32163 10.0064 4.32163H11.6757H15.7202H16.6773C17.1833 4.32163 17.6667 3.8769 17.6441 3.35483C17.6022 2.8231 17.1994 2.38159 16.658 2.38159Z"
        fill="currentColor"
      />
      <path
        d="M23.1064 2.70376V5.58804V10.1449V11.1955C23.1064 11.7014 23.5512 12.1848 24.0732 12.1623C24.5985 12.1397 25.04 11.7369 25.04 11.1955C25.04 10.2351 25.04 9.27154 25.04 8.31118C25.04 6.79331 25.04 5.27222 25.04 3.75435C25.04 3.40308 25.04 3.05503 25.04 2.70376C25.04 2.19781 24.5953 1.71441 24.0732 1.73697C23.5479 1.75952 23.1064 2.16236 23.1064 2.70376Z"
        fill="currentColor"
      />
      <path
        d="M19.8258 7.91479H22.7101H27.2669H28.3175C28.8235 7.91479 29.3069 7.47007 29.2843 6.948C29.2618 6.42271 28.8589 5.9812 28.3175 5.9812C27.3572 5.9812 26.3936 5.9812 25.4333 5.9812C23.9154 5.9812 22.3943 5.9812 20.8764 5.9812C20.5251 5.9812 20.1771 5.9812 19.8258 5.9812C19.3199 5.9812 18.8365 6.42593 18.859 6.948C18.8848 7.47329 19.2844 7.91479 19.8258 7.91479Z"
        fill="currentColor"
      />
    </svg>
  );
};

const BookmarkSelectedIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { width = 28, height = 28, ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M21.9024 27.6937L14 22.0555L6.09771 27.6937C5.02583 28.4594 3.53833 27.6937 3.53833 26.3758V2.32969C3.53833 1.04453 4.58286 0 5.86802 0H22.1321C23.4172 0 24.4618 1.04453 24.4618 2.32969V26.3758C24.4618 27.6937 22.9743 28.4594 21.9024 27.6937Z"
        fill="currentColor"
      />
    </svg>
  );
};


interface KnowledgeGridProps {
  knowledge: KnowledgeItem[];
  topicName: string;
  showHeader?: boolean;
  colNumbers?: number;
  locale?: string;
  showInsighter?: boolean;
}
export interface KnowledgeItem {
  slug: string;
  type: string;
  title: string;
  description: string;
  total_price?: string;
  price?: string; // Price as string from API
  published_at: string;
  review?: string; // Review as string (e.g., "4.5")
  review_summary?: {
    count: number;
    average: number;
  };
  insighter: {
    uuid?: string;
    name: string;
    profile_photo_url: string | null;
    roles: string[];
    company?: {
      uuid: string;
      legal_name: string;
      logo: string;
      verified?: boolean;
    };
  };
  is_read_later?: boolean;
  language?: 'english' | 'arabic';
  cover_start?: number; // Coverage start year
  cover_end?: number;   // Coverage end year
  total_downloads?: number;
  paid?:  'free' | 'partial_paid' | 'paid';
  paid_status?: 'free' | 'partial_paid' | 'paid';
}

function getInitials(name: string) {
  if (!name) return '';
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatPublishedDate(dateString: string, locale: string = 'en') {
  // Ensure we're working with UTC time to avoid server/client mismatches
   const date = new Date(dateString);

  // إنشاء نسخة UTC من التاريخ الأصلي
  const utcDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  ));

  // اختيار اللغة
  const selectedLocale = locale === 'ar' ? arSA : enUS;

  return formatDistanceToNow(utcDate, {
    addSuffix: true,
    locale: selectedLocale,
  });
}

function truncateDescription(
  description: string,
  wordLimit: number = 20
): string {
  if (!description) return "";

  // Remove HTML tags to get plain text
  const plainText = description.replace(/<[^>]*>/g, "");

  const words = plainText.split(/\s+/);
  if (words.length <= wordLimit) return plainText;

  return words.slice(0, wordLimit).join(" ") + "...";
}

// Format coverage years nicely
function formatCoverageRange(start?: number, end?: number): string {
  const hasStart = typeof start === 'number' && !Number.isNaN(start);
  const hasEnd = typeof end === 'number' && !Number.isNaN(end);
  if (hasStart && hasEnd) {
    return start === end ? String(start) : `${start}–${end}`;
  }
  if (hasStart) return String(start);
  if (hasEnd) return String(end);
  return '';
}

export default function KnowledgeGrid({
  knowledge,
  topicName,
  showHeader = true,
  colNumbers = 3,
  locale,
  showInsighter = true,
}: KnowledgeGridProps) {
  const params = useParams();
  const currentLocale = locale || params.locale || "en";
  const isRTL = currentLocale === "ar";
  
  // Auth Modal state
  const [authModalOpened, setAuthModalOpened] = useState(false);
  
  // State for tracking read later status for each item
  const [readLaterStates, setReadLaterStates] = useState<{[key: string]: boolean}>({});
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  
  // Use auth hook
  const { isLoggedIn } = useAuth();

  // Handle read later toggle
  const handleReadLaterToggle = async (item: KnowledgeItem, e: React.MouseEvent) => {
    if(!isLoggedIn){
      setAuthModalOpened(true);
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    
    const itemKey = item.slug;
    const currentState = readLaterStates[itemKey] ?? item.is_read_later ?? false;
    
    setLoadingStates(prev => ({ ...prev, [itemKey]: true }));
    
    try {
      const token = getAuthToken();
      if (!token) {
        setAuthModalOpened(true);
        return;
      }

      const method = currentState ? 'DELETE' : 'POST';
      const url = getApiUrl(`/api/account/favorite/knowledge/${item.slug}`);

      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-language': currentLocale
        }
      });

      // Check for successful responses (200, 201, 204)
      if (response.status >= 200 && response.status < 300) {
        setReadLaterStates(prev => ({ ...prev, [itemKey]: !currentState }));
      }
    } catch (error) {
      // Silently handle error in production
    } finally {
      setLoadingStates(prev => ({ ...prev, [itemKey]: false }));
    }
  };

  const typeTranslations: Record<string, string> = {
    report: isRTL ? "تقرير" : "Reports",
    manual: isRTL ? "دليل" : "Manuals",
    statistic: isRTL ? "إحصائيات" : "Statistics",
    data: isRTL ? "بيانات" : "Data",
    article: isRTL ? "مجالات" : "Articles",
    course: isRTL ? "دورة تدريبية" : "Course",
  };
  
  // Localized strings
  const translations = {
    knowledge: isRTL ? "الرؤى" : "Insights",
    exploreInsights: isRTL ? `استكشف الرؤى ضمن ${topicName}` : `Explore insights within ${topicName}`,
    noItems: isRTL ? "لا توجد عناصر معرفية متاحة بعد" : "No knowledge items available yet",
    posted: isRTL ? "نُشر" : "Posted",
    free: isRTL ? "مجاني" : "Free",
    partial: isRTL ? "مدفوع جزئي" : "Partial Paid",
    freeDocs: isRTL ? "مستندات مجانية" : "Free docs",
    paid: isRTL ? "مدفوع" : "PAID",
    insighter: isRTL ? "إنسايتر" : "Insighter",
    company: isRTL ? "الشركة" : "Company",
    by: isRTL ? "من قبل" : "By",
    downloads: isRTL ? "تحميل" : "Downloads",
    downloaded: isRTL ? "تم التحميل" : "Downloaded",
    time: isRTL ? "مرة" : "time",
    times: isRTL ? "مرات" : "times",
    download: isRTL ? "تحميل" : "Download",
  };

  return (
    <div className="max-w-6xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {/* {showHeader && (
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-start'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{translations.knowledge}</h2>
        </div>
      )} */}

      <div
        className={`grid sm:grid-cols-2 lg:grid-cols-${colNumbers} gap-4 max-w-7xl mx-auto`}
      >
        {knowledge.map((item: KnowledgeItem, index) => {
          const normalizedPrice = String(item.price ?? item.total_price ?? "").trim();
          const hasPrice = normalizedPrice !== "";
          const numericPrice = Number(normalizedPrice);
          const isNumericPrice = normalizedPrice !== "" && !Number.isNaN(numericPrice);
          const formattedPrice = isNumericPrice
            ? `$${numericPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
            : normalizedPrice;
          const paidStatus: 'free' | 'partial_paid' | 'paid' | undefined =
            typeof item.paid === 'string'
              ? (item.paid as 'free' | 'partial_paid' | 'paid')
              : typeof item.paid === 'boolean'
                ? (item.paid ? 'paid' : 'free')
                : typeof item.paid_status === 'string'
                  ? (item.paid_status as 'free' | 'partial_paid' | 'paid')
                  : undefined;
          const shouldShowFree = paidStatus === 'free' || (!paidStatus && isNumericPrice && numericPrice === 0);
          const shouldShowPartial = paidStatus === 'partial_paid';
          const shouldShowPaid = paidStatus === 'paid';
          const shouldShowPricing = shouldShowFree || shouldShowPartial || (shouldShowPaid && hasPrice && numericPrice > 0) || (!paidStatus && hasPrice && numericPrice > 0);
          const coverageText = formatCoverageRange(item.cover_start, item.cover_end);
          
          // Get review value - prefer review string, fallback to review_summary.average
          const reviewValue = item.review ? parseFloat(item.review) : (item.review_summary?.average ?? 0);
          const reviewCount = item.review_summary?.count ?? 0;

          return (
            <Card
              key={`${item.type}-${item.slug}-${index}`}
              withBorder
              padding="lg"
              radius="xs"
              className={cardStyles.card}
              component="div"
            >
              <Link
                href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`}
                className="block relative h-full flex flex-col"
                onClick={(e) => {
                  // Check if the URL is valid before navigation
                  if (!item.slug || item.slug.trim() === '') {
                    e.preventDefault();
                    console.error('Invalid slug for item:', item);
                    return;
                  }
                }}
              >
             
              <div className={`${cardStyles.darkSection} relative`}>
                <div>
                  <div className="flex items-center mb-3">
                    {item.type === "report" && <ReportIcon width={20} height={20} />}
                    {item.type === "manual" && <ManualIcon width={20} height={20} />}
                    {item.type === "statistic" && <InsightIcon width={20} height={20} />}
                    {item.type === "data" && <DataIcon width={20} height={20} />}
                    {item.type === "course" && <CourseIcon width={20} height={20} />}

                    <Badge c={'#67b5f6'} w="fit-content" className="capitalize ml-2 " variant="light">
                      {item.type && typeof item.type === 'string' ? (typeTranslations[item.type.toLowerCase()] || item.type) : ''}
                    </Badge>
                  </div>
                  
                  <Text
                  style={{wordBreak:'break-word'}}
                    fw={700}
                    className={`${cardStyles.title} ${item.language === 'arabic' ? 'text-right' : 'text-left'}`}
                    pt={4}
                    lineClamp={2}
                    dir={item.language === 'arabic' ? 'rtl' : 'ltr'}
                  >
                    {item.title}
                  </Text>
                  {coverageText && (
                  <div className={`${item.language === 'arabic' ? 'text-right' : 'text-left'}`} dir={item.language === 'arabic' ? 'rtl' : 'ltr'}>
                    <div
                      
                      className={`text-lg  font-bold leading-none   drop-shadow-lg text-blue-400`}
                    >
                      {coverageText}
                    </div>
                  </div>
                )}
                </div>
                
                {reviewValue >= 1 && (
                  <div className="flex items-center mt-auto gap-1">
                    <Rating value={reviewValue} fractions={2} readOnly size="sm" />
                    <Text size="xs" fw={500} className="mx-2 text-sky-500">{reviewValue.toFixed(1)}</Text>
                  </div>
                )}
                
                {item.total_downloads !== undefined && item.total_downloads > 0 && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full">
                      <ArrowDownTrayIcon className="w-3 h-3 text-white" />
                    </div>
                    <Text size="xs" className="text-white font-medium">
                       {item.total_downloads.toLocaleString()} {item.total_downloads === 1 ? translations.download : translations.downloads}
                    </Text>
                  </div>
                )}
               
              </div>
              </Link>
              <div className={cardStyles.whiteSection + " flex flex-col h-full "}>
                {/* Top row with insighter info and action buttons */}
                <div className="flex justify-between items-center pb-4">
                  {showInsighter && item.insighter && (
                    <div className="flex items-center">
                      <div className="relative">
                   <div className="object-cover object-top">
                   <Link 
                     href={item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter") ? 
                       `/${currentLocale}/profile/${item.insighter.company?.uuid}` : 
                       `/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}
                   >
                     <Avatar
                       src={(item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) && item.insighter.company?.logo ? 
                         item.insighter.company.logo : 
                         item.insighter.profile_photo_url}
                       radius="xl"
                       alt={item.insighter.name}
                       size="md"
                       className={`${cardStyles.avatar} avatar-top-position`}
                     >
                       {!((item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) && item.insighter.company?.logo) && 
                       !item.insighter.profile_photo_url &&
                         getInitials(item.insighter.name)}
                     </Avatar>
                   </Link>
                   </div>
                        
                        {item.insighter.roles.includes("company-insighter") && item.insighter.profile_photo_url && (
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                          <Avatar
                            src={item.insighter.profile_photo_url}
                            radius="xl"
                            size="xs"
                            className="absolute bottom-0 right-0 translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position"
                            alt={item.insighter.name}
                            style={{
                              boxShadow: '0 0 0 2px white',
                              position: 'absolute',
                            }}
                          />
                          </Link>
                        )}
                         {item.insighter.roles.includes("company") && item.insighter.profile_photo_url && (
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                          <Avatar
                            src={item.insighter.profile_photo_url}
                            radius="xl"
                            size="xs"
                            className="absolute bottom-0 right-0 translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position"
                            alt={item.insighter.name}
                            style={{
                              boxShadow: '0 0 0 2px white',
                              position: 'absolute',
                            }}
                          />
                          </Link>
                        )}
                      </div>

                      <div className="ms-3">
                        <Text fw={600} size="sm" className="capitalize">
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                          {item.insighter.roles.includes("insighter") && item.insighter.name.toLowerCase()}
                          </Link>

                        <Link href={`/${currentLocale}/profile/${item.insighter.company?.uuid}`}>
                          {item.insighter.roles.includes("company") && (
                            item.insighter.company
                              ? isRTL
                                ? ` ${item.insighter.company.legal_name}`
                                : `${item.insighter.company.legal_name} `
                              : translations.company
                          )}
                          </Link>

                          <Link href={`/${currentLocale}/profile/${item.insighter.company?.uuid}`}>
                          {item.insighter.roles.includes("company-insighter") && (
                            item.insighter.company
                              ? isRTL
                                ? ` ${item.insighter.company.legal_name}`
                                : `${item.insighter.company.legal_name} `
                              : translations.company
                          )}
                        </Link>
                          </Text>

                        <Text c="dimmed" size="xs" className="capitalize">
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                          {item.insighter.roles.includes("insighter") && translations.insighter}
                          </Link>

                         
                          {item.insighter.roles.includes("company") && (
                            item.insighter.company
                              ? (<Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                                {translations.by} {item.insighter.name.toLowerCase()}
                                </Link>)
                              : <Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                            Company
                              </Link>
                          )}

                          <Link href={`/${currentLocale}/profile/${item.insighter.company?.uuid}`}>
                          {item.insighter.roles.includes("company-insighter") && (
                            item.insighter.company
                              ? (<Link href={`/${currentLocale}/profile/${item.insighter.uuid || item.insighter.name}?entity=insighter`}>
                                {translations.by} {item.insighter.name.toLowerCase()}
                                </Link>)
                              : translations.company
                          )}
                          </Link>
                        </Text>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {(
                      <div className="relative">
                        {loadingStates[item.slug] ? (
                          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          (item.slug in readLaterStates ? readLaterStates[item.slug] : item.is_read_later) ? (
                            <BookmarkSelectedIcon 
                              width={17}
                              height={17}
                              className="text-[#861536] cursor-pointer hover:text-[#861536] transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!loadingStates[item.slug]) {
                                  handleReadLaterToggle(item, e);
                                }
                              }}
                              aria-label="Remove from Read Later"
                            />
                          ) : (
                            <BookmarkUnselectedIcon 
                              width={17}
                              height={17}
                              className="text-gray-600 cursor-pointer hover:text-gray-700 transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!loadingStates[item.slug]) {
                                  handleReadLaterToggle(item, e);
                                }
                              }}
                              aria-label="Add to Read Later"
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Bottom row with published date and price badge */}
                <div className="flex justify-between items-center pt-2 mt-auto mt-6 border-t border-gray-100 w-full">
                  {item.published_at && (
                    <Text c="dimmed" size="xs" dir={isRTL ? 'rtl' : 'ltr'}>
                      {translations.posted} {formatPublishedDate(item.published_at, currentLocale as string)}
                    </Text>
                  )}
                  {shouldShowPricing && (
                    <div className="flex items-center gap-2">
                       {shouldShowPartial && (
                        <Text size="xs" c="dimmed" className="whitespace-nowrap">
                           {translations.freeDocs} +
                        </Text>
                      )}
                      {(shouldShowPaid || (!paidStatus && hasPrice && numericPrice > 0) || (shouldShowPartial && hasPrice && numericPrice > 0)) && (
                        <Badge color="yellow" variant="light" className={cardStyles.priceBadge}>
                          {shouldShowPartial && hasPrice && numericPrice > 0 ? (
                            <span dir="ltr" lang="en" >{formattedPrice} 
                            </span>
                          ) : (
                            <span dir="ltr" lang="en">{formattedPrice}</span>
                          )}
                        </Badge>
                      )}
                      {shouldShowPartial && !hasPrice && (
                        <Badge color="yellow" variant="light" className={cardStyles.priceBadge} style={{fontWeight: '500'}}>
                          {translations.partial}
                        </Badge>
                      )}
                      {shouldShowFree && !shouldShowPartial && !(shouldShowPaid && hasPrice && numericPrice > 0) && (
                        <Badge color="green" variant="light" className={cardStyles.priceBadge}>
                          {translations.free}
                        </Badge>
                      )}
                   
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        {knowledge.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
            <Image
            src="/images/Search-Not-Found.svg"
            alt="No results found"
            width={300}
            height={200}
            className="mb-4"
          />
            <p className="text-gray-500 text-sm">
              {translations.noItems}
            
            </p>
          </div>
        )}
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        opened={authModalOpened}
        onClose={() => setAuthModalOpened(false)}
        locale={currentLocale}
      />
    </div>
  );
}
