import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
// NgModule: metadata
@NgModule({
  // declarations: Nơi khai báo các cái component mà
  // module này quản lý
  declarations: [AppComponent],
  // imports: Dùng để import các module khác vào
  // Ví dụ muốn làm việc với form thì import FormsModule
  // Muốn làm việc routing thì import RouterModule
  // Ngoài app module thì tất cả module khác do mình tạo ra
  // phải được import vào module cha
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  // Nơi mình gắn các services
  providers: [
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  // Nơi khai báo component nguồn của module
  // Các module con khác không cần bootstrap component
  bootstrap: [AppComponent],
})
export class AppModule {}
