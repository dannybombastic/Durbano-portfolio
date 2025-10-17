import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsVisualizationComponent } from './skills-visualization/skills-visualization.component';
import { StatsGridComponent } from './stats-grid/stats-grid.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    SkillsVisualizationComponent,
    StatsGridComponent,
    ButtonComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
