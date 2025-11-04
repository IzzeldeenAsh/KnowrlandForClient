"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, Group, Text, Badge, Avatar } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { KnowledgeDetails } from "@/app/[locale]/knowledge/[type]/[slug]/types";
import listStyles from "./knowledge-list.module.css";
import DataIcon from "../icons/DataIcon";
import InsightIcon from "../icons/InsightIcon";
import ManualIcon from "../icons/ManualIcon";
import ReportIcon from "../icons/ReportIcon";
import { useParams } from "next/navigation";

interface KnowledgeListProps {
  knowledge: KnowledgeItem[];
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

// Helper function to get initials from a name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function KnowledgeList({ knowledge, locale }: KnowledgeListProps) {
  const params = useParams();
  const currentLocale = locale || (params?.locale as string) || 'en';
  
  return (
    <div className="max-w-6xl mx-auto">
      {knowledge.map((item) => (
        <Card
          key={`${item.type}-${item.slug}`}
          withBorder
          className={listStyles.card}
          data-aos="fade-up"
        >
          <div className="flex justify-between w-100 mb-4">
            <Group gap="xs">
              {item.type === "report" && <ReportIcon width={24} height={24} />}
              {item.type === "manual" && <ManualIcon width={24} height={24} />}
              {item.type === "insight" && (
                <InsightIcon width={24} height={24} />
              )}
              {item.type === "data" && <DataIcon width={24} height={24} />}
              <Badge w="fit-content" className="capitalize" variant="light">
                {item.type}
              </Badge>
            </Group>
            <Badge
              variant="light"
              color={item.total_price === "0" ? "green" : "yellow"}
            >
              {item.total_price === "0" ? "FREE" : "PAID"}
            </Badge>
          </div>
          <Group>
            <div className="flex flex-col ">
              <Link href={`/${currentLocale}/knowledge/${item.type}/${item.slug}`}>
                <Text className={listStyles.title}>{item.title}</Text>
              </Link>

              <Text className={listStyles.description} dangerouslySetInnerHTML={{ __html: item.description }} />
            </div>
          </Group>
          <Group mt="xs">
            <Avatar
              src={item.insighter?.profile_photo_url || undefined}
              radius="xl"
              size="sm"
              bg="white"
              color="blue"
              styles={{ root: { border: '1px solid #e5e7eb' } }}
            >
              {!item.insighter?.profile_photo_url &&
                getInitials(item.insighter.name)}
            </Avatar>
            <Text size="sm">{item.insighter?.name}</Text>
          </Group>
          <Text className={listStyles.meta} mt="xs">
            Posted {formatDistanceToNow(new Date(item.published_at))} ago
          </Text>
        </Card>
      ))}
      {knowledge.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8">
          <Image
            src="/images/Search-Not-Found.svg"
            alt="No results found"
            width={300}
            height={200}
            className="mb-4"
          />
          <Text ta="center" color="gray">
            No insight items available yet.
          </Text>
        </div>
      )}
    </div>
  );
}
