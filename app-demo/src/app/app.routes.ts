import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full',
  },
  {
    path: 'counter',
    loadComponent: () => import('./pages/counter/counter.page').then( m => m.CounterPage)
  },
];
