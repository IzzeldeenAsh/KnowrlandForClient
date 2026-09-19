'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// This boundary is part of every route, including auth. Keep it independent
// of the application's UI providers and CSS bundles.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const ar = usePathname()?.startsWith('/ar');
  return <main dir={ar ? 'rtl' : 'ltr'} style={{ minHeight:'100svh', display:'grid', placeItems:'center', padding:24, background:'#f8fafc', color:'#181c32', fontFamily:'var(--font-almarai), sans-serif' }}>
    <section style={{ maxWidth:480, textAlign:'center' }}>
      <h1>{ar ? 'تعذر عرض الصفحة' : 'Something went wrong'}</h1>
      <p style={{ lineHeight:1.8 }}>{ar ? 'يرجى إعادة المحاولة أو العودة إلى الصفحة الرئيسية.' : 'Please try again or return to the home page.'}</p>
      <button onClick={reset} style={{ border:0, borderRadius:6, padding:'12px 24px', background:'#0787cc', color:'#fff', font:'inherit', cursor:'pointer' }}>{ar ? 'إعادة المحاولة' : 'Try again'}</button>
      <p><Link href={ar ? '/ar' : '/en'} style={{ color:'#0787cc' }}>{ar ? 'الصفحة الرئيسية' : 'Return home'}</Link></p>
    </section>
  </main>;
}
