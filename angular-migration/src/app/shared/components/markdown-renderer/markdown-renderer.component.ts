import { Component, input, computed, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  template: `
    <div class="markdown-content" [innerHTML]="sanitizedHtml()"></div>
  `,
  styleUrl: './markdown-renderer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None // Disable view encapsulation for innerHTML content
})
export class MarkdownRendererComponent {
  // Input signal for markdown content
  content = input.required<string>();
  
  // Computed signal for sanitized HTML
  sanitizedHtml = computed<SafeHtml>(() => {
    const markdown = this.content();
    if (!markdown) {
      return '';
    }
    
    // Configure marked options
    marked.setOptions({
      breaks: true,
      gfm: true, // GitHub Flavored Markdown
    });
    
    // Parse markdown to HTML
    const rawHtml = marked.parse(markdown) as string;
    
    // Sanitize HTML to prevent XSS attacks
    return this.sanitizer.sanitize(1, rawHtml) || '';
  });

  constructor(private sanitizer: DomSanitizer) {}
}
