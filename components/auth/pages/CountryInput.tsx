'use client';
import { useState } from 'react';
import { FieldError, useClearFieldError } from './AuthForm';
export interface Country { id: number; name: string; flag?: string }
export default function CountryInput({ countries, locale }: { countries: Country[]; locale: string }) {
  const clearError = useClearFieldError();
  const ar = locale === 'ar'; const [selected, setSelected] = useState<Country>(); const [query, setQuery] = useState(''); const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
  const filtered = countries.filter(country => country.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  function choose(country: Country) { clearError('country_id'); setSelected(country); setQuery(''); setOpen(false); }
  const flag = (country: Country) => country.flag ? <img src={`/images/flags/${country.flag}.svg`} width="24" height="18" alt="" loading="lazy"/> : null;
  return <div className="auth-field auth-country" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setQuery(''); } }}>
    <label htmlFor="country_id">{ar ? 'الدولة' : 'Country'}</label>
    <div className="auth-country-control">{selected && !open && flag(selected)}<input id="country_id" data-field="country_id" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls="country-options" aria-activedescendant={open && filtered[active] ? `country-option-${filtered[active].id}` : undefined} autoComplete="off" disabled={!countries.length} value={open ? query : selected?.name || ''} placeholder={countries.length ? (ar ? 'ابحث عن الدولة' : 'Search countries') : (ar ? 'جارٍ تحميل الدول…' : 'Loading countries…')} onFocus={() => { setOpen(true); setActive(0); }} onClick={() => setOpen(true)} onChange={event => { setQuery(event.target.value); setActive(0); setOpen(true); }} onKeyDown={event => {
      if (event.key === 'Escape') { setOpen(false); setQuery(''); }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); const next = Math.max(0, Math.min(filtered.length - 1, active + (event.key === 'ArrowDown' ? 1 : -1))); setActive(next); document.getElementById(`country-option-${filtered[next]?.id}`)?.scrollIntoView({ block: 'nearest' }); }
      if (event.key === 'Enter' && open) { event.preventDefault(); if (filtered[active]) choose(filtered[active]); }
    }}/></div>
    <input type="hidden" name="country_id" value={selected?.id || ''}/>
    {open && <ul id="country-options" role="listbox" aria-label={ar ? 'الدول' : 'Countries'}>{filtered.map((country, index) => <li key={country.id} id={`country-option-${country.id}`} role="option" aria-selected={selected?.id === country.id} className={active === index ? 'active' : ''} onMouseDown={event => event.preventDefault()} onClick={() => choose(country)}>{flag(country)}{country.name}</li>)}{!filtered.length && <li role="presentation">{ar ? 'لا توجد نتائج' : 'No countries found'}</li>}</ul>}
    <FieldError name="country_id"/>
  </div>;
}
