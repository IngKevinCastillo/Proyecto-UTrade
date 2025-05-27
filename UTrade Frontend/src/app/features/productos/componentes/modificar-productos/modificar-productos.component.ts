import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { CategoriaPublicacionService } from '../../../../Services/categoria-publicacion.service'; 
import { CategoriaPublicacion } from '../../../../interfaces/categoria-publicacion'; 
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../../../Services/producto.service';
import { Estados } from '../../../../interfaces/estados';

export interface MiPublicacion {
  id: string;
  nombre: string;
  titulo?: string; 
  tipoServicio: string;
  precio: number;
  fechaPublicacion: Date;
  estado: 'Activo' | 'Baneado' | 'Eliminado' | 'Suspendido' | 'Advertido';
  imagen: string;
  descripcion?: string;
  imagenes?: string[];
  idUsuario?: string;
  idCategoria?: string;
  direccion?: string;
}

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
  @Input() estado: string = 'Activo';
  
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
  
  categories: CategoriaPublicacion[] = [];
  estados: Estados[] = [];
  loadingCategories: boolean = false;
  loadingEstado: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<ModificarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private categoriaService: CategoriaPublicacionService, 
    private toastr: ToastrService,
    private publicacionService: ProductoService
  ) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.loadCategories();
    
    if (this.data && this.data.publicacion) {
      this.cargarDatosPublicacion(this.data.publicacion);
    }
  }

  private loadCategories(): void {
    this.loadingCategories = true;
    this.categoriaService.lista().subscribe({
      next: (response) => {
        if (response.estado && response.valor) {
          this.categories = response.valor;
        } else {
          console.error('Error en la respuesta del servidor:', response.msg);
          this.setDefaultCategories();
        }
        this.loadingCategories = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.setDefaultCategories();
        this.loadingCategories = false;
      }
    });
  }

  private setDefaultCategories(): void {
    this.categories = [
      { id: 'CAT01', nombre: 'Rentas' },
      { id: 'CAT02', nombre: 'Compras' }
    ];
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
    
    this.publicacionOriginal = { ...publicacion };
    
    this.title = publicacion.titulo || publicacion.nombre || '';
    this.price = publicacion.precio ? publicacion.precio.toString() : '';
    this.description = publicacion.descripcion || '';
    this.direccion = publicacion.direccion || '';
    
    this.mapearCategoria(publicacion.idCategoria);
    this.cargarImagenesExistentes(publicacion);
    
    console.log('Datos cargados:', {
      title: this.title,
      price: this.price,
      category: this.category,
      description: this.description,
      direccion: this.direccion,
      imagenesExistentes: this.imagenesExistentes
    });
  }

  private mapearCategoria(idCategoria: string): void {
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
          this.category = this.publicacionOriginal?.tipoServicio || '';
      }
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
    return selectedCat ? selectedCat.id : '';
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

  onEstadoChange(value: string): void {
    this.estado = value;
    this.estadoChange.emit(value);
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

  editar(): void {
    if (!this.title.trim()) {
      this.toastr.error('El título es obligatorio', 'Error');
      return;
    }

    if (!this.price.trim() || isNaN(Number(this.price))) {
      this.toastr.error('El precio debe ser un número válido', 'Error');
      return;
    }

    if (!this.category.trim()) {
      this.toastr.error('La categoría es obligatoria', 'Error');
      return;
    }

    if (!this.direccion.trim()) {
      this.toastr.error('La dirección es obligatoria', 'Error');
      return;
    }

    const publicacionModificada: any = {
      ...this.publicacionOriginal!,
      titulo: this.title.trim(),
      nombre: this.title.trim(),
      precio: Number(this.price),
      tipoServicio: this.category,
      descripcion: this.description.trim(),
      direccion: this.direccion.trim()
    };

    console.log('Publicación modificada:', publicacionModificada);
    this.publicacionService.editar(publicacionModificada).subscribe({
      next: (response) => {
        if (response.estado) {
          this.toastr.success(`Publicación "${this.title}" modificada con éxito`, 'Éxito');
          this.dialogRef.close({
            accion: 'MODIFICAR',
            publicacionModificada: publicacionModificada
          });
        } else {
          this.toastr.error(response.msg || 'Error al modificar la publicación', 'Error');
        }
      },
      error: (error) => {
        console.error('Error al modificar la publicación:', error);
        this.toastr.error('Error al modificar la publicación', 'Error');
      }
    });
  }
}