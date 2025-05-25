import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VerProductosComponent } from '../../productos/componentes/ver-productos/ver-productos.component';
import { ModificarProductosComponent } from '../../productos/componentes/modificar-productos/modificar-productos.component';
import { ProductoService } from '../../../Services/producto.service'; 
import { PersonaService } from '../../../Services/persona.service'; 
import { CategoriaPublicacionService } from '../../../Services/categoria-publicacion.service'; 
import { EstadosService } from '../../../Services/estados.service'; 
import { FotosPublicacionesService } from '../../../Services/fotos-publicaciones.service'; 
import { Publicaciones } from '../../../interfaces/publicaciones'; 
import { Persona } from '../../../interfaces/persona';
import { CategoriaPublicacion } from '../../../interfaces/categoria-publicacion'; 
import { Estados } from '../../../interfaces/estados'; 
import { FotosPublicacion } from '../../../interfaces/fotos-publicacion'; 
import { RespuestaAPI } from '../../../interfaces/respuesta-api'; 
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

interface MiPublicacionExtendida extends Publicaciones {
  nombreUsuario?: string;
  avatarUsuario?: string;
  nombreCategoria?: string;
  estadoNombre?: string;
  fechaFormateada?: string;
  tiempoTranscurrido?: string;
  imagenes?: string[];
  cuota?: string;
  imagen?: string; 
  nombre?: string;
  tipoServicio?: string;
  estado?: string; 
  fechaPublicacionDate?: Date; 
}

@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.css'
})
export class MisPublicacionesComponent implements OnInit {

