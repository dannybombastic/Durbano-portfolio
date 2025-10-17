# 📦 Código Completo - Parte 6: Footer, Home Page, App Root y Config

## 🦶 FOOTER COMPONENT

### Footer Component (src/app/ui/footer/footer.component.ts)
```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SocialLinksComponent } from '@app/shared/components/social-links/social-links.component';
import { SOCIAL_LINKS } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialLinksComponent],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <h3 class="footer-brand">Daniel Urbano</h3>
            <p class="footer-text">
              DevOps Engineer specializing in CI/CD, cloud infrastructure, and automation.
            </p>
          </div>
          <div class="footer-links">
            <h4 class="footer-title">Quick Links</h4>
            <nav class="footer-nav">
              <a href="#about">About</a>
              <a href="#expertise">Expertise</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div class="footer-social">
            <h4 class="footer-title">Connect</h4>
            <app-social-links [links]="socialLinks"></app-social-links>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="copyright">
            &copy; {{ currentYear }} Daniel Urbano. All rights reserved.
          </p>
          <p class="built-with">
            Built with Angular {{ angularVersion }} & TypeScript
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @import 'variables';
    .footer {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      padding: 4rem 0 2rem;
    }
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .footer-brand {
      font-size: 1.5rem;
      color: $text-light;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    .footer-text {
      color: $text-muted;
      line-height: 1.6;
      max-width: 400px;
    }
    .footer-title {
      color: $text-light;
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    .footer-nav {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      a {
        color: $text-muted;
        text-decoration: none;
        transition: $transition-smooth;
        &:hover {
          color: $primary-color;
          padding-left: 5px;
        }
      }
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      color: $text-muted;
      font-size: 0.875rem;
    }
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly socialLinks = SOCIAL_LINKS;
  readonly currentYear = new Date().getFullYear();
  readonly angularVersion = '20';
}
```

### Footer Test (src/app/ui/footer/footer.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year', () => {
    const year = new Date().getFullYear();
    expect(component.currentYear).toBe(year);
  });
});
```

---

## 🏠 HOME PAGE COMPONENT

### Home Component (src/app/pages/home/home.component.ts)
```typescript
import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { HeroComponent } from '@app/ui/hero/hero.component';
import { AboutComponent } from '@app/ui/about/about.component';
import { ExpertiseComponent } from '@app/ui/expertise/expertise.component';
import { ServicesComponent } from '@app/ui/services/services.component';
import { PortfolioComponent } from '@app/ui/portfolio/portfolio.component';
import { ContactComponent } from '@app/ui/contact/contact.component';
import { SeoService, SeoMetaTags } from '@app/core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ExpertiseComponent,
    ServicesComponent,
    PortfolioComponent,
    ContactComponent,
  ],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-expertise></app-expertise>
    <app-services></app-services>
    <app-portfolio></app-portfolio>
    <app-contact></app-contact>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.setupSeo();
  }

  private setupSeo(): void {
    const baseUrl = 'https://danielurbano.dev';
    const seoConfig: SeoMetaTags = {
      title: 'Daniel Urbano - DevOps Engineer & Cloud Architect',
      description:
        'Expert DevOps Engineer specializing in CI/CD pipelines, Kubernetes, Docker, Infrastructure as Code (Terraform), and cloud platforms (AWS, Azure, GCP). 5+ years building scalable, automated systems.',
      canonical: baseUrl,
      openGraph: {
        title: 'Daniel Urbano - DevOps Engineer & Cloud Architect',
        type: 'website',
        url: baseUrl,
        image: `${baseUrl}/img/Daniel_Urbano.webp`,
        description:
          'Expert DevOps Engineer with 5+ years experience in CI/CD, Kubernetes, Docker, and cloud infrastructure automation.',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Daniel Urbano - DevOps Engineer',
        description: 'Building scalable, automated DevOps solutions with Kubernetes, Docker & CI/CD',
        image: `${baseUrl}/img/Daniel_Urbano.webp`,
      },
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Daniel Urbano',
        jobTitle: 'DevOps Engineer',
        url: baseUrl,
        image: `${baseUrl}/img/Daniel_Urbano.webp`,
        sameAs: [
          'https://github.com/dannybombastic',
          'https://gitlab.com/dannybombastic',
          'https://linkedin.com/in/daniel-u-665a004b',
        ],
        knowsAbout: [
          'DevOps',
          'CI/CD',
          'Kubernetes',
          'Docker',
          'Terraform',
          'AWS',
          'Azure',
          'GitLab CI',
          'Jenkins',
          'Infrastructure as Code',
        ],
      },
    };

    this.seoService.setMetaTags(seoConfig);
  }
}
```

### Home Test (src/app/pages/home/home.component.spec.ts)
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '@app/core/services/seo.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let seoService: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const seoSpy = jasmine.createSpyObj('SeoService', ['setMetaTags']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: SeoService, useValue: seoSpy }],
    }).compileComponents();

    seoService = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seoService.setMetaTags on init', () => {
    expect(seoService.setMetaTags).toHaveBeenCalled();
  });
});
```

