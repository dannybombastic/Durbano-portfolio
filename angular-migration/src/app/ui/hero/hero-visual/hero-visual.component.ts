import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-visual',
  imports: [CommonModule],
  templateUrl: './hero-visual.component.html',
  styleUrl: './hero-visual.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroVisualComponent {}
