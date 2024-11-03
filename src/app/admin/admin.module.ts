import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminViewComponentComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class AdminModule { }