---

## 🎯 APP ROOT COMPONENT

### App Component (src/app/app.component.ts)
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Daniel Urbano - DevOps Portfolio';
}
```

### App HTML (src/app/app.component.html)
```html
<app-header></app-header>
<main class="main-content">
  <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```

### App SCSS (src/app/app.component.scss)
```scss
@import 'variables';

:host {
  display: block;
  min-height: 100vh;
}

.main-content {
  padding-top: 70px;
  min-height: calc(100vh - 70px);
}
```

### App Test (src/app/app.component.spec.ts)
```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Daniel Urbano - DevOps Portfolio' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Daniel Urbano - DevOps Portfolio');
  });
});
```

---

## 🗂️ SCSS UTILITIES

### Mixins (src/styles/_mixins.scss)
```scss
@import 'variables';

@mixin responsive($breakpoint, $type: 'min') {
  @if $type == 'min' {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  } @else {
    @media (max-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px,
);

@mixin container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 2rem;

  @include responsive(md, 'max') {
    padding: 0 1rem;
  }
}

@mixin glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@mixin gradient-text($gradient: $primary-gradient) {
  background: $gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Typography (src/styles/_typography.scss)
```scss
@import 'variables';

body {
  font-family: $font-primary;
  font-size: 16px;
  line-height: 1.6;
  color: $text-dark;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  background: $primary-gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &.dark {
    background: $dark-gradient;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.section-subtitle {
  text-align: center;
  font-size: 1.125rem;
  color: $text-muted;
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
```

### Animations (src/styles/_animations.scss)
```scss
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Utilities (src/styles/_utilities.scss)
```scss
@import 'variables';

.container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 2rem;
}

.text-center {
  text-align: center;
}

.text-gradient {
  background: $primary-gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// Spacing utilities
@for $i from 1 through 8 {
  .mt-#{$i} {
    margin-top: #{$i * 0.5}rem;
  }
  .mb-#{$i} {
    margin-bottom: #{$i * 0.5}rem;
  }
  .pt-#{$i} {
    padding-top: #{$i * 0.5}rem;
  }
  .pb-#{$i} {
    padding-bottom: #{$i * 0.5}rem;
  }
}
```

### Main Styles (src/styles.scss)
```scss
@import 'variables';
@import 'mixins';
@import 'typography';
@import 'animations';
@import 'utilities';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: $font-primary;
  background: #f7fafc;
  overflow-x: hidden;
}

// Scrollbar styling
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1a202c;
}

::-webkit-scrollbar-thumb {
  background: $primary-gradient;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: $accent-gradient;
}

// Selection styling
::selection {
  background: rgba(102, 126, 234, 0.3);
  color: $text-dark;
}
```

---

**Continúa con la parte final: package.json, angular.json, y archivos de configuración...**
