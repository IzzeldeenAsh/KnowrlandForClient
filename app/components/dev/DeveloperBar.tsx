'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { SourceEntry } from './source-manifest';
import styles from './developer-bar.module.css';

type Fiber = { type?: { displayName?: string; name?: string; render?: { name?: string } }; _debugSource?: { fileName?: string }; _debugStack?: Error; return?: Fiber };

function routeScore(route: string, pathname: string): number {
  const pattern = route.split('/').filter(Boolean);
  const actual = pathname.split('/').filter(Boolean);
  let index = 0;
  let score = 0;
  for (const segment of pattern) {
    if (segment.startsWith('[[...')) return score;
    if (segment.startsWith('[...')) return index < actual.length ? score : -1;
    if (index >= actual.length) return -1;
    if (segment.startsWith('[')) score += 1;
    else if (segment === actual[index]) score += 10;
    else return -1;
    index++;
  }
  return index === actual.length ? score : -1;
}

export default function DeveloperBar({ entries }: { entries: SourceEntry[] }) {
  const pathname = usePathname();
  const [inspecting, setInspecting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState<SourceEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const page = entries.filter(entry => entry.route !== undefined && routeScore(entry.route, pathname) >= 0)
    .sort((a, b) => routeScore(b.route!, pathname) - routeScore(a.route!, pathname))[0];
  useEffect(() => { setSelected(null); setCopied(false); }, [pathname]);
  useEffect(() => {
    if (!inspecting) return;
    const inspect = (event: Event) => {
      let element = event.target instanceof Element ? event.target : null;
      if (element?.closest('[data-developer-bar]')) return;
      while (element) {
        const key = Object.keys(element).find(key => key.startsWith('__reactFiber$'));
        let fiber = key ? (element as unknown as Record<string, Fiber>)[key] : undefined;
        while (fiber) {
          const name = fiber.type?.displayName || fiber.type?.name || fiber.type?.render?.name;
          // Prefer source metadata when React provides it; otherwise show ambiguous matches explicitly.
          const matches = name ? entries.filter(entry => entry.name === name) : [];
          if (matches.length) {
            const source = fiber._debugSource?.fileName || fiber._debugStack?.stack || '';
            const exact = matches.filter(entry => source.includes(entry.files[0]));
            setSelected(exact.length === 1 ? exact[0] : matches.length === 1 ? matches[0] : {
              name: `${name} (${matches.length} matching sources)`,
              files: matches.flatMap(entry => entry.files),
            });
            return;
          }
          fiber = fiber.return;
        }
        element = element.parentElement;
      }
      setSelected(null);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setInspecting(false); setSelected(null); } };
    document.addEventListener('pointerover', inspect, { passive: true });
    document.addEventListener('focusin', inspect);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerover', inspect);
      document.removeEventListener('focusin', inspect);
      document.removeEventListener('keydown', escape);
    };
  }, [inspecting, entries]);
  const current = inspecting && selected ? selected : page;
  const files = current?.files || [];
  return <aside data-developer-bar data-collapsed={collapsed} className={styles.bar} aria-label="Developer component bar" dir="ltr">
    <button className={styles.badge} onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed} title="Toggle developer bar">DEV · Next.js</button>
    {!collapsed && <>
      <span className={styles.name}>{current?.name || 'Page'}</span>
      <span className={styles.files} title={files.join('\n')}>{files.length ? files.join('  ·  ') : `No page source found for ${pathname}`}</span>
      <button aria-pressed={inspecting} onClick={() => { setInspecting(!inspecting); setSelected(null); }}>{inspecting ? 'Inspecting · Esc' : 'Inspect'}</button>
      <button disabled={!files.length} onClick={async () => {
        try { await navigator.clipboard.writeText(files.join('\n')); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
        catch { setCopied(false); }
      }}>{copied ? 'Copied' : 'Copy paths'}</button>
    </>}
  </aside>;
}
