import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, timeout, of } from 'rxjs';
import { environment } from '@env/environment';
import { BlogPost } from '@app/core/models/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private http = inject(HttpClient);
  
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

  // Cache for all posts
  private allPosts = signal<readonly BlogPost[]>([]);

  // LocalStorage keys
  private readonly CACHE_KEY = 'blog_posts';
  private readonly CACHE_DATE_KEY = 'blog_posts_date';

  /**
   * Check if localStorage cache is valid
   */
  private isCacheValid(): boolean {
    try {
      const cachedDate = localStorage.getItem(this.CACHE_DATE_KEY);
      if (!cachedDate) return false;

      const today = new Date().toLocaleDateString('en-US');
      return cachedDate === today;
    } catch {
      return false;
    }
  }

  /**
   * Get posts from localStorage
   */
  private getCachedPosts(): BlogPost[] | null {
    try {
      if (!this.isCacheValid()) return null;

      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      return JSON.parse(cached) as BlogPost[];
    } catch {
      return null;
    }
  }

  /**
   * Save posts to localStorage
   */
  private saveCacheToPosts(posts: BlogPost[]): void {
    try {
      const today = new Date().toLocaleDateString('en-US');
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(posts));
      localStorage.setItem(this.CACHE_DATE_KEY, today);
    } catch (error) {
      console.warn('Failed to save posts to localStorage:', error);
    }
  }

  /**
   * Fetch blog posts from n8n webhook
   */
  fetchPosts(page: number = 1, pageSize: number = 6): Observable<readonly BlogPost[]> {
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);
    this.pageSize.set(pageSize);

    // Try to get from localStorage first
    const cachedPosts = this.getCachedPosts();
    if (cachedPosts && cachedPosts.length > 0) {
      console.log('✅ Posts loaded from localStorage cache');
      this.allPosts.set(cachedPosts);
      this.totalPosts.set(cachedPosts.length);
      this.totalPages.set(Math.ceil(cachedPosts.length / pageSize));
      
      const paginatedPosts = this.paginateInFrontend(page, pageSize);
      this.posts.set(paginatedPosts);
      this.isLoading.set(false);
      return of(paginatedPosts);
    }

    // Check if we have posts in memory
    if (this.allPosts().length > 0) {
      console.log('✅ Posts loaded from memory');
      this.totalPosts.set(this.allPosts().length);
      this.totalPages.set(Math.ceil(this.allPosts().length / pageSize));
      
      const paginatedPosts = this.paginateInFrontend(page, pageSize);
      this.posts.set(paginatedPosts);
      this.isLoading.set(false);
      return of(paginatedPosts);
    }

    // Fetch all posts from backend
    // Note: Endpoint now returns all posts by default (no pagination params needed)
    const url = environment.n8nWebhookUrl;

    return this.http.get<any>(url).pipe(
      timeout(environment.apiTimeout),
      map((response: any) => {
        // Handle both array and object responses
        let allPosts: BlogPost[];
        
        if (Array.isArray(response)) {
          // Response is already an array
          allPosts = response;
        } else if (response && Array.isArray(response.posts)) {
          // Response is an object with a posts array
          allPosts = response.posts;
        } else if (response && typeof response === 'object') {
          // Response is an object, try to extract array from common keys
          allPosts = response.data || response.items || response.results || [];
        } else {
          console.error('❌ Unexpected response format:', response);
          allPosts = [];
        }
        
        console.log('📦 Received posts:', allPosts.length);
        
        // Store all posts in cache
        this.allPosts.set(allPosts);
        this.totalPosts.set(allPosts.length);
        this.totalPages.set(Math.ceil(allPosts.length / pageSize));
        
        // Save to localStorage
        this.saveCacheToPosts(allPosts);
        console.log('✅ Posts fetched from API and saved to localStorage');
        
        // Return paginated slice
        const paginatedPosts = this.paginateInFrontend(page, pageSize);
        this.posts.set(paginatedPosts);
        this.isLoading.set(false);
        return paginatedPosts;
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        this.isLoading.set(false);
        return of([]);
      })
    );
  }

  /**
   * Paginate posts in the frontend
   */
  private paginateInFrontend(page: number, pageSize: number): readonly BlogPost[] {
    const allPosts = this.allPosts();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    
    console.log(`📄 Pagination: Page ${page} of ${Math.ceil(allPosts.length / pageSize)}`);
    console.log(`   Total posts: ${allPosts.length}, Showing: ${paginatedPosts.length}`);
    console.log(`   Range: ${startIndex} to ${endIndex}`);
    
    return paginatedPosts;
  }

  /**
   * Get a single post by slug
   */
  getPostBySlug(slug: string): BlogPost | undefined {
    // Try to find in current posts first
    let post = this.posts().find(post => post.slug === slug);
    
    // If not found, search in all posts cache
    if (!post && this.allPosts().length > 0) {
      post = this.allPosts().find(post => post.slug === slug);
    }
    
    return post;
  }

  /**
   * Clear all posts cache and force refresh
   */
  clearCache(): void {
    this.allPosts.set([]);
    this.posts.set([]);
    this.totalPosts.set(0);
    this.totalPages.set(0);
    this.currentPage.set(1);
    
    // Clear localStorage
    try {
      localStorage.removeItem(this.CACHE_KEY);
      localStorage.removeItem(this.CACHE_DATE_KEY);
      console.log('✅ Cache cleared from localStorage');
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  /**
   * Force refresh from backend
   */
  forceRefresh(page: number = 1, pageSize: number = 6): Observable<readonly BlogPost[]> {
    this.clearCache();
    return this.fetchPosts(page, pageSize);
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
}
