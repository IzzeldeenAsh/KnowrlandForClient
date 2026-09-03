'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGlobalProfile } from '@/components/auth/GlobalProfileProvider'
import { getAngularAppOrigin } from '@/lib/authRedirect'
import { getAuthToken } from '@/lib/authToken'
import {
  fetchInsighterPromptStatuses,
  getVisibleInsighterPrompts,
  hasInsighterPromptRole,
  INSIGHTER_SETUP_QUERY_KEY,
  skipInsighterPrompt,
} from '@/services/onboarding.service'
import InsighterSetupCover, {
  INSIGHTER_STAGE_ORDER,
  INSIGHTER_STAGE_PATH,
  INSIGHTER_STAGE_PROMPT,
  type InsighterSetupStage,
} from './InsighterSetupCover'

type InsighterSetupCoverHostProps = {
  locale: string
}

/**
 * Shows the Insighter setup covers once the post-login redirect has landed here.
 *
 * The onboarding flow finishes its redirect first and tags the destination URL
 * with `?insighterSetup=1`; this picks that up so the covers appear over the
 * page the user actually arrived at, not stacked on the onboarding page. The
 * Angular app has its own host for `/app/*` destinations.
 */
export default function InsighterSetupCoverHost({ locale }: InsighterSetupCoverHostProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { user, roles } = useGlobalProfile()

  const [stages, setStages] = useState<InsighterSetupStage[]>([])
  const [activeStage, setActiveStage] = useState<InsighterSetupStage | null>(null)
  const [isSkipping, setIsSkipping] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  const isRequested = searchParams.get(INSIGHTER_SETUP_QUERY_KEY) === '1'
  const previewStage =
    process.env.NODE_ENV === 'development'
      ? (searchParams.get('designPreview') as InsighterSetupStage | null)
      : null
  const isPreview = previewStage === 'meeting' || previewStage === 'project'

  /** Drop the marker so a refresh or a back-navigation doesn't re-open the covers. */
  const clearMarker = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (!params.has(INSIGHTER_SETUP_QUERY_KEY)) return
    params.delete(INSIGHTER_SETUP_QUERY_KEY)
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    })
  }, [pathname, router, searchParams])

  useEffect(() => {
    if (isPreview) {
      setActiveStage(previewStage as InsighterSetupStage)
      setStages([])
      return
    }

    if (!isRequested || hasChecked) return
    setHasChecked(true)

    const token = getAuthToken()
    if (!token || !hasInsighterPromptRole(roles)) {
      clearMarker()
      return
    }

    void (async () => {
      const prompts = await fetchInsighterPromptStatuses({ token, locale })
      const visibleKeys = new Set(
        getVisibleInsighterPrompts(prompts).map((prompt) => prompt.prompt_key),
      )
      const pending = INSIGHTER_STAGE_ORDER.filter((stage) =>
        visibleKeys.has(INSIGHTER_STAGE_PROMPT[stage]),
      )

      clearMarker()
      if (pending.length === 0) return

      setStages(pending.slice(1))
      setActiveStage(pending[0])
    })()
  }, [clearMarker, hasChecked, isPreview, isRequested, locale, previewStage, roles])

  const advance = () => {
    setActiveStage(stages[0] ?? null)
    setStages((rest) => rest.slice(1))
  }

  /** CTA: hand off to the settings page in the Angular app. The backend marks
   *  the prompt completed once the settings are saved there. */
  const handlePrimary = () => {
    if (!activeStage || isPreview) return
    window.location.assign(`${getAngularAppOrigin()}${INSIGHTER_STAGE_PATH[activeStage]}`)
  }

  const handleSkip = async () => {
    if (!activeStage || isSkipping || isPreview) return
    const token = getAuthToken()
    setIsSkipping(true)

    try {
      if (token) {
        await skipInsighterPrompt(INSIGHTER_STAGE_PROMPT[activeStage], { token, locale })
      }
    } catch {
      // A failed skip must not trap the user on the cover.
    } finally {
      setIsSkipping(false)
      advance()
    }
  }

  if (!activeStage) return null

  return (
    <InsighterSetupCover
      stage={activeStage}
      locale={locale}
      profile={user}
      onPrimary={handlePrimary}
      onSkip={() => void handleSkip()}
      isSkipping={isSkipping}
    />
  )
}
