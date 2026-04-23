"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projectWizardStorage, type WizardLocale } from "../wizardStorage";
import ChoiceCard from "./ChoiceCard";

type ProjectTypeId = "ad_hoc" | "frame_work_agreement" | "urgent_request";

type ProjectTypeOption = {
  id: ProjectTypeId;
  title: string;
  subtitle: string;
  description: string[];
  consultingFields: string;
};

function splitCommaList(value: string): string[] {
  return value
    .split(/[,،]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeProjectTypeId(value: string | null): ProjectTypeId | null {
  if (!value) return null;
  if (value === "ad_hoc") return "ad_hoc";
  if (value === "frame_work_agreement" || value === "framework")
    return "frame_work_agreement";
  if (value === "urgent_request" || value === "urgent") return "urgent_request";
  return null;
}

function getOptions(locale: WizardLocale): ProjectTypeOption[] {
  const isArabic = locale === "ar";

  if (isArabic) {
    return [
      {
        id: "ad_hoc",
        title: "Ad hoc (طلب واحد)",
        subtitle: "",
        description: [
          "حدّد نطاق العمل والمخرجات والمدة ومجال الاستشارة.",
          "استلم عروضًا من خبراء/شركات معتمدة وقارنها بسرعة.",
          "أدر التنفيذ على المنصة (تذاكر، جلسات، واتساب) ثم استلم المخرجات وأكمل الدفع.",
        ],
        consultingFields:
          "رواد الأعمال، المنشآت الصغيرة والمتوسطة، المستثمرون، الشركات",
      },
      {
        id: "frame_work_agreement",
        title: "Framework (طلبات متعددة)",
        subtitle: "",
        description: [
          "اتفاقية شاملة لتعاون طويل المدى مع نفس الخبير أو الشركة.",
          "أصدر أوامر عمل عند الحاجة، لكل منها نطاق وميزانية وجدول زمني.",
          "حوكمة وإدارة عقود ومدفوعات مركزية (بما فيها التحويل البنكي).",
        ],
        consultingFields:
          "الحكومات، المنظمات، المنظمات غير الحكومية، القطاع غير الربحي، المؤسسات",
      },
      {
        id: "urgent_request",
        title: "خلال 24 ساعة",
        subtitle: "",
        description: [
          "قائمة مختصرة سريعة لقرارات عاجلة ومخرجات حساسة للوقت.",
          "تنسيق وتسليم متسارع مع تواصل لحظي.",

        ],
        consultingFields:
          "للكل"
      },
    ];
  }

  return [
    {
      id: "ad_hoc",
      title: "Ad hoc (single request)",
      subtitle: "",
      description: [
        "Define scope, deliverables, timeline, and consulting domain.",
        "Get matched with vetted experts/firms and compare proposals.",
        "Collaborate in-platform (tickets, sessions, WhatsApp) and close with delivery & payment.",
      ],
      consultingFields: "Entrepreneurs, SMEs, Investors, Companies",
    },
    {
      id: "frame_work_agreement",
      title: "Multi-request",
      subtitle: "",
      description: [
        "Set up ongoing advisory with the same expert or firm.",
        "Launch work orders as needed—each with its own scope, timeline, and budget.",
        "Centralize governance, compliance (NDA), and billing (incl. wire transfer).",
      ],
      consultingFields: "Governments, Organizations, NGOs, NPOs, Enterprises",
    },
    {
      id: "urgent_request",
      title: "Within 24 hours",
      subtitle: "",
      description: [
        "Fast shortlist for urgent decisions and time-sensitive deliverables.",
        "Real-time coordination and accelerated delivery.",
        "When you need an expert now, not next week.",
      ],
      consultingFields:
        "All"
    },
  ];
}

export default function ProjectTypeQuestion({
  locale,
}: {
  locale: WizardLocale;
}) {
  const router = useRouter();
  const isRTL = locale === "ar";
  const isEnglish =
    typeof locale === "string" && locale.toLowerCase().startsWith("en");

  const options = useMemo(() => getOptions(locale), [locale]);

  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState<ProjectTypeId | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const savedRaw = window.sessionStorage.getItem(
        projectWizardStorage.projectTypeKey(locale),
      );
      const saved = normalizeProjectTypeId(savedRaw);
      if (saved && options.some((o) => o.id === saved)) {
        setSelected(saved);
        if (savedRaw !== saved) {
          window.sessionStorage.setItem(
            projectWizardStorage.projectTypeKey(locale),
            saved,
          );
        }
      }
    } catch {
      // ignore
    }
  }, [locale, options]);

  const onSelect = (id: ProjectTypeId) => {
    if (isAdvancing) return;
    setSelected(id);
    try {
      window.sessionStorage.setItem(
        projectWizardStorage.projectTypeKey(locale),
        id,
      );
    } catch {
      // ignore
    }
    setIsAdvancing(true);
    router.push(`/${locale}/project/wizard/deliverables-language`);
  };

  const onContinue = () => {
    if (!selected || isAdvancing) return;
    setIsAdvancing(true);
    router.push(`/${locale}/project/wizard/deliverables-language`);
  };

  const title = isRTL ? "اختر نوع مشروعك" : "Select your project type";
  const helper = isRTL
    ? "اختر نموذج التعاقد الأنسب لطلبك الاستشاري."
    : "Choose the engagement model that fits your consulting request.";
  const fieldsLabel = isRTL ? "مناسب ل" : "Best for";

  const iconSize = 40;
  const iconStroke = 1.6;
  const optionIcons: Record<
    ProjectTypeId,
    ({ size, stroke, className }: { size: number; stroke: number; className?: string }) => ReactNode
  > = {
    ad_hoc: ({ size, stroke, className }) => (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#52D7FF" fillOpacity="0.14" />
        <path d="M21.4514 18.4413L21.3871 19.2642C21.2907 20.2478 21.2135 20.9999 19.4714 20.9999H11.3842C9.64208 20.9999 9.56494 20.2478 9.46851 19.2642L9.21136 16.0499C9.15994 15.5163 9.32708 15.0213 9.62922 14.642C9.63565 14.6356 9.63565 14.6356 9.64208 14.6292C9.99565 14.1985 10.5292 13.9285 11.1271 13.9285H19.7285C20.3264 13.9285 20.8535 14.1985 21.2007 14.6163C21.2071 14.6228 21.2135 14.6292 21.2135 14.6356C21.5285 15.0149 21.7021 15.5099 21.6442 16.0499" fill="#52D7FF" fillOpacity="0.14" />
        <path d="M21.4514 18.4413L21.3871 19.2642C21.2907 20.2478 21.2135 20.9999 19.4714 20.9999H11.3842C9.64208 20.9999 9.56494 20.2478 9.46851 19.2642L9.21136 16.0499C9.15994 15.5163 9.32708 15.0213 9.62922 14.642C9.63565 14.6356 9.63565 14.6356 9.64208 14.6292C9.99565 14.1985 10.5292 13.9285 11.1271 13.9285H19.7285C20.3264 13.9285 20.8535 14.1985 21.2007 14.6163C21.2071 14.6228 21.2135 14.6292 21.2135 14.6356C21.5285 15.0149 21.7021 15.5099 21.6442 16.0499" stroke="#0064E1" strokeWidth="0.964286" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.96387 14.205V10.8943C9.96387 8.70854 10.5103 8.16211 12.696 8.16211H13.5124C14.3289 8.16211 14.5153 8.4064 14.8239 8.81782L15.6403 9.91068C15.846 10.1807 15.9682 10.3478 16.5146 10.3478H18.1539C20.3396 10.3478 20.886 10.8943 20.886 13.08V14.2307" fill="#52D7FF" fillOpacity="0.14" />
        <path d="M9.96387 14.205V10.8943C9.96387 8.70854 10.5103 8.16211 12.696 8.16211H13.5124C14.3289 8.16211 14.5153 8.4064 14.8239 8.81782L15.6403 9.91068C15.846 10.1807 15.9682 10.3478 16.5146 10.3478H18.1539C20.3396 10.3478 20.886 10.8943 20.886 13.08V14.2307" stroke="#0064E1" strokeWidth="0.964286" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.7769 17.7856H17.0811" stroke="#0064E1" strokeWidth="0.964286" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>



    ),
    frame_work_agreement: ({ size, stroke, className }) => (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#FF8BF9" fillOpacity="0.13" />
        <path d="M12.0623 12.9583C13.1094 12.9583 13.9582 12.1095 13.9582 11.0625C13.9582 10.0154 13.1094 9.16663 12.0623 9.16663C11.0153 9.16663 10.1665 10.0154 10.1665 11.0625C10.1665 12.1095 11.0153 12.9583 12.0623 12.9583Z" stroke="#B0009E" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.9165 20.8334C12.883 20.8334 13.6665 20.0499 13.6665 19.0834C13.6665 18.1169 12.883 17.3334 11.9165 17.3334C10.95 17.3334 10.1665 18.1169 10.1665 19.0834C10.1665 20.0499 10.95 20.8334 11.9165 20.8334Z" stroke="#B0009E" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.0835 20.8334C21.05 20.8334 21.8335 20.0499 21.8335 19.0834C21.8335 18.1169 21.05 17.3334 20.0835 17.3334C19.117 17.3334 18.3335 18.1169 18.3335 19.0834C18.3335 20.0499 19.117 20.8334 20.0835 20.8334Z" stroke="#B0009E" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        <g opacity="0.4">
          <path d="M11.9165 13.25V17.3333" stroke="#B0009E" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.9922 13.25C12.2547 14.2708 13.188 15.0292 14.2905 15.0233L16.2914 15.0175C17.8197 15.0117 19.1205 15.9917 19.5989 17.3567" stroke="#B0009E" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>


    ),
    urgent_request: ({ size, stroke, className }) => (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="15" fill="#FFAF47" fillOpacity="0.13" />
        <path d="M20.1043 15.2292C20.1043 18.0467 17.8177 20.3333 15.0002 20.3333C12.1827 20.3333 9.896 18.0467 9.896 15.2292C9.896 12.4117 12.1827 10.125 15.0002 10.125C17.8177 10.125 20.1043 12.4117 20.1043 15.2292Z" stroke="#E08700" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        <path opacity="0.8" d="M15 12.1666V15.0833" stroke="#E08700" strokeWidth="0.875" strokeLinecap="round" strokeLinejoin="round" />
        <path opacity="0.69" d="M13.25 8.66663H16.75" stroke="#E08700" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>


    ),
  };

  return (
    <div className="w-full max-w-4xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      {isEnglish ? (
        <style>{`
          #project-type-question-title {
            font-family: "IBM Plex Serif", serif !important;
          }
        `}</style>
      ) : null}
      <div
        className={`transition-all duration-700 ${entered
          ? "opacity-100 translate-x-0"
          : isRTL
            ? "opacity-0 translate-x-4"
            : "opacity-0 -translate-x-4"
          }`}
      >
        <h2
          id="project-type-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900 text-start"
        >
          {title}
        </h2>
      </div>

      <div
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pb-20 sm:pb-0"
        role="radiogroup"
        aria-label={title}
      >
        {options.map((option, index) => {
          const isSelected = selected === option.id;

          return (
            <ChoiceCard
              key={option.id}
              checked={isSelected}
              title={option.title}
              subtitle={option.subtitle}
              renderIcon={optionIcons[option.id]}
              onSelect={() => onSelect(option.id)}
              entered={entered}
              isRTL={isRTL}
              delayMs={110 + index * 70}
              align="start"
              className="min-h-[420px]"
              iconSize={iconSize}
              iconStroke={iconStroke}
            >
              <div className="text-sm text-slate-700 leading-relaxed">
                <ul className="list-disc ps-5 space-y-1.5">
                  {option.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>

              <div className={`${option.id === "urgent_request" ? (isRTL ? "pt-24" : "pt-16") : "mt-auto pt-6"}`}>
                <div className="text-[10px] font-light tracking-wide text-blue-700 uppercase">
                  {fieldsLabel}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {splitCommaList(option.consultingFields).map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ChoiceCard>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:static border-t rounded-lg border-slate-200/70 bg-white/80 backdrop-blur-md lg:border-t-0 lg:bg-transparent lg:backdrop-blur-0">
        <div className="mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className=" lg:mt-8 flex  items-center justify-between gap-3">
            <Link
              href={`/${locale}/project`}
              className="btn-sm px-6 py-2  text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? "رجوع" : "Back"}
            </Link>

            <button
              type="button"
              onClick={onContinue}
              disabled={!selected || isAdvancing}
              className={`btn-sm px-6 py-2 rounded-full ${selected
                ? "text-white bg-[#1C7CBB] hover:bg-opacity-90"
                : "text-slate-500 bg-slate-200 cursor-not-allowed"
                }`}
            >
              {isRTL ? "متابعة" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
