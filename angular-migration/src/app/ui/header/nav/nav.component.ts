import { Component, ChangeDetectionStrategy, input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { NavListComponent } from './nav-list/nav-list.component';
import { SocialLinksComponent } from '@app/shared/components/social-links/social-links.component';
import { SocialLinkData } from '@app/core/models/social-link.interface';

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-nav',
  imports: [CommonModule, NavListComponent, SocialLinksComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  readonly socialLinks = input.required<readonly SocialLinkData[]>();
  readonly isMenuOpen = signal(false);
  
  private readonly router = inject(Router);

  private readonly homeNavItems: readonly NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
    { label: 'Learning Journey', href: '/learning-journey' },
  ] as const;

  private readonly learningNavItems: readonly NavItem[] = [
    { label: 'Home', href: '/' },
  ] as const;

  // Convert router events to a signal
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  readonly navItems = computed(() => {
    const url = this.currentUrl();
    return url?.includes('/learning-journey') 
      ? this.learningNavItems 
      : this.homeNavItems;
  });

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
