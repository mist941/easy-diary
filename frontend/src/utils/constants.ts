export const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/v1'
    : 'http://localhost:8000/api/v1';
