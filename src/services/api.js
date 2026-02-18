// api.js
const BASE_URL = 'https://streamed.pk/api';

export const api = {
  // Sports
  getSports: () => fetch(`${BASE_URL}/sports`).then(r => r.json()),

  // Matches
  getAllMatches: () => fetch(`${BASE_URL}/matches/all`).then(r => r.json()),
  getLiveMatches: () => fetch(`${BASE_URL}/matches/live`).then(r => r.json()),
  getTodayMatches: () => fetch(`${BASE_URL}/matches/all-today`).then(r => r.json()),
  getSportMatches: (sport) => fetch(`${BASE_URL}/matches/${sport}`).then(r => r.json()),
  getPopularMatches: (endpoint) => fetch(`${BASE_URL}/matches/${endpoint}/popular`).then(r => r.json()),

  // Streams
  getStreams: (source, id) => fetch(`${BASE_URL}/stream/${source}/${id}`).then(r => r.json()),

  // Images
  getBadgeUrl: (badge) => `${BASE_URL}/images/badge/${badge}.webp`,
  getPosterUrl: (poster) => `https://streamed.pk${poster}.webp`,
};