import { ExpertiseData } from '../models/expertise.interface';
import { ServiceData } from '../models/service.interface';
import { ProjectData } from '../models/project.interface';
import { StatData } from '../models/stat.interface';
import { SocialLinkData } from '../models/social-link.interface';
import { ContactCardData } from '../models/contact-info.interface';

export const SOCIAL_LINKS: readonly SocialLinkData[] = [
  {
    icon: 'bxl-gmail',
    url: 'mailto:dannybombastic@gmail.com',
    label: 'Email',
  },
  {
    icon: 'bxl-microsoft',
    url: 'https://learn.microsoft.com/en-us/azure/',
    label: 'Azure',
  },
  {
    icon: 'bxl-github',
    url: 'https://github.com/dannybombastic',
    label: 'GitHub',
  },
  {
    icon: 'bxl-gitlab',
    url: 'https://gitlab.com/dannybombastic',
    label: 'GitLab',
  },
  {
    icon: 'bxl-linkedin',
    url: 'https://linkedin.com/in/daniel-u-665a004b',
    label: 'LinkedIn',
  },
] as const;

export const STATS_DATA: readonly StatData[] = [
  {
    number: '5+',
    label: 'Years Experience',
  },
  {
    number: '50+',
    label: 'Projects Completed',
  },
  {
    number: '24/7',
    label: 'System Reliability',
  },
] as const;

export const EXPERTISE_DATA: readonly ExpertiseData[] = [
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
    description: 'ELK stack, Prometheus, Grafana for comprehensive system monitoring',
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
] as const;

export const SERVICES_DATA: readonly ServiceData[] = [
  {
    icon: 'bx-recycle',
    title: 'Application Lifecycle',
    description:
      'Complete ALM methodology and tools to manage application lifecycle from development to maintenance.',
    features: ['Version Control', 'Release Management', 'Quality Assurance'],
    serviceId: 'alm',
  },
  {
    icon: 'bx-pie-chart',
    title: 'Monitoring & Analytics',
    description:
      'Real-time system monitoring with Prometheus, Grafana, and ELK stack for optimal performance insights.',
    features: ['Performance Metrics', 'Log Analysis', 'Alert Management'],
    serviceId: 'monitoring',
  },
  {
    icon: 'bx-support',
    title: 'DevOps Consultation',
    description:
      'Expert guidance on DevOps implementation, best practices, and organizational transformation.',
    features: ['Process Optimization', 'Team Training', 'Strategy Planning'],
    serviceId: 'consultation',
  },
  {
    icon: 'bx-server',
    title: 'Infrastructure as Code',
    description:
      'Automated infrastructure provisioning and management using Terraform, Ansible, and cloud-native tools.',
    features: ['Cloud Automation', 'Infrastructure Scaling', 'Cost Optimization'],
    serviceId: 'infrastructure',
  },
] as const;

