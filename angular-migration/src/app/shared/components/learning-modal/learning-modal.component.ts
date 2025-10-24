import { Component, ChangeDetectionStrategy, effect, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ModalService } from '@app/core/services/modal.service';

@Component({
  selector: 'app-learning-modal',
  imports: [CommonModule],
  template: `
    @if (modalService.state().isOpen && modalService.state().type === 'learning') {
      <div class="learning-modal" (click)="onBackdropClick($event)">
        <div class="learning-modal-content" (click)="$event.stopPropagation()">
          <div class="learning-modal-header">
            <h3>{{ modalService.state().data?.title }} - Learning Resources</h3>
            <span class="learning-modal-close" (click)="closeModal()">&times;</span>
          </div>
          <div class="learning-modal-body">
            <p class="modal-intro">Expand your knowledge with these curated learning resources:</p>
            <div class="resources-grid">
              @for (resource of modalService.state().data?.resources; track resource.url) {
                <div class="resource-card">
                  <div class="resource-icon">
                    <i class='bx bx-book-open'></i>
                  </div>
                  <h4>{{ resource.name }}</h4>
                  <p>{{ resource.description }}</p>
                  <a [href]="resource.url" target="_blank" rel="noopener noreferrer" class="resource-link">
                    <span>Learn More</span>
                    <i class='bx bx-link-external'></i>
                  </a>
                </div>
              }
            </div>
            <div class="modal-footer">
              <p><i class='bx bx-info-circle'></i> All links open in new windows for your convenience</p>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './learning-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningModalComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  constructor(public modalService: ModalService) {
    // Handle escape key press (only in browser)
    effect(() => {
      // Skip event listeners on server
      if (!this.isBrowser) {
        return;
      }
      
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
    if ((event.target as HTMLElement).classList.contains('learning-modal')) {
      this.closeModal();
    }
  }
}
