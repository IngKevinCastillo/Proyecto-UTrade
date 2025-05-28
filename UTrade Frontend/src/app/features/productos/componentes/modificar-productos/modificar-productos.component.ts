import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { CategoriaPublicacionService } from '../../../../Services/categoria-publicacion.service'; 
import { EstadosService } from '../../../../Services/estados.service';
import { CategoriaPublicacion } from '../../../../interfaces/categoria-publicacion'; 
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../../../Services/producto.service';
import { Estados } from '../../../../interfaces/estados';
import { FotosPublicacion } from '../../../../interfaces/fotos-publicacion';

export interface MiPublicacion extends Publicaciones {
  nombre?: string;
  tipoServicio?: string;
  estado?: 'Activo' | 'Baneado' | 'Eliminado' | 'Suspendido' | 'Advertido';
  imagen?: string;
  imagenes?: string[];
  fechaPublicacionDate?: Date;
  nombreCategoria?: string;
  estadoNombre?: string;
}

declare var google: any;

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrl: './modificar-productos.component.css'
})
export class ModificarProductosComponent implements OnInit {
  
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() userAvatar: string = 'icons/no-photo.webp';
  
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
  @Input() direccion: string = '';
  @Input() estado: string = '';
  
  @Output() titleChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() estadoChange = new EventEmitter<string>();
  @Output() direccionChange = new EventEmitter<string>();
  @Output() closeClicked = new EventEmitter<void>();
  @Output() addPhotosClicked = new EventEmitter<void>();
  
  @Input() fotos: File[] = [];
  
  publicacionOriginal: MiPublicacion | null = null;
  imagenesExistentes: string[] = [];
  fotosPublicaciones: FotosPublicacion[] = [];
  categories: CategoriaPublicacion[] = [];
  estados: Estados[] = [];
  loadingEstado: boolean = true;
  loadingCategorias: boolean = true;
  estadoSeleccionado: string = '';
  
  constructor(
    public dialogRef: MatDialogRef<ModificarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private toastr: ToastrService,
    private publicacionService: ProductoService,
    private categoriaService: CategoriaPublicacionService,
    private estadosService: EstadosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.cargarCategorias();
    this.cargarEstados();
    
    if (this.data && this.data.publicacion) {
      this.cargarDatosPublicacion(this.data.publicacion);
    }
  }

  private cargarCategorias(): void {
    this.loadingCategorias = true;
    this.categoriaService.lista().subscribe({
      next: (response) => {
        if (response.estado && response.valor) {
          this.categories = response.valor;
          console.log('Categorías cargadas:', this.categories);
        } else {
          this.categories = [
            {id: 'CAT01', nombre: 'Rentas'}, 
            {id: 'CAT02', nombre: 'Compras'}
          ];
        }
        this.loadingCategorias = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando categorías:', error);
        this.categories = [
          {id: 'CAT01', nombre: 'Rentas'}, 
          {id: 'CAT02', nombre: 'Compras'}
        ];
        this.loadingCategorias = false;
        this.toastr.warning('Se cargaron las categorías por defecto', 'Advertencia');
        this.cdr.detectChanges();
      }
    });
  }

  private cargarEstados(): void {
    this.loadingEstado = true;
    this.estadosService.lista().subscribe({
      next: (response) => {
        if (response.estado && response.valor) {
          this.estados = response.valor;
          console.log('Estados cargados:', this.estados);
        } else {
          this.estados = [
            {id: 'EST01', nombre: 'Activo'}, 
            {id: 'EST04', nombre: 'Suspendido'}
          ];
        }
        this.loadingEstado = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando estados:', error);
        this.estados = [
          {id: 'EST01', nombre: 'Activo'}, 
          {id: 'EST02', nombre: 'Baneado'},
          {id: 'EST03', nombre: 'Eliminado'},
          {id: 'EST04', nombre: 'Suspendido'},
          {id: 'EST05', nombre: 'Advertido'}
        ];
        this.loadingEstado = false;
        this.toastr.warning('Se cargaron los estados por defecto', 'Advertencia');
        this.cdr.detectChanges();
      }
    });
  }

