import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoMetaTags {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly openGraph?: {
    readonly title: string;
    readonly type: string;
    readonly url: string;
    readonly image: string;
    readonly description: string;
  };
  readonly twitter?: {
    readonly card: 'summary' | 'summary_large_image' | 'app' | 'player';
    readonly title: string;
    readonly description: string;
    readonly image: string;
  };
  readonly jsonLd?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  setMetaTags(config: SeoMetaTags): void {
    // Set title
    this.title.setTitle(config.title);

    // Set basic meta tags
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'theme-color', content: '#667eea' });

    // Set canonical URL
    this.setCanonicalURL(config.canonical);

    // Set Open Graph tags
    if (config.openGraph) {
      this.meta.updateTag({ property: 'og:title', content: config.openGraph.title });
      this.meta.updateTag({ property: 'og:type', content: config.openGraph.type });
      this.meta.updateTag({ property: 'og:url', content: config.openGraph.url });
      this.meta.updateTag({ property: 'og:image', content: config.openGraph.image });
      this.meta.updateTag({
        property: 'og:description',
        content: config.openGraph.description,
      });
    }

    // Set Twitter Card tags
    if (config.twitter) {
      this.meta.updateTag({ name: 'twitter:card', content: config.twitter.card });
      this.meta.updateTag({ name: 'twitter:title', content: config.twitter.title });
      this.meta.updateTag({ name: 'twitter:description', content: config.twitter.description });
      this.meta.updateTag({ name: 'twitter:image', content: config.twitter.image });
    }

    // Set JSON-LD
    if (config.jsonLd) {
      this.setJsonLd(config.jsonLd);
    }
  }

  private setCanonicalURL(url: string): void {
    const head = document.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');

    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }

    element.setAttribute('href', url);
  }

  private setJsonLd(data: Record<string, unknown>): void {
    const head = document.getElementsByTagName('head')[0];
    let element: HTMLScriptElement | null = document.querySelector(
      'script[type="application/ld+json"]'
    );

    if (!element) {
      element = document.createElement('script');
      element.setAttribute('type', 'application/ld+json');
      head.appendChild(element);
    }

    element.textContent = JSON.stringify(data);
  }
}
