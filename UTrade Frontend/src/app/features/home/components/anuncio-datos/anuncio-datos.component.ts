import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';

@Component({
  selector: 'app-anuncio-datos',
  templateUrl: './anuncio-datos.component.html',
  styleUrls: ['./anuncio-datos.component.css']
})
export class AnuncioDatosComponent {
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() userAvatar: string = 'icons/no-photo.webp';
    
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() direccion: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
    
  @Output() titleChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() direccionChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() closeClicked = new EventEmitter<void>();
  @Output() addPhotosClicked = new EventEmitter<void>();

  @Output() validationChange = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

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
  }

  private validarCampos(): void {
    const esValido = this.title.trim() !== '' && 
                     this.price.trim() !== '' && 
                     this.direccion.trim() !== '' && 
                     this.category !== '' && 
                     this.fotos.length > 0;
    
    this.validationChange.emit(esValido);
  }

  onTitleChange(value: string): void {
    this.title = value;
    this.titleChange.emit(value);
    this.validarCampos();
  }

  onPriceChange(value: string): void {
    this.price = value;
    this.priceChange.emit(value);
    this.validarCampos();
  }

  onDireccionChange(value: string): void {
    this.direccion = value;
    this.direccionChange.emit(value);
    this.validarCampos();
  }

  onCategoryChange(value: string): void {
    this.category = value;
    this.categoryChange.emit(value);
    this.validarCampos();
  }

  onDescriptionChange(value: string): void {
    this.description = value;
    this.descriptionChange.emit(value);
  }

  salir(): void {
    this.closeClicked.emit();
  }

  abrirInput(): void {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input?.click();
  }

  manejarFotos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.agregarArchivos(input.files);
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      this.agregarArchivos(event.dataTransfer.files);
    }
  }

  agregarArchivos(fileList: FileList): void {
    const nuevosArchivos = Array.from(fileList).slice(0, 4 - this.fotos.length);
    this.fotos = [...this.fotos, ...nuevosArchivos];
    this.fotosChange.emit(this.fotos);
    this.validarCampos();
  }

  eliminarFoto(index: number): void {
    this.fotos.splice(index, 1);
    this.fotosChange.emit(this.fotos);
    this.validarCampos();
  }

  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  @Input() fotos: File[] = [];
  @Output() fotosChange = new EventEmitter<File[]>();
}