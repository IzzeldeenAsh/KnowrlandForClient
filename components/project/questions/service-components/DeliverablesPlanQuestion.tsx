"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import ProjectSelectedTypeHeader from "@/components/project/ProjectSelectedTypeHeader";
import { getProjectApiErrorMessage } from "@/components/project/projectApiError";
import {
  MAX_DELIVERABLES,
  createDeliverable,
  dayLabel,
  durationLabel,
  latestDeliverableDay,
  readDeliverables,
  writeDeliverables,
  type ProjectDeliverable,
} from "@/components/project/projectDeliverables";
import {
  addDaysToIsoDate,
  formatIsoDate,
  isUrgentProjectType,
  readProjectSchedule,
  URGENT_MAX_DURATION_DAYS,
  type ProjectSchedule,
} from "@/components/project/projectSchedule";
import { isLeavingComponentSteps } from "@/components/project/projectWizardFlow";
import { syncServiceComponents } from "@/components/project/serviceComponentsSync";
import { useProjectStepErrorToast } from "@/components/project/useProjectStepErrorToast";
import { useProjectWizardNavigation } from "@/components/project/useProjectWizardNavigation";
import {
  projectWizardStorage,
  type WizardLocale,
} from "@/components/project/wizardStorage";
import TimelineSlider from "../TimelineSlider";

const MIN_RANGE_DAYS = 60;
const RANGE_HEADROOM_DAYS = 14;

function rangeFor(deliverables: ProjectDeliverable[], urgent: boolean) {
  if (urgent) return URGENT_MAX_DURATION_DAYS;
  const needed = latestDeliverableDay(deliverables) + RANGE_HEADROOM_DAYS;
  return Math.max(MIN_RANGE_DAYS, Math.ceil(needed / 15) * 15);
}

