'use client';
import CodeInput from './CodeInput';
import AuthForm, { FieldError, hasFieldErrors } from './AuthForm';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { apiBaseUrl } from '@/app/config';
import { verificationUrl } from '@/lib/auth-policy';
import { getAuthToken } from '@/lib/authToken';
import { authRequest, authErrorMessage } from '@/lib/auth-client';
import { authPageUrl, getSafeReturnUrl } from '@/lib/authRedirect';
import { AuthShell, AuthNotice, SubmitButton } from './AuthShell';
export default function VerifyEmail({ locale }: { locale: string }) {
  const ar = locale === 'ar'; const router = useRouter(); const search = useSearchParams();
  const returnUrl = getSafeReturnUrl(search.get('returnUrl')); const email = search.get('email') || '';
  const signedUrl = search.get('url');
  const cooldownKey = `email-verification-sent:${email.toLowerCase()}`;
  const [serverError, setServerError] = useState<unknown>();
  const [busy, setBusy] = useState(false); const [sending, setSending] = useState(false); const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState(''); const [message, setMessage] = useState(''); const initialized = useRef(false);
  function finish() { router.replace(getAuthToken() ? `/${locale}/callback${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ''}` : authPageUrl('signin', locale, returnUrl)); }
  async function resend() {
    if (sending || cooldown > 0) return;
    setSending(true); setError('');
    try { await authRequest('account/email/resend', locale, {}); setCooldown(60); try { sessionStorage.setItem(cooldownKey, String(Date.now())); } catch {} setMessage(ar ? 'تم إرسال رمز التحقق.' : 'A verification code has been sent.'); }
    catch (e) { setServerError(e); setError(hasFieldErrors(e) ? '' : authErrorMessage(e, locale)); } finally { setSending(false); }
  }
  useEffect(() => { if (!cooldown) return; const id = setTimeout(() => setCooldown(v => v - 1), 1000); return () => clearTimeout(id); }, [cooldown]);
  useEffect(() => {
    if (initialized.current) return; initialized.current = true;
    if (signedUrl) {
      const url = verificationUrl(signedUrl, apiBaseUrl);
      if (!url) { setError(ar ? 'رابط التحقق غير صالح.' : 'Invalid verification link.'); return; }
      setBusy(true);
      const token = getAuthToken();
      fetch(url, { headers: { Accept: 'application/json', 'Accept-Language': locale, ...(token ? { Authorization: `Bearer ${token}` } : {}) }, cache: 'no-store', signal: AbortSignal.timeout(20000) })
        .then(async r => { if (!r.ok) throw new Error('Verification failed'); finish(); })
        .catch(() => { setError(ar ? 'الرابط غير صالح أو انتهت صلاحيته. اطلب رمزاً جديداً.' : 'The link is invalid or expired. Request a new code.'); setBusy(false); });
    } else if (!getAuthToken()) router.replace(authPageUrl('signin', locale, returnUrl));
    else {
      let previous = 0;
      try { previous = Number(sessionStorage.getItem(cooldownKey)) || 0; } catch {}
      const remaining = Math.max(0, Math.ceil((60000 - (Date.now() - previous)) / 1000));
      if (remaining) setCooldown(remaining);
      else if (search.get('sent')) { setCooldown(60); try { sessionStorage.setItem(cooldownKey, String(Date.now())); } catch {} }
      else if (search.get('resend')) void resend();
    }
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return;
    const code = String(new FormData(e.currentTarget).get('code')); setBusy(true); setError('');
    try { await authRequest('account/email/verify', locale, { code: Number(code) }); finish(); }
    catch (e) { setServerError(e); setError(hasFieldErrors(e) ? '' : authErrorMessage(e, locale)); setBusy(false); }
  }
  return <AuthShell locale={locale} title={ar ? 'تحقق من بريدك الإلكتروني' : 'Verify your email'} subtitle={email ? (ar ? `أدخل الرمز المرسل إلى ${email}` : `Enter the code sent to ${email}`) : (ar ? 'أدخل رمز التحقق لإكمال تسجيل الدخول.' : 'Enter your verification code to continue.')}>
    <AuthNotice error={error} message={message}/><AuthForm locale={locale} serverError={serverError} onSubmit={submit}><fieldset disabled={busy}>
      <CodeInput locale={locale}/>
      <SubmitButton locale={locale} busy={busy}>{ar ? 'تأكيد البريد' : 'Verify email'}</SubmitButton>
      <button type="button" className="auth-link" disabled={sending || cooldown > 0} onClick={() => void resend()}>{cooldown ? `${ar ? 'إعادة الإرسال بعد' : 'Resend in'} ${cooldown}s` : (ar ? 'إعادة إرسال الرمز' : 'Resend code')}</button>
    </fieldset></AuthForm><p className="auth-footer"><Link prefetch={false} href={`/${locale}/signout?returnUrl=${encodeURIComponent(`/${locale}`)}`}>{ar ? 'استخدام حساب آخر' : 'Use a different account'}</Link></p>
  </AuthShell>;
}
