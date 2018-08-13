import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './pages.routes';
import {PagesComponent} from './pages.components';
import {LoginComponent} from '../login/login.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    LoginComponent
  ],
  entryComponents: [PagesComponent]
})
export class PagesModule { }
