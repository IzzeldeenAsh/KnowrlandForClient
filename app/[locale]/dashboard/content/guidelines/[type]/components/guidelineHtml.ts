const VARIABLE_TAG_STYLE =
  'display:inline-block;border-radius:4px;border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8;padding:0 5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:0.85em;line-height:1.6;';

/**
 * Renders {{variable}} placeholders in guideline HTML as blue tags showing just
 * the name. Tokens inside a tag's attributes (e.g. <img src="{{logo}}">) are left
 * untouched so the surrounding markup keeps working.
 */
export function highlightVariables(html: string): string {
  if (!html) return '';

  const tokenSpan = (name: string): string =>
    `<span style="${VARIABLE_TAG_STYLE}">${name}</span>`;

  return html
    .split(/(<[^>]*>)/g)
    .map((segment) =>
      segment.startsWith('<')
        ? segment
        : segment.replace(/{{\s*([A-Za-z0-9_]+)\s*}}/g, (_match, name: string) => tokenSpan(name)),
    )
    .join('');
}

export function normalizeVariables(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}
