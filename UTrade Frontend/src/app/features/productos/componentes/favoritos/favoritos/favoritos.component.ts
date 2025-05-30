import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoritosService } from '../../../../../Services/favoritos.service';
import { PublicacionService } from '../../../../../Services/publicacion.service';
import { FotosPublicacionesService } from '../../../../../Services/fotos-publicaciones.service';
import { PersonaService } from '../../../../../Services/persona.service';
import {
  Usuario,
  Favorito,
  FavoritoExtendido,
  RespuestaAPI,
  Publicacion,
  Persona,
  FotoPublicacion,
} from '../../../../../interfaces/favorito';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit, OnDestroy {
  favoritos: FavoritoExtendido[] = [];
  cargando: boolean = true;
  nombreUsuario: string = '';
  mostrarModal: boolean = false;
  publicacionSeleccionada: FavoritoExtendido | null = null;

  indiceImagenActual: number = 0;
  intervalCarrusel: any = null;
  tiempoAutoplay: number = 5000;

  constructor(
    private favoritosService: FavoritosService,
    private publicacionService: PublicacionService,
    private fotosPublicacionesService: FotosPublicacionesService,
    private personaService: PersonaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  ngOnDestroy(): void {
    this.detenerCarrusel();
  }

  private obtenerUsuarioActual(): Usuario | null {
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      try {
        return JSON.parse(usuarioStorage);
      } catch (error) {
        console.error('Error parseando usuario del localStorage:', error);
      }
    }
    return null;
  }

  cargarFavoritos(): void {
    this.cargando = true;
    const usuario = this.obtenerUsuarioActual();

    if (!usuario) {
      this.toastr.error('No se pudo obtener el usuario actual', 'Error');
      this.cargando = false;
      return;
    }

    this.nombreUsuario = usuario.correo.split('@')[0];

    this.favoritosService.buscarPorUsuario(usuario.idUsuario).subscribe({
      next: (respuesta: RespuestaAPI<Favorito[]>) => {
        if (respuesta.estado && respuesta.valor) {
          this.procesarFavoritos(respuesta.valor);
        } else {
          this.toastr.info('No tienes favoritos aún', 'Información');
          this.cargando = false;
        }
      },
      error: (error: any) => {
        console.error('Error cargando favoritos:', error);
        this.toastr.error('Error al cargar los favoritos', 'Error');
        this.cargando = false;
      },
    });
  }

  private procesarFavoritos(favoritos: Favorito[]): void {
    let favoritosProcessados = 0;
    const totalFavoritos = favoritos.length;

    if (totalFavoritos === 0) {
      this.cargando = false;
      return;
    }

    favoritos.forEach((favorito) => {
      this.publicacionService.obtenerPorId(favorito.idPublicacion).subscribe({
        next: (detallePublicacion: RespuestaAPI<Publicacion>) => {
          if (detallePublicacion.estado && detallePublicacion.valor) {
            const publicacion = detallePublicacion.valor;

            const favoritoExtendido: FavoritoExtendido = {
              ...favorito,
              titulo: publicacion.titulo || 'Sin título',
              descripcion: publicacion.descripcion || 'Sin descripción',
              precio: publicacion.precio || 0,
              fechaPublicacion: publicacion.fechaPublicacion,
              nombreUsuario: 'Cargando...',
              avatarUsuario: 'icons/no-photo.webp',
              nombreCategoria: this.obtenerNombreCategoria(
                publicacion.idCategoria
              ),
              estadoNombre: this.obtenerNombreEstado(publicacion.idEstado),
              fechaFormateada: this.formatearFecha(
                publicacion.fechaPublicacion
              ),
              tiempoTranscurrido: this.calcularTiempoTranscurrido(
                publicacion.fechaPublicacion
              ),
              imagenes: ['icons/Image-not-found.png'],
              cuota: publicacion.idCategoria === 'CAT01' ? ' / MES' : '',
              imagen: 'icons/Image-not-found.png',
              fechaPublicacionDate: new Date(publicacion.fechaPublicacion),
              direccion: publicacion.direccion,
              altitud: publicacion.altitud,
              latitud: publicacion.latitud,
            };

            forkJoin({
              persona: this.personaService.buscar(publicacion.idUsuario),
              fotos: this.fotosPublicacionesService.buscarFotosPublicacion(
                publicacion.id
              ),
            }).subscribe({
              next: (respuestas) => {
                if (respuestas.persona.estado && respuestas.persona.valor) {
                  const persona = respuestas.persona.valor;
                  favoritoExtendido.nombreUsuario =
                    persona.nombreUsuario ||
                    `${persona.nombres} ${persona.apellidos}`;
                  favoritoExtendido.avatarUsuario =
                    this.procesarAvatar(persona);
                }

                if (
                  respuestas.fotos.estado &&
                  respuestas.fotos.valor &&
                  respuestas.fotos.valor.length > 0
                ) {
                  const imagenesBase64 = respuestas.fotos.valor.map(
                    (foto: FotoPublicacion) =>
                      foto.foto && foto.foto.trim() !== ''
                        ? 'data:image/jpeg;base64,' + foto.foto
                        : 'icons/Image-not-found.png'
                  );

                  favoritoExtendido.imagenes = imagenesBase64;
                  favoritoExtendido.imagen = imagenesBase64[0];
                } else {
                  favoritoExtendido.imagenes = ['icons/Image-not-found.png'];
                  favoritoExtendido.imagen = 'icons/Image-not-found.png';
                }

                this.favoritos.push(favoritoExtendido);

                favoritosProcessados++;
                if (favoritosProcessados === totalFavoritos) {
                  this.cargando = false;
                }
              },
              error: (error) => {
                console.error('Error cargando datos adicionales:', error);
                this.favoritos.push(favoritoExtendido);

                favoritosProcessados++;
                if (favoritosProcessados === totalFavoritos) {
                  this.cargando = false;
                }
              },
            });
          } else {
            favoritosProcessados++;
            if (favoritosProcessados === totalFavoritos) {
              this.cargando = false;
            }
          }
        },
        error: (error: any) => {
          console.error('Error cargando detalles de publicación:', error);
          favoritosProcessados++;
          if (favoritosProcessados === totalFavoritos) {
            this.cargando = false;
          }
        },
      });
    });
  }

  iniciarCarrusel(): void {
    if (
      this.publicacionSeleccionada &&
      this.publicacionSeleccionada.imagenes &&
      this.publicacionSeleccionada.imagenes.length > 1
    ) {
      this.intervalCarrusel = setInterval(() => {
        this.siguienteImagen();
      }, this.tiempoAutoplay);
    }
  }

  detenerCarrusel(): void {
    if (this.intervalCarrusel) {
      clearInterval(this.intervalCarrusel);
      this.intervalCarrusel = null;
    }
  }

  siguienteImagen(): void {
    if (this.publicacionSeleccionada && this.publicacionSeleccionada.imagenes) {
      this.indiceImagenActual =
        (this.indiceImagenActual + 1) %
        this.publicacionSeleccionada.imagenes.length;
    }
  }

  imagenAnterior(): void {
    if (this.publicacionSeleccionada && this.publicacionSeleccionada.imagenes) {
      this.indiceImagenActual =
        this.indiceImagenActual === 0
          ? this.publicacionSeleccionada.imagenes.length - 1
          : this.indiceImagenActual - 1;
    }
  }

  irAImagen(indice: number): void {
    this.indiceImagenActual = indice;
  }

  get tieneMultiplesImagenes(): boolean {
    return this.publicacionSeleccionada?.imagenes
      ? this.publicacionSeleccionada.imagenes.length > 1
      : false;
  }

  get imagenActual(): string {
    if (
      this.publicacionSeleccionada?.imagenes &&
      this.publicacionSeleccionada.imagenes[this.indiceImagenActual]
    ) {
      return this.publicacionSeleccionada.imagenes[this.indiceImagenActual];
    }
    return 'icons/Image-not-found.png';
  }

  private procesarAvatar(persona: Persona): string {
    if (
      persona &&
      persona.fotoPerfilBase64 &&
      persona.fotoPerfilBase64.trim() !== ''
    ) {
      return 'data:image/jpeg;base64,' + persona.fotoPerfilBase64;
    }
    return 'icons/no-photo.webp';
  }

  private obtenerNombreCategoria(idCategoria: string): string {
    const categorias: { [key: string]: string } = {
      CAT01: 'Renta',
      CAT02: 'Compra',
    };
    return categorias[idCategoria] || 'Sin categoría';
  }

  private obtenerNombreEstado(idEstado: string): string {
    const estados: { [key: string]: string } = {
      EST01: 'Activo',
      EST02: 'Inactivo',
      EST03: 'Suspendido',
    };
    return estados[idEstado] || 'Sin estado';
  }

  eliminarFavorito(favorito: FavoritoExtendido): void {
    const usuario = this.obtenerUsuarioActual();
    if (!usuario) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar "${favorito.titulo}" de tus favoritos?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        this.favoritosService
          .eliminarUsuarioPublicacion(usuario.idUsuario, favorito.idPublicacion)
          .subscribe({
            next: (respuesta: RespuestaAPI<any>) => {
              if (respuesta.estado) {
                this.favoritos = this.favoritos.filter(
                  (f) => f.id !== favorito.id
                );
                if (this.mostrarModal) {
                  this.cerrarModal();
                }
                this.toastr.success(
                  'Favorito eliminado correctamente',
                  'Éxito'
                );
              } else {
                this.toastr.error('Error al eliminar el favorito', 'Error');
              }
            },
            error: (error: any) => {
              console.error('Error eliminando favorito:', error);
              this.toastr.error('Error al eliminar el favorito', 'Error');
            },
          });
      }
    });
  }

  verDetalles(favorito: FavoritoExtendido): void {
    this.publicacionSeleccionada = favorito;
    this.indiceImagenActual = 0;
    this.mostrarModal = true;

    setTimeout(() => {
      this.iniciarCarrusel();
    }, 100);
  }

  cerrarModal(): void {
    this.detenerCarrusel();
    this.mostrarModal = false;
    this.publicacionSeleccionada = null;
    this.indiceImagenActual = 0;
  }

  formatearPrecio(precio: number): string {
    return precio.toLocaleString('es-CO');
  }

  private formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  private calcularTiempoTranscurrido(fecha: string): string {
    const ahora = new Date();
    const fechaPublicacion = new Date(fecha);
    const diferencia = ahora.getTime() - fechaPublicacion.getTime();

    if (diferencia < 0) return 'Ahora';

    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const meses = Math.floor(dias / 30);
    const años = Math.floor(dias / 365);

    if (años >= 1) return años === 1 ? '1 año' : `${años} años`;
    if (meses >= 1) return meses === 1 ? '1 mes' : `${meses} meses`;
    if (dias >= 1) return dias === 1 ? '1d' : `${dias}d`;
    if (horas >= 1) return horas === 1 ? '1h' : `${horas}h`;
    if (minutos >= 1) return minutos === 1 ? '1m' : `${minutos}m`;
    return 'Ahora';
  }

  getEstadoBadgeClass(estado: string): string {
    switch (estado) {
      case 'Activo':
        return 'bg-success';
      case 'Inactivo':
        return 'bg-secondary';
      case 'Suspendido':
        return 'bg-warning';
      case 'Baneado':
        return 'bg-danger';
      case 'Eliminado':
        return 'bg-dark';
      default:
        return 'bg-primary';
    }
  }
}
