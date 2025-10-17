import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  readonly navItems: readonly NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ] as const;

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
