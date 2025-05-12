"use client";

import { Text, Card, Badge, Group, Avatar, Rating } from "@mantine/core";
import Link from "next/link";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import { formatDistanceToNow } from "date-fns";
import cardStyles from "./knowledge-card.module.css";
import { useParams } from "next/navigation";
import Image from "next/image";

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
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatPublishedDate(dateString: string) {
  // Ensure we're working with UTC time to avoid server/client mismatches
  const date = new Date(dateString);
  const utcDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  ));
  
  return formatDistanceToNow(utcDate, { addSuffix: true });
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

  const typeTranslations: Record<string, string> = {
    report: isRTL ? "تقرير" : "Reports",
    manual: isRTL ? "دليل" : "Manuals",
    insight: isRTL ? "رؤى" : "Insights",
    data: isRTL ? "بيانات" : "Data",
    article: isRTL ? "صناعات" : "Articles",
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
    company: isRTL ? "شركة" : "Company"
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
              className="block relative h-full"
            >
              <div className={cardStyles.darkSection}>
                <div>
                  <Badge w="fit-content" className="capitalize mb-3  reflex items-center" variant="light" style={{padding: '0'}}>
                    <span className="flex items-center px-0">
                    {item.type === "report" && <ReportIcon width={20} height={20} />}
                    {item.type === "manual" && <ManualIcon width={20} height={20} />}
                    {item.type === "insight" && <InsightIcon width={20} height={20} />}
                    {item.type === "data" && <DataIcon width={20} height={20} />}
                    <span className="mx-2 px-0">{typeTranslations[item.type.toLowerCase()] || item.type}</span>
                    </span>
                  </Badge>
                  
                  <Text
                    fw={700}
                    className={cardStyles.title}
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
              
              <div className={cardStyles.whiteSection}>
                {/* Top row with insighter info and action buttons */}
                <div className="flex justify-between items-center">
                  {showInsighter && (
                    <div className="flex items-center">
                      <Avatar
                        src={item.insighter.profile_photo_url}
                        radius="xl"
                        alt={item.insighter.name}
                        size="md"
                        className={cardStyles.avatar}
                      >
                        {!item.insighter.profile_photo_url &&
                          getInitials(item.insighter.name)}
                      </Avatar>

                      <div className="ms-3">
                        <Text fw={600} size="sm">
                          {item.insighter.name}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {item.insighter.roles.includes("insighter") && translations.insighter}
                          {item.insighter.roles.includes("company") && translations.company}
                        </Text>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button 
                      className={cardStyles.actionButton}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Bookmark"
                    >
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2161 1.89478H6.09818C4.3045 1.89478 2.84766 3.36004 2.84766 5.1453V17.0106C2.84766 18.5264 3.93397 19.1664 5.2645 18.4337L9.37397 16.1516C9.81187 15.9074 10.5192 15.9074 10.9487 16.1516L15.0582 18.4337C16.3887 19.1748 17.475 18.5348 17.475 17.0106V5.1453C17.4666 3.36004 16.0098 1.89478 14.2161 1.89478ZM12.2624 9.81056H10.7887V11.3348C10.7887 11.68 10.5024 11.9664 10.1571 11.9664C9.81187 11.9664 9.52555 11.68 9.52555 11.3348V9.81056H8.05187C7.7066 9.81056 7.42029 9.52425 7.42029 9.17899C7.42029 8.83372 7.7066 8.54741 8.05187 8.54741H9.52555V7.12425C9.52555 6.77899 9.81187 6.49267 10.1571 6.49267C10.5024 6.49267 10.7887 6.77899 10.7887 7.12425V8.54741H12.2624C12.6077 8.54741 12.894 8.83372 12.894 9.17899C12.894 9.52425 12.6077 9.81056 12.2624 9.81056Z" fill="#228BE6"/>
                      </svg>
                    </button>
                    <button 
                      className={cardStyles.actionButton}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Download"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7971 0.315674H5.74029C2.67502 0.315674 0.847656 2.14304 0.847656 5.20831V12.2567C0.847656 15.3304 2.67502 17.1578 5.74029 17.1578H12.7887C15.854 17.1578 17.6813 15.3304 17.6813 12.2651V5.20831C17.6898 2.14304 15.8624 0.315674 12.7971 0.315674ZM6.29608 7.87778C6.54029 7.63357 6.9445 7.63357 7.18871 7.87778L8.63713 9.3262V4.11357C8.63713 3.76831 8.92345 3.48199 9.26871 3.48199C9.61397 3.48199 9.90029 3.76831 9.90029 4.11357V9.3262L11.3487 7.87778C11.5929 7.63357 11.9971 7.63357 12.2413 7.87778C12.4856 8.12199 12.4856 8.5262 12.2413 8.77041L9.71502 11.2967C9.65608 11.3557 9.58871 11.3978 9.51292 11.4315C9.43713 11.4651 9.35292 11.482 9.26871 11.482C9.1845 11.482 9.10871 11.4651 9.0245 11.4315C8.94871 11.3978 8.88134 11.3557 8.82239 11.2967L6.29608 8.77041C6.05187 8.5262 6.05187 8.13041 6.29608 7.87778ZM14.5234 13.1325C12.8308 13.6967 11.054 13.983 9.26871 13.983C7.48345 13.983 5.7066 13.6967 4.01397 13.1325C3.68555 13.023 3.50871 12.6609 3.61818 12.3325C3.72766 12.0041 4.08134 11.8188 4.41818 11.9367C7.55081 12.9809 10.995 12.9809 14.1277 11.9367C14.4561 11.8273 14.8182 12.0041 14.9277 12.3325C15.0287 12.6694 14.8519 13.023 14.5234 13.1325Z" fill="#228BE6"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Bottom row with published date and price badge */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <Text c="dimmed" size="xs">
                    {translations.posted} {formatPublishedDate(item.published_at)}
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
            </Link>
          </Card>
        ))}
        {knowledge.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
            <div className="rounded-full bg-gray-50 p-4 mb-3"></div>
            <p className="text-gray-500 text-sm">
              {translations.noItems}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
