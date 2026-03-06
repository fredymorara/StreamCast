// api.js
const BASE_URL = 'https://streamed.pk/api';

// Helper function to handle status checks
const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const api = {
  // Sports
  getSports: () => fetchJson(`${BASE_URL}/sports`),

  // Matches
  getAllMatches: () => fetchJson(`${BASE_URL}/matches/all`),
  getLiveMatches: () => fetchJson(`${BASE_URL}/matches/live`),
  getTodayMatches: () => fetchJson(`${BASE_URL}/matches/all-today`),
  getSportMatches: (sport) => fetchJson(`${BASE_URL}/matches/${sport}`),
  getPopularMatches: (endpoint) => fetchJson(`${BASE_URL}/matches/${endpoint}/popular`),

  // Streams
  getStreams: (source, id) => fetchJson(`${BASE_URL}/stream/${source}/${id}`),

  // Images
  getBadgeUrl: (badge) => `${BASE_URL}/images/badge/${badge}.webp`,
  getPosterUrl: (posterId) => {
    // Check if it already includes a path
    if (posterId.startsWith('/')) {
      return `https://streamed.pk${posterId}.webp`;
    }
    // Otherwise use the proxy endpoint
    return `${BASE_URL}/images/proxy/${posterId}.webp`;
  },
};