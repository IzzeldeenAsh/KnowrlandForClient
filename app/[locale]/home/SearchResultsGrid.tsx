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
import cardStyles from "../topic/[id]/[slug]/knowledge-card.module.css";
import { useParams } from "next/navigation";
import { arSA, enUS } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import axios from 'axios';
import AuthModal from '../knowledge/[type]/[slug]/AuthModal';

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

// Helper function to get token from cookie
function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'token') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// Helper function to get token from any available source (cookie first, then localStorage as fallback)
function getAuthToken(): string | null {
  // First try cookie (primary storage)
  const cookieToken = getTokenFromCookie();
  if (cookieToken) {
    return cookieToken;
  }

  // Fallback to localStorage for backward compatibility
  const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (localStorageToken) {
    return localStorageToken;
  }

  return null;
}

// Dynamically import the SearchResultsList component
const SearchResultsList = dynamic(() => import('./SearchResultsList'), { ssr: false });

// Interface for search result items
export interface SearchResultItem {
  searchable_id: number;
  searchable_type: string; // 'knowledge' or 'topic'
  title: string;
  description: string | null;
  url: string;
  type?: string;  // Only for knowledge items
  published_at?: string | string[]; // Only for knowledge items
  insighter?: {
    uuid: string;
    name: string;
    profile_photo_url: string | null;
    roles: string[];
    company?: {
      uuid: string;
      legal_name: string;
      logo: string;
      verified?: boolean;
    };
  }; // Only for knowledge items
  paid?: boolean; // Only for knowledge items
  price?: string; // Only for knowledge items - price as string from API
  review: string;
  is_read_later?: boolean; // Only for knowledge items
  total_downloads?: number; // Only for knowledge items
}

