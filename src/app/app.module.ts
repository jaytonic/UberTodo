import { UserService } from 'src/app/auth/user.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatedLayoutComponent } from './layout/authenticated-layout/authenticated-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DrawerComponent } from './layout/drawer/drawer.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedLayoutComponent,
    HeaderComponent,
    FooterComponent,
    DrawerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    UserModule,
    CoreModule,
    SharedModule,
    ComponentsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
