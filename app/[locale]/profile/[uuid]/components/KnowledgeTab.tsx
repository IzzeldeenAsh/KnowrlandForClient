"use client";

import React from "react";
import { IconFilter } from "@tabler/icons-react";
import KnowledgeGrid from "@/app/[locale]/topic/[id]/[slug]/KnowledgeGrid";
import { useTranslations } from "next-intl";
import styles from "../profile.module.css";

interface KnowledgeData {
  data: any[];
  meta: {
    current_page: number;
    last_page: number;
    links: Array<{
      label: string;
      url: string | null;
      active: boolean;
    }>;
  };
  links: {
    prev: string | null;
    next: string | null;
  };
}

interface KnowledgeType {
  id: string | null;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
  filterClass: string;
}

interface KnowledgeTabProps {
  locale: string;
  isRTL: boolean;
  knowledgeData: KnowledgeData | null;
  loadingKnowledge: boolean;
  knowledgeTypes: KnowledgeType[];
  selectedType: string | null;
  profileData: any;
  handleTypeChange: (typeId: string | null) => void;
  handlePageChange: (page: number) => void;
  formatKnowledgeItems: () => any[];
}

export default function KnowledgeTab({
  locale,
  isRTL,
  knowledgeData,
  loadingKnowledge,
  knowledgeTypes,
  selectedType,
  profileData,
  handleTypeChange,
  handlePageChange,
  formatKnowledgeItems,
}: KnowledgeTabProps) {
  const t = useTranslations("ProfilePage");
  const filterT = useTranslations("Filters");

  return (
    <div className="py-8 px-6 md:px-10">
      {/* Knowledge Type Filters - always shown when knowledgeData exists */}
      {knowledgeData && (
        <div className="mb-10 flex items-center flex-wrap gap-2 justify-end">
          <div className="mr-1 opacity-60 flex items-center">
            <IconFilter size={16} className="mr-1" />
            <span className="text-xs font-medium">
              {filterT("filterBy")}:
            </span>
          </div>
          {knowledgeTypes.map((type) => {
            const isActive = selectedType === type.id;

            return (
              <button
                key={type.id || "all"}
                onClick={() => handleTypeChange(type.id)}
                className={`${styles.filterButton} ${
                  isActive
                    ? `${styles.filterButtonActive} ${type.filterClass}`
                    : ""
                }`}
              >
                <span
                  className={`flex items-center ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className={styles.iconWrapper}>
                    {type.icon(isActive)}
                  </span>
                  <span
                    className={`${
                      isRTL ? "me-2" : "ml-2"
                    } font-medium text-xs`}
                  >
                    {filterT(type.label)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {loadingKnowledge ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500"></div>
        </div>
      ) : knowledgeData && knowledgeData.data.length > 0 ? (
        <div>
          <KnowledgeGrid
            knowledge={formatKnowledgeItems()}
            topicName={profileData?.name || ""}
            showHeader={false}
            colNumbers={3}
            locale={locale}
            showInsighter={false}
          />

          {/* Pagination */}
          {knowledgeData.meta.last_page > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex space-x-1">
                <button
                  onClick={() =>
                    handlePageChange(
                      knowledgeData.meta.current_page - 1
                    )
                  }
                  disabled={!knowledgeData.links.prev}
                  className={`px-4 py-2 rounded-md ${
                    !knowledgeData.links.prev
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-200`}
                >
                  {isRTL ? t("next") : t("previous")}
                </button>

                {knowledgeData.meta.links
                  .filter(
                    (link) =>
                      !link.label.includes("Previous") &&
                      !link.label.includes("Next")
                  )
                  .map((link, index) => {
                    if (link.label === "...") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-4 py-2 text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={`page-${link.label}`}
                        onClick={() =>
                          link.url &&
                          handlePageChange(parseInt(link.label))
                        }
                        className={`px-4 py-2 rounded-md border ${
                          link.active
                            ? "bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}

                <button
                  onClick={() =>
                    handlePageChange(
                      knowledgeData.meta.current_page + 1
                    )
                  }
                  disabled={!knowledgeData.links.next}
                  className={`px-4 py-2 rounded-md ${
                    !knowledgeData.links.next
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-200`}
                >
                  {isRTL ? t("previous") : t("next")}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl text-center">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-full mb-4 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">
            {t("noKnowledgeItems")}
          </h3>
          <p className="text-gray-500">{t("contentUpdateSoon")}</p>
        </div>
      )}
    </div>
  );
}