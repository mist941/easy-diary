export function getCurrentTimeInMinutes() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (hours - 5) * 60 + minutes;
}
