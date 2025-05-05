"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Illustration from "@/public/images/glow-top-blue.svg";
import IllustrationTop from '@/public/images/pricing-illustration-top.svg'
import Particles from '@/components/particles'
import { useLocale } from 'next-intl';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

type InsighterItem = {
  title: string;
  description: string;
  image: string;
  icon: string;
  position: "left" | "right";
};

export default function InsighterFeatures() {
  const t = useTranslations("InsighterFeatures");
  const items = t.raw("items") as InsighterItem[]; 
  const ctaButton = t("ctaButton");
  const locale = useLocale();
  const isRTL = locale === 'ar'; 
  
  return (
    <ParallaxProvider>
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
          <div className="pt-32 relative">
            {/* Hero content */}
            <div
              className="absolute inset-0 -z-10 -mx-28 rounded-b-[3rem] pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 -z-10">
                <Image
                  src={Illustration}
                  className="max-w-none"
                  width={2146}
                  priority
                  alt="Hero Illustration"
                />
              </div>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-5 leading-[1.2]"
                data-aos="fade-down"
              >
                {t("title")}
              </h2>
              <p
                className="text-xl text-slate-300 mb-8"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                {t("description")}
              </p>
            </div>
          </div>
          {/* Section First */}
          <div className="pb-10">
            <div>
              <div className="max-w-4xl mx-auto text-center" data-aos="fade-down">
                 <h5
                  className={`pb-4 text-lg sm:text-xl md:text-2xl text-slate-200 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("insighter.title")}{" "}
                  <span className="text-[#2ECFC3] font-semibold text-xl sm:text-3xl">
                    {t("insighter.insighterText")}
                  </span>
                </h5>
                <ul className="text-lg text-slate-300 space-y-4 pt-6 text-left ltr:ml-5 rtl:mr-5">
                  <li className="flex items-start gap-3">
                    <Image src="/images/triangle.svg" alt="triangle" width={16} height={16} className={`${isRTL ? "rotate-180" : ""}`} />
                    <span className="text-[18px] font-light">{t("insighter.point1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image src="/images/triangle.svg" alt="triangle" width={16} height={16} className={`${isRTL ? "rotate-180" : ""}`} />
                    <span className="text-[18px] font-light">{t("insighter.point2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image src="/images/triangle.svg" alt="triangle" width={16} height={16} className={`${isRTL ? "rotate-180" : ""}`} />
                    <span className="text-[18px] font-light">{t("insighter.point3")}</span>
                  </li>
                </ul>
              </div>

              {/* Button Options */}
              <div className="text-center pb-8">
                <div className="inline-flex items-center justify-center relative">
                  {/* Particles animation */}
                  <Particles className="absolute inset-0 -z-10" quantity={10} />
                  <div className="inline-flex opacity-50">
                    <Image src={IllustrationTop} width="334" height="334" alt="Features illustration" />
                  </div>
                  <Image className="absolute -mt-[40%]" src={IllustrationTop} width="396" height="328" alt="Features illustration top" aria-hidden="true" />
                  
                  {/* Role buttons with floating animation - column on small screens, row on larger screens */}
                  <div className="absolute w-full z-20">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-0">
                      {/* Field Expert */}
                      <div className="animate-[float_4s_ease-in-out_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em]">
                            {t("insighter.roles.fieldExpert")}
                          </span>
                        </div>
                      </div>
                      
                      {/* Strategist */}
                      <div className="animate-[float_3.5s_ease-in-out_0.5s_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em]">
                            {t("insighter.roles.strategist")}
                          </span>
                        </div>
                      </div>

                      {/* Consultant */}
                      <div className="animate-[float_4.2s_ease-in-out_0.7s_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em]">
                            {t("insighter.roles.consultant")}
                          </span>
                        </div>
                      </div>

                      {/* Technician */}
                      <div className="animate-[float_3.8s_ease-in-out_0.3s_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em]">
                            {t("insighter.roles.technician")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            {/* Section Second */}
           <div className="bg-[#151F34] py-20 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6" data-aos="fade-down">
                  <h5
                    className={`${
                      isRTL ? "text-right" : "text-left"
                    } text-lg sm:text-xl md:text-2xl text-slate-200 pb-8`}
                  >
                    {t("insighter.uploadTitle")}{" "}
                    <span className="text-[#2ECFC3] font-semibold text-xl sm:text-3xl">
                      {t("insighter.insighterText")}
                    </span>
                  </h5>

                <div className="grid gap-6 md:grid-cols-3 xl:gap-8">
                  {[
                    {
                      key: "businessReports",
                      icon: "/images/report.svg",
                    },
                    {
                      key: "playbooks",
                      icon: "/images/strategy.svg",
                    },
                    {
                      key: "manuals",
                      icon: "/images/sop.svg",
                    },
                    {
                      key: "technicalGuides",
                      icon: "/images/technical.svg",
                    },
                    {
                      key: "trainingMaterials",
                      icon: "/images/training.svg",
                    },
                    {
                      key: "dataSets",
                      icon: "/images/data.svg",
                    },
                  ].map((item, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                      <div className="relative h-full group">
                        <div className="relative h-full bg-slate-900 rounded-3xl z-20 overflow-hidden p-px
                             before:absolute before:w-96 before:h-96 before:-left-48 before:-top-48 before:bg-blue-500 before:rounded-full before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-500 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:hover:opacity-20 before:z-30 before:blur-[100px]
                             after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] after:group-hover:opacity-100 after:z-10">
                          <div className="flex flex-col h-full bg-slate-800 rounded-3xl relative overflow-hidden p-6">
                            {/* Radial gradient */}
                            <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square" aria-hidden="true">
                              <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[50px]" />
                            </div>
                            {/* Content */}
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col items-center text-center mb-4">
                                <Image
                                  src={item.icon}
                                  alt={t(`insighter.uploadTypes.${item.key}`)}
                                  width={60}
                                  height={60}
                                  className="mb-4"
                                />
                                <h3 className="inline-flex text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-1">
                                  {t(`insighter.uploadTypes.${item.key}`)}
                                </h3>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <div className="mb-4">
                    <span className="text-lg font-light text-slate-300">
                      {t("insighter.joinUs")}
                    </span>
                  </div>
                  <Link href="https://app.knoldg.com/auth/sign-up" className="btn text-slate-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white transition duration-150 ease-in-out group">
                    {t("insighter.cta")}
                    <span className="ml-2">
              
                    </span>
                  </Link>
                </div>
            </div>
          </div>

     


        </div>
      </section>
    </ParallaxProvider>
  );
}
