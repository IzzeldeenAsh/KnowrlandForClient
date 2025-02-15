import { DocumentTextIcon, GlobeAltIcon, CalendarIcon, ClockIcon, BuildingLibraryIcon, TruckIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import styles from './knowledge.module.css';

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
  countries

}: KnowledgeSideBoxProps) => {
  const documentCounts = documents.reduce((acc: { [key: string]: number }, doc) => {
    const ext = doc.file_extension.toLowerCase();
    acc[ext] = (acc[ext] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="tp-course-details2-widget sticky ">
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

        <div className="space-y-3">
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
            <span className="block mt-1 capitalize">{language}</span>
          </div>

          {isic_code && (
            <div className="tp-course-details2-widget-list-item flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-gray-700">
                <BuildingLibraryIcon className="w-5 h-5 mr-2" />
                ISIC Code
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
                HS Code
              </span>
              <span className="block mt-1">{hs_code}</span>
            </div>
          )}

          {
            economic_blocs && economic_blocs.length > 0 && (
              economic_blocs.map((economicBloc) => (
               
                <div key={economicBloc.id} className="tp-course-details2-widget-list-item flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2" />
                    Economic Block
                  </span>
                  <span className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                    {economicBloc.name}
                  </span>
                </div>
              ))
            )
          }
          {
            regions && regions.length > 0 && (
              regions.map((region:any) => (
                <div key={region.id} className="tp-course-details2-widget-list-item flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2" />
                    Region
                  </span>
                  <span className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                    {region.name}
                  </span>
                </div>
              ))
            )
          }
          {
            countries && countries.length > 0 && (
              countries.map((country:any) => (
                <div key={country.id} className="tp-course-details2-widget-list-item flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium text-gray-700">
                    <GlobeAsiaAustraliaIcon className="w-5 h-5 mr-2" />
                    Country
                  </span>
                  <span className="badge bg-[#f1f1f4] text-[#4b5675] text-xs font-medium px-2.5 py-0.5 rounded">
                    {country.name}
                  </span>
                </div>
              ))
            )
          }

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