export default function DeliverablesPlanQuestion({
  locale,
}: {
  locale: WizardLocale;
}) {
  const isRTL = locale === "ar";
  const isEnglish =
    typeof locale === "string" && locale.toLowerCase().startsWith("en");
  const nav = useProjectWizardNavigation(locale);

  const [entered, setEntered] = useState(false);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [deliverables, setDeliverables] = useState<ProjectDeliverable[]>([]);
  const [rangeMax, setRangeMax] = useState(MIN_RANGE_DAYS);
  // The schedule step comes first, so deliverables fit inside the planned duration.
  const [schedule, setSchedule] = useState<ProjectSchedule | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useProjectStepErrorToast(error, locale);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 30);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let storedProjectType: string | null = null;
    try {
      storedProjectType = window.sessionStorage.getItem(
        projectWizardStorage.projectTypeKey(locale),
      );
    } catch {
      // ignore
    }
    const urgent = isUrgentProjectType(storedProjectType);
    const storedSchedule = urgent ? null : readProjectSchedule(locale);
    const limit = storedSchedule ? storedSchedule.durationDays : null;
    const initial = readDeliverables(locale, storedProjectType).map((item) =>
      limit === null
        ? item
        : { ...item, period_days: Math.min(item.period_days, limit) },
    );
    setProjectType(storedProjectType);
    setSchedule(storedSchedule);
    setDeliverables(initial);
    setRangeMax(limit !== null ? limit : rangeFor(initial, urgent));
  }, [locale]);

  const isUrgent = isUrgentProjectType(projectType);
  const maxDay = isUrgent
    ? URGENT_MAX_DURATION_DAYS
    : schedule
      ? schedule.durationDays
      : Number.MAX_SAFE_INTEGER;
  const plannedCloseDate = schedule
    ? addDaysToIsoDate(schedule.plannedStartDate, schedule.durationDays)
    : "";
  const dateFor = (days: number) =>
    schedule
      ? formatIsoDate(
          addDaysToIsoDate(schedule.plannedStartDate, days),
          locale,
          {
            month: "short",
            day: "numeric",
          },
        )
      : "";

  const update = (index: number, patch: Partial<ProjectDeliverable>) => {
    setDeliverables((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  // The range only grows outside a drag, so the handle never jumps under the pointer.
  const setDay = (index: number, value: number, growRange = true) => {
    const next = Math.min(maxDay, Math.max(0, Math.round(value) || 0));
    update(index, { period_days: next });
    if (
      growRange &&
      !isUrgent &&
      !schedule &&
      next + RANGE_HEADROOM_DAYS > rangeMax
    ) {
      setRangeMax(Math.ceil((next + RANGE_HEADROOM_DAYS) / 15) * 15);
    }
  };

  const addDeliverable = () => {
    setDeliverables((prev) => {
      if (prev.length >= MAX_DELIVERABLES) return prev;
      const day = Math.min(
        maxDay,
        isUrgent
          ? URGENT_MAX_DURATION_DAYS
          : latestDeliverableDay(prev) + (prev.length > 0 ? 7 : 14),
      );
      const next = [...prev, createDeliverable(locale, prev.length, day)];
      if (!schedule) {
        setRangeMax((current) => Math.max(current, rangeFor(next, isUrgent)));
      }
      return next;
    });
  };

  const removeDeliverable = (index: number) => {
    setDeliverables((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  };

  const titlesValid = deliverables.every(
    (item) => item.title.trim().length > 0,
  );
  const canContinue = deliverables.length > 0 && titlesValid && !submitting;

  const onContinue = async () => {
    if (!canContinue) return;
    setError(null);

    // Keep deliverables in timeline order so positions match their dates.
    const ordered = deliverables
      .map((item, index) => ({ item, index }))
      .sort(
        (a, b) => a.item.period_days - b.item.period_days || a.index - b.index,
      )
      .map(({ item }) => ({ ...item, title: item.title.trim() }));
    writeDeliverables(locale, ordered);

    const leavingComponents = isLeavingComponentSteps(
      locale,
      nav.nextStepId,
      nav.isReviewEditMode,
    );
    if (!leavingComponents) {
      nav.goNext();
      return;
    }

    setSubmitting(true);
    try {
      await syncServiceComponents(locale);
      nav.goNext();
    } catch (err) {
      setError(
        getProjectApiErrorMessage(
          err,
          isRTL ? "تعذر حفظ المخرجات." : "Failed to save deliverables.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const shortTitle = (title: string, index: number) => {
    const text = title.trim() || `#${index + 1}`;
    return text.length > 18 ? `${text.slice(0, 17)}…` : text;
  };

  return (
    <div className="w-full max-w-4xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
      <ProjectSelectedTypeHeader
        locale={locale}
        entered={entered}
        projectTypeId={projectType}
      />

      <div
        className={`mt-2 text-start transition-all duration-700 ${
          entered
            ? "opacity-100 translate-x-0"
            : isRTL
              ? "opacity-0 translate-x-4"
              : "opacity-0 -translate-x-4"
        }`}
      >
        {isEnglish ? (
          <style>{`
            #deliverables-plan-question-title {
              font-family: "IBM Plex Serif", serif !important;
            }
          `}</style>
        ) : null}
        <h2
          id="deliverables-plan-question-title"
          className="text-2xl sm:text-3xl font-medium tracking-tight text-slate-900"
        >
          {isRTL
            ? "ما المخرجات التي تتوقعها ومتى؟"
            : "What will you receive, and when?"}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
          {isRTL
            ? schedule
              ? "أضف كل مخرج واسحبه على الخط الزمني للمشروع إلى موعده المتوقع."
              : "أضف كل مخرج واسحبه على الخط الزمني إلى موعده، محسوبًا بالأيام من بدء المشروع."
            : schedule
              ? "Add each deliverable and drag it along the project timeline to when you expect it."
              : "Add each deliverable and drag it along the timeline, counted in days from the project start."}
        </p>
      </div>

      <div className="mt-6 pb-36 sm:pb-28">
        <div className="rounded-[10px] border border-slate-200 bg-white/80 px-2 sm:px-4">
          <TimelineSlider
            min={0}
            max={Math.max(rangeMax, 1)}
            isRTL={isRTL}
            tickEvery={isUrgent ? undefined : rangeMax > 120 ? 30 : 7}
            startLabel={
              schedule
                ? formatIsoDate(schedule.plannedStartDate, locale)
                : isRTL
                  ? "بدء المشروع"
                  : "Project start"
            }
            endLabel={
              isUrgent
                ? isRTL
                  ? "خلال 24 ساعة"
                  : "Within 24 hours"
                : plannedCloseDate
                  ? formatIsoDate(plannedCloseDate, locale)
                  : durationLabel(locale, rangeMax)
            }
            onChange={(id, value) => setDay(Number(id), value, false)}
            onCommit={(id, value) => setDay(Number(id), value)}
            points={deliverables.map((item, index) => ({
              id: String(index),
              value: item.period_days,
              label: `${shortTitle(item.title, index)} · ${dayLabel(locale, item.period_days)}`,
              ariaLabel:
                item.title ||
                (isRTL ? `المخرج ${index + 1}` : `Deliverable ${index + 1}`),
              valueText: dayLabel(locale, item.period_days),
              tone: index === deliverables.length - 1 ? "primary" : "accent",
              draggable: true,
            }))}
          />
        </div>

        {schedule ? (
          <p className="mt-3 text-xs font-semibold text-slate-500">
            {isRTL
              ? `يجب أن تقع المخرجات ضمن مدة المشروع (حتى ${formatIsoDate(plannedCloseDate, locale)}). لموعد أبعد، عدّل جدول المشروع.`
              : `Deliverables have to fall within the project duration (until ${formatIsoDate(plannedCloseDate, locale)}). To plan later, change the project schedule.`}
          </p>
        ) : null}

        {isUrgent ? (
          <p className="mt-3 text-xs font-semibold text-amber-800">
            {isRTL
              ? "الطلبات العاجلة تُسلَّم خلال 24 ساعة، لذا تكون المخرجات في يوم البدء أو اليوم التالي."
              : "Urgent requests are delivered within 24 hours, so deliverables are due on the start day or the day after."}
          </p>
        ) : null}

        <ul className="mt-5 space-y-3">
          {deliverables.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-3 rounded-[10px] border border-slate-200 bg-white/85 p-3 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <label className="min-w-0 flex-1">
                  <span className="sr-only">
                    {isRTL
                      ? `عنوان المخرج ${index + 1}`
                      : `Deliverable ${index + 1} title`}
                  </span>
                  <input
                    value={item.title}
                    onChange={(event) =>
                      update(index, { title: event.target.value })
                    }
                    maxLength={120}
                    placeholder={
                      isRTL
                        ? "مثال: تقرير تحليل السوق"
                        : "e.g. Market analysis report"
                    }
                    className={`w-full rounded-[10px] border bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${item.title.trim() ? "border-slate-200" : "border-rose-300"}`}
                  />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-[10px] border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setDay(index, item.period_days - 1)}
                    disabled={item.period_days <= 0}
                    aria-label={isRTL ? "يوم أبكر" : "One day earlier"}
                    className="inline-flex h-9 w-9 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300"
                  >
                    <IconMinus size={16} />
                  </button>
                  <label className="flex items-center gap-1 px-1">
                    <span className="sr-only">
                      {isRTL
                        ? "عدد الأيام من بدء المشروع"
                        : "Days from project start"}
                    </span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={isUrgent ? URGENT_MAX_DURATION_DAYS : undefined}
                      value={item.period_days}
                      onChange={(event) =>
                        setDay(index, Number(event.target.value))
                      }
                      className="w-14 bg-transparent text-center text-sm font-bold tabular-nums text-slate-900 focus:outline-none"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setDay(index, item.period_days + 1)}
                    disabled={item.period_days >= maxDay}
                    aria-label={isRTL ? "يوم لاحق" : "One day later"}
                    className="inline-flex h-9 w-9 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300"
                  >
                    <IconPlus size={16} />
                  </button>
                </div>
                <span className="w-28 text-xs font-semibold text-slate-500">
                  {item.period_days === 0
                    ? isRTL
                      ? "في يوم البدء"
                      : "on the start day"
                    : isRTL
                      ? "يوم بعد البدء"
                      : "days after start"}
                  {schedule ? (
                    <span className="block font-bold text-slate-700">
                      {dateFor(item.period_days)}
                    </span>
                  ) : null}
                </span>

                <button
                  type="button"
                  onClick={() => removeDeliverable(index)}
                  disabled={deliverables.length <= 1}
                  aria-label={isRTL ? "حذف المخرج" : "Remove deliverable"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:invisible"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {deliverables.length < MAX_DELIVERABLES ? (
          <button
            type="button"
            onClick={addDeliverable}
            className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-dashed border-blue-300/80 px-3 py-2 text-sm font-bold text-blue-600 hover:border-blue-400 hover:bg-blue-50/40"
          >
            <IconPlus size={16} />
            {isRTL ? "إضافة مخرج" : "Add deliverable"}
          </button>
        ) : null}

        {!titlesValid ? (
          <p className="mt-3 text-xs font-semibold text-rose-600">
            {isRTL
              ? "أعطِ كل مخرج عنوانًا."
              : "Give every deliverable a title."}
          </p>
        ) : null}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={nav.backHref}
              className="btn-sm px-6 py-2 rounded-full text-slate-700 bg-white/80 hover:bg-white border border-slate-200"
            >
              {isRTL ? "رجوع" : "Back"}
            </Link>
            <button
              type="button"
              onClick={() => void onContinue()}
              disabled={!canContinue}
              className={`btn-sm px-6 py-2 rounded-full ${
                canContinue
                  ? "text-white bg-[#1C7CBB] hover:bg-opacity-90"
                  : "text-slate-500 bg-slate-200 cursor-not-allowed"
              }`}
            >
              {submitting
                ? isRTL
                  ? "جاري الحفظ…"
                  : "Saving…"
                : nav.continueLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
