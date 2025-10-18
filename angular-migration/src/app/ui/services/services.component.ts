import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { ModalService } from '@app/core/services/modal.service';
import { SERVICE_RESOURCES } from '@app/core/constants/learning-resources';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
  dataService: string;
}

@Component({
  selector: 'app-services',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected readonly services = signal<ServiceCard[]>([
    {
      icon: 'bxl-microsoft',
      title: 'Azure DevOps Solutions',
      description:
        'Complete Azure DevOps implementation including pipelines, repos, boards, and artifacts for seamless software delivery.',
      features: ['Azure Pipelines', 'Azure Repos & Boards', 'Release Management'],
      dataService: 'alm',
    },
    {
      icon: 'bx-pie-chart',
      title: 'Azure Monitoring & Analytics',
      description:
        'Comprehensive monitoring with Azure Monitor, Application Insights, and Log Analytics for optimal cloud performance.',
      features: ['Application Insights', 'Log Analytics', 'Azure Alerts'],
      dataService: 'monitoring',
    },
    {
      icon: 'bx-support',
      title: 'Azure Cloud Consultation',
      description:
        'Expert guidance on Azure migration, cloud-native architecture, and DevOps best practices for organizational transformation.',
      features: ['Azure Migration', 'Cloud Architecture', 'DevOps Strategy'],
      dataService: 'consultation',
    },
    {
      icon: 'bx-server',
      title: 'Azure Infrastructure as Code',
      description:
        'Automated Azure infrastructure using ARM Templates, Bicep, and Terraform for scalable and repeatable deployments.',
      features: [
        'Azure ARM & Bicep',
        'Azure Automation',
        'Cost Optimization',
      ],
      dataService: 'infrastructure',
    },
  ]);

  constructor(private modalService: ModalService) {}

  protected handleServiceClick(serviceType: string): void {
    const resources = SERVICE_RESOURCES[serviceType];
    if (resources) {
      this.modalService.openLearningModal(resources);
    }
  }
}
