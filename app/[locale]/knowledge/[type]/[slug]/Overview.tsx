'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import styles from './knowledge.module.css'
import { SparklesIcon } from '@heroicons/react/20/solid'
import { IconCloudUpload, IconFiles } from '@tabler/icons-react'
import { Group, Text, Badge } from '@mantine/core'
import { useParams } from 'next/navigation'
import BuyModal from './BuyModal'
import AuthModal from './AuthModal'
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider'
import { useRouter } from 'next/navigation'
import { getAuthToken } from '@/lib/authToken'

// Define interfaces for minimal typing, you can expand these as needed
interface Document {
  id: number
  file_name: string
  file_size: number
  price: string
  description: string | null
  file_extension: string
  is_purchased?: boolean
  table_of_content: Array<{
    chapter?: {
      title: string
    }
    title?: string
  }>
}

export interface KnowledgeDetails {
  description: string
  documents: Document[]
  type: string
  language?: string
  slug?: string
  insighter?: {
    uuid?: string
  }
  // Add other fields if needed
}

interface OverviewProps {
  knowledge: KnowledgeDetails
  knowledgeSlug: string
}

const getFileIconByExtension = (extension: string) => {
  // Map file extensions to their corresponding SVG icons
  const iconMap: { [key: string]: string } = {
    pdf: '/file-icons/pdf.svg',
    doc: '/file-icons/doc.svg',
    docx: '/file-icons/doc.svg',
    xls: '/file-icons/xls.svg',
    xlsx: '/file-icons/xlsx.svg',
    ppt: '/file-icons/ppt.svg',
    pptx: '/file-icons/ppt.svg',
    csv: '/file-icons/csv.svg',
    txt: '/file-icons/txt.svg',
    zip: '/file-icons/zip.svg',
    rar: '/file-icons/zip.svg',
    // Add more file types as needed
    default: '/file-icons/file.svg'
  }
  return iconMap[extension.toLowerCase()] || iconMap.default
}

