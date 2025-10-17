import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contact" class="contact">
      <div class="container">
        <h2>Contact Section</h2>
        <p>Coming soon...</p>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      background: #1a202c;
      color: white;
      text-align: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
