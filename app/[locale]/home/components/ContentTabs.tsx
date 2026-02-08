'use client'

interface ContentTabsProps {
  activeTab: string | null;
  setActiveTab: (tab: string) => void;
  locale: string;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeTab, setActiveTab, locale }) => {
  const isRtl = locale === 'ar';
  
  const tabs = [
    { id: 'all', labelEn: 'All', labelAr: 'الكل' },
    { id: 'data', labelEn: 'Data', labelAr: 'البيانات' },
    { id: 'report', labelEn: 'Reports', labelAr: 'التقارير' },
    { id: 'insight', labelEn: 'Insights', labelAr: 'المستندات' },
    { id: 'manual', labelEn: 'Manuals', labelAr: 'الأدلة' },
    { id: 'course', labelEn: 'Courses', labelAr: 'الدورات' },
  ];
  
  return (
    <div className="w-full mb-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === tab.id ? 'text-[#299af8] border-b-2 border-[#299af8]' : 'text-gray-500'
            }`}
          >
            {locale === 'ar' ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentTabs;
