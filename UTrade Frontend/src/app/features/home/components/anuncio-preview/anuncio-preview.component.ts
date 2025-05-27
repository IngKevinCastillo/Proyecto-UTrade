import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { VentanaComponent } from '../ventana/ventana.component';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { FotosPublicacion } from '../../../../interfaces/fotos-publicacion';
import { FotosPublicacionesService } from '../../../../Services/fotos-publicaciones.service';
import { Universidad } from '../../../../interfaces/universidad';

declare var google: any;

@Component({
  selector: 'app-anuncio-preview',
  templateUrl: './anuncio-preview.component.html',
  styleUrls: ['./anuncio-preview.component.css'],
})
export class AnuncioPreviewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() username = '';
  @Input() userHandle = '';
  @Input() userAvatar = '';
  @Input() title = '';
  @Input() price = '';
  @Input() direccion = '';
  @Input() category = '';
  @Input() description = '';
  @Input() esValido = false;

  private _fotos: File[] = [];
  private _previewUrls: string[] = [];
  private fotosRestantes: File[] = [];

  map: any;
  loading = true;
  coordenadas = '';
  ubicacionSeleccionada = false;
  currentMarker: any;
  selectedLat = 0;
  selectedLng = 0;
  geocodingInProgress = false;

  publicacion?: Publicaciones;
  idNuevo = '';

  fechaActual = '';
  tiempoTranscurrido = 'Ahora';

  universidades: Universidad[] = [
    {
      nombre: 'Universidad Popular del Cesar',
      lat: 10.450407998385675,
      lng: -73.26035565139229,
    },
    {
      nombre: 'Fundación Universitaria Areandina',
      lat: 10.482786051297115,
      lng: -73.27158219741787,
    },
    {
      nombre: 'Universidad de Santander',
      lat: 10.478605588425658,
      lng: -73.24543654898986,
    },
    {
      nombre: 'Universidad Nacional Abierta y a Distancia',
      lat: 10.45182478407731,
      lng: -73.23654243451054,
    },
    {
      nombre: 'Universidad Nacional de Colombia, Sede la Paz',
      lat: 10.39252128936209,
      lng: -73.19509938303084,
    },
  ];

  selectedUniversidad: string = '';

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaComponent>,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private _publicacionServicio: ProductoService,
    private _fotosPublicacionServicio: FotosPublicacionesService,
    private cdr: ChangeDetectorRef
  ) {}

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
            this.userAvatar =
              datos.fotoPerfilBase64 && datos.fotoPerfilBase64.trim() !== ''
                ? 'data:image/jpeg;base64,' + datos.fotoPerfilBase64
                : 'icons/no-photo.webp';
          }
        },
        error: (err) =>
          console.error('Error al obtener datos del usuario:', err),
      });
    }
    this.loadGoogleMapsScript();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.cleanupPreviewUrls();
  }

  private cleanupPreviewUrls(): void {
    this._previewUrls.forEach((url) => URL.revokeObjectURL(url));
    this._previewUrls = [];
  }

  @Input()
  get fotos(): File[] {
    return this._fotos;
  }

  set fotos(value: File[]) {
    this.cleanupPreviewUrls();
    this._fotos = value;
    this._previewUrls = this._fotos
      .slice(0, 4)
      .map((file) => URL.createObjectURL(file));
  }

  get previewUrls(): string[] {
    return this._previewUrls;
  }

  get previewUsername(): string {
    return this.username || 'Usuario';
  }

  get puedePublicar(): boolean {
    return (
      this.title.trim() !== '' &&
      this.price.trim() !== '' &&
      this.direccion.trim() !== '' &&
      this.category !== '' &&
      this._fotos.length > 0 &&
      this.ubicacionSeleccionada
    );
  }

  loadGoogleMapsScript(): void {
    if ((window as any).google && (window as any).google.maps) {
      this.initializeMap();
      return;
    }
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyD982EnumTf4HR85HMc3pXBMg0OTZSxyjQ&callback=initMap';
    script.async = true;
    script.defer = true;
    (window as any).initMap = () => this.initializeMap();
    document.head.appendChild(script);
  }

  initializeMap(): void {
    const mapOptions = {
      center: { lat: 10.450467, lng: -73.260848 },
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('No se encontró el contenedor del mapa');
      return;
    }
    this.map = new google.maps.Map(mapElement, mapOptions);
    google.maps.event.addListenerOnce(this.map, 'tilesloaded', () => {
      console.log('Mapa cargado completamente');
      this.loading = false;
    });
    this.map.addListener('click', (event: any) => this.onMapClick(event));
  }

  onMapClick(event: any): void {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    if (this.currentMarker) this.currentMarker.setMap(null);
    this.currentMarker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Ubicación seleccionada',
      animation: google.maps.Animation.DROP,
    });
    this.selectedLat = lat;
    this.selectedLng = lng;
    this.coordenadas = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    this.ubicacionSeleccionada = true;
    this.cdr.detectChanges();
  }

  centerMap(
    lat: number,
    lng: number,
    title: string = 'Ubicación seleccionada'
  ): void {
    if (!this.map) return;
    const newCenter = { lat, lng };
    this.map.setCenter(newCenter);
    this.map.setZoom(15);
    if (this.currentMarker) this.currentMarker.setMap(null);
    this.currentMarker = new google.maps.Marker({
      position: newCenter,
      map: this.map,
      title: title,
      animation: google.maps.Animation.DROP,
    });
    this.selectedLat = lat;
    this.selectedLng = lng;
    this.coordenadas = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    this.ubicacionSeleccionada = true;
    this.cdr.detectChanges();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          this.centerMap(
            position.coords.latitude,
            position.coords.longitude,
            'Mi ubicación'
          ),
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
          const mensajes = [
            'Permiso para acceder a la ubicación denegado',
            'La ubicación no está disponible',
            'Tiempo de espera agotado al obtener la ubicación',
            'Error desconocido al obtener la ubicación',
          ];
          alert(mensajes[error.code] || mensajes[3]);
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador');
    }
  }

  onUniversidadChange(): void {
    if (this.selectedUniversidad) {
      const universidad = this.universidades.find(
        (u) => u.nombre === this.selectedUniversidad
      );
      if (universidad) {
        this.centerMap(universidad.lat, universidad.lng, universidad.nombre);
        this.toastr.success(
          `Ubicación establecida en: ${universidad.nombre}`,
          'Ubicación seleccionada'
        );
      }
    }
  }

  establecerFechaActual(): void {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    this.fechaActual = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  }

  actualizarTiempoTranscurrido(tiempo: string): void {
    this.tiempoTranscurrido = tiempo;
  }

  actualizarFecha(fecha: string): void {
    this.fechaActual = fecha;
  }

  updateFotos(newFotos: File[]): void {
    this.fotos = newFotos;
  }

  private async convertirFotoABase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async obtenerIdNuevoPublicacion(): Promise<string> {
    try {
      const res: any = await this._publicacionServicio
        .ObtenerIdNuevaPublicacion()
        .toPromise();
      return res?.estado && res?.valor ? res.valor : '';
    } catch (error) {
      console.error('Error al obtener nuevo ID de publicación:', error);
      return '';
    }
  }

  async obtenerIdNuevofoto(): Promise<string> {
    try {
      const res: any = await this._fotosPublicacionServicio
        .ObtenerIdNuevaFotoPublicacion()
        .toPromise();
      return res?.estado && res?.valor ? res.valor : '';
    } catch (error) {
      console.error('Error al obtener nuevo ID de foto:', error);
      return '';
    }
  }

  async cargarDatos(): Promise<Publicaciones> {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    this.idNuevo = await this.obtenerIdNuevoPublicacion();
    const categoriaId =
      this.category === 'Rentas'
        ? 'CAT01'
        : this.category === 'Compras'
        ? 'CAT02'
        : '';
    this.fotosRestantes = this._fotos.slice(1);
    const fotosBase64: FotosPublicacion[] = [];
    if (this._fotos.length > 0) {
      const primeraFoto = this._fotos[0];
      const fotoBase64 = await this.convertirFotoABase64(primeraFoto);
      fotosBase64.push({
        id: await this.obtenerIdNuevofoto(),
        foto: fotoBase64,
        fotoBase64: fotoBase64,
        idPublicacion: this.idNuevo,
      });
    }

    return {
      id: this.idNuevo,
      titulo: this.title,
      fechaPublicacion: new Date().toISOString(),
      idUsuario: usuario?.idUsuario || '',
      precio: Number.parseFloat(this.price) || 0,
      idCategoria: categoriaId,
      descripcion: this.description,
      direccion: this.direccion,
      idEstado: 'EST01',
      fotosPublicaciones: fotosBase64,
      altitud: this.selectedLat,
      latitud: this.selectedLng,
    };
  }

  private async guardarFotosRestantes(): Promise<void> {
    for (let i = 0; i < this.fotosRestantes.length; i++) {
      try {
        const foto = this.fotosRestantes[i];
        const fotoBase64 = await this.convertirFotoABase64(foto);
        const nuevoIdFoto = await this.obtenerIdNuevofoto();
        const fotoPublicacion: FotosPublicacion = {
          id: nuevoIdFoto,
          foto: fotoBase64,
          fotoBase64: fotoBase64,
          idPublicacion: this.idNuevo,
        };
        await this._fotosPublicacionServicio
          .guardar(fotoPublicacion)
          .toPromise();
      } catch (error) {
        console.error(`Error al guardar la foto ${i + 1}:`, error);
        this.toastr.warning(
          'Error al guardar una de las fotos adicionales',
          'Advertencia'
        );
      }
    }
    this.toastr.success(
      'Todas las fotos adicionales han sido procesadas',
      'Completado'
    );
  }

  async publicar(): Promise<void> {
    if (!this.puedePublicar) {
      this.toastr.error(
        'Por favor completa todos los campos requeridos, agrega al menos 1 foto y selecciona una ubicación',
        'Error'
      );
      return;
    }
    try {
      const publicacionData = await this.cargarDatos();
      this._publicacionServicio.guardar(publicacionData).subscribe({
        next: async (response) => {
          if (response.estado) {
            this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
            if (this.fotosRestantes.length > 0) {
              await this.guardarFotosRestantes();
            }
            this.dialogRef.close(true);
          } else {
            console.log(response.msg);
            this.toastr.error(
              response.msg || 'Error al publicar el anuncio',
              'Error'
            );
          }
        },
        error: (error) => {
          console.error('Error al publicar:', error);
          this.toastr.error(
            'Error al publicar el anuncio. Intenta nuevamente.',
            'Error'
          );
        },
      });
    } catch (error) {
      console.error('Error al procesar las fotos:', error);
      this.toastr.error(
        'Error al procesar las fotos. Intenta nuevamente.',
        'Error'
      );
    }
  }
}
