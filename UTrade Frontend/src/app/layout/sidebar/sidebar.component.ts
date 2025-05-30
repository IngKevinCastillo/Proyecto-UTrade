import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ConexionBackendService } from '../../Services/conexion-backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  activeBtn: string = 'home';
  mostrarReportes: boolean = true;

  constructor(
    private router: Router,
    private conexionBackend: ConexionBackendService,
    private http: HttpClient
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveFromUrl(event.url);
      }
    });
  }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);

    const id = usuario.idUsuario;

    if (id) {
      const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;

      this.http.get(url).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor?.idRol === 'ROL02') {
            this.mostrarReportes = false;
            if (this.router.url.includes('/reportes')) {
              this.router.navigate(['/home']);
            }
          }
        },
        error: (err) => {
          console.error('Error al obtener el rol:', err);
        },
      });
    }

    this.setActiveFromUrl(this.router.url);
  }

  setActiveFromUrl(url: string) {
    if (url.includes('/home')) {
      this.activeBtn = 'home';
    } else if (url.includes('/chat')) {
      this.activeBtn = 'chat';
    } else if (url.includes('/mapa')) {
      this.activeBtn = 'mapa';
    } else if (url.includes('/soporte')) {
      this.activeBtn = 'soporte';
    } else if (url.includes('/reportes')) {
      this.activeBtn = 'reportes';
    } else if (url.includes('/favoritos')) {
      this.activeBtn = 'favoritos';
    } else {
      this.activeBtn = '';
    }
  }

  setActive(route: string) {
    this.activeBtn = route;
    this.router.navigate(['/' + route]);
  }
}
