import { Component, OnInit, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { BlogService } from '@app/core/services/blog.service';
import { MarkdownRendererComponent } from '@app/shared/components/markdown-renderer/markdown-renderer.component';
import { BlogPost } from '@app/core/models/blog.interface';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownRendererComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostComponent implements OnInit {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signal for current post
  post = signal<BlogPost | null>(null);

  // Signal for loading state
  isLoading = signal(true);

  // Computed signal for post existence
  hasPost = computed(() => this.post() !== null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    
    if (!slug) {
      this.router.navigate(['/blog']);
      return;
    }

    this.loadPost(slug);
  }

  private loadPost(slug: string): void {
    // Check if posts are already loaded
    if (this.blogService.posts().length > 0) {
      this.findAndSetPost(slug);
    } else {
      // Fetch posts first
      this.blogService.fetchPosts().subscribe(() => {
        this.findAndSetPost(slug);
      });
    }
  }

  private findAndSetPost(slug: string): void {
    const foundPost = this.blogService.getPostBySlug(slug);
    
    if (foundPost) {
      this.post.set(foundPost);
    } else {
      // Post not found, redirect to blog list
      this.router.navigate(['/blog']);
    }
    
    this.isLoading.set(false);
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
    return `${minutes} minutos de lectura`;
  }
}