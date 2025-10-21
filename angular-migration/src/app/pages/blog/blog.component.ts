import { Component, OnInit, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '@app/core/services/blog.service';
import { SeoService } from '@app/core/services/seo.service';
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
  private seoService = inject(SeoService);
  
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
    
    // Set SEO for blog list page
    this.seoService.setMetaTags({
      title: 'Technical Blog | Daniel Urbano - Azure DevOps Engineer',
      description: 'Guides and Articles on Azure CLI, DevOps, Cloud Infrastructure, and Best Practices for Cloud Development',
      canonical: 'https://durbanod.com/blog',
      openGraph: {
        title: 'Technical Blog - Daniel Urbano',
        type: 'website',
        url: 'https://durbanod.com/blog',
        image: 'https://durbanod.com/favicon.svg',
        description: 'Articles on Microsoft Azure, DevOps, Cloud Infrastructure, and IT Best Practices'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Technical Blog - Daniel Urbano',
        description: 'Articles on Microsoft Azure, DevOps, Cloud Infrastructure, and IT Best Practices',
        image: 'https://durbanod.com/favicon.svg'
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Daniel Urbano - Technical Blog',
        description: 'Articles on Microsoft Azure, DevOps, Cloud Infrastructure',
        url: 'https://durbanod.com/blog',
        author: {
          '@type': 'Person',
          name: 'Daniel Urbano',
          url: 'https://durbanod.com'
        }
      }
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
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getReadTimeText(minutes?: number): string {
    if (!minutes) return '';
    return `${minutes} min read`;
  }
}
