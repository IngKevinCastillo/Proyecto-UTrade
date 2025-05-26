import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotificationIconComponent } from './shared/components/notification-icon/notification-icon.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { NoMatchComponent } from './shared/components/no-match/no-match.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { ComprasPageComponent } from './features/compras/pages/compras-page/compras-page.component';
import { RentasPageComponent } from './features/rentas/pages/rentas-page/rentas-page.component';
import { ProductosComponent } from './features/productos/productos.component';
import { VerProductosComponent } from './features/productos/componentes/ver-productos/ver-productos.component';
import { ModificarProductosComponent } from './features/productos/componentes/modificar-productos/modificar-productos.component';
import { VentanaReportesComponent } from './features/productos/componentes/ventana-reportes/ventana-reportes.component';
import { ChatComponent } from './features/mensajes/chat/chat.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConversationListComponent } from './features/mensajes/conversation-list/conversation-list.component';
import { MessageAreaComponent } from './features/mensajes/message-area/message-area.component';
import { MessageComponent } from './features/mensajes/message/message.component';
import { VentanaComponent } from './features/home/components/ventana/ventana.component';
import { AnuncioPreviewComponent } from './features/home/components/anuncio-preview/anuncio-preview.component';
import { AnuncioDatosComponent } from './features/home/components/anuncio-datos/anuncio-datos.component';
import { VentanaSoporteComponent } from './features/soporte/components/ventana-soporte/ventana-soporte.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { RegistroComponent } from './features/registro/registro.component';
import { VentanaConfirmarComponent } from './features/registro/confirmar-codigo/ventana-confirmar/ventana-confirmar.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { NotificacionesComponent } from './features/notificaciones/notificaciones.component';
import { MiCuentaComponent } from './features/cuenta/mi-cuenta/mi-cuenta.component';
import { EditarPerfilComponent } from './features/cuenta/editar-perfil/editar-perfil.component';
import { MisPublicacionesComponent } from './features/cuenta/mis-publicaciones/mis-publicaciones.component';
import { ReputacionComponent } from './features/cuenta/reputacion/reputacion.component';
import { VerReporteComponent } from './features/reportes/componentes/ver-reporte/ver-reporte.component';
import { MapaComponent } from './features/mapa/mapa.component';

import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ResenasComponent } from './features/productos/componentes/resenas/resenas/resenas.component';

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
    VerProductosComponent,
    ModificarProductosComponent,
    VentanaReportesComponent,
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
    VentanaConfirmarComponent,
    ReportesComponent,
    MiCuentaComponent,
    EditarPerfilComponent,
    MisPublicacionesComponent,
    ReputacionComponent,
    VerReporteComponent,
    MapaComponent,
    ResenasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatToolbarModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  exports: [
    MatIconModule,
    MatTableModule,
    MatBadgeModule,
    MatCardModule,
    MatButtonModule,
    ToastrModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
