import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BusquedaService } from '../../../../Services/busqueda.service';
import { ProductoService } from '../../../../Services/producto.service';
import { FiltrosService, FiltrosActivos } from '../../../../Services/filtros.service';
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compras-page',
  templateUrl: './compras-page.component.html',
  styleUrl: './compras-page.component.css',
})
export class ComprasComponent implements OnInit, OnDestroy {
  filtroIdCategoria: string = 'CAT02'; // ID para compras
  productosFiltrados: Publicaciones[] = [];
  mostrarProductosFiltrados: boolean = false;

  private busquedaSub?: Subscription;
  private terminoBusquedaActual: string = '';
  private destroy$ = new Subject<void>();
  private filtrosActivos: FiltrosActivos = {
    fecha: '',
    precio: { minimo: 0, maximo: 2000000 }
  };

  constructor(
    private busquedaService: BusquedaService,
    private productoService: ProductoService,
    private filtrosService: FiltrosService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del término de búsqueda
    this.busquedaSub = this.busquedaService.terminoBusqueda$.subscribe(
      (termino) => {
        this.terminoBusquedaActual = termino;
        this.aplicarBusquedaYFiltros(termino);
      }
    );

    // Suscribirse a los cambios de filtros
    this.suscribirseAFiltros();

    // Aplicar búsqueda actual si existe
    const terminoActual = this.busquedaService.obtenerTerminoActual();
    if (terminoActual && terminoActual.trim() !== '') {
      this.aplicarBusquedaYFiltros(terminoActual);
    } else {
      // Si no hay búsqueda, aplicar solo filtros si están activos
      this.aplicarSoloFiltros();
    }
  }

