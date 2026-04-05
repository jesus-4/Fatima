import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'sentimientos',
    loadComponent: () => import('./pages/sentiminetos/sentiminetos.component').then(m => m.SentiminetosComponent)},
  {
    path: '404',
    loadComponent: () => import('./pages/no-page/no-page.component').then(m => m.NoPageComponent)
  },
];
