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
import { MatBadgeModule } from '@angular/material/badge';
import { ComprasPageComponent } from './features/compras/pages/compras-page/compras-page.component';
import { RentasPageComponent } from './features/rentas/pages/rentas-page/rentas-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VentanaComponent } from './features/home/components/ventana/ventana.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnuncioPreviewComponent } from './features/home/components/anuncio-preview/anuncio-preview.component';
import { AnuncioDatosComponent } from './features/home/components/anuncio-datos/anuncio-datos.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductosComponent } from './features/productos/productos.component';
import { ChatComponent } from './features/mensajes/chat/chat.component';
import { ConversationListComponent } from './features/mensajes/conversation-list/conversation-list.component';
import { MessageAreaComponent } from './features/mensajes/message-area/message-area.component';
import { MessageComponent } from './features/mensajes/message/message.component';
import { VentanaSoporteComponent } from './features/soporte/components/ventana-soporte/ventana-soporte.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/login/components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NoMatchComponent } from './shared/components/no-match/no-match.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotificacionesComponent } from './features/notificaciones/notificaciones.component'; 
import { RegistroComponent } from './features/registro/registro.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VentanaReportesComponent } from './features/productos/componentes/ventana-reportes/ventana-reportes.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MiCuentaComponent } from './features/cuenta/mi-cuenta/mi-cuenta.component';
import { EditarPerfilComponent } from './features/cuenta/editar-perfil/editar-perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { MisPublicacionesComponent } from './features/cuenta/mis-publicaciones/mis-publicaciones.component';
import { ReputacionComponent } from './features/cuenta/reputacion/reputacion.component';
import { VentanaConfirmarComponent } from './features/registro/confirmar-codigo/ventana-confirmar/ventana-confirmar.component';

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
    ProductosComponent,
    ChatComponent,
    ConversationListComponent,
    MessageAreaComponent,
    MessageComponent,
    VentanaSoporteComponent,
    LoginComponent,
    LayoutComponent,
    NoMatchComponent,
    FooterComponent,
    NotificacionesComponent,
    RegistroComponent,
    ReportesComponent,
    VentanaReportesComponent,
    MiCuentaComponent,
    EditarPerfilComponent,
    MisPublicacionesComponent,
    ReputacionComponent,
    VentanaConfirmarComponent
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
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right'
    }),
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  exports: [
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    ToastrModule,
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }