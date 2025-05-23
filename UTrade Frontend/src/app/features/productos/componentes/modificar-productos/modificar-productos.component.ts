import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrl: './modificar-productos.component.css'
})
export class ModificarProductosComponent {
  constructor(
    public dialogRef: MatDialogRef<ModificarProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public datos: any
  ) { }
  
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() userAvatar: string = 'icons/no-photo.webp';
    
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
    
  @Output() titleChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() closeClicked = new EventEmitter<void>();
  @Output() addPhotosClicked = new EventEmitter<void>();
  
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
    this.dialogRef.close();
  }
  
  @Input() fotos: File[] = [];
    
    get previewUrls(): string[] {
      return ( this.fotos.slice(0, 4))
        .map(file => URL.createObjectURL(file));
    }
    
    get previewUsername(): string {
      return this.username || 'Usuario';
    }
  
    editar(): void {
      this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
      this.dialogRef.close();
    }
  }