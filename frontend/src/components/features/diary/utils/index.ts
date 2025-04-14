/**
 * Formats a date for preview display (HH:MM without AM/PM)
 * @param {string} date - The date to format
 * @returns {string} Formatted time string
 */
const getDateForPreview = (date: string): string => {
  return new Date(date)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('AM', '')
    .replace('PM', '');
};

export { getDateForPreview };
