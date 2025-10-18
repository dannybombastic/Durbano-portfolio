import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-scroll-indicator',
  imports: [],
  templateUrl: './scroll-indicator.component.html',
  styleUrl: './scroll-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollIndicatorComponent {
  private readonly viewportScroller = inject(ViewportScroller);
  protected readonly isHovered = signal(false);

  protected handleClick(): void {
    this.viewportScroller.scrollToAnchor('about');
  }
}