export const PROJECTS_DATA: readonly ProjectData[] = [
  {
    icon: 'bxl-kubernetes',
    techStack: ['Kubernetes', 'Docker', 'Helm'],
    title: 'Enterprise Kubernetes Platform',
    description:
      'Designed and implemented a production-ready Kubernetes cluster supporting 50+ microservices with automated scaling, monitoring, and disaster recovery capabilities.',
    achievements: [
      { icon: 'bx-check-circle', text: '99.9% uptime achieved' },
      { icon: 'bx-check-circle', text: '50% cost reduction' },
      { icon: 'bx-check-circle', text: 'Auto-scaling implemented' },
    ],
    links: [
      { icon: 'bx-book-open', text: 'Learn Kubernetes', projectId: 'kubernetes' },
      { icon: 'bx-book-open', text: 'Learn Docker', projectId: 'docker' },
    ],
  },
  {
    icon: 'bxl-gitlab',
    techStack: ['GitLab CI', 'Jenkins', 'SonarQube'],
    title: 'Multi-Environment CI/CD Pipeline',
    description:
      'Built comprehensive CI/CD pipeline supporting automated testing, security scanning, and deployment across development, staging, and production environments.',
    achievements: [
      { icon: 'bx-check-circle', text: 'Deployment time: 2 hours → 15 minutes' },
      { icon: 'bx-check-circle', text: 'Zero-downtime deployments' },
      { icon: 'bx-check-circle', text: 'Automated security scans' },
    ],
    links: [
      { icon: 'bx-book-open', text: 'Learn GitLab CI', projectId: 'gitlab-ci' },
      { icon: 'bx-book-open', text: 'Learn Jenkins', projectId: 'jenkins' },
    ],
  },
  {
    icon: 'bxl-aws',
    techStack: ['Terraform', 'AWS', 'CloudFormation'],
    title: 'Cloud Infrastructure Automation',
    description:
      'Developed Terraform modules for AWS infrastructure provisioning with automated backup strategies, monitoring, and compliance enforcement across multiple regions.',
    achievements: [
      { icon: 'bx-check-circle', text: 'Infrastructure provisioning: 3 days → 30 minutes' },
      { icon: 'bx-check-circle', text: 'Multi-region deployment' },
      { icon: 'bx-check-circle', text: 'Automated compliance checks' },
    ],
    links: [
      { icon: 'bx-book-open', text: 'Learn Terraform', projectId: 'terraform' },
      { icon: 'bx-book-open', text: 'Learn AWS', projectId: 'aws' },
    ],
  },
  {
    icon: 'bx-line-chart',
    techStack: ['Prometheus', 'Grafana', 'ELK Stack'],
    title: 'Complete Observability Platform',
    description:
      'Implemented comprehensive monitoring solution with real-time metrics, log aggregation, distributed tracing, and intelligent alerting for microservices architecture.',
    achievements: [
      { icon: 'bx-check-circle', text: 'MTTR reduced by 70%' },
      { icon: 'bx-check-circle', text: '360° system visibility' },
      { icon: 'bx-check-circle', text: 'Proactive alerting system' },
    ],
    links: [
      { icon: 'bx-book-open', text: 'Learn Prometheus', projectId: 'prometheus' },
      { icon: 'bx-book-open', text: 'Learn Grafana', projectId: 'grafana' },
    ],
  },
  {
    icon: 'bx-shield-quarter',
    techStack: ['OWASP ZAP', 'Vault', 'Falco'],
    title: 'DevSecOps Security Pipeline',
    description:
      'Integrated security scanning and compliance automation into CI/CD pipeline with vulnerability management, secrets rotation, and runtime security monitoring.',
    achievements: [
      { icon: 'bx-check-circle', text: 'Automated vulnerability scanning' },
      { icon: 'bx-check-circle', text: 'Zero secrets in code' },
      { icon: 'bx-check-circle', text: 'Compliance automation' },
    ],
    links: [
      { icon: 'bx-book-open', text: 'Learn DevSecOps', projectId: 'devsecops' },
      { icon: 'bx-book-open', text: 'Learn Security', projectId: 'security' },
    ],
  },
  {
    icon: 'bx-data',
    techStack: ['PostgreSQL', 'Redis', 'Ansible'],
    title: 'Database Operations Automation',
    description:
      'Automated database provisioning, backup, monitoring, and scaling with high availability setup and disaster recovery procedures for critical systems.',
    achievements: [
      { icon: 'bx-check-circle', text: 'Automated daily backups' },
      { icon: 'bx-check-circle', text: 'High availability setup' },
      { icon: 'bx-check-circle', text: 'Performance optimization' },
    ],
    links: [
      { icon: 'bx-book-open', text: 'Learn PostgreSQL', projectId: 'postgresql' },
      { icon: 'bx-book-open', text: 'Learn Ansible', projectId: 'ansible' },
    ],
  },
] as const;

export const CONTACT_CARDS: readonly ContactCardData[] = [
  {
    icon: 'bxl-gmail',
    title: 'Email',
    description: 'Get in touch via email',
    linkText: 'dannybombastic@gmail.com',
    linkUrl:
      'mailto:dannybombastic@gmail.com?subject=DevOps Consultation&body=Hi Daniel,%0D%0A%0D%0AI\'m interested in discussing DevOps solutions...',
  },
  {
    icon: 'bxl-whatsapp',
    title: 'WhatsApp',
    description: 'Quick consultation chat',
    linkText: '+34 633 437 069',
    linkUrl:
      'https://api.whatsapp.com/send?phone=+34633437069&text=Hello Daniel! I\'m interested in DevOps services.',
  },
  {
    icon: 'bxl-linkedin',
    title: 'LinkedIn',
    description: 'Professional networking',
    linkText: 'Connect on LinkedIn',
    linkUrl: 'https://linkedin.com/in/daniel-u-665a004b',
  },
] as const;
