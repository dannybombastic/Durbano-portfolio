import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExpertiseCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseComponent {
  protected readonly expertise = signal<ExpertiseCard[]>([
    {
      icon: 'bx-git-merge',
      title: 'CI/CD Pipelines',
      description:
        'Expert in designing and implementing continuous integration and deployment workflows',
    },
    {
      icon: 'bx-package',
      title: 'Infrastructure as Code',
      description: 'Proficient with Terraform, Ansible, and cloud automation tools',
    },
    {
      icon: 'bx-cube',
      title: 'Containerization',
      description: 'Docker, Kubernetes, and container orchestration expertise',
    },
    {
      icon: 'bx-line-chart',
      title: 'Monitoring & Observability',
      description:
        'ELK stack, Prometheus, Grafana for comprehensive system monitoring',
    },
    {
      icon: 'bx-shield',
      title: 'Security & Compliance',
      description: 'DevSecOps practices and security automation integration',
    },
    {
      icon: 'bx-cloud',
      title: 'Cloud Platforms',
      description: 'AWS, Azure, GCP with multi-cloud architecture experience',
    },
  ]);
}
