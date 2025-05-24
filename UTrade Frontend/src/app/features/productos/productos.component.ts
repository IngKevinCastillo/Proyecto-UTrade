import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaReportesComponent } from './componentes/ventana-reportes/ventana-reportes.component';
import { VerProductosComponent } from './componentes/ver-productos/ver-productos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../interfaces/persona';
import { CategoriaPublicacion } from '../../interfaces/categoria-publicacion';
import { CategoriaPublicacionService } from '../../Services/categoria-publicacion.service';
import { PersonaService } from '../../Services/persona.service';
import { ProductoService } from '../../Services/producto.service';
import { Publicaciones } from '../../interfaces/publicaciones';
import { forkJoin } from 'rxjs';

interface ProductoExtendido extends Publicaciones {
  verMas: boolean;
  nombreUsuario?: string;
  avatarUsuario?: string;
  nombreCategoria?: string;
  fechaFormateada?: string;
  tiempoTranscurrido?: string;
  imagenes?: string[];
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnChanges, OnInit {

  formularioPublicaciones: FormGroup;
  listaDePersonas: Persona[] = [];
  listaCategorias: CategoriaPublicacion[] = [];
  datosPublicaciones: Publicaciones | null = null;

  @Input() Filtro?: string;
  @Input() FiltroIdCategoria?: string; // Nuevo input para ID directo
  @Input() FiltroLista?: Publicaciones[];
  
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaPublicacionService,
    private _personaServicio: PersonaService,
    private _productoServicio: ProductoService
  ) { 
    this.formularioPublicaciones = this.fb.group({
      id: ["", Validators.required],
      titulo: ["", Validators.required],
      fechaPublicacion: ["", Validators.required],
      idUsuario: ["", Validators.required],
      precio: ["", Validators.required],
      idCategoria: ["", Validators.required],
      descripcion: ["", Validators.required],
      ubicacion: [""],
      idReseña: [""]
    });
  }

  productos: ProductoExtendido[] = [];

  ngOnInit(): void {
    this.cargarDatosIniciales();
    
    if (this.datosPublicaciones != null) {
      this.formularioPublicaciones.patchValue({
        id: this.datosPublicaciones.id,
        titulo: this.datosPublicaciones.titulo,
        fechaPublicacion: this.datosPublicaciones.fechaPublicacion,
        idUsuario: this.datosPublicaciones.idUsuario,
        precio: this.datosPublicaciones.precio,
        idCategoria: this.datosPublicaciones.idCategoria,
        descripcion: this.datosPublicaciones.descripcion,
        ubicacion: this.datosPublicaciones.ubicacion,
        idReseña: this.datosPublicaciones.idReseña
      });
    }
  }

  cargarDatosIniciales(): void {
    // Cargar personas y categorías en paralelo
    forkJoin({
      personas: this._personaServicio.listar(),
      categorias: this._categoriaServicio.lista()
    }).subscribe({
      next: (respuestas) => {
        if (respuestas.personas.estado) {
          this.listaDePersonas = respuestas.personas.valor;
        }
        if (respuestas.categorias.estado) {
          this.listaCategorias = respuestas.categorias.valor;
        }
        
        // Si no hay filtros específicos, cargar todos los productos
        if (!this.Filtro && !this.FiltroLista && !this.FiltroIdCategoria) {
          this.cargarTodosLosProductos();
        } else if (this.Filtro && this.listaCategorias.length > 0) {
          // Si hay filtro por nombre y las categorías ya están cargadas, filtrar
          this.filtrarPorNombreCategoria();
        }
      },
      error: (error) => {
        console.error('Error cargando datos iniciales:', error);
      }
    });
  }

