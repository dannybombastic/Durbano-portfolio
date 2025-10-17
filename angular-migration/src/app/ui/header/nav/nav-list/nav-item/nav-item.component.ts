import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavItem } from '../../nav.component';

@Component({
  selector: 'app-nav-item',
  imports: [CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  readonly item = input.required<NavItem>();
  readonly clicked = output<void>();

  constructor(private router: Router) {}

  handleClick(event: Event): void {
    const href = this.item().href;
    
    // Check if it's a route (starts with /) or anchor (starts with #)
    if (href.startsWith('#')) {
      // It's an anchor - scroll to element
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        this.clicked.emit();
      }
    } else if (href.startsWith('/')) {
      // It's a route - navigate
      event.preventDefault();
      this.router.navigate([href]);
      this.clicked.emit();
    }
    // Otherwise let the browser handle it naturally
  }
}
