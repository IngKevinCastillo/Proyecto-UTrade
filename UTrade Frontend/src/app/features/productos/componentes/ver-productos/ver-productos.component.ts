import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../../../../Services/chat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface MiPublicacion {
  id: string;
  titulo: string;
  tipoServicio?: string;
  precio?: number;
  fechaPublicacion: string;
  estado: string;
  imagen?: string;
  descripcion?: string;
  imagenes?: string[];
  idUsuario?: string;
  idCategoria?: string;
  nombreCategoria?: string;
  nombreUsuario?: string;
  avatarUsuario?: string;
  ubicacion?: string;
}

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css'],
})
export class VerProductosComponent implements OnInit {
  publicacion: MiPublicacion | null = null;
  imagenSeleccionada: string = '';
  imagenIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<VerProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _chatService: ChatService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.publicacion) {
      this.publicacion = this.data.publicacion;

      if (!this.publicacion?.imagenes) {
        this.publicacion!.imagenes = this.publicacion?.imagen
          ? [this.publicacion.imagen]
          : [];
      } else if (
        this.publicacion.imagen &&
        !this.publicacion.imagenes.includes(this.publicacion.imagen)
      ) {
        this.publicacion.imagenes.unshift(this.publicacion.imagen);
      }

      if (this.publicacion?.imagenes && this.publicacion.imagenes.length > 0) {
        this.imagenSeleccionada = this.publicacion.imagenes[0];
        this.imagenIndex = 0;
      } else if (this.publicacion?.imagen) {
        this.imagenSeleccionada = this.publicacion.imagen;
        this.imagenIndex = 0;
      }
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  seleccionarImagen(imagen: string, index: number): void {
    this.imagenSeleccionada = imagen;
    this.imagenIndex = index;
  }

  imagenAnterior(): void {
    if (this.publicacion?.imagenes && this.publicacion.imagenes.length > 0) {
      this.imagenIndex =
        this.imagenIndex > 0
          ? this.imagenIndex - 1
          : this.publicacion.imagenes.length - 1;
      this.imagenSeleccionada = this.publicacion.imagenes[this.imagenIndex];
    }
  }

  imagenSiguiente(): void {
    if (this.publicacion?.imagenes && this.publicacion.imagenes.length > 0) {
      this.imagenIndex =
        this.imagenIndex < this.publicacion.imagenes.length - 1
          ? this.imagenIndex + 1
          : 0;
      this.imagenSeleccionada = this.publicacion.imagenes[this.imagenIndex];
    }
  }

  contactar(): void {
    if (!this.publicacion) {
      this.toastr.error('No se encontró información del producto', 'Error');
      return;
    }

    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    const idUsuarioSesion: string | undefined = usuario.idUsuario;
    const idUsuarioProducto: string | undefined = this.publicacion.idUsuario;

    if (!idUsuarioSesion || !idUsuarioProducto) {
      this.toastr.error(
        'No se pudo obtener la información de los usuarios',
        'Error'
      );
      return;
    }

    if (idUsuarioSesion === idUsuarioProducto) {
      this.toastr.warning(
        'No puedes iniciar un chat contigo mismo',
        'Advertencia'
      );
      return;
    }

    this._chatService
      .verificarExistenciaChat(idUsuarioSesion, idUsuarioProducto)
      .subscribe({
        next: (res) => {
          if (res.estado) {
            if (res.valor && res.valor.trim() !== '') {
              this.navegarAlChat(res.valor);
            } else {
              this.crearNuevoChat(idUsuarioSesion, idUsuarioProducto);
            }
          } else {
            this.toastr.error(
              'Error al verificar la existencia del chat',
              'Error'
            );
          }
        },
        error: (error) => {
          this.toastr.error('Error al verificar el chat', 'Error');
        },
      });
  }

  private crearNuevoChat(idUsuario1: string, idUsuario2: string): void {
    const nuevoChat = {
      usuario1Id: idUsuario1,
      usuario2Id: idUsuario2,
    };

    this._chatService.guardar(nuevoChat).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.toastr.success('Chat creado exitosamente', 'Éxito');
          const chatId = res.valor.id || res.valor;
          this.navegarAlChat(chatId);
        } else {
          this.toastr.error('Error al crear el chat', 'Error');
        }
      },
      error: (error) => {
        this.toastr.error('Error al crear el chat', 'Error');
      },
    });
  }

  private navegarAlChat(chatId: string): void {
    this.dialogRef.close();
    this.router.navigate(['/chat'], { queryParams: { chatId: chatId } });
  }

  formatearFechaCompleta(fecha: string): string {
    const fechaObj = new Date(fecha);
    const fechaLocal = new Date(
      fechaObj.getTime() + fechaObj.getTimezoneOffset() * 60000
    );

    const meses = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];

    const dia = fechaLocal.getDate().toString().padStart(2, '0');
    const mes = meses[fechaLocal.getMonth()];
    const año = fechaLocal.getFullYear();

    return `${dia} ${mes} ${año}`;
  }
}
