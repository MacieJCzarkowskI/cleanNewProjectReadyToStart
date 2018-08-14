import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: './pages/pages.module#PagesModule'
  }
];
