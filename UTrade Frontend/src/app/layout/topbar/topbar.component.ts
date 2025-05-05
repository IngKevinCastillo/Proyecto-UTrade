import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Notificaciones, notificacionesLista } from '../simulacionNotificaciones';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  activeFilter: string = 'todo';

  username: string = 'Juan mrd';
  userHandle: string = '@vendogalletas';
  avatarUrl: string = 'icons/oceana.png';
  notificaciones: boolean = false;

  menuVisible: boolean = false;

  constructor(private router: Router) { }
  
  listaNotificaciones = notificacionesLista;
  notificationCount = this.listaNotificaciones.length;


  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  toggleNotificacion(event: Event) {
    event.stopPropagation();
    this.notificaciones = !this.notificaciones;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.menuVisible && event.target instanceof Element && !event.target.closest('.d-flex')) {
      this.menuVisible = false;
    }
  }

  editProfile() {
    console.log('Editar perfil');
  }

  changePassword() {
    console.log('Cambiar contraseña');
  }

  toggleTheme() {
    console.log('Alternar tema');
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
