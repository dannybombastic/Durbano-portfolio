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
    { number: '50+', label: 'Projects Completed' },
    { number: '24/7', label: 'System Reliability' },
  ]);
}
