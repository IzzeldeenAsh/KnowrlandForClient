import ArticleEditor from '@/components/feed/article/ArticleEditor'

export const metadata = {
  title: 'Write an article - Insighta Business',
  description: 'Create and publish a long-form article on Insighta.',
}

type WriteArticlePageProps = {
  params: Promise<{ locale: string }>
}

export default async function WriteArticlePage({ params }: WriteArticlePageProps) {
  const { locale } = await params

  return <ArticleEditor locale={locale} />
}
