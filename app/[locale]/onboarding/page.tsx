'use client'

import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconSearch,
  IconWorld,
} from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCountries, type Country } from '@/app/lib/useCountries'
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider'
import { getAngularAppOrigin, isAngularRouteUrl, toAngularAppUrl } from '@/lib/authRedirect'
import { getAuthToken } from '@/lib/authToken'
import InsightaLogoWhiteAr from '@/public/images/ANSIGHTAAr-.png'
import InsightaLogoWhiteEn from '@/public/images/Business-white.png'
import {
  fetchOnboardingIndustryTree,
  fetchOnboardingPromptStatuses,
  getVisibleSupportedPrompts,
  skipOnboardingPrompt,
  updateFeedIndustryPreferences,
  updateOnboardingCountry,
  type IndustryNode,
  type OnboardingPromptKey,
  type OnboardingPromptStatus,
} from '@/services/onboarding.service'
import styles from './onboarding.module.css'

type IndustryOption = { id: number; label: string }
type IndustryGroup = { id: number; label: string; options: IndustryOption[] }

const promptOrder: OnboardingPromptKey[] = ['country', 'community_feed_industries']

const designPreviewCountries: Country[] = [
  ['Jordan', 'الأردن', 'JO', 'JOR'],
  ['United Arab Emirates', 'الإمارات العربية المتحدة', 'AE', 'ARE'],
  ['Saudi Arabia', 'المملكة العربية السعودية', 'SA', 'SAU'],
  ['Egypt', 'مصر', 'EG', 'EGY'],
  ['United Kingdom', 'المملكة المتحدة', 'GB', 'GBR'],
  ['United States', 'الولايات المتحدة', 'US', 'USA'],
  ['Germany', 'ألمانيا', 'DE', 'DEU'],
  ['Singapore', 'سنغافورة', 'SG', 'SGP'],
].map(([nameEn, nameAr, iso2, iso3], index) => ({
  id: index + 1,
  region_id: 1,
  iso2,
  iso3,
  international_code: '',
  flag: iso2.toLowerCase(),
  name: nameEn,
  names: { en: nameEn, ar: nameAr },
  nationality: '',
  nationalities: { en: '', ar: '' },
  status: 'active',
}))

const copyByLocale = {
  en: {
    required: 'Required',
    optional: 'Optional',
    countryTitle: 'Where are you based?',
    countryBody: 'This helps us tailor availability, currency, and regional experiences.',
    countrySearch: 'Search for your country',
    countryEmpty: 'No country matches that search.',
    countriesLoading: 'Loading countries…',
    countryRequired: 'Choose a country to continue.',
    next: 'Next',
    submit: 'Submit',
    saving: 'Saving…',
    industriesTitle: 'Which industries are you interested in?',
    industriesBody: 'Pick up to five industries to personalize the content you see. You can change them anytime.',
    industrySearch: 'Search industries',
    industriesLoading: 'Loading industries…',
    industriesEmpty: 'No industries match that search.',
    selected: 'selected',
    selectionHint: 'Choose between 1 and 5 industries.',
    maxIndustries: 'You can select up to five industries.',
    skip: 'Skip for now',
    retry: 'Try again',
    loading: 'Preparing your experience…',
    errorTitle: 'We could not load your setup',
    unknownError: 'Something went wrong. Please try again.',
  },
  ar: {
    required: 'مطلوب',
    optional: 'اختياري',
    countryTitle: 'أين تقيم؟',
    countryBody: 'يساعدنا ذلك في تخصيص التوفر والعملات والتجارب الإقليمية.',
    countrySearch: 'ابحث عن دولتك',
    countryEmpty: 'لا توجد دولة مطابقة لبحثك.',
    countriesLoading: 'جارٍ تحميل الدول…',
    countryRequired: 'اختر دولة للمتابعة.',
    next: 'التالي',
    submit: 'إرسال',
    saving: 'جارٍ الحفظ…',
    industriesTitle: 'ما المجالات التي تهتم بها؟',
    industriesBody: 'اختر حتى خمسة مجالات لتخصيص المحتوى الذي تراه. يمكنك تغييرها في أي وقت.',
    industrySearch: 'ابحث في المجالات',
    industriesLoading: 'جارٍ تحميل المجالات…',
    industriesEmpty: 'لا توجد مجالات مطابقة لبحثك.',
    selected: 'تم اختيارها',
    selectionHint: 'اختر من مجال واحد إلى خمسة مجالات.',
    maxIndustries: 'يمكنك اختيار خمسة مجالات كحد أقصى.',
    skip: 'تخطي الآن',
    retry: 'حاول مرة أخرى',
    loading: 'نجهّز تجربتك…',
    errorTitle: 'تعذر تحميل الإعداد',
    unknownError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  },
} as const

