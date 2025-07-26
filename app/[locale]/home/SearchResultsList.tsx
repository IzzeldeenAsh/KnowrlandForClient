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
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  React.useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);
  
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
      const slug = item.url.split('/').pop();
      const url = `https://api.knoldg.com/api/account/favorite/knowledge/${slug}`;

      console.log(`[Read Later] ${method} request to:`, url);
      console.log(`[Read Later] Current state:`, currentState, 'Item ID:', itemId, 'Slug:', slug);

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

      console.log(`[Read Later] Response status:`, response.status, 'Data:', response.data);

      // Check for successful responses (200, 201, 204)
      if (response.status >= 200 && response.status < 300) {
        setReadLaterStates(prev => ({ ...prev, [itemId]: !currentState }));
        console.log(`[Read Later] Success! New state:`, !currentState);
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
                  onClick={(e) => {
                    // Check if the URL is valid before navigation
                    if (!item.url || item.url.trim() === '') {
                      e.preventDefault();
                      console.error('Invalid URL for item:', item);
                      return;
                    }
                  }}
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
                        {isLoggedIn && (
                          <div className="relative">
                            {loadingStates[item.searchable_id] ? (
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              (item.searchable_id in readLaterStates ? readLaterStates[item.searchable_id] : item.is_read_later) ? (
                                <BookmarkSolidIcon 
                                  className="w-4 h-4 text-yellow-600 cursor-pointer hover:text-yellow-700 transition-colors"
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
                                <BookmarkIcon 
                                  className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-700 transition-colors"
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
