import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { VentanaComponent } from '../ventana/ventana.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ProductoService } from '../../../../Services/producto.service';
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

  private fotosRestantes: File[] = [];

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
    if (this.fotos.length === 0) return [];
    return [URL.createObjectURL(this.fotos[0])]; 
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
      console.error('Error al obtener nuevo ID de foto:', error);
      return '';
    }
  }

  async cargarDatos(): Promise<Publicaciones> {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;
    const fotosBase64: FotosPublicacion[] = [];
    this.idNuevo = await this.obtenerIdNuevoPublicacion();
    const categoriaId = this.category === 'Rentas' ? 'CAT01' : this.category === 'Compras' ? 'CAT02' : '';

    this.fotosRestantes = this.fotos.slice(1);

    if (this.fotos.length > 0) {
      const primeraFoto = this.fotos[0];
      const fotoBase64 = await this.convertirFotoABase64(primeraFoto);
      fotosBase64.push({
        id: await this.obtenerIdNuevofoto(), 
        foto: fotoBase64,
        fotoBase64: fotoBase64,
        idPublicacion: this.idNuevo 
      });
    }

    const fechaActualISO = new Date().toISOString();
    
    const publicacion: Publicaciones = {
      id: this.idNuevo, 
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

  private async guardarFotosRestantes(): Promise<void> {
    if (this.fotosRestantes.length === 0) {
      return;
    }

    console.log(`Guardando ${this.fotosRestantes.length} fotos adicionales...`);

    for (let i = 0; i < this.fotosRestantes.length; i++) {
      try {
        const foto = this.fotosRestantes[i];
        const fotoBase64 = await this.convertirFotoABase64(foto);
        const nuevoIdFoto = await this.obtenerIdNuevofoto();

        const fotoPublicacion: FotosPublicacion = {
          id: nuevoIdFoto,
          foto: fotoBase64,
          fotoBase64: fotoBase64,
          idPublicacion: this.idNuevo
        };

        await this._fotosPublicacionServicio.guardar(fotoPublicacion).toPromise();
        console.log(`Foto ${i + 1} guardada exitosamente con ID: ${nuevoIdFoto}`);

      } catch (error) {
        console.error(`Error al guardar la foto ${i + 1}:`, error);
        this.toastr.warning(`Error al guardar una de las fotos adicionales`, 'Advertencia');
      }
    }

    console.log('Todas las fotos adicionales han sido procesadas');
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
        <b>Fotos en publicación:</b> ${publicacionData.fotosPublicaciones?.length} <br>
        <b>Fotos adicionales por guardar:</b> ${this.fotosRestantes.length}
        `, 'Información', { enableHtml: true })
      
      this._publicacionServicio.guardar(publicacionData).subscribe({
        next: async (response) => {
          if (response.estado) {
            this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
            
            if (this.fotosRestantes.length > 0) {
              this.toastr.info('Guardando fotos adicionales...', 'Procesando');
              await this.guardarFotosRestantes();
              this.toastr.success(`Se guardaron ${this.fotosRestantes.length} fotos adicionales`, 'Completado');
            }
            
            this.dialogRef.close(true);
          } else {
            console.log(response.msg);
            this.toastr.error(response.msg || 'Error al publicar el anuncio' + response.msg, 'Error');
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