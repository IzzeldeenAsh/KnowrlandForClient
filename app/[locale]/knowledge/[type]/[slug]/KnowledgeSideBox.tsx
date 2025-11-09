'use client'
import React, { useEffect, useRef, useState } from 'react';
import { DocumentTextIcon, CalendarIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { IconLanguage, IconCode, IconBuildingBank, IconMap, IconWorld, IconCrane } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import FacebookIcon from '@/public/file-icons/facebook';
import LinkedinIcon from '@/public/file-icons/linkedin';
import WhatsappIcon from '@/public/file-icons/whatsapp';
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
      shareTextareaRef.current?.focus();
    }
  }, [shareModalOpened]);
  
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
      const url =  `https://api.foresighta.co/api/account/favorite/knowledge/${knowledgeSlug}`

      
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
    targetMarket: isRTL ? 'السوق المستهدف': 'Target Market',
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
    share: isRTL ? 'مشاركة' : 'Share',
    worldWide: isRTL ? 'كافة أنحاء العالم': 'Worldwide',
    showMore: isRTL ? 'عرض المزيد' : 'Show more',
    showLess: isRTL ? 'عرض أقل' : 'Show less',
    more: isRTL ? 'المزيد' : 'more',
    download: isRTL ? 'تحميل' : 'Download',
    alreadyPurchased: isRTL ? 'تم الشراء ' : 'Purchased',
    partiallyPurchased: isRTL ? 'تم الشراء جزئياً' : 'Partially Purchased',
    shareKnowledge: isRTL ? 'شارك المعرفة' : 'Share Knowledge',
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
    <div className="tp-course-details2-widget-child rounded-lg p-4 sticky " dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="p-4">
        <div className="text-center mb-4">
          {isFree ? (
            <span className='text-xl font-bold text-green-600 bg-green-100 px-4 py-1 rounded-xl'>{translations.free}</span>
          ) : (
            <span className='text-3xl font-bold'>  ${total_price}</span>   
          )}
          {!isFree && (
            <span className="text-md text-gray-500 ml-2 capitalize">{translations.oneTimePurchase}</span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          {!isOwner && (
            <>
              {purchased_status === 'purchased' ? (
                <button 
                  onClick={() => window.location.href = (process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.foresighta.co') + '/app/insighter-dashboard/my-downloads'}
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
              <div className="flex flex-wrap gap-2">
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
            <span className="field-content-container flex items-center justify-center capitalize">
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
                <div className="flex flex-wrap gap-1 justify-end">
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
                <div className="flex flex-wrap gap-1 justify-end">
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

          {
            economic_blocs && economic_blocs.length > 0 && (
              <div className="tp-course-details2-widget-list-item flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium ">
                  <div className="bg-blue-50 p-2 rounded-full me-2">
                    <IconWorld className="w-4 h-4 text-blue-500" />
                  </div>
                  {translations.targetMarket}
                </span>
                <div className={`field-content-container ${expandedSections.economicBlocs ? 'expanded' : ''}`}>
                  <div className={`flex flex-wrap gap-1 justify-end`}>
                    {economic_blocs
                      .slice(0, expandedSections.economicBlocs ? economic_blocs.length : MAX_VISIBLE_TARGET_MARKET_ITEMS)
                      .map((economicBloc) => (
                        <span key={economicBloc.id} className={`badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded ${isRTL ? 'text-left' : 'text-right'}`}>
                          {economicBloc.name}
                        </span>
                      ))}
                  </div>
                  {economic_blocs.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ms-auto mt-1"
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
                <div className={`field-content-container ${expandedSections.regions ? 'expanded' : ''}`}>
                  <div className={`flex flex-wrap gap-1 justify-end`}>
                    {regions.length === 6 ? (
                      <span className={`badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded ${isRTL ? 'text-left' : 'text-right'}`}>
                     {translations.worldWide}
                      </span>
                    ) : (
                      regions
                        .slice(0, expandedSections.regions ? regions.length : MAX_VISIBLE_TARGET_MARKET_ITEMS)
                        .map((region:any) => (
                          <span key={region.id} className={`badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded ${isRTL ? 'text-left' : 'text-right'}`}>
                            {region.name}
                          </span>
                        ))
                    )}
                  </div>
                  {regions.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && regions.length !== 6 && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ms-auto mt-1"
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
                <div className={`field-content-container ${expandedSections.countries ? 'expanded' : ''}`}>
                  <div className={`flex flex-wrap gap-1 justify-end`}>
                    {countries
                      .slice(0, expandedSections.countries ? countries.length : MAX_VISIBLE_TARGET_MARKET_ITEMS)
                      .map((country:any) => (
                        <span key={country.id} className={`badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded ${isRTL ? 'text-left' : 'text-right'}`}>
                          {country.name}
                        </span>
                      ))}
                  </div>
                  {countries.length > MAX_VISIBLE_TARGET_MARKET_ITEMS && (
                    <button 
                      className="text-blue-500 text-xs flex items-center whitespace-nowrap ms-auto mt-1"
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
            )
          }

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
                      <FacebookIcon />
                    </button>

                    {/* Twitter */}
                    <button
                      className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('twitter')}
                      title="Share on Twitter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>

                    {/* LinkedIn */}
                    <button
                      className="w-12 h-12 bg-[#0077b5] hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('linkedin')}
                      title="Share on LinkedIn"
                    >
                      <LinkedinIcon />
                    </button>

                    {/* WhatsApp */}
                    <button
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-colors"
                      onClick={() => shareToSocial('whatsapp')}
                      title="Share on WhatsApp"
                    >
                      <WhatsappIcon />
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
            min-height: 40px;
            overflow: hidden;
            transition: max-height 0.3s ease;
            width: 60%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }

          .field-content-container.overflow-visible {
            overflow: visible;
          }

          .field-content-container.expanded {
            max-height: none;
          }

          .field-content-container:not(.expanded) {
            max-height: 80px;
          }

          .field-content-container:not(.expanded).overflow-visible {
            overflow: visible;
          }

          .tp-course-details2-widget-list-item {
            min-height: 50px;
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
            align-items: center;
            position: relative;
            overflow: visible;
          }

          .tp-course-details2-widget-list-item:last-child {
            border-bottom: none;
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
