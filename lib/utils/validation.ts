export function validateCoordinates(lat: number, long: number): boolean {
  return typeof lat === 'number' && typeof long === 'number' &&
         !isNaN(lat) && !isNaN(long) &&
         lat >= -90 && lat <= 90 &&
         long >= -180 && long <= 180;
}
