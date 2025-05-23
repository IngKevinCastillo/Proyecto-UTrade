import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ToastrService } from 'ngx-toastr';

export interface MiPublicacion {
  id: string;
  nombre: string;
  tipoServicio: string;
  precio: number;
  fechaPublicacion: Date;
  estado: 'Activo' | 'Baneado' | 'Eliminado' | 'Suspendido' | 'Advertido';
  imagen: string;
  descripcion?: string;
  imagenes?: string[];
  idUsuario?: string;
  idCategoria?: string;
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
  
  // Datos del producto
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
  
  // Eventos
  @Output() titleChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() closeClicked = new EventEmitter<void>();
  @Output() addPhotosClicked = new EventEmitter<void>();
  
  @Input() fotos: File[] = [];
  
  publicacionOriginal: MiPublicacion | null = null;
  
  imagenesExistentes: string[] = [];
  
  constructor(
    public dialogRef: MatDialogRef<ModificarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private toastr: ToastrService
  ) { }

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
            this.userAvatar =
              'data:image/jpeg;base64,' + datos.fotoPerfilBase64;
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

  if (this.data && this.data.publicacion) {
    this.cargarDatosPublicacion(this.data.publicacion);
  }
}

private cargarDatosPublicacion(publicacion: MiPublicacion): void {
  this.publicacionOriginal = { ...publicacion };
  
  this.title = publicacion.nombre;
  this.price = publicacion.precio.toString();
  this.category = publicacion.tipoServicio;
  this.description = publicacion.descripcion || '';
  
  this.cargarImagenesExistentes(publicacion);
  
  console.log('Datos cargados:', {
    title: this.title,
    price: this.price,
    category: this.category,
    description: this.description,
    imagenesExistentes: this.imagenesExistentes
  });
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

  onDescriptionChange(value: string): void {
    this.description = value;
    this.descriptionChange.emit(value);
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

    const publicacionModificada: MiPublicacion = {
      ...this.publicacionOriginal!,
      nombre: this.title.trim(),
      precio: Number(this.price),
      tipoServicio: this.category,
      descripcion: this.description.trim(),
      imagenes: this.imagenesExistentes,
      imagen: this.imagenesExistentes.length > 0 ? this.imagenesExistentes[0] : this.publicacionOriginal!.imagen
    };

    this.toastr.success(`Publicación "${this.title}" modificada con éxito`, 'Éxito');
    
    this.dialogRef.close({
      accion: 'MODIFICAR',
      publicacionModificada: publicacionModificada
    });
  }
}