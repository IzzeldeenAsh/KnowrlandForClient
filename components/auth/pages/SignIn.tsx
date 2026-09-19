'use client';
import AuthForm, { FieldError, hasFieldErrors } from './AuthForm';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authRequest, storeSession, rememberLoginUser, authErrorMessage, writeAuthCookie } from '@/lib/auth-client';
import { authPageUrl, getSafeReturnUrl } from '@/lib/authRedirect';
import { AuthShell, PasswordInput, SubmitButton, AuthNotice, AuthFooter } from './AuthShell';
import SocialButtons from './SocialButtons';

export default function SignIn({ locale }: { locale: string }) {
  const ar = locale === 'ar'; const router = useRouter(); const search = useSearchParams();
  const returnUrl = getSafeReturnUrl(search.get('returnUrl') || search.get('redirect_uri'));
  const [serverError, setServerError] = useState<unknown>();
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const form = new FormData(event.currentTarget); setBusy(true); setError('');
    try {
      const { data } = await authRequest('auth/login', locale, { email: String(form.get('email')).trim(), password: form.get('password') }, { authenticated: false });
      storeSession(data.token); writeAuthCookie('preferred_language', locale, 365 * 86400);
      const { token: _token, ...user } = data;
      if (user.verified === false) {
        router.replace(authPageUrl('verify-email', locale, returnUrl) + `${returnUrl ? '&' : '?'}email=${encodeURIComponent(user.email)}&resend=1`);
      } else {
        rememberLoginUser(user);
        router.replace(`/${locale}/callback${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}`);
      }
    } catch (e) { setError(authErrorMessage(e, locale, true)); setBusy(false); }
  }
  return <AuthShell locale={locale} title={ar ? 'أهلاً بكم في إنسايتا' : 'Welcome To Insighta'} subtitle={ar ? 'منصتك للبيانات والتقارير والإحصائيات والخبراء المتخصصين' : 'Your platform for data, reports, statistics and specialized experts'}>
    <SocialButtons locale={locale} returnUrl={returnUrl}/><AuthNotice error={error}/>
    <AuthForm locale={locale} serverError={serverError} onSubmit={submit}><fieldset disabled={busy}>
      <label className="auth-field" htmlFor="email">{ar ? 'البريد الإلكتروني' : 'Email'}<input id="email" name="email" type="email" autoComplete="username" required maxLength={191} dir="ltr" /><FieldError name="email"/></label>
      <PasswordInput label={ar ? 'كلمة المرور' : 'Password'} locale={locale}/>
      <Link prefetch={false} href={authPageUrl('reset-password', locale, returnUrl)}>{ar ? 'نسيت كلمة المرور؟' : 'Forgot password?'}</Link>
      <SubmitButton busy={busy} locale={locale}>{ar ? 'متابعة' : 'Continue'}</SubmitButton>
    </fieldset></AuthForm><AuthFooter locale={locale} returnUrl={returnUrl}/>
  </AuthShell>;
}
