import { cache } from 'react';

/**
 * Fetches messages for a given locale
 * This function is cached to prevent unnecessary re-fetches
 * @param locale The locale to get messages for (e.g. 'en', 'ar')
 * @returns The messages for the given locale
 */
export const getMessages = cache(async (locale: string) => {
  try {
    // Import messages based on locale
    const messages = (await import(`../messages/${locale}.json`)).default;
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    // Fallback to English if the requested locale can't be loaded
    try {
      const fallbackMessages = (await import('../messages/en.json')).default;
      return fallbackMessages;
    } catch (fallbackError) {
      console.error('Error loading fallback messages:', fallbackError);
      return {};
    }
  }
});
