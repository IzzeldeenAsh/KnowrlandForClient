/**
 * Checks if the first word in a text string is Arabic
 * Arabic characters are in the Unicode range U+0600 to U+06FF
 * @param text - The text string to check
 * @returns true if the first word contains Arabic characters, false otherwise
 */
export function isFirstWordArabic(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Trim whitespace and get the first word
  const trimmedText = text.trim();
  if (!trimmedText) {
    return false;
  }

  // Extract the first word (split by whitespace and take the first non-empty part)
  const firstWord = trimmedText.split(/\s+/)[0];
  if (!firstWord) {
    return false;
  }

  // Remove punctuation and special characters from the beginning/end of the word
  const cleanedWord = firstWord.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '');
  if (!cleanedWord) {
    return false;
  }

  // Check if the word contains Arabic characters (Unicode range U+0600 to U+06FF)
  // This includes Arabic letters, numbers, and diacritics
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(cleanedWord);
}


