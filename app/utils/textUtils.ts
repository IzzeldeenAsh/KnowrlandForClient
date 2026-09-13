// Strong right-to-left Arabic letters. Arabic punctuation, numbers, emoji,
// hashtags and formatting marks are deliberately excluded because they do not
// establish the reading direction of a sentence.
const arabicStrongCharacter = /[\u0620-\u063F\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06EE-\u06EF\u06FA-\u06FC\u06FF]/;
const latinStrongCharacter = /[A-Za-z]/;

/**
 * Detects whether text should start right-to-left by finding its first strong
 * directional character. This correctly handles Arabic copy that begins with
 * an emoji, hashtag, number, punctuation, Markdown marker, or HTML tag.
 *
 * @param text - The text to inspect
 * @returns true when the first strong character is Arabic, false otherwise
 */
export function isFirstWordArabic(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Content can arrive as rich text. Remove markup/entities before looking for
  // direction so `<strong>🌟 مرحباً</strong>` behaves like its visible text.
  const visibleText = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, ' ');

  for (let index = 0; index < visibleText.length; index += 1) {
    const character = visibleText.charAt(index);

    if (arabicStrongCharacter.test(character)) return true;
    if (latinStrongCharacter.test(character)) return false;
  }

  return false;
}



