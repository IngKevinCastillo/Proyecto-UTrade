import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../Services/conexion-backend.service';
import { notificacionesLista } from '../simulacionNotificaciones';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  activeFilter: string = 'todo';

  username: string = '';
  userHandle: string = '';
  avatarUrl: string = 'icons/no-photo.webp';

  notificaciones: boolean = false;
  menuVisible: boolean = false;

  listaNotificaciones = notificacionesLista;
  notificationCount = this.listaNotificaciones.length;

  constructor(
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;

    if (id) {
      const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;

      this.http.get(url).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor) {
            const datos = res.valor;
            this.username = `${datos.nombres} ${datos.apellidos}`;
            this.userHandle = `@${datos.nombreUsuario}`;
            if (datos.fotoPerfilBase64 && datos.fotoPerfilBase64.trim() !== '') {
            this.avatarUrl = 'data:image/jpeg;base64,' + datos.fotoPerfilBase64;
          } else {
            this.avatarUrl = 'icons/no-photo.webp';
          }

          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        }
      });
    }
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    if (!this.menuVisible) {
    this.notificaciones = false;
  }
    this.menuVisible = !this.menuVisible;
  }

  toggleNotificacion(event: Event) {
    event.stopPropagation();
    if (!this.notificaciones) {
    this.menuVisible = false;
    }
    this.notificaciones = !this.notificaciones;
  }

  verTodasNotificaciones() {
    this.notificaciones = false;
    this.router.navigate(['/notificaciones']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      (this.menuVisible || this.notificaciones) &&
      event.target instanceof Element &&
      !event.target.closest('.d-flex')
    ) {
      this.menuVisible = false;
      this.notificaciones = false;
    }
  }

  editProfile() {
    this.menuVisible = false;
    this.router.navigate(['/mi-cuenta']);
  }

  toggleTheme() {
    console.log('Alternar tema');
  }

  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