interface SearchResultsGridProps {
  results: SearchResultItem[];
  colNumbers?: number;
  locale?: string;
  viewMode: 'grid' | 'list';
}
function getInitials(name: string) {
  if (!name) return '';
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Helper function to safely format date, handling both string and string[] types
function safeFormatDate(dateInput: string | string[] | undefined, locale: string = 'en'): string {
  if (!dateInput) return '';
  
  // Convert array to string if needed
  const dateString = Array.isArray(dateInput) ? dateInput[0] || '' : dateInput;
  if (!dateString) return '';
  
  try {
    return formatPublishedDate(dateString, locale);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

function formatPublishedDate(dateString: string, locale: string = 'en') {
  if (!dateString) return '';
  
  // Ensure we're working with UTC time to avoid server/client mismatches
  const date = new Date(dateString);

  // Create UTC version of the original date
  const utcDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  ));

  // Select locale
  const selectedLocale = locale === 'ar' ? arSA : enUS;

  return formatDistanceToNow(utcDate, {
    addSuffix: true,
    locale: selectedLocale,
  });
}

function truncateDescription(
  description: string | null,
  wordLimit: number = 20
): string {
  if (!description) return "";

  // Remove HTML tags to get plain text
  const plainText = description.replace(/<[^>]*>/g, "");

  const words = plainText.split(/\s+/);
  if (words.length <= wordLimit) return plainText;

  return words.slice(0, wordLimit).join(" ") + "...";
}

export default function SearchResultsGrid({
  results,
  colNumbers = 3,
  locale,
  viewMode,
}: SearchResultsGridProps) {
  const params = useParams();
  const currentLocale = locale || params.locale || "en";
  const isRTL = currentLocale === "ar";
  
  // Auth Modal state
  const [authModalOpened, setAuthModalOpened] = useState(false);
  
  // State for tracking read later status for each item
  const [readLaterStates, setReadLaterStates] = useState<{[key: number]: boolean}>({});
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  React.useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);
  
  // Generate a unique prefix for this render to avoid key conflicts
  const uniquePrefix = React.useMemo(() => Date.now().toString(), [results]);

  // Handle read later toggle
  const handleReadLaterToggle = async (item: SearchResultItem, e: React.MouseEvent) => {
    if(!isLoggedIn){
      setAuthModalOpened(true);
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    
    if (item.searchable_type !== 'knowledge') return;
    
    const itemId = item.searchable_id;
    const currentState = readLaterStates[itemId] ?? item.is_read_later ?? false;
    
    setLoadingStates(prev => ({ ...prev, [itemId]: true }));
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      const method = currentState ? 'DELETE' : 'POST';
      const slug = item.url.split('/').pop();
      const url = `https://api.knoldg.com/api/account/favorite/knowledge/${slug}`;

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
        setReadLaterStates(prev => ({ ...prev, [itemId]: !currentState }));
      } else {
        console.error('Failed to toggle read later status. Status:', response.status, 'Response:', response.data);
      }
    } catch (error) {
      console.error('Error toggling read later:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method
        });
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const typeTranslations: Record<string, string> = {
    report: isRTL ? "تقرير" : "Reports",
    manual: isRTL ? "دليل" : "Manuals",
    insight: isRTL ? "رؤى" : "Insights",
    data: isRTL ? "بيانات" : "Data",
    article: isRTL ? "مقالة" : "Articles",
    course: isRTL ? "دورة تدريبية" : "Course",
    topic: isRTL ? "موضوع" : "Topic",
  };
  
  // Localized strings
  const translations = {
    topic: isRTL ? "موضوع" : "Topic",
    topicsRelated: isRTL ? "المواضيع المتعلقة بالبحث" : "Topics related to your search",
    knowledge: isRTL ? "المعرفة" : "Knowledge",
    noItems: isRTL ? "لا توجد نتائج بحث متاحة" : "No search results available",
    posted: isRTL ? "نُشر" : "Posted",
    free: isRTL ? "مجاني" : "Free",
    insighter: isRTL ? "إنسايتر" : "Insighter",
    by: isRTL ? "من قبل" : "By",
    company: isRTL ? "الشركة" : "Company",
    downloads: isRTL ? "تحميل" : "Downloads",
    downloaded: isRTL ? "تم التحميل" : "Downloaded",
    time: isRTL ? "مرة" : "time",
    times: isRTL ? "مرات" : "times"
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center">
        <Image
          src="/images/Search-Not-Found.svg"
          alt="No search results found"
          width={350}
          height={350}
          className="mb-4"
        />
        <Text size="lg" fw={500} c="dimmed">
          {translations.noItems}
        </Text>
      </div>
    );
  }

  // Render list view
  if (viewMode === 'list') {
    return <SearchResultsList results={results} locale={currentLocale as string} />;
  }

  // Render grid view
  // Split results by searchable_type
  const knowledgeItems = results.filter(item => item.searchable_type === "knowledge");
  const topicItems = results.filter(item => item.searchable_type === "topic");

  return (
    <div className="max-w-6xl 2xl:max-w-none 2xl:mx-8 mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {/* Knowledge items section */}
      {knowledgeItems.length > 0 && (
        <div className="mb-6">
          <div
            className={`grid sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 max-w-7xl 2xl:max-w-none 2xl:mx-8 mx-auto`}
          >
            {knowledgeItems.map((item, index) => {
              const normalizedPrice = String(item.price ?? "").trim();
              const hasPrice = normalizedPrice !== "";
              const numericPrice = Number(normalizedPrice);
              const isNumericPrice = normalizedPrice !== "" && !Number.isNaN(numericPrice);
              const isFreePrice = isNumericPrice && numericPrice === 0;
              const formattedPrice = isNumericPrice
                ? `$${numericPrice.toLocaleString(
                    currentLocale === "ar" ? "ar-SA" : "en-US",
                    { maximumFractionDigits: 2 }
                  )}`
                : normalizedPrice;

              return (
                <Card
                  key={`${uniquePrefix}-knowledge-${item.searchable_id}-${index}`}
                  withBorder
                  padding="lg"
                  radius="xs"
                  className={cardStyles.card}
                  component="div"
                >
                  <Link
                    href={`/${currentLocale}/${item.url}`}
                    className="block relative h-full flex flex-col"
                    onClick={(e) => {
                      // Check if the URL is valid before navigation
                      if (!item.url || item.url.trim() === '') {
                        e.preventDefault();
                        console.error('Invalid URL for item:', item);
                        return;
                      }
                    }}
                  >
                 
              <div className={`${cardStyles.darkSection} relative`}>
                <div>
                  <div className="flex items-center mb-3">
                    {item.type === "report" && <ReportIcon width={20} height={20} />}
                    {item.type === "manual" && <ManualIcon width={20} height={20} />}
                    {item.type === "insight" && <InsightIcon width={20} height={20} />}
                    {item.type === "data" && <DataIcon width={20} height={20} />}
                    {item.type === "course" && <CourseIcon width={20} height={20} />}

                    <Badge c={'#67b5f6'} w="fit-content" className="capitalize ml-2 " variant="light">
                      {item.type && typeof item.type === 'string' ? (typeTranslations[item.type.toLowerCase()] || item.type) : ''}
                    </Badge>
                  </div>
                  
                  <Text
                    fw={700}
                    className={`${cardStyles.title} amiri-bold`}
                    pt={4}
                    lineClamp={2}
                  >
                    {item.title}
                  </Text>
                </div>
                
                {item.review && parseInt(item.review) >= 1 && (
                  <div className="flex items-center mt-auto gap-1">
                    <Rating value={parseInt(item.review)} fractions={2} readOnly size="sm" />
                    <Text size="xs" fw={500} className="mx-2 text-sky-500">{parseInt(item.review).toFixed(1)}</Text>
                  </div>
                )}
                
                {item.total_downloads !== undefined && item.total_downloads > 0 && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full">
                      <ArrowDownTrayIcon className="w-3 h-3 text-white" />
                    </div>
                    <Text size="xs" className="text-white font-medium">
                      {translations.downloaded} {item.total_downloads.toLocaleString()} {item.total_downloads === 1 ? translations.time : translations.times}
                    </Text>
                  </div>
                )}
              </div>
              </Link>
              <div className={cardStyles.whiteSection + " flex flex-col h-full "}>
                {/* Top row with insighter info and action buttons */}
                <div className="flex justify-between items-center pb-4">
                  {item.insighter && (
                    <div className="flex items-center">
                      <div className="relative">
                   <div className="object-cover object-top">
                   <Link 
                     href={item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter") ? 
                       `/${currentLocale}/profile/${item.insighter.company?.uuid}` : 
                       `/${currentLocale}/profile/${item.insighter.uuid}?entity=insighter`}
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
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid}?entity=insighter`}>
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
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid}?entity=insighter`}>
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
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid}?entity=insighter`}>
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
                          <Link href={`/${currentLocale}/profile/${item.insighter.uuid}?entity=insighter`}>
                          {item.insighter.roles.includes("insighter") && translations.insighter}
                          </Link>

                         
                          {item.insighter.roles.includes("company") && (
                            item.insighter.company
                              ? (<Link href={`/${currentLocale}/profile/${item.insighter?.uuid}?entity=insighter`}>
                                {translations.by} {item.insighter.name.toLowerCase()}
                                </Link>)
                              : <Link href={`/${currentLocale}/profile/${item.insighter?.uuid}?entity=insighter`}>
                            Company
                              </Link>
                          )}

                          <Link href={`/${currentLocale}/profile/${item.insighter.company?.uuid}`}>
                          {item.insighter.roles.includes("company-insighter") && (
                            item.insighter.company
                              ? (<Link href={`/${currentLocale}/profile/${item.insighter?.uuid}?entity=insighter`}>
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
                    {item.searchable_type === 'knowledge'  && (
                      <div className="relative">
                        {loadingStates[item.searchable_id] ? (
                          <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          (item.searchable_id in readLaterStates ? readLaterStates[item.searchable_id] : item.is_read_later) ? (
                            <BookmarkSelectedIcon 
                              width={17}
                              height={17}
                              className="text-[#861536] cursor-pointer hover:text-[#861536] transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!loadingStates[item.searchable_id]) {
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
                                if (!loadingStates[item.searchable_id]) {
                                  handleReadLaterToggle(item, e);
                                }
                              }}
                              aria-label="Add to Read Later"
                            />
                          )
                        )}
                      </div>
                    )}
                    {/* <button 
                      className={cardStyles.actionButton}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Download"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7971 0.315674H5.74029C2.67502 0.315674 0.847656 2.14304 0.847656 5.20831V12.2567C0.847656 15.3304 2.67502 17.1578 5.74029 17.1578H12.7887C15.854 17.1578 17.6813 15.3304 17.6813 12.2651V5.20831C17.6898 2.14304 15.8624 0.315674 12.7971 0.315674ZM6.29608 7.87778C6.54029 7.63357 6.9445 7.63357 7.18871 7.87778L8.63713 9.3262V4.11357C8.63713 3.76831 8.92345 3.48199 9.26871 3.48199C9.61397 3.48199 9.90029 3.76831 9.90029 4.11357V9.3262L11.3487 7.87778C11.5929 7.63357 11.9971 7.63357 12.2413 7.87778C12.4856 8.12199 12.4856 8.5262 12.2413 8.77041L9.71502 11.2967C9.65608 11.3557 9.58871 11.3978 9.51292 11.4315C9.43713 11.4651 9.35292 11.482 9.26871 11.482C9.1845 11.482 9.10871 11.4651 9.0245 11.4315C8.94871 11.3978 8.88134 11.3557 8.82239 11.2967L6.29608 8.77041C6.05187 8.5262 6.05187 8.13041 6.29608 7.87778ZM14.5234 13.1325C12.8308 13.6967 11.054 13.983 9.26871 13.983C7.48345 13.983 5.7066 13.6967 4.01397 13.1325C3.68555 13.023 3.50871 12.6609 3.61818 12.3325C3.72766 12.0041 4.08134 11.8188 4.41818 11.9367C7.55081 12.9809 10.995 12.9809 14.1277 11.9367C14.4561 11.8273 14.8182 12.0041 14.9277 12.3325C15.0287 12.6694 14.8519 13.023 14.5234 13.1325Z" fill="#228BE6"/>
                      </svg>
                    </button> */}
                  </div>
                </div>
                
                {/* Bottom row with published date and price badge */}
                <div className="flex justify-between items-center pt-2 mt-auto mt-6 border-t border-gray-100 w-full">
                  {item.published_at && (
                    <Text c="dimmed" size="xs" dir={isRTL ? 'rtl' : 'ltr'}>
                      {translations.posted} {safeFormatDate(item.published_at, currentLocale as string)}
                    </Text>
                  )}
                  
                  {hasPrice && (
                    <Badge
                      color={isFreePrice ? "green" : "yellow"}
                      variant="light"
                      className={cardStyles.priceBadge}
                    >
                      {isFreePrice ? translations.free : formattedPrice}
                    </Badge>
                  )}
                </div>
              </div>
         
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Topic items section - Simple chips layout */}
      {topicItems.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {/* Header section */}
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 mb-4">
              {translations.topicsRelated}
            </h2>

            {/* Topic chips */}
            <div className="flex flex-wrap gap-3">
              {topicItems.map((item, index) => (
                <Link
                  key={`${uniquePrefix}-topic-${item.searchable_id}-${index}`}
                  href={`/${currentLocale}/${item.url}`}
                  className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-xs font-medium transition-colors duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
          {/* Auth Modal */}
    <AuthModal
      opened={authModalOpened}
      onClose={() => setAuthModalOpened(false)}
      locale={currentLocale}
    />
    </div>
  );
}
