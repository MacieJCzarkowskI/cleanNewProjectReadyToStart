import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/pages.module#PagesModule'
  }
];
