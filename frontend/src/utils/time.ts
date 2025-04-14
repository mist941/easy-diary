import moment from 'moment';

/**
 * Returns the current time as minutes since midnight
 * @returns {number} Minutes since midnight
 */
function getCurrentTimeInMinutes(): number {
  return moment().diff(moment().startOf('day'), 'minutes');
}

/**
 * Formats a Date object into YYYY-MM-DD string for API requests
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string (YYYY-MM-DD)
 */
function getDateForRequest(date: Date): string {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * Converts a time string (HH:MM) to ISO format
 * @param {string | null} time - Time string in HH:MM format
 * @returns {string | null} ISO formatted time string or null if input is null
 */
const getTimeInISOString = (
  time: string | null,
  date?: Date,
): string | null => {
  if (!time) return null;

  // Validate time format
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    throw new Error('Invalid time format. Expected HH:MM');
  }

  const [hours, minutes] = time.split(':').map(Number);
  const dateObj = date ? new Date(date) : new Date();
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  dateObj.setSeconds(0);
  dateObj.setMilliseconds(0);
  return dateObj.toISOString();
};

/**
 * Converts an ISO date string to local format (YYYY-MM-DD HH:MM:SS.MICROSECONDS)
 * @param {string | null} isoString - ISO date string
 * @returns {string | null} Formatted local date string or null if input is null
 */
const convertDateToLocal = (isoString: string | null): string | null => {
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
const getDateForPreview = (date: string): string => {
  return new Date(date)
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace('AM', '')
    .replace('PM', '');
};

/**
 * Formats a date to display as a human-readable string (Today, Yesterday, Tomorrow, or date)
 * @param {Date} date - The date to format
 * @returns {string} Human-readable date string
 */
const getHumanReadableDate = (date: Date): string => {
  const now = moment();
  const inputDate = moment(date);

  if (inputDate.isSame(now, 'day')) {
    return 'Today';
  }
  if (inputDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }
  if (inputDate.isSame(now.clone().add(1, 'day'), 'day')) {
    return 'Tomorrow';
  }
  const format = inputDate.year() === now.year() ? 'MMM D' : 'MMM D, YYYY';
  return inputDate.format(format);
};

/**
 * Extracts the time portion from a date string in HH:MM format
 * @param {string} date - The date string to extract time from
 * @returns {string} Formatted time string (HH:MM)
 */
const extractTimeFromDate = (date: string): string => {
  const dateObj = new Date(date);
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export {
  getCurrentTimeInMinutes,
  extractTimeFromDate,
  getHumanReadableDate,
  getDateForPreview,
  convertDateToLocal,
  getTimeInISOString,
  getDateForRequest,
};
