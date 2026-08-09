import ArticleReader from '@/components/feed/article/ArticleReader'

export const metadata = {
  title: 'Article - Insighta Business',
  description: 'Read an article published by an Insighta expert.',
}

type ArticlePageProps = {
  params: Promise<{ locale: string; uuid: string }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, uuid } = await params

  return <ArticleReader locale={locale} uuid={uuid} />
}
