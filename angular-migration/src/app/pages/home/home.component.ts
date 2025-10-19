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
    const baseUrl = 'https://danielurbano.com';
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
