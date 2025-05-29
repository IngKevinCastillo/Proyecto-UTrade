import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaComponent } from '../../components/ventana/ventana.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BusquedaService } from '../../../../Services/busqueda.service';
import { Publicaciones } from '../../../../interfaces/publicaciones';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  @Input() userAvatar: string = 'icons/no-photo.webp';

  mostrarTodosLosProductos: boolean = true;
  productosFiltrados: Publicaciones[] = [];
  busquedaSub!: Subscription;
  terminoBusquedaActual: string = '';

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private productoService: ProductoService,
    private busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    this.cargarAvatarUsuario();

    this.busquedaSub = this.busquedaService.terminoBusqueda$.subscribe(
      (termino) => {
        this.terminoBusquedaActual = termino;
        this.filtrarProductos(termino);
      }
    );
  }

  filtrarProductos(termino: string): void {
    if (!termino || termino.trim() === '') {
      this.mostrarTodosLosProductos = true;
      this.productosFiltrados = [];
      return;
    }

    // Buscar productos por texto
    this.productoService.busquedaTexto(termino.trim()).subscribe({
      next: (res: any) => {
        if (res.estado && res.valor && Array.isArray(res.valor)) {
          this.productosFiltrados = res.valor;
          this.mostrarTodosLosProductos = false;
        } else {
          this.productosFiltrados = [];
          this.mostrarTodosLosProductos = false;
          this.toastr.info('No se encontraron productos', 'Búsqueda');
        }
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
        this.productosFiltrados = [];
        this.mostrarTodosLosProductos = false;
        this.toastr.error('Error al realizar la búsqueda', 'Error');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.busquedaSub) {
      this.busquedaSub.unsubscribe();
    }
  }

  private cargarAvatarUsuario(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;

    if (id) {
      const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;

      this.http.get(url).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor) {
            const datos = res.valor;
            this.userAvatar = datos.fotoPerfilBase64?.trim()
              ? 'data:image/jpeg;base64,' + datos.fotoPerfilBase64
              : 'icons/no-photo.webp';
          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        },
      });
    }
  }

  crearServicio(): void {
    const dialogRef = this.dialog.open(VentanaComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '1200px',
      data: {
        tipo: 'CREAR',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (
          this.terminoBusquedaActual &&
          this.terminoBusquedaActual.trim() !== ''
        ) {
          setTimeout(() => {
            this.filtrarProductos(this.terminoBusquedaActual);
          }, 500);
        }
      }
    });
  }

  publicar(): void {
    this.toastr.error(
      'Debes crear el producto o servicio ',
      'Todavía no campeón(a)'
    );
    this.crearServicio();
  }
}
