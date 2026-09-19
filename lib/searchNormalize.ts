// Text folding shared by type-ahead filters: tolerant of hamza/alif spelling ("الاردن" = "الأردن"),
// tashkeel, tatweel, Latin accents ("cote" = "Côte") and separators ("guinea bissau" = "Guinea-Bissau").
const ARABIC_DIACRITICS_AND_TATWEEL_RE = /[\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const LATIN_COMBINING_MARKS_RE = /[\u0300-\u036F]/g;
// Explicit class rather than \p{L}/\p{N}: the project compiles with target es5, which rejects the /u flag.
const SEPARATORS_RE = /[\s\u00A0\-\u2010-\u2015_'\u2018\u2019`"\u201C\u201D.,;:!?()\[\]{}\/\\&+\u060C\u061B\u061F]+/g;

export function normalizeSearchText(input: string): string {
  if (!input) return '';
  const folded = input.toLowerCase().normalize('NFKD')
    .replace(LATIN_COMBINING_MARKS_RE, '')
    .replace(ARABIC_DIACRITICS_AND_TATWEEL_RE, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/[ئىی]/g, 'ي')
    .replace(/ک/g, 'ك')
    .replace(/ة/g, 'ه')
    .replace(/ء/g, '')
    .replace(SEPARATORS_RE, ' ')
    .trim();
  // Final alif/ha are written interchangeably ("سوريه" vs "سوريا"), so drop one while something is left to match on.
  return folded.length > 2 ? folded.replace(/[اه]$/, '') : folded;
}

// Both arguments must already be normalized; separators are ignored so "unitedarab" still matches.
export function normalizedIncludes(haystack: string, needle: string): boolean {
  if (!needle) return true;
  return haystack.includes(needle) || haystack.replace(/ /g, '').includes(needle.replace(/ /g, ''));
}
