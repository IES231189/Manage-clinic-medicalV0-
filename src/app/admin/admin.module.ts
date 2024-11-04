import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    AdminViewComponentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DashboardModule
  ]
})
export class AdminModule { }
