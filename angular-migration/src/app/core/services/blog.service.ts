import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, timeout, of } from 'rxjs';
import { environment } from '@env/environment';
import { BlogPost, BlogPostsResponse } from '@app/core/models/blog.interface';

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

  /**
   * Fetch blog posts from n8n webhook
   */
  fetchPosts(): Observable<readonly BlogPost[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.get<BlogPostsResponse>(environment.n8nWebhookUrl).pipe(
      timeout(environment.apiTimeout),
      map((response: BlogPostsResponse) => {
        this.posts.set(response.posts);
        this.isLoading.set(false);
        return response.posts;
      }),
      catchError((error: HttpErrorResponse) => {
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
}
