'use client'
import { DocumentTextIcon, GlobeAltIcon, CalendarIcon, ClockIcon, BuildingLibraryIcon, TruckIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

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
  } | any[];
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
  
  // Share functionality
  const handleShare = () => {
    // Get current URL
    const url = window.location.href;
    const title = document.title;
    const text = 'Check out this knowledge resource: ';
    
    // Try using Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      })
      .catch((error) => console.error('Error sharing:', error));
    }
  };
  
  const getShareLinks = () => {
    // Get current URL
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent('Check out this knowledge resource: ');
    
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text} ${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
    };
  };
  
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
    na: isRTL ? '\u063a\u064a\u0631 \u0645\u062a\u0648\u0641\u0631' : 'N/A',
    free: isRTL ? '\u0645\u062c\u0627\u0646\u064a' : 'Free',
    share: isRTL ? '\u0645\u0634\u0627\u0631\u0643\u0629' : 'Share'
  };

  const documentCounts = documents.reduce((acc: { [key: string]: number }, doc) => {
    const ext = doc.file_extension.toLowerCase();
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});

  // Check if price is 0 or a string representing 0
  const isFree = total_price === '0' || parseFloat(String(total_price)) === 0;

  return (
    <div className="tp-course-details2-widget sticky max-w-[400px] " dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="p-4">
        <div className="text-center mb-4">
          {isFree ? (
            <span className='text-3xl font-bold text-green-600'>{translations.free}</span>
          ) : (
            <span className='text-3xl font-bold'>  ${total_price}</span>   
          )}
          {!isFree && (
            <span className="text-md text-gray-500 ml-2 capitalize">{translations.oneTimePurchase}</span>
          )}
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

          {isic_code && !Array.isArray(isic_code) && isic_code.key && (
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
          {isic_code && Array.isArray(isic_code) && isic_code.length > 0 && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-gray-700">
                <BuildingLibraryIcon className="w-5 h-5 mr-2" />
                {translations.isicCode}
              </span>
              <div className="flex flex-wrap gap-1">
                {isic_code.map((code, index) => (
                  <span key={index} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                    {code.name || code.key || JSON.stringify(code)}
                  </span>
                ))}
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

          {/* Only show Last Update if it has a value */}
          {false && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span>
                <ClockIcon className="w-5 h-5 mr-2" />
                {translations.lastUpdate}
              </span>
              <span className="block mt-1">{translations.na}</span>
            </div>
          )}
          
          {/* Share Button with Animation */}
          <div className="mt-5 flex justify-center">
            <button 
              className="share-button w-[200px] relative w-full py-3 px-6 font-medium text-sm text-white bg-none border-none outline-none overflow-hidden cursor-pointer rounded-[24px]"
              onClick={handleShare}
            >
              <span className="btn-text inline-flex align-middle transition-all duration-300 ease-out-cubic">{translations.share}</span>
              <span className="btn-icon inline-flex align-middle ml-2 transition-all duration-300 ease-out-cubic">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
                    fill="#ffffff"
                  ></path>
                </svg>
              </span>
              <ul className="social-icons absolute top-1/2 left-0 right-0 flex m-0 p-0 list-none transform -translate-y-1/2">
                {/* Facebook */}
                <li className="flex-1">
                  <a href={typeof window !== 'undefined' ? getShareLinks().facebook : '#'} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     onClick={(e) => {
                       e.stopPropagation();
                       window.open(getShareLinks().facebook, 'facebook-share', 'width=580,height=296');
                       return false;
                     }}
                     className="social-icon inline-flex align-middle transform translate-y-[55px] transition-all duration-300 ease-out-cubic hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                </li>
                {/* WhatsApp */}
                <li className="flex-1">
                  <a href={typeof window !== 'undefined' ? getShareLinks().whatsapp : '#'} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     onClick={(e) => e.stopPropagation()}
                     className="social-icon inline-flex align-middle transform translate-y-[55px] transition-all duration-300 ease-out-cubic hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>
                </li>
                {/* X (Twitter) */}
                <li className="flex-1">
                  <a href={typeof window !== 'undefined' ? getShareLinks().twitter : '#'} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     onClick={(e) => {
                       e.stopPropagation();
                       window.open(getShareLinks().twitter, 'twitter-share', 'width=580,height=296');
                       return false;
                     }}
                     className="social-icon inline-flex align-middle transform translate-y-[55px] transition-all duration-300 ease-out-cubic hover:opacity-50">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.98 20" width="16" height="16">
                      <path className="fill-white" d="M11.89,8.47L19.34,0h-1.76l-6.46,7.35L5.95,0H0l7.8,11.12L0,20h1.76l6.82-7.77,5.45,7.77h5.95M2.4,1.3h2.71l12.46,17.46h-2.71"/>
                    </svg>
                  </a>
                </li>
                {/* LinkedIn */}
                <li className="flex-1">
                  <a href={typeof window !== 'undefined' ? getShareLinks().linkedin : '#'} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     onClick={(e) => {
                       e.stopPropagation();
                       window.open(getShareLinks().linkedin, 'linkedin-share', 'width=580,height=296');
                       return false;
                     }}
                     className="social-icon inline-flex align-middle transform translate-y-[55px] transition-all duration-300 ease-out-cubic hover:opacity-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS for Share Button Animation */}
      <style jsx>{`
        .share-button {
          --btn-color: #0ca5e9;
          position: relative;
          font-family: Roboto, sans-serif;
          transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        
        .share-button::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: var(--btn-color);
          border-radius: 24px;
          transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        
        .share-button .btn-text {
          transition-delay: 0.05s;
        }
        
        .share-button .btn-icon {
          transition-delay: 0.1s;
        }
        
        .share-button:hover::before {
          transform: scale(1.1);
        }
        
        .share-button:hover .btn-text,
        .share-button:hover .btn-icon {
          transform: translateY(-55px);
        }
        
        .share-button:hover .social-icons li:nth-child(1) a {
          transform: translateY(0);
          transition-delay: 0.15s;
        }
        
        .share-button:hover .social-icons li:nth-child(2) a {
          transform: translateY(0);
          transition-delay: 0.2s;
        }
        
        .share-button:hover .social-icons li:nth-child(3) a {
          transform: translateY(0);
          transition-delay: 0.25s;
        }
        
        .share-button:hover .social-icons li:nth-child(4) a {
          transform: translateY(0);
          transition-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeSideBox;
