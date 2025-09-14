"use client";

import React, { useState } from 'react';
import { Text, Card, Badge, Group, Avatar, Rating } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
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
import { useAuth, getAuthToken } from '@/hooks/useAuth';
import { getApiUrl } from '@/app/config';


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
  total_price: string;
  published_at: string;
  review_summary?: {
    count: number;
    average: number;
  };
  insighter: {
    name: string;
    profile_photo_url: string | null;
    roles: string[];
    company?: {
      uuid: string;
      legal_name: string;
      logo: string;
    };
  };
  is_read_later?: boolean;
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
    insight: isRTL ? "رؤى" : "Insights",
    data: isRTL ? "بيانات" : "Data",
    article: isRTL ? "مجالات" : "Articles",
    course: isRTL ? "دورة تدريبية" : "Course",
  };
  
  // Localized strings
  const translations = {
    knowledge: isRTL ? "المعرفة" : "Knowledge",
    exploreInsights: isRTL ? `استكشف الرؤى ضمن ${topicName}` : `Explore insights within ${topicName}`,
    noItems: isRTL ? "لا توجد عناصر معرفية متاحة بعد" : "No knowledge items available yet",
    posted: isRTL ? "نُشر" : "Posted",
    free: isRTL ? "مجاني" : "FREE",
    paid: isRTL ? "مدفوع" : "PAID",
    insighter: isRTL ? "إنسايتر" : "Insighter",
    company: isRTL ? "شركة" : "Company" ,
    by: isRTL ? "من قبل" : "By"
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
        {knowledge.map((item: KnowledgeItem) => (
          <Card
            key={`${item.type}-${item.slug}`}
            withBorder
            padding="lg"
            radius="xs"
            className={cardStyles.card}
            data-aos="fade-up"
            component="div"
          >
            <Link
              href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`}
              className="block relative h-full flex flex-col"
            >
              <div className={cardStyles.darkSection}>
                <div>
                  <div className="flex items-center mb-3">
                    {item.type === "report" && <ReportIcon width={20} height={20} />}
                    {item.type === "manual" && <ManualIcon width={20} height={20} />}
                    {item.type === "insight" && <InsightIcon width={20} height={20} />}
                    {item.type === "data" && <DataIcon width={20} height={20} />}
                    {item.type === "article" && <CourseIcon width={20} height={20} />}
                    {item.type === "course" && <CourseIcon width={20} height={20} />}

                    <Badge w="fit-content" className="capitalize ml-2" variant="light">
                      {typeTranslations[item.type.toLowerCase()] || item.type}
                    </Badge>
                  </div>
                  
                  <Text
                    fw={700}
                    className={`${cardStyles.title} amiri-bold`}
                    lineClamp={2}
                  >
                    {item.title}
                  </Text>
                </div>
                
                {item.review_summary && item.review_summary.count >= 1 && item.review_summary.average > 0 && (
                  <div className="flex items-center mt-auto gap-1">
                    <Rating value={item.review_summary.average} fractions={2} readOnly size="sm" />
                    <Text size="xs" fw={500} className="mx-2 text-sky-500">{item.review_summary.average.toFixed(1)}</Text>
                    <Text size="xs" c="dimmed" className="mx-2 text-gray-300">({item.review_summary.count})</Text>
                  </div>
                )}
              </div>
            </Link>
            <div className={cardStyles.whiteSection + " flex flex-col h-full "}>
              {/* Top row with insighter info and action buttons */}
              <div className="flex justify-between items-center pb-4">
              <Link
              href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`}
              className="block relative h-full flex flex-col"
            >
                {showInsighter && (
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="object-cover object-top">
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
                      </div>
                      
                      {item.insighter.roles.includes("company-insighter") && item.insighter.profile_photo_url && (
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
                      )}
                       {item.insighter.roles.includes("company") && item.insighter.profile_photo_url && (
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
                      )}
                    </div>

                    <div className="ms-3">
                      <Text fw={600} size="sm" className="capitalize">
                        {item.insighter.roles.includes("insighter") && item.insighter.name.toLowerCase()}

                        {item.insighter.roles.includes("company") && (
                          item.insighter.company
                            ? isRTL
                              ? ` ${item.insighter.company.legal_name}`
                              : `${item.insighter.company.legal_name} `
                            : translations.company
                        )}

                        {item.insighter.roles.includes("company-insighter") && (
                          item.insighter.company
                            ? isRTL
                              ? ` ${item.insighter.company.legal_name}`
                              : `${item.insighter.company.legal_name} `
                            : translations.company
                        )}
                      </Text>

                      <Text c="dimmed" size="xs" className="capitalize">
                        {item.insighter.roles.includes("insighter") && translations.insighter}

                        {item.insighter.roles.includes("company") && (
                          item.insighter.company
                            ? `${translations.by} ${item.insighter.name.toLowerCase()}`
                            : translations.company
                        )}

                        {item.insighter.roles.includes("company-insighter") && (
                          item.insighter.company
                            ? `${translations.by} ${item.insighter.name.toLowerCase()}`
                            : translations.company
                        )}
                      </Text>
                    </div>
                  </div>
                )}
                </Link>
                <div className="flex gap-2">
                  <div className="relative">
                    {loadingStates[item.slug] ? (
                      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      (item.slug in readLaterStates ? readLaterStates[item.slug] : item.is_read_later) ? (
                        <BookmarkSolidIcon 
                          className="w-5 h-5 text-[#861536] cursor-pointer hover:text-[#861536] transition-colors"
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
                        <BookmarkIcon 
                          className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700 transition-colors"
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
                </div>
              </div>
              
              {/* Bottom row with published date and price badge */}
              <div className="flex justify-between items-center pt-2 mt-auto mt-6 border-t border-gray-100 w-full">
                <Text c="dimmed" size="xs" dir={isRTL ? 'rtl' : 'ltr'}>
                  {translations.posted} {formatPublishedDate(item.published_at, currentLocale as string)}
                </Text>
                
                <Badge
                  color={item.total_price === "0" ? "green" : "yellow"}
                  variant="light"
                  className={cardStyles.priceBadge}
                >
                  {item.total_price === "0" ? translations.free : translations.paid}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
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
