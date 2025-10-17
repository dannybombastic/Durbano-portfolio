import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { SocialLinksComponent } from '@app/shared/components/social-links/social-links.component';
import { SOCIAL_LINKS } from '@app/core/constants/portfolio-data';

@Component({
  selector: 'app-hero-content',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SocialLinksComponent],
  templateUrl: './hero-content.component.html',
  styleUrl: './hero-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroContentComponent {
  readonly socialLinks = SOCIAL_LINKS;
}
