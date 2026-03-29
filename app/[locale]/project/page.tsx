import ProjectIntro from '@/components/project/ProjectIntro'

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale } = await params
  return <ProjectIntro locale={locale} />
}
