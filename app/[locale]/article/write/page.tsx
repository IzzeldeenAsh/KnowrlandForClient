import ArticleEditor from '@/components/feed/article/ArticleEditor'

export const metadata = {
  title: 'Write a White Paper - Insighta Business',
  description: 'Create and publish a long-form White Paper on Insighta.',
}

type WriteArticlePageProps = {
  params: Promise<{ locale: string }>
}

export default async function WriteArticlePage({ params }: WriteArticlePageProps) {
  const { locale } = await params

  return <ArticleEditor locale={locale} />
}
