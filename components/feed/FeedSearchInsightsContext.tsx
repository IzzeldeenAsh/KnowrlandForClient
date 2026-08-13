'use client'

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { CommunityFeedSearchInsight } from '@/services/feed.service'

type FeedSearchInsightsContextValue = {
  insights: CommunityFeedSearchInsight[]
  isLoading: boolean
  setInsights: Dispatch<SetStateAction<CommunityFeedSearchInsight[]>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

const FeedSearchInsightsContext = createContext<FeedSearchInsightsContextValue | null>(null)

export function FeedSearchInsightsProvider({ children }: { children: ReactNode }) {
  const [insights, setInsights] = useState<CommunityFeedSearchInsight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const value = useMemo(
    () => ({ insights, isLoading, setInsights, setIsLoading }),
    [insights, isLoading],
  )

  return (
    <FeedSearchInsightsContext.Provider value={value}>
      {children}
    </FeedSearchInsightsContext.Provider>
  )
}

export function useFeedSearchInsights(): FeedSearchInsightsContextValue {
  const context = useContext(FeedSearchInsightsContext)

  if (!context) {
    throw new Error('useFeedSearchInsights must be used within FeedSearchInsightsProvider.')
  }

  return context
}
