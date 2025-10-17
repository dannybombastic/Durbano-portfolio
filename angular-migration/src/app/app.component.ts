import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LearningModalComponent } from './shared/components/learning-modal/learning-modal.component';
import { ChatModalComponent } from './shared/components/chat-modal/chat-modal.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LearningModalComponent,
    ChatModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Daniel Urbano - DevOps Portfolio';
}
