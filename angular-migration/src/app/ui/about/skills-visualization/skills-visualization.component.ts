import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillNode {
  icon: string;
  name: string;
  class: string;
}

@Component({
  selector: 'app-skills-visualization',
  imports: [CommonModule],
  templateUrl: './skills-visualization.component.html',
  styleUrl: './skills-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsVisualizationComponent {
  protected readonly skills = signal<SkillNode[]>([
    { icon: 'bxl-docker', name: 'Docker', class: 'skill-1' },
    { icon: 'bxl-kubernetes', name: 'Kubernetes', class: 'skill-2' },
    { icon: 'bxl-gitlab', name: 'GitLab', class: 'skill-3' },
    { icon: 'bxl-aws', name: 'AWS', class: 'skill-4' },
    { icon: 'bx-code-alt', name: 'Terraform', class: 'skill-5' },
    { icon: 'bx-line-chart', name: 'Monitoring', class: 'skill-6' },
  ]);
}
