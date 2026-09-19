'use client';
import { useRef, useState } from 'react';
import { FieldError, useClearFieldError } from './AuthForm';
const digits = (value: string) => value.replace(/[٠-٩۰-۹]/g, digit => String(digit.charCodeAt(0) - (digit <= '٩' ? 1632 : 1776))).replace(/\D/g, '');
export default function CodeInput({ locale, initialCode = '' }: { locale: string; initialCode?: string }) {
  const clearError = useClearFieldError();
  const [values, setValues] = useState<string[]>(Array.from({ length: 6 }, (_, i) => /^\d{6}$/.test(initialCode) ? initialCode[i] : ''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  function fill(value: string, index: number) {
    clearError('code');
    const text = digits(value); const start = text.length >= 6 ? 0 : index;
    setValues(old => { const next = [...old]; if (!text) next[index] = ''; else text.slice(0, 6 - start).split('').forEach((digit, offset) => next[start + offset] = digit); return next; });
    if (text) refs.current[Math.min(start + text.length, 5)]?.focus();
  }
  return <div className="auth-field"><span id="code-label">{locale === 'ar' ? 'رمز التحقق' : 'Verification code'}</span>
    <div className="auth-code" dir="ltr" role="group" aria-labelledby="code-label">
      {values.map((value, index) => <input key={index} ref={node => { refs.current[index] = node; }} id={index ? `code-${index}` : 'code'} data-field="code" aria-label={locale === 'ar' ? `الرقم ${index + 1} من 6` : `Digit ${index + 1} of 6`} inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} value={value} onFocus={event => event.target.select()} onChange={event => fill(event.target.value, index)} onPaste={event => { event.preventDefault(); fill(event.clipboardData.getData('text'), index); }} onKeyDown={event => {
        if (event.key === 'Backspace' && !value && index > 0) { event.preventDefault(); setValues(old => old.map((digit, i) => i === index - 1 ? '' : digit)); refs.current[index - 1]?.focus(); }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); refs.current[Math.max(0, Math.min(5, index + (event.key === 'ArrowLeft' ? -1 : 1)))]?.focus(); }
      }}/>)}
    </div><input type="hidden" name="code" value={values.join('')}/><FieldError name="code"/>
  </div>;
}
