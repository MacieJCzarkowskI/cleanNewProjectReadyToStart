import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesComponent} from './pages.components';
import {LoginComponent} from '../login/login.component';
import {CanActivateViaOAuthGuard} from '../oAuth.canActivateGuard';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: PagesComponent,
    canActivate: [CanActivateViaOAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
