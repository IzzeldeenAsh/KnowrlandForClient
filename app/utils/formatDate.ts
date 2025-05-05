/**
 * Formats a date string based on the locale
 * @param dateString - ISO date string to format
 * @param locale - The locale code (e.g., 'en' or 'ar')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Return formatted date based on locale
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}
