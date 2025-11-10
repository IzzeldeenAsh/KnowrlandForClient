"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Illustration from "@/public/images/glow-top-blue.svg";
import ChangelogImg04 from "@/public/images/Budget.png";
import { useLocale } from "next-intl";
import { UserGroupIcon, 
  CalendarIcon,
  StarIcon,
  DocumentArrowDownIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  MagnifyingGlassCircleIcon,
  GlobeAltIcon, 
  RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function Features() {
  const t = useTranslations("Features");
  const t2 = useTranslations("Features2");
  const t3 = useTranslations("Features3");
  const [tab, setTab] = useState<number>(1);
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  // Add state for video hover
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isButtonsHovered, setIsButtonsHovered] = useState(false);

  // States to track which tab is being hovered for each section
  const [hoveredTab1, setHoveredTab1] = useState<number | null>(null);
  const [hoveredTab2, setHoveredTab2] = useState<number | null>(null);
  const [hoveredTab3, setHoveredTab3] = useState<number | null>(null);

  // States for automatic cycling
  const [activeTab1, setActiveTab1] = useState<number>(1);
  const [activeTab2, setActiveTab2] = useState<number>(1);
  const [activeTab3, setActiveTab3] = useState<number>(1);
  const [isHovering1, setIsHovering1] = useState<boolean>(false);
  const [isHovering2, setIsHovering2] = useState<boolean>(false);
  const [isHovering3, setIsHovering3] = useState<boolean>(false);

  // Auto-cycling effect for section 1
  useEffect(() => {
    if (!isHovering1) {
      const interval = setInterval(() => {
        setActiveTab1(prev => prev >= 3 ? 1 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovering1]);

  // Auto-cycling effect for section 2
  useEffect(() => {
    if (!isHovering2) {
      const interval = setInterval(() => {
        setActiveTab2(prev => prev >= 3 ? 1 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovering2]);

  // Auto-cycling effect for section 3
  useEffect(() => {
    if (!isHovering3) {
      const interval = setInterval(() => {
        setActiveTab3(prev => prev >= 3 ? 1 : prev + 1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovering3]);

  return (
    <section>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Illustration */}
        <div
          className="absolute inset-0 -z-10 -mx-28 rounded-t-[3rem] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10">
            <Image
              src={Illustration}
              className="max-w-none"
              width={1404}
              height={658}
              alt="Features Illustration"
            />
          </div>
        </div>
   {/* First */}
   <div className="pt-16 pb-12 sm:pt-20 md:pt-24 lg:pt-28 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row-reverse space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Image */}
              <div className="w-full sm:w-4/5 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <figure className=" rounded-3xl p-px mb-8">
                  <div className="relative flex items-center justify-center " style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 rounded-lg to-transparent rounded-[inherit]" />
                      <Image
                        className={`rounded-[inherit] transition-all duration-700 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full ${hoveredTab1 === 1 || (hoveredTab1 === null && activeTab1 === 1) ? 'opacity-100' : 'opacity-0'}`}
                        src={'/images/ask-screenshot.png'}
                        width={700}
                        height={700}
                        alt="Feature 2 - Image 1"
                        
                        style={{ objectFit: 'contain', borderRadius: '10px' }}
                      />
                      <div className="absolute inset-0  rounded-[inherit]" />
                    </div>
                    <Image
                      className={`w-full h-full rounded-[inherit] transition-all duration-700 ease-in-out absolute ${hoveredTab1 === 2 || (hoveredTab1 === null && activeTab1 === 2) ? 'opacity-100' : 'opacity-0'}`}
                      src={'/images/book-meeting.png'}
                      width={500}
                      height={500}
                      alt="Feature 2 - Image 2"
                      style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                    />
                    <Image
                      className={`w-full h-full rounded-[inherit] transition-all duration-700 ease-in-out absolute ${hoveredTab1 === 3 || (hoveredTab1 === null && activeTab1 === 3) ? 'opacity-100' : 'opacity-0'}`}
                      src={'/images/rating.png'}
                      width={500}
                      height={500}
                      alt="Feature 2 - Image 3"
                      style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                    />
                  </div>
                </figure>
              </div>

              {/* Content */}
              <div
                className="flex-1 order-1 max-md:text-center sm:max-w-xl md:max-w-lg"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t2("tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t2("title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t2("description")}
                </p>
                <div className="mt-8 max-w-md space-y-2">
                  <button
                    onMouseEnter={() => {
                      setHoveredTab1(1);
                      setIsHovering1(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab1(null);
                      setIsHovering1(false);
                    }}
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab1 === 1 || (hoveredTab1 === null && activeTab1 === 1) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                  >
                    <UserGroupIcon className="h-5 w-5 text-blue-300" />
                    <span>{t2("tabs.directExpertEngagement.title")}</span>
                  </button>

                  <button
                    onMouseEnter={() => {
                      setHoveredTab1(2);
                      setIsHovering1(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab1(null);
                      setIsHovering1(false);
                    }}
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab1 === 2 || (hoveredTab1 === null && activeTab1 === 2) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                  >
                    <CalendarIcon className="h-5 w-5 text-blue-300" />
                    <span>{t2("tabs.consultingSessions.title")}</span>
                  </button>

                  <button
                    onMouseEnter={() => {
                      setHoveredTab1(3);
                      setIsHovering1(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab1(null);
                      setIsHovering1(false);
                    }}
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab1 === 3 || (hoveredTab1 === null && activeTab1 === 3) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                  >
                    <StarIcon className="h-5 w-5 text-blue-300" />
                    <span>{t2("tabs.expertRatings.title")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

     

        {/* Second */}
   
        <div className="pt-16 pb-12 sm:pt-20 md:pt-28 lg:pt-32 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-center justify-between">
              {/* Content */}
              <div
                className="flex-1 order-1 max-md:text-center sm:max-w-xl md:max-w-lg"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t("tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t("title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t("description")}
                </p>
                <div className="mt-8 max-w-md space-y-2">
                  <button
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab2 === 1 || (hoveredTab2 === null && activeTab2 === 1) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                    onMouseEnter={() => {
                      setHoveredTab2(1);
                      setIsHovering2(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab2(null);
                      setIsHovering2(false);
                    }}
                  >
                    <MagnifyingGlassCircleIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                    <span>{t("tabs.preciseResults.title")}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab2 === 2 || (hoveredTab2 === null && activeTab2 === 2) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                    onMouseEnter={() => {
                      setHoveredTab2(2);
                      setIsHovering2(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab2(null);
                      setIsHovering2(false);
                    }}
                  >
                    <GlobeAltIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                    <span>{t("tabs.variableData.title")}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab2 === 3 || (hoveredTab2 === null && activeTab2 === 3) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                    onMouseEnter={() => {
                      setHoveredTab2(3);
                      setIsHovering2(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab2(null);
                      setIsHovering2(false);
                    }}
                  >
                    <RocketLaunchIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                    <span>{t("tabs.fasterDecisions.title")}</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="w-full sm:w-4/5 md:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <figure className="rounded-3xl p-px mb-8">
                <div className="relative flex items-center justify-center" style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
                    <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 my-auto ${hoveredTab2 === 1 || (hoveredTab2 === null && activeTab2 === 1) ? 'opacity-100' : 'opacity-0'}`}
                      src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1747832518/Group_13495_kf7osl.png'}
                        width={500}
                      height={500}
                      alt="Feature 1 - Image 1"
                      style={{ objectFit: 'cover' }}  
                    />
                             {/* <figure className=" rounded-3xl p-px mb-8 overflow-hidden mt-10 max-w-[600px] h-[500px] w-[500px] mx-auto">
                  <video 
                    className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0`}
                    onMouseEnter={() => setIsVideoHovered(true)}
                    onMouseLeave={() => setIsVideoHovered(false)}
                    loop 
                    muted 
                    playsInline
                    src="/images/AI_Generate.mp4"
                    ref={(videoElement) => {
                      if (videoElement) {
                        if (isVideoHovered || isButtonsHovered) {
                          videoElement.play();
                        } else {
                          videoElement.pause();
                        }
                      }
                    }}
                  />
                </figure> */}
                    <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab2 === 2 || (hoveredTab2 === null && activeTab2 === 2) ? 'opacity-100' : 'opacity-0'}`}
                      src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1748025536/New_Project_11_xenv7c.png'}
                      width={500}
                      height={500}
                      alt="Feature 1 - Image 2"
                      style={{ objectFit: 'cover' }}
                    />
                    <Image
                      className={`w-full rounded-[inherit] transition-all duration-700 ease-in-out absolute inset-0 ${hoveredTab2 === 3 || (hoveredTab2 === null && activeTab2 === 3) ? 'opacity-100' : 'opacity-0'}`}
                      src={'https://res.cloudinary.com/dsiku9ipv/image/upload/v1748087334/Group_13447_3_zjyfju.png'}
                      width={500}
                      height={500}
                      alt="Feature 1 - Image 3"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>


        {/* Third */}
        <div className="pt-16 pb-12 sm:pt-20 md:pt-24 lg:pt-28 sm:pb-16 md:pb-20">
          <div>
            {/* Section content */}
            <div className="max-w-xl mx-auto md:max-w-none flex flex-col sm:flex-col md:flex-row space-y-8 space-y-reverse md:space-y-0 gap-8 items-start justify-between">
            
                 {/* Content */}
              <div
                className="flex-1 order-1 max-md:text-center sm:max-w-xl md:max-w-lg"
                data-aos="fade-down"
              >
                {/* Content #1 */}
                <div>
                  <div className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200 pb-3">
                    {t3("tagline")}
                  </div>
                </div>
                <h3 className="h3 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-3">
                  {t3("title")}
                </h3>
                <p className="text-lg text-slate-400 mb-8">
                  {t3("description")}
                </p>
                <div className="mt-8 max-w-md space-y-2">
                <button
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab3 === 1 || (hoveredTab3 === null && activeTab3 === 1) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                    onMouseEnter={() => {
                      setHoveredTab3(1);
                      setIsHovering3(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab3(null);
                      setIsHovering3(false);
                    }}
                  >
                    <DocumentArrowDownIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                    <span>{t3("tabs.no-monthly-subscription.title")}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab3 === 2 || (hoveredTab3 === null && activeTab3 === 2) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                    onMouseEnter={() => {
                      setHoveredTab3(2);
                      setIsHovering3(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab3(null);
                      setIsHovering3(false);
                    }}
                  >
                    <CurrencyDollarIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                    <span>{t3("tabs.payAsYouGo.title")}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 text-start text-sm font-medium text-slate-50 rounded border bg-slate-800/25 w-full px-3 py-2 transition duration-150 ease-in-out hover:opacity-100 border-slate-700 ${hoveredTab3 === 3 || (hoveredTab3 === null && activeTab3 === 3) ? 'opacity-100' : 'opacity-70'} min-h-[60px]`}
                    onMouseEnter={() => {
                      setHoveredTab3(3);
                      setIsHovering3(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredTab3(null);
                      setIsHovering3(false);
                    }}
                  >
                    <ShoppingBagIcon className="w-5 h-5 flex-shrink-0 text-blue-300" />
                    <span>{t3("tabs.purchaseSpecific.title")}</span>
                  </button>
                </div>
              </div>
                 {/* Image */}
              <div className="w-full bg-gradient-to-br from-blue-500/10 rounded-lg to-transparent sm:w-4/5 md:w-1/2 order-2" data-aos="fade-up" data-aos-delay="100">
                <figure className=" rounded-3xl p-px mb-8">
                <div className="relative flex items-center justify-center h-100" style={{ width: '100%', overflow: 'hidden' }}>
            
             
                <figure className=" rounded-3xl p-px mb-8 overflow-hidden mt-10 w-[800px]  mx-auto">
                  <Image
                    className="w-full rounded-[inherit]"
                    src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1748087733/Group_13523_1_nk8pqq.png"
                    width={800}
                    height={800}
                    alt="Pay for what you need"
                  />
                </figure>  
       

                  
                  </div>
                </figure>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
            