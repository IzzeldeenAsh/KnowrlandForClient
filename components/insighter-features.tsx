"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Illustration from "@/public/images/glow-top-blue.svg";
import IllustrationTop from "@/public/images/pricing-illustration-top.svg";
import Particles from "@/components/particles";
import { useLocale } from "next-intl";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useState } from "react";
import Illustration2 from "@/public/images/page-illustration.svg";
import CustomersList from "@/app/[locale]/(default)/customers/customers-list";

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
  const isRTL = locale === "ar";
  const [visibleItems, setVisibleItems] = useState(9);

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
              <div
                className="max-w-4xl mx-auto text-center"
                data-aos="fade-down"
              >
                <h5
                  className={`pb-4 text-lg sm:text-xl md:text-2xl text-slate-200 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("insighter.title")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-200 font-semibold text-xl sm:text-3xl">
                    {t("insighter.insighterText")}
                  </span>
                </h5>
                <ul className="text-lg text-slate-300 space-y-4 pt-6 text-left ltr:ml-5 rtl:mr-5">
                  <li className="flex items-start gap-3">
                    <Image
                      src="/images/triangle2.svg"
                      alt="triangle"
                      width={16}
                      height={16}
                      className={`${isRTL ? "rotate-180" : ""} mt-1`}
                    />
                    <span className="text-[18px] text-start font-light">
                      {t("insighter.point1")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      src="/images/triangle2.svg"
                      alt="triangle"
                      width={16}
                      height={16}
                      className={`${isRTL ? "rotate-180" : ""} mt-1`}
                    />
                    <span className="text-[18px] text-start font-light">
                      {t("insighter.point2")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      src="/images/triangle2.svg"
                      alt="triangle"
                      width={16}
                      height={16}
                      className={`${isRTL ? "rotate-180" : ""} mt-1`}
                    />
                    <span className="text-[18px] text-start font-light">
                      {t("insighter.point3")}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Button Options */}
              <div className="text-center pb-8">
                <div className="inline-flex items-center justify-center relative">
                  {/* Particles animation */}
                  <Particles className="absolute inset-0 -z-10" quantity={10} />
                  <div className="inline-flex opacity-50">
                    <Image
                      src={IllustrationTop}
                      width="334"
                      height="334"
                      alt="Features illustration"
                    />
                  </div>
                  <Image
                    className="absolute -mt-[40%]"
                    src={IllustrationTop}
                    width="396"
                    height="328"
                    alt="Features illustration top"
                    aria-hidden="true"
                  />

                  {/* Role buttons with floating animation - column on small screens, row on larger screens */}
                  <div className="absolute w-full z-20">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-0">
                      {/* Field Expert */}
                      <div className="animate-[float_4s_ease-in-out_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em] whitespace-pre-line min-h-[44px] flex items-center justify-center">
                            {t("insighter.roles.fieldExpert")}
                          </span>
                        </div>
                      </div>

                      {/* Strategist */}
                      <div className="animate-[float_3.5s_ease-in-out_0.5s_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em] whitespace-pre-line min-h-[44px] flex items-center justify-center">
                            {t("insighter.roles.strategist")}
                          </span>
                        </div>
                      </div>

                      {/* Consultant */}
                      <div className="animate-[float_4.2s_ease-in-out_0.7s_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em] whitespace-pre-line min-h-[44px] flex items-center justify-center">
                            {t("insighter.roles.consultant")}
                          </span>
                        </div>
                      </div>

                      {/* Technician */}
                      <div className="animate-[float_3.8s_ease-in-out_0.3s_infinite]">
                        <div className="border border-white border-opacity-30 w-[160px] bg-slate-900/40 backdrop-blur-sm text-slate-300 px-6 py-3 rounded-xl text-lg cursor-default hover:border-opacity-50 transition-all duration-300 mb-3 md:mb-0">
                          <span className="text-[18px] font-extralight tracking-[0.02em] whitespace-pre-line min-h-[44px] flex items-center justify-center">
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
          {/* New CTA Section */}
          <div className="relative " dir={isRTL ? "rtl" : "ltr"}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="relative px-8 py-12 md:py-20 border-t border-b [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1]">
                {/* Blurred shape */}
                <div
                  className="absolute top-0 -mt-24 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-70 pointer-events-none -z-10"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="434"
                    height="427"
                  >
                    <defs>
                      <linearGradient
                        id="bs4-a"
                        x1="19.609%"
                        x2="50%"
                        y1="14.544%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4B9EFF"></stop>
                        <stop
                          offset="100%"
                          stopColor="#0066FF"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#bs4-a)"
                      fillRule="evenodd"
                      d="m0 0 461 369-284 58z"
                      transform="matrix(1 0 0 -1 0 427)"
                    ></path>
                  </svg>
                </div>
                {/* Particles animation */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24">
                  <Particles
                    className="absolute inset-0 -z-10"
                    quantity={6}
                    staticity={30}
                  />
                </div>
                {/* Content */}
                <div
                  className="text-xl text-slate-300 mb-8 text-center"
                  data-aos="fade-down"
                  data-aos-delay="200"
                >
                  <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                    {t("dataTypeSection.title")}
                  </h2>
                  <p
                    className="text-lg text-slate-400 mb-6"
                    dangerouslySetInnerHTML={{
                      __html: t("dataTypeSection.description"),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Second */}
          <div className="bg-[#151F34] py-20 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <div
              className="max-w-6xl mx-auto px-4 sm:px-6"
              data-aos="fade-down"
            >
              <h5
                className={`${
                  isRTL ? "text-right" : "text-left"
                } text-lg sm:text-xl md:text-2xl text-slate-200 pb-8`}
              >
                {t("insighter.uploadTitle")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-200 font-semibold text-xl sm:text-3xl">
                  {t("insighter.insighterText2")}
                </span>
              </h5>

              <div className="grid gap-6 md:grid-cols-3 xl:gap-8">
                {[
                  {
                    key: "dataSets",
                    icon: "/images/data.svg",
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
                    key: "businessReports",
                    icon: "/images/report.svg",
                  },
                  {
                    key: "supplyChain",
                    icon: "/images/supply-chain.svg",
                  },
                  {
                    key: "marketSize",
                    icon: "/images/market-size.svg",
                  },
                  {
                    key: "customerBehavior",
                    icon: "/images/customer-behavior.svg",
                  },
                  {
                    key: "internationalTrade",
                    icon: "/images/International-Trade.svg",
                  },
                  {
                    key: "investmentOpportunities",
                    icon: "/images/Investment-Opportunities.svg",
                  },
                  {
                    key: "investmentGrowthStrategies",
                    icon: "/images/Investment-&-Growth-Strategies.svg",
                  },
                  {
                    key: "businessStrategiesPlans",
                    icon: "/images/Business-Strategies-&-Plans.svg",
                  },
                  {
                    key: "currentStateAnalysis",
                    icon: "/images/Current-State-Analysis.svg",
                  },
                  {
                    key: "benchmarkingStudies",
                    icon: "/images/Benchmarking-Studies.svg",
                  },
                  {
                    key: "statistics",
                    icon: "/images/General-&-Sector-Specific-Statistics.svg",
                  },
                  {
                    key: "regulatoryPolicies",
                    icon: "/images/Official-Policies-&-Procedures.svg",
                  },
                  {
                    key: "technicalStudies",
                    icon: "/images/Specialized-Technical-Studies.svg",
                  },
                  {
                    key: "supplierListsPriceQuotes",
                    icon: "/images/Supplier-Lists-&-Price-Quotes.svg",
                  },
                  {
                    key: "pricingStrategies",
                    icon: "/images/Pricing-Policies-&-Strategies.svg",
                  },
                  {
                    key: "marketTrendsPriceForecasts",
                    icon: "/images/Market-Trends-&-Price-Forecasts.svg",
                  },
                  {
                    key: "periodicReportsMarketInsights",
                    icon: "/images/Periodic-Reports-&-Market-Insights.svg",
                  },
                  {
                    key: "competitorAnalysis",
                    icon: "/images/Competitor-Analysis.svg",
                  },
                  {
                    key: "marketEntryStrategies",
                    icon: "/images/Market-Entry-Strategies.svg",
                  },
                  {
                    key: "exportOpportunities",
                    icon: "/images/Export-Opportunities-&-Potential-Clients.svg",
                  },
                  {
                    key: "feasibilityStudies",
                    icon: "/images/Feasibility-Studies.svg",
                  },
                  {
                    key: "digitalTransformation",
                    icon: "/images/Digital-Transformation-&-Automation.svg",
                  },
                  {
                    key: "complianceGovernance",
                    icon: "/images/Compliance-&-Governance-Policies.svg",
                  },
                  {
                    key: "organizationalChangePlans",
                    icon: "/images/Organizational-Change-Plans.svg",
                  },
                  {
                    key: "projectIdeasSolutions",
                    icon: "/images/Project-Ideas-&-Practical-Solutions.svg",
                  },
                  {
                    key: "focusGroupWorkshopOutputs",
                    icon: "/images/Focus-Group-&-Workshop-Outputs.svg",
                  },
                  {
                    key: "supplyChainSources",
                    icon: "/images/Supply-Chain-&-Input-Sources.svg",
                  },
                  {
                    key: "salesDataConsumerBehavior",
                    icon: "/images/Sales-Data-&-Consumer-Behavior.svg",
                  },
                  {
                    key: "operationalWorkEnvironment",
                    icon: "/images/Operational-Conditions-&-Work-Environment.svg",
                  },
                  {
                    key: "qualityMetrics",
                    icon: "/images/Quality-Metrics-&-Statistics.svg",
                  },
                  {
                    key: "operationalCaseStudies",
                    icon: "/images/Operational-Case-Studies.svg",
                  },
                  {
                    key: "rootCauseAnalysis",
                    icon: "/images/Results-&-Root-Cause-Analysis.svg",
                  },
                  {
                    key: "productionAssessment",
                    icon: "/images/Production-Line-&-Equipment-Assessment.svg",
                  },
                  {
                    key: "financialAnalysis",
                    icon: "/images/Financial-Data-&-Analysis.svg",
                  },
                  {
                    key: "businessNews",
                    icon: "/images/Business-News-&-Updates.svg",
                  },
                  {
                    key: "trainingContent",
                    icon: "/images/Training-&-Educational-Content.svg",
                  },
                  {
                    key: "skillDevelopmentPlans",
                    icon: "/images/Skill-Development-Plans.svg",
                  },
                  {
                    key: "businessTemplates",
                    icon: "/images/Business-Tools-&-Templates-(Excel, BI).svg",
                  },
                  {
                    key: "decisionMakingTools",
                    icon: "/images/Data-Analysis-&-Decision-Making-Tools.svg",
                  },
                ]
                  .slice(0, visibleItems)
                  .map((item, index) => (
                    <div
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="relative h-full group rounded-md">
                        <div className="relative h-full bg-slate-900 rounded-[inherit] z-20 overflow-hidden">
                          <Particles
                            className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                            quantity={3}
                          />
                          <div
                            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/3 aspect-square"
                            aria-hidden="true"
                          >
                            <div className="absolute inset-0 translate-z-0 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors duration-500 ease-in-out blur-[60px]" />
                          </div>
                          <div className="flex flex-col pb-4 p-6 h-[170px] items-center text-center justify-center">
                            {item.icon && (
                              <Image
                                className="mb-4"
                                src={item.icon}
                                alt={item.key}
                                width={40}
                                height={40}
                              />
                            )}
                            <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 line-clamp-2">
                              {t(`insighter.uploadTypes.${item.key}`)}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {visibleItems < 45 && (
                <div
                  className={`mt-6 flex ${
                    isRTL ? "justify-start" : "justify-end"
                  }`}
                >
                  <button
                    onClick={() =>
                      setVisibleItems((prev) => Math.min(prev + 9, 45))
                    }
                    className="text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out flex items-center text-md font-medium"
                  >
                    {t("showMore")}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-1 rtl:rotate-180 ${
                        isRTL ? "mr-1 rotate-180" : "ml-1"
                      }`}
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className="relative">
            {/* Radial gradient */}
            <div
              className="absolute flex items-center justify-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-[800px] aspect-square"
              aria-hidden="true"
            >
              <div className="absolute inset-0 translate-z-0 bg-blue-500 rounded-full blur-[120px] opacity-30"></div>
              <div className="absolute w-64 h-64 translate-z-0 bg-blue-400 rounded-full blur-[80px] opacity-70"></div>
            </div>

            {/* Particles animation */}
            <Particles className="absolute inset-0 h-96 -z-10" quantity={15} />

            {/* Illustration */}
            <div
              className="md:block absolute left-1/2 -translate-x-1/2 -mt-16 blur-2xl opacity-90 pointer-events-none -z-10"
              aria-hidden="true"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="427">
  <defs>
    <linearGradient id="a" x1="19.609%" x2="50%" y1="14.544%" y2="100%">
      <stop offset="0%" stop-color="#4E71FF"/>
      <stop offset="100%" stop-color="#4E71FF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <path fill="url(#a)" fillRule="evenodd" d="m403 0 461 369-284 58z"/>
</svg>

            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32">
                {/* Section header */}
                <div className="text-center pb-12 md:pb-20">
                  <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 max-w-2xl mx-auto">
                    {" "}
                    {t("section6.title")}
                  </h2>
                  <div className="max-w-3xl mx-auto">
                    <p className="text-lg text-slate-400">
                      {t("section6.description")}
                    </p>
                  </div>
                </div>

                <CustomersList />
              </div>
            </div>
            
          </section>

          <section className="relative  border-t border-b [border-image:linear-gradient(to_right,transparent,theme(colors.slate.800),transparent)1] pb-10">
            {/* Section5 - Revenue Stream */}
                    {/* Blurred shape */}
                    <div
                  className="absolute top-0 -mt-24 left-1/2 -translate-x-1/2 ml-24 blur-2xl opacity-70 pointer-events-none -z-10 "
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="434"
                    height="427"
                  >
                    <defs>
                      <linearGradient
                        id="bs4-a"
                        x1="19.609%"
                        x2="50%"
                        y1="14.544%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#4B9EFF"></stop>
                        <stop
                          offset="100%"
                          stopColor="#0066FF"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#bs4-a)"
                      fillRule="evenodd"
                      d="m0 0 461 369-284 58z"
                      transform="matrix(1 0 0 -1 0 427)"
                    ></path>
                  </svg>
                </div>
                {/* Particles animation */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 -z-10 w-80 h-80 -mt-24">
                  <Particles
                    className="absolute inset-0 -z-10"
                    quantity={6}
                    staticity={30}
                  />
                </div>
                {/* Content */}
            <div className=" pt-12" dir={isRTL ? "rtl" : "ltr"}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="relative px-8 py-8 rounded-2xl overflow-hidden">
                  {/* Particles animation */}
                  <div className="absolute inset-0 -z-10">
                    <Particles
                      className="absolute inset-0"
                      quantity={8}
                      staticity={30}
                    />
                  </div>
                  {/* Content */}
                  <div
                    className="max-w-3xl mx-auto text-center"
                    data-aos="fade-up"
                  >
                    <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4 leading-[1.2]">
                      {t("section5.title")}
                    </h2>
                    <p className="text-lg text-slate-400 ">
                      {t("section5.description")}
                    </p>
                  </div>
                </div>
                <div className="mb-10 text-center">
              <div className="mb-4">
                <span className="text-lg font-light text-slate-300">
                  {t("insighter.joinUs")}
                </span>
              </div>
              <Link
                href="https://app.foresighta.co/app/insighter-register/vertical"
                className="relative inline-flex items-center px-8 py-3 text-black font-medium rounded-full bg-gradient-to-r from-gray-200 via-white to-gray-200 hover:brightness-110 transition duration-300 ease-in-out shadow-[0_0_20px_rgba(78,113,255,0.4)] hover:shadow-[0_0_25px_rgba(78,113,255,0.7)]"
              >
                {t("insighter.cta")}
              </Link>
         
            </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </ParallaxProvider>
  );
}
