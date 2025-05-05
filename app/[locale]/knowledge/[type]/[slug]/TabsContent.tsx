'use client';

import { useState, useCallback, useEffect } from "react";
import Overview from "./Overview";
import { KnowledgeDetails } from "./types";
import Reviews from "./Reviews";
import AskInsighter from "./AskInsighter";
import { useParams, useRouter, useSearchParams } from "next/navigation";

function TabContent({ activeTab, knowledge, onRefreshData }: { activeTab: string; knowledge: KnowledgeDetails; onRefreshData?: () => void }) {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';

  // Translations for tab content
  const translations = {
    noCommentsYet: isRTL ? 'لا توجد تعليقات بعد.' : 'No comments available yet.',
    meetInsighter: isRTL ? 'قابل الخبير' : 'Meet the insighter'
  };

  switch (activeTab) {
    case "Overview":
      return <Overview knowledge={knowledge} />;
    case "Reviews":
      return <Reviews knowledgeSlug={knowledge.slug} reviews={knowledge.review} is_review={knowledge.is_review ? true : false} />;
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

export default function TabsContent({ knowledge }: { knowledge: KnowledgeDetails }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check for tab query parameter on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'ask') {
      setActiveTab("Ask");
    }
  }, [searchParams]);

  // Function to refresh the knowledge data by reloading the page
  const refreshData = useCallback(() => {
    console.log('[TabsContent] Refreshing knowledge data...');
    // Force a refresh of the current page
    router.refresh();
  }, [router]);
  
  // Translations for tab labels
  const translations = {
    overview: isRTL ? 'نظرة عامة' : 'Overview',
    reviews: isRTL ? 'المراجعات' : 'Reviews',
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
    <div className="mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex  knowledge-tab-nav relative " aria-label="Tabs">
      
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tabMapping[tab])}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mx-4
                ${tabMapping[tab] === activeTab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        <TabContent activeTab={activeTab} knowledge={knowledge} onRefreshData={refreshData} />
      </div>
    </div>
  );
}
