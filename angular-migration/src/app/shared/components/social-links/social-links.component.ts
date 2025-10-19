import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinkData } from '@app/core/models/social-link.interface';

@Component({
  selector: 'app-social-links',
  imports: [CommonModule],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinksComponent {
  readonly links = input.required<readonly SocialLinkData[]>();
}
