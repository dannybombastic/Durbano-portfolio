# 📦 Código Completo - Parte 4: TODAS las Secciones de Componentes

## 🦸 HERO SECTION

### Hero Component (src/app/ui/hero/hero.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroContentComponent } from './hero-content/hero-content.component';
import { HeroVisualComponent } from './hero-visual/hero-visual.component';
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeroContentComponent, HeroVisualComponent, ScrollIndicatorComponent],
  template: `
    <section class="hero" id="home">
      <div class="container">
        <div class="hero-grid">
          <app-hero-content></app-hero-content>
          <app-hero-visual></app-hero-visual>
        </div>
        <app-scroll-indicator></app-scroll-indicator>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      padding-top: 5rem;
      position: relative;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
      }
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
```

### Hero Content (src/app/ui/hero/hero-content/hero-content.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  selector: 'app-hero-content',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="greeting">Hi, I'm</span>
        <span class="name">Daniel Urbano</span>
        <span class="role">DevOps Engineer</span>
      </h1>
      <p class="hero-description">
        Transforming development workflows through automation, cloud infrastructure,
        and continuous delivery practices. Building reliable, scalable systems that empower teams.
      </p>
      <div class="hero-actions">
        <app-button variant="primary" size="lg" icon="bxs-paper-plane">
          Contact Me
        </app-button>
        <app-button variant="outline" size="lg" icon="bx-download">
          Download CV
        </app-button>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'animations';
    .hero-content {
      animation: fadeInUp 0.8s ease-out;
    }
    .hero-title {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .greeting {
      font-size: 1.5rem;
      color: $text-muted;
      font-weight: 500;
    }
    .name {
      font-size: 4rem;
      font-weight: 800;
      background: $primary-gradient;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
    }
    .role {
      font-size: 2rem;
      color: $text-light;
      font-weight: 600;
    }
    .hero-description {
      font-size: 1.125rem;
      line-height: 1.8;
      color: $text-muted;
      margin-bottom: 2rem;
      max-width: 600px;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    @media (max-width: 768px) {
      .name { font-size: 2.5rem; }
      .role { font-size: 1.5rem; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroContentComponent {}
```

### Hero Visual (src/app/ui/hero/hero-visual/hero-visual.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-visual">
      <div class="profile-card">
        <img src="/img/Daniel_Urbano.webp" alt="Daniel Urbano" class="profile-image">
        <div class="floating-icons">
          <i class="bx bxl-docker icon"></i>
          <i class="bx bxl-kubernetes icon"></i>
          <i class="bx bxl-git icon"></i>
          <i class="bx bxl-aws icon"></i>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'animations';
    .hero-visual {
      animation: fadeInRight 0.8s ease-out 0.2s both;
    }
    .profile-card {
      position: relative;
      max-width: 500px;
      margin: 0 auto;
    }
    .profile-image {
      width: 100%;
      height: auto;
      border-radius: $border-radius;
      box-shadow: $shadow-strong;
      border: 3px solid rgba(102, 126, 234, 0.3);
    }
    .floating-icons {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .icon {
      position: absolute;
      font-size: 3rem;
      color: $primary-color;
      animation: float 3s ease-in-out infinite;
      &:nth-child(1) { top: 10%; left: -10%; animation-delay: 0s; }
      &:nth-child(2) { top: 20%; right: -10%; animation-delay: 0.5s; }
      &:nth-child(3) { bottom: 30%; left: -15%; animation-delay: 1s; }
      &:nth-child(4) { bottom: 10%; right: -5%; animation-delay: 1.5s; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisualComponent {}
```

### Scroll Indicator (src/app/ui/hero/scroll-indicator/scroll-indicator.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  template: `
    <div class="scroll-indicator" (click)="scrollToNext()">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="scroll-text">Scroll Down</div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'animations';
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      animation: bounce 2s infinite;
    }
    .mouse {
      width: 30px;
      height: 50px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      padding-top: 8px;
    }
    .wheel {
      width: 4px;
      height: 10px;
      background: $primary-color;
      border-radius: 2px;
      animation: scroll 1.5s infinite;
    }
    .scroll-text {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    @keyframes scroll {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(10px); opacity: 0; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollIndicatorComponent {
  scrollToNext(): void {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  }
}
```

---

## 👤 ABOUT SECTION

### About Component (src/app/ui/about/about.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsVisualizationComponent } from './skills-visualization/skills-visualization.component';
import { StatsGridComponent } from './stats-grid/stats-grid.component';
import { STATS_DATA } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SkillsVisualizationComponent, StatsGridComponent],
  template: `
    <section class="about" id="about">
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-grid">
          <div class="about-content">
            <h3 class="about-subtitle">DevOps Engineer & Cloud Architect</h3>
            <p class="about-text">
              With over 5 years of experience in DevOps and cloud infrastructure, 
              I specialize in building automated, scalable, and resilient systems. 
              My expertise spans across CI/CD pipelines, container orchestration, 
              infrastructure as code, and cloud-native architectures.
            </p>
            <p class="about-text">
              I'm passionate about improving developer experience through automation,
              implementing robust monitoring solutions, and fostering DevOps culture 
              within organizations. My goal is to bridge the gap between development 
              and operations, enabling teams to deliver value faster and more reliably.
            </p>
            <app-stats-grid [stats]="stats"></app-stats-grid>
          </div>
          <app-skills-visualization></app-skills-visualization>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    .about {
      padding: $section-padding;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      margin-top: 3rem;
    }
    .about-subtitle {
      font-size: 1.75rem;
      color: $text-dark;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }
    .about-text {
      font-size: 1.125rem;
      line-height: 1.8;
      color: $text-muted;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 992px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly stats = STATS_DATA;
}
```

### Skills Visualization (src/app/ui/about/skills-visualization/skills-visualization.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-skills-visualization',
  standalone: true,
  template: `
    <div class="skills-visual">
      <div class="skill-circle" [style.--delay]="'0s'">
        <i class="bx bxl-docker"></i>
        <span>Docker</span>
      </div>
      <div class="skill-circle" [style.--delay]="'0.1s'">
        <i class="bx bxl-kubernetes"></i>
        <span>K8s</span>
      </div>
      <div class="skill-circle" [style.--delay]="'0.2s'">
        <i class="bx bxl-aws"></i>
        <span>AWS</span>
      </div>
      <div class="skill-circle" [style.--delay]="'0.3s'">
        <i class="bx bxl-git"></i>
        <span>Git</span>
      </div>
      <div class="skill-circle" [style.--delay]="'0.4s'">
        <i class="bx bxl-gitlab"></i>
        <span>GitLab</span>
      </div>
      <div class="skill-circle" [style.--delay]="'0.5s'">
        <i class="bx bx-data"></i>
        <span>Terraform</span>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    .skills-visual {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
    .skill-circle {
      aspect-ratio: 1;
      background: white;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      box-shadow: $shadow-soft;
      transition: $transition-smooth;
      animation: fadeInScale 0.6s ease-out var(--delay) both;
      i {
        font-size: 3rem;
        background: $primary-gradient;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      span {
        font-size: 0.875rem;
        font-weight: 600;
        color: $text-dark;
      }
      &:hover {
        transform: translateY(-10px) scale(1.05);
        box-shadow: $shadow-medium;
      }
    }
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsVisualizationComponent {}
```

### Stats Grid (src/app/ui/about/stats-grid/stats-grid.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatItemComponent } from './stat-item/stat-item.component';
import { StatData } from '@app/core/models/stat.interface';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule, StatItemComponent],
  template: `
    <div class="stats-grid">
      @for (stat of stats(); track $index) {
        <app-stat-item [stat]="stat"></app-stat-item>
      }
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 2rem;
    }
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsGridComponent {
  readonly stats = input.required<readonly StatData[]>();
}
```

### Stat Item (src/app/ui/about/stats-grid/stat-item/stat-item.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { StatData } from '@app/core/models/stat.interface';

@Component({
  selector: 'app-stat-item',
  standalone: true,
  template: `
    <div class="stat-item">
      <div class="stat-number">{{ stat().number }}</div>
      <div class="stat-label">{{ stat().label }}</div>
    </div>
  `,
  styles: [`
    @import 'variables';
    .stat-item {
      text-align: center;
      padding: 1.5rem;
      background: white;
      border-radius: $border-radius-sm;
      box-shadow: $shadow-soft;
      transition: $transition-smooth;
      &:hover {
        transform: translateY(-5px);
        box-shadow: $shadow-medium;
      }
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      background: $primary-gradient;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }
    .stat-label {
      font-size: 0.875rem;
      color: $text-muted;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatItemComponent {
  readonly stat = input.required<StatData>();
}
```

---

**Debido al límite de caracteres, continuaré con las secciones restantes en el siguiente archivo...**
