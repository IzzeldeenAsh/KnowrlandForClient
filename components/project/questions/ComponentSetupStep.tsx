 'use client'
import { useCallback, useEffect, useState } from 'react'
import { getAuthToken } from '@/lib/authToken'
import { readStoredProjectRequestUuid } from '../projectRequestUuid'
import { ensureProjectServiceUuid } from '../projectServiceUuid'
import { projectWizardStorage, type WizardLocale } from '../wizardStorage'
import { fetchProjectLevelComponentSlugs, fetchProjectServiceComponentSlugs, storeComponentSlugs } from '../projectComponentsCatalog'
import { useProjectWizardNavigation } from '../useProjectWizardNavigation'
import { getProjectApiErrorMessage } from '../projectApiError'
import { waitForProjectAiIntake } from '../projectAiIntake'
import { markAiIntakeReady } from '../projectWizardFlow'
import ProjectScopeQuestion from './ProjectScopeQuestion'
export default function ComponentSetupStep({ locale }: { locale: WizardLocale }) {
  const nav = useProjectWizardNavigation(locale)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [needsClarification, setNeedsClarification] = useState(false)
  const [waitingForAi, setWaitingForAi] = useState(false)
  const onIntakeReady = useCallback(() => {
    setNeedsClarification(false)
    setRetry(value => value + 1)
  }, [])
  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    async function load() {
      try {
        setError('')
        const token = getAuthToken(), projectUuid = readStoredProjectRequestUuid(locale)
        if (!token || !projectUuid) throw new Error(locale === 'ar' ? 'يرجى تحديد الخدمة أولاً.' : 'Please select a service first.')
        const serviceIds = JSON.parse(window.sessionStorage.getItem(projectWizardStorage.serviceIdsKey(locale)) || '[]')
        const serviceId = Number(Array.isArray(serviceIds) ? serviceIds[0] : serviceIds)
        if (!Number.isFinite(serviceId) || serviceId <= 0) throw new Error(locale === 'ar' ? 'اختر الخدمة أولًا.' : 'Choose a service first.')
        const projectServiceUuid = await ensureProjectServiceUuid(locale)
        if (cancelled) return
        const isOther = ['1', 'true'].includes(window.sessionStorage.getItem(projectWizardStorage.serviceIsOtherKey(locale)) || '')
        if (isOther) {
          setWaitingForAi(true)
          const intake = await waitForProjectAiIntake({ locale, token, projectUuid, projectServiceUuid, signal: controller.signal })
          if (cancelled) return
          setWaitingForAi(false)
          if (intake.needsClarification) {
            window.sessionStorage.removeItem(projectWizardStorage.aiIntakeReadyKey(locale))
            setNeedsClarification(true)
            return
          }
          if (intake.status !== 'ready') throw new Error(locale === 'ar' ? 'تعذر تحليل الطلب. حاول مجددًا.' : 'The request could not be analyzed. Please try again.')
          markAiIntakeReady(locale)
        }
        const [projectServiceSlugs, projectSlugs] = await Promise.all([
          fetchProjectServiceComponentSlugs({ locale, token, projectUuid, projectServiceUuid, serviceId, isOther, signal: controller.signal }),
          fetchProjectLevelComponentSlugs({ locale, token, projectUuid, signal: controller.signal }),
        ])
        if (cancelled) return
        storeComponentSlugs(locale, { projectServiceSlugs, projectSlugs })
        nav.goNext()
      } catch (err) { if (!cancelled) { setWaitingForAi(false); setError(getProjectApiErrorMessage(err, locale === 'ar' ? 'تعذر تحميل المتطلبات.' : 'Could not load requirements.')) } }
    }
    void load()
    return () => { cancelled = true; controller.abort() }
    // Navigation reads the freshly stored component order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, retry])
  if (needsClarification) return <ProjectScopeQuestion locale={locale} intakeOnly onIntakeReady={onIntakeReady} />
  return <div className="max-w-3xl mx-auto py-12" role="status"><p>{error || (waitingForAi ? (locale === 'ar' ? 'جار تحليل طلبك…' : 'Analyzing your request…') : (locale === 'ar' ? 'جار تحميل متطلبات المشروع…' : 'Loading project requirements…'))}</p>{error && <button className="btn-sm mt-4" onClick={() => { setError(''); setRetry(n => n + 1) }}>{locale === 'ar' ? 'إعادة المحاولة' : 'Try again'}</button>}</div>
}
