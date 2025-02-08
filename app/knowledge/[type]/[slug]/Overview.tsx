import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from './knowledge.module.css'
import { SparklesIcon } from '@heroicons/react/20/solid'

// Define interfaces for minimal typing, you can expand these as needed
interface Document {
  id: number
  file_name: string
  file_size: number
  price: string
  description: string | null
  file_extension: string
  table_of_content: {
    chapter: {
      title: string
    }
  }[] | null
}

export interface KnowledgeDetails {
  description: string
  documents: Document[]
  // Add other fields if needed
}

interface OverviewProps {
  knowledge: KnowledgeDetails
}

const getFileIconByExtension = (extension: string) => {
  // Map file extensions to their corresponding SVG icons
  const iconMap: { [key: string]: string } = {
    pdf: '/file-icons/pdf.svg',
    doc: '/file-icons/doc.svg',
    docx: '/file-icons/doc.svg',
    xls: '/file-icons/xls.svg',
    xlsx: '/file-icons/xls.svg',
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

export default function Overview({ knowledge }: OverviewProps) {
  useEffect(() => {
    if (knowledge.documents) {
      knowledge.documents.forEach((doc) => {
        console.log('Document:', doc);
        console.log('Table of Contents:', doc.table_of_content);
      });
    }
  }, [knowledge.documents]);

  return (
    <div className={styles.container}>
      <div className={styles.py10}>
        {/* Description Section */}
        <div className="bg-transparent p-3 rounded mb-3">
          <p
            className={`${styles.textLg} ${styles.textGray800}`}
            dangerouslySetInnerHTML={{ __html: knowledge.description }}
          />
        </div>

        <div className="flex items-center gap-2 px-4 py-2 mb-4 ">
          <div className="flex items-center justify-center w-6 h-6">
            <SparklesIcon className="w-full h-full text-yellow-400" />
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Choose report sections that fit your needs!
          </span>
        </div>

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
              <div key={doc.id} id={`doc-card-${doc.id}`} className={`${styles.documentCard} ${styles.expandable}`}>
                <div 
                  className={styles.documentHeader}
                  onClick={() => {
                    const element = document.getElementById(`doc-content-${doc.id}`);
                    const card = document.getElementById(`doc-card-${doc.id}`);
                    if (element && card) {
                      element.classList.toggle(styles.expanded);
                      card.classList.toggle(styles.active);
                    }
                  }}
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
                    <small className="text-xs text-gray-400 ">{(doc.file_size / 1024).toFixed(2)} KB</small>
                  </div>
                  <div className={styles.priceTag}>
                    <span className={styles.badge}>
                      ${parseFloat(doc.price).toFixed(2)}
                    </span>
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
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div id={`doc-content-${doc.id}`} className={styles.documentContent}>
                  {doc.description && (
                    <div className={styles.description}>
                      <h6>Description</h6>
                      <p>{doc.description}</p>
                    </div>
                  )}
                  {doc.table_of_content && (
                    <div className={styles.tableOfContents}>
                      <h6>Table of Contents</h6>
                      <table className={styles.tocTable}>
                        <thead>
                          <tr>
                            <th>Chapter</th>
                            <th>Title</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doc.table_of_content.map((item, index) => (
                            <tr key={index}>
                              <td>Chapter {index + 1}</td>
                              <td>{item.chapter.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.textGray600}>No documents available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
