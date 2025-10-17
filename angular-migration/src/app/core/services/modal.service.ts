import { Injectable, signal } from '@angular/core';
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
    document.body.style.overflow = 'hidden';
  }

  openChatModal(): void {
    this.modalState.set({
      isOpen: true,
      type: 'chat',
      data: null,
    });
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalState.set({
      isOpen: false,
      type: null,
      data: null,
    });
    document.body.style.overflow = 'auto';
  }
}
