import { Component, type OnInit } from '@angular/core';
import { ProductoService } from '../../Services/producto.service';
import { ChatService } from '../../Services/chat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaAPI } from '../../interfaces/respuesta-api';
import { Publicaciones } from '../../interfaces/publicaciones';
import { Universidad } from '../../interfaces/universidad';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  map: any;
  productos: Publicaciones[] = [];
  marcadores: any[] = [];
  marcadoresUniversidades: any[] = [];

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
    private productosService: ProductoService,
    private _chatService: ChatService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadGoogleMapsScript();
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
    (window as any).initMap = () => {
      this.initializeMap();
    };

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

    const marker = new google.maps.Marker({
      position: { lat: 10.450467, lng: -73.260848 },
      map: this.map,
      title: 'Ubicación por defecto',
    });

    const infoWindow = new google.maps.InfoWindow({
      content:
        '<div><h5>¡Hola!</h5><p>Esta es tu ubicación por defecto</p></div>',
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    this.agregarMarcadoresUniversidades();

    this.cargarProductos();
  }

  agregarMarcadoresUniversidades(): void {
    const iconoUniversidad = {
      url:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#2563eb">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
        </svg>`
        ),
      scaledSize: new google.maps.Size(36, 36),
      anchor: new google.maps.Point(18, 36),
    };

    this.universidades.forEach((universidad) => {
      const marcador = new google.maps.Marker({
        position: {
          lat: universidad.lat,
          lng: universidad.lng,
        },
        map: this.map,
        title: universidad.nombre,
        icon: iconoUniversidad,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: this.crearContenidoInfoWindowUniversidad(universidad),
      });

      marcador.addListener('click', () => {
        this.marcadoresUniversidades.forEach((m) => {
          if (m.infoWindow) {
            m.infoWindow.close();
          }
        });

        infoWindow.open(this.map, marcador);
      });

      marcador.infoWindow = infoWindow;
      this.marcadoresUniversidades.push(marcador);
    });
  }

  crearContenidoInfoWindowUniversidad(universidad: Universidad): string {
    return `
      <div style="max-width: 280px; padding: 12px;">
        <h5 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">
          <i class="fas fa-university" style="color: #2563eb; margin-right: 8px;"></i>
          ${universidad.nombre}
        </h5>
        <div style="margin-bottom: 8px;">
          <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 500;">
            <i class="fas fa-graduation-cap" style="margin-right: 4px;"></i>
            Institución Educativa
          </span>
        </div>
        <div style="font-size: 13px; color: #6b7280; margin-top: 10px;">
          <div style="margin-bottom: 4px;">
            <i class="fas fa-map-marker-alt" style="color: #ef4444; margin-right: 6px;"></i>
            <strong>Coordenadas:</strong>
          </div>
          <div style="margin-left: 20px; font-family: monospace; background: #f3f4f6; padding: 4px 6px; border-radius: 4px;">
            Lat: ${universidad.lat.toFixed(6)}<br>
            Lng: ${universidad.lng.toFixed(6)}
          </div>
        </div>
      </div>
    `;
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

  centerMapToUniversity(universidad: Universidad): void {
    if (this.map) {
      const newCenter = { lat: universidad.lat, lng: universidad.lng };
      this.map.setCenter(newCenter);
      this.map.setZoom(16);

      const marcadorUniversidad = this.marcadoresUniversidades.find(
        (marcador) => marcador.getTitle() === universidad.nombre
      );

      if (marcadorUniversidad && marcadorUniversidad.infoWindow) {
        this.marcadoresUniversidades.forEach((m) => {
          if (m.infoWindow) {
            m.infoWindow.close();
          }
        });

        marcadorUniversidad.infoWindow.open(this.map, marcadorUniversidad);
      }
    }
  }

  cargarProductos(): void {
    this.productosService.listarSoloConLatitudAltitud().subscribe(
      (respuesta: RespuestaAPI) => {
        if (respuesta.estado && respuesta.valor) {
          this.productos = respuesta.valor;
          this.agregarMarcadoresProductos();
        } else {
          console.error(
            'Error en la respuesta del servicio:',
            respuesta.msg ?? 'Mensaje no disponible'
          );
        }
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  agregarMarcadoresProductos(): void {
    this.marcadores.forEach((marcador) => {
      marcador.setMap(null);
    });
    this.marcadores = [];

    const iconoCasa = {
      url:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#e74c3c">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>`
        ),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 32),
    };

    this.productos.forEach((producto) => {
      if (producto.latitud && producto.altitud) {
        const marcador = new google.maps.Marker({
          position: {
            lat: producto.altitud,
            lng: producto.latitud,
          },
          map: this.map,
          title: producto.titulo,
          icon: iconoCasa,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: this.crearContenidoInfoWindow(producto),
        });

        marcador.addListener('click', () => {
          this.marcadores.forEach((m) => {
            if (m.infoWindow) {
              m.infoWindow.close();
            }
          });
          this.marcadoresUniversidades.forEach((m) => {
            if (m.infoWindow) {
              m.infoWindow.close();
            }
          });

          infoWindow.open(this.map, marcador);
        });

        marcador.infoWindow = infoWindow;
        this.marcadores.push(marcador);
      }
    });

    if (this.marcadores.length > 0) {
      this.ajustarVistaParaTodosLosMarcadores();
    }
  }

  crearContenidoInfoWindow(producto: Publicaciones): string {
    const fechaFormateada = new Date(
      producto.fechaPublicacion
    ).toLocaleDateString('es-ES');
    const precioFormateado = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(producto.precio ?? 0);

    const buttonId = `chat-btn-${producto.id}`;

    return `
      <div style="max-width: 320px; padding: 12px;">
        <h5 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px;">
          <i class="fas fa-home" style="color: #e74c3c; margin-right: 5px;"></i>
          ${producto.titulo}
        </h5>
        <div style="margin-bottom: 12px;">
          <strong style="color: #27ae60; font-size: 18px;">${precioFormateado}</strong>
        </div>
        <p style="margin: 8px 0; color: #555; font-size: 14px; line-height: 1.4;">
          <strong>Descripción:</strong><br>
          ${producto.descripcion}
        </p>
        <div style="font-size: 12px; color: #7f8c8d; margin: 10px 0;">
          <div><strong>ID:</strong> ${producto.id}</div>
          <div><strong>Dirección:</strong> ${producto.direccion.trim()}</div>
          <div><strong>Fecha:</strong> ${fechaFormateada}</div>
        </div>
        <div style="margin-top: 15px; text-align: center;">
          <button 
            id="${buttonId}"
            style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
              display: inline-flex;
              align-items: center;
              gap: 8px;
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.4)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.3)';"
            onclick="window.iniciarChat('${producto.id}', '${
      producto.idUsuario
    }')"
          >
            <i class="fas fa-comments" style="font-size: 16px;"></i>
            Iniciar Chat
          </button>
        </div>
      </div>
    `;
  }

  iniciarChat(productoId: string, idUsuarioProducto: string): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      this.toastr.error('Sesión no encontrada', 'Error');
      return;
    }

    const usuario = JSON.parse(usuarioStorage);
    const idUsuarioSesion: string | undefined = usuario.idUsuario;

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
    this.router.navigate(['/chat'], { queryParams: { chatId: chatId } });
  }

  ajustarVistaParaTodosLosMarcadores(): void {
    const bounds = new google.maps.LatLngBounds();

    this.marcadores.forEach((marcador) => {
      bounds.extend(marcador.getPosition());
    });

    this.marcadoresUniversidades.forEach((marcador) => {
      bounds.extend(marcador.getPosition());
    });

    if (this.marcadores.length > 0 || this.marcadoresUniversidades.length > 0) {
      this.map.fitBounds(bounds);

      google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
        if (this.map.getZoom() > 15) {
          this.map.setZoom(15);
        }
      });
    }

    this.configurarFuncionGlobalChat();
  }

  private configurarFuncionGlobalChat(): void {
    (window as any).iniciarChat = (
      productoId: string,
      idUsuarioProducto: string
    ) => {
      this.iniciarChat(productoId, idUsuarioProducto);
    };
  }

  centerMap(lat: number, lng: number): void {
    if (this.map) {
      const newCenter = { lat, lng };
      this.map.setCenter(newCenter);
      this.map.setZoom(15);

      new google.maps.Marker({
        position: newCenter,
        map: this.map,
        title: 'Nueva ubicación',
      });
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.centerMap(lat, lng);
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
          alert(
            'No se pudo obtener tu ubicación. Verifica los permisos del navegador.'
          );
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador');
    }
  }

  recargarProductos(): void {
    this.cargarProductos();
  }
}
