import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ResourceCategory } from '../interfaces/learning-resources.interface';

export interface ModalState {
  isOpen: boolean;
  type: 'learning' | 'chat' | null;
  data: ResourceCategory | null;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private modalState = signal<ModalState>({
    isOpen: false,
    type: null,
    data: null,
  });

  readonly state = this.modalState.asReadonly();

  openLearningModal(resources: ResourceCategory): void {
    this.modalState.set({
      isOpen: true,
      type: 'learning',
      data: resources,
    });
    
    // Only manipulate DOM in browser
    if (this.isBrowser) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  openChatModal(): void {
    this.modalState.set({
      isOpen: true,
      type: 'chat',
      data: null,
    });
    
    // Only manipulate DOM in browser
    if (this.isBrowser) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.modalState.set({
      isOpen: false,
      type: null,
      data: null,
    });
    
    // Only manipulate DOM in browser
    if (this.isBrowser) {
      this.document.body.style.overflow = 'auto';
    }
  }
}
