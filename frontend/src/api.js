/**
 * API Configuration
 * Uses REACT_APP_API_URL environment variable for the backend URL.
 * Falls back to localhost:8000 for local development.
 *
 * Usage:
 *   import { API_BASE_URL, apiFetch } from './api';
 *   const data = await apiFetch('/api/stats');
 */

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Helper function for making API requests to the backend.
 * @param {string} endpoint - API endpoint path (e.g., '/api/stats')
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
