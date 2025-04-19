/**
 * Formats a date for preview display (HH:MM without AM/PM)
 * @param date - The date to format
 * @returns Formatted time string
 */
const formatDateForNotePreview = (date: string): string => {
  return new Date(date)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('AM', '')
    .replace('PM', '');
};

export { formatDateForNotePreview };
