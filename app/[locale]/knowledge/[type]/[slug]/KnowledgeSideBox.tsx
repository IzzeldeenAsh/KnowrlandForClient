'use client'
import { DocumentTextIcon, GlobeAltIcon, CalendarIcon, ClockIcon, BuildingLibraryIcon, TruckIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';

interface Document {
  file_extension: string;
}

interface EconomicBloc {
  id: number;
  name: string;
}

interface KnowledgeSideBoxProps {
  total_price: string;
  documents: Document[];
  language: string;
  isic_code?: {
    name: string;
    key: number;
  };
  hs_code?: any;
  published_at: string;
  economic_blocs?: EconomicBloc[];
  regions?: any;
  countries?: any;
  locale?: string;
}

const KnowledgeSideBox = ({
  total_price,
  documents,
  language,
  isic_code,
  hs_code,
  published_at,
  economic_blocs,
  regions,
  countries,
  locale
}: KnowledgeSideBoxProps) => {
  const params = useParams();
  const currentLocale = locale || params.locale as string || 'en';
  const isRTL = currentLocale === 'ar';
  
  // Translations
  const translations = {
    documents: isRTL ? '\u0627\u0644\u0645\u0633\u062a\u0646\u062f\u0627\u062a' : 'Documents',
    documentsLanguage: isRTL ? '\u0644\u063a\u0629 \u0627\u0644\u0645\u0633\u062a\u0646\u062f\u0627\u062a' : 'Documents Language',
    isicCode: isRTL ? '\u0631\u0645\u0632 ISIC' : 'ISIC Code',
    hsCode: isRTL ? '\u0631\u0645\u0632 HS' : 'HS Code',
    economicBloc: isRTL ? '\u0627\u0644\u0643\u062a\u0644\u0629 \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f\u064a\u0629' : 'Economic Block',
    region: isRTL ? '\u0627\u0644\u0645\u0646\u0637\u0642\u0629' : 'Region',
    country: isRTL ? '\u0627\u0644\u062f\u0648\u0644\u0629' : 'Country',
    publishedAt: isRTL ? '\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0646\u0634\u0631' : 'Published At',
    lastUpdate: isRTL ? '\u0622\u062e\u0631 \u062a\u062d\u062f\u064a\u062b' : 'Last Update',
    oneTimePurchase: isRTL ? '\u0634\u0631\u0627\u0621 \u0644\u0645\u0631\u0629 \u0648\u0627\u062d\u062f\u0629' : 'One time purchase',
    buyNow: isRTL ? '\u0627\u0634\u062a\u0631\u064a \u0627\u0644\u0622\u0646' : 'Buy Now',
    addToCart: isRTL ? '\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629' : 'Add to Cart',
    na: isRTL ? '\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631' : 'N/A'
  };

  const documentCounts = documents.reduce((acc: { [key: string]: number }, doc) => {
    const ext = doc.file_extension.toLowerCase();
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="tp-course-details2-widget sticky max-w-[400px] " dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="p-4">
        <div className="text-center mb-4">
          <span className='text-3xl font-bold'>  ${total_price}</span>   
          <span className="text-md text-gray-500 ml-2 capitalize">{translations.oneTimePurchase}</span>
        </div>

        <div className="space-y-3 mb-4">
          <button className="w-full font-semibold bg-gradient-to-r from-sky-400 to-sky-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors">
            {translations.buyNow}
          </button>
          <button className="w-full font-semibold  bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
            {translations.addToCart}
          </button>
        </div>

        <div className="space-y-3">
          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              {translations.documents}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(documentCounts).map(([ext, count]) => {
                let bgColor = "bg-gray-100";
                if (["doc", "docx"].includes(ext)) {
                  bgColor = "bg-blue-100 text-blue-700";
                } else if (["ppt", "pptx", "pdf"].includes(ext)) {
                  bgColor = "bg-red-100 text-red-700";
                } else if (["csv", "xls", "xlsx"].includes(ext)) {
                  bgColor = "bg-green-100 text-green-700";
                } else {
                  bgColor = "bg-gray-100 text-gray-700";
                }
                return (
                  <span key={ext} className={`px-2 py-1 uppercase ${bgColor} rounded-full text-sm`}>
                    {count} {ext}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <GlobeAltIcon className="w-5 h-5 mr-2" />
              {translations.documentsLanguage}
            </span>
            <span className="block mt-1 capitalize">{language}</span>
          </div>

          {isic_code && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-gray-700">
                <BuildingLibraryIcon className="w-5 h-5 mr-2" />
                {translations.isicCode}
              </span>
              <div className="group relative inline-block">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mt-1">
                  {isic_code.key}
                </span>
                <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-white p-2 text-xs text-gray-700 shadow-lg border border-gray-200 group-hover:block">
                  {isic_code.name}
                </span>
              </div>
            </div>
          )}

          {hs_code && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span>
                <TruckIcon className="w-5 h-5 mr-2" />
                {translations.hsCode}
              </span>
              <span className="block mt-1">{hs_code}</span>
            </div>
          )}

          {
            economic_blocs && economic_blocs.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2" />
                  {translations.economicBloc}
                </span>
                <div className="flex flex-wrap gap-1">
                  {economic_blocs.map((economicBloc) => (
                    <span key={economicBloc.id} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                      {economicBloc.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          {
            regions && regions.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2" />
                  {translations.region}
                </span>
                <div className="flex flex-wrap gap-1">
                  {regions.map((region:any) => (
                    <span key={region.id} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                      {region.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          {
            countries && countries.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2" />
                  {translations.country}
                </span>
                <div className="flex flex-wrap justify-end gap-1">
                  {countries.map((country:any) => (
                    <span key={country.id} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          }

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <CalendarIcon className="w-5 h-5 mr-2" />
              {translations.publishedAt}
            </span>
            <span className="block mt-1">
              {published_at ? new Date(published_at).toLocaleDateString(isRTL ? 'ar-SA' : undefined) : translations.na}
            </span>
          </div>

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <ClockIcon className="w-5 h-5 mr-2" />
              {translations.lastUpdate}
            </span>
            <span className="block mt-1">{translations.na}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSideBox;
