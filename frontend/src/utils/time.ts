import moment from 'moment';

/**
 * Returns the current time as minutes since midnight
 * @returns Minutes since midnight
 */
function getCurrentTimeInMinutes(): number {
  return moment().diff(moment().startOf('day'), 'minutes');
}

/**
 * Formats a Date object into YYYY-MM-DD string for API requests
 * @param date - The date to format
 * @returns Formatted date string (YYYY-MM-DD)
 */
function getDateForRequest(date: Date): string {
  return moment(date).format('YYYY-MM-DD');
}

/**
 * Formats time to the backend-required format
 * @param time - Time string in HH:MM format
 * @param date - Optional date to use (defaults to today)
 * @returns Formatted time string for backend or null if input is null
 */
const formatTimeForBackend = (
  time: string | null,
  date?: Date,
): string | null => {
  if (!time) return null;

  // Validate time format
  if (!/^\d{1,2}:\d{2}$/.test(time)) {
    throw new Error('Invalid time format. Expected HH:MM');
  }

  const [hours, minutes] = time.split(':');
  const dateToUse = date ? moment(date) : moment();

  return dateToUse
    .hours(parseInt(hours, 10))
    .minutes(parseInt(minutes, 10))
    .seconds(0)
    .milliseconds(0)
    .format('YYYY-MM-DD HH:mm:ss.SSSSSS');
};

/**
 * Formats a date to display as a human-readable string (Today, Yesterday, Tomorrow, or date)
 * @param date - The date to format
 * @returns Human-readable date string
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
 * @param date - The date string to extract time from
 * @returns Formatted time string (HH:MM)
 */
const extractTimeFromDate = (date: string): string => {
  return moment(date).format('HH:mm');
};

export {
  getCurrentTimeInMinutes,
  getDateForRequest,
  formatTimeForBackend,
  getHumanReadableDate,
  extractTimeFromDate,
};
