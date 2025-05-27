import { Injectable } from '@angular/core';
import { GoogleMapsService } from './google-maps.service';
import { Universidad, MarcadorInfo } from '../interfaces/mapa';
import { Publicaciones } from '../interfaces/publicaciones';

@Injectable({
  providedIn: 'root',
})
export class MarcadoresService {
  private marcadoresProductos: MarcadorInfo[] = [];
  private marcadoresUniversidades: MarcadorInfo[] = [];

  constructor(private googleMapsService: GoogleMapsService) {}

  private getIconoUniversidad() {
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#2563eb">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
    </svg>`;

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgIcon),
      scaledSize: new (window as any).google.maps.Size(36, 36),
      anchor: new (window as any).google.maps.Point(18, 36),
    };
  }

  private getIconoCasa() {
    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#2c248b">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>`;

    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgIcon),
      scaledSize: new (window as any).google.maps.Size(32, 32),
      anchor: new (window as any).google.maps.Point(16, 32),
    };
  }

  agregarMarcadoresUniversidades(universidades: Universidad[]): void {
    this.limpiarMarcadores(this.marcadoresUniversidades);

    const icono = this.getIconoUniversidad();

    universidades.forEach((universidad) => {
      const marcador = this.googleMapsService.createMarker(
        { lat: universidad.lat, lng: universidad.lng },
        universidad.nombre,
        icono
      );

      const infoWindow = this.googleMapsService.createInfoWindow(
        this.crearContenidoInfoWindowUniversidad(universidad)
      );

      marcador.addListener('click', () => {
        this.cerrarTodosLosInfoWindows();
        infoWindow.open(marcador.getMap(), marcador);
      });

      this.marcadoresUniversidades.push({ marcador, infoWindow });
    });
  }

  agregarMarcadoresProductos(productos: Publicaciones[]): void {
    this.limpiarMarcadores(this.marcadoresProductos);

    const icono = this.getIconoCasa();

    productos.forEach((producto) => {
      if (producto.latitud && producto.altitud) {
        const marcador = this.googleMapsService.createMarker(
          { lat: producto.altitud, lng: producto.latitud },
          producto.titulo,
          icono
        );

        const infoWindow = this.googleMapsService.createInfoWindow(
          this.crearContenidoInfoWindowProducto(producto)
        );

        marcador.addListener('click', () => {
          this.cerrarTodosLosInfoWindows();
          infoWindow.open(marcador.getMap(), marcador);
        });

        this.marcadoresProductos.push({ marcador, infoWindow });
      }
    });

    this.ajustarVista();
  }

  private limpiarMarcadores(marcadores: MarcadorInfo[]): void {
    marcadores.forEach(({ marcador }) => marcador.setMap(null));
    marcadores.length = 0;
  }

  private cerrarTodosLosInfoWindows(): void {
    [...this.marcadoresProductos, ...this.marcadoresUniversidades].forEach(
      ({ infoWindow }) => infoWindow.close()
    );
  }

  private ajustarVista(): void {
    const todosMarcadores = [
      ...this.marcadoresProductos.map((m) => m.marcador),
      ...this.marcadoresUniversidades.map((m) => m.marcador),
    ];

    this.googleMapsService.fitBounds(todosMarcadores);
  }

  buscarMarcadorUniversidad(
    nombreUniversidad: string
  ): MarcadorInfo | undefined {
    return this.marcadoresUniversidades.find(
      ({ marcador }) => marcador.getTitle() === nombreUniversidad
    );
  }

  private crearContenidoInfoWindowUniversidad(
    universidad: Universidad
  ): string {
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

  private crearContenidoInfoWindowProducto(producto: Publicaciones): string {
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
}