export default function Overview({ knowledge, knowledgeSlug }: OverviewProps) {
  const params = useParams();
  const locale = params.locale;
  const isRTL = locale === 'ar';
  const isArabicContent = knowledge.language === 'arabic';
  const isContentRTL = isRTL || isArabicContent;
  const { user } = useGlobalProfile();
  const router = useRouter();

  const [buyModalOpened, setBuyModalOpened] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | undefined>(undefined);
  const [authModalOpened, setAuthModalOpened] = useState(false);

  // Check if the current user is the owner of this knowledge
  const isOwner = user && knowledge.insighter?.uuid && user.uuid === knowledge.insighter.uuid;

  // Translations
  const translations = {
    chooseReportSections: isRTL ? "عدة مستندات؟ يمكنك الاختيار وتنزيلها بشكل منفصل." : 'Multiple files? You can select and download separately.',
     thisIncludes: isRTL
    ? 'هذا المنشور يتضمن'
    : 'This insight includes',   
    documents: isRTL ? 'مستندات' : 'File',
    free: isRTL ? 'مجاني' : 'Free',
    download: isRTL ? 'تحميل' : 'Download',
    buyNow: isRTL ? 'شراء الآن' : 'Buy Now',
    evaluateWithAI: isRTL ? 'تقييم باستخدام الذكاء الاصطناعي' : 'Evaluate with AI',
    description: isRTL ? 'الوصف' : 'Description',
    tableOfContents: isRTL ? 'جدول المحتويات' : 'Table of Contents',
    chapter: isRTL ? 'الفصل' : 'Chapter',
    title: isRTL ? 'العنوان' : 'Title',
    noDocumentsAvailable: isRTL ? 'لا توجد مستندات متاحة.' : 'No documents available.',
    alreadyPurchased: isRTL ? 'تم الشراء ' : 'Purchased',
    purchasedMini: isRTL ? 'تم الشراء' : 'Purchased',
  };

  // Check if user is logged in
  const isUserLoggedIn = () => {
    return !!getAuthToken();
  };

  const handleBuyClick = (documentId: number) => {
    if (!isUserLoggedIn()) {
      setAuthModalOpened(true);
      return;
    }

    // Find the specific document
    const selectedDoc = knowledge.documents.find(doc => doc.id === documentId);

    // Check if this document is free
    if (selectedDoc && parseFloat(selectedDoc.price) === 0) {
      // Skip modal and go directly to checkout for free document
      const queryParams = new URLSearchParams({
        slug: knowledgeSlug,
        documents: documentId.toString(),
      });
      router.push(`/${locale}/checkout?${queryParams.toString()}`);
      return;
    }

    setSelectedDocumentId(documentId);
    setBuyModalOpened(true);
  };

  // Ensure all <img> in HTML have meaningful alt text
  const ensureImageAlts = useCallback((html?: string) => {
    if (!html || typeof window === 'undefined') return html || '';
    try {
      const container = document.createElement('div');
      container.innerHTML = html;
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        const existingAlt = img.getAttribute('alt');
        if (existingAlt === null || existingAlt.trim() === '') {
          const src = img.getAttribute('src') || '';
          const fileName = src.split('/').pop()?.split('?')[0] || '';
          const baseAlt = isRTL ? 'صورة من المحتوى' : 'Content image';
          const contextualAlt = knowledge?.slug
            ? `${baseAlt}: ${knowledge.slug}`
            : `${baseAlt}`;
          img.setAttribute(
            'alt',
            fileName ? `${contextualAlt} - ${fileName}` : contextualAlt
          );
        }
      });
      return container.innerHTML;
    } catch {
      return html;
    }
  }, [isRTL, knowledge?.slug]);

  const processedKnowledgeDescription = useMemo(() => {
    return ensureImageAlts(knowledge.description);
  }, [ensureImageAlts, knowledge.description]);

  return (
    <div className={styles.container}>
      <div className={styles.py10}>
        {/* Description Section */}
        <div 
          className={`${styles.description} bg-transparent p-3 rounded mb-3`}
           dir={isArabicContent? 'rtl' : 'ltr'}
          dangerouslySetInnerHTML={{ __html: processedKnowledgeDescription }}
        />

      

        <div className="flex items-center gap-2 px-4 py-2 mb-4 ">
          <div className="flex items-center justify-center w-6 h-6">
            <SparklesIcon className="w-full h-full text-yellow-400" />
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {translations.chooseReportSections}
          </span>
        </div>
        <Group gap="xs" className="px-4 pt-3 bg-slate-50/50 rounded-lg">
          <IconFiles size={20} className="text-slate-600" />
          <Text size="sm" c="dimmed" className='capitalize'>{translations.thisIncludes}</Text>
          <Badge variant="light" color="blue" size="sm">
            {knowledge.documents.length} {translations.documents}
          </Badge>
        </Group>
        {/* Documents Section */}
        <div className={styles.documentsContainer}>
          {knowledge.documents && knowledge.documents.length > 0 ? (
            [...knowledge.documents]
              .sort((a, b) => {
                const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
                const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
                return priceA - priceB;
              })
              .map((doc) => (
              <div key={doc.id} id={`doc-card-${doc.id}`} className={`${styles.documentCard} ${styles.expandable} ${styles.cardHover}`}>
                <div 
                  className={`${styles.documentHeader} ${styles.focusVisible}`}
                  onClick={() => {
                    const element = document.getElementById(`doc-content-${doc.id}`);
                    const card = document.getElementById(`doc-card-${doc.id}`);
                    if (element && card) {
                      element.classList.toggle(styles.expanded);
                      card.classList.toggle(styles.active);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const element = document.getElementById(`doc-content-${doc.id}`);
                      const card = document.getElementById(`doc-card-${doc.id}`);
                      if (element && card) {
                        element.classList.toggle(styles.expanded);
                        card.classList.toggle(styles.active);
                      }
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`doc-content-${doc.id}`}
                  aria-describedby={`doc-price-${doc.id}`}
                >
                  <div className={styles.fileIcon}>
                    <Image
                      src={getFileIconByExtension(doc.file_extension)}
                      alt={`${doc.file_extension.toUpperCase()} file`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-sm text-gray-900 font-semibold">
                      {doc.file_name}
                    </h5>
                    <small className="text-xs text-gray-400 ">
                      {doc.file_size < 1024 * 1000
                        ? `${(doc.file_size / 1024).toFixed(2)} KB`
                        : `${(doc.file_size / (1024 * 1024)).toFixed(2)} MB`}
                    </small>
                  </div>
                  <div className={styles.priceTag}>
                    {parseFloat(doc.price) === 0 ? (
                      <>
                        <span id={`doc-price-${doc.id}`} className={`${styles.badge} ${styles.badgeFree}`} role="text" aria-label={`${translations.free} document`}>
                          {translations.free}
                        </span>
                        {doc.is_purchased && (
                          <span className={styles.purchasedMini} role="text" aria-label={`${translations.purchasedMini} - ${doc.file_name}`}>
                            {translations.purchasedMini}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span id={`doc-price-${doc.id}`} className={`${styles.badge}`} role="text" aria-label={`Price: $${parseFloat(doc.price).toFixed(2)}`}>
                          ${parseFloat(doc.price).toFixed(2)}
                        </span>
                        {doc.is_purchased && (
                          <span className={styles.purchasedMini} role="text" aria-label={`${translations.purchasedMini} - ${doc.file_name}`}>
                            {translations.purchasedMini}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className={styles.expandIcon}>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                    <span className={styles.srOnly}>{isRTL ? 'توسيع أو طي تفاصيل المستند' : 'Expand or collapse document details'}</span>
                  </div>
                </div>
                <div id={`doc-content-${doc.id}`} className={styles.documentContent}>
                  {doc.description && (
                    <div className={styles.description}>
                      <h6>{translations.description}</h6>
                      <p dangerouslySetInnerHTML={{ __html: ensureImageAlts(doc.description || '') }}></p>
                    </div>
                  )}
                  {doc.table_of_content && Array.isArray(doc.table_of_content) && doc.table_of_content.length > 0 && (
                    <div className={styles.tableOfContents} dir={isContentRTL ? 'rtl' : 'ltr'}>
                      <h6>{translations.tableOfContents}</h6>
                      <table className={styles.tocTable}>
                        {/* <thead>
                          <tr>
                            <th>{translations.chapter}</th>
                            <th className={styles.tocTitleHeader}></th>
                          </tr>
                        </thead> */}
                        <tbody>
                          {doc.table_of_content.map((toc, index) => (
                            <tr key={index}>
                              <td className={styles.tocChapterCol}>
                                {translations.chapter} {index + 1}
                              </td>
                              <td>{toc.chapter?.title || toc.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-start space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    {!isOwner && (
                      <div className="flex items-center gap-2">
                      {doc.is_purchased ? (
                        <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = process.env.NEXT_PUBLIC_DASHBOARD_URL + '/app/insighter-dashboard/my-downloads' || 'https://app.insightabusiness.com/app/insighter-dashboard/my-downloads';
                          }}
                          className={`btn-sm mx-4 text-white bg-green-600 text-sm hover:bg-green-700 transition duration-150 ease-in-out group text-sm px-3 py-1 cursor-pointer ${styles.modernButton} ${styles.focusVisible}`}
                          aria-label={`${translations.alreadyPurchased} - ${doc.file_name}`}
                        >
                          {translations.alreadyPurchased} <span className="tracking-normal text-white group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true">-&gt;</span>
                        </button>
                        {parseFloat(doc.price) > 0 && (
                          <span  role="text" aria-label={`Price: $${parseFloat(doc.price).toFixed(2)}`}>
                            ${parseFloat(doc.price).toFixed(2)}
                          </span>
                        )}
                        </>
                      ) : doc.price === "0" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyClick(doc.id);
                          }}
                          className={`btn-sm mx-4 text-white bg-[#1C7CBB] text-sm hover:bg-opacity-90 transition duration-150 ease-in-out group text-sm px-3 py-1 cursor-pointer ${styles.modernButton} ${styles.focusVisible}`}
                          aria-label={`${translations.download} ${doc.file_name} - ${translations.free}`}
                        >
                          {translations.download}  <IconCloudUpload size={16} className="ms-1" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyClick(doc.id);
                          }}
                          className={`btn-sm mx-4 text-white bg-[#1C7CBB] text-sm hover:bg-opacity-90 transition duration-150 ease-in-out group text-sm px-3 py-1 cursor-pointer ${styles.modernButton} ${styles.focusVisible}`}
                          aria-label={`${translations.buyNow} ${doc.file_name} - $${parseFloat(doc.price).toFixed(2)}`}
                        >
                          {translations.buyNow} <IconCloudUpload size={16} className="ms-1" aria-hidden="true" />
                        </button>
                      )}
                      </div>
                    )}
                    <div>
                      {/* <button 
                        className={`btn-sm text-slate-600 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 transition duration-150 ease-in-out text-sm px-3 py-1 flex items-center border border-slate-300 cursor-pointer ${styles.modernButton} ${styles.focusVisible}`}
                        disabled
                        aria-label={`${translations.evaluateWithAI} - ${doc.file_name} (${isRTL ? 'قريباً' : 'Coming soon'})`}
                        title={isRTL ? 'هذه الميزة قريباً' : 'This feature is coming soon'}
                      >
                        <svg className="shrink-0 fill-slate-600 mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12" aria-hidden="true">
                          <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                        </svg>
                        <span>{translations.evaluateWithAI}</span>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.textGray600}>{translations.noDocumentsAvailable}</p>
          )}
        </div>
      </div>

      {/* Buy Modal */}
      <BuyModal
        opened={buyModalOpened}
        onClose={() => setBuyModalOpened(false)}
        documents={knowledge.documents}
        preSelectedDocumentId={selectedDocumentId}
        knowledgeSlug={knowledgeSlug}
        
      />

      {/* Auth Modal */}
      <AuthModal
        opened={authModalOpened}
        onClose={() => setAuthModalOpened(false)}
        locale={locale as string}
      />
    </div>
  )
}
