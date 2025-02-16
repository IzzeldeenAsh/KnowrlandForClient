"use client";

import Link from "next/link";
import { Card, Group, Text, Badge, Avatar } from "@mantine/core";
import { formatDistanceToNow } from "date-fns";
import { KnowledgeDetails } from "@/app/knowledge/[type]/[slug]/types";
import listStyles from "./knowledge-list.module.css";
import DataIcon from "../icons/DataIcon";
import InsightIcon from "../icons/InsightIcon";
import ManualIcon from "../icons/ManualIcon";
import ReportIcon from "../icons/ReportIcon";

interface KnowledgeListProps {
  knowledge: KnowledgeDetails[];
}

export default function KnowledgeList({ knowledge }: KnowledgeListProps) {
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
              <Link href={`/knowledge/${item.type}/${item.slug}`}>
                <Text className={listStyles.title}>{item.title}</Text>
              </Link>

              <Text className={listStyles.description} mt="sm">
                {item.description}
              </Text>
            </div>
          </Group>
          <Group mt="xs">
            <Avatar
              src={item.insighter?.profile_photo_url || undefined}
              radius="xl"
              size="sm"
            />
            <Text size="sm">{item.insighter?.name}</Text>
          </Group>
          <Text className={listStyles.meta} mt="xs">
            Posted {formatDistanceToNow(new Date(item.published_at))} ago
          </Text>
        </Card>
      ))}
      {knowledge.length === 0 && (
        <Text ta="center" color="gray">
          No knowledge items available yet.
        </Text>
      )}
    </div>
  );
}
