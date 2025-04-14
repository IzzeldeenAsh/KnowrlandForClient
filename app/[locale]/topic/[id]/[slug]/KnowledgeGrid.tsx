"use client";

import { Text, Card, Badge, Group, Avatar } from "@mantine/core";
import Link from "next/link";
import DataIcon from "@/components/icons/DataIcon";
import InsightIcon from "@/components/icons/InsightIcon";
import ManualIcon from "@/components/icons/ManualIcon";
import ReportIcon from "@/components/icons/ReportIcon";
import { formatDistanceToNow } from "date-fns";
import cardStyles from "./knowledge-card.module.css";
import { useParams } from "next/navigation";

interface KnowledgeGridProps {
  knowledge: KnowledgeItem[];
  topicName: string;
  showHeader?: boolean;
  colNumbers?: number;
  locale?: string;
}
export interface KnowledgeItem {
  slug: string;
  type: string;
  title: string;
  description: string;
  total_price: string;
  published_at: string;
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
}: KnowledgeGridProps) {
  const params = useParams();
  const currentLocale = locale || params.locale || "en";
  const isRTL = currentLocale === "ar";

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
      {showHeader && (
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-start'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{translations.knowledge}</h2>
          <p className="text-gray-600">{translations.exploreInsights}</p>
        </div>
      )}

      <div
        className={`grid sm:grid-cols-2 lg:grid-cols-${colNumbers} gap-4 max-w-7xl mx-auto`}
      >
        {knowledge.map((item: KnowledgeItem) => (
          <Card
            key={`${item.type}-${item.slug}`}
            withBorder
            padding="lg"
            radius="md"
            className={cardStyles.card}
            data-aos="fade-up"
            component={Link}
            href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`}
          >
            <Link
              href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`}
              className="block"
            >
              <Group gap="xs">
                {item.type === "report" && (
                  <ReportIcon width={24} height={24} />
                )}
                {item.type === "manual" && (
                  <ManualIcon width={24} height={24} />
                )}
                {item.type === "insight" && (
                  <InsightIcon width={24} height={24} />
                )}
                {item.type === "data" && <DataIcon width={24} height={24} />}
                <Badge w="fit-content" className="capitalize" variant="light">
                  {item.type}
                </Badge>
              </Group>
              <div className="flex flex-col ">
                <Text
                  fw={700}
                  className={cardStyles.title}
                  mt="xs"
                  lineClamp={3}
                >
                  {item.title}
                </Text>
                <Text
                  className={`${cardStyles.description} text-gray-500`}
                  mt="sm"
                >
                  {truncateDescription(item.description, 13)}
                </Text>
              </div>
            </Link>
            <div>
              <Group mt="lg">
                <Avatar
                  src={item.insighter.profile_photo_url}
                  radius="lg"
                  alt={item.insighter.name}
                  size="sm"
                >
                  {!item.insighter.profile_photo_url &&
                    getInitials(item.insighter.name)}
                </Avatar>

                <div>
                  <Text c="dimmed" size="xs">
                    {item.insighter.roles.includes("insighter") && translations.insighter}
                    {item.insighter.roles.includes("company") && translations.company}
                  </Text>
                  <Text fw={500} size="xs">
                    {item.insighter.name}
                  </Text>
                </div>
              </Group>

              <Card.Section className={cardStyles.footer}>
                <Group justify="space-between">
                  <Text c="dimmed" size="xs">
                    {translations.posted} {formatPublishedDate(item.published_at)}
                  </Text>
                  <Badge
                    color={item.total_price === "0" ? "green" : "yellow"}
                    variant="light"
                  >
                    {item.total_price === "0" ? translations.free : translations.paid}
                  </Badge>
                </Group>
              </Card.Section>
            </div>
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