  private cargarDatosUsuario(): void {
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
              this.userAvatar = 'data:image/jpeg;base64,' + datos.fotoPerfilBase64;
            } else {
              this.userAvatar = 'icons/no-photo.webp';
            }
          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        },
      });
    }
  }

  private cargarDatosPublicacion(publicacion: any): void {
    console.log('Datos recibidos de la publicación:', publicacion);
    
    this.publicacionOriginal = {
      id: publicacion.id,
      titulo: publicacion.titulo || publicacion.nombre || '',
      precio: publicacion.precio || 0,
      descripcion: publicacion.descripcion || '',
      direccion: publicacion.direccion || '',
      idCategoria: publicacion.idCategoria || '',
      idEstado: publicacion.idEstado || 'EST01',
      fechaPublicacion: publicacion.fechaPublicacion,
      idUsuario: publicacion.idUsuario || '',
      altitud: publicacion.altitud || 0,
      latitud: publicacion.latitud || 0,
      nombre: publicacion.nombre || publicacion.titulo || '',
      estado: publicacion.estado || publicacion.estadoNombre || 'Activo',
      tipoServicio: publicacion.tipoServicio || publicacion.nombreCategoria || '',
      imagen: publicacion.imagen || '',
      imagenes: publicacion.imagenes || [],
      nombreCategoria: publicacion.nombreCategoria || '',
      estadoNombre: publicacion.estadoNombre || publicacion.estado || ''
    };
    
    this.title = this.publicacionOriginal.titulo;
    this.price = this.publicacionOriginal.precio.toString();
    this.description = this.publicacionOriginal.descripcion;
    this.direccion = this.publicacionOriginal.direccion;
    
    this.estadoSeleccionado = publicacion.estado || publicacion.estadoNombre || 'Activo';
    this.estado = this.estadoSeleccionado;
    
    this.mapearCategoria(this.publicacionOriginal.idCategoria);
    this.cargarImagenesExistentes(publicacion);
    
    console.log('Datos cargados correctamente:', {
      id: this.publicacionOriginal.id,
      title: this.title,
      price: this.price,
      category: this.category,
      estado: this.estadoSeleccionado,
      idEstado: this.publicacionOriginal.idEstado,
      idCategoria: this.publicacionOriginal.idCategoria
    });
  }

  private mapearCategoria(idCategoria: string): void {
    const intentarMapeo = () => {
      const categoriaEncontrada = this.categories.find(cat => cat.id === idCategoria);
      
      if (categoriaEncontrada) {
        this.category = categoriaEncontrada.nombre;
      } else {
        switch(idCategoria) {
          case 'CAT01':
            this.category = 'Rentas'; 
            break;
          case 'CAT02':
            this.category = 'Compras'; 
            break;
          default:
            this.category = this.publicacionOriginal?.tipoServicio || this.publicacionOriginal?.nombreCategoria || '';
        }
      }
      console.log('Categoría mapeada:', this.category, 'desde ID:', idCategoria);
    };

    if (this.loadingCategorias) {
      setTimeout(intentarMapeo, 500);
    } else {
      intentarMapeo();
    }
  }

  private cargarImagenesExistentes(publicacion: MiPublicacion): void {
    this.imagenesExistentes = [];
    
    if (publicacion.imagenes && publicacion.imagenes.length > 0) {
      this.imagenesExistentes = [...publicacion.imagenes];
    } 
    else if (publicacion.imagen) {
      this.imagenesExistentes = [publicacion.imagen];
    }
    
    if (publicacion.imagen && !this.imagenesExistentes.includes(publicacion.imagen)) {
      this.imagenesExistentes.unshift(publicacion.imagen);
    }
  }

  private getCategoryId(): string {
    const selectedCat = this.categories.find(cat => cat.nombre === this.category);
    if (selectedCat) {
      return selectedCat.id;
    }
    switch(this.category) {
      case 'Rentas':
        return 'CAT01';
      case 'Compras':
        return 'CAT02';
      default:
        console.warn(`Categoría no reconocida: ${this.category}`);
        return this.publicacionOriginal?.idCategoria || 'CAT01';
    }
  }

  private obtenerIdEstado(): string {
    const estadoEncontrado = this.estados.find(estado => estado.nombre === this.estadoSeleccionado);
    if (estadoEncontrado) {
      return estadoEncontrado.id;
    }
    switch(this.estadoSeleccionado) {
      case 'Activo':
        return 'EST01';
      case 'Baneado':
        return 'EST02';
      case 'Eliminado':
        return 'EST03';
      case 'Suspendido':
        return 'EST04';
      case 'Advertido':
        return 'EST05';
      default:
        console.warn(`Estado no reconocido: ${this.estadoSeleccionado}, usando estado original o EST01 por defecto`);
        return this.publicacionOriginal?.idEstado || 'EST01';
    }
  }

  onTitleChange(value: string): void {
    this.title = value;
    this.titleChange.emit(value);
  }

  onPriceChange(value: string): void {
    this.price = value;
    this.priceChange.emit(value);
  }

  onCategoryChange(value: string): void {
    this.category = value;
    this.categoryChange.emit(value);
  }

  onEstadoChange(value: any): void {
    this.estado = value;
    this.estadoSeleccionado = value;
    this.estadoChange.emit(value);
    console.log(`Estado cambiado a: ${value} (ID: ${this.obtenerIdEstado()})`);
  }

  onDescriptionChange(value: string): void {
    this.description = value;
    this.descriptionChange.emit(value);
  }

  onDireccionChange(value: string): void {
    this.direccion = value;
    this.direccionChange.emit(value);
  }

  salir(): void {
    this.dialogRef.close(null);
  }

  get previewUrls(): string[] {
    const imagenesExistentesUrls = this.imagenesExistentes.slice(0, 4);
    const nuevasFotosUrls = this.fotos.slice(0, 4 - imagenesExistentesUrls.length).map(file => URL.createObjectURL(file));
    
    return [...imagenesExistentesUrls, ...nuevasFotosUrls];
  }

  get previewUsername(): string {
    return this.username || 'Usuario';
  }

  get tieneImagenes(): boolean {
    return this.imagenesExistentes.length > 0 || this.fotos.length > 0;
  }

  isInvalidPrice(): Boolean {
    return this.price === null || this.price === undefined || Number.isNaN(Number(this.price));
  }

  editar(): void {
    if (!this.title?.trim()) {
      this.toastr.error('El título es obligatorio', 'Error');
      return;
    }

    if (this.price === null || this.price === undefined || isNaN(Number(this.price))) {
      this.toastr.error('El precio debe ser un número válido', 'Error');
      return;
    }

    if (!this.category?.trim()) {
      this.toastr.error('La categoría es obligatoria', 'Error');
      return;
    }

    if (!this.direccion?.trim()) {
      this.toastr.error('La dirección es obligatoria', 'Error');
      return;
    }

    if (!this.publicacionOriginal?.id) {
      this.toastr.error('No se puede modificar: ID de publicación no válido', 'Error');
      return;
    }

    const idCategoria = this.getCategoryId();
    const idEstado = this.obtenerIdEstado();

    const publicacionModificada: Publicaciones = {
      id: this.publicacionOriginal.id, 
      titulo: this.title?.trim() || '',
      precio: Number(this.price),
      descripcion: this.description?.trim() || '',
      direccion: this.direccion?.trim() || '',
      idCategoria: idCategoria,
      idEstado: idEstado,
      fechaPublicacion: this.publicacionOriginal.fechaPublicacion,
      idUsuario: this.publicacionOriginal.idUsuario,
      altitud: this.publicacionOriginal.altitud,
      latitud: this.publicacionOriginal.latitud
    };   

    this.publicacionService.editar(publicacionModificada).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.estado) {
          this.toastr.success(`Publicación "${this.title}" modificada con éxito`, 'Éxito');
          this.dialogRef.close({
            accion: 'MODIFICAR',
            publicacionModificada: publicacionModificada
          });
        } else {
          this.toastr.error(response.msg || 'Error al modificar la publicación', 'Error');
          console.error('Error en la respuesta:', response);
        }
      },
      error: (error) => {
        console.error('Error al modificar la publicación:', error);
        this.toastr.error('Error al modificar la publicación', 'Error');
      }
    });
  }
}