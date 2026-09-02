'use client'

import type { InsighterPromptKey } from '@/services/onboarding.service'
import styles from './insighterSetupCover.module.css'

export type InsighterSetupStage = 'meeting' | 'project'

/**
 * Query param the post-login onboarding flow puts on the destination URL to ask
 * that destination to show the covers. They are deliberately not rendered on the
 * onboarding page itself — the redirect completes first, then whichever app the
 * user lands in (Next.js here, Angular for /app routes) offers them.
 */
export const INSIGHTER_SETUP_QUERY_KEY = 'insighterSetup'

/** Covers offered, in order. */
export const INSIGHTER_STAGE_ORDER: InsighterSetupStage[] = ['meeting', 'project']

/** Which prompt each cover answers, in the order they are offered. */
export const INSIGHTER_STAGE_PROMPT: Record<InsighterSetupStage, InsighterPromptKey> = {
  meeting: 'session_availability',
  project: 'project_settings',
}

/** Angular settings page each cover's CTA sends the user to. */
export const INSIGHTER_STAGE_PATH: Record<InsighterSetupStage, string> = {
  meeting: '/app/insighter-dashboard/account-settings/consulting-schedule',
  project: '/app/insighter-dashboard/account-settings/project-settings',
}

const MEETING_ART =
  'https://res.cloudinary.com/dsiku9ipv/image/upload/v1788187470/Meeting_qfjlo4.png'

type Profile = {
  first_name?: string | null
  last_name?: string | null
  name?: string | null
  profile_photo_url?: string | null
  country?: { name?: string | null; names?: Record<string, string> } | string | null
} | null

type InsighterSetupCoverProps = {
  stage: InsighterSetupStage
  locale: string
  profile: Profile
  onPrimary: () => void
  onSkip: () => void
  isSkipping: boolean
}

function displayName(profile: Profile): string {
  if (!profile) return ''
  const full = `${profile.first_name ?? ''} ${profile.last_name ?? ''}`.trim()
  return full || profile.name || ''
}

function initials(profile: Profile): string {
  if (!profile) return 'I'
  const fromNames = `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.trim()
  return (fromNames || profile.name?.[0] || 'I').toUpperCase()
}

function countryName(profile: Profile, locale: string): string {
  const country = profile?.country
  if (!country) return ''
  if (typeof country === 'string') return country
  return country.names?.[locale] || country.name || ''
}

const TickIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12.5 9.5 18 20 7" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m-10 0h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm0 4h14" />
  </svg>
)

/**
 * The become-Insighter wizard's meeting / service cover modals, re-offered
 * after login to Insighters who never finished those steps. Unlike the wizard,
 * the CTA hands off to the real settings page in the Angular app — the backend
 * marks the prompt completed once the settings are saved there.
 */
export default function InsighterSetupCover({
  stage,
  locale,
  profile,
  onPrimary,
  onSkip,
  isSkipping,
}: InsighterSetupCoverProps) {
  const isArabic = locale === 'ar'

  const copy = isArabic
    ? {
        close: 'إغلاق',
        skip: 'تخطي الآن',
        meeting: {
          title: 'قابل عملاءك',
          lede: 'حدّد ساعات الاستشارة. يحجز العملاء تلك الأوقات فقط ويدفعون سعرك مقدماً.',
          points: [
            'اختر أيام عملك وأضِف الفترات الزمنية لكل يوم.',
            'سعّر كل فترة، مع سعر منفصل للجلسات الحضورية.',
            'قابل أونلاين أو حضورياً أو كليهما — واحفظ عنوانك مرة واحدة.',
          ],
          cta: 'حدّد أوقات توفري',
          art: 'اختيار التاريخ والوقت لحجز جلسة',
        },
        project: {
          title: 'استقبل طلبات العملاء',
          lede: 'فعّل طلبات الخدمة ليظهر زر «اطلب خدمة» في ملفك العام.',
          points: [
            'حدّد الخدمات التي تقدّمها.',
            'إعدادات تتعلق بطبيعة الخدمات التي تقدّمها.',
            'سيتم ترشيحك كمرشّح لطلبات خدمات العملاء.',
          ],
          cta: 'إعداد خدماتي',
          requestService: 'اطلب خدمة',
        },
      }
    : {
        close: 'Close',
        skip: 'Skip for now',
        meeting: {
          title: 'Meet With Clients',
          lede: 'Set the hours you consult in. Clients book only those slots, and pay your rate up front.',
          points: [
            'Pick the days you work and add time slots to each one.',
            'Price every slot, with a separate rate for in-person sessions.',
            'Meet online, on site, or both — and save your address once.',
          ],
          cta: 'Set My Availability',
          art: 'Choosing a date and time slot to book a session',
        },
        project: {
          title: "Recieve Client's Requests",
          lede: 'Switch on service requests and a Request Service button appears on your public profile.',
          points: [
            'Define the services you provide.',
            'Settings related to the nature of the services you provide.',
            "You'll be suggested as a candidate for clients' service requests.",
          ],
          cta: 'Set Up My Services',
          requestService: 'Request Service',
        },
      }

  const stageCopy = stage === 'meeting' ? copy.meeting : copy.project
  const photoUrl = profile?.profile_photo_url
  const geo = countryName(profile, locale)

  return (
    <div className={styles.backdrop}>
      <div className={styles.cover} role="dialog" aria-modal="true" dir={isArabic ? 'rtl' : 'ltr'}>
        <button type="button" className={styles.close} onClick={onSkip} disabled={isSkipping} aria-label={copy.close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className={styles.panel}>
          {stage === 'meeting' ? (
            <>
              <span className={`${styles.blob} ${styles.blobOne}`} aria-hidden="true" />
              <span className={`${styles.blob} ${styles.blobTwo}`} aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.art} src={MEETING_ART} alt={copy.meeting.art} />
            </>
          ) : (
            <div className={styles.profile}>
              <span className={styles.avatar}>
                {photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoUrl} alt="" />
                ) : (
                  initials(profile)
                )}
              </span>
              <span className={styles.name}>
                <span className={styles.displayName}>{displayName(profile)}</span>
                <svg className={styles.verified} viewBox="0 0 24 24" fill="#2378E8" aria-hidden="true">
                  <path d="M12 1.6l2.6 2 3.2-.3 1 3.1 2.7 1.8-1.2 3 1.2 3-2.7 1.8-1 3.1-3.2-.3-2.6 2-2.6-2-3.2.3-1-3.1L3.5 15l1.2-3-1.2-3 2.7-1.8 1-3.1 3.2.3z" />
                  <path d="M8.4 12.2l2.4 2.4 4.5-4.9" fill="none" stroke="#fff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {geo && <span className={styles.geo}>{geo}</span>}
              <span className={styles.requestWrap}>
                <span className={styles.request}>
                  <BriefcaseIcon />
                  {copy.project.requestService}
                </span>
              </span>
            </div>
          )}
        </div>

        <h2 className={styles.title}>{stageCopy.title}</h2>
        <p className={styles.lede}>{stageCopy.lede}</p>
        <ul className={styles.list}>
          {stageCopy.points.map((point) => (
            <li key={point}>
              <span className={styles.tick}>
                <TickIcon />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <button type="button" className={styles.cta} onClick={onPrimary}>
          {stage === 'meeting' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>
          ) : (
            <BriefcaseIcon />
          )}
          {stageCopy.cta}
        </button>
        <button type="button" className={styles.skip} onClick={onSkip} disabled={isSkipping}>
          {copy.skip}
        </button>
      </div>
    </div>
  )
}
