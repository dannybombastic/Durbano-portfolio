import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STATS_DATA } from '@app/core/constants/portfolio-data';
import { StatData } from '@app/core/models/stat.interface';

@Component({
  selector: 'app-stats-grid',
  imports: [CommonModule],
  templateUrl: './stats-grid.component.html',
  styleUrl: './stats-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsGridComponent {
  protected readonly stats = signal<readonly StatData[]>(STATS_DATA);
}
