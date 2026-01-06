'use client'
import React, { useEffect, useRef, useState } from 'react';
import { DocumentTextIcon, CalendarIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { IconLanguage, IconCode, IconBuildingBank, IconMap, IconWorld, IconCrane, IconBrandFacebook, IconBrandTwitter, IconBrandLinkedin, IconBrandWhatsapp } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import BuyModal from './BuyModal';
import AuthModal from './AuthModal';
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider';

interface KnowledgeDocument {
  id: number;
  file_name: string;
  file_size: number;
  price: string;
  description: string | null;
  file_extension: string;
  is_purchased?: boolean;
  table_of_content: Array<{
    chapter?: {
      title: string;
    };
    title?: string;
  }>;
}

interface EconomicBloc {
  id: number;
  name: string;
}

interface KnowledgeSideBoxProps {
  knowledgeUUID: number;
  insighterUUID?: string;
  total_price: string;
  documents: KnowledgeDocument[];
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
  knowledgeSlug?: string;
  purchased_status?: 'non-purchased' | 'purchased' | 'partial-purchased';
  is_read_later?: boolean;
  cover_start?: number;
  cover_end?: number;
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
  locale,
  knowledgeSlug,
  purchased_status,
  is_read_later,
  knowledgeUUID,
  insighterUUID,
  cover_start,
  cover_end
}: KnowledgeSideBoxProps) => {
  const params = useParams();
  const currentLocale = locale || params.locale as string || 'en';
  const isRTL = currentLocale === 'ar';
  const { user } = useGlobalProfile();
  
  // Check if the current user is the owner of this knowledge
  const isOwner = user && insighterUUID && user.uuid === insighterUUID;
  
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{
    economicBlocs: boolean;
    regions: boolean;
    countries: boolean;
    documents: boolean;
    isicCode: boolean;
    hsCode: boolean;
  }>({
    economicBlocs: false,
    regions: false,
    countries: false,
    documents: false,
    isicCode: false,
    hsCode: false,
  });

  // Buy Modal state
  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<number[]>([]);
  
  // Auth Modal state
  const [authModalOpened, setAuthModalOpened] = useState(false);

  // Read Later state
  const [isReadLater, setIsReadLater] = useState(is_read_later || false);
  const [isReadLaterLoading, setIsReadLaterLoading] = useState(false);

  // Social Share Modal state
  const [shareModalOpened, setShareModalOpened] = useState(false);
  const [customShareMessage, setCustomShareMessage] = useState('');
  const shareTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (shareModalOpened) {
      // Seed a default share message (only if the user hasn't typed anything yet)
      if (!customShareMessage.trim()) {
        const defaultBase = isRTL
          ? 'اطّلع على هذه الرؤية  :'
          : 'Check out this insight:';
        const title = typeof document !== 'undefined' ? document.title : '';
        setCustomShareMessage(title ? `${defaultBase} ${title}` : defaultBase);
      }
      shareTextareaRef.current?.focus();
    }
  }, [shareModalOpened, customShareMessage, isRTL]);
  
  // Function to toggle section expansion
  const toggleSection = (section: 'economicBlocs' | 'regions' | 'countries' | 'documents' | 'isicCode' | 'hsCode') => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Check if user is logged in
  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Handle buy/download click
  const handleBuyClick = () => {
    if (!isUserLoggedIn()) {
      setAuthModalOpened(true);
      return;
    }

    // Check if all documents are free or if total price is 0
    const areAllDocumentsFree = documents.every(doc => parseFloat(doc.price) === 0);

    if (isFree || areAllDocumentsFree) {
      // Skip modal and go directly to checkout for free documents
      const allDocumentIds = documents.map(doc => doc.id);
      const queryParams = new URLSearchParams({
        slug: knowledgeSlug || '',
        documents: allDocumentIds.join(','),
      });
      window.location.href = `/${currentLocale}/checkout?${queryParams.toString()}`;
      return;
    }

    // Pre-select all documents when opening the modal
    const allDocumentIds = documents.map(doc => doc.id);
    setSelectedDocumentIds(allDocumentIds);
    setBuyModalOpened(true);
  };
  
  // Handle read later toggle
  const handleReadLaterToggle = async () => {
    if (!knowledgeSlug) return;
    
    if (!isUserLoggedIn()) {
      setAuthModalOpened(true);
      return;
    }
    
    setIsReadLaterLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      const method = isReadLater ? 'DELETE' : 'POST';
      const url =  `https://api.insightabusiness.com/api/account/favorite/knowledge/${knowledgeSlug}`

      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-language': currentLocale
        },
        ...({  })
      });

      if (response.ok) {
        setIsReadLater(!isReadLater);
      } else {
        console.error('Failed to toggle read later status');
      }
    } catch (error) {
      console.error('Error toggling read later:', error);
    } finally {
      setIsReadLaterLoading(false);
    }
  };
  
  // Maximum number of items to show initially
  const MAX_VISIBLE_ITEMS = 3;
  // Maximum number of Target Market items to show initially
  const MAX_VISIBLE_TARGET_MARKET_ITEMS = 2;
  
  // Helpers to know when we need a "more" clamp
  const hasMoreEconomicBlocs =
    Array.isArray(economic_blocs) && economic_blocs.length > MAX_VISIBLE_TARGET_MARKET_ITEMS;
  const hasMoreRegions =
    Array.isArray(regions) && regions.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && regions.length !== 6;
  const hasMoreCountries =
    Array.isArray(countries) && countries.length > MAX_VISIBLE_TARGET_MARKET_ITEMS;
  
  // Share functionality
  const handleShare = () => {
    setShareModalOpened(true);
  };



  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const message = encodeURIComponent(customShareMessage );
    const title = encodeURIComponent(document.title);

    let shareUrl = '';

    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${message}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${message}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShareModalOpened(false);
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
    targetMarket: isRTL ? 'السوق المستهدفة': 'Target Market',
    publishedAt: isRTL ? 'تاريخ النشر' : 'Published On',
    lastUpdate: isRTL ? 'آخر تحديث' : 'Last Update',
    yearsItCovers: isRTL ? 'السنوات التي يغطيها' : 'Years it covers',
    oneTimePurchase: isRTL ? 'شراء لمرة واحدة' : 'One time purchase',
    buyNow: isRTL ? 'اشتري الآن' : 'Buy Now',
    addToCart: isRTL ?  'إضافة إلى حقيبة المشتريات' : 'Add to Cart',
    readLater: isRTL ? 'قراءة لاحقا' : 'Read Later',
    removeReadLater: isRTL ? 'إزالة من قراءة لاحقا' : 'Remove Read Later',
    na: isRTL ? 'غير متوفر' : 'N/A',
    free: isRTL ? 'مجاني' : 'Free',
    share: isRTL ? 'مشاركة الرؤية' : 'Share Insight',
    worldWide: isRTL ? 'كافة أنحاء العالم': 'Worldwide',
    showMore: isRTL ? 'عرض المزيد' : 'Show more',
    showLess: isRTL ? 'عرض أقل' : 'Show less',
    more: isRTL ? 'المزيد' : 'more',
    download: isRTL ? 'تحميل' : 'Download',
    alreadyPurchased: isRTL ? 'تم الشراء ' : 'Purchased',
    partiallyPurchased: isRTL ? 'تم الشراء جزئياً' : 'Partially Purchased',
    shareKnowledge: isRTL ? 'شارك المستند' : 'Share Insight',
    customShareMessage: isRTL ? 'أضف رسالة شخصية' : 'Add a Personal Message',
    shareMessageHint: isRTL ? 'أضف ملاحظة أو رسالة لتخصيص المشاركة...' : 'Add a note or message to personalize your share...',
    characterCount: isRTL ? 'عدد الأحرف' : 'Character Count',
    close: isRTL ? 'إغلاق' : 'Close',
    copyLink: isRTL ? 'نسخ الرابط' : 'Copy Link',
    linkCopied: isRTL ? 'تم نسخ الرابط' : 'Link Copied'
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
    <div className="tp-course-details2-widget-child rounded-lg p-3 lg:sticky " dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="p-3">
        <div className="text-center mb-2">
          {isFree ? (
            <span className='text-xl font-bold text-green-600 bg-green-100 px-4 py-1 rounded-xl'>{translations.free}</span>
          ) : (
            <span className='text-2xl font-bold'>  ${total_price}</span>   
          )}
          {!isFree && (
            <span className="text-sm text-gray-500 ml-2 capitalize">{translations.oneTimePurchase}</span>
          )}
        </div>

        <div className="space-y-2 mb-3">
          {!isOwner && (
            <>
              {purchased_status === 'purchased' ? (
                <button 
                  onClick={() => window.location.href = (process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.insightabusiness.com') + '/app/insighter-dashboard/my-downloads'}
                  className="w-full font-semibold bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {translations.alreadyPurchased}
                </button>
              ) : purchased_status === 'partial-purchased' ? (
                <button 
                  onClick={handleBuyClick}
                  className="w-full font-semibold bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {translations.partiallyPurchased}
                </button>
              ) : isFree ? (
                <button 
                  onClick={handleBuyClick}
                  className="w-full font-semibold bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors"
                >
                  {translations.download}
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleBuyClick}
                    className="w-full font-semibold bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors"
                  >
                    {translations.buyNow}
                  </button>
         
                </>
              )}
              <button 
                onClick={handleReadLaterToggle}
                disabled={isReadLaterLoading}
                className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isReadLater 
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                } ${isReadLaterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isReadLaterLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  isReadLater ? (
                    <BookmarkSolidIcon className="w-4 h-4" />
                  ) : (
                    <BookmarkIcon className="w-4 h-4" />
                  )
                )}
                {isReadLater ? translations.removeReadLater : translations.readLater}
              </button>
            </>
          )}
        </div>

        <div className="space-y-3">
          <div className="tp-course-details2-widget-list-item flex items-start justify-between">
            <span className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full me-2">
                <DocumentTextIcon className="w-4 h-4 text-blue-500" />
              </div>
              {translations.documents}
            </span>
            <div className={`field-content-container ${expandedSections.documents ? 'expanded' : ''}`}>
              <div className="flex flex-nowrap gap-2 overflow-hidden no-wrap">
                {Object.entries(documentCounts).map(([ext, count]) => {
                  let badgeStyle = "";
                  
                  if (["doc", "docx"].includes(ext)) {
                    badgeStyle = "bg-blue-100 text-blue-700 border border-blue-200";
                  } else if (["ppt", "pptx"].includes(ext)) {
                    badgeStyle = "bg-red-100 text-red-700 border border-red-200";
                  } else if (["pdf"].includes(ext)) {
                    badgeStyle = "bg-red-100 text-red-700 border border-red-200 ";
                  } else if (["csv", "xls", "xlsx"].includes(ext)) {
                    badgeStyle = "bg-green-100 text-green-700 border border-green-200";
                  } else if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
                    badgeStyle = "bg-purple-100 text-purple-700 border border-purple-200";
                  } else {
                    badgeStyle = "bg-gray-100  border border-gray-200";
                  }
                  
                  return (
                    <span 
                      key={ext} 
                      className={`px-2.5 py-0.75 uppercase ${badgeStyle} rounded-md text-xs font-semibold`}
                    >
                      {count} {ext}
                    </span>
                  );
                })}
              </div>
              {Object.keys(documentCounts).length > 3 && (
                <button 
               
                  className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1 mt-1"
                  onClick={() => toggleSection('documents')}
                >
                  {expandedSections.documents ? (
                    <>
                      {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                    </>
                  ) : (
                    <>
                      {translations.showMore} <ChevronDownIcon className="w-3 h-3 ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span className="flex items-center">
              <div className="bg-blue-50 p-2 rounded-full me-2">
                <IconLanguage className="w-4 h-4 text-blue-500" />
              </div>
              {translations.documentsLanguage}
            </span>
            <span className="field-content-container flex items-center justify-center capitalize truncate">
              {language ? (
                currentLocale === 'ar' ?
                  (language.toLowerCase() === 'english' ? 'الإنجليزية' : 'العربية') :
                  language
              ) : translations.na}
            </span>
          </div>

          {isic_code && !Array.isArray(isic_code) && isic_code.key && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium ">
                <div className="bg-blue-50 p-2 rounded-full me-2">
                  <IconBuildingBank className="w-4 h-4 text-blue-500" />
                </div>
                {translations.isicCode}
              </span>
              <div className="field-content-container overflow-visible relative">
                <div className="group relative inline-block">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mt-1 cursor-help">
                    {isic_code.key}
                  </span>
                  <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-black text-white p-3 text-xs shadow-xl group-hover:block min-w-[200px] max-w-[300px] z-[9999] text-center whitespace-normal break-words">
                    {isic_code.name}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
                  </span>
                </div>
              </div>
            </div>
          )}
          {isic_code && Array.isArray(isic_code) && isic_code.length > 0 && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium ">
                <div className="bg-blue-50 p-2 rounded-full me-2">
                  <IconBuildingBank className="w-4 h-4 text-blue-500" />
                </div>
                {translations.isicCode}
              </span>
              <div className={`field-content-container ${expandedSections.isicCode ? 'expanded' : ''}`}>
                <div className="flex flex-nowrap gap-1 justify-end overflow-hidden no-wrap">
                  {isic_code
                    .slice(0, expandedSections.isicCode ? isic_code.length : MAX_VISIBLE_ITEMS)
                    .map((code, index) => (
                      <span key={index} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                        {code.name || code.key || JSON.stringify(code)}
                      </span>
                    ))}
                </div>
                {isic_code.length > MAX_VISIBLE_ITEMS && (
                  <button 
                    className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1 mt-1"
                    onClick={() => toggleSection('isicCode')}
                  >
                    {expandedSections.isicCode ? (
                      <>
                        {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        +{isic_code.length - MAX_VISIBLE_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {hs_code && !Array.isArray(hs_code) && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium ">
                <div className="bg-blue-50 p-2 rounded-full me-2">
                               <svg
      width="16"
      height="16"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(0.99,0,0,0.99,0.32,0.3)">
        <path
          d="m49.5 34c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5z"
          fill="#3b81f6"
        />
        <path
          d="m32 3c-.82842712 0-1.5.67157288-1.5 1.5v2.8007812c-1.2649826.52060382-2.2043206 1.6749789-2.4335938 3.0566406l-14.742188 16.642578h-6.8242188c-1.3590542 0-2.5 1.1409458-2.5 2.5v25c0 1.3590542 1.1409458 2.5 2.5 2.5h51c1.3590542 0 2.5-1.1409458 2.5-2.5v-25c0-1.3590542-1.1409361-2.5000073-2.5-2.5h-28c-.82842712 0-1.5.67157288-1.5 1.5s.67157288 1.5 1.5 1.5h27.5v24h-33v-24.5c0-1.3590542-1.1409458-2.5-2.5-2.5h-4.1679688l11.761719-13.279297c.73236176.78125202 1.7636799 1.2792969 2.90625 1.2792969 1.1727683 0 2.2019554-.53489178 2.9160156-1.359375l9.125 9.765625c.56539461.60477567 1.51386.63711965 2.1191406.0722656.60606614-.56559238.63843164-1.5155634.0722656-2.1210937l-10.396484-11.123047c-.26624623-1.3120561-1.1427571-2.4088386-2.3359375-2.9199219v-2.8144531c0-.82842712-.67157288-1.5-1.5-1.5zm-17 27h5c.554 0 1 .446 1 1v22c0 .554-.446 1-1 1h-5c-.554 0-1-.446-1-1v-22c0-.554.446-1 1-1z"
          fill="#3b81f6"
        />
      </g>
    </svg>
                </div>
                {translations.hsCode}
              </span>
              <div className="field-content-container overflow-visible relative">
                <div className="group relative inline-block">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mt-1 cursor-help">
                    {typeof hs_code === 'object' ? (hs_code.key || JSON.stringify(hs_code)) : hs_code}
                  </span>
                  {typeof hs_code === 'object' && hs_code.name && (
                    <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 transform rounded bg-black text-white p-3 text-xs shadow-xl group-hover:block min-w-[200px] max-w-[300px] z-[9999] text-center whitespace-normal break-words">
                      {hs_code.name}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          {hs_code && Array.isArray(hs_code) && hs_code.length > 0 && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium ">
                <div className="bg-blue-50 p-2 rounded-full me-2">
                               <svg
      width="16"
      height="16"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(0.99,0,0,0.99,0.32,0.3)">
        <path
          d="m49.5 34c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5zm-6 0c-.82842712 0-1.5.67157288-1.5 1.5v13c0 .82842712.67157288 1.5 1.5 1.5s1.5-.67157288 1.5-1.5v-13c0-.82842712-.67157288-1.5-1.5-1.5z"
          fill="#3b81f6"
        />
        <path
          d="m32 3c-.82842712 0-1.5.67157288-1.5 1.5v2.8007812c-1.2649826.52060382-2.2043206 1.6749789-2.4335938 3.0566406l-14.742188 16.642578h-6.8242188c-1.3590542 0-2.5 1.1409458-2.5 2.5v25c0 1.3590542 1.1409458 2.5 2.5 2.5h51c1.3590542 0 2.5-1.1409458 2.5-2.5v-25c0-1.3590542-1.1409361-2.5000073-2.5-2.5h-28c-.82842712 0-1.5.67157288-1.5 1.5s.67157288 1.5 1.5 1.5h27.5v24h-33v-24.5c0-1.3590542-1.1409458-2.5-2.5-2.5h-4.1679688l11.761719-13.279297c.73236176.78125202 1.7636799 1.2792969 2.90625 1.2792969 1.1727683 0 2.2019554-.53489178 2.9160156-1.359375l9.125 9.765625c.56539461.60477567 1.51386.63711965 2.1191406.0722656.60606614-.56559238.63843164-1.5155634.0722656-2.1210937l-10.396484-11.123047c-.26624623-1.3120561-1.1427571-2.4088386-2.3359375-2.9199219v-2.8144531c0-.82842712-.67157288-1.5-1.5-1.5zm-17 27h5c.554 0 1 .446 1 1v22c0 .554-.446 1-1 1h-5c-.554 0-1-.446-1-1v-22c0-.554.446-1 1-1z"
          fill="#3b81f6"
        />
      </g>
    </svg>
                </div>
                {translations.hsCode}
              </span>
              <div className={`field-content-container ${expandedSections.hsCode ? 'expanded' : ''}`}>
                <div className="flex flex-nowrap gap-1 justify-end overflow-hidden no-wrap">
                  {hs_code
                    .slice(0, expandedSections.hsCode ? hs_code.length : MAX_VISIBLE_ITEMS)
                    .map((code, index) => (
                      <span key={index} className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                        {typeof code === 'object' ? (code.name || code.key || JSON.stringify(code)) : code}
                      </span>
                    ))}
                </div>
                {hs_code.length > MAX_VISIBLE_ITEMS && (
                  <button 
                    className="text-blue-500 text-xs flex items-center whitespace-nowrap ml-1 mt-1"
                    onClick={() => toggleSection('hsCode')}
                  >
                    {expandedSections.hsCode ? (
                      <>
                        {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        +{hs_code.length - MAX_VISIBLE_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          

          {cover_start && cover_end && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center">
                <div className="bg-blue-50 p-2 rounded-full me-2">
                  <CalendarIcon className="w-4 h-4 text-blue-500" />
                </div>
                {translations.yearsItCovers}
              </span>
              <span className="field-content-container">
                <span className="flex items-center justify-end">
                  {cover_start === cover_end ? cover_start : `${cover_start} - ${cover_end}`}
                </span>
              </span>
            </div>
          )}

          {
            economic_blocs && economic_blocs.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium ">
                  <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconWorld className="w-4 h-4 text-blue-500" />
                  </div>
                  {translations.targetMarket}
                </span>
                <div className={`field-content-container ${expandedSections.economicBlocs ? 'expanded' : ''} ${!hasMoreEconomicBlocs ? 'no-clamp' : ''}`}>
                  <div className={`chips-container ${economic_blocs.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && !expandedSections.economicBlocs ? 'with-more' : ''}`}>
                    <div className="chips-wrapper">
                      {economic_blocs
                        .slice(0, expandedSections.economicBlocs ? economic_blocs.length : MAX_VISIBLE_TARGET_MARKET_ITEMS)
                        .map((economicBloc) => (
                          <span key={economicBloc.id} className={`chip-badge ${isRTL ? 'text-left' : 'text-right'}`} title={economicBloc.name}>
                            {economicBloc.name}
                          </span>
                        ))}
                    </div>
                    {economic_blocs.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && (
                      <button
                        className={`more-btn ${expandedSections.economicBlocs ? 'expanded' : ''}`}
                        onClick={() => toggleSection('economicBlocs')}
                      >
                        {expandedSections.economicBlocs ? (
                          <>
                            {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                          </>
                        ) : (
                          <>
                            +{economic_blocs.length - MAX_VISIBLE_TARGET_MARKET_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          }
          {
            regions && regions.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium ">
                  <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconWorld className="w-4 h-4 text-blue-500" />
                  </div>
                  {translations.targetMarket}
                </span>
                <div className={`field-content-container ${expandedSections.regions ? 'expanded' : ''} ${!hasMoreRegions ? 'no-clamp' : ''}`}>
                  <div className={`chips-container ${(regions.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && regions.length !== 6 && !expandedSections.regions) ? 'with-more' : ''}`}>
                    <div className="chips-wrapper">
                      {regions.length === 6 ? (
                        <span className="chip-badge" title={translations.worldWide}>
                          {translations.worldWide}
                        </span>
                      ) : (
                        regions
                          .slice(0, expandedSections.regions ? regions.length : MAX_VISIBLE_TARGET_MARKET_ITEMS)
                          .map((region:any) => (
                            <span key={region.id} className="chip-badge" title={region.name}>
                              {region.name}
                            </span>
                          ))
                      )}
                    </div>
                    {regions.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && regions.length !== 6 && (
                      <button
                        className={`more-btn ${expandedSections.regions ? 'expanded' : ''}`}
                        onClick={() => toggleSection('regions')}
                      >
                        {expandedSections.regions ? (
                          <>
                            {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                          </>
                        ) : (
                          <>
                            +{regions.length - MAX_VISIBLE_TARGET_MARKET_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          }
          {
            countries && countries.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium ">
                  <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconWorld className="w-4 h-4 text-blue-500" />
                  </div>
                  {translations.targetMarket}
                </span>
                <div className={`field-content-container ${expandedSections.countries ? 'expanded' : ''} ${!hasMoreCountries ? 'no-clamp' : ''}`}>
                  <div className={`chips-container ${countries.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && !expandedSections.countries ? 'with-more' : ''}`}>
                    <div className="chips-wrapper">
                      {countries
                        .slice(0, expandedSections.countries ? countries.length : MAX_VISIBLE_TARGET_MARKET_ITEMS)
                        .map((country:any) => (
                          <span key={country.id} className="chip-badge" title={country.name}>
                            {country.name}
                          </span>
                        ))}
                    </div>
                    {countries.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && (
                      <button
                        className={`more-btn ${expandedSections.countries ? 'expanded' : ''}`}
                        onClick={() => toggleSection('countries')}
                      >
                        {expandedSections.countries ? (
                          <>
                            {translations.showLess} <ChevronUpIcon className="w-3 h-3 ml-1" />
                          </>
                        ) : (
                          <>
                            +{countries.length - MAX_VISIBLE_TARGET_MARKET_ITEMS} {translations.more} <ChevronDownIcon className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          }
       
          {/* Only show Last Update if it has a value */}
          {false && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center">
                <div className="bg-blue-50 p-2 rounded-full me-2">
                  <ClockIcon className="w-4 h-4 text-blue-500" />
                </div>
                {translations.lastUpdate}
              </span>
              <span className="field-content-container block mt-1">{translations.na}</span>
            </div>
          )}
          
 
        </div>
      </div>
      
    
    </div>
            {/* Simple Share Button */}
            <div className="mt-5 flex justify-center">
      <button
        className="w-full max-w-[200px] py-3 px-6 font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg hover:from-blue-600 hover:to-teal-500 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
        onClick={handleShare}
      >
        <span>{translations.share}</span>
        <svg
          className="w-4 h-4"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
          />
        </svg>
      </button>
            </div>

            {/* Share Modal */}
            {shareModalOpened && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShareModalOpened(false)}>
                <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
                  {/* Modal Header */}
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <h2 className="text-xl font-bold">{translations.shareKnowledge}</h2>
                    <button
                      onClick={() => setShareModalOpened(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  {/* Custom Message Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">{translations.customShareMessage}</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                      value={customShareMessage}
                      onChange={(e) => setCustomShareMessage(e.target.value)}
                      placeholder={translations.shareMessageHint}
                      ref={shareTextareaRef}
                    />
                  </div>

                  {/* Character Count */}
                  <div className="mb-6">
                    <small className="text-gray-500">{translations.characterCount}: {customShareMessage.length}</small>
                  </div>

                  {/* Social Media Buttons */}
                  <div className="flex justify-center gap-3 mb-6">
                    {/* Facebook */}
                    <button
                      className="w-12 h-12 bg-[#2196F3] hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('facebook')}
                      title="Share on Facebook"
                    >
           <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 9.5576C19 4.27831 14.7476 0 9.5 0C4.25244 0 0 4.27712 0 9.5576C0 14.3275 3.47344 18.2816 8.01562 18.9988V12.3195H5.60263V9.5564H8.01562V7.45109C8.01562 5.05605 9.4335 3.73328 11.6042 3.73328C12.6433 3.73328 13.7311 3.91968 13.7311 3.91968V6.2708H12.5329C11.3525 6.2708 10.9844 7.00818 10.9844 7.76338V9.5576H13.6194L13.1979 12.3207H10.9844V19C15.5266 18.2816 19 14.3275 19 9.5576Z" fill="white"/>
</svg>

                    </button>

                    {/* Twitter */}
                    <button
                      className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('twitter')}
                      title="Share on Twitter"
                    >
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0248 3.65625H16.1725L11.4815 9.03014L17 16.3438H12.6801L9.29422 11.9092L5.4246 16.3438H3.27379L8.29031 10.5947L3 3.65625H7.42938L10.4867 7.70954L14.0248 3.65625ZM13.2703 15.0567H14.4598L6.7814 4.8762H5.50369L13.2703 15.0567Z" fill="white"/>
</svg>

                    </button>

                    {/* LinkedIn */}
                    <button
                      className="w-12 h-12 bg-[#0077b5] hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('linkedin')}
                      title="Share on LinkedIn"
                    >
                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2202_2564)">
<path d="M17.48 0H1.6233C0.756425 0 0 0.62344 0 1.47963V17.3719C0 18.2329 0.756425 19 1.6233 19H17.4752C18.3469 19 19 18.2281 19 17.3719V1.47963C19.0036 0.62344 18.3457 0 17.48 0ZM5.88881 15.8377H3.16705V7.37436H5.88881V15.8377ZM4.62175 6.08829H4.60274C3.73112 6.08829 3.16705 5.43994 3.16705 4.62769C3.16705 3.80119 3.74656 3.16825 4.63719 3.16825C5.52781 3.16825 6.07286 3.79644 6.09186 4.62769C6.09186 5.43994 5.52781 6.08829 4.62175 6.08829ZM15.8365 15.8377H13.1147V11.21C13.1147 10.1009 12.7181 9.34442 11.7337 9.34442C10.9808 9.34442 10.5355 9.85387 10.3384 10.3491C10.2647 10.5272 10.2446 10.7694 10.2446 11.0176V15.8377H7.5228V7.37436H10.2446V8.55237C10.6412 7.98831 11.2599 7.17606 12.6991 7.17606C14.4863 7.17606 15.8377 8.35407 15.8377 10.8929L15.8365 15.8377Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2202_2564">
<rect width="19" height="19" fill="white"/>
</clipPath>
</defs>
</svg>

                    </button>

                    {/* WhatsApp */}
                    <button
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('whatsapp')}
                      title="Share on WhatsApp"
                    >
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1537 2.76093C14.3773 0.979684 12.0108 0 9.49584 0C4.3056 0 0.0807459 4.22394 0.0807459 9.41569C0.0807459 11.0734 0.512968 12.6944 1.33585 14.1229L0 19L4.99193 17.689C6.36578 18.4395 7.91419 18.8338 9.49109 18.8338H9.49584C14.6825 18.8338 19 14.6098 19 9.41806C18.9988 6.90412 17.9301 4.54218 16.1537 2.76093ZM9.49584 17.2484C8.08755 17.2484 6.71014 16.8708 5.50966 16.1583L5.22586 15.9885L2.26561 16.7651L3.05406 13.8771L2.86763 13.5803C2.08275 12.3334 1.67189 10.8953 1.67189 9.41569C1.67189 5.10269 5.18311 1.59125 9.50059 1.59125C11.5917 1.59125 13.5545 2.40588 15.0304 3.8855C16.5064 5.36513 17.4136 7.32925 17.41 9.42044C17.4088 13.737 13.8086 17.2484 9.49584 17.2484ZM13.7872 11.3869C13.5545 11.2682 12.3967 10.6994 12.1794 10.6234C11.9633 10.5426 11.8066 10.5046 11.6498 10.7421C11.4931 10.9796 11.0431 11.5057 10.9029 11.6672C10.7676 11.8239 10.6275 11.8453 10.3935 11.7266C9.01137 11.0354 8.10299 10.4928 7.19224 8.92763C6.95 8.51201 7.43447 8.54169 7.88332 7.64276C7.95932 7.48601 7.92131 7.35062 7.86194 7.23187C7.80257 7.11312 7.33235 5.95532 7.13642 5.48507C6.94525 5.02669 6.75051 5.09081 6.60683 5.0825C6.47147 5.07419 6.31473 5.07418 6.1568 5.07418C5.99887 5.07418 5.74595 5.13356 5.52865 5.36631C5.31254 5.60381 4.70577 6.17263 4.70577 7.33044C4.70577 8.48825 5.55002 9.60807 5.66402 9.76482C5.78276 9.92157 7.32167 12.2966 9.68464 13.319C11.1772 13.9638 11.7626 14.0184 12.5095 13.908C12.9631 13.8403 13.9 13.3392 14.0959 12.7882C14.2907 12.2372 14.2907 11.7658 14.2313 11.6684C14.1779 11.5603 14.0199 11.5009 13.7872 11.3869Z" fill="white"/>
</svg>

                    </button>
                  </div>

                  {/* Copy Link Button */}
                  <button
                    className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                  >
                    {translations.copyLink}
                  </button>
                </div>
              </div>
            )}
        {/* Field content styles */}
        <style jsx>{`
          .field-content-container {
            min-height: 32px;
            overflow: hidden;
            transition: max-height 0.3s ease;
            width: 60%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          /* Left label: keep on one line and ellipsize */
          .tp-course-details2-widget-list-item > span:first-child {
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-flex;
            align-items: center;
          }

          /* Chips container styling */
          .chips-container {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .chips-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            max-height: 32px;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }

          /* Only clamp when there is a "more" state; otherwise show fully */
          .field-content-container:not(.expanded) .chips-container.with-more .chips-wrapper {
            max-height: 32px;
            overflow: hidden;
          }
          .chips-container:not(.with-more) .chips-wrapper {
            max-height: none;
            overflow: visible;
          }

          .field-content-container.expanded .chips-wrapper {
            max-height: none;
          }

          /* Chip badge styling with text truncation */
          .chip-badge {
            background-color: #f1f1f4;
            color: #4b5675;
            font-size: 12px;
            font-weight: 500;
            padding: 4px 10px;
            border-radius: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 160px;
            display: inline-block;
            cursor: help;
            transition: all 0.2s ease;
            line-height: 1.2;
            min-height: 20px;
          }

          /* In expanded or unclamped state, allow full wrapping and width */
          .field-content-container.expanded .chip-badge,
          .field-content-container.no-clamp .chip-badge {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            max-width: 100%;
          }

          .chip-badge:hover {
            background-color: #e5e7eb;
            max-width: none;
            z-index: 10;
            position: relative;
          }

          /* More button styling */
          .more-btn {
            color: #3b82f6;
            font-size: 12px;
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            white-space: nowrap;
            margin-top: 4px;
            padding: 2px 4px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
          }

          .more-btn:hover {
            background-color: #eff6ff;
          }

          /* Responsive design for smaller screens */
          @media (max-width: 640px) {
            .field-content-container {
              width: 70%;
            }

            .chip-badge {
              max-width: 140px;
              font-size: 11px;
              padding: 2px 8px;
            }

            .tp-course-details2-widget-list-item > span:first-child {
              width: 30%;
              font-size: 13px;
            }
          }

          @media (max-width: 480px) {
            .field-content-container {
              width: 100%;
            }

            .chip-badge {
              max-width: 120px;
            }

            .tp-course-details2-widget-list-item {
              align-items: flex-start;
              gap: 8px;
            }

            .tp-course-details2-widget-list-item > span:first-child {
              width: 100%;
            }
          }

          /* Prevent wrapping in collapsed state */
          .field-content-container:not(.expanded) .no-wrap {
            white-space: nowrap;
            text-overflow: ellipsis;
            flex-wrap: nowrap !important;
          }

          /* Allow wrapping when expanded */
          .field-content-container.expanded .no-wrap {
            white-space: normal;
            overflow: visible;
            flex-wrap: wrap !important;
          }

          .field-content-container.overflow-visible {
            overflow: visible;
          }

          .field-content-container.expanded {
            max-height: none;
          }

          .field-content-container:not(.expanded) {
            max-height: 60px;
          }

          /* When there are ≤ 2 chips, don't clamp or hide overflow */
          .field-content-container.no-clamp {
            max-height: none;
            overflow: visible;
          }
          .field-content-container.no-clamp .chips-wrapper {
            max-height: none;
            overflow: visible;
          }

          .field-content-container:not(.expanded).overflow-visible {
            overflow: visible;
          }

          .tp-course-details2-widget-list-item {
            min-height: 40px;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
            align-items: center;
            position: relative;
            overflow: visible;
          }

          .tp-course-details2-widget-list-item:last-child {
            border-bottom: none;
          }
@media (min-width: 1024px) {
  .tp-course-details2-widget {
    top: 100px !important;
    margin-top: -130px !important;
    position: sticky;
    max-width: 400px;
    z-index: 25 !important;
  }
}

          /* Make side box flow normally and full-width on <= 1023px */
          @media (max-width: 1023px) {
            .tp-course-details2-widget {
              position: static !important;
              top: auto !important;
              margin-top: 0 !important;
              max-width: none;
              width: 100% !important;
            }
            .tp-course-details2-widget-child {
              position: static !important;
              width: 100%;
            }
          }
 

          /* RTL support */
          [dir="rtl"] .chips-wrapper {
            justify-content: flex-end;
          }

          [dir="rtl"] .chip-badge {
            text-align: right;
          }

          [dir="rtl"] .more-btn {
            margin-right: 4px;
          }
        `}</style>

      {/* Buy Modal */}
      {knowledgeSlug && (
        <BuyModal
          opened={buyModalOpened}
          onClose={() => setBuyModalOpened(false)}
          documents={documents}
          preSelectedDocumentIds={selectedDocumentIds}
          knowledgeSlug={knowledgeSlug}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        opened={authModalOpened}
        onClose={() => setAuthModalOpened(false)}
        locale={currentLocale}
      />
  </div>
  );
};
 
export default KnowledgeSideBox;
