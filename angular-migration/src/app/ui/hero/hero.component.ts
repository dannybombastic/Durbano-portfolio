import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroContentComponent } from './hero-content/hero-content.component';
import { HeroVisualComponent } from './hero-visual/hero-visual.component';
import { ScrollIndicatorComponent } from './scroll-indicator/scroll-indicator.component';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, HeroContentComponent, HeroVisualComponent, ScrollIndicatorComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
