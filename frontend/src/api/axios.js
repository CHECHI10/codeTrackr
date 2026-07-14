import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Map Axios/network failures to user-facing messages.
 * Never surface raw Axios strings like "Request failed with status code 401".
 */
export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  if (!error) return fallback;

  if (!error.response) {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      return 'Unable to connect. Please check your network connection.';
    }
    return fallback;
  }

  const status = error.response.status;
  const serverMessage =
    error.response.data?.message || error.response.data?.error;

  switch (status) {
    case 401:
      return serverMessage || 'Not logged in';
    case 403:
      return serverMessage || 'Forbidden';
    case 404:
      return serverMessage || 'Resource not found';
    case 500:
    case 502:
    case 503:
      return serverMessage || 'Server error. Please try again later.';
    default:
      return serverMessage || fallback;
  }
};

export default api;
