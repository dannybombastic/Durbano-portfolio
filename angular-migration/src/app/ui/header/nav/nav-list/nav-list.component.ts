import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavItem } from '../nav.component';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [CommonModule, NavItemComponent],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent {
  readonly items = input.required<readonly NavItem[]>();
  readonly itemClicked = output<void>();

  handleItemClick(): void {
    this.itemClicked.emit();
  }
}
