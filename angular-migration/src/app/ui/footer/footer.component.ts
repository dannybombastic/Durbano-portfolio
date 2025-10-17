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
    @use '../../../styles/variables' as *;
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
