import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Auth2Guard } from './config/security/auth2-guard';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';
import { authLoginGuard } from './config/security/auth-login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [authLoginGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [Auth2Guard],
  },
  { path: 'edit-perfil', 
    component: EditPerfilComponent,
    canActivate: [Auth2Guard],
  },
  {
    path: 'mi-perfil',
    loadComponent: () =>
      import('./components/mi-perfil/mi-perfil.component').then(
        (m) => m.MiPerfilComponent
      ),
    canActivate: [Auth2Guard],
  },
  {
    path: 'grupo-estudio',
    loadComponent: () =>
      import('./components/grupo-estudio/grupo-estudio.component').then(
        (m) => m.GrupoEstudioComponent
      ),
    canActivate: [Auth2Guard],
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./services/modal/feed/feed.component').then(
        (m) => m.FeedComponent
      ),
    canActivate: [Auth2Guard],
  },
];
