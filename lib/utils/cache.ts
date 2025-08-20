/**
 * Singleton cache manager for in-memory data storage with TTL support
 * Provides thread-safe caching with automatic expiration
 */
export class CacheManager {
  private static instance: CacheManager;
  private cache = new Map<string, { value: unknown; expiresAt: number }>();

  /**
   * Gets the singleton instance of CacheManager
   * @returns {CacheManager} The singleton instance
   * @example
   * const cache = CacheManager.getInstance();
   * cache.set('key', 'value', 60000); // Cache for 1 minute
   */
  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  /**
   * Stores a value in cache with expiration
   * @param {string} key - Cache key
   * @param {unknown} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key: string, value: unknown, ttl: number): void {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, {
      value,
      expiresAt
    });
  }

  /**
   * Retrieves a value from cache if it exists and hasn't expired
   * @param {string} key - Cache key
   * @returns {unknown | null} Cached value or null if expired/not found
   */
  get(key: string): unknown | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Clears all cached data
   */
  clear(): void {
    this.cache.clear();
  }
}