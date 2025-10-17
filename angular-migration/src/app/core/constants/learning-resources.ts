import { ServiceResources, ProjectResources } from '../interfaces/learning-resources.interface';

export const SERVICE_RESOURCES: ServiceResources = {
  alm: {
    title: 'Application Lifecycle Management',
    resources: [
      {
        name: 'Microsoft ALM Guide',
        url: 'https://learn.microsoft.com/en-us/devops/',
        description: 'Comprehensive guide to ALM concepts and practices',
      },
      {
        name: 'Atlassian ALM Best Practices',
        url: 'https://www.atlassian.com/continuous-delivery/principles/pipeline',
        description: 'Industry best practices for application lifecycle',
      },
      {
        name: 'IBM ALM Tutorial',
        url: 'https://www.ibm.com/topics/application-lifecycle-management',
        description: 'Complete tutorial on ALM tools and methodologies',
      },
    ],
  },
  monitoring: {
    title: 'Monitoring & Analytics',
    resources: [
      {
        name: 'Prometheus Documentation',
        url: 'https://prometheus.io/docs/introduction/overview/',
        description: 'Official Prometheus monitoring system documentation',
      },
      {
        name: 'Grafana Learning Path',
        url: 'https://grafana.com/tutorials/',
        description: 'Interactive tutorials for Grafana dashboards',
      },
      {
        name: 'ELK Stack Guide',
        url: 'https://www.elastic.co/guide/en/elastic-stack/current/index.html',
        description: 'Complete guide to Elasticsearch, Logstash, and Kibana',
      },
    ],
  },
  consultation: {
    title: 'DevOps Consultation',
    resources: [
      {
        name: 'DevOps Roadmap',
        url: 'https://roadmap.sh/devops',
        description: 'Complete DevOps learning roadmap and resources',
      },
      {
        name: 'AWS DevOps Learning',
        url: 'https://aws.amazon.com/devops/what-is-devops/',
        description: "Amazon's comprehensive DevOps guide",
      },
      {
        name: 'CNCF Landscape',
        url: 'https://landscape.cncf.io/',
        description: 'Cloud Native Computing Foundation tools landscape',
      },
    ],
  },
  infrastructure: {
    title: 'Infrastructure as Code',
    resources: [
      {
        name: 'Terraform Learn',
        url: 'https://learn.hashicorp.com/terraform',
        description: 'Official HashiCorp Terraform learning platform',
      },
      {
        name: 'Ansible Documentation',
        url: 'https://docs.ansible.com/ansible/latest/user_guide/index.html',
        description: 'Complete Ansible automation guide',
      },
      {
        name: 'Infrastructure as Code Guide',
        url: 'https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac',
        description: "Red Hat's comprehensive IaC guide",
      },
    ],
  },
};

