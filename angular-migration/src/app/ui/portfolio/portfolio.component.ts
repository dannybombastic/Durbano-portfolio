import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@app/core/services/modal.service';
import { PROJECT_RESOURCES } from '@app/core/constants/learning-resources';
import { PROJECTS_DATA } from '@app/core/constants/portfolio-data';
import { ProjectData } from '@app/core/models/project.interface';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  protected readonly projects = signal<readonly ProjectData[]>(PROJECTS_DATA);

  constructor(private modalService: ModalService) {}

  protected handleProjectClick(projectType: string): void {
    const resources = PROJECT_RESOURCES[projectType];
    if (resources) {
      this.modalService.openLearningModal(resources);
    }
  }
}
