import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './auth/components/login-component/login-component.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { AdminViewComponentComponent } from './admin/admin-view-component/admin-view-component.component';
import { UserViewComponentComponent } from './users/user-view-component/user-view-component.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminViewComponentComponent,
    UserViewComponentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
