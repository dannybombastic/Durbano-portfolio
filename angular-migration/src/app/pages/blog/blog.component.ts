import { Component, OnInit, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '@app/core/services/blog.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  
  // Expose Math to template
  readonly Math = Math;

  // Expose service signals to template
  posts = this.blogService.posts;
  isLoading = this.blogService.isLoading;
  error = this.blogService.error;
  
  // Pagination signals
  currentPage = this.blogService.currentPage;
  totalPages = this.blogService.totalPages;
  totalPosts = this.blogService.totalPosts;
  pageSize = this.blogService.pageSize;

  // Computed signal for sorted posts (newest first)
  sortedPosts = computed(() => {
    return [...this.posts()].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  // Computed signal to check if we have posts
  hasPosts = computed(() => this.posts().length > 0);

  // Computed signal for pagination controls
  canGoPrevious = computed(() => this.currentPage() > 1);
  canGoNext = computed(() => this.currentPage() < this.totalPages());
  
  // Computed signal for page numbers to display
  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: number[] = [];
    
    // Show max 5 pages at a time
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    
    // Adjust start if we're near the end
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  });

  ngOnInit(): void {
    console.log('🔧 Environment Config:', {
      production: environment.production,
      webhookUrl: environment.n8nWebhookUrl,
      timeout: environment.apiTimeout
    });
    this.loadPosts();
  }

  loadPosts(page: number = 1): void {
    this.blogService.fetchPosts(page).subscribe();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.loadPosts(page);
    // Scroll to top of blog section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.canGoNext()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  previousPage(): void {
    if (this.canGoPrevious()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  retry(): void {
    this.blogService.clearError();
    this.loadPosts();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getReadTimeText(minutes?: number): string {
    if (!minutes) return '';
    return `${minutes} min de lectura`;
  }
}