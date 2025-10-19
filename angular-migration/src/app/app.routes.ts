import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Daniel Urbano - DevOps Professional Portfolio',
  },
  {
    path: 'learning-journey',
    loadComponent: () => import('./pages/learning-journey/learning-journey').then((m) => m.LearningJourneyComponent),
    title: 'Learning Journey - Daniel Urbano',
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then((m) => m.BlogComponent),
    title: 'Blog - Daniel Urbano',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-post.component').then((m) => m.BlogPostComponent),
    title: 'Blog Post - Daniel Urbano',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
