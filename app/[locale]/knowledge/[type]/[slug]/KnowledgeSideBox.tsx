'use client'
import { DocumentTextIcon, GlobeAltIcon, CalendarIcon, ClockIcon, BuildingLibraryIcon, TruckIcon, GlobeAsiaAustraliaIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import FacebookIcon from '@/public/file-icons/facebook';
import LinkedinIcon from '@/public/file-icons/linkedin';
import InstagramIcon from '@/public/file-icons/instagram';
import WhatsappIcon from '@/public/file-icons/whatsapp';

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
  
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{
    economicBlocs: boolean;
    regions: boolean;
    countries: boolean;
  }>({
    economicBlocs: false,
    regions: false,
    countries: false,
  });
  
  // Function to toggle section expansion
  const toggleSection = (section: 'economicBlocs' | 'regions' | 'countries') => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  
  // Maximum number of items to show initially
  const MAX_VISIBLE_ITEMS = 3;
  
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
    documents: isRTL ? 'المستندات' : 'Documents',
    documentsLanguage: isRTL ? 'لغة المستندات' : 'Documents Language',
    isicCode: isRTL ? 'رمز ISIC' : 'ISIC Code',
    hsCode: isRTL ? 'رمز HS' : 'HS Code',
    economicBloc: isRTL ? 'الكتلة الاقتصادية' : 'Economic Block',
    region: isRTL ? 'المنطقة' : 'Region',
    country: isRTL ? 'الدولة' : 'Country',
    publishedAt: isRTL ? 'تاريخ النشر' : 'Published At',
    lastUpdate: isRTL ? 'آخر تحديث' : 'Last Update',
    oneTimePurchase: isRTL ? 'شراء لمرة واحدة' : 'One time purchase',
    buyNow: isRTL ? 'اشتري الآن' : 'Buy Now',
    addToCart: isRTL ?  'إضافة إلى حقيبة المشتريات' : 'Add to Cart',
    na: isRTL ? 'غير متوفر' : 'N/A',
    free: isRTL ? 'مجاني' : 'Free',
    share: isRTL ? 'مشاركة' : 'Share',
    showMore: isRTL ? 'عرض المزيد' : 'Show more',
    showLess: isRTL ? 'عرض أقل' : 'Show less',
    more: isRTL ? 'المزيد' : 'more'
  };

  const documentCounts = documents.reduce((acc: { [key: string]: number }, doc) => {
    const ext = doc.file_extension.toLowerCase();
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});

  // Check if price is 0 or a string representing 0
  const isFree = total_price === '0' || parseFloat(String(total_price)) === 0;

  return (
    <div className='tp-course-details2-widget'>
    <div className="tp-course-details2-widget-child rounded-lg  p-4 sticky max-w-[400px] " dir={isRTL ? 'rtl' : 'ltr'}>
      
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
          <button className="w-full font-semibold bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors">
            {translations.buyNow}
          </button>
          <button className="w-full font-semibold  bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
            {translations.addToCart}
          </button>
        </div>

        <div className="space-y-3">
          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <DocumentTextIcon className="w-5 h-5 mx-4" />
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
              <GlobeAltIcon className="w-5 h-5 mx-4" />
              {translations.documentsLanguage}
            </span>
            <span className="block mt-1 capitalize">{language}</span>
          </div>

          {isic_code && !Array.isArray(isic_code) && isic_code.key && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-gray-700">
                <BuildingLibraryIcon className="w-5 h-5 mx-4" />
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
                <BuildingLibraryIcon className="w-5 h-5 mx-4" />
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
              <span className="flex items-center gap-2 font-medium text-gray-700">
                <TruckIcon className="w-5 h-5 mx-4" />
                {translations.hsCode}
              </span>
              <span className={`block ${isRTL ? 'text-left' : 'text-right'}`}>
                {typeof hs_code === 'object' ? 
                  (hs_code.name || hs_code.key || JSON.stringify(hs_code)) : 
                  hs_code}
              </span>
            </div>
          )}

          {
            economic_blocs && economic_blocs.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5 mx-4" />
                  {translations.economicBloc}
                </span>
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {economic_blocs
                    .slice(0, expandedSections.economicBlocs ? economic_blocs.length : MAX_VISIBLE_ITEMS)
                    .map((economicBloc) => (
                      <span key={economicBloc.id} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                        {economicBloc.name}
                      </span>
                    ))}
                  {economic_blocs.length > MAX_VISIBLE_ITEMS && !expandedSections.economicBlocs && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1"
                      onClick={() => toggleSection('economicBlocs')}
                    >
                      +{economic_blocs.length - MAX_VISIBLE_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                    </button>
                  )}
                  {expandedSections.economicBlocs && economic_blocs.length > MAX_VISIBLE_ITEMS && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1"
                      onClick={() => toggleSection('economicBlocs')}
                    >
                      {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )
          }
          {
            regions && regions.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5 mx-4" />
                  {translations.region}
                </span>
                <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                  {regions
                    .slice(0, expandedSections.regions ? regions.length : MAX_VISIBLE_ITEMS)
                    .map((region:any) => (
                      <span key={region.id} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                        {region.name}
                      </span>
                    ))}
                  {regions.length > MAX_VISIBLE_ITEMS && !expandedSections.regions && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1"
                      onClick={() => toggleSection('regions')}
                    >
                      +{regions.length - MAX_VISIBLE_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                    </button>
                  )}
                  {expandedSections.regions && regions.length > MAX_VISIBLE_ITEMS && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1"
                      onClick={() => toggleSection('regions')}
                    >
                      {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )
          }
          {
            countries && countries.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5 mx-4" />
                  {translations.country}
                </span>
                <div className="flex flex-wrap justify-end gap-1 max-w-[60%]">
                  {countries
                    .slice(0, expandedSections.countries ? countries.length : MAX_VISIBLE_ITEMS)
                    .map((country:any) => (
                      <span key={country.id} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                        {country.name}
                      </span>
                    ))}
                  {countries.length > MAX_VISIBLE_ITEMS && !expandedSections.countries && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1"
                      onClick={() => toggleSection('countries')}
                    >
                      +{countries.length - MAX_VISIBLE_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                    </button>
                  )}
                  {expandedSections.countries && countries.length > MAX_VISIBLE_ITEMS && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1"
                      onClick={() => toggleSection('countries')}
                    >
                      {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            )
          }

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <CalendarIcon className="w-5 h-5 mx-4" />
              {translations.publishedAt}
            </span>
            <span className="block mt-1">
              {published_at ? new Date(published_at).toLocaleDateString(isRTL ? 'en-US' : undefined) : translations.na}
            </span>
          </div>

          {/* Only show Last Update if it has a value */}
          {false && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span>
                <ClockIcon className="w-5 h-5 mx-4" />
                {translations.lastUpdate}
              </span>
              <span className="block mt-1">{translations.na}</span>
            </div>
          )}
          
 
        </div>
      </div>
      
    
    </div>
            {/* Share Button with Animation */}
            <div className="mt-5 flex justify-center">
      <button 
        className="share-button border-2 border-gradient-to-r from-blue-500 to-teal-400 max-w-[200px] relative w-full py-3 px-6 font-medium text-sm text-sky-500 outline-none overflow-hidden cursor-pointer rounded-[24px]"
        onClick={handleShare}
      >
        <span className="btn-text inline-flex align-middle transition-all duration-300 px-4 ease-out-cubic text-sky-600">{translations.share}</span>
        <span className="btn-icon inline-flex align-middle ml-2 transition-all duration-300 ease-out-cubic">
          <svg
            className="w-4 h-4"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
              fill="#147aba"
            ></path>
          </svg>
        </span>
        <ul className="social-icons  absolute top-1/2 left-0 right-0 flex m-0 p-0 list-none transform -translate-y-1/2">
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
              <FacebookIcon />
            </a>
          </li>
          {/* WhatsApp */}
          <li className="flex-1">
            <a href={typeof window !== 'undefined' ? getShareLinks().whatsapp : '#'} 
               target="_blank" 
               rel="noopener noreferrer"
               onClick={(e) => e.stopPropagation()}
               className="social-icon inline-flex align-middle transform translate-y-[55px] transition-all duration-300 ease-out-cubic hover:opacity-50">
              <WhatsappIcon />
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="black">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
              <LinkedinIcon />
            </a>
          </li>
        </ul>
      </button>
        {/* CSS for Share Button Animation */}
        <style jsx>{`
        .share-button {
          position: relative;
          font-family: Roboto, sans-serif;
          transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          border: 1px solid #147aba;
        }
        
        .share-button::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
      
          background: #ffffff;
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
  </div>
  );
};

export default KnowledgeSideBox;
