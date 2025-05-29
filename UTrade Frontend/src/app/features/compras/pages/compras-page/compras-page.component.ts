import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusquedaService } from '../../../../Services/busqueda.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compras-page',
  templateUrl: './compras-page.component.html',
  styleUrl: './compras-page.component.css',
})
export class ComprasComponent implements OnInit, OnDestroy {
  filtroIdCategoria: string = 'CAT02';
  productosFiltrados: Publicaciones[] = [];
  mostrarProductosFiltrados: boolean = false;

  private busquedaSub?: Subscription;
  private terminoBusquedaActual: string = '';

  constructor(
    private busquedaService: BusquedaService,
    private productoService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del término de búsqueda
    this.busquedaSub = this.busquedaService.terminoBusqueda$.subscribe(
      (termino) => {
        this.terminoBusquedaActual = termino;
        this.aplicarBusqueda(termino);
      }
    );
    const terminoActual = this.busquedaService.obtenerTerminoActual();
    if (terminoActual && terminoActual.trim() !== '') {
      this.aplicarBusqueda(terminoActual);
    }
  }

  ngOnDestroy(): void {
    if (this.busquedaSub) {
      this.busquedaSub.unsubscribe();
    }
  }

  private aplicarBusqueda(termino: string): void {
    if (!termino || termino.trim() === '') {
      this.mostrarProductosFiltrados = false;
      this.productosFiltrados = [];
      return;
    }

    this.productoService.busquedaTexto(termino.trim()).subscribe({
      next: (res: any) => {
        if (res.estado && res.valor && Array.isArray(res.valor)) {
          const productosFiltradosPorCategoria = res.valor.filter(
            (producto: Publicaciones) =>
              producto.idCategoria === this.filtroIdCategoria
          );

          this.productosFiltrados = productosFiltradosPorCategoria;
          this.mostrarProductosFiltrados = true;

          if (productosFiltradosPorCategoria.length === 0) {
            this.toastr.info(
              'No se encontraron productos de compra con ese término',
              'Búsqueda'
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
}
