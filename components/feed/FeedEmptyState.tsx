type FeedEmptyStateProps = {
  locale: string
}

const copyByLocale = {
  en: {
    title: 'Your feed is quiet — for now',
    description:
      'Track a few topics and experts to fill your feed with insights that matter to your business.',
  },
  ar: {
    title: 'موجزك هادئ — حتى الآن',
    description: 'تابع بعض المواضيع والخبراء لتملأ موجزك برؤى تهم أعمالك.',
  },
} as const

export default function FeedEmptyState({ locale }: FeedEmptyStateProps) {
  const copy = copyByLocale[locale === 'ar' ? 'ar' : 'en']

  return (
    <div className="flex flex-col items-center rounded-[10px] border border-[#DFE6F0] bg-white px-10 py-14 text-center">
      <h2 className="text-[17px] font-semibold text-[#0B1220]">{copy.title}</h2>
      <p className="mt-2 max-w-[340px] text-[13.5px] leading-relaxed text-[#64748B]">
        {copy.description}
      </p>
    </div>
  )
}
