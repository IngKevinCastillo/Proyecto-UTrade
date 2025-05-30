import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../Services/conexion-backend.service';
import { notificacionesLista } from '../simulacionNotificaciones';
import { BusquedaService } from '../../Services/busqueda.service';
import { ProductoService } from '../../Services/producto.service';
import { FiltrosService } from '../../Services/filtros.service';

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
  precioMinimo: number = 0;
  precioMaximo: number = 2000000;
  filtroPrecioMin: number = 0;
  filtroPrecioMax: number = 2000000;

  constructor(
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private busquedaService: BusquedaService,
    private productosService: ProductoService,
    private filtrosService: FiltrosService
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
    
    this.sincronizarConServicio();
  }

  private actualizarVisibilidadBusqueda(url: string): void {
    this.deshabilitarBusqueda = !(
      url.includes('/home') ||
      url.includes('/compras') ||
      url.includes('/rentas')
    );
  }

  private sincronizarConServicio(): void {
    const filtrosActivos = this.filtrosService.getFiltrosActivos();
    
    const mapeoInverso: { [key: string]: string } = {
      'ultimaHora': 'ultima-hora',
      'hoy': 'hoy',
      'semana': 'esta-semana',
      'mes': 'este-mes',
      'año': 'este-ano'
    };
    
    this.filtroFechaSeleccionado = mapeoInverso[filtrosActivos.fecha] || '';
    this.filtroPrecioMin = filtrosActivos.precio.minimo;
    this.filtroPrecioMax = filtrosActivos.precio.maximo;
  }

  onInputChange(): void {
    // Opcional: búsqueda en tiempo real mientras escribe
  }

  togglePanelFiltros(event: Event) {
    event.stopPropagation();
    if (!this.panelFiltros) {
      this.menuVisible = false;
      this.notificaciones = false;
      this.sincronizarConServicio();
    }
    this.panelFiltros = !this.panelFiltros;
  }

  seleccionarFiltroFecha(filtro: string) {
    if (this.filtroFechaSeleccionado === filtro) {
      this.filtroFechaSeleccionado = '';
    } else {
      this.filtroFechaSeleccionado = filtro;
    }
    
    console.log('Filtro de fecha seleccionado localmente:', this.filtroFechaSeleccionado);
  }

  onPrecioMinChange() {
    if (this.filtroPrecioMin >= this.filtroPrecioMax) {
      this.filtroPrecioMin = this.filtroPrecioMax - 10;
    }
    console.log('Precio mínimo cambiado localmente:', this.filtroPrecioMin);
  }

  onPrecioMaxChange() {
    if (this.filtroPrecioMax <= this.filtroPrecioMin) {
      this.filtroPrecioMax = this.filtroPrecioMin + 10;
    }
    console.log('Precio máximo cambiado localmente:', this.filtroPrecioMax);
  }

  aplicarFiltros() {
    this.filtrosService.setFiltroFecha(this.filtroFechaSeleccionado);
    this.filtrosService.setFiltroPrecio(this.filtroPrecioMin, this.filtroPrecioMax);
    
    const filtrosAplicados = this.filtrosService.aplicarFiltros();
    
    console.log('Filtros aplicados al servicio:', filtrosAplicados);
  
    this.panelFiltros = false;
    
    const rutasValidasParaFiltros = ['/home', '/compras', '/rentas'];
    const rutaActual = this.router.url;
    const rutaBase = rutaActual.split('?')[0];
    
    if (!rutasValidasParaFiltros.includes(rutaBase)) {
      this.router.navigate(['/home']);
    }
  }

  limpiarFiltros() {
    this.filtroFechaSeleccionado = '';
    this.filtroPrecioMin = this.precioMinimo;
    this.filtroPrecioMax = this.precioMaximo;
    this.filtrosService.limpiarFiltros();
    
    console.log('Filtros limpiados');
  }

  onBuscar(): void {
    const termino = this.terminoBusqueda.trim();
  
    if (termino === '') {
      this.limpiarBusqueda();
      return;
    }
    
    this.busquedaService.enviarTerminoBusqueda(termino);
  
    const rutasValidasParaBusqueda = ['/home', '/compras', '/rentas'];
    const rutaActual = this.router.url;
    const rutaBase = rutaActual.split('?')[0];
    
    if (!rutasValidasParaBusqueda.includes(rutaBase)) {
      this.router.navigate(['/home']);
    }
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.busquedaService.enviarTerminoBusqueda('');
  
    const rutasValidasParaBusqueda = ['/home', '/compras', '/rentas'];
    const rutaActual = this.router.url;
    const rutaBase = rutaActual.split('?')[0];
    
    if (!rutasValidasParaBusqueda.includes(rutaBase)) {
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
      (this.menuVisible || this.notificaciones || this.panelFiltros) &&
      event.target instanceof Element &&
      !event.target.closest('.d-flex') &&
      !event.target.closest('.filter-panel')
    ) {
      this.menuVisible = false;
      this.notificaciones = false;
      this.panelFiltros = false;
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