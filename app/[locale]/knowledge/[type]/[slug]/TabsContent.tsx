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

  // Pass onRefreshData to Reviews tab as well
  switch (activeTab) {
    case "Overview":
      return <Overview knowledge={knowledge} />;
    case "Reviews":
      return <Reviews 
        knowledgeSlug={knowledge.slug} 
        reviews={knowledge.review} 
        is_review={knowledge.is_review ? true : false} 
        is_owner={knowledge.is_owner} 
      />;
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

  // Enhanced function to refresh the knowledge data
  const refreshData = useCallback(() => {
    console.log('[TabsContent] Refreshing knowledge data...');
    
    // Force a hard refresh to ensure data is updated
    router.refresh();
    
    // After a short delay, reload the page to guarantee fresh data
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 1000);
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
                  router.refresh();
                }
              }}
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
        <TabContent activeTab={activeTab} knowledge={knowledgeData} onRefreshData={refreshData} />
      </div>
    </div>
  );
}