export const PROJECT_RESOURCES: ProjectResources = {
  kubernetes: {
    title: 'Kubernetes Learning Resources',
    resources: [
      {
        name: 'Kubernetes Official Documentation',
        url: 'https://kubernetes.io/docs/home/',
        description: 'Comprehensive Kubernetes documentation and tutorials',
      },
      {
        name: 'Kubernetes Tutorial by Kubernetes.io',
        url: 'https://kubernetes.io/docs/tutorials/',
        description: 'Interactive tutorials to learn Kubernetes step by step',
      },
      {
        name: 'Kubernetes Fundamentals Course',
        url: 'https://www.edx.org/course/introduction-to-kubernetes',
        description: 'Free edX course covering Kubernetes fundamentals',
      },
    ],
  },
  docker: {
    title: 'Docker Learning Resources',
    resources: [
      {
        name: 'Docker Official Get Started Guide',
        url: 'https://docs.docker.com/get-started/',
        description: 'Official Docker tutorial for beginners',
      },
      {
        name: 'Docker Hub Learning Center',
        url: 'https://docs.docker.com/docker-hub/',
        description: 'Learn to use Docker Hub for container registry',
      },
      {
        name: 'Play with Docker',
        url: 'https://labs.play-with-docker.com/',
        description: 'Interactive Docker learning environment',
      },
    ],
  },
  'gitlab-ci': {
    title: 'GitLab CI/CD Learning Resources',
    resources: [
      {
        name: 'GitLab CI/CD Documentation',
        url: 'https://docs.gitlab.com/ee/ci/',
        description: 'Complete guide to GitLab CI/CD pipelines',
      },
      {
        name: 'GitLab Learn',
        url: 'https://about.gitlab.com/learn/',
        description: 'Official GitLab learning platform',
      },
      {
        name: 'GitLab CI/CD Tutorial',
        url: 'https://docs.gitlab.com/ee/ci/quick_start/',
        description: 'Quick start guide for GitLab CI/CD',
      },
    ],
  },
  jenkins: {
    title: 'Jenkins Learning Resources',
    resources: [
      {
        name: 'Jenkins Official Tutorial',
        url: 'https://www.jenkins.io/doc/tutorials/',
        description: 'Official Jenkins tutorials and guides',
      },
      {
        name: 'Jenkins User Documentation',
        url: 'https://www.jenkins.io/doc/',
        description: 'Comprehensive Jenkins documentation',
      },
      {
        name: 'Jenkins Pipeline Tutorial',
        url: 'https://www.jenkins.io/doc/book/pipeline/',
        description: 'Learn Jenkins Pipeline for CI/CD',
      },
    ],
  },
  terraform: {
    title: 'Terraform Learning Resources',
    resources: [
      {
        name: 'HashiCorp Learn Terraform',
        url: 'https://learn.hashicorp.com/terraform',
        description: 'Official HashiCorp Terraform learning platform',
      },
      {
        name: 'Terraform Documentation',
        url: 'https://www.terraform.io/docs',
        description: 'Complete Terraform documentation and guides',
      },
      {
        name: 'Terraform Best Practices',
        url: 'https://www.terraform-best-practices.com/',
        description: 'Community-driven Terraform best practices',
      },
    ],
  },
  aws: {
    title: 'AWS Learning Resources',
    resources: [
      {
        name: 'AWS Training and Certification',
        url: 'https://aws.amazon.com/training/',
        description: 'Official AWS training courses and certifications',
      },
      {
        name: 'AWS Documentation',
        url: 'https://docs.aws.amazon.com/',
        description: 'Comprehensive AWS service documentation',
      },
      {
        name: 'AWS Well-Architected',
        url: 'https://aws.amazon.com/architecture/well-architected/',
        description: 'Learn AWS architectural best practices',
      },
    ],
  },
  prometheus: {
    title: 'Prometheus Learning Resources',
    resources: [
      {
        name: 'Prometheus Official Documentation',
        url: 'https://prometheus.io/docs/',
        description: 'Complete Prometheus monitoring system guide',
      },
      {
        name: 'Prometheus Tutorial',
        url: 'https://prometheus.io/docs/tutorials/getting_started/',
        description: 'Getting started with Prometheus monitoring',
      },
      {
        name: 'PromQL Tutorial',
        url: 'https://prometheus.io/docs/prometheus/latest/querying/basics/',
        description: 'Learn Prometheus Query Language',
      },
    ],
  },
  grafana: {
    title: 'Grafana Learning Resources',
    resources: [
      {
        name: 'Grafana Official Tutorials',
        url: 'https://grafana.com/tutorials/',
        description: 'Interactive Grafana dashboard tutorials',
      },
      {
        name: 'Grafana Documentation',
        url: 'https://grafana.com/docs/',
        description: 'Complete Grafana documentation',
      },
      {
        name: 'Grafana University',
        url: 'https://grafana.com/training/',
        description: 'Official Grafana training courses',
      },
    ],
  },
  devsecops: {
    title: 'DevSecOps Learning Resources',
    resources: [
      {
        name: 'OWASP DevSecOps Guideline',
        url: 'https://owasp.org/www-project-devsecops-guideline/',
        description: 'OWASP guide to DevSecOps practices',
      },
      {
        name: 'DevSecOps Fundamentals',
        url: 'https://www.redhat.com/en/topics/devops/what-is-devsecops',
        description: 'Red Hat guide to DevSecOps fundamentals',
      },
      {
        name: 'NIST DevSecOps Guide',
        url: 'https://csrc.nist.gov/publications/detail/sp/800-218/final',
        description: 'NIST guidelines for secure software development',
      },
    ],
  },
  security: {
    title: 'Cybersecurity Learning Resources',
    resources: [
      {
        name: 'OWASP Top 10',
        url: 'https://owasp.org/www-project-top-ten/',
        description: 'Most critical web application security risks',
      },
      {
        name: 'NIST Cybersecurity Framework',
        url: 'https://www.nist.gov/cyberframework',
        description: 'Framework for improving cybersecurity',
      },
      {
        name: 'SANS Security Training',
        url: 'https://www.sans.org/free/',
        description: 'Free cybersecurity training resources',
      },
    ],
  },
  postgresql: {
    title: 'PostgreSQL Learning Resources',
    resources: [
      {
        name: 'PostgreSQL Official Tutorial',
        url: 'https://www.postgresql.org/docs/current/tutorial.html',
        description: 'Official PostgreSQL tutorial and documentation',
      },
      {
        name: 'PostgreSQL Exercises',
        url: 'https://pgexercises.com/',
        description: 'Interactive PostgreSQL exercises',
      },
      {
        name: 'PostgreSQL Performance',
        url: 'https://www.postgresql.org/docs/current/performance-tips.html',
        description: 'PostgreSQL performance tuning guide',
      },
    ],
  },
  ansible: {
    title: 'Ansible Learning Resources',
    resources: [
      {
        name: 'Ansible Documentation',
        url: 'https://docs.ansible.com/',
        description: 'Complete Ansible automation guide',
      },
      {
        name: 'Ansible Getting Started',
        url: 'https://docs.ansible.com/ansible/latest/getting_started/',
        description: 'Quick start guide for Ansible',
      },
      {
        name: 'Ansible Galaxy',
        url: 'https://galaxy.ansible.com/',
        description: 'Community hub for Ansible content',
      },
    ],
  },
};
