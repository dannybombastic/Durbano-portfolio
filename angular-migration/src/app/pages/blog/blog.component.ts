import { Component, OnInit, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '@app/core/services/blog.service';
import { MarkdownRendererComponent } from '@app/shared/components/markdown-renderer/markdown-renderer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownRendererComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);

  // Expose service signals to template
  posts = this.blogService.posts;
  isLoading = this.blogService.isLoading;
  error = this.blogService.error;

  // Computed signal for sorted posts (newest first)
  sortedPosts = computed(() => {
    return [...this.posts()].sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
  });

  // Computed signal to check if we have posts
  hasPosts = computed(() => this.posts().length > 0);

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.blogService.fetchPosts().subscribe();
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
