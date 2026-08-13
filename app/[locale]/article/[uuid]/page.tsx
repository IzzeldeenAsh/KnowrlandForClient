import ArticleReader from '@/components/feed/article/ArticleReader'

export const metadata = {
  title: 'White Paper - Insighta Business',
  description: 'Read a White Paper published by an Insighta expert.',
}

type ArticlePageProps = {
  params: Promise<{ locale: string; uuid: string }>
  searchParams: Promise<{ source?: string }>
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
  const { locale, uuid } = await params
  const { source } = await searchParams

  return <ArticleReader locale={locale} identifier={uuid} isPublic={source !== 'my-feeds'} />
}
