import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactCard {
  icon: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  isExternal: boolean;
}

interface FloatingElement {
  icon: string;
  text: string;
  class: string;
  link: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly contactCards = signal<ContactCard[]>([
    {
      icon: 'bxl-gmail',
      title: 'Email',
      description: 'Get in touch via email',
      link: 'mailto:dannybombastic@gmail.com?subject=DevOps Consultation&body=Hi Daniel,%0D%0A%0D%0AI\'m interested in discussing DevOps solutions...',
      linkText: 'dannybombastic@gmail.com',
      isExternal: false,
    },
    {
      icon: 'bxl-whatsapp',
      title: 'WhatsApp',
      description: 'Quick consultation chat',
      link: 'https://api.whatsapp.com/send?phone=+34633437069&text=Hello Daniel! I\'m interested in DevOps services.',
      linkText: '+34 633 437 069',
      isExternal: true,
    },
    {
      icon: 'bxl-linkedin',
      title: 'LinkedIn',
      description: 'Professional networking',
      link: 'https://linkedin.com/in/daniel-u-665a004b',
      linkText: 'Connect on LinkedIn',
      isExternal: true,
    },
  ]);

  protected readonly floatingElements = signal<FloatingElement[]>([
    {
      icon: 'bx-envelope',
      text: 'Email',
      class: 'contact-1',
      link: 'mailto:dannybombastic@gmail.com',
    },
    {
      icon: 'bxl-whatsapp',
      text: 'WhatsApp',
      class: 'contact-2',
      link: 'https://api.whatsapp.com/send?phone=+34633437069',
    },
    {
      icon: 'bxl-linkedin',
      text: 'LinkedIn',
      class: 'contact-3',
      link: 'https://linkedin.com/in/daniel-u-665a004b',
    },
    {
      icon: 'bxl-github',
      text: 'GitHub',
      class: 'contact-4',
      link: 'https://github.com/dannybombastic',
    },
  ]);
}
