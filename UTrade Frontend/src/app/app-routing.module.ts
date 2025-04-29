import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { ComprasPageComponent } from './features/compras/pages/compras-page/compras-page.component';
import { RentasPageComponent } from './features/rentas/pages/rentas-page/rentas-page.component';
import { ChatComponent } from './features/mensajes/chat/chat.component';
import { VentanaSoporteComponent } from './features/soporte/components/ventana-soporte/ventana-soporte.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },      
      { path: 'compras', component: ComprasPageComponent },
      { path: 'rentas', component: RentasPageComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'soporte', component: VentanaSoporteComponent },
    ]
  },

  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
