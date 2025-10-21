import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, timeout, of } from 'rxjs';
import { environment } from '@env/environment';
import { BlogPost, BlogPostsResponse } from '@app/core/models/blog.interface';
import { BlogCacheService } from './blog-cache.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  private cacheService = inject(BlogCacheService);
  
  // Signal for loading state
  readonly isLoading = signal(false);
  
  // Signal for error state
  readonly error = signal<string | null>(null);
  
  // Signal for blog posts
  readonly posts = signal<readonly BlogPost[]>([]);

  // Pagination metadata signals
  readonly totalPosts = signal(0);
  readonly currentPage = signal(1);
  readonly pageSize = signal(6);
  readonly totalPages = signal(0);

  /**
   * Fetch blog posts with localStorage cache strategy
   * 
   * Cache Logic:
   * 1. Check if valid cache exists for today
   * 2. If yes: return cached data (no API call)
   * 3. If no: fetch from API, update cache with today's date
   * 4. If API fails but cache exists: return stale cache as fallback
   * 5. If API fails and no cache: propagate error
   * 
   * @param page Current page number (default: 1)
   * @param pageSize Number of posts per page (default: 6)
   * @returns Observable of blog posts array
   */
  fetchPosts(page: number = 1, pageSize: number = 6): Observable<readonly BlogPost[]> {

    console.log('📞 fetchPosts called with page:', page, 'pageSize:', pageSize);
    

    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);
    this.pageSize.set(pageSize);

    // Step 1: Check for valid cache
    const cachedData = this.cacheService.getCachedPosts();
    console.log('💭 Cache check result:', cachedData ? `Found ${cachedData.posts.length} posts` : 'No cache');
    
    if (cachedData && this.cacheService.isCacheValid()) {
      // Cache HIT: Return data from localStorage
      console.log('✅ Cache HIT - Using cached blog posts (no API call needed)');
      this.posts.set(cachedData.posts);
      this.totalPosts.set(cachedData.total);
      this.totalPages.set(Math.ceil(cachedData.total / pageSize));
      this.isLoading.set(false);
      return of(cachedData.posts);
    }

    // Step 2: Cache MISS or EXPIRED: Fetch from API
    console.log('🌐 Cache MISS - Fetching fresh blog posts from API');
    const url = `${environment.n8nWebhookUrl}?page=${page}&pageSize=${pageSize}`;
    console.log('🔗 API URL:', url);

    return this.http.get<BlogPostsResponse>(url).pipe(
      timeout(environment.apiTimeout),
      map((response: BlogPostsResponse) => {
        // Success: Update state and cache
        this.posts.set(response.posts);
        this.totalPosts.set(response.total);
        this.totalPages.set(Math.ceil(response.total / response.pageSize));
        
        // Save to cache with today's date (convert readonly to mutable)
        this.cacheService.setCachedPosts([...response.posts], response.total);
        
        this.isLoading.set(false);
        return response.posts;
      }),
      catchError((error: HttpErrorResponse) => {
        // API Error: Try to use stale cache as fallback
        if (cachedData) {
          console.warn('⚠️  API failed, using stale cache as fallback');
          this.posts.set(cachedData.posts);
          this.totalPosts.set(cachedData.total);
          this.totalPages.set(Math.ceil(cachedData.total / pageSize));
          this.error.set('Using cached data (offline mode)');
          this.isLoading.set(false);
          return of(cachedData.posts);
        }
        
        // No cache available: Propagate error
        this.handleError(error);
        this.isLoading.set(false);
        return of([]);
      })
    );
  }

  /**
   * Get a single post by slug
   */
  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts().find(post => post.slug === slug);
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): void {
    let errorMessage = 'An error occurred while fetching blog posts.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code ${error.status}: ${error.message}`;
    }
    
    this.error.set(errorMessage);
    console.error('Blog Service Error:', errorMessage);
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Clear blog cache and force fresh fetch on next request
   * Useful for manual refresh or when user wants latest data
   */
  clearCache(): void {
    this.cacheService.clearCache();
    console.log('🔄 Blog cache cleared - next fetch will retrieve fresh data');
  }

  /**
   * Get cache information for debugging or display
   * @returns Cache statistics object
   */
  getCacheInfo() {
    return this.cacheService.getCacheInfo();
  }

  /**
   * Force refresh: Clear cache and fetch fresh data
   * @param page Current page number
   * @param pageSize Number of posts per page
   * @returns Observable of fresh blog posts
   */
  forceRefresh(page: number = 1, pageSize: number = 6): Observable<readonly BlogPost[]> {
    this.clearCache();
    return this.fetchPosts(page, pageSize);
  }
}
