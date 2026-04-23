import 'server-only'
import type { Metadata } from 'next'
import { getApiUrl } from '@/app/config'
import type { IndustryChild, IndustryDetails } from '@/hooks/industries/types'
import { postJsonWithRetry } from '@/app/lib/server-api'

export type IndustryDetailsApiResponse = {
  data: IndustryDetails
}

type FetchIndustryDetailsOptions = {
  topTopic?: number
  topSubIndustry?: number
}

type IndustryListApiResponse = {
  data: IndustryDetails[]
}

async function fetchIndustryDetailsBySlug(
  id: string | number,
  slug: string,
  locale: string,
  topTopic: number
): Promise<IndustryDetailsApiResponse> {
  const apiUrl = getApiUrl(`/api/platform/industries/${id}/${slug}`)

  return postJsonWithRetry<IndustryDetailsApiResponse>(apiUrl, {
    locale,
    body: { top_topic: topTopic },
  })
}

async function fetchIndustryDetailsById(
  id: string | number,
  locale: string,
  topSubIndustry: number
): Promise<IndustryDetailsApiResponse> {
  const apiUrl = getApiUrl('/api/platform/industries')
  const response = await postJsonWithRetry<IndustryListApiResponse>(apiUrl, {
    locale,
    body: { top_sub_industry: topSubIndustry },
  })

  const numericId = typeof id === 'number' ? id : Number.parseInt(id, 10)
  const industry = response.data?.find((item) => item.id === numericId)

  if (!industry) {
    throw new Error(`Industry ${id} not found`)
  }

  return { data: industry }
}

export async function fetchIndustryDetails(
  id: string | number,
  slug: string,
  locale: string = 'en',
  options: FetchIndustryDetailsOptions = {}
): Promise<IndustryDetailsApiResponse> {
  const { topTopic = 2, topSubIndustry = 20 } = options

  try {
    return await fetchIndustryDetailsBySlug(id, slug, locale, topTopic)
  } catch (error) {
    console.warn('Industry slug fetch failed, falling back to ID lookup:', {
      id,
      slug,
      locale,
      error: error instanceof Error ? error.message : error,
    })

    return fetchIndustryDetailsById(id, locale, topSubIndustry)
  }
}

export function buildIndustryMetadata(industry: IndustryDetails): Metadata {
  const childrenNames = (industry.children ?? [])
    .map((child: IndustryChild) => child.name)
    .filter(Boolean)
    .join(', ')

  const description = childrenNames
    ? `Detailed analysis and insights about ${industry.name} industry, including ${childrenNames}`
    : `Detailed analysis and insights about ${industry.name} industry`

  return {
    title: `${industry.name} Industry Analysis | Insighta`,
    description,
    openGraph: {
      title: `${industry.name} Industry Analysis | Insighta`,
      description,
    },
  }
}

export async function getIndustryMetadata(
  id: string,
  slug: string,
  locale: string = 'en'
): Promise<Metadata> {
  try {
    const { data } = await fetchIndustryDetails(id, slug, locale)
    return buildIndustryMetadata(data)
  } catch {
    return {
      title: 'Industry Analysis | Insighta',
      description: 'Detailed industry analysis and insights',
    }
  }
}
