import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EXPERTISE_DATA } from '@app/core/constants/portfolio-data';
import { ExpertiseData } from '@app/core/models/expertise.interface';

@Component({
  selector: 'app-expertise',
  imports: [CommonModule],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseComponent {
  protected readonly expertise = signal<readonly ExpertiseData[]>(EXPERTISE_DATA);
}
