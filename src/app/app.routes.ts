import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './config/security/auth.guard';
import { Auth2Guard } from './config/security/auth2-guard';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [Auth2Guard],
  },
  { path: 'edit-perfil', component: EditPerfilComponent },
  {
    path: 'mi-perfil',
    loadComponent: () =>
      import('./components/mi-perfil/mi-perfil.component').then(
        (m) => m.MiPerfilComponent
      ),
  },
  {
    path: 'grupo-estudio',
    loadComponent: () =>
      import('./components/grupo-estudio/grupo-estudio.component').then(
        (m) => m.GrupoEstudioComponent
      ),
  },
];
