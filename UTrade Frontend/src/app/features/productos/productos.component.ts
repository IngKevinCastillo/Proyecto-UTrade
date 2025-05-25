import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaReportesComponent } from './componentes/ventana-reportes/ventana-reportes.component';
import { VerProductosComponent } from './componentes/ver-productos/ver-productos.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../interfaces/persona';
import { CategoriaPublicacion } from '../../interfaces/categoria-publicacion';
import { CategoriaPublicacionService } from '../../Services/categoria-publicacion.service';
import { PersonaService } from '../../Services/persona.service';
import { ProductoService } from '../../Services/producto.service';
import { Publicaciones } from '../../interfaces/publicaciones';
import { forkJoin } from 'rxjs';
import { EstadosService } from '../../Services/estados.service';
import { Estados } from '../../interfaces/estados';
import { ToastrService } from 'ngx-toastr';
import { FotosPublicacionesService } from '../../Services/fotos-publicaciones.service';
import { FotosPublicacion } from '../../interfaces/fotos-publicacion';
import { ConexionBackendService } from '../../Services/conexion-backend.service';
import { HttpClient } from '@angular/common/http';

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
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnChanges, OnInit {

  formularioPublicaciones: FormGroup;
  listaDePersonas: Persona[] = [];
  listaCategorias: CategoriaPublicacion[] = [];
  listaEstados: Estados[] = []
  datosPublicaciones: Publicaciones | null = null;

  @Input() Filtro?: string;
  @Input() FiltroIdCategoria?: string; 
  @Input() FiltroLista?: Publicaciones[];
  @Input() cuota?: string;
  
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaPublicacionService,
    private _personaServicio: PersonaService,
    private _productoServicio: ProductoService,
    private _estadosServicio: EstadosService,
    private toastr: ToastrService,
    private _fotosPublicacionesServicio: FotosPublicacionesService,
    private conexionBackend: ConexionBackendService,
    private http: HttpClient,
  ) { 
    this.formularioPublicaciones = this.fb.group({
      id: ["", Validators.required],
      titulo: ["", Validators.required],
      fechaPublicacion: ["", Validators.required],
      idUsuario: ["", Validators.required],
      precio: ["", Validators.required],
      idCategoria: ["", Validators.required],
      descripcion: ["", Validators.required],
      ubicacion: [""],
      idReseña: [""],
      idEstado: ["", Validators.required]
    });
  }

  productos: ProductoExtendido[] = [];

  solicitar(producto: ProductoExtendido): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id: string = usuario?.idUsuario;
    const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;
    this.http.get(url).subscribe({
      next: (res: any) => {
        if (res?.estado && res?.valor) {
          const datos = res.valor;
          const usuarioF = datos.nombreUsuario || 'Usuario desconocido';
          this.toastr.info(`Lo siento ${usuarioF} esto esta en desarrollo `, "Info");
        }
      },
      error: (error) => {
        console.error('Error obteniendo usuario:', error);
        this.toastr.error('Error obteniendo usuario', "Error");
      }
    });
  }
  

  ngOnInit(): void {
    this.cargarDatosIniciales();
    
    if (this.datosPublicaciones != null) {
      this.formularioPublicaciones.patchValue({
        id: this.datosPublicaciones.id,
        titulo: this.datosPublicaciones.titulo,
        fechaPublicacion: this.datosPublicaciones.fechaPublicacion,
        idUsuario: this.datosPublicaciones.idUsuario,
        precio: this.datosPublicaciones.precio,
        idCategoria: this.datosPublicaciones.idCategoria,
        descripcion: this.datosPublicaciones.descripcion,
        ubicacion: this.datosPublicaciones.ubicacion,
        idReseña: this.datosPublicaciones.idReseña,
        idEstado: this.datosPublicaciones.idEstado
      });
    }
  }

  cargarDatosIniciales(): void {
    forkJoin({
      personas: this._personaServicio.listar(),
      categorias: this._categoriaServicio.lista(),
      estados: this._estadosServicio.lista()
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
        
        if (!this.Filtro && !this.FiltroLista && !this.FiltroIdCategoria) {
          this.cargarTodosLosProductos();
        } else if (this.Filtro && this.listaCategorias.length > 0) {
          this.filtrarPorNombreCategoria();
        }
      },
      error: (error) => {
        console.error('Error cargando datos iniciales:', error);
      }
    });
  }

  cargarTodosLosProductos(): void {
    this._productoServicio.lista().subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          this.procesarProductos(respuesta.valor);
        }
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['FiltroLista'] && this.FiltroLista) {
      this.procesarProductos(this.FiltroLista);
    }
    else if (changes['FiltroIdCategoria'] && this.FiltroIdCategoria) {
      if (this.listaDePersonas.length > 0) {
        this.filtrarPorIdCategoria();
      } else {
        this.cargarPersonasYFiltrar();
      }
    }
    else if (changes['Filtro'] && this.Filtro) {
      if (this.listaCategorias.length > 0 && this.listaDePersonas.length > 0) {
        this.filtrarPorNombreCategoria();
      } else {
        this.toastr.info('Esperando a que se carguen las categorías y personas...', "Info");
      }
    }
  }

  private cargarPersonasYFiltrar(): void {
    this._personaServicio.listar().subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          this.listaDePersonas = respuesta.valor;
          this.filtrarPorIdCategoria();
        }
      },
      error: (error) => {
        console.error('Error cargando personas:', error);
      }
    });
  }

  private filtrarPorIdCategoria(): void {
    if (!this.FiltroIdCategoria) return;
    
    this._productoServicio.listarPorCategoria(this.FiltroIdCategoria).subscribe({
      next: (respuesta) => {
        if (respuesta.estado) {
          this.procesarProductos(respuesta.valor);
        } else {
          this.toastr.error('No se encontraron productos para la categoría', "Info");
          this.productos = [];
        }
      },
      error: (error) => {
        console.error('Error cargando productos por categoría:', error);
        this.productos = [];
      }
    });
  }

  private filtrarPorNombreCategoria(): void {
    const categoria = this.listaCategorias.find(c => 
      c.nombre.toLowerCase() === this.Filtro?.toLowerCase()
    );
    
    if (categoria) {
      this._productoServicio.listarPorCategoria(categoria.id).subscribe({
        next: (respuesta) => {
          if (respuesta.estado) {
            this.procesarProductos(respuesta.valor);
          } else {
            this.toastr.error('No se encontraron productos para la categoría', "Info");
            this.productos = [];
          }
        },
        error: (error) => {
          console.error('Error cargando productos por categoría:', error);
          this.productos = [];
        }
      });
    } else {
      this.toastr.error(`Categoría no encontrada`, "Info");
      this.productos = [];
    }
  }

  procesarProductos(productos: Publicaciones[]): void {
    this.productos = productos.map(producto => {
      const persona = this.listaDePersonas.find(p => p.id === producto.idUsuario);
      const categoria = this.listaCategorias.find(c => c.id === producto.idCategoria);
      const _estado_ = this.listaEstados.find(c => c.id == producto.idEstado);
      const cuotaProducto = producto.idCategoria === "CAT01" ? ' / MES' : '';
      
      const productoExtendido: ProductoExtendido = {
        ...producto,
        verMas: false,
        nombreUsuario: persona?.nombreUsuario || 'Usuario desconocido',
        avatarUsuario: this.procesarAvatar(persona),
        nombreCategoria: categoria?.nombre || 'Sin categoría',
        estado: _estado_?.nombre || 'Sin estado',
        fechaFormateada: this.formatearFecha(producto.fechaPublicacion),
        tiempoTranscurrido: this.calcularTiempoTranscurrido(producto.fechaPublicacion),
        imagenes: [
          "icons/Image-not-found.png"
        ], 
        cuota: cuotaProducto 
      };
      this.cargarImagenesProducto(producto.id, productoExtendido);
      
      return productoExtendido;
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

  cargarImagenesProducto(idProducto: string | undefined, producto: ProductoExtendido): void {
    if (idProducto != null) {
      this._fotosPublicacionesServicio.buscarFotosPublicacion(idProducto).subscribe({
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
              producto.imagenes = [
                "icons/Image-not-found.png"
              ];
            }
          }
        },
        error: (error) => {
          console.error('Error cargando imágenes del producto:', error);
          producto.imagenes = [
            "icons/Image-not-found.png"
          ];
        }
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
      }
    });


    dialogRef.afterClosed().subscribe(result => {
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
      return ["icons/Image-not-found.png"]; 
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
      const producto = this.productos.find(p => p.id === publicacion.id);
      if (producto) {
        producto.verMas = false;
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}