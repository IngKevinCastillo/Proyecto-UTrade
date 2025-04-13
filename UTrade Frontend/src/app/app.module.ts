import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { NotificationIconComponent } from './shared/components/notification-icon/notification-icon.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import { ComprasPageComponent } from './features/compras/pages/compras-page/compras-page.component';
import { RentasPageComponent } from './features/rentas/pages/rentas-page/rentas-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { VentanaComponent } from './features/home/components/ventana/ventana.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    NotificationIconComponent,
    UserProfileComponent,
    HomePageComponent,
    ComprasPageComponent,
    RentasPageComponent,
    VentanaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
