import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Daniel Urbano - DevOps Professional Portfolio',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
