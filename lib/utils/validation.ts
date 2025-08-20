/**
 * Utility functions for data validation
 * Provides common validation patterns and error handling
 */

/**
 * Validates geographic coordinates
 * @param {number} lat - Latitude coordinate (-90 to 90)
 * @param {number} long - Longitude coordinate (-180 to 180)
 * @returns {boolean} True if coordinates are valid
 * @example
 * if (validateCoordinates(40.7128, -74.0060)) {
 *   // Coordinates are valid
 * }
 */
export function validateCoordinates(lat: number, long: number): boolean {
  return typeof lat === 'number' && typeof long === 'number' &&
         !isNaN(lat) && !isNaN(long) &&
         lat >= -90 && lat <= 90 &&
         long >= -180 && long <= 180;
}
