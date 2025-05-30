import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { ComprasComponent } from './features/compras/pages/compras-page/compras-page.component';
import { RentasComponent } from './features/rentas/pages/rentas-page/rentas-page.component';
import { ChatComponent } from './features/mensajes/chat/chat.component';
import { VentanaSoporteComponent } from './features/soporte/components/ventana-soporte/ventana-soporte.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { NoMatchComponent } from './shared/components/no-match/no-match.component';
import { NotificacionesComponent } from './features/notificaciones/notificaciones.component';
import { RegistroComponent } from './features/registro/registro.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { MiCuentaComponent } from './features/cuenta/mi-cuenta/mi-cuenta.component';
import { EditarPerfilComponent } from './features/cuenta/editar-perfil/editar-perfil.component';
import { MapaComponent } from './features/mapa/mapa.component';
import { ResenasComponent } from './features/productos/componentes/resenas/resenas/resenas.component';
import { FavoritosComponent } from './features/productos/componentes/favoritos/favoritos/favoritos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'compras', component: ComprasComponent },
      { path: 'rentas', component: RentasComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'soporte', component: VentanaSoporteComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'mi-cuenta', component: MiCuentaComponent },
      { path: 'mi-cuenta/editar-perfil', component: EditarPerfilComponent },
      { path: 'mapa', component: MapaComponent },
      { path: 'resenas', component: ResenasComponent },
      { path: 'favoritos', component: FavoritosComponent },
    ],
  },

  { path: '**', component: NoMatchComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
