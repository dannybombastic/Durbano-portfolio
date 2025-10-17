import { Component, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@app/core/services/modal.service';

interface ChatAction {
  href: string;
  icon: string;
  text: string;
  class: string;
  target?: string;
  rel?: string;
}

@Component({
  selector: 'app-chat-modal',
  imports: [CommonModule],
  template: `
    @if (modalService.state().isOpen && modalService.state().type === 'chat') {
      <div class="chat-modal" (click)="onBackdropClick($event)">
        <div class="chat-modal-content" (click)="$event.stopPropagation()">
          <div class="chat-header">
            <h3>💬 Conectemos</h3>
            <button class="chat-close" (click)="closeModal()">&times;</button>
          </div>
          <div class="chat-body">
            <div class="chat-message">
              <p>¡Hola! 👋 Me alegra que quieras conectar conmigo</p>
              <br>
              <p>Puedes comunicarte conmigo através de:</p>
              <br>
              <p>📧 Email: dannybombastic&#64;gmail.com</p>
              <p>💼 LinkedIn: www.linkedin.com/in/daniel-u-665a004b</p>
              <p>💻 GitHub: github.com/dannybombastic</p>
              <p>📱 WhatsApp: +34 633 437 069</p>
              <br>
              <p>¡Espero tener noticias tuyas pronto! 🚀</p>
            </div>
            <div class="chat-actions">
              @for (action of chatActions; track action.href) {
                <a [href]="action.href" 
                   [class]="'chat-btn ' + action.class" 
                   [target]="action.target"
                   [rel]="action.rel">
                  <i [class]="'bx ' + action.icon"></i> {{ action.text }}
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './chat-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatModalComponent {
  protected readonly chatActions: ChatAction[] = [
    {
      href: 'mailto:dannybombastic@gmail.com',
      icon: 'bx-envelope',
      text: 'Email',
      class: 'email',
    },
    {
      href: 'https://www.linkedin.com/in/daniel-u-665a004b/',
      icon: 'bxl-linkedin',
      text: 'LinkedIn',
      class: 'linkedin',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
    {
      href: 'https://github.com/dannybombastic',
      icon: 'bxl-github',
      text: 'GitHub',
      class: 'github',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  constructor(public modalService: ModalService) {
    // Handle escape key press
    effect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.modalService.state().isOpen) {
          this.closeModal();
        }
      };

      if (this.modalService.state().isOpen) {
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }
      return;
    });
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('chat-modal')) {
      this.closeModal();
    }
  }
}
