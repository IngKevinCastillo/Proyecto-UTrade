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
import { FotosPublicacionesService } from '../../../../Services/fotos-publicaciones.service';

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
  idNuevo: string = '';

  fechaActual: string = '';
  tiempoTranscurrido: string = 'Ahora';

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaComponent>,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private _publicacionServicio: ProductoService, 
    private _fotosPublicacionServicio: FotosPublicacionesService,
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

  private async convertirFotoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async obtenerIdNuevoPublicacion(): Promise<string> {
    try {
      const res: any = await this._publicacionServicio.ObtenerIdNuevaPublicacion().toPromise();
      if (res && res.estado && res.valor) {
        return res.valor;
      }
      return '';
    } catch (error) {
      console.error('Error al obtener nuevo ID de publicación:', error);
      return '';
    }
  }

  async obtenerIdNuevofoto(): Promise<string> {
    try {
      const res: any = await this._fotosPublicacionServicio.ObtenerIdNuevaFotoPublicacion().toPromise();
      if (res && res.estado && res.valor) {
        return res.valor;
      }
      return '';
    } catch (error) {
      console.error('Error al obtener nuevo ID de publicación:', error);
      return '';
    }
  }
  async cargarDatos(): Promise<Publicaciones> {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;
    const fotosBase64: FotosPublicacion[] = [];
    this.idNuevo = await this.obtenerIdNuevoPublicacion();
    const categoriaId = this.category === 'Rentas' ? 'CAT01' : this.category === 'Compras' ? 'CAT02' : '';


    for (const foto of this.fotos) {
      const fotoBase64 = await this.convertirFotoABase64(foto);
      fotosBase64.push({
        id: await this.obtenerIdNuevofoto(), 
        foto: fotoBase64,
        fotoBase64: fotoBase64,
        idPublicacion: this.idNuevo 
      });
    }

    const fechaActualISO = new Date().toISOString();
    
    const publicacion: Publicaciones = {
      id:  this.idNuevo, 
      titulo: this.title,
      fechaPublicacion: fechaActualISO,
      idUsuario: usuario?.idUsuario || '',
      precio: parseFloat(this.price) || 0,
      idCategoria: categoriaId,
      descripcion: this.description,
      direccion: this.direccion, 
      idEstado: 'EST01', 
      fotosPublicaciones: fotosBase64,
    };

    return publicacion;
  }

  async publicar(): Promise<void> {
    if (!this.puedePublicar) {
      this.toastr.error('Por favor completa todos los campos requeridos y agrega al menos 1 foto', 'Error');
      return;
    }

    try {
      const publicacionData = await this.cargarDatos();

      this.toastr.info(`
        <b>ID:</b> ${publicacionData.id} <br>
        <b>IdUsuario:</b> ${publicacionData.idUsuario} <br>
        <b>Título:</b> ${publicacionData.titulo} <br>
        <b>Precio:</b> ${publicacionData.precio} <br>
        <b>Fecha:</b> ${publicacionData.fechaPublicacion} <br>
        <b>Categoría:</b> ${publicacionData.idCategoria} <br>
        <b>Descripción:</b> ${publicacionData.descripcion} <br>
        <b>Dirección:</b> ${publicacionData.direccion} <br>
        <b>Ubicación:</b> ${publicacionData.ubicacion} <br>
        <b>Estado:</b> ${publicacionData.idEstado} <br>
        <b>Fotos:</b> ${publicacionData.fotosPublicaciones?.length}
        `, 'Información', { enableHtml: true })
      
      this._publicacionServicio.guardar(publicacionData).subscribe({
        next: (response) => {
          if (response.estado) {
            this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
            this.dialogRef.close(true);
          } else {
            console.log(response.msg);
            this.toastr.error(response.msg || 'Error al publicar el anuncio'+ response.msg, 'Error');
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