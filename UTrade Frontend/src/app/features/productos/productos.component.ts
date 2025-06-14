import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaReportesComponent } from './componentes/ventana-reportes/ventana-reportes.component';
import { VerProductosComponent } from './componentes/ver-productos/ver-productos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../interfaces/persona';
import { CategoriaPublicacion } from '../../interfaces/categoria-publicacion';
import { CategoriaPublicacionService } from '../../Services/categoria-publicacion.service';
import { PersonaService } from '../../Services/persona.service';
import { ProductoService } from '../../Services/producto.service';
import { FavoritosService } from '../../Services/favoritos.service';
import { Publicaciones } from '../../interfaces/publicaciones';
import { forkJoin, Subject, combineLatest } from 'rxjs';
import { EstadosService } from '../../Services/estados.service';
import { Estados } from '../../interfaces/estados';
import { ToastrService } from 'ngx-toastr';
import { FotosPublicacionesService } from '../../Services/fotos-publicaciones.service';
import { FotosPublicacion } from '../../interfaces/fotos-publicacion';
import { ChatService } from '../../Services/chat.service';
import { Router } from '@angular/router';
import { FiltrosService, FiltrosActivos } from '../../Services/filtros.service';
import { takeUntil } from 'rxjs/operators';

interface ProductoExtendido extends Publicaciones {
  verMas: boolean;
  nombreUsuario?: string;
  avatarUsuario?: string;
  nombreCategoria?: string;
  estado?: string;
  fechaFormateada?: string;
  tiempoTranscurrido?: string;
  imagenes?: string[];
  cuota?: string;
  esFavorito?: boolean;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnChanges, OnInit, OnDestroy {
  formularioPublicaciones: FormGroup;
  listaDePersonas: Persona[] = [];
  listaCategorias: CategoriaPublicacion[] = [];
  listaEstados: Estados[] = [];
  datosPublicaciones: Publicaciones | null = null;
  productos: ProductoExtendido[] = [];
  productosOriginales: ProductoExtendido[] = [];
  favoritosUsuario: string[] = [];

  @Input() Filtro?: string;
  @Input() FiltroIdCategoria?: string;
  @Input() FiltroLista?: Publicaciones[];
  @Input() cuota?: string;

  private destroy$ = new Subject<void>();
  private filtrosActivos: FiltrosActivos = {
    fecha: '',
    precio: { minimo: 0, maximo: 2000000 },
  };

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaPublicacionService,
    private _personaServicio: PersonaService,
    private _productoServicio: ProductoService,
    private _estadosServicio: EstadosService,
    private _favoritosService: FavoritosService,
    private toastr: ToastrService,
    private _fotosPublicacionesServicio: FotosPublicacionesService,
    private _chatService: ChatService,
    private router: Router,
    private filtrosService: FiltrosService
  ) {
    this.formularioPublicaciones = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      idUsuario: ['', Validators.required],
      precio: ['', Validators.required],
      idCategoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: [''],
      idReseña: [''],
      idEstado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.cargarFavoritosUsuario();
    this.suscribirseAFiltros();

    if (this.datosPublicaciones != null) {
      this.formularioPublicaciones.patchValue({
        id: this.datosPublicaciones.id,
        titulo: this.datosPublicaciones.titulo,
        fechaPublicacion: this.datosPublicaciones.fechaPublicacion,
        idUsuario: this.datosPublicaciones.idUsuario,
        precio: this.datosPublicaciones.precio,
        idCategoria: this.datosPublicaciones.idCategoria,
        descripcion: this.datosPublicaciones.descripcion,
        idEstado: this.datosPublicaciones.idEstado,
      });
    }
  }

  private cargarFavoritosUsuario(): void {
    const usuario = this.obtenerUsuarioActual();
    if (usuario) {
      this._favoritosService.buscarPorUsuario(usuario.idUsuario).subscribe({
        next: (respuesta) => {
          if (respuesta.estado && respuesta.valor) {
            this.favoritosUsuario = respuesta.valor.map(
              (fav) => fav.idPublicacion
            );
            this.actualizarEstadoFavoritos();
          }
        },
        error: (error) => {
          console.error('Error cargando favoritos del usuario:', error);
        },
      });
    }
  }

  private actualizarEstadoFavoritos(): void {
    this.productos.forEach((producto) => {
      producto.esFavorito = this.favoritosUsuario.includes(producto.id);
    });
  }

