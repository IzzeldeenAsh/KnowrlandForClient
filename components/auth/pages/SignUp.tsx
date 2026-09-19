'use client';
import AuthForm, { FieldError, hasFieldErrors } from './AuthForm';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { authRequest, authErrorMessage, storeSession, writeAuthCookie } from '@/lib/auth-client';
import { authPageUrl, getSafeReturnUrl } from '@/lib/authRedirect';
import { AuthShell, PasswordInput, SubmitButton, AuthNotice, AuthFooter } from './AuthShell';
import CountryInput, { Country } from './CountryInput';
import SocialButtons from './SocialButtons';
const Agreement = dynamic(() => import('./Agreement'), { ssr: false });
export default function SignUp({ locale }: { locale: string }) {
  const ar = locale === 'ar'; const router = useRouter(); const search = useSearchParams();
  const returnUrl = getSafeReturnUrl(search.get('returnUrl') || search.get('redirect_uri'));
  const [serverError, setServerError] = useState<unknown>();
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [countries, setCountries] = useState<Country[]>([]); const [countriesError, setCountriesError] = useState(false); const [retry, setRetry] = useState(0);
  const [accepted, setAccepted] = useState(false); const [agreement, setAgreement] = useState(false);
  const resolveAgreement = useRef<((value: boolean) => void) | null>(null);
  useEffect(() => {
    const controller = new AbortController(); setCountriesError(false);
    authRequest('common/setting/country/list', locale, undefined, { signal: controller.signal, authenticated: false })
      .then(res => { const list = res.data || res; if (!Array.isArray(list)) throw new Error('Invalid countries'); setCountries(list); })
      .catch(() => { if (!controller.signal.aborted) setCountriesError(true); });
    return () => controller.abort();
  }, [locale, retry]);
  useEffect(() => () => resolveAgreement.current?.(false), []);
  function completeAgreement(value: boolean) { setAgreement(false); setAccepted(value); resolveAgreement.current?.(value); resolveAgreement.current = null; }
  function beforeSocial() { if (accepted) return Promise.resolve(true); setAgreement(true); return new Promise<boolean>(resolve => { resolveAgreement.current = resolve; }); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    if (!countries.length) { setError(ar ? 'يرجى تحميل قائمة الدول أولاً.' : 'Please load the country list first.'); return; }
    if (!accepted) { setAgreement(true); return; }
    const form = new FormData(event.currentTarget); const password = String(form.get('password'));
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z\d]/.test(password)) { setError(ar ? 'استخدم 8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'Use at least 8 characters including a letter, number and symbol.'); return; }
    setBusy(true); setError('');
    try {
      const { data } = await authRequest('auth/register', locale, { first_name: String(form.get('first_name')).trim(), last_name: String(form.get('last_name')).trim(), email: String(form.get('email')).trim(), password, password_confirmation: password, country_id: Number(form.get('country_id')), client_agreement: true }, { authenticated: false });
      storeSession(data.token); writeAuthCookie('preferred_language', locale, 365 * 86400);
      router.replace(authPageUrl('verify-email', locale, returnUrl) + `${returnUrl ? '&' : '?'}email=${encodeURIComponent(data.email || String(form.get('email')))}&sent=1`);
    } catch (e) { setServerError(e); setError(hasFieldErrors(e) ? '' : authErrorMessage(e, locale)); setBusy(false); }
  }
  return <AuthShell locale={locale} title={ar ? 'إنشاء حساب في إنسايتا' : 'Create your Insighta account'} subtitle={ar ? 'ابدأ رحلتك مع المعرفة والخبراء' : 'Start your journey with insights and experts'}>
    <SocialButtons locale={locale} returnUrl={returnUrl} beforeStart={beforeSocial}/><AuthNotice error={error}/>
    <AuthForm locale={locale} serverError={serverError} onSubmit={submit}><fieldset disabled={busy}>
      <div className="auth-row"><label className="auth-field" htmlFor="first_name">{ar ? 'الاسم الأول' : 'First name'}<input id="first_name" name="first_name" required minLength={2} maxLength={50} autoComplete="given-name"/><FieldError name="first_name"/></label><label className="auth-field" htmlFor="last_name">{ar ? 'اسم العائلة' : 'Last name'}<input id="last_name" name="last_name" required minLength={2} maxLength={50} autoComplete="family-name"/><FieldError name="last_name"/></label></div>
      <label className="auth-field" htmlFor="email">{ar ? 'البريد الإلكتروني' : 'Email'}<input id="email" name="email" type="email" required maxLength={191} autoComplete="email" dir="ltr"/><FieldError name="email"/></label>
      <PasswordInput locale={locale} label={ar ? 'كلمة المرور' : 'Password'} newPassword/>
      <p className="auth-hint">{ar ? '8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'At least 8 characters including a letter, number and symbol.'}</p>
      <CountryInput countries={countries} locale={locale}/>
      {countriesError && <p className="auth-error" role="alert">{ar ? 'تعذر تحميل الدول. ' : 'Unable to load countries. '}<button type="button" className="auth-link" onClick={() => setRetry(x => x + 1)}>{ar ? 'إعادة المحاولة' : 'Retry'}</button></p>}
      <div className="auth-check"><input id="terms" type="checkbox" checked={accepted} onChange={e => e.target.checked ? setAgreement(true) : setAccepted(false)}/><label htmlFor="terms">{ar ? 'أوافق على ' : 'I agree to the '}<button type="button" className="auth-link" onClick={() => setAgreement(true)}>{ar ? 'اتفاقية الاستخدام' : 'terms of service'}</button></label></div>
      <SubmitButton locale={locale} busy={busy}>{ar ? 'إنشاء حساب' : 'Create account'}</SubmitButton>
    </fieldset></AuthForm><AuthFooter locale={locale} signup returnUrl={returnUrl}/>
    {agreement && <Agreement locale={locale} onAccept={() => completeAgreement(true)} onCancel={() => completeAgreement(false)}/>}
  </AuthShell>;
}
