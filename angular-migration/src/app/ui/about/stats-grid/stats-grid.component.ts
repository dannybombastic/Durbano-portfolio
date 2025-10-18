import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatItem {
  number: string;
  label: string;
}

@Component({
  selector: 'app-stats-grid',
  imports: [CommonModule],
  templateUrl: './stats-grid.component.html',
  styleUrl: './stats-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsGridComponent {
  protected readonly stats = signal<StatItem[]>([
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Azure Projects' },
    { number: '99.9%', label: 'Cloud Uptime' },
  ]);
}
