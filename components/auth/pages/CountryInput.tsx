'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FieldError, useClearFieldError } from './AuthForm';
import { normalizeSearchText, normalizedIncludes } from '@/lib/searchNormalize';
export interface Country { id: number; name: string; flag?: string }
const GAP = 5, EDGE = 12, MAX = 240, MIN = 132;
export default function CountryInput({ countries, locale, hideLabel = false }: { hideLabel?: boolean; countries: Country[]; locale: string }) {
  const clearError = useClearFieldError();
  const ar = locale === 'ar'; const [selected, setSelected] = useState<Country>(); const [query, setQuery] = useState(''); const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const control = useRef<HTMLDivElement>(null); const [placement, setPlacement] = useState<{ up: boolean; max: number }>({ up: false, max: MAX });
  const index = useMemo(() => countries.map(country => ({ country, search: normalizeSearchText(country.name) })), [countries]);
  const needle = normalizeSearchText(query);
  const filtered = needle ? index.filter(entry => normalizedIncludes(entry.search, needle)).map(entry => entry.country) : countries;
  // The list opens downwards, but flips above the input when the viewport has no room left below it.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const box = control.current?.getBoundingClientRect(); if (!box) return;
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      const below = viewport - box.bottom - GAP - EDGE, above = box.top - GAP - EDGE;
      const up = below < Math.min(MAX, above) && above > below;
      setPlacement({ up, max: Math.max(MIN, Math.min(MAX, up ? above : below)) });
    };
    place();
    const viewport = window.visualViewport;
    window.addEventListener('scroll', place, true); window.addEventListener('resize', place);
    viewport?.addEventListener('resize', place); viewport?.addEventListener('scroll', place);
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place); viewport?.removeEventListener('resize', place); viewport?.removeEventListener('scroll', place); };
  }, [open]);
  useEffect(() => { if (!open) setPlacement(current => current.up ? { up: false, max: MAX } : current); }, [open]);
  function choose(country: Country) { clearError('country_id'); setSelected(country); setQuery(''); setOpen(false); }
  const flag = (country: Country) => country.flag ? <img src={`/images/flags/${country.flag}.svg`} width="24" height="18" alt="" loading="lazy"/> : null;
  return <div className="auth-field auth-country" data-drop={open && placement.up ? 'up' : 'down'} style={{ ['--auth-country-max' as string]: `${placement.max}px` }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setQuery(''); } }}>
    <label className={hideLabel ? 'auth-sr-only' : undefined} htmlFor="country_id">{ar ? 'الدولة' : 'Country'}</label>
    <div className="auth-country-control" ref={control}>{selected && !open && flag(selected)}<input id="country_id" data-field="country_id" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls="country-options" aria-activedescendant={open && filtered[active] ? `country-option-${filtered[active].id}` : undefined} autoComplete="off" disabled={!countries.length} value={open ? query : selected?.name || ''} placeholder={countries.length ? (ar ? 'ابحث عن الدولة' : 'Search countries') : (ar ? 'جارٍ تحميل الدول…' : 'Loading countries…')} onFocus={() => { setOpen(true); setActive(0); }} onClick={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setActive(0); setOpen(true); }} onKeyDown={event => {
      if (event.key === 'Escape') { setOpen(false); setQuery(''); }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); const next = Math.max(0, Math.min(filtered.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1))); setActive(next); document.getElementById(`country-option-${filtered[next]?.id}`)?.scrollIntoView({ block: 'nearest' }); }
      if (event.key === 'Enter' && open) { event.preventDefault(); if (filtered[active]) choose(filtered[active]); }
    }}/>
    {open && <ul id="country-options" role="listbox" aria-label={ar ? 'الدول' : 'Countries'}>{filtered.map((country, index) => <li key={country.id} id={`country-option-${country.id}`} role="option" aria-selected={selected?.id === country.id} className={active === index ? 'active' : ''} onMouseDown={event => event.preventDefault()} onClick={() => choose(country)}>{flag(country)}{country.name}</li>)}{!filtered.length && <li role="presentation">{ar ? 'لا توجد نتائج' : 'No countries found'}</li>}</ul>}</div>
    <input type="hidden" name="country_id" value={selected?.id || ''}/>
    <FieldError name="country_id"/>
  </div>;
}