  ngOnDestroy(): void {
    if (this.busquedaSub) {
      this.busquedaSub.unsubscribe();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private suscribirseAFiltros(): void {
    // Escuchar cambios en los filtros
    combineLatest([
      this.filtrosService.filtroFecha$,
      this.filtrosService.filtroPrecio$
    ])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([filtroFecha, filtroPrecio]) => {
      this.filtrosActivos = {
        fecha: filtroFecha,
        precio: filtroPrecio
      };
      
      // Aplicar filtros considerando si hay búsqueda activa
      if (this.terminoBusquedaActual && this.terminoBusquedaActual.trim() !== '') {
        this.aplicarBusquedaYFiltros(this.terminoBusquedaActual);
      } else {
        this.aplicarSoloFiltros();
      }
    });
  }

  private aplicarBusquedaYFiltros(termino: string): void {
    if (!termino || termino.trim() === '') {
      this.aplicarSoloFiltros();
      return;
    }

    this.productoService.busquedaTexto(termino.trim()).subscribe({
      next: (res: any) => {
        if (res.estado && res.valor && Array.isArray(res.valor)) {
          let productosFiltrados = res.valor.filter(
            (producto: Publicaciones) =>
              producto.idCategoria === this.filtroIdCategoria
          );

          // Aplicar filtros adicionales
          productosFiltrados = this.aplicarFiltrosAdicionales(productosFiltrados);

          this.productosFiltrados = productosFiltrados;
          this.mostrarProductosFiltrados = true;

          if (productosFiltrados.length === 0) {
            this.toastr.info(
              'No se encontraron productos de compra con esos criterios',
              'Búsqueda y Filtros'
            );
          }
        } else {
          this.productosFiltrados = [];
          this.mostrarProductosFiltrados = true;
          this.toastr.info('No se encontraron productos', 'Búsqueda');
        }
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
        this.productosFiltrados = [];
        this.mostrarProductosFiltrados = true;
        this.toastr.error('Error al realizar la búsqueda', 'Error');
      },
    });
  }

  private aplicarSoloFiltros(): void {
    const hayFiltroFecha = this.filtrosActivos.fecha && this.filtrosActivos.fecha !== '';
    const hayFiltroPrecio = this.filtrosActivos.precio.minimo !== 0 || 
                           this.filtrosActivos.precio.maximo !== 2000000;

    if (!hayFiltroFecha && !hayFiltroPrecio) {
      // No hay filtros activos, ocultar productos filtrados
      this.mostrarProductosFiltrados = false;
      this.productosFiltrados = [];
      return;
    }

    // Aplicar filtros según lo que esté activo
    if (hayFiltroFecha && hayFiltroPrecio) {
      // Ambos filtros activos
      this.aplicarFiltroFecha();
    } else if (hayFiltroFecha) {
      // Solo filtro de fecha
      this.aplicarFiltroFecha();
    } else if (hayFiltroPrecio) {
      // Solo filtro de precio
      this.aplicarFiltroPrecio();
    }
  }

  private aplicarFiltroFecha(): void {
    this.productoService.listarPorFecha(this.filtrosActivos.fecha).subscribe({
      next: (respuesta) => {
        if (respuesta.estado && Array.isArray(respuesta.valor)) {
          let productosFiltrados = respuesta.valor.filter(
            (producto: Publicaciones) => producto.idCategoria === this.filtroIdCategoria
          );
          
          // Si también hay filtro de precio, aplicarlo
          const hayFiltroPrecio = this.filtrosActivos.precio.minimo !== 0 || 
                                 this.filtrosActivos.precio.maximo !== 2000000;
          
          if (hayFiltroPrecio) {
            productosFiltrados = productosFiltrados.filter(producto => 
              producto.precio >= this.filtrosActivos.precio.minimo && 
              producto.precio <= this.filtrosActivos.precio.maximo
            );
          }
          
          this.productosFiltrados = productosFiltrados;
          this.mostrarProductosFiltrados = true;

          if (productosFiltrados.length === 0) {
            this.toastr.info('No se encontraron productos de compra para los filtros aplicados', 'Filtros');
          }
        } else {
          this.productosFiltrados = [];
          this.mostrarProductosFiltrados = true;
          this.toastr.info('No se encontraron productos para el filtro de fecha', 'Filtros');
        }
      },
      error: (error) => {
        console.error('Error aplicando filtro de fecha:', error);
        this.productosFiltrados = [];
        this.mostrarProductosFiltrados = true;
        this.toastr.error('Error al aplicar filtro de fecha', 'Error');
      },
    });
  }

  private aplicarFiltroPrecio(): void {
    this.productoService.listarRangoPrecio(
      this.filtrosActivos.precio.minimo,
      this.filtrosActivos.precio.maximo
    ).subscribe({
      next: (respuesta) => {
        if (respuesta.estado && Array.isArray(respuesta.valor)) {
          const productosFiltrados = respuesta.valor.filter(
            (producto: Publicaciones) => producto.idCategoria === this.filtroIdCategoria
          );
          
          this.productosFiltrados = productosFiltrados;
          this.mostrarProductosFiltrados = true;

          if (productosFiltrados.length === 0) {
            this.toastr.info('No se encontraron productos de compra en el rango de precio', 'Filtros');
          }
        } else {
          this.productosFiltrados = [];
          this.mostrarProductosFiltrados = true;
          this.toastr.info('No se encontraron productos en el rango de precio', 'Filtros');
        }
      },
      error: (error) => {
        console.error('Error aplicando filtro de precio:', error);
        this.productosFiltrados = [];
        this.mostrarProductosFiltrados = true;
        this.toastr.error('Error al aplicar filtro de precio', 'Error');
      },
    });
  }

  private aplicarFiltrosAdicionales(productos: Publicaciones[]): Publicaciones[] {
    let productosFiltrados = [...productos];

    // Aplicar filtro de fecha si está activo
    const hayFiltroFecha = this.filtrosActivos.fecha && this.filtrosActivos.fecha !== '';
    
    // Aplicar filtro de precio si está activo
    const hayFiltroPrecio = this.filtrosActivos.precio.minimo !== 0 || 
                           this.filtrosActivos.precio.maximo !== 2000000;

    if (hayFiltroPrecio) {
      productosFiltrados = productosFiltrados.filter(producto => 
        producto.precio >= this.filtrosActivos.precio.minimo && 
        producto.precio <= this.filtrosActivos.precio.maximo
      );
    }

    // Para filtro de fecha en búsqueda, podríamos aplicar filtrado local por fecha
    // si es necesario, pero generalmente el backend debería manejarlo

    return productosFiltrados;
  }
}