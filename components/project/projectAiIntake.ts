import { getApiUrl } from '@/app/config'
import { assertProjectApiResponse, ProjectApiError } from './projectApiError'
import type { WizardLocale } from './wizardStorage'

export const AI_POLL_INTERVAL_MS = 5000
const MAX_CONSECUTIVE_ERRORS = 6

export type AiIntakeQuestion = { key: string; question: string }

function extractAiIntakeStatus(payload: unknown) {
  const root = payload as { data?: unknown } | null
  const data = (root?.data ?? payload) as {
    status?: string
    needs_clarification?: boolean
    questions?: Array<{ key?: string; id?: string; question?: string; text?: string; label?: string }>
  } | null
  const status = String(data?.status ?? '').trim().toLowerCase()
  const questions = Array.isArray(data?.questions) ? data.questions.map(question => ({
    key: String(question?.key ?? question?.id ?? '').trim(),
    question: String(question?.question ?? question?.text ?? question?.label ?? '').trim(),
  })).filter(question => question.key && question.question) : []
  return { status, needsClarification: Boolean(data?.needs_clarification) || status === 'needs_clarification', questions }
}

function waitForNextCheck(signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted()
    const onAbort = () => {
      clearTimeout(timer)
      reject(signal.reason)
    }
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, AI_POLL_INTERVAL_MS)
    signal.addEventListener('abort', onAbort, { once: true })
  })
}

/** Pending AI work keeps polling; only consecutive request errors exhaust retries. */
export async function waitForProjectAiIntake(params: {
  locale: WizardLocale
  token: string
  projectUuid: string
  projectServiceUuid: string
  signal: AbortSignal
  delayFirstCheck?: boolean
}) {
  const { locale, token, projectUuid, projectServiceUuid, signal } = params
  let consecutiveErrors = 0
  if (params.delayFirstCheck) await waitForNextCheck(signal)

  while (!signal.aborted) {
    try {
      const response = await fetch(getApiUrl(`/api/account/project/definition/ai-intake/check-clarification/${projectUuid}/${projectServiceUuid}`), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        cache: 'no-store',
        signal,
      })
      await assertProjectApiResponse(response, locale === 'ar' ? 'تعذر التحقق من حالة الطلب.' : 'Failed to check the prompt status.')
      const payload: unknown = await response.json()
      const intake = extractAiIntakeStatus(payload)
      consecutiveErrors = 0
      if (intake.needsClarification || intake.status === 'ready' || intake.status === 'failed') {
        return { ...intake, payload }
      }
    } catch (error) {
      signal.throwIfAborted()
      consecutiveErrors += 1
      if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS ||
        (error instanceof ProjectApiError && error.status >= 400 && error.status < 500)) throw error
    }
    await waitForNextCheck(signal)
  }
  signal.throwIfAborted()
  throw new Error('AI intake check cancelled.')
}
