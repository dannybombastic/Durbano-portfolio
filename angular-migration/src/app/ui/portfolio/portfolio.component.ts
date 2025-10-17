import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectAchievement {
  text: string;
}

interface ProjectLink {
  icon: string;
  text: string;
  dataProject: string;
}

interface PortfolioProject {
  icon: string;
  techStack: string[];
  title: string;
  description: string;
  achievements: ProjectAchievement[];
  links: ProjectLink[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  protected readonly projects = signal<PortfolioProject[]>([
    {
      icon: 'bxl-kubernetes',
      techStack: ['Kubernetes', 'Docker', 'Helm'],
      title: 'Enterprise Kubernetes Platform',
      description:
        'Designed and implemented a production-ready Kubernetes cluster supporting 50+ microservices with automated scaling, monitoring, and disaster recovery capabilities.',
      achievements: [
        { text: '99.9% uptime achieved' },
        { text: '50% cost reduction' },
        { text: 'Auto-scaling implemented' },
      ],
      links: [
        { icon: 'bx-book-open', text: 'Learn Kubernetes', dataProject: 'kubernetes' },
        { icon: 'bx-book-open', text: 'Learn Docker', dataProject: 'docker' },
      ],
    },
    {
      icon: 'bxl-gitlab',
      techStack: ['GitLab CI', 'Jenkins', 'SonarQube'],
      title: 'Multi-Environment CI/CD Pipeline',
      description:
        'Built comprehensive CI/CD pipeline supporting automated testing, security scanning, and deployment across development, staging, and production environments.',
      achievements: [
        { text: 'Deployment time: 2 hours → 15 minutes' },
        { text: 'Zero-downtime deployments' },
        { text: 'Automated security scans' },
      ],
      links: [
        { icon: 'bx-book-open', text: 'Learn GitLab CI', dataProject: 'gitlab-ci' },
        { icon: 'bx-book-open', text: 'Learn Jenkins', dataProject: 'jenkins' },
      ],
    },
    {
      icon: 'bxl-aws',
      techStack: ['Terraform', 'AWS', 'CloudFormation'],
      title: 'Cloud Infrastructure Automation',
      description:
        'Developed Terraform modules for AWS infrastructure provisioning with automated backup strategies, monitoring, and compliance enforcement across multiple regions.',
      achievements: [
        { text: 'Infrastructure provisioning: 3 days → 30 minutes' },
        { text: 'Multi-region deployment' },
        { text: 'Automated compliance checks' },
      ],
      links: [
        { icon: 'bx-book-open', text: 'Learn Terraform', dataProject: 'terraform' },
        { icon: 'bx-book-open', text: 'Learn AWS', dataProject: 'aws' },
      ],
    },
    {
      icon: 'bx-line-chart',
      techStack: ['Prometheus', 'Grafana', 'ELK Stack'],
      title: 'Complete Observability Platform',
      description:
        'Implemented comprehensive monitoring solution with real-time metrics, log aggregation, distributed tracing, and intelligent alerting for microservices architecture.',
      achievements: [
        { text: 'MTTR reduced by 70%' },
        { text: '360° system visibility' },
        { text: 'Proactive alerting system' },
      ],
      links: [
        { icon: 'bx-book-open', text: 'Learn Prometheus', dataProject: 'prometheus' },
        { icon: 'bx-book-open', text: 'Learn Grafana', dataProject: 'grafana' },
      ],
    },
    {
      icon: 'bx-shield-quarter',
      techStack: ['OWASP ZAP', 'Vault', 'Falco'],
      title: 'DevSecOps Security Pipeline',
      description:
        'Integrated security scanning and compliance automation into CI/CD pipeline with vulnerability management, secrets rotation, and runtime security monitoring.',
      achievements: [
        { text: 'Automated vulnerability scanning' },
        { text: 'Zero secrets in code' },
        { text: 'Compliance automation' },
      ],
      links: [
        { icon: 'bx-book-open', text: 'Learn DevSecOps', dataProject: 'devsecops' },
        { icon: 'bx-book-open', text: 'Learn Security', dataProject: 'security' },
      ],
    },
    {
      icon: 'bx-data',
      techStack: ['PostgreSQL', 'Redis', 'Ansible'],
      title: 'Database Operations Automation',
      description:
        'Automated database provisioning, backup, monitoring, and scaling with high availability setup and disaster recovery procedures for critical systems.',
      achievements: [
        { text: 'Automated daily backups' },
        { text: 'High availability setup' },
        { text: 'Performance optimization' },
      ],
      links: [
        { icon: 'bx-book-open', text: 'Learn PostgreSQL', dataProject: 'postgresql' },
        { icon: 'bx-book-open', text: 'Learn Ansible', dataProject: 'ansible' },
      ],
    },
  ]);

  protected handleProjectClick(project: string): void {
    console.log('Project clicked:', project);
  }
}
