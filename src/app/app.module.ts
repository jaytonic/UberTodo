import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatedLayoutComponent } from './layout/authenticated-layout/authenticated-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DrawerComponent } from './layout/drawer/drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedLayoutComponent,
    HeaderComponent,
    FooterComponent,
    DrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
