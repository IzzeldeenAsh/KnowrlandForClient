'use client';
import CodeInput from './CodeInput';
import AuthForm, { FieldError, hasFieldErrors } from './AuthForm';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authRequest, authErrorMessage } from '@/lib/auth-client';
import { authPageUrl } from '@/lib/authRedirect';
import { AuthShell, PasswordInput, SubmitButton, AuthNotice } from './AuthShell';
export default function ResetPassword({ locale }: { locale: string }) {
  const ar = locale === 'ar'; const search = useSearchParams();
  const [serverError, setServerError] = useState<unknown>();
  const [step, setStep] = useState(1); const [email, setEmail] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const form = new FormData(event.currentTarget); setError('');
    if (step === 2 && form.get('password') !== form.get('password_confirmation')) { setError(ar ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.'); return; }
    setBusy(true);
    try {
      if (step === 1) { await authRequest('auth/password/forget', locale, { email: email.trim() }, { authenticated: false }); setStep(2); }
      else { await authRequest('auth/password/reset', locale, { code: form.get('code'), password: form.get('password'), password_confirmation: form.get('password_confirmation') }, { authenticated: false }); setStep(3); }
    } catch (e) { setServerError(e); setError(hasFieldErrors(e) ? '' : authErrorMessage(e, locale)); } finally { setBusy(false); }
  }
  return <AuthShell locale={locale} title={ar ? 'إعادة تعيين كلمة المرور' : 'Reset your password'} subtitle={step === 2 ? (ar ? `أدخل الرمز المرسل إلى ${email}` : `Enter the code sent to ${email}`) : undefined}>
    <AuthNotice error={error} message={step === 3 ? (ar ? 'تم تغيير كلمة المرور. يمكنك تسجيل الدخول الآن.' : 'Your password has been updated. You can sign in now.') : undefined}/>
    {step !== 3 && <AuthForm locale={locale} serverError={serverError} onSubmit={submit}><fieldset disabled={busy}>
      {step === 1 ? <label className="auth-field" htmlFor="email">{ar ? 'البريد الإلكتروني' : 'Email'}<input id="email" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" dir="ltr"/></label> : <>
        <CodeInput locale={locale}/>
        <PasswordInput locale={locale} label={ar ? 'كلمة المرور الجديدة' : 'New password'} newPassword/>
        <PasswordInput locale={locale} label={ar ? 'تأكيد كلمة المرور' : 'Confirm password'} name="password_confirmation" newPassword/>
      </>}
      <SubmitButton locale={locale} busy={busy}>{step === 1 ? (ar ? 'إرسال الرمز' : 'Send code') : (ar ? 'حفظ كلمة المرور' : 'Save password')}</SubmitButton>
      {step === 2 && <button type="button" className="auth-link" onClick={() => { setStep(1); setError(''); }}>{ar ? 'تغيير البريد أو إعادة إرسال الرمز' : 'Change email or request another code'}</button>}
    </fieldset></AuthForm>}
    <p className="auth-footer"><Link href={authPageUrl('signin', locale, search.get('returnUrl'))}>{ar ? 'العودة لتسجيل الدخول' : 'Back to sign in'}</Link></p>
  </AuthShell>;
}
