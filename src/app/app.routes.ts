import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'sentimientos',
    loadComponent: () => import('./pages/sentiminetos/sentiminetos.component').then(m => m.SentiminetosComponent),
    canActivate: [authGuard]
  },
  {
    path: '404',
    loadComponent: () => import('./pages/no-page/no-page.component').then(m => m.NoPageComponent)
  },
  {
    path: 'flowers',
    loadComponent: () => import('./pages/flores/flores.component').then(m => m.FloresComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cuaderno',
    loadComponent: () => import('./pages/cuaderno/cuaderno.component').then(m => m.CuadernoComponent),
    canActivate: [authGuard]
  },
];
