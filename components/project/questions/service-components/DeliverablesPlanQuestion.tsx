"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  IconCalendarEvent,
  IconCheck,
  IconChevronDown,
  IconCloudUpload,
  IconDeviceDesktopUp,
  IconMapPin,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import ProjectSelectedTypeHeader from "@/components/project/ProjectSelectedTypeHeader";
import { getProjectApiErrorMessage } from "@/components/project/projectApiError";
import {
  MAX_DELIVERABLES,
  createDeliverable,
  dayLabel,
  latestDeliverableDay,
  readDeliverables,
  writeDeliverables,
  type DeliverableWay,
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
import {
  getReportTypeOptions,
  type ReportTypeOption,
} from "./deliverableReportTypes";

const DEFAULT_DAY = 30;

const WAY_OPTIONS: Array<{
  value: DeliverableWay;
  Icon: typeof IconCloudUpload;
  iconClass: string;
  label: { en: string; ar: string };
}> = [
  {
    value: "on_platform",
    Icon: IconCloudUpload,
    iconClass: "text-sky-600",
    label: { en: "On platform", ar: "على المنصة" },
  },
  {
    value: "session",
    Icon: IconDeviceDesktopUp,
    iconClass: "text-violet-600",
    label: { en: "Online session", ar: "جلسة أونلاين" },
  },
  {
    value: "physical_workshop",
    Icon: IconMapPin,
    iconClass: "text-amber-600",
    label: { en: "In-person workshop", ar: "ورشة حضورية" },
  },
];

const PILL_CLASS =
  "inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-blue-200 data-[open]:border-blue-300 data-[open]:bg-blue-50/60";

const PANEL_CLASS =
  "z-50 rounded-[12px] border border-slate-200 bg-white p-2 shadow-lg [--anchor-gap:6px] focus:outline-none";

function isDeliverableComplete(item: ProjectDeliverable) {
  if (!item.title.trim()) return false;
  if (item.report_type.length === 0) return false;
  if (item.way.selected === "physical_workshop")
    return Boolean(item.way.address?.trim());
  return true;
}

function FormatIcons({
  types,
  options,
}: {
  types: string[];
  options: ReportTypeOption[];
}) {
  const icons = types
    .map((type) => options.find((option) => option.value === type)?.iconSrc)
    .filter((src): src is string => Boolean(src))
    .slice(0, 3);

  return (
    <span className="flex items-center -space-x-1.5 rtl:space-x-reverse">
      {icons.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          className="h-5 w-5 rounded-[4px] bg-white object-contain ring-2 ring-white"
        />
      ))}
    </span>
  );
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
  const reportTypeOptions = useMemo(
    () => getReportTypeOptions(locale),
    [locale],
  );

  const [entered, setEntered] = useState(false);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [deliverables, setDeliverables] = useState<ProjectDeliverable[]>([]);
  // Only a freshly added deliverable grabs focus.
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  // The schedule step comes first, so deliverables fit inside the planned duration.
  const [schedule, setSchedule] = useState<ProjectSchedule | null>(null);
  const [attempted, setAttempted] = useState(false);
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
    const limit = urgent
      ? URGENT_MAX_DURATION_DAYS
      : storedSchedule
        ? storedSchedule.durationDays
        : null;
    const initial = readDeliverables(locale, storedProjectType).map((item) =>
      limit === null
        ? item
        : { ...item, period_days: Math.min(item.period_days, limit) },
    );
    setProjectType(storedProjectType);
    setSchedule(storedSchedule);
    setDeliverables(initial);
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
          { month: "short", day: "numeric" },
        )
      : "";

  const quickDays = useMemo(() => {
    if (isUrgent) return [0, 1];
    const presets = [7, 14, 30, 60].filter((day) => day < maxDay);
    return schedule ? [...presets, schedule.durationDays] : presets;
  }, [isUrgent, maxDay, schedule]);

  const quickDayLabel = (day: number) => {
    if (schedule && day === schedule.durationDays) {
      return isRTL ? "نهاية المشروع" : "At the end";
    }
    if (isUrgent) return dayLabel(locale, day);
    const labels: Record<number, { en: string; ar: string }> = {
      7: { en: "1 week", ar: "أسبوع" },
      14: { en: "2 weeks", ar: "أسبوعان" },
      30: { en: "1 month", ar: "شهر" },
      60: { en: "2 months", ar: "شهران" },
    };
    return isRTL ? labels[day].ar : labels[day].en;
  };

  const update = (index: number, patch: Partial<ProjectDeliverable>) => {
    setDeliverables((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const setDay = (index: number, value: number) => {
    update(index, {
      period_days: Math.min(maxDay, Math.max(0, Math.round(value) || 0)),
    });
  };

  const setWay = (index: number, selected: DeliverableWay) => {
    const item = deliverables[index];
    update(index, {
      way: {
        selected,
        address:
          selected === "physical_workshop" ? item.way.address || "" : null,
      },
    });
  };

  const addDeliverable = () => {
    if (deliverables.length >= MAX_DELIVERABLES) return;
    const day = Math.min(
      maxDay,
      isUrgent
        ? URGENT_MAX_DURATION_DAYS
        : Math.max(DEFAULT_DAY, latestDeliverableDay(deliverables)),
    );
    setDeliverables((prev) => [
      ...prev,
      createDeliverable(locale, prev.length, day),
    ]);
    setFocusIndex(deliverables.length);
    setAttempted(false);
  };

  const removeDeliverable = (index: number) => {
    if (deliverables.length <= 1) return;
    setDeliverables((prev) => prev.filter((_, i) => i !== index));
    setFocusIndex(null);
  };

  const allComplete =
    deliverables.length > 0 && deliverables.every(isDeliverableComplete);

  const onContinue = async () => {
    if (submitting) return;
    if (!allComplete) {
      setAttempted(true);
      return;
    }
    setError(null);

    // Keep deliverables in timeline order so positions match their dates.
    const ordered = deliverables
      .map((item, index) => ({ item, index }))
      .sort(
        (a, b) => a.item.period_days - b.item.period_days || a.index - b.index,
      )
      .map(({ item }) => ({
        ...item,
        title: item.title.trim(),
        way: {
          ...item.way,
          address: item.way.address ? item.way.address.trim() : item.way.address,
        },
      }));
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

  const formatSummary = (types: string[]) => {
    const first = reportTypeOptions.find((option) => option.value === types[0]);
    if (!first) return isRTL ? "اختر الصيغة" : "Choose format";
    return types.length > 1 ? `${first.label} +${types.length - 1}` : first.label;
  };

  const renderDeliverable = (item: ProjectDeliverable, index: number) => {
    const way =
      WAY_OPTIONS.find((option) => option.value === item.way.selected) ??
      WAY_OPTIONS[0];
    const missingTitle = attempted && !item.title.trim();
    const missingTypes = attempted && item.report_type.length === 0;
    const missingAddress =
      attempted &&
      item.way.selected === "physical_workshop" &&
      !item.way.address?.trim();

    return (
      <li
        key={index}
        className="rounded-[12px] border border-slate-200 bg-white/90 p-4"
      >
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={`deliverable-title-${index}`}
            className="text-xs font-bold text-slate-500"
          >
            {deliverables.length > 1
              ? isRTL
                ? `اسم المخرج ${index + 1}`
                : `Deliverable ${index + 1} name`
              : isRTL
                ? "اسم المخرج"
                : "Deliverable name"}
          </label>
          {deliverables.length > 1 ? (
            <button
              type="button"
              onClick={() => removeDeliverable(index)}
              aria-label={isRTL ? "حذف المخرج" : "Remove deliverable"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            >
              <IconTrash size={16} />
            </button>
          ) : null}
        </div>
        <input
          id={`deliverable-title-${index}`}
          value={item.title}
          onChange={(event) => update(index, { title: event.target.value })}
          maxLength={120}
          autoFocus={index === focusIndex}
          placeholder={
            isRTL ? "مثال: تقرير تحليل السوق" : "e.g. Market analysis report"
          }
          className={`mt-1.5 w-full rounded-[10px] border bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
            missingTitle ? "border-rose-300" : "border-slate-200"
          }`}
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverButton
              className={PILL_CLASS}
              aria-label={isRTL ? "موعد التسليم" : "Due date"}
            >
              <IconCalendarEvent size={16} className="text-slate-500" />
              <span>{dayLabel(locale, item.period_days)}</span>
              {schedule ? (
                <span className="font-medium text-slate-400">
                  · {dateFor(item.period_days)}
                </span>
              ) : null}
              <IconChevronDown size={14} className="text-slate-400" />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom start"
              className={`${PANEL_CLASS} w-72 p-3`}
            >
              <p className="text-xs font-bold text-slate-500">
                {isRTL ? "موعد التسليم" : "Due"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {quickDays.map((day) => {
                  const selected = item.period_days === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setDay(index, day)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        selected
                          ? "border-blue-300 bg-blue-50 text-blue-800"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {quickDayLabel(day)}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center rounded-full border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setDay(index, item.period_days - 1)}
                    disabled={item.period_days <= 0}
                    aria-label={isRTL ? "يوم أبكر" : "One day earlier"}
                    className="inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300"
                  >
                    <IconMinus size={14} />
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={maxDay === Number.MAX_SAFE_INTEGER ? undefined : maxDay}
                    value={item.period_days}
                    onChange={(event) =>
                      setDay(index, Number(event.target.value))
                    }
                    aria-label={
                      isRTL
                        ? "عدد الأيام من بدء المشروع"
                        : "Days from project start"
                    }
                    className="w-12 appearance-none border-0 bg-transparent p-0 text-center text-sm font-bold tabular-nums text-slate-900 focus:outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setDay(index, item.period_days + 1)}
                    disabled={item.period_days >= maxDay}
                    aria-label={isRTL ? "يوم لاحق" : "One day later"}
                    className="inline-flex h-8 w-8 items-center justify-center text-slate-600 hover:text-slate-900 disabled:text-slate-300"
                  >
                    <IconPlus size={14} />
                  </button>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {isRTL ? "يوم بعد البدء" : "days after start"}
                </span>
              </div>
              {schedule ? (
                <p className="mt-2 text-[11px] font-semibold text-slate-400">
                  {isRTL
                    ? `ينتهي المشروع في ${formatIsoDate(plannedCloseDate, locale)}`
                    : `Project ends ${formatIsoDate(plannedCloseDate, locale)}`}
                </p>
              ) : null}
              {isUrgent ? (
                <p className="mt-2 text-[11px] font-semibold text-amber-700">
                  {isRTL
                    ? "الطلبات العاجلة تُسلَّم خلال 24 ساعة."
                    : "Urgent requests are delivered within 24 hours."}
                </p>
              ) : null}
            </PopoverPanel>
          </Popover>

          <Listbox
            multiple
            value={item.report_type}
            onChange={(next: string[]) => update(index, { report_type: next })}
          >
            <ListboxButton
              className={`${PILL_CLASS} ${missingTypes ? "border-rose-300" : ""}`}
              aria-label={isRTL ? "صيغة الملف" : "File format"}
            >
              <FormatIcons types={item.report_type} options={reportTypeOptions} />
              <span>{formatSummary(item.report_type)}</span>
              <IconChevronDown size={14} className="text-slate-400" />
            </ListboxButton>
            <ListboxOptions anchor="bottom start" className={`${PANEL_CLASS} w-60`}>
              <p className="px-2 pb-1 pt-1 text-xs font-bold text-slate-500">
                {isRTL ? "صيغة الملف (يمكن اختيار أكثر من صيغة)" : "File format (pick any)"}
              </p>
              {reportTypeOptions.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className="group flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm font-semibold text-slate-700 data-[focus]:bg-slate-50 data-[selected]:text-blue-800"
                >
                  {option.iconSrc ? (
                    <img src={option.iconSrc} alt="" className="h-5 w-5 object-contain" />
                  ) : null}
                  <span className="flex-1">{option.label}</span>
                  <IconCheck
                    size={16}
                    className="invisible text-blue-600 group-data-[selected]:visible"
                  />
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>

          <Listbox
            value={item.way.selected}
            onChange={(next: DeliverableWay) => setWay(index, next)}
          >
            <ListboxButton
              className={PILL_CLASS}
              aria-label={isRTL ? "طريقة التسليم" : "Delivery method"}
            >
              <way.Icon size={16} className={way.iconClass} />
              <span>{isRTL ? way.label.ar : way.label.en}</span>
              <IconChevronDown size={14} className="text-slate-400" />
            </ListboxButton>
            <ListboxOptions anchor="bottom start" className={`${PANEL_CLASS} w-60`}>
              <p className="px-2 pb-1 pt-1 text-xs font-bold text-slate-500">
                {isRTL ? "طريقة التسليم" : "Delivered by"}
              </p>
              {WAY_OPTIONS.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className="group flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-2 text-sm font-semibold text-slate-700 data-[focus]:bg-slate-50 data-[selected]:text-blue-800"
                >
                  <option.Icon size={18} className={option.iconClass} />
                  <span className="flex-1">
                    {isRTL ? option.label.ar : option.label.en}
                  </span>
                  <IconCheck
                    size={16}
                    className="invisible text-blue-600 group-data-[selected]:visible"
                  />
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        {item.way.selected === "physical_workshop" ? (
          <label className="mt-3 flex items-center gap-2">
            <IconMapPin size={16} className="shrink-0 text-slate-400" />
            <span className="sr-only">
              {isRTL ? "عنوان الورشة" : "Workshop address"}
            </span>
            <input
              value={item.way.address || ""}
              onChange={(event) =>
                update(index, {
                  way: {
                    selected: "physical_workshop",
                    address: event.target.value,
                  },
                })
              }
              placeholder={
                isRTL ? "عنوان الورشة، مثال: عمّان" : "Workshop address, e.g. Amman"
              }
              className={`w-full rounded-[10px] border bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                missingAddress ? "border-rose-300" : "border-slate-200"
              }`}
            />
          </label>
        ) : null}

        {missingTitle || missingTypes || missingAddress ? (
          <p className="mt-2 text-xs font-semibold text-rose-600">
            {missingTitle
              ? isRTL
                ? "أدخل اسم المخرج."
                : "Enter a name for this deliverable."
              : missingTypes
                ? isRTL
                  ? "اختر صيغة ملف واحدة على الأقل."
                  : "Pick at least one file format."
                : isRTL
                  ? "أدخل عنوان الورشة."
                  : "Enter the workshop address."}
          </p>
        ) : null}
      </li>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
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
          {isRTL ? "ما المخرجات التي ستستلمها؟" : "What will you receive?"}
        </h2>
        <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
          {isRTL
            ? "سمِّ المخرج وحدد موعده وصيغته وطريقة تسليمه."
            : "Name it, set when it's due, its format, and how it reaches you."}
        </p>
      </div>

      <div className="mt-6 pb-36 sm:pb-28">
        <ul className="space-y-2.5">
          {deliverables.map((item, index) => renderDeliverable(item, index))}
        </ul>

        {deliverables.length < MAX_DELIVERABLES ? (
          <button
            type="button"
            onClick={addDeliverable}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-bold text-blue-600 hover:bg-blue-50/60"
          >
            <IconPlus size={16} />
            {isRTL ? "إضافة مخرج آخر" : "Add another deliverable"}
          </button>
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
              disabled={submitting}
              className={`btn-sm px-6 py-2 rounded-full ${
                allComplete && !submitting
                  ? "text-white bg-[#1C7CBB] hover:bg-opacity-90"
                  : "text-slate-500 bg-slate-200"
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
