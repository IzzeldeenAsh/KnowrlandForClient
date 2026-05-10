'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { clearProjectWizardStorage, type WizardLocale } from '../wizardStorage'

export default function ProjectSubmissionSuccessStep({
  locale,
}: {
  locale: WizardLocale
}) {
  const isRTL = locale === 'ar'
  const isEnglish =
    typeof locale === 'string' && locale.toLowerCase().startsWith('en')

  useEffect(() => {
    clearProjectWizardStorage(locale)
  }, [locale])

  const title = isRTL ? 'تهانينا، تم إرسال الطلب' : 'Congratulations, your proposal is submitted'
  const body = isRTL
    ? 'أرسلنا العرض بنجاح إلى الجهات والخبراء الذين اخترتهم. يمكنك الآن متابعة حالة المشروع من صفحة المشاريع.'
    : 'Your offer has been submitted successfully to the selected matches. You can now track the project from your projects page.'
  const primaryAction = isRTL ? 'عرض مشاريعي' : 'View my projects'
  const secondaryAction = isRTL ? 'إنشاء طلب جديد' : 'Start another request'
  const statLabel = isRTL ? 'الخطوة التالية' : 'What happens next'
  const statText = isRTL
    ? 'سيتمكن الطرف المطابق من مراجعة العرض واتخاذ الإجراء المناسب.'
    : 'Your matched insighters or companies can now review the offer and respond.'

  return (
    <div
      className="mx-auto flex min-h-full w-full max-w-6xl items-center justify-center py-6"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {isEnglish ? (
        <style>{`
          #project-submission-success-title {
            font-family: "IBM Plex Serif", serif !important;
          }
        `}</style>
      ) : null}

      <style>{`
        @keyframes projectSuccessFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -10px, 0) scale(1.03); }
        }

        @keyframes projectSuccessPulse {
          0% { transform: scale(0.9); opacity: 0.32; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }

        @keyframes projectSuccessOrbit {
          0% { transform: rotate(0deg) translateY(-150px) rotate(0deg); opacity: 0.28; }
          50% { opacity: 0.9; }
          100% { transform: rotate(360deg) translateY(-150px) rotate(-360deg); opacity: 0.28; }
        }

        @keyframes projectSuccessRise {
          0% { transform: translate3d(0, 18px, 0) scale(0.8); opacity: 0; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
        }

        @keyframes projectSuccessCheckCircle {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes projectSuccessCheckmark {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>

      <div
       
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[22%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(28,124,187,0.16),rgba(28,124,187,0)_68%)] blur-2xl" />
          <div className="absolute right-[12%] top-[18%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.32),rgba(251,191,36,0)_70%)] blur-xl" />
          <div className="absolute left-[10%] bottom-[18%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.24),rgba(52,211,153,0)_70%)] blur-xl" />

          {[
            { left: '16%', top: '22%', delay: '0s', duration: '9s' },
            { left: '50%', top: '14%', delay: '1.2s', duration: '11s' },
            { left: '82%', top: '28%', delay: '2.2s', duration: '10s' },
            { left: '24%', top: '74%', delay: '0.8s', duration: '12s' },
            { left: '72%', top: '76%', delay: '1.8s', duration: '8.5s' },
          ].map((particle) => (
            <span
              key={`${particle.left}-${particle.top}`}
              className="absolute block h-3 w-3 rounded-full bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.12)]"
              style={{
                left: particle.left,
                top: particle.top,
                animation: `projectSuccessRise 700ms ease-out ${particle.delay} both, projectSuccessFloat ${particle.duration} ease-in-out ${particle.delay} infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <span
              className="absolute inset-0 rounded-full border border-sky-200/80 bg-sky-100/50"
              style={{ animation: 'projectSuccessPulse 2.8s ease-out infinite' }}
            />
            <span
              className="absolute inset-[14%] rounded-full border border-amber-200/70 bg-white/80 shadow-[0_0_0_18px_rgba(255,255,255,0.35)]"
              style={{ animation: 'projectSuccessFloat 6s ease-in-out infinite' }}
            />

          

            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(145deg,#169b62,#49c98b)] text-white shadow-[0_18px_40px_rgba(22,155,98,0.35)]"
              style={{ animation: 'projectSuccessCheckCircle 600ms ease-out both' }}
            >
              <div className="absolute inset-1 rounded-full border border-white/25" />
              <svg
                className="relative h-14 w-14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                    animation: 'projectSuccessCheckmark 800ms ease-out 400ms forwards',
                  }}
                />
              </svg>
            </div>
          </div>
          <h1
            id="project-submission-success-title"
            className="mt-6 max-w-3xl text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.2]  text-slate-950"
          >
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {body}
          </p>

          <div className="mt-8 w-full max-w-2xl rounded-[28px] border border-sky-100/80 bg-white/75 px-5 py-5 text-start shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-6">
            <div className="text-[11px] font-semibold text-slate-400">
              {statLabel}
            </div>
            <div className="mt-2 text-sm font-medium leading-7 text-slate-700 sm:text-[15px]">
              {statText}
            </div>
          </div>

          <div className="mt-10 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row">
            <Link
              href="https://app.insightabusiness.com/app/insighter-dashboard/projects-created"
              className="btn-sm rounded-full bg-[#1C7CBB] px-6 py-3 text-center text-white shadow-[0_18px_40px_rgba(28,124,187,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#17689e]"
            >
              {primaryAction}
            </Link>
            <Link
              href={`/${locale}/project/wizard/project-type?fresh=1`}
              className="btn-sm rounded-full border border-slate-200 bg-white/90 px-6 py-3 text-center text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-white"
            >
              {secondaryAction}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
