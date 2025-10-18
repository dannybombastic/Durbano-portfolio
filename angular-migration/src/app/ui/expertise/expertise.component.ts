import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ExpertiseCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-expertise',
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
        'Expert in Azure DevOps pipelines, GitHub Actions, and continuous deployment strategies',
    },
    {
      icon: 'bx-package',
      title: 'Infrastructure as Code',
      description: 'Azure ARM Templates, Bicep, Terraform for Azure cloud automation',
    },
    {
      icon: 'bx-cube',
      title: 'Containerization',
      description: 'Azure Kubernetes Service (AKS), Azure Container Registry, Docker orchestration',
    },
    {
      icon: 'bx-line-chart',
      title: 'Monitoring & Observability',
      description:
        'Azure Monitor, Application Insights, Log Analytics, and Prometheus for comprehensive monitoring',
    },
    {
      icon: 'bx-shield',
      title: 'Security & Compliance',
      description: 'Azure Security Center, Key Vault, DevSecOps practices and compliance automation',
    },
    {
      icon: 'bxl-microsoft',
      title: 'Azure Cloud Platform',
      description: 'Azure specialist with multi-cloud experience (AWS, GCP) and hybrid solutions',
    },
  ]);
}
