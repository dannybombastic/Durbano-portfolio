import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  iconClass: string;
  isVisible: boolean;
  skills: { name: string; icon: string }[];
}

interface Bubble {
  left: number;
  delay: number;
}

interface Particle {
  left: number;
  top: number;
  size: number;
  delay: number;
}

@Component({
  selector: 'app-learning-journey',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './learning-journey.html',
  styleUrl: './learning-journey.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningJourneyComponent implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  bubbles: Bubble[] = [
    { left: 10, delay: 0 },
    { left: 20, delay: 2 },
    { left: 85, delay: 4 },
    { left: 70, delay: 6 },
    { left: 40, delay: 8 },
    { left: 60, delay: 1 },
    { left: 30, delay: 5 }
  ];

  particles: Particle[] = [
    { left: 15, top: 60, size: 8, delay: 0 },
    { left: 75, top: 40, size: 12, delay: 2 },
    { left: 50, top: 70, size: 6, delay: 4 },
    { left: 90, top: 80, size: 10, delay: 6 }
  ];

  timelineItems: TimelineItem[] = [
    {
      id: 1,
      date: 'May 2016',
      title: 'First Steps into Frontend',
      description: 'Started my journey with HTML and CSS fundamentals, then discovered the power of Angular framework. This marked the beginning of my passion for web development and structured programming approaches.',
      iconClass: 'bx bx-code-alt',
      isVisible: false,
      skills: [
        { name: 'HTML5', icon: 'bx bxl-html5' },
        { name: 'CSS3', icon: 'bx bxl-css3' },
        { name: 'Angular', icon: 'bx bxl-angular' }
      ]
    },
    {
      id: 2,
      date: 'August 2017',
      title: 'Backend Mastery Journey',
      description: 'Expanded into backend development with Java as the foundation, then explored multiple technologies including PHP, Symfony, and Python. Leveraged platforms like Udemy and YouTube for continuous learning and skill enhancement.',
      iconClass: 'bx bx-server',
      isVisible: false,
      skills: [
        { name: 'Java', icon: 'bx bxl-java' },
        { name: 'PHP', icon: 'bx bxl-php' },
        { name: 'Python', icon: 'bx bxl-python' },
        { name: 'Symfony', icon: 'bx bx-data' }
      ]
    },
    {
      id: 3,
      date: 'September 2018',
      title: 'Intensive BootCamp Training',
      description: 'Enrolled in a comprehensive development bootcamp to formalize and consolidate years of self-directed learning. This intensive program provided structured knowledge, industry best practices, and valuable networking opportunities.',
      iconClass: 'bx bx-brain',
      isVisible: false,
      skills: [
        { name: 'Full-Stack', icon: 'bx bx-brain' },
        { name: 'Team Work', icon: 'bx bx-group' },
        { name: 'Best Practices', icon: 'bx bx-trending-up' }
      ]
    },
    {
      id: 4,
      date: 'October 2019',
      title: 'Professional Debut at Voz Plus',
      description: 'Secured my first professional development role at Voz Plus. This pivotal experience introduced me to enterprise-level development practices, collaborative workflows, and real-world project challenges.',
      iconClass: 'bx bx-buildings',
      isVisible: false,
      skills: [
        { name: 'Professional Dev', icon: 'bx bx-briefcase' },
        { name: 'Version Control', icon: 'bx bx-git-branch' },
        { name: 'Project Management', icon: 'bx bx-task' }
      ]
    },
    {
      id: 5,
      date: '2020 - 2024',
      title: 'Career Evolution & Specialization',
      description: 'Progressed through multiple companies, continuously refining skills and discovering my passion for DevOps practices. Each role brought new challenges and opportunities to master infrastructure automation, CI/CD pipelines, and cloud technologies.',
      iconClass: 'bx bx-rocket',
      isVisible: false,
      skills: [
        { name: 'DevOps', icon: 'bx bx-cog' },
        { name: 'Cloud Computing', icon: 'bx bx-cloud' },
        { name: 'CI/CD', icon: 'bx bx-infinite' }
      ]
    },
    {
      id: 6,
      date: 'Present',
      title: 'Senior DevOps Engineer',
      description: "Currently thriving as a Senior DevOps Engineer at EngineersCode, where I've been for over 4 years. Specializing in CI/CD pipeline architecture, infrastructure automation, and cloud-native solutions that drive business efficiency and innovation.",
      iconClass: 'bx bx-trophy',
      isVisible: false,
      skills: [
        { name: 'Senior DevOps', icon: 'bx bx-shield' },
        { name: 'Infrastructure', icon: 'bx bx-chip' },
        { name: 'Leadership', icon: 'bx bx-trending-up' },
        { name: 'Automation', icon: 'bx bx-analyse' }
      ]
    }
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setupIntersectionObserver();
    this.setupScrollEffects();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    const options = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target as Element);
          setTimeout(() => {
            const itemId = parseInt(entry.target.getAttribute('data-id') || '0');
            const item = this.timelineItems.find(i => i.id === itemId);
            if (item) {
              item.isVisible = true;
            }
          }, index * 150);
        }
      });
    }, options);

    // Wait for DOM to be ready
    setTimeout(() => {
      const items = this.elementRef.nativeElement.querySelectorAll('.timeline-item');
      items.forEach((item: Element, index: number) => {
        item.setAttribute('data-id', this.timelineItems[index].id.toString());
        this.observer?.observe(item);
      });
    }, 100);
  }

  private setupScrollEffects(): void {
    window.addEventListener('scroll', () => {
      const timelineLine = this.elementRef.nativeElement.querySelector('.timeline-line');
      if (timelineLine) {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const maxHeight = Math.min(scrollPercent * 200, 100);
        timelineLine.style.background = `linear-gradient(to bottom, 
          #ff69b4 0%, 
          #ff1493 ${maxHeight}%, 
          transparent ${maxHeight}%)`;
      }
    });
  }
}
