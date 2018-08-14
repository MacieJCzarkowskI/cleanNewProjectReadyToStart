import {Routes} from '@angular/router';
import {PagesModule} from './pages/pages.module';
export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => PagesModule
  }
];
