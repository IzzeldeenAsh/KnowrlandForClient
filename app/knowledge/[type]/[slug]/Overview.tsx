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
  table_of_content: Array<{
    chapter: {
      title: string
    }
  }>
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

export default function Overview({ knowledge }: OverviewProps) {

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
                  {doc.table_of_content && Array.isArray(doc.table_of_content) && (
                    <div className={styles.tableOfContents}>
                      <h6>Table of Contents</h6>
                      <table className={styles.tocTable}>
                        <thead>
                          <tr>
                            <th>Chapter</th>
                            <th>Title</th>
                            <th>Page</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doc.table_of_content.map((toc, index) => (
                            <tr key={index}>
                              <td>Chapter {index + 1}</td>
                              <td>{toc.chapter.title}</td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-start space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    <div>
                      <a className="btn-sm text-white bg-[#1C7CBB] text-sm hover:bg-opacity-90 transition duration-150 ease-in-out group text-sm px-3 py-1 cursor-pointer">
                        Add to Cart <span className="tracking-normal text-white group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                      </a>
                    </div>
                    <div>
                      <a className="btn-sm text-slate-600 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 transition duration-150 ease-in-out text-sm px-3 py-1 flex items-center border border-slate-300 cursor-pointer">
                        <svg className="shrink-0 fill-slate-600 mr-2" xmlns="http://www.w3.org/2000/svg" width="12" height="12">
                          <path d="m1.999 0 1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 0l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM11.999 10l1 2-1 2 2-1 2 1-1-2 1-2-2 1zM6.292 7.586l2.646-2.647L11.06 7.06 8.413 9.707zM0 13.878l5.586-5.586 2.122 2.121L2.12 16z" />
                        </svg>
                        <span>Preview</span>
                      </a>
                    </div>
                  </div>
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
