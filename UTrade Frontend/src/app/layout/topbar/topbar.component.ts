import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../Services/conexion-backend.service';
import { notificacionesLista } from '../simulacionNotificaciones';
import { BusquedaService } from '../../Services/busqueda.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  activeFilter: string = 'todo';
  terminoBusqueda: string = '';
  mostrarBuscar: boolean = true;
  deshabilitarBusqueda: boolean = false;
  username: string = '';
  userHandle: string = '';
  avatarUrl: string = 'icons/no-photo.webp';

  notificaciones: boolean = false;
  menuVisible: boolean = false;

  listaNotificaciones = notificacionesLista;
  notificationCount = this.listaNotificaciones.length;

  panelFiltros: boolean = false;
  filtroFechaSeleccionado: string = '';
  precioMinimo: number = 50;
  precioMaximo: number = 2000;
  filtroPrecioMin: number = 50;
  filtroPrecioMax: number = 2000;

  constructor(
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private busquedaService: BusquedaService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualizarVisibilidadBusqueda(event.url);
      }
    });
  }

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
            if (
              datos.fotoPerfilBase64 &&
              datos.fotoPerfilBase64.trim() !== ''
            ) {
              this.avatarUrl =
                'data:image/jpeg;base64,' + datos.fotoPerfilBase64;
            } else {
              this.avatarUrl = 'icons/no-photo.webp';
            }
          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        },
      });
    }
    this.actualizarVisibilidadBusqueda(this.router.url);
  }

  private actualizarVisibilidadBusqueda(url: string): void {
    this.deshabilitarBusqueda = !(
      url.includes('/home') ||
      url.includes('/compras') ||
      url.includes('/rentas')
    );
  }

  onInputChange(): void {
    // Opcional pero aja. Esto hace una búsqueda en tiempo real mientras escribe
  }

  togglePanelFiltros(event: Event) {
    event.stopPropagation();
    if (!this.panelFiltros) {
      this.menuVisible = false;
      this.notificaciones = false;
    }
    this.panelFiltros = !this.panelFiltros;
  }

  seleccionarFiltroFecha(filtro: string) {
    this.filtroFechaSeleccionado = filtro;
    console.log('Filtro de fecha seleccionado:', filtro);
    // Aquí puedes agregar la lógica para aplicar el filtro
  }

  onPrecioMinChange() {
    // Asegurar que el precio mínimo no sea mayor que el máximo
    if (this.filtroPrecioMin >= this.filtroPrecioMax) {
      this.filtroPrecioMin = this.filtroPrecioMax - 10;
    }
  }

  onPrecioMaxChange() {
    // Asegurar que el precio máximo no sea menor que el mínimo
    if (this.filtroPrecioMax <= this.filtroPrecioMin) {
      this.filtroPrecioMax = this.filtroPrecioMin + 10;
    }
  }

  aplicarFiltros() {
    console.log('Aplicando filtros:', {
      fecha: this.filtroFechaSeleccionado,
      precioMin: this.filtroPrecioMin,
      precioMax: this.filtroPrecioMax
    });
    
    // Aquí puedes enviar los filtros al servicio de búsqueda
    // this.busquedaService.aplicarFiltros({...});
    
    this.panelFiltros = false;
  }

  limpiarFiltros() {
    this.filtroFechaSeleccionado = '';
    this.filtroPrecioMin = this.precioMinimo;
    this.filtroPrecioMax = this.precioMaximo;
    console.log('Filtros limpiados');
  }

  onBuscar(): void {
    const termino = this.terminoBusqueda.trim();

    if (termino === '') {
      this.limpiarBusqueda();
      return;
    }
    this.busquedaService.enviarTerminoBusqueda(termino);

    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.busquedaService.enviarTerminoBusqueda('');

    if (this.router.url !== '/home') {
      this.router.navigate(['/home']);
    }
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    if (!this.menuVisible) {
      this.notificaciones = false;
      this.panelFiltros = false; 
    }
    this.menuVisible = !this.menuVisible;
  }

  toggleNotificacion(event: Event) {
    event.stopPropagation();
    if (!this.notificaciones) {
      this.menuVisible = false;
      this.panelFiltros = false; 
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
      this.panelFiltros = false; // Cerrar el panel de filtros al hacer clic fuera
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