  publicaciones: MiPublicacionExtendida[] = [];
  listaDePersonas: Persona[] = [];
  listaCategorias: CategoriaPublicacion[] = [];
  listaEstados: Estados[] = [];
  cargando: boolean = true;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _productoServicio: ProductoService,
    private _personaServicio: PersonaService,
    private _categoriaServicio: CategoriaPublicacionService,
    private _estadosServicio: EstadosService,
    private _fotosPublicacionesServicio: FotosPublicacionesService
  ) { }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.cargando = true;
    
    forkJoin({
      personas: this._personaServicio.listar(),
      categorias: this._categoriaServicio.lista(),
      estados: this._estadosServicio.lista()
    }).subscribe({
      next: (respuestas: any) => {
        if (respuestas.personas.estado) {
          this.listaDePersonas = respuestas.personas.valor;
        }
        if (respuestas.categorias.estado) {
          this.listaCategorias = respuestas.categorias.valor;
        }
        if (respuestas.estados.estado) {
          this.listaEstados = respuestas.estados.valor;
        }
        
        this.cargarTodasLasPublicaciones(); 
      },
      error: (error: any) => {
        console.error('Error cargando datos iniciales:', error);
        this.toastr.error('Error al cargar los datos iniciales', 'Error');
        this.cargando = false;
      }
    });
  }

  cargarTodasLasPublicaciones(): void {
    this._productoServicio.lista().subscribe({
      next: (respuesta: any) => {
        if (respuesta.estado) {
          this.procesarPublicaciones(respuesta.valor);
        } else {
          this.toastr.error('No se pudieron cargar las publicaciones', 'Error');
        }
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error cargando publicaciones:', error);
        this.toastr.error('Error al cargar las publicaciones', 'Error');
        this.cargando = false;
      }
    });
  }

  procesarPublicaciones(publicaciones: Publicaciones[]): void {
    this.publicaciones = publicaciones.map(publicacion => {
      const persona = this.listaDePersonas.find(p => p.id === publicacion.idUsuario);
      const categoria = this.listaCategorias.find(c => c.id === publicacion.idCategoria);
      const estado = this.listaEstados.find(e => e.id === publicacion.idEstado);
      const cuotaProducto = publicacion.idCategoria === "CAT01" ? ' / MES' : '';
      
      const publicacionExtendida: MiPublicacionExtendida = {
        ...publicacion,
        nombreUsuario: persona?.nombreUsuario || 'Usuario desconocido',
        avatarUsuario: this.procesarAvatar(persona),
        nombreCategoria: categoria?.nombre || 'Sin categoría',
        estadoNombre: estado?.nombre || 'Sin estado',
        fechaFormateada: this.formatearFecha(publicacion.fechaPublicacion),
        tiempoTranscurrido: this.calcularTiempoTranscurrido(publicacion.fechaPublicacion),
        imagenes: ["icons/Image-not-found.png"],
        cuota: cuotaProducto,
        imagen: "icons/Image-not-found.png", 
        nombre: publicacion.titulo,
        tipoServicio: categoria?.nombre || 'Sin categoría',
        estado: estado?.nombre || 'Sin estado',
        fechaPublicacionDate: new Date(publicacion.fechaPublicacion)
      };

      this.cargarImagenesPublicacion(publicacion.id, publicacionExtendida);
      
      return publicacionExtendida;
    });
  }

  procesarAvatar(persona?: Persona): string {
    if (persona && persona.fotoPerfilBase64 && persona.fotoPerfilBase64.trim() !== '') {
      return 'data:image/jpeg;base64,' + persona.fotoPerfilBase64;
    }
    return 'icons/no-photo.webp';
  }

  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const offset = fechaObj.getTimezoneOffset() * 60000;
    const fechaLocal = new Date(fechaObj.getTime() - offset);
    return fechaLocal.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  calcularTiempoTranscurrido(fecha: string): string {
    const ahora = new Date();
    const fechaPublicacion = new Date(fecha);
    const diferencia = ahora.getTime() - fechaPublicacion.getTime();
    
    if (diferencia < 0) {
      return 'Ahora';
    }
    
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const meses = Math.floor(dias / 30);
    const años = Math.floor(dias / 365);
    
    if (años >= 1) {
      return años === 1 ? '1 año' : `${años} años`;
    } else if (meses >= 1) {
      return meses === 1 ? '1 mes' : `${meses} meses`;
    } else if (dias >= 1) {
      return dias === 1 ? '1d' : `${dias}d`;
    } else if (horas >= 1) {
      return horas === 1 ? '1h' : `${horas}h`;
    } else if (minutos >= 1) {
      return minutos === 1 ? '1m' : `${minutos}m`;
    } else {
      return 'Ahora';
    }
  }

  cargarImagenesPublicacion(idPublicacion: string | undefined, publicacion: MiPublicacionExtendida): void {
    if (idPublicacion != null) {
      this._fotosPublicacionesServicio.buscarFotosPublicacion(idPublicacion).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor) {
            const datos = res.valor;
            if (Array.isArray(datos) && datos.length > 0) {
              const imagenesBase64 = datos.map((foto: FotosPublicacion) => 
                foto.fotoBase64 && foto.fotoBase64.trim() !== ''
                  ? 'data:image/jpeg;base64,' + foto.fotoBase64
                  : 'icons/no-photo.webp'
              );
              
              publicacion.imagenes = imagenesBase64;
              publicacion.imagen = imagenesBase64[0]; 
            } else {
              publicacion.imagenes = ["icons/Image-not-found.png"];
              publicacion.imagen = "icons/Image-not-found.png";
            }
          }
        },
        error: (error: any) => {
          console.error('Error cargando imágenes de la publicación:', error);
          publicacion.imagenes = ["icons/Image-not-found.png"];
          publicacion.imagen = "icons/Image-not-found.png";
        }
      });
    }
  }

  modificarPublicacion(publicacion: MiPublicacionExtendida): void {
    console.log('Modificando publicación:', publicacion);
    
    const dialogRef = this.dialog.open(ModificarProductosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '1200px',
      maxHeight: '90vh',
      data: {
        tipo: 'MODIFICAR',
        publicacion: publicacion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      
      if (result && result.accion === 'MODIFICAR' && result.publicacionModificada) {
        // Recargar las publicaciones para obtener los datos actualizados
        this.cargarDatosIniciales();
        this.toastr.success(
          `La publicación "${result.publicacionModificada.titulo}" ha sido actualizada correctamente`, 
          'Publicación modificada'
        );
      }
    });
  }

  borrarPublicacion(publicacion: MiPublicacionExtendida): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas borrar "${publicacion.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then(result => {
      if (result.isConfirmed) {
        // Aquí deberías llamar al servicio para eliminar la publicación del backend
        // Como no tienes el método eliminar en ProductoService, por ahora elimino de la lista local
        // Descomenta la siguiente línea cuando tengas el método eliminar en tu servicio:
        // this._productoServicio.eliminar(publicacion.id).subscribe({
        
        // Simulación de eliminación exitosa - REEMPLAZA CON LA LLAMIDA REAL AL SERVICIO
        this.publicaciones = this.publicaciones.filter(p => p.id !== publicacion.id);
        this.toastr.success(
          `La publicación "${publicacion.titulo}" ha sido eliminada correctamente`, 
          'Publicación eliminada'
        );
        
        /* Descomenta esto cuando tengas el método eliminar:
        this._productoServicio.eliminar(publicacion.id).subscribe({
          next: (respuesta: any) => {
            if (respuesta.estado) {
              this.publicaciones = this.publicaciones.filter(p => p.id !== publicacion.id);
              this.toastr.success(
                `La publicación "${publicacion.titulo}" ha sido eliminada correctamente`, 
                'Publicación eliminada'
              );
            } else {
              this.toastr.error('No se pudo eliminar la publicación', 'Error');
            }
          },
          error: (error: any) => {
            console.error('Error eliminando publicación:', error);
            this.toastr.error('Error al eliminar la publicación', 'Error');
          }
        });
        */
      }
    });
  }

  verDetalles(publicacion: MiPublicacionExtendida): void {
    const publicacionParaModal = {
      id: publicacion.id,
      titulo: publicacion.titulo,
      precio: publicacion.precio,
      fechaPublicacion: publicacion.fechaPublicacion,
      fechaPublicacionDate: publicacion.fechaPublicacionDate,
      estado: publicacion.estadoNombre || 'Sin estado',
      descripcion: publicacion.descripcion,
      imagenes: publicacion.imagenes || [],
      idUsuario: publicacion.idUsuario,
      idCategoria: publicacion.idCategoria,
      nombreCategoria: publicacion.nombreCategoria,
      nombreUsuario: publicacion.nombreUsuario,
      avatarUsuario: publicacion.avatarUsuario,
      ubicacion: publicacion.ubicacion
    };

    const dialogRef = this.dialog.open(VerProductosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '1000px',
      data: {
        tipo: 'VER_DETALLE',
        publicacion: publicacionParaModal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ver detalles dialog result:', result);
    });
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Activo': return 'primary';
      case 'Baneado': return 'warn';
      case 'Eliminado': return 'accent';
      case 'Suspendido': return 'warn';
      case 'Advertido': return 'accent';
      default: return 'primary';
    }
  }
}