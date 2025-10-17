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
      icon: 'bx-recycle',
      title: 'Application Lifecycle',
      description:
        'Complete ALM methodology and tools to manage application lifecycle from development to maintenance.',
      features: ['Version Control', 'Release Management', 'Quality Assurance'],
      dataService: 'alm',
    },
    {
      icon: 'bx-pie-chart',
      title: 'Monitoring & Analytics',
      description:
        'Real-time system monitoring with Prometheus, Grafana, and ELK stack for optimal performance insights.',
      features: ['Performance Metrics', 'Log Analysis', 'Alert Management'],
      dataService: 'monitoring',
    },
    {
      icon: 'bx-support',
      title: 'DevOps Consultation',
      description:
        'Expert guidance on DevOps implementation, best practices, and organizational transformation.',
      features: ['Process Optimization', 'Team Training', 'Strategy Planning'],
      dataService: 'consultation',
    },
    {
      icon: 'bx-server',
      title: 'Infrastructure as Code',
      description:
        'Automated infrastructure provisioning and management using Terraform, Ansible, and cloud-native tools.',
      features: [
        'Cloud Automation',
        'Infrastructure Scaling',
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
