import type { ComponentType } from 'react'
import {
  IconChartBar,
  IconChartArrowsVertical,
  IconClipboardText,
  IconDeviceDesktopAnalytics,
  IconBuildingBank,
  IconTargetArrow,
  IconCoins,
  IconShieldCheck,
  IconReportAnalytics,
  IconFileSearch,
  IconBulb,
  IconFileDollar,
  IconSparkles,
} from '@tabler/icons-react'

export type TablerIcon = ComponentType<{ size?: number; stroke?: number; className?: string }>

export type ServiceMeta = {
  Icon: TablerIcon
  iconClass: string
  description: { en: string; ar: string }
}

// Hardcoded presentation metadata per service slug. Icons are placeholders to be
// swapped for custom illustrations later.
const SERVICE_META: Record<string, ServiceMeta> = {
  'market-research': {
    Icon: IconChartBar,
    iconClass: 'bg-blue-50 text-blue-600',
    description: {
      en: 'Understand market size, demand, and competition.',
      ar: 'افهم حجم السوق والطلب والمنافسة.',
    },
  },
  'pre-feasibility-study': {
    Icon: IconFileSearch,
    iconClass: 'bg-lime-50 text-lime-600',
    description: {
      en: 'Quickly assess whether your idea is worth developing.',
      ar: 'قيّم بسرعة ما إذا كانت فكرتك جديرة بالتطوير.',
    },
  },
  'feasibility-study': {
    Icon: IconChartArrowsVertical,
    iconClass: 'bg-amber-50 text-amber-600',
    description: {
      en: 'Assess viability, profitability, and next steps.',
      ar: 'قيّم الجدوى والربحية والخطوات التالية.',
    },
  },
  'business-plan': {
    Icon: IconClipboardText,
    iconClass: 'bg-emerald-50 text-emerald-600',
    description: {
      en: 'Build a roadmap for strategy and operations.',
      ar: 'ابنِ خارطة طريق للاستراتيجية والعمليات.',
    },
  },
  'digital-transformation': {
    Icon: IconDeviceDesktopAnalytics,
    iconClass: 'bg-violet-50 text-violet-600',
    description: {
      en: 'Modernize processes and technology to scale.',
      ar: 'حدّث العمليات والتقنيات للتوسع.',
    },
  },
  'company-valuation': {
    Icon: IconBuildingBank,
    iconClass: 'bg-cyan-50 text-cyan-600',
    description: {
      en: "Determine your company's fair value.",
      ar: 'حدّد القيمة العادلة لشركتك.',
    },
  },
  'go-to-market-strategy': {
    Icon: IconTargetArrow,
    iconClass: 'bg-rose-50 text-rose-600',
    description: {
      en: 'Plan launch, positioning, and customer growth.',
      ar: 'خطّط للإطلاق والتموضع ونمو العملاء.',
    },
  },
  'fundraising-strategy': {
    Icon: IconCoins,
    iconClass: 'bg-teal-50 text-teal-600',
    description: {
      en: 'Prepare to raise capital and attract investors.',
      ar: 'استعد لجمع التمويل وجذب المستثمرين.',
    },
  },
  'policies-procedures-governance': {
    Icon: IconShieldCheck,
    iconClass: 'bg-indigo-50 text-indigo-600',
    description: {
      en: 'Set governance, policies, and compliance.',
      ar: 'ضع الحوكمة والسياسات والامتثال.',
    },
  },
  'brief-feasibility-study': {
    Icon: IconFileSearch,
    iconClass: 'bg-lime-50 text-lime-600',
    description: {
      en: 'Quick check on whether your idea holds up.',
      ar: 'فحص سريع لمدى جدوى فكرتك.',
    },
  },
  'opportunity-evaluation': {
    Icon: IconBulb,
    iconClass: 'bg-orange-50 text-orange-600',
    description: {
      en: 'Weigh the potential of a business opportunity.',
      ar: 'قيّم إمكانات الفرصة التجارية.',
    },
  },
  'funding-application': {
    Icon: IconFileDollar,
    iconClass: 'bg-fuchsia-50 text-fuchsia-600',
    description: {
      en: 'Prepare and package your funding application.',
      ar: 'جهّز وأعدّ طلب التمويل الخاص بك.',
    },
  },
}

const OTHER_SERVICE_META: ServiceMeta = {
  Icon: IconSparkles,
  iconClass: 'bg-sky-50 text-sky-600',
  description: {
    en: 'A custom service defined from your own description.',
    ar: 'خدمة مخصصة مبنية على وصفك.',
  },
}

const FALLBACK_SERVICE_META: ServiceMeta = {
  Icon: IconReportAnalytics,
  iconClass: 'bg-slate-100 text-slate-600',
  description: {
    en: 'Advisory tailored to your business needs.',
    ar: 'استشارة مصممة لاحتياجات عملك.',
  },
}

export function serviceMetaForSlug(slug?: string | null): ServiceMeta {
  const key = (slug || '').trim().toLowerCase()
  if (key === 'other' || key === 'others') return OTHER_SERVICE_META
  return SERVICE_META[key] || FALLBACK_SERVICE_META
}
