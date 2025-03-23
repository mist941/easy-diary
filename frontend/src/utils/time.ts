/**
 * Returns the current time as minutes since midnight
 * @returns {number} Minutes since midnight
 */
export function getCurrentTimeInMinutes(): number {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return hours * 60 + minutes;
}

/**
 * Formats a Date object into YYYY-MM-DD string for API requests
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (YYYY-MM-DD)
 */
export function getDateForRequest(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Converts a time string (HH:MM) to ISO format
 * @param {string | null} time - Time string in HH:MM format
 * @returns {string | null} ISO formatted time string or null if input is null
 */
export const getTimeInISOString = (time: string | null): string | null => {
  if (!time) return null;

  // Validate time format
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    throw new Error('Invalid time format. Expected HH:MM');
  }

  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString();
};

/**
 * Converts an ISO date string to local format (YYYY-MM-DD HH:MM:SS.MICROSECONDS)
 * @param {string | null} isoString - ISO date string
 * @returns {string | null} Formatted local date string or null if input is null
 */
export const convertDateToLocal = (isoString: string | null): string | null => {
  if (!isoString) return null;

  try {
    const date = new Date(isoString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    const microseconds = milliseconds + '000';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
  } catch (error) {
    console.error('Error converting date to local format:', error);
    return null;
  }
};

/**
 * Formats a date for preview display (HH:MM without AM/PM)
 * @param {string} date - The date to format
 * @returns {string} Formatted time string
 */
export const getDateForPreview = (date: string): string => {
  return new Date(date)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('AM', '')
    .replace('PM', '');
};

/**
 * Formats a date to display as a human-readable string (Today, Yesterday, or date)
 * @param {Date} date - The date to format
 * @returns {string} Human-readable date string
 */
export const getHumanReadableDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    return 'Today';
  } else if (isSameDay(date, yesterday)) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: today.getFullYear() !== date.getFullYear() ? 'numeric' : undefined,
    });
  }
};

/**
 * Checks if two dates are on the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if dates are on the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
