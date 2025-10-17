# 📦 Código Completo - Parte 5: Expertise, Services, Portfolio y Contact

## 💡 EXPERTISE SECTION

### Expertise Component (src/app/ui/expertise/expertise.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExpertiseGridComponent } from './expertise-grid/expertise-grid.component';
import { EXPERTISE_DATA } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [ExpertiseGridComponent],
  template: `
    <section class="expertise" id="expertise">
      <div class="container">
        <h2 class="section-title">Areas of Expertise</h2>
        <p class="section-subtitle">
          Comprehensive DevOps skills across the entire software delivery lifecycle
        </p>
        <app-expertise-grid [items]="expertiseItems"></app-expertise-grid>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    .expertise {
      padding: $section-padding;
      background: $bg-dark;
    }
    .section-subtitle {
      text-align: center;
      color: $text-muted;
      font-size: 1.125rem;
      margin-top: 1rem;
      margin-bottom: 3rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseComponent {
  readonly expertiseItems = EXPERTISE_DATA;
}
```

### Expertise Grid (src/app/ui/expertise/expertise-grid/expertise-grid.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertiseCardComponent } from './expertise-card/expertise-card.component';
import { ExpertiseData } from '@app/core/models/expertise.interface';

@Component({
  selector: 'app-expertise-grid',
  standalone: true,
  imports: [CommonModule, ExpertiseCardComponent],
  template: `
    <div class="expertise-grid">
      @for (item of items(); track item.title) {
        <app-expertise-card [data]="item"></app-expertise-card>
      }
    </div>
  `,
  styles: [`
    .expertise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseGridComponent {
  readonly items = input.required<readonly ExpertiseData[]>();
}
```

### Expertise Card (src/app/ui/expertise/expertise-grid/expertise-card/expertise-card.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ExpertiseData } from '@app/core/models/expertise.interface';
import { IconComponent } from '@app/shared/components/icon/icon.component';

@Component({
  selector: 'app-expertise-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="expertise-card">
      <div class="card-icon">
        <app-icon [name]="data().icon" size="3rem"></app-icon>
      </div>
      <h3 class="card-title">{{ data().title }}</h3>
      <p class="card-description">{{ data().description }}</p>
    </div>
  `,
  styles: [`
    @import 'variables';
    .expertise-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: $border-radius;
      padding: 2rem;
      text-align: center;
      transition: $transition-smooth;
      &:hover {
        transform: translateY(-10px);
        background: rgba(255, 255, 255, 0.08);
        box-shadow: $glow-primary;
      }
    }
    .card-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $primary-gradient;
      border-radius: 50%;
      color: white;
    }
    .card-title {
      font-size: 1.5rem;
      color: $text-light;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    .card-description {
      color: $text-muted;
      line-height: 1.6;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseCardComponent {
  readonly data = input.required<ExpertiseData>();
}
```

---

## 🛠️ SERVICES SECTION

### Services Component (src/app/ui/services/services.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ServiceGridComponent } from './service-grid/service-grid.component';
import { SERVICES_DATA } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceGridComponent],
  template: `
    <section class="services" id="services">
      <div class="container">
        <h2 class="section-title dark">What I Offer</h2>
        <p class="section-subtitle dark">
          Professional DevOps services tailored to your needs
        </p>
        <app-service-grid [services]="servicesData"></app-service-grid>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    .services {
      padding: $section-padding;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    }
    .section-subtitle.dark {
      color: $text-muted;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  readonly servicesData = SERVICES_DATA;
}
```

### Service Grid (src/app/ui/services/service-grid/service-grid.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ServiceData } from '@app/core/models/service.interface';

@Component({
  selector: 'app-service-grid',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  template: `
    <div class="service-grid">
      @for (service of services(); track service.serviceId) {
        <app-service-card [service]="service"></app-service-card>
      }
    </div>
  `,
  styles: [`
    .service-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceGridComponent {
  readonly services = input.required<readonly ServiceData[]>();
}
```

### Service Card (src/app/ui/services/service-grid/service-card/service-card.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceData } from '@app/core/models/service.interface';
import { IconComponent } from '@app/shared/components/icon/icon.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="service-card">
      <div class="service-icon">
        <app-icon [name]="service().icon" size="2.5rem"></app-icon>
      </div>
      <h3 class="service-title">{{ service().title }}</h3>
      <p class="service-description">{{ service().description }}</p>
      <ul class="service-features">
        @for (feature of service().features; track feature) {
          <li><i class="bx bx-check"></i>{{ feature }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    @import 'variables';
    .service-card {
      background: white;
      border-radius: $border-radius;
      padding: 2.5rem;
      box-shadow: $shadow-soft;
      transition: $transition-smooth;
      &:hover {
        transform: translateY(-10px);
        box-shadow: $shadow-medium;
      }
    }
    .service-icon {
      width: 70px;
      height: 70px;
      background: $primary-gradient;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-bottom: 1.5rem;
    }
    .service-title {
      font-size: 1.5rem;
      color: $text-dark;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    .service-description {
      color: $text-muted;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .service-features {
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: $text-muted;
        margin-bottom: 0.75rem;
        i {
          color: $primary-color;
          font-size: 1.25rem;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceData>();
}
```

---

## 📁 PORTFOLIO SECTION

### Portfolio Component (src/app/ui/portfolio/portfolio.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PortfolioGridComponent } from './portfolio-grid/portfolio-grid.component';
import { PROJECTS_DATA } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [PortfolioGridComponent],
  template: `
    <section class="portfolio" id="portfolio">
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <p class="section-subtitle">
          Real-world DevOps implementations and success stories
        </p>
        <app-portfolio-grid [projects]="projectsData"></app-portfolio-grid>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    .portfolio {
      padding: $section-padding;
      background: $bg-dark;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  readonly projectsData = PROJECTS_DATA;
}
```

### Portfolio Grid (src/app/ui/portfolio/portfolio-grid/portfolio-grid.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProjectComponent } from './portfolio-project/portfolio-project.component';
import { ProjectData } from '@app/core/models/project.interface';

@Component({
  selector: 'app-portfolio-grid',
  standalone: true,
  imports: [CommonModule, PortfolioProjectComponent],
  template: `
    <div class="portfolio-grid">
      @for (project of projects(); track $index) {
        <app-portfolio-project [project]="project"></app-portfolio-project>
      }
    </div>
  `,
  styles: [`
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioGridComponent {
  readonly projects = input.required<readonly ProjectData[]>();
}
```

### Portfolio Project (src/app/ui/portfolio/portfolio-grid/portfolio-project/portfolio-project.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectData } from '@app/core/models/project.interface';
import { IconComponent } from '@app/shared/components/icon/icon.component';

@Component({
  selector: 'app-portfolio-project',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="project-card">
      <div class="project-header">
        <app-icon [name]="project().icon" size="2.5rem"></app-icon>
        <div class="tech-stack">
          @for (tech of project().techStack; track tech) {
            <span class="tech-badge">{{ tech }}</span>
          }
        </div>
      </div>
      <h3 class="project-title">{{ project().title }}</h3>
      <p class="project-description">{{ project().description }}</p>
      <div class="achievements">
        @for (achievement of project().achievements; track achievement.text) {
          <div class="achievement">
            <i [class]="'bx ' + achievement.icon"></i>
            <span>{{ achievement.text }}</span>
          </div>
        }
      </div>
      <div class="project-links">
        @for (link of project().links; track link.projectId) {
          <a href="#" class="project-link">
            <i [class]="'bx ' + link.icon"></i>
            {{ link.text }}
          </a>
        }
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    .project-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: $border-radius;
      padding: 2rem;
      transition: $transition-smooth;
      &:hover {
        transform: translateY(-10px);
        box-shadow: $glow-primary;
      }
    }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      app-icon { color: $primary-color; }
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tech-badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      background: rgba(102, 126, 234, 0.2);
      color: $primary-color;
      border-radius: 12px;
    }
    .project-title {
      font-size: 1.5rem;
      color: $text-light;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    .project-description {
      color: $text-muted;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .achievements {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .achievement {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $text-muted;
      font-size: 0.875rem;
      i {
        color: #48bb78;
        font-size: 1.125rem;
      }
    }
    .project-links {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .project-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $primary-color;
      text-decoration: none;
      font-size: 0.875rem;
      transition: $transition-smooth;
      &:hover {
        color: $accent-color;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioProjectComponent {
  readonly project = input.required<ProjectData>();
}
```

---

## 📧 CONTACT SECTION

### Contact Component (src/app/ui/contact/contact.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ContactVisualComponent } from './contact-visual/contact-visual.component';
import { CONTACT_CARDS } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactInfoComponent, ContactVisualComponent],
  template: `
    <section class="contact" id="contact">
      <div class="container">
        <h2 class="section-title dark">Get In Touch</h2>
        <p class="section-subtitle dark">
          Let's discuss how I can help transform your DevOps practices
        </p>
        <div class="contact-grid">
          <app-contact-info [cards]="contactCards"></app-contact-info>
          <app-contact-visual></app-contact-visual>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @import 'variables';
    .contact {
      padding: $section-padding;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      margin-top: 3rem;
    }
    @media (max-width: 992px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly contactCards = CONTACT_CARDS;
}
```

### Contact Info (src/app/ui/contact/contact-info/contact-info.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactCardData } from '@app/core/models/contact-info.interface';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, ContactCardComponent],
  template: `
    <div class="contact-info">
      @for (card of cards(); track card.linkUrl) {
        <app-contact-card [data]="card"></app-contact-card>
      }
    </div>
  `,
  styles: [`
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {
  readonly cards = input.required<readonly ContactCardData[]>();
}
```

### Contact Card (src/app/ui/contact/contact-info/contact-card/contact-card.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ContactCardData } from '@app/core/models/contact-info.interface';
import { IconComponent } from '@app/shared/components/icon/icon.component';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="contact-card">
      <div class="card-icon">
        <app-icon [name]="data().icon" size="2rem"></app-icon>
      </div>
      <div class="card-content">
        <h4 class="card-title">{{ data().title }}</h4>
        <p class="card-description">{{ data().description }}</p>
        <a [href]="data().linkUrl" target="_blank" class="card-link">
          {{ data().linkText }}
        </a>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    .contact-card {
      display: flex;
      gap: 1.5rem;
      padding: 2rem;
      background: white;
      border-radius: $border-radius-sm;
      box-shadow: $shadow-soft;
      transition: $transition-smooth;
      &:hover {
        transform: translateX(10px);
        box-shadow: $shadow-medium;
      }
    }
    .card-icon {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      background: $primary-gradient;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .card-title {
      font-size: 1.25rem;
      color: $text-dark;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }
    .card-description {
      color: $text-muted;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }
    .card-link {
      color: $primary-color;
      text-decoration: none;
      font-weight: 600;
      transition: $transition-smooth;
      &:hover {
        color: $accent-color;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCardComponent {
  readonly data = input.required<ContactCardData>();
}
```

### Contact Visual (src/app/ui/contact/contact-visual/contact-visual.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-contact-visual',
  standalone: true,
  template: `
    <div class="contact-visual">
      <div class="illustration">
        <i class="bx bx-envelope"></i>
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
  `,
  styles: [`
    @import 'variables';
    @import 'animations';
    .contact-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .illustration {
      position: relative;
      width: 300px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 6rem;
        background: $primary-gradient;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        z-index: 1;
      }
    }
    .circle {
      position: absolute;
      border-radius: 50%;
      border: 2px solid rgba(102, 126, 234, 0.2);
      animation: pulse 3s ease-in-out infinite;
    }
    .circle-1 {
      width: 200px;
      height: 200px;
      animation-delay: 0s;
    }
    .circle-2 {
      width: 250px;
      height: 250px;
      animation-delay: 1s;
    }
    .circle-3 {
      width: 300px;
      height: 300px;
      animation-delay: 2s;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactVisualComponent {}
```

---

**Continúa con Footer y archivos principales en la siguiente parte...**
