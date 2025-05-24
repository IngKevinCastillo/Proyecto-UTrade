import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { VentanaComponent } from '../ventana/ventana.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ProductoService } from '../../../../Services/producto.service'; // Cambiado el nombre del servicio
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { FotosPublicacion } from '../../../../interfaces/fotos-publicacion';

@Component({
  selector: 'app-anuncio-preview',
  templateUrl: './anuncio-preview.component.html',
  styleUrls: ['./anuncio-preview.component.css']
})
export class AnuncioPreviewComponent implements OnInit {
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() userAvatar: string = '';
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() direccion: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
  @Input() fotos: File[] = [];
  @Input() esValido: boolean = false;
  publicacion?: Publicaciones;

  fechaActual: string = '';
  tiempoTranscurrido: string = 'Ahora';

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaComponent>,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private _publicacionServicio: ProductoService, // Nombre corregido del servicio
    @Inject(MAT_DIALOG_DATA) public datos: any) { }

  ngOnInit(): void {
    this.establecerFechaActual();

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

  establecerFechaActual(): void {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    this.fechaActual = `${dia}/${mes}/${año}`;
  }

  actualizarTiempoTranscurrido(tiempo: string): void {
    this.tiempoTranscurrido = tiempo;
  }

  actualizarFecha(fecha: string): void {
    this.fechaActual = fecha;
  }

  get previewUrls(): string[] {
    return (this.fotos.slice(0, 4))
      .map(file => URL.createObjectURL(file));
  }

  get previewUsername(): string {
    return this.username || 'Usuario';
  }

  get puedePublicar(): boolean {
    return this.title.trim() !== '' && 
           this.price.trim() !== '' && 
           this.direccion.trim() !== '' && 
           this.category !== '' && 
           this.fotos.length > 0;
  }

  // Método corregido para convertir File a Base64
  private async convertirFotoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remover el prefijo "data:image/...;base64," para obtener solo el Base64
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Método corregido para crear el objeto Publicaciones
  async cargarDatos(): Promise<Publicaciones> {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const fotosBase64: FotosPublicacion[] = [];

    // Convertir todas las fotos a Base64
    for (let i = 0; i < this.fotos.length; i++) {
      const fotoBase64 = await this.convertirFotoABase64(this.fotos[i]);
      fotosBase64.push({
        id: '', // Se asignará en el backend
        foto: fotoBase64,
        idPublicacion: '' // Se asignará en el backend
      });
    }

    const fechaActualISO = new Date().toISOString();

    const publicacion: Publicaciones = {
      id: '', // Se asignará en el backend
      titulo: this.title,
      fechaPublicacion: fechaActualISO,
      idUsuario: usuario?.idUsuario || '',
      precio: parseFloat(this.price) || 0,
      idCategoria: this.category,
      descripcion: this.description,
      direccion: this.direccion, // Campo agregado según tu actualización
      idEstado: '1', // Asumiendo que '1' es el estado activo, ajusta según tu lógica
      fotosPublicaciones: fotosBase64
    };

    return publicacion;
  }

  // Método corregido para publicar
  async publicar(): Promise<void> {
    if (!this.puedePublicar) {
      this.toastr.error('Por favor completa todos los campos requeridos y agrega al menos 1 foto', 'Error');
      return;
    }

    try {
      const publicacionData = await this.cargarDatos();
      
      this._publicacionServicio.guardar(publicacionData).subscribe({
        next: (response) => {
          if (response.estado) {
            this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
            this.dialogRef.close(true); // Pasamos true para indicar éxito
          } else {
            this.toastr.error(response.msg || 'Error al publicar el anuncio', 'Error');
          }
        },
        error: (error) => {
          console.error('Error al publicar:', error);
          this.toastr.error('Error al publicar el anuncio. Intenta nuevamente.', 'Error');
        }
      });
    } catch (error) {
      console.error('Error al procesar las fotos:', error);
      this.toastr.error('Error al procesar las fotos. Intenta nuevamente.', 'Error');
    }
  }
}