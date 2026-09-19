'use client';
import { createContext, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { AuthError } from '@/lib/auth-client';
const ClearError = createContext<(name: string) => void>(() => {});
export const useClearFieldError = () => useContext(ClearError);
const Errors = createContext<Record<string, string>>({});
export function FieldError({ name }: { name: string }) {
  const errors = useContext(Errors);
  return errors[name] ? <span id={`${name}-error`} className="auth-field-error" role="alert">{errors[name]}</span> : null;
}
export function hasFieldErrors(error: unknown) { return error instanceof AuthError && Object.keys(error.fields).length > 0; }
export default function AuthForm({ locale, children, onSubmit, serverError }: { locale: string; children: React.ReactNode; onSubmit: (event: FormEvent<HTMLFormElement>) => void; serverError?: unknown }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef<HTMLFormElement>(null); const ar = locale === 'ar';
  function validate(form: HTMLFormElement) {
    const result: Record<string, string> = {};
    for (const element of Array.from(form.elements)) {
      if (!(element instanceof HTMLInputElement) || !element.name || element.disabled) continue;
      const value = element.type === 'password' || element.name.startsWith('password') ? element.value : element.value.trim();
      if (element.required && !value) result[element.name] = ar ? 'هذا الحقل مطلوب.' : 'This field is required.';
      else if (element.type === 'email' && value && element.validity.typeMismatch) result[element.name] = ar ? 'أدخل بريداً إلكترونياً صالحاً.' : 'Enter a valid email address.';
      else if (value && element.minLength > 0 && value.length < element.minLength) result[element.name] = ar ? `أدخل ${element.minLength} أحرف على الأقل.` : `Enter at least ${element.minLength} characters.`;
      if (element.name === 'country_id' && !value) result.country_id = ar ? 'اختر الدولة.' : 'Select your country.';
      if (element.name === 'code' && !/^\d{6}$/.test(value)) result.code = ar ? 'أدخل رمز التحقق المكوّن من 6 أرقام.' : 'Enter the 6-digit verification code.';
      if (element.name === 'password' && element.autocomplete === 'new-password' && value && (!/[A-Za-z]/.test(value) || !/\d/.test(value) || !/[^A-Za-z\d]/.test(value))) result.password = ar ? 'استخدم 8 أحرف على الأقل تتضمن حرفاً ورقماً ورمزاً.' : 'Use at least 8 characters including a letter, number and symbol.';
      if (element.name === 'password_confirmation' && value !== new FormData(form).get('password')) result.password_confirmation = ar ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.';
    }
    return result;
  }
  useEffect(() => {
    if (serverError instanceof AuthError) setErrors(Object.fromEntries(Object.entries(serverError.fields).map(([key, messages]) => [key, messages[0]])));
  }, [serverError]);
  useEffect(() => {
    ref.current?.querySelectorAll<HTMLInputElement>('input[id]').forEach(input => {
      const name = input.dataset.field || input.name;
      input.setAttribute('aria-invalid', errors[name] ? 'true' : 'false');
      if (errors[name]) input.setAttribute('aria-describedby', `${name}-error`); else input.removeAttribute('aria-describedby');
    });
  }, [errors]);
  return <Errors.Provider value={errors}><ClearError.Provider value={name => setErrors(old => ({ ...old, [name]: '' }))}><form ref={ref} noValidate className="auth-form" onBlur={event => {
    const input = event.target; if (!(input instanceof HTMLInputElement)) return; const name = input.dataset.field || input.name;
    if (!name || !ref.current || input.type === 'hidden' || (name === 'code' && event.currentTarget.contains(event.relatedTarget as Node))) return;
    const next = validate(ref.current); setErrors(old => ({ ...old, [name]: next[name] || '' }));
  }} onChange={event => { if ((event.target as HTMLInputElement).dataset.field) return; if (ref.current) { const next = validate(ref.current); setErrors(old => Object.fromEntries(Object.keys(old).map(key => [key, next[key] || '']))); } }} onSubmit={event => {
    const next = validate(event.currentTarget); setErrors(next);
    if (Object.keys(next).length) { event.preventDefault(); const name = Object.keys(next)[0]; event.currentTarget.querySelector<HTMLInputElement>(`#${name}`)?.focus(); return; }
    onSubmit(event);
  }}>{children}</form></ClearError.Provider></Errors.Provider>;
}
