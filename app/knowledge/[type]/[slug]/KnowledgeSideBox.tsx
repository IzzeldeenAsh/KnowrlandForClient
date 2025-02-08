import { DocumentTextIcon, GlobeAltIcon, CalendarIcon, ClockIcon, BuildingLibraryIcon, TruckIcon } from '@heroicons/react/24/outline';
import styles from './knowledge.module.css';

interface Document {
  file_extension: string;
}

interface KnowledgeSideBoxProps {
  total_price: string;
  documents: Document[];
  language: string;
  isic_code?: {
    name: string;
  };
  hs_code?: any;
  published_at: string;
}

const KnowledgeSideBox = ({
  total_price,
  documents,
  language,
  isic_code,
  hs_code,
  published_at,
}: KnowledgeSideBoxProps) => {
  // Count documents by extension
  const documentCounts = documents.reduce((acc: { [key: string]: number }, doc) => {
    const ext = doc.file_extension.toLowerCase();
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="tp-course-details2-widget">
      <div className="p-4">
        <div className="text-center mb-4">
     <span className='text-3xl font-bold'>  ${total_price}</span>   
          <span className="text-md text-gray-500 ml-2 capitalize">One time purchase</span>
        </div>

        <div className="space-y-3 mb-4">
          <button className="w-full font-semibold bg-gradient-to-r from-sky-400 to-sky-500 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors">
            Buy Now
          </button>
          <button className="w-full font-semibold  bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
            Add to Cart
          </button>
        </div>

        <div className="space-y-4">
          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Documents
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
              Documents Language
            </span>
            <span className="block mt-1">{language}</span>
          </div>

          {isic_code && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span>
                <BuildingLibraryIcon className="w-5 h-5 mr-2" />
                ISIC Code
              </span>
              <span className="block mt-1">{isic_code.name}</span>
            </div>
          )}

          {hs_code && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span>
                <TruckIcon className="w-5 h-5 mr-2" />
                HS Code
              </span>
              <span className="block mt-1">{hs_code}</span>
            </div>
          )}

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <CalendarIcon className="w-5 h-5 mr-2" />
              Published At
            </span>
          <span className="block mt-1">
            {published_at ? new Date(published_at).toLocaleDateString() : "N/A"}
          </span>
          </div>

          <div className="tp-course-details2-widget-list-item flex items-center justify-between">
            <span>
              <ClockIcon className="w-5 h-5 mr-2" />
              Last Update
            </span>
            <span className="block mt-1">N/A</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSideBox;
