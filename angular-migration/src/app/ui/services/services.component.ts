import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { ModalService } from '@app/core/services/modal.service';
import { SERVICE_RESOURCES } from '@app/core/constants/learning-resources';
import { SERVICES_DATA } from '@app/core/constants/portfolio-data';
import { ServiceData } from '@app/core/models/service.interface';

@Component({
  selector: 'app-services',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  protected readonly services = signal<readonly ServiceData[]>(SERVICES_DATA);

  constructor(private modalService: ModalService) {}

  protected handleServiceClick(serviceType: string): void {
    const resources = SERVICE_RESOURCES[serviceType];
    if (resources) {
      this.modalService.openLearningModal(resources);
    }
  }
}
