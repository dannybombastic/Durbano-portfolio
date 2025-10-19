import { Component, OnInit, computed, inject, signal, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { BlogService } from '@app/core/services/blog.service';
import { SeoService } from '@app/core/services/seo.service';
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
export class BlogPostComponent implements OnInit, OnDestroy {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);

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
      this.updateSeo(foundPost);
    } else {
      // Post not found, redirect to blog list
      this.router.navigate(['/blog']);
    }
    
    this.isLoading.set(false);
  }

  private updateSeo(post: BlogPost): void {
    const url = `https://danielurbano.com/blog/${post.slug}`;
    const image = post.coverImage || 'https://danielurbano.com/favicon.svg';

    this.seoService.setMetaTags({
      title: `${post.title} | Daniel Urbano Blog`,
      description: post.description,
      canonical: url,
      openGraph: {
        title: post.title,
        type: 'article',
        url: url,
        image: image,
        description: post.description
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        image: image
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: image,
        datePublished: post.createdAt,
        dateModified: post.createdAt,
        author: {
          '@type': 'Person',
          name: post.author || 'Daniel Urbano',
          url: 'https://danielurbano.com'
        },
        publisher: {
          '@type': 'Person',
          name: 'Daniel Urbano',
          url: 'https://danielurbano.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://danielurbano.com/favicon.svg'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url
        },
        keywords: post.tags?.join(', '),
        articleBody: post.content.substring(0, 500) // Preview del contenido
      }
    });
  }

  ngOnDestroy(): void {
    // Reset SEO to default when leaving the page
    this.seoService.setMetaTags({
      title: 'Daniel Urbano - Azure DevOps Engineer',
      description: 'Azure DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and containerization',
      canonical: 'https://danielurbano.com/',
      openGraph: {
        title: 'Daniel Urbano - Azure DevOps Engineer',
        type: 'website',
        url: 'https://danielurbano.com/',
        image: 'https://danielurbano.com/favicon.svg',
        description: 'Azure DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and containerization'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Daniel Urbano - Azure DevOps Engineer',
        description: 'Azure DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and containerization',
        image: 'https://danielurbano.com/favicon.svg'
      }
    });
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
