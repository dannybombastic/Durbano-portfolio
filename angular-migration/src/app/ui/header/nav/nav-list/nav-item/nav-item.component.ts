import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  handleClick(event: Event): void {
    event.preventDefault();
    const target = document.querySelector(this.item().href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      this.clicked.emit();
    }
  }
}
