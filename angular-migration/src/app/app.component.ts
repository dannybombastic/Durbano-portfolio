import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LearningModalComponent } from './shared/components/learning-modal/learning-modal.component';
import { ChatModalComponent } from './shared/components/chat-modal/chat-modal.component';
import { AnalyticsService } from './core/services/analytics.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LearningModalComponent,
    ChatModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Daniel Urbano - DevOps Portfolio';
  
  private router = inject(Router);
  private analytics = inject(AnalyticsService);

  ngOnInit(): void {
    // Track initial page view
    this.trackPageView(this.router.url);

    // Track route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  private trackPageView(url: string): void {
    const pageTitle = this.getPageTitle(url);
    this.analytics.trackPageView(url, pageTitle);
  }

  private getPageTitle(url: string): string {
    if (url === '/' || url === '') return 'Home - Daniel Urbano';
    if (url.includes('/blog/')) return 'Blog Post - Daniel Urbano';
    if (url.includes('/blog')) return 'Blog - Daniel Urbano';
    if (url.includes('/learning-journey')) return 'Learning Journey - Daniel Urbano';
    return 'Daniel Urbano - DevOps Portfolio';
  }
}