  private obtenerUsuarioActual(): any {
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

  toggleFavorito(producto: ProductoExtendido): void {
    const usuario = this.obtenerUsuarioActual();
    if (!usuario) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    if (usuario.idUsuario === producto.idUsuario) {
      this.toastr.warning(
        'No puedes agregar tu propia publicación a favoritos',
        'Advertencia'
      );
      return;
    }

    if (producto.esFavorito) {
      this.eliminarFavorito(producto, usuario.idUsuario);
    } else {
      this.agregarFavorito(producto, usuario.idUsuario);
    }
  }

  private agregarFavorito(
    producto: ProductoExtendido,
    idUsuario: string
  ): void {
    const nuevoFavorito = {
      id: '',
      idPersona: idUsuario,
      idPublicacion: producto.id,
    };

    this._favoritosService.crear(nuevoFavorito).subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          producto.esFavorito = true;
          this.favoritosUsuario.push(producto.id);
          this.toastr.success(
            `"${producto.titulo}" agregado a favoritos`,
            'Favorito agregado'
          );
        } else {
          this.toastr.error('Error al agregar a favoritos', 'Error');

          console.error('Error al agregar favorito:', respuesta.mgs);
        }
      },
      error: (error) => {
        console.error('Error agregando favorito:', error);
        this.toastr.error('Error al agregar a favoritos', 'Error');
      },
    });
  }

  private eliminarFavorito(
    producto: ProductoExtendido,
    idUsuario: string
  ): void {
    this._favoritosService
      .eliminarUsuarioPublicacion(idUsuario, producto.id)
      .subscribe({
        next: (respuesta) => {
          if (respuesta.estado) {
            producto.esFavorito = false;
            this.favoritosUsuario = this.favoritosUsuario.filter(
              (id) => id !== producto.id
            );
            this.toastr.success(
              `"${producto.titulo}" eliminado de favoritos`,
              'Favorito eliminado'
            );
          } else {
            this.toastr.error('Error al eliminar de favoritos', 'Error');
          }
        },
        error: (error) => {
          console.error('Error eliminando favorito:', error);
          this.toastr.error('Error al eliminar de favoritos', 'Error');
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.listaDePersonas.length === 0 ||
      this.listaCategorias.length === 0
    ) {
      return;
    }

    if (changes['FiltroLista']) {
      if (this.FiltroLista && this.FiltroLista.length >= 0) {
        this.procesarProductos(this.FiltroLista);
      }
      return;
    }

    if (changes['FiltroIdCategoria'] && this.FiltroIdCategoria) {
      this.filtrarPorIdCategoria();
    } else if (changes['Filtro'] && this.Filtro) {
      this.filtrarPorNombreCategoria();
    }
  }

  procesarProductos(productos: Publicaciones[]): void {
    if (!productos || productos.length === 0) {
      this.productos = [];
      return;
    }

    this.productos = productos.map((producto) => {
      const persona = this.listaDePersonas.find(
        (p) => p.id === producto.idUsuario
      );
      const categoria = this.listaCategorias.find(
        (c) => c.id === producto.idCategoria
      );
      const _estado_ = this.listaEstados.find((c) => c.id == producto.idEstado);
      const cuotaProducto = producto.idCategoria === 'CAT01' ? ' / MES' : '';

      const productoExtendido: ProductoExtendido = {
        ...producto,
        verMas: false,
        nombreUsuario: persona?.nombreUsuario || 'Usuario desconocido',
        avatarUsuario: this.procesarAvatar(persona),
        nombreCategoria: categoria?.nombre || 'Sin categoría',
        estado: _estado_?.nombre || 'Sin estado',
        fechaFormateada: this.formatearFecha(producto.fechaPublicacion),
        tiempoTranscurrido: this.calcularTiempoTranscurrido(
          producto.fechaPublicacion
        ),
        imagenes: ['icons/Image-not-found.png'],
        cuota: cuotaProducto,
        esFavorito: this.favoritosUsuario.includes(producto.id),
      };
      this.cargarImagenesProducto(producto.id, productoExtendido);

      return productoExtendido;
    });
  }

  private suscribirseAFiltros(): void {
    combineLatest([
      this.filtrosService.filtroFecha$,
      this.filtrosService.filtroPrecio$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([filtroFecha, filtroPrecio]) => {
        this.filtrosActivos = {
          fecha: filtroFecha,
          precio: filtroPrecio,
        };

        if (
          this.listaDePersonas.length > 0 &&
          this.listaCategorias.length > 0
        ) {
          this.aplicarFiltrosActivos();
        }
      });
  }

  private aplicarFiltrosActivos(): void {
    const hayFiltroFecha =
      this.filtrosActivos.fecha && this.filtrosActivos.fecha !== '';
    const hayFiltroPrecio =
      this.filtrosActivos.precio.minimo !== 0 ||
      this.filtrosActivos.precio.maximo !== 2000000;

    if (!hayFiltroFecha && !hayFiltroPrecio) {
      this.determinarDatosACargar();
      return;
    }

    if (hayFiltroFecha && hayFiltroPrecio) {
      this.aplicarFiltroFecha();
    } else if (hayFiltroFecha) {
      this.aplicarFiltroFecha();
    } else if (hayFiltroPrecio) {
      this.aplicarFiltroPrecio();
    }
  }

  private aplicarFiltroFecha(): void {
    this._productoServicio.listarPorFecha(this.filtrosActivos.fecha).subscribe({
      next: (respuesta) => {
        if (respuesta.estado && Array.isArray(respuesta.valor)) {
          let productosFiltrados = respuesta.valor;

          const hayFiltroPrecio =
            this.filtrosActivos.precio.minimo !== 0 ||
            this.filtrosActivos.precio.maximo !== 2000000;

          if (hayFiltroPrecio) {
            productosFiltrados = productosFiltrados.filter(
              (producto) =>
                producto.precio >= this.filtrosActivos.precio.minimo &&
                producto.precio <= this.filtrosActivos.precio.maximo
            );
          }

          this.procesarProductos(productosFiltrados);
        } else {
          this.productos = [];
          this.toastr.info(
            'No se encontraron productos para el filtro de fecha',
            'Filtro'
          );
        }
      },
      error: (error) => {
        console.error('Error aplicando filtro de fecha:', error);
        this.productos = [];
        this.toastr.error('Error al aplicar filtro de fecha', 'Error');
      },
    });
  }

  private aplicarFiltroPrecio(): void {
    this._productoServicio
      .listarRangoPrecio(
        this.filtrosActivos.precio.minimo,
        this.filtrosActivos.precio.maximo
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta.estado && Array.isArray(respuesta.valor)) {
            this.procesarProductos(respuesta.valor);
          } else {
            this.productos = [];
            this.toastr.info(
              'No se encontraron productos en el rango de precio',
              'Filtro'
            );
          }
        },
        error: (error) => {
          console.error('Error aplicando filtro de precio:', error);
          this.productos = [];
          this.toastr.error('Error al aplicar filtro de precio', 'Error');
        },
      });
  }

  cargarDatosIniciales(): void {
    forkJoin({
      personas: this._personaServicio.listar(),
      categorias: this._categoriaServicio.lista(),
      estados: this._estadosServicio.lista(),
    }).subscribe({
      next: (respuestas) => {
        if (respuestas.personas.estado) {
          this.listaDePersonas = respuestas.personas.valor;
        }
        if (respuestas.categorias.estado) {
          this.listaCategorias = respuestas.categorias.valor;
        }
        if (respuestas.estados.estado) {
          this.listaEstados = respuestas.estados.valor;
        }

        this.determinarDatosACargar();
      },
      error: (error) => {
        console.error('Error cargando datos iniciales:', error);
      },
    });
  }

  private determinarDatosACargar(): void {
    if (this.FiltroLista && this.FiltroLista.length >= 0) {
      this.procesarProductos(this.FiltroLista);
    } else if (this.FiltroIdCategoria) {
      this.filtrarPorIdCategoria();
    } else if (this.Filtro) {
      this.filtrarPorNombreCategoria();
    } else {
      this.cargarTodosLosProductos();
    }
  }

  cargarTodosLosProductos(): void {
    this._productoServicio.listarActivos().subscribe({
      next: (respuesta) => {
        if (respuesta.estado && Array.isArray(respuesta.valor)) {
          this.procesarProductos(respuesta.valor);
        } else {
          this.productos = [];
        }
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.productos = [];
      },
    });
  }

  private filtrarPorIdCategoria(): void {
    if (!this.FiltroIdCategoria) {
      this.cargarTodosLosProductos();
      return;
    }

    this._productoServicio
      .listarPorCategoria(this.FiltroIdCategoria)
      .subscribe({
        next: (respuesta) => {
          if (respuesta.estado && Array.isArray(respuesta.valor)) {
            this.procesarProductos(respuesta.valor);
          } else {
            this.productos = [];
            this.toastr.info(
              'No se encontraron productos para la categoría',
              'Filtro'
            );
          }
        },
        error: (error) => {
          console.error('Error cargando productos por categoría:', error);
          this.productos = [];
        },
      });
  }

  private filtrarPorNombreCategoria(): void {
    if (!this.Filtro || this.listaCategorias.length === 0) {
      this.cargarTodosLosProductos();
      return;
    }

    const categoria = this.listaCategorias.find(
      (c) => c.nombre.toLowerCase() === this.Filtro?.toLowerCase()
    );

    if (categoria) {
      this._productoServicio.listarPorCategoria(categoria.id).subscribe({
        next: (respuesta) => {
          if (respuesta.estado && Array.isArray(respuesta.valor)) {
            this.procesarProductos(respuesta.valor);
          } else {
            this.productos = [];
            this.toastr.info(
              'No se encontraron productos para la categoría',
              'Filtro'
            );
          }
        },
        error: (error) => {
          console.error('Error cargando productos por categoría:', error);
          this.productos = [];
        },
      });
    } else {
      this.productos = [];
      this.toastr.error(`Categoría "${this.Filtro}" no encontrada`, 'Error');
    }
  }

  solicitar(producto: ProductoExtendido): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    const idUsuarioSesion = usuario.idUsuario;
    const idUsuarioProducto = producto.idUsuario;

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
          console.error('Error verificando chat:', error);
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
        console.error('Error creando chat:', error);
        this.toastr.error('Error al crear el chat', 'Error');
      },
    });
  }

  private navegarAlChat(chatId: string): void {
    this.router.navigate(['/chat'], { queryParams: { chatId: chatId } });
  }

  navegarAResenas(idPublicacion: string, idPropietario?: string): void {
    this.router.navigate(['/resenas'], {
      queryParams: {
        idPublicacion: idPublicacion,
        idPropietario: idPropietario,
      },
    });
  }

  procesarAvatar(persona?: Persona): string {
    if (
      persona &&
      persona.fotoPerfilBase64 &&
      persona.fotoPerfilBase64.trim() !== ''
    ) {
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
      year: 'numeric',
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

  cargarImagenesProducto(
    idProducto: string | undefined,
    producto: ProductoExtendido
  ): void {
    if (idProducto != null) {
      this._fotosPublicacionesServicio
        .buscarFotosPublicacion(idProducto)
        .subscribe({
          next: (res: any) => {
            if (res?.estado && res?.valor) {
              const datos = res.valor;
              if (Array.isArray(datos) && datos.length > 0) {
                producto.imagenes = datos.map((foto: FotosPublicacion) =>
                  foto.fotoBase64 && foto.fotoBase64.trim() !== ''
                    ? 'data:image/jpeg;base64,' + foto.fotoBase64
                    : 'icons/no-photo.webp'
                );
              } else {
                producto.imagenes = ['icons/Image-not-found.png'];
              }
            }
          },
          error: (error) => {
            console.error('Error cargando imágenes del producto:', error);
            producto.imagenes = ['icons/Image-not-found.png'];
          },
        });
    }
  }

  reportarProducto(producto: Publicaciones): void {
    const dialogRef = this.dialog.open(VentanaReportesComponent, {
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'modal-reporte-personalizado',
      width: '650px',
      maxWidth: '95%',
      data: {
        tipo: 'CREAR',
        tipoObjeto: 'publicacion',
        producto,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Reporte enviado:', result);
      } else {
        console.log('Diálogo cerrado sin enviar reporte');
      }
    });
  }

  toggleVerMas(producto: ProductoExtendido): void {
    producto.verMas = !producto.verMas;
    this.verDetalles(producto);
  }

  getPreviewUrls(fotos: string[] | undefined, verMas: boolean): string[] {
    if (!fotos || fotos.length === 0) {
      return ['icons/Image-not-found.png'];
    }
    return verMas ? fotos : fotos.slice(0, 3);
  }

  verDetalles(publicacion: ProductoExtendido): void {
    const publicacionParaModal = {
      id: publicacion.id,
      titulo: publicacion.titulo,
      precio: publicacion.precio,
      fechaPublicacion: publicacion.fechaPublicacion,
      estado: publicacion.estado || 'Sin estado',
      descripcion: publicacion.descripcion,
      imagenes: publicacion.imagenes || [],
      idUsuario: publicacion.idUsuario,
      idCategoria: publicacion.idCategoria,
      nombreCategoria: publicacion.nombreCategoria,
      nombreUsuario: publicacion.nombreUsuario,
      avatarUsuario: publicacion.avatarUsuario,
      latitud: publicacion.latitud,
      altitud: publicacion.altitud,
    };

    const dialogRef = this.dialog.open(VerProductosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '95%',
      data: {
        tipo: 'VER_DETALLE',
        publicacion: publicacionParaModal,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      const producto = this.productos.find((p) => p.id === publicacion.id);
      if (producto) {
        producto.verMas = false;
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}
