"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Card, Group, Text, Badge, Avatar, Rating } from "@mantine/core";
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from "date-fns";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import CourseIcon from "@/components/icons/CourseIcon";
import { arSA, enUS } from 'date-fns/locale';
import { useParams } from "next/navigation";
import { SearchResultItem } from './SearchResultsGrid';
import listStyles from "../topic/[id]/[slug]/knowledge-list.module.css";
import cardStyles from "../topic/[id]/[slug]/knowledge-card.module.css";
import axios from 'axios';

interface SearchResultsListProps {
  results: SearchResultItem[];
  locale?: string;
}

// Helper function to get initials from a name
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

// Helper function to format date for display
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

export default function SearchResultsList({
  results,
  locale,
}: SearchResultsListProps) {
  const params = useParams();
  const currentLocale = locale || params.locale || "en";
  const isRTL = currentLocale === "ar";
  
  // State for tracking read later status for each item
  const [readLaterStates, setReadLaterStates] = useState<{[key: number]: boolean}>({});
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});
  
  // Generate a unique prefix for this render to avoid key conflicts
  const uniquePrefix = React.useMemo(() => Date.now().toString(), [results]);

  // Handle read later toggle
  const handleReadLaterToggle = async (item: SearchResultItem, e: React.MouseEvent) => {
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
      const url = `https://api.knoldg.co/api/account/favorite/knowledge/${item.url.split('/').pop()}`;

      const axiosConfig = {
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-language': currentLocale
        }
      };

      const response = await axios(axiosConfig);

      if (response.status === 200) {
        setReadLaterStates(prev => ({ ...prev, [itemId]: !currentState }));
      } else {
        console.error('Failed to toggle read later status');
      }
    } catch (error) {
      console.error('Error toggling read later:', error);
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
    knowledge: isRTL ? "المعرفة" : "Knowledge",
    noItems: isRTL ? "لا توجد نتائج بحث متاحة" : "No search results available",
    posted: isRTL ? "نُشر" : "Posted",
    free: isRTL ? "مجاني" : "FREE",
    paid: isRTL ? "مدفوع" : "PAID",
    insighter: isRTL ? "إنسايتر" : "Insighter",
    by: isRTL ? "من قبل" : "By",
    company: isRTL ? "الشركة" : "Company"
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

  // Split results by searchable_type
  const knowledgeItems = results.filter(item => item.searchable_type === "knowledge");
  const topicItems = results.filter(item => item.searchable_type === "topic");

  return (
    <div className="max-w-6xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {/* Knowledge items in list view */}
      {knowledgeItems.length > 0 && (
        <div className="mb-6" >
          <div className="space-y-4 max-w-7xl mx-auto">
            {knowledgeItems.map((item) => (
              <Card
                key={`${uniquePrefix}-knowledge-${item.searchable_id}`}
                withBorder={false}
                padding={0}
                radius="md"
                className={listStyles.listCard}
                data-aos="fade-up"
                component="div"
                style={{height:'100%'}}
              >
                <Link
                  href={`/${currentLocale}/${item.url}`}
                  className="block relative w-full h-full flex flex-row"
                >
              <div className={`${listStyles.typeColumn} ${item.searchable_type === "topic" ? "bg-topic" : ""}`} style={item.searchable_type === "topic" ? { backgroundImage: "url(/images/topics-bg.png)" } : {}}>
                <div className="flex items-center gap-2 z-10">
                  <div className={listStyles.iconWrapper}>
                    {item.searchable_type === "knowledge" && item.type && (
                      <>
                        {item.type === "report" && <ReportIcon width={24} height={24} />}
                        {item.type === "manual" && <ManualIcon width={24} height={24} />}
                        {item.type === "insight" && <InsightIcon width={24} height={24} />}
                        {item.type === "data" && <DataIcon width={24} height={24} />}
                        {item.type === "course" && <CourseIcon width={24} height={24} />}
                        {!item.type && <InsightIcon width={24} height={24} />}
                      </>
                    )}
                    
                  
                  </div>
                  
                  <Badge w="fit-content" className="capitalize z-10" variant="light">
                    {item.searchable_type === "knowledge" && item.type 
                      ? (typeof item.type === 'string' ? typeTranslations[item.type.toLowerCase()] || item.type : typeTranslations['insight'])
                      : item.searchable_type === "topic" ? translations.topic : translations.knowledge}
                  </Badge>
                </div>
                
                <div className={listStyles.titleSection}>
                  <Text
                    component="h3"
                    className={`${listStyles.title} amiri-bold`}
                  >
                    {item.title}
                  </Text>
                  {item.review && parseInt(item.review) >= 1 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Rating value={parseInt(item.review)} fractions={2} readOnly size="sm" />
                      <Text size="xs" fw={500} className="mx-2 text-sky-500">{parseInt(item.review).toFixed(1)}</Text>
                    </div>
                  )}
                </div>
                
                {item.searchable_type === "knowledge" && item.insighter && (
                  <div className="flex items-center gap-1 z-10">
                    <div className="relative">
                      <Avatar
                        src={(item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) && item.insighter.company?.logo ? 
                            item.insighter.company.logo : 
                            item.insighter.profile_photo_url}
                        radius="xl"
                        alt={item.insighter.name}
                        size="sm"
                        className="me-2 avatar-top-position"
                      >
                        {/* Show initials when no image is available */}
                        {(() => {
                          // For company or company-insighter roles: show initials if no company logo
                          if (item.insighter.roles.includes("company") || item.insighter.roles.includes("company-insighter")) {
                            return !item.insighter.company?.logo ? getInitials(item.insighter.name) : null;
                          }
                          // For regular insighter: show initials if no profile photo
                          return !item.insighter.profile_photo_url ? getInitials(item.insighter.name) : null;
                        })()}
                      </Avatar>
                      
                      {item.insighter.roles.includes("company-insighter") && item.insighter.profile_photo_url && (
                        <Avatar
                          src={item.insighter.profile_photo_url}
                          radius="xl"
                          size="xs"
                          className="absolute bottom-0 right-[10px] translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position"
                          alt={item.insighter.name}
                          style={{
                            boxShadow: '0 0 0 1px white',
                            position: 'absolute'
                          }}
                        />
                      )}
                      {item.insighter.roles.includes("company") && item.insighter.profile_photo_url && (
                        <Avatar
                          src={item.insighter.profile_photo_url}
                          radius="xl"
                          size="xs"
                          className="absolute bottom-0 right-[10px] translate-x-1/3 rounded-full translate-y-1/3 z-10 avatar-top-position"
                          alt={item.insighter.name}
                          style={{
                            boxShadow: '0 0 0 1px white',
                            position: 'absolute'
                          }}
                        />
                      )}
                    </div>
                    
                    <div>
                      <Text size="sm" fw={600} className="text-white capitalize">
                        {item.insighter.roles.includes("insighter") && item.insighter.name.toLowerCase()}

                        {item.insighter.roles.includes("company") && (
                          item.insighter.company
                            ? isRTL
                              ? ` ${item.insighter.company.legal_name}`
                              : `${item.insighter.company.legal_name}`
                            : translations.company
                        )}

                        {item.insighter.roles.includes("company-insighter") && (
                          item.insighter.company
                            ? isRTL
                              ? ` ${item.insighter.company.legal_name}`
                              : `${item.insighter.company.legal_name}`
                            : translations.company
                        )}
                      </Text>

                      <Text c="dimmed" size="xs" className="text-gray-300 capitalize">
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
              </div>
              
              {/* Only show contentColumn if there's content to display */}
              {(item.description || (item.searchable_type === "knowledge" && (item.paid !== undefined || item.published_at))) && (
                <div className={listStyles.contentColumn}>
                  {item.description && (
                    <Text className={listStyles.description} lineClamp={3}>
                      {truncateDescription(item.description, 50)}
                    </Text>
                  )}
                  
                  {item.searchable_type === "knowledge" && (
                    <div className={listStyles.detailsSection}>
                      <div className="flex items-center gap-3">
                        {item.paid !== undefined && (
                          <Badge
                            color={item.paid ? "yellow" : "green"}
                            variant="light"
                            className={listStyles.priceBadge}
                          >
                            {item.paid ? translations.paid : translations.free}
                          </Badge>
                        )}
                        
                        {item.published_at && (
                          <Text c="dimmed" size="xs" dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}>
                            {translations.posted} {safeFormatDate(item.published_at, currentLocale as string)}
                          </Text>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          className={`${listStyles.actionButton} ${
                            (readLaterStates[item.searchable_id] ?? item.is_read_later) 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-gray-100 text-gray-600'
                          } ${loadingStates[item.searchable_id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={(e) => handleReadLaterToggle(item, e)}
                          disabled={loadingStates[item.searchable_id]}
                          aria-label="Read Later"
                        >
                          {loadingStates[item.searchable_id] ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            (readLaterStates[item.searchable_id] ?? item.is_read_later) ? (
                              <BookmarkSolidIcon className="w-4 h-4" />
                            ) : (
                              <BookmarkIcon className="w-4 h-4" />
                            )
                          )}
                        </button>
                        <button 
                          className={listStyles.actionButton}
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Download"
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.7971 0.315674H5.74029C2.67502 0.315674 0.847656 2.14304 0.847656 5.20831V12.2567C0.847656 15.3304 2.67502 17.1578 5.74029 17.1578H12.7887C15.854 17.1578 17.6813 15.3304 17.6813 12.2651V5.20831C17.6898 2.14304 15.8624 0.315674 12.7971 0.315674ZM6.29608 7.87778C6.54029 7.63357 6.9445 7.63357 7.18871 7.87778L8.63713 9.3262V4.11357C8.63713 3.76831 8.92345 3.48199 9.26871 3.48199C9.61397 3.48199 9.90029 3.76831 9.90029 4.11357V9.3262L11.3487 7.87778C11.5929 7.63357 11.9971 7.63357 12.2413 7.87778C12.4856 8.12199 12.4856 8.5262 12.2413 8.77041L9.71502 11.2967C9.65608 11.3557 9.58871 11.3978 9.51292 11.4315C9.43713 11.4651 9.35292 11.482 9.26871 11.482C9.1845 11.482 9.10871 11.4651 9.0245 11.4315C8.94871 11.3978 8.88134 11.3557 8.82239 11.2967L6.29608 8.77041C6.05187 8.5262 6.05187 8.13041 6.29608 7.87778ZM14.5234 13.1325C12.8308 13.6967 11.054 13.983 9.26871 13.983C7.48345 13.983 5.7066 13.6967 4.01397 13.1325C3.68555 13.023 3.50871 12.6609 3.61818 12.3325C3.72766 12.0041 4.08134 11.8188 4.41818 11.9367C7.55081 12.9809 10.995 12.9809 14.1277 11.9367C14.4561 11.8273 14.8182 12.0041 14.9277 12.3325C15.0287 12.6694 14.8519 13.023 14.5234 13.1325Z" fill="#228BE6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Link>
          </Card>
            ))}
          </div>
        </div>
      )}

      {/* Topic items in grid view */}
      {topicItems.length > 0 && (
        <div className="mt-8">
          {isRTL ? (
            <h2 className="text-xl font-bold mb-3">{translations.topic}</h2>
          ) : (
            <h2 className="text-xl font-bold mb-3">{translations.topic}</h2>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {topicItems.map((item) => (
              <Card
                key={`${uniquePrefix}-topic-${item.searchable_id}`}
                withBorder
                padding="lg"
                radius="xs"
                className={cardStyles.card}
                data-aos="fade-up"
                component="div"
              >
                <Link
                  href={`/${currentLocale}/${item.url}`}
                  className="block relative h-full flex flex-col"
                >
                  <div className={`${cardStyles.darkSection} bg-topic`} style={{ backgroundImage: "url(/images/topics-bg.png)" }}>
                    <div>
                      <div className="flex items-center mb-3">
                        <Badge color="yellow" w="fit-content" className="capitalize" variant="light">
                          {translations.topic}
                        </Badge>
                      </div>
                      <Text
                        fw={700}
                        className={cardStyles.title}
                        lineClamp={2}
                      >
                        {item.title}
                      </Text>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Truncate description to avoid very long text
function truncateDescription(description: string | null, wordLimit: number = 30): string {
  if (!description) return "";

  // Remove HTML tags to get plain text
  const plainText = description.replace(/<[^>]*>/g, "");

  const words = plainText.split(/\s+/);
  if (words.length <= wordLimit) return plainText;

  return words.slice(0, wordLimit).join(" ") + "...";
}
