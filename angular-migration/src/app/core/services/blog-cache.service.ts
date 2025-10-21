import { Injectable } from '@angular/core';
import { BlogPost } from '@app/core/models/blog.interface';

/**
 * Service for managing blog posts cache in localStorage
 * 
 * Implements a daily cache strategy:
 * - Caches blog posts for the current day
 * - Automatically invalidates cache when date changes
 * - Provides fallback to cached data when API fails
 */
@Injectable({
  providedIn: 'root'
})
export class BlogCacheService {
  // localStorage keys
  private readonly CACHE_DATE_KEY = 'blog_date';
  private readonly CACHE_POSTS_KEY = 'blog_posts';
  private readonly CACHE_TOTAL_KEY = 'blog_total';

  /**
   * Get current date in DD-MM-YYYY format
   * @returns Formatted date string
   */
  private getCurrentDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  }

  /**
   * Check if cached data is still valid (same day)
   * @returns true if cache is valid, false otherwise
   */
  isCacheValid(): boolean {
    try {
      const cachedDate = localStorage.getItem(this.CACHE_DATE_KEY);
      const currentDate = this.getCurrentDate();
      return cachedDate === currentDate;
    } catch (error) {
      console.error('Error checking cache validity:', error);
      return false;
    }
  }

  /**
   * Get cached blog posts from localStorage
   * @returns Array of cached blog posts or null if no valid cache exists
   */
  getCachedPosts(): { posts: BlogPost[], total: number } | null {
    try {
      if (!this.isCacheValid()) {
        return null;
      }

      const cachedPostsJson = localStorage.getItem(this.CACHE_POSTS_KEY);
      const cachedTotal = localStorage.getItem(this.CACHE_TOTAL_KEY);

      if (!cachedPostsJson) {
        return null;
      }

      const posts = JSON.parse(cachedPostsJson) as BlogPost[];
      const total = cachedTotal ? parseInt(cachedTotal, 10) : posts.length;

      // Validate that posts is an array
      if (!Array.isArray(posts)) {
        console.warn('Cached posts is not an array, clearing cache');
        this.clearCache();
        return null;
      }

      console.log(`📦 Cache HIT: Retrieved ${posts.length} posts from localStorage`);
      return { posts, total };
    } catch (error) {
      console.error('Error reading from cache:', error);
      this.clearCache();
      return null;
    }
  }

  /**
   * Save blog posts to localStorage cache
   * @param posts Array of blog posts to cache
   * @param total Total number of posts
   */
  setCachedPosts(posts: BlogPost[], total: number): void {
    try {
      const currentDate = this.getCurrentDate();
      
      // Save posts as JSON string
      localStorage.setItem(this.CACHE_POSTS_KEY, JSON.stringify(posts));
      
      // Save total count
      localStorage.setItem(this.CACHE_TOTAL_KEY, total.toString());
      
      // Save current date to track cache validity
      localStorage.setItem(this.CACHE_DATE_KEY, currentDate);

      console.log(`💾 Cache SAVED: Stored ${posts.length} posts for ${currentDate}`);
    } catch (error) {
      console.error('Error saving to cache:', error);
      // If localStorage is full or unavailable, clear old cache
      this.clearCache();
    }
  }

  /**
   * Clear all cached blog data from localStorage
   * Useful when user wants to force refresh or when cache is corrupted
   */
  clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_DATE_KEY);
      localStorage.removeItem(this.CACHE_POSTS_KEY);
      localStorage.removeItem(this.CACHE_TOTAL_KEY);
      console.log('🗑️  Cache CLEARED: All blog cache data removed');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  /**
   * Get cache statistics for debugging
   * @returns Object with cache information
   */
  getCacheInfo(): { 
    isValid: boolean; 
    cachedDate: string | null; 
    currentDate: string;
    postCount: number;
  } {
    const cachedDate = localStorage.getItem(this.CACHE_DATE_KEY);
    const cachedPosts = this.getCachedPosts();
    
    return {
      isValid: this.isCacheValid(),
      cachedDate,
      currentDate: this.getCurrentDate(),
      postCount: cachedPosts?.posts.length || 0
    };
  }
}
