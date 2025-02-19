'use client';

import { useState } from "react";
import Overview from "./Overview";
import { KnowledgeDetails } from "./types";
import Reviews from "./Reviews";

function TabContent({ activeTab, knowledge }: { activeTab: string; knowledge: KnowledgeDetails }) {
  switch (activeTab) {
    case "Overview":
      return <Overview knowledge={knowledge} />;
      case "Reviews":
        return <Reviews knowledgeSlug={knowledge.slug} reviews={knowledge.review} />;
    case "Ask":
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Ask</h3>
          <p className="text-gray-600">No comments available yet.</p>
        </div>
      );
      case "Meet":
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Meet the insighter</h3>
            <p className="text-gray-600">No comments available yet.</p>
          </div>
        );
    default:
      return null;
  }
}

export default function TabsContent({ knowledge }: { knowledge: KnowledgeDetails }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 knowledge-tab-nav relative " aria-label="Tabs">
      
          {["Overview", "Reviews", "Ask Insighter", "Meet the insighter"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${tab === activeTab
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
        <TabContent activeTab={activeTab} knowledge={knowledge} />
      </div>
    </div>
  );
}
