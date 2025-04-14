import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { NotificationIconComponent } from './shared/components/notification-icon/notification-icon.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { MatTableModule } from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import { ComprasPageComponent } from './features/compras/pages/compras-page/compras-page.component';
import { RentasPageComponent } from './features/rentas/pages/rentas-page/rentas-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VentanaComponent } from './features/home/components/ventana/ventana.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnuncioPreviewComponent } from './features/home/components/anuncio-preview/anuncio-preview.component';
import { AnuncioDatosComponent } from './features/home/components/anuncio-datos/anuncio-datos.component';
import { ToastrModule } from 'ngx-toastr';


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
    AnuncioPreviewComponent,
    AnuncioDatosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ToastrModule
  ],
  exports: [
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    ToastrModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }