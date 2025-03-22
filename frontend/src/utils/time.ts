export function getCurrentTimeInMinutes() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return hours * 60 + minutes;
}

export function getDateForRequest(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getTimeInISOString = (time: string | null): string | null => {
  if (!time) return null;
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toISOString();
};

export const convertDateToUTC = (isoString: string | null): string | null => {
  if (!isoString) return null;

  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  const microseconds = milliseconds + '000';

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
};
