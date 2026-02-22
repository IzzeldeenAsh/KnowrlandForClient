'use client';

import { useState, useCallback, useEffect, useRef } from "react";
import Overview from "./Overview";
import { KnowledgeDetails } from "./types";
import Reviews from "./Reviews";
import AskInsighter from "./AskInsighter";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getAuthToken } from "@/lib/authToken";

function TabContent({ activeTab, knowledge, knowledgeSlug, onRefreshData }: { activeTab: string; knowledge: KnowledgeDetails; knowledgeSlug: string; onRefreshData?: () => void | Promise<void> }) {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';

  // Translations for tab content
  const translations = {
    noCommentsYet: isRTL ? 'لا توجد تعليقات بعد.' : 'No comments available yet.',
    meetInsighter: isRTL ? 'قابل الخبير' : 'Meet the insighter'
  };

  // Pass onRefreshData to Reviews tab as well
  switch (activeTab) {
    case "Overview":
      return <Overview knowledge={knowledge} knowledgeSlug={knowledgeSlug} />;
    case "Reviews":
      // Determine if the user has purchased at least one document
      const hasPurchasedAny =
        knowledge.purchased_status === 'purchased' ||
        knowledge.purchased_status === 'partial-purchased' ||
        (Array.isArray(knowledge.documents) && knowledge.documents.some((doc) => !!doc.is_purchased));
      return (
        <Reviews
          knowledgeSlug={knowledge.slug}
          reviews={knowledge.review}
          is_review={knowledge.is_review ? true : false}
          is_owner={knowledge.is_owner}
          hasPurchasedAny={hasPurchasedAny}
          onRefreshData={onRefreshData}
        />
      );
    case "Ask":
      return <AskInsighter knowledgeSlug={knowledge.slug} questions={knowledge.questions} is_owner={knowledge.is_owner} onRefreshData={onRefreshData} />;
    case "Meet":
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">{translations.meetInsighter}</h3>
          <p className="text-gray-600">{translations.noCommentsYet}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function TabsContent({ knowledge, knowledgeSlug }: { knowledge: KnowledgeDetails; knowledgeSlug: string }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Track knowledge data updates
  const [knowledgeData, setKnowledgeData] = useState(knowledge);
  
  // Update knowledgeData when prop changes
  useEffect(() => {
    setKnowledgeData(knowledge);
  }, [knowledge]);
  
  // Check for tab query parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'ask') {
      setActiveTab("Ask");
    } else if (tabParam === 'reviews') {
      setActiveTab("Reviews");
    }
  }, [searchParams]);

  const refreshInFlightRef = useRef(false);

  // Refresh knowledge data without hard reloading the page
  const refreshData = useCallback(async () => {
    if (refreshInFlightRef.current) return;
    refreshInFlightRef.current = true;

    try {
      const token = getAuthToken();

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      if (token) {
        (headers as Record<string, string>).Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.foresighta.co/api/platform/industries/knowledge/${knowledgeSlug}`,
        {
          method: "GET",
          headers,
          cache: "no-store",
        }
      );

      if (response.ok) {
        const json = await response.json();
        if (json?.data) {
          setKnowledgeData(json.data);
          return;
        }
      }

      // Fallback: soft refresh (no full page reload)
      router.refresh();
    } catch (e) {
      // Fallback: soft refresh (no full page reload)
      router.refresh();
    } finally {
      refreshInFlightRef.current = false;
    }
  }, [knowledgeSlug, locale, router]);
  
  // Translations for tab labels
  const translations = {
    overview: isRTL ? 'نظرة عامة' : 'Overview',
    reviews: isRTL ? 'تقييمات وآراء' : 'Reviews',
    askInsighter: isRTL ? 'اسأل الخبير' : 'Ask Insighter'
  };

  // Map display labels to internal tab keys
  const tabMapping = {
    [translations.overview]: "Overview",
    [translations.reviews]: "Reviews",
    [translations.askInsighter]: "Ask"
  };

  const tabs = [translations.overview, translations.reviews, translations.askInsighter];

  return (
    <div className="mb-6" dir={isRTL ? 'rtl' : 'ltr' }>
      <div className="border-b border-gray-200">
      <div className="flex flex-col justify-center ps-4 sm:ps-8 w-fit  sm:mt-0 sm:ms-auto block sm:hidden">
           <Link
              href={`/${locale}/profile/${knowledge.insighter.uuid}?entity=insighter&tab=meet`}
              className="relative inline-flex shadow-none items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-md shadow-lg hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 to-teal-400 opacity-20 animate-ping [animation-duration:2.5s]"></span>
              <span className="relative font-semibold capitalize">
                {locale ==='en' ? 'Meet ' + knowledge.insighter.name.toLowerCase() : 'قابل الخبير ' + knowledge.insighter.name.toLowerCase()}
              </span>
            </Link>
           </div>
        <nav className="-mb-px flex  knowledge-tab-nav relative" aria-label={isRTL ? 'تبويبات المحتوى' : 'Content tabs'} role="tablist">
      
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                const tabKey = tabMapping[tab];
                setActiveTab(tabKey);
                
                // Update URL with tab query parameter when changing tabs
                const url = new URL(window.location.href);
                if (tabKey === 'Ask') {
                  url.searchParams.set('tab', 'ask');
                } else if (tabKey === 'Reviews') {
                  url.searchParams.set('tab', 'reviews');
                } else {
                  // Remove tab parameter for other tabs
                  url.searchParams.delete('tab');
                }
                
                // Update URL without refreshing the page
                window.history.pushState({}, '', url);
                
                // If switching to Reviews tab, force a refresh to get the latest reviews
                if (tabKey === 'Reviews') {
                  refreshData();
                }
              }}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mx-4 transition-all duration-200
                ${tabMapping[tab] === activeTab
                  ? "border-blue-500 text-blue-600 "
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"}
              `}
              role="tab"
              aria-selected={tabMapping[tab] === activeTab}
              aria-controls={`tabpanel-${tabMapping[tab]}`}
              id={`tab-${tabMapping[tab]}`}
              tabIndex={tabMapping[tab] === activeTab ? 0 : -1}
            >
              {tab}
            </button>
          ))}
           {!knowledgeData.is_owner && (
           <div className="flex flex-col justify-center ps-4 sm:ps-8  sm:mt-0 sm:ms-auto hidden sm:block">
           <Link
              href={`/${locale}/profile/${knowledge.insighter.uuid}?entity=insighter&tab=meet`}
              className="relative inline-flex shadow-none items-center gap-2 px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-md shadow-lg hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <span className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 to-teal-400 opacity-20 animate-ping [animation-duration:2.5s]"></span>
              <span className="relative font-semibold capitalize">
                {locale ==='en' ? 'Meet ' + knowledge.insighter.name.toLowerCase() : 'قابل الخبير ' + knowledge.insighter.name.toLowerCase()}
              </span>
            </Link>
           </div>
           )}
        </nav>
     
        
      </div>
      <div className="mt-6" role="tabpanel" id={`tabpanel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        <TabContent activeTab={activeTab} knowledge={knowledgeData} knowledgeSlug={knowledgeSlug} onRefreshData={refreshData} />
      </div>
     
    </div>
  );
}