function countryEmoji(iso2: string): string {
  if (!/^[a-z]{2}$/i.test(iso2)) return '🌐'
  return iso2
    .toUpperCase()
    .split('')
    .map((character) => String.fromCodePoint(127397 + character.charCodeAt(0)))
    .join('')
}

function collectLeafOptions(node: IndustryNode): IndustryOption[] {
  const children = node.children ?? []
  if (children.length === 0) return [{ id: node.key, label: node.label }]
  return children.flatMap(collectLeafOptions)
}

function createIndustryGroups(tree: IndustryNode[]): IndustryGroup[] {
  return tree.map((node) => ({
    id: node.key,
    label: node.label,
    options: collectLeafOptions(node),
  }))
}

function sortVisiblePrompts(prompts: OnboardingPromptStatus[]): OnboardingPromptStatus[] {
  return [...getVisibleSupportedPrompts(prompts)].sort(
    (first, second) =>
      promptOrder.indexOf(first.prompt_key as OnboardingPromptKey) -
      promptOrder.indexOf(second.prompt_key as OnboardingPromptKey),
  )
}

export default function OnboardingPage() {
  const locale = useLocale()
  const isArabic = locale === 'ar'
  const copy = copyByLocale[isArabic ? 'ar' : 'en']
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDesignPreview =
    process.env.NODE_ENV === 'development' && searchParams.get('designPreview') === 'country'
  const { user, roles, refreshProfile } = useGlobalProfile()
  const { countries, isLoading: countriesLoading, error: countriesError } = useCountries()
  const availableCountries = isDesignPreview ? designPreviewCountries : countries

  const [statuses, setStatuses] = useState<OnboardingPromptStatus[] | null>(null)
  const [activePrompt, setActivePrompt] = useState<OnboardingPromptKey | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [countryQuery, setCountryQuery] = useState('')
  const [industryGroups, setIndustryGroups] = useState<IndustryGroup[]>([])
  const [industryQuery, setIndustryQuery] = useState('')
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<number[]>([])
  const [industriesLoading, setIndustriesLoading] = useState(false)
  const [industriesError, setIndustriesError] = useState<string | null>(null)
  const [pageError, setPageError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)
  const redirectStartedRef = useRef(false)

  const visiblePrompts = useMemo(
    () => (statuses ? sortVisiblePrompts(statuses) : []),
    [statuses],
  )

  const currentStatus = visiblePrompts.find((prompt) => prompt.prompt_key === activePrompt)
  const primaryActionLabel = visiblePrompts.length > 1 ? copy.next : copy.submit
  const activeTitle =
    activePrompt === 'community_feed_industries' ? copy.industriesTitle : copy.countryTitle
  const activeBody =
    activePrompt === 'community_feed_industries' ? copy.industriesBody : copy.countryBody
  const activeRequirement = currentStatus?.cannot_skip ? copy.required : copy.optional

  const navigateAfterOnboarding = useCallback(() => {
    if (redirectStartedRef.current) return
    redirectStartedRef.current = true
    setIsFinishing(true)

    const requestedDestination = searchParams.get('redirect') || searchParams.get('returnUrl')
    const unsafeDestination = requestedDestination?.trim() ?? ''
    const blockedDestination = /(^|\/)(auth|callback|onboarding|update-country)(\/|\?|$)/i.test(
      unsafeDestination,
    )
    const destination = !unsafeDestination || blockedDestination ? null : unsafeDestination

    if (destination) {
      try {
        const parsed = new URL(destination, window.location.origin)
        const allowedHost =
          parsed.hostname === window.location.hostname ||
          parsed.hostname === 'localhost' ||
          parsed.hostname === '127.0.0.1' ||
          parsed.hostname.endsWith('.insightabusiness.com') ||
          parsed.hostname.endsWith('.foresighta.co') ||
          parsed.hostname === 'insightabusiness.com' ||
          parsed.hostname === 'foresighta.co'

        if (allowedHost && /^https?:$/.test(parsed.protocol)) {
          if (isAngularRouteUrl(parsed.toString())) {
            window.location.replace(toAngularAppUrl(parsed.toString()))
            return
          }

          if (parsed.origin === window.location.origin) {
            router.replace(`${parsed.pathname}${parsed.search}${parsed.hash}`)
          } else {
            window.location.replace(parsed.toString())
          }
          return
        }
      } catch {
        // Continue to the role-based destination.
      }
    }

    if (roles.some((role) => ['insighter', 'company', 'company-insighter'].includes(role))) {
      window.location.replace(`${getAngularAppOrigin()}/app/insighter-dashboard/my-dashboard`)
      return
    }

    router.replace(`/${locale}/home`)
  }, [locale, roles, router, searchParams])

  const applyStatuses = useCallback(
    (nextStatuses: OnboardingPromptStatus[]) => {
      const nextVisible = sortVisiblePrompts(nextStatuses)
      setStatuses(nextStatuses)

      if (nextVisible.length === 0) {
        navigateAfterOnboarding()
        return
      }

      setActivePrompt((current) => {
        const currentStillVisible = nextVisible.some((prompt) => prompt.prompt_key === current)
        return currentStillVisible
          ? current
          : (nextVisible[0].prompt_key as OnboardingPromptKey)
      })
    },
    [navigateAfterOnboarding],
  )

  const loadStatuses = useCallback(async () => {
    const token = getAuthToken()
    if (!token) {
      const returnUrl = typeof window === 'undefined' ? '' : window.location.href
      window.location.replace(
        `${getAngularAppOrigin()}/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`,
      )
      return
    }

    setPageError(null)
    try {
      const nextStatuses = await fetchOnboardingPromptStatuses({ token, locale })
      applyStatuses(nextStatuses)
    } catch (error) {
      setPageError(error instanceof Error ? error.message : copy.unknownError)
    }
  }, [applyStatuses, copy.unknownError, locale])

  const loadIndustries = useCallback(async () => {
    setIndustriesLoading(true)
    setIndustriesError(null)
    try {
      const tree = await fetchOnboardingIndustryTree(locale)
      setIndustryGroups(createIndustryGroups(tree))
    } catch (error) {
      setIndustriesError(error instanceof Error ? error.message : copy.unknownError)
    } finally {
      setIndustriesLoading(false)
    }
  }, [copy.unknownError, locale])

  useEffect(() => {
    if (isDesignPreview) {
      applyStatuses([
        {
          prompt_key: 'country',
          status: 'pending',
          cannot_skip: true,
          should_show: true,
          has_record: false,
          completed_at: null,
          skipped_at: null,
          last_shown_at: null,
          show_count: 0,
          metadata: null,
        },
      ])
      return
    }

    void loadStatuses()
    void loadIndustries()
  }, [applyStatuses, isDesignPreview, loadIndustries, loadStatuses])

  useEffect(() => {
    if (!selectedCountry && user?.country_id && availableCountries.length > 0) {
      setSelectedCountry(availableCountries.find((country) => country.id === user.country_id) ?? null)
    }
  }, [availableCountries, selectedCountry, user?.country_id])

  const filteredCountries = useMemo(() => {
    const query = countryQuery.trim().toLocaleLowerCase(locale)
    return availableCountries
      .filter((country) => {
        if (!query) return true
        return [country.names?.en, country.names?.ar, country.iso2, country.iso3]
          .filter(Boolean)
          .some((value) => String(value).toLocaleLowerCase(locale).includes(query))
      })
      .sort((first, second) =>
        (first.names?.[isArabic ? 'ar' : 'en'] || first.name).localeCompare(
          second.names?.[isArabic ? 'ar' : 'en'] || second.name,
          locale,
        ),
      )
  }, [availableCountries, countryQuery, isArabic, locale])

  const filteredIndustryGroups = useMemo(() => {
    const query = industryQuery.trim().toLocaleLowerCase(locale)
    if (!query) return industryGroups

    return industryGroups
      .map((group) => ({
        ...group,
        options: group.options.filter(
          (option) =>
            option.label.toLocaleLowerCase(locale).includes(query) ||
            group.label.toLocaleLowerCase(locale).includes(query),
        ),
      }))
      .filter((group) => group.options.length > 0)
  }, [industryGroups, industryQuery, locale])

  const handleCountrySubmit = async () => {
    if (!selectedCountry) {
      setFieldError(copy.countryRequired)
      return
    }

    const token = getAuthToken()
    if (!token) return
    setIsSubmitting(true)
    setFieldError(null)

    try {
      await updateOnboardingCountry(selectedCountry.id, { token, locale })
      await refreshProfile(true)
      applyStatuses(await fetchOnboardingPromptStatuses({ token, locale }))
    } catch (error) {
      setFieldError(error instanceof Error ? error.message : copy.unknownError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleIndustry = (industryId: number) => {
    setFieldError(null)
    setSelectedIndustryIds((current) => {
      if (current.includes(industryId)) return current.filter((id) => id !== industryId)
      if (current.length >= 5) {
        setFieldError(copy.maxIndustries)
        return current
      }
      return [...current, industryId]
    })
  }

  const handleIndustriesSubmit = async () => {
    if (selectedIndustryIds.length === 0) {
      setFieldError(copy.selectionHint)
      return
    }

    const token = getAuthToken()
    if (!token) return
    setIsSubmitting(true)
    setFieldError(null)

    try {
      await updateFeedIndustryPreferences(selectedIndustryIds, { token, locale })
      applyStatuses(await fetchOnboardingPromptStatuses({ token, locale }))
    } catch (error) {
      setFieldError(error instanceof Error ? error.message : copy.unknownError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = async () => {
    if (!activePrompt || currentStatus?.cannot_skip) return
    const token = getAuthToken()
    if (!token) return
    setIsSubmitting(true)
    setFieldError(null)

    try {
      await skipOnboardingPrompt(activePrompt, { token, locale })
      applyStatuses(await fetchOnboardingPromptStatuses({ token, locale }))
    } catch (error) {
      setFieldError(error instanceof Error ? error.message : copy.unknownError)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isInitialLoading = statuses === null && !pageError

  return (
    <main className={`${styles.shell} flex min-h-screen items-center justify-center p-3 sm:p-5`}>
      <section className={`${styles.frame} grid w-full overflow-hidden bg-white`}>
        <aside className={`${styles.visualPanel} relative overflow-hidden`}>
          <Image
            src="/images/onboarding/insighta-onboarding-background.png"
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 400px"
            className={styles.visualImage}
            priority
          />
          <div className={styles.visualShade} />
          <Image
            src={isArabic ? InsightaLogoWhiteAr : InsightaLogoWhiteEn}
            width={112}
            height={38}
            alt="Insighta"
            className="absolute start-5 top-5 z-10 h-auto w-[96px] sm:start-6 sm:top-6 sm:w-[108px]"
            priority
          />
          <div className={`${styles.visualContent} absolute z-10 flex flex-col text-white`}>
            {!isInitialLoading && !isFinishing && !pageError && activePrompt && (
              <div key={activePrompt} className={styles.stepEnter}>
                <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">
                  {activeRequirement}
                </span>
                <h1 className="mt-4 max-w-[330px] text-[29px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[35px]">
                  {activeTitle}
                </h1>
                <p className="mt-4 max-w-[305px] text-[11px] leading-[1.7] text-white/72 sm:text-xs">
                  {activeBody}
                </p>
              </div>
            )}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col bg-white">
          <div className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-7 sm:py-7">
          {isInitialLoading || isFinishing ? (
            <div className="grid flex-1 place-items-center" role="status">
              <div className="text-center text-[#687784]">
                <IconLoader2 className="mx-auto animate-spin text-[#2979b8]" size={22} />
                <p className="mt-3 text-xs">{copy.loading}</p>
              </div>
            </div>
          ) : pageError ? (
            <div className="grid flex-1 place-items-center">
              <div className="max-w-xs text-center">
                <IconWorld className="mx-auto text-[#a14b38]" size={25} />
                <h2 className="mt-3 text-base font-semibold text-[#1d2b36]">{copy.errorTitle}</h2>
                <p className="mt-2 text-xs leading-5 text-[#687784]">{pageError}</p>
                <button
                  type="button"
                  onClick={() => void loadStatuses()}
                  className="mt-5 rounded-lg bg-[#153b5b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0f304b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]"
                >
                  {copy.retry}
                </button>
              </div>
            </div>
          ) : activePrompt === 'country' ? (
            <div key="country" className={`${styles.stepEnter} flex min-h-0 flex-1 flex-col`}>
              <div className="flex min-h-0 flex-1 flex-col">
                <label htmlFor="onboarding-country-search" className="sr-only">
                  {copy.countrySearch}
                </label>
                <div className="relative shrink-0">
                  <IconSearch
                    className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]"
                    size={16}
                  />
                  <input
                    id="onboarding-country-search"
                    value={countryQuery}
                    onChange={(event) => setCountryQuery(event.currentTarget.value)}
                    placeholder={copy.countrySearch}
                    className="h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#69a2ce] focus:ring-2 focus:ring-[#e4f0f8]"
                  />
                </div>

                <div
                  className={`${styles.scrollArea} mt-2 min-h-0 flex-1 overflow-y-auto rounded-lg border border-[#e1e5e9] p-1.5`}
                  role="listbox"
                  aria-label={copy.countrySearch}
                >
                  {!isDesignPreview && countriesLoading ? (
                    <p className="py-8 text-center text-xs text-[#687784]">{copy.countriesLoading}</p>
                  ) : !isDesignPreview && countriesError ? (
                    <p className="py-8 text-center text-xs text-[#a14b38]">{copy.unknownError}</p>
                  ) : filteredCountries.length === 0 ? (
                    <p className="py-8 text-center text-xs text-[#687784]">{copy.countryEmpty}</p>
                  ) : (
                    filteredCountries.map((country) => {
                      const isSelected = selectedCountry?.id === country.id
                      const label = country.names?.[isArabic ? 'ar' : 'en'] || country.name
                      return (
                        <button
                          key={country.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSelectedCountry(country)
                            setFieldError(null)
                          }}
                          className={`flex min-h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-start text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#69a2ce] ${
                            isSelected
                              ? `${styles.choiceSelected} bg-[#edf5fa] font-semibold text-[#185f94]`
                              : 'text-[#344550] hover:bg-[#f5f7f8]'
                          }`}
                        >
                          <span className="text-base" aria-hidden="true">{countryEmoji(country.iso2)}</span>
                          <span className="min-w-0 flex-1 truncate">{label}</span>
                          <span className="text-[9px] font-medium uppercase text-[#98a2aa]">{country.iso2}</span>
                          {isSelected && <IconCheck size={14} stroke={2.3} />}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>

              <div className="mt-4 flex shrink-0 items-center justify-between gap-4 border-t border-[#e7eaed] pt-4">
                <p className="min-h-4 text-[11px] text-[#a14b38]" role="alert">{fieldError}</p>
                <button
                  type="button"
                  onClick={() => void handleCountrySubmit()}
                  disabled={isSubmitting}
                  className="inline-flex min-w-[112px] items-center justify-center gap-2 rounded-lg bg-[#153b5b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0f304b] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]"
                >
                  {isSubmitting ? <IconLoader2 className="animate-spin" size={14} /> : null}
                  {isSubmitting ? copy.saving : primaryActionLabel}
                  {!isSubmitting && (isArabic ? <IconArrowLeft size={14} /> : <IconArrowRight size={14} />)}
                </button>
              </div>
            </div>
          ) : activePrompt === 'community_feed_industries' ? (
            <div key="industries" className={`${styles.stepEnter} flex min-h-0 flex-1 flex-col`}>
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex shrink-0 items-center gap-2">
                  <div className="relative flex-1">
                    <IconSearch
                      className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[#89959f]"
                      size={16}
                    />
                    <input
                      value={industryQuery}
                      onChange={(event) => setIndustryQuery(event.currentTarget.value)}
                      placeholder={copy.industrySearch}
                      aria-label={copy.industrySearch}
                      className="h-10 w-full rounded-lg border border-[#d9dee3] bg-white ps-9 pe-3 text-xs text-[#25343f] outline-none transition placeholder:text-[#929ca5] focus:border-[#69a2ce] focus:ring-2 focus:ring-[#e4f0f8]"
                    />
                  </div>
                  <span className="whitespace-nowrap text-[11px] font-medium text-[#5f6d78]">
                    {selectedIndustryIds.length}/5 {copy.selected}
                  </span>
                </div>

                <div className={`${styles.scrollArea} mt-3 min-h-0 flex-1 overflow-y-auto pe-1`}>
                  {industriesLoading ? (
                    <p className="py-8 text-center text-xs text-[#687784]">{copy.industriesLoading}</p>
                  ) : industriesError ? (
                    <div className="py-8 text-center">
                      <p className="text-xs text-[#a14b38]">{industriesError}</p>
                      <button type="button" onClick={() => void loadIndustries()} className="mt-2 text-[11px] font-semibold text-[#2979b8]">
                        {copy.retry}
                      </button>
                    </div>
                  ) : filteredIndustryGroups.length === 0 ? (
                    <p className="py-8 text-center text-xs text-[#687784]">{copy.industriesEmpty}</p>
                  ) : (
                    <div className="space-y-4 pb-1">
                      {filteredIndustryGroups.map((group) => (
                        <section key={group.id} aria-labelledby={`industry-${group.id}`}>
                          <h2 id={`industry-${group.id}`} className="mb-2 text-[11px] font-semibold text-[#3c78a5]">
                            {group.label}
                          </h2>
                          <div className="flex flex-wrap gap-1.5">
                            {group.options.map((industry) => {
                              const selected = selectedIndustryIds.includes(industry.id)
                              return (
                                <button
                                  key={industry.id}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => toggleIndustry(industry.id)}
                                  className={`inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#2979b8] ${
                                    selected
                                      ? `${styles.choiceSelected} border-[#69a2ce] bg-[#edf5fa] font-semibold text-[#185f94]`
                                      : 'border-[#dfe4e8] bg-white text-[#40515c] hover:border-[#b9c8d3] hover:bg-[#f7f8f9]'
                                  }`}
                                >
                                  {selected && <IconCheck size={12} stroke={2.4} />}
                                  {industry.label}
                                </button>
                              )
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-[#e7eaed] pt-4">
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => void handleSkip()}
                    disabled={isSubmitting || currentStatus?.cannot_skip}
                    className="rounded-md px-2 py-2 text-[11px] font-medium text-[#667580] hover:bg-[#f1f3f5] hover:text-[#263b49] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#69a2ce]"
                  >
                    {copy.skip}
                  </button>
                  <p className="mt-0.5 min-h-4 truncate text-[10px] text-[#a14b38]" role="alert">{fieldError}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleIndustriesSubmit()}
                  disabled={isSubmitting}
                  className="inline-flex min-w-[148px] items-center justify-center gap-2 rounded-lg bg-[#153b5b] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0f304b] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2979b8]"
                >
                  {isSubmitting && <IconLoader2 className="animate-spin" size={14} />}
                  {isSubmitting ? copy.saving : primaryActionLabel}
                  {!isSubmitting && (isArabic ? <IconArrowLeft size={14} /> : <IconArrowRight size={14} />)}
                </button>
              </div>
            </div>
          ) : null}
          </div>
        </section>
      </section>
    </main>
  )
}
