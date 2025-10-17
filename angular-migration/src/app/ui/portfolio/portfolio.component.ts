import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="portfolio" class="portfolio">
      <div class="container">
        <h2>Portfolio Section</h2>
        <p>Coming soon...</p>
      </div>
    </section>
  `,
  styles: [`
    .portfolio {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      background: #2d3748;
      color: white;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {}
