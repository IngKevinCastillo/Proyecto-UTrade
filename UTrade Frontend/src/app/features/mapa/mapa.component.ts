import { Component, type OnInit } from '@angular/core';
import { ProductoService } from '../../Services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { RespuestaAPI } from '../../interfaces/respuesta-api';
import { Publicaciones } from '../../interfaces/publicaciones';
import { MapaConfig, Universidad } from '../../interfaces/mapa';
import { GoogleMapsService } from '../../Services/google-maps.service';
import { MarcadoresService } from '../../Services/marcadores.service';
import { ChatManagerService } from '../../Services/chat-manager.service';
import { UNIVERSIDADES_DATA } from '../../data/universidades-data.data';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  productos: Publicaciones[] = [];
  universidades: Universidad[] = UNIVERSIDADES_DATA;
  selectedUniversidad = '';

  private readonly mapaConfig: MapaConfig = {
    center: { lat: 10.450467, lng: -73.260848 },
    zoom: 13,
    mapTypeId: (window as any).google?.maps?.MapTypeId?.ROADMAP,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  constructor(
    private productosService: ProductoService,
    private toastr: ToastrService,
    private googleMapsService: GoogleMapsService,
    private marcadoresService: MarcadoresService,
    private chatManagerService: ChatManagerService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.googleMapsService.loadGoogleMapsScript();
      this.initializeMap();
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      this.toastr.error('Error al cargar Google Maps', 'Error');
    }
  }

  private initializeMap(): void {
    try {
      this.googleMapsService.initializeMap('map', this.mapaConfig);
      this.agregarMarcadorPorDefecto();
      this.marcadoresService.agregarMarcadoresUniversidades(this.universidades);
      this.cargarProductos();
      this.chatManagerService.configurarFuncionGlobalChat();
    } catch (error) {
      console.error('Error initializing map:', error);
      this.toastr.error('Error al inicializar el mapa', 'Error');
    }
  }

  private agregarMarcadorPorDefecto(): void {
    const marcador = this.googleMapsService.createMarker(
      this.mapaConfig.center,
      'Ubicación por defecto'
    );

    const infoWindow = this.googleMapsService.createInfoWindow(
      '<div><h5>¡Hola!</h5><p>Esta es tu ubicación por defecto</p></div>'
    );

    marcador.addListener('click', () => {
      infoWindow.open(marcador.getMap(), marcador);
    });
  }

  onUniversidadChange(): void {
    if (this.selectedUniversidad) {
      const universidad = this.universidades.find(
        (u) => u.nombre === this.selectedUniversidad
      );
      if (universidad) {
        this.centerMapToUniversity(universidad);
      }
    }
  }

  private centerMapToUniversity(universidad: Universidad): void {
    this.googleMapsService.centerMap(universidad.lat, universidad.lng, 16);

    const marcadorInfo = this.marcadoresService.buscarMarcadorUniversidad(
      universidad.nombre
    );
    if (marcadorInfo) {
      marcadorInfo.infoWindow.open(
        marcadorInfo.marcador.getMap(),
        marcadorInfo.marcador
      );
    }
  }

  private cargarProductos(): void {
    this.productosService.listarSoloConLatitudAltitud().subscribe({
      next: (respuesta: RespuestaAPI) => {
        if (respuesta.estado && respuesta.valor) {
          this.productos = respuesta.valor;
          this.marcadoresService.agregarMarcadoresProductos(this.productos);
        } else {
          console.error(
            'Error en la respuesta del servicio:',
            respuesta.msg ?? 'Mensaje no disponible'
          );
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.toastr.error('Error al cargar productos', 'Error');
      },
    });
  }

  async getCurrentLocation(): Promise<void> {
    try {
      const position = await this.googleMapsService.getCurrentLocation();
      this.googleMapsService.centerMap(position.lat, position.lng);

      this.googleMapsService.createMarker(position, 'Tu ubicación actual');

      this.toastr.success('Ubicación obtenida exitosamente', 'Éxito');
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
      this.toastr.error(
        'No se pudo obtener tu ubicación. Verifica los permisos del navegador.',
        'Error'
      );
    }
  }

  recargarProductos(): void {
    this.cargarProductos();
  }
}