  cargarTodosLosProductos(): void {
    this._productoServicio.lista().subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          this.procesarProductos(respuesta.valor);
        }
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['FiltroLista'] && this.FiltroLista) {
      this.procesarProductos(this.FiltroLista);
    }
    else if (changes['FiltroIdCategoria'] && this.FiltroIdCategoria) {
      // Asegurar que las personas estén cargadas antes de filtrar
      if (this.listaDePersonas.length > 0) {
        this.filtrarPorIdCategoria();
      } else {
        // Si las personas no están cargadas, cargarlas primero
        this.cargarPersonasYFiltrar();
      }
    }
    else if (changes['Filtro'] && this.Filtro) {
      // Filtrar por nombre de categoría (requiere que las categorías estén cargadas)
      if (this.listaCategorias.length > 0 && this.listaDePersonas.length > 0) {
        this.filtrarPorNombreCategoria();
      } else {
        // Si los datos no están cargados, esperar a que se carguen
        console.log('Esperando a que se carguen las categorías y personas...');
      }
    }
  }

  private cargarPersonasYFiltrar(): void {
    this._personaServicio.listar().subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          this.listaDePersonas = respuesta.valor;
          this.filtrarPorIdCategoria();
        }
      },
      error: (error) => {
        console.error('Error cargando personas:', error);
      }
    });
  }

  private filtrarPorIdCategoria(): void {
    if (!this.FiltroIdCategoria) return;
    
    this._productoServicio.listarPorCategoria(this.FiltroIdCategoria).subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          this.procesarProductos(respuesta.valor);
        } else {
          console.warn('No se encontraron productos para la categoría:', this.FiltroIdCategoria);
          this.productos = [];
        }
      },
      error: (error) => {
        console.error('Error cargando productos por categoría:', error);
        this.productos = [];
      }
    });
  }

  private filtrarPorNombreCategoria(): void {
    const categoria = this.listaCategorias.find(c => 
      c.nombre.toLowerCase() === this.Filtro?.toLowerCase()
    );
    
    if (categoria) {
      this._productoServicio.listarPorCategoria(categoria.id).subscribe({
        next: (respuesta) => {
          if (respuesta.estado) {
            this.procesarProductos(respuesta.valor);
          } else {
            console.warn('No se encontraron productos para la categoría:', this.Filtro);
            this.productos = [];
          }
        },
        error: (error) => {
          console.error('Error cargando productos por categoría:', error);
          this.productos = [];
        }
      });
    } else {
      console.warn(`Categoría '${this.Filtro}' no encontrada`);
      this.productos = [];
    }
  }

  procesarProductos(productos: Publicaciones[]): void {
    this.productos = productos.map(producto => {
      const persona = this.listaDePersonas.find(p => p.id === producto.idUsuario);
      const categoria = this.listaCategorias.find(c => c.id === producto.idCategoria);
      
      return {
        ...producto,
        verMas: false,
        nombreUsuario: persona?.nombreUsuario || 'Usuario desconocido',
        avatarUsuario: this.procesarAvatar(persona),
        nombreCategoria: categoria?.nombre || 'Sin categoría',
        fechaFormateada: this.formatearFecha(producto.fechaPublicacion),
        tiempoTranscurrido: this.calcularTiempoTranscurrido(producto.fechaPublicacion),
        imagenes: this.procesarImagenes(producto.descripcion)
      };
    });
  }

  // MÉTODO NUEVO: Procesar avatar similar a tu método cargarAvatarUsuario
  procesarAvatar(persona?: Persona): string {
    if (persona && persona.fotoPerfilBase64 && persona.fotoPerfilBase64.trim() !== '') {
      return 'data:image/jpeg;base64,' + persona.fotoPerfilBase64;
    }
    return 'icons/no-photo.webp';
  }

  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  calcularTiempoTranscurrido(fecha: string): string {
    const ahora = new Date();
    const fechaPublicacion = new Date(fecha);
    const diferencia = ahora.getTime() - fechaPublicacion.getTime();
    
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    if (minutos < 60) {
      return `${minutos}m`;
    } else if (horas < 24) {
      return `${horas}h`;
    } else if (dias < 7) {
      return `${dias}d`;
    } else {
      const semanas = Math.floor(dias / 7);
      return `${semanas}sem`;
    }
  }

  procesarImagenes(descripcion?: string): string[] {
    // Por ahora retorno imágenes por defecto
    // Puedes modificar esto según cómo manejes las imágenes en tu backend
    return [
      "icons/cuarto1.png",
      "icons/cuarto2.jpg",
      "icons/cuarto3.jpg"
    ];
  }

  reportarProducto(): void {
    const dialogRef = this.dialog.open(VentanaReportesComponent, {
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'modal-reporte-personalizado',
      width: '650px',
      maxWidth: '95%',
      data: {
        tipo: 'CREAR',
        tipoObjeto: 'publicacion'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reporte enviado:', result);
      } else {
        console.log('Diálogo cerrado sin enviar reporte');
      }
    });
  }

  toggleVerMas(producto: ProductoExtendido): void {
    producto.verMas = !producto.verMas;
    this.verDetalles(producto);
  }

  getPreviewUrls(fotos: string[], verMas: boolean): string[] {
    if (!fotos || fotos.length === 0) return [];
    return verMas ? fotos : fotos.slice(0, 3);
  }

  verDetalles(publicacion: ProductoExtendido): void {
    const dialogRef = this.dialog.open(VerProductosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '1000px',
      data: {
        tipo: 'VER_DETALLE',
        publicacion: publicacion
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      const producto = this.productos.find(p => p.id === publicacion.id);
      if (producto) {
        producto.verMas = false;
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}