'use client';
import Link from 'next/link';
import { FieldError } from './AuthForm';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { authPageUrl } from '@/lib/authRedirect';

export function AuthShell({ locale, title, subtitle, children, compact = false }: { compact?: boolean; locale: string; title: string; subtitle?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const clean = new URLSearchParams(search.toString());
  clean.delete('token'); clean.delete('access_token');
  const languageUrl = pathname.replace(/^\/(ar|en)/, `/${otherLocale}`) + (clean.size ? `?${clean}` : '');
  return <main className={`auth-screen${compact ? ' auth-signup' : ''}`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
    <nav className="auth-nav" aria-label={locale === 'ar' ? 'التنقل' : 'Navigation'}>
      <Link href={`/${locale}`} prefetch={false}>← {locale === 'ar' ? 'رجوع' : 'Back'}</Link>
      <Link href={languageUrl} prefetch={false} hrefLang={otherLocale}>{locale === 'ar' ? 'English' : 'العربية'}</Link>
    </nav>
    <section className="auth-card" aria-labelledby="auth-heading">
      <header className="auth-heading"><Link href={`/${locale}`} prefetch={false}><img src="/images/auth/logo.svg" width="60" height="60" alt="Insighta" /></Link>
        <h1 id="auth-heading">{title}</h1>{subtitle && <p>{subtitle}</p>}
      </header>{children}
    </section>
  </main>;
}
export function PasswordInput({ label, locale, name = 'password', newPassword = false, hideLabel = false }: { hideLabel?: boolean; label: string; locale: string; name?: string; newPassword?: boolean }) {
  const [visible, setVisible] = useState(false);
  return <label className="auth-field" htmlFor={name}><span className={hideLabel ? 'auth-sr-only' : undefined}>{label}</span><span className="auth-password">
    <input placeholder={hideLabel ? label : undefined} id={name} name={name} type={visible ? 'text' : 'password'} required minLength={8} autoComplete={newPassword ? 'new-password' : 'current-password'} dir="ltr" />
    <button type="button" className="auth-reveal" aria-pressed={visible} aria-label={locale === 'ar' ? (visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور') : (visible ? 'Hide password' : 'Show password')} onClick={() => setVisible(!visible)}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{visible && <path d="m3 3 18 18"/>}</svg>
    </button></span><FieldError name={name}/></label>;
}
export function AuthNotice({ error, message }: { error?: string; message?: string }) {
  return <div aria-live="polite" aria-atomic="true">{error && <p className="auth-error" role="alert">{error}</p>}{message && <p className="auth-success" role="status">{message}</p>}</div>;
}
export function SubmitButton({ busy, children, locale }: { busy: boolean; children: React.ReactNode; locale: string }) {
  return <button className="auth-primary" type="submit" disabled={busy} aria-busy={busy}>{busy ? <><span className="auth-spinner"/>{locale === 'ar' ? 'يرجى الانتظار…' : 'Please wait…'}</> : children}</button>;
}
export function AuthFooter({ locale, signup = false, returnUrl }: { locale: string; signup?: boolean; returnUrl?: string | null }) {
  return <p className="auth-footer">{locale === 'ar' ? (signup ? 'لديك حساب بالفعل؟ ' : 'ليس لديك حساب؟ ') : (signup ? 'Already have an account? ' : 'Need an account? ')}
    <Link prefetch={false} href={authPageUrl(signup ? 'signin' : 'signup', locale, returnUrl)}>{locale === 'ar' ? (signup ? 'تسجيل الدخول' : 'إنشاء حساب') : (signup ? 'Sign in' : 'Sign up')}</Link></p>;
}
