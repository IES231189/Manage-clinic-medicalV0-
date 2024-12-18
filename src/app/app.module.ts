import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { UserViewComponentComponent } from './users/user-view-component/user-view-component.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
    FormsModule ,
    UsersModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
