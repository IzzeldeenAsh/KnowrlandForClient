'use client';
import { useEffect, useRef, useState } from 'react';
import { authRequest, authErrorMessage } from '@/lib/auth-client';

// Render only a small allowlist of document markup; no scripts, event handlers,
// external resources, embedded frames, or styles from API-provided HTML.
function documentMarkup(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const allowed = new Set(['P','BR','STRONG','B','EM','I','U','UL','OL','LI','H1','H2','H3','H4','H5','H6','BLOCKQUOTE','TABLE','THEAD','TBODY','TR','TD','TH','HR','DIV','SPAN']);
  function clean(parent: Element) {
    for (const el of Array.from(parent.children)) {
      if (['SCRIPT','STYLE','IFRAME','OBJECT','SVG','MATH','FORM','INPUT','BUTTON','LINK','META','IMG'].includes(el.tagName)) { el.remove(); continue; }
      clean(el);
      if (!allowed.has(el.tagName)) el.replaceWith(...Array.from(el.childNodes));
      else for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name);
    }
  }
  clean(doc.body); return doc.body.innerHTML;
}
export default function Agreement({ locale, type = 'client_agreement', professional = false, onAccept, onCancel }: {
  locale: string; type?: string; professional?: boolean; onAccept: () => void; onCancel: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null); const content = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<{ name: string; guideline: string; uuid: string } | null>(null);
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const [read, setRead] = useState(false); const [attempt, setAttempt] = useState(0);
  const ar = locale === 'ar';
  useEffect(() => { dialog.current?.showModal(); return () => dialog.current?.close(); }, []);
  useEffect(() => {
    const controller = new AbortController(); setError(''); setData(null); setRead(false);
    authRequest(`common/setting/guideline/type/${professional ? 'last' : 'current'}/${type}`, locale, undefined, { signal: controller.signal, authenticated: false })
      .then(res => setData({ ...res.data, guideline: documentMarkup(res.data.guideline || '') }))
      .catch(e => { if (!controller.signal.aborted) setError(authErrorMessage(e, locale)); });
    return () => controller.abort();
  }, [type, professional, locale, attempt]);
  useEffect(() => { const el = content.current; if (data && el) setRead(el.scrollHeight <= el.clientHeight + 24); }, [data]);
  async function accept() {
    if (!data || !read || busy) return;
    setBusy(true); setError('');
    try {
      if (professional) {
        if (!data.uuid) throw new Error('Missing agreement');
        await authRequest(`account/agreement/accept/${encodeURIComponent(data.uuid)}`, locale, undefined, { method: 'PUT' });
      }
      onAccept();
    } catch (e) { setError(authErrorMessage(e, locale)); setBusy(false); }
  }
  return <dialog className="auth-dialog auth-screen-dialog" ref={dialog} aria-labelledby="agreement-title" dir={ar ? 'rtl' : 'ltr'} onCancel={e => { e.preventDefault(); if (!busy) onCancel(); }}>
    <h2 id="agreement-title">{data?.name || (ar ? 'اتفاقية الاستخدام' : 'Terms of service')}</h2>
    {error && <p className="auth-error" role="alert">{error} {!data && <button className="auth-link" onClick={() => setAttempt(x => x + 1)}>{ar ? 'إعادة المحاولة' : 'Retry'}</button>}</p>}
    {!data && !error && <p role="status">{ar ? 'جارٍ التحميل…' : 'Loading…'}</p>}
    <div ref={content} className="auth-agreement-content" tabIndex={0} onScroll={e => { const el = e.currentTarget; if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setRead(true); }} dangerouslySetInnerHTML={{ __html: data?.guideline || '' }}/>
    {data && !read && <p className="auth-hint">{ar ? 'يرجى قراءة الاتفاقية حتى النهاية للمتابعة.' : 'Please read to the end to continue.'}</p>}
    <div className="auth-dialog-actions"><button className="auth-link" disabled={busy} onClick={onCancel}>{professional ? (ar ? 'التجاوز حالياً' : 'Skip for now') : (ar ? 'إلغاء' : 'Cancel')}</button>
      <button className="auth-primary" disabled={!data || !read || busy} onClick={() => void accept()}>{ar ? 'أوافق' : 'I agree'}</button></div>
  </dialog>;
}
