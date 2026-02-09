import 'server-only'
import type { Metadata } from 'next'
import { getApiUrl } from '@/app/config'
import type { IndustryChild, IndustryDetails } from '@/hooks/industries/types'

export type IndustryDetailsApiResponse = {
  data: IndustryDetails
}

type FetchIndustryDetailsOptions = {
  topTopic?: number
  revalidateSeconds?: number
}

export async function fetchIndustryDetails(
  id: string | number,
  slug: string,
  locale: string = 'en',
  options: FetchIndustryDetailsOptions = {}
): Promise<IndustryDetailsApiResponse> {
  const { topTopic = 2, revalidateSeconds = 3600 } = options

  const apiUrl = getApiUrl(`/api/platform/industries/${id}/${slug}`)

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    body: JSON.stringify({ top_topic: topTopic })
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch industry details: ${response.status}`)
  }


  return response.json()
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

