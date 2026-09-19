import { redirect } from 'next/navigation';
export default async function LegacyCallback({ params }: {params: Promise<{locale: string}>}) { const {locale} = await params; redirect(`/${locale}/callback`); }
