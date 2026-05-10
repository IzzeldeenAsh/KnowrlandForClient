"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useProjectWizardNavigation } from "../useProjectWizardNavigation";
import {
  clearProjectWizardStorage,
  projectWizardStorage,
  type WizardLocale,
} from "../wizardStorage";
import ChoiceCard from "./ChoiceCard";
import {
  IconBriefcaseFilled,
  IconAffiliateFilled,
  IconBoltFilled,
} from "@tabler/icons-react";

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
  const nav = useProjectWizardNavigation(locale);
  const router = useRouter();
  const searchParams = useSearchParams();
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
    if (searchParams?.get("fresh") !== "1") return;
    clearProjectWizardStorage(locale);
    setSelected(null);
    router.replace(`/${locale}/project/wizard/project-type`, { scroll: false });
  }, [locale, router, searchParams]);

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
    nav.goNext();
  };

  const onContinue = () => {
    if (!selected || isAdvancing) return;
    setIsAdvancing(true);
    nav.goNext();
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
    ad_hoc: ({ size }) => (
      <span
        className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-cyan-200/60 ring-1 ring-sky-200/70 shadow-[inset_0_-2px_6px_rgba(2,132,199,0.12)]"
        style={{ width: size, height: size }}
      >
        <IconBriefcaseFilled size={size * 0.55} className="text-[#0064E1]" />
      </span>
    ),
    frame_work_agreement: ({ size }) => (
      <span
        className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-100 to-pink-200/60 ring-1 ring-fuchsia-200/70 shadow-[inset_0_-2px_6px_rgba(176,0,158,0.12)]"
        style={{ width: size, height: size }}
      >
        <IconAffiliateFilled size={size * 0.55} className="text-[#B0009E]" />
      </span>
    ),
    urgent_request: ({ size }) => (
      <span
        className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-200/60 ring-1 ring-amber-200/70 shadow-[inset_0_-2px_6px_rgba(224,135,0,0.15)]"
        style={{ width: size, height: size }}
      >
        <IconBoltFilled size={size * 0.55} className="text-[#E08700] animate-pulse" />
      </span>
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

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto px-4 lg:px-0 w-full max-w-4xl pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
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
              {nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
