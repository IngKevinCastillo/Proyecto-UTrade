import { Injectable } from '@angular/core';
import { MapaConfig } from '../interfaces/mapa';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private map: any;
  private readonly API_KEY = 'AIzaSyD982EnumTf4HR85HMc3pXBMg0OTZSxyjQ';

  async loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google && (window as any).google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      (window as any).initMap = () => {
        resolve();
      };

      script.onerror = () => reject(new Error('Error loading Google Maps'));
      document.head.appendChild(script);
    });
  }

  initializeMap(elementId: string, config: MapaConfig): any {
    const mapElement = document.getElementById(elementId);
    if (!mapElement) {
      throw new Error(`No se encontró el elemento con ID: ${elementId}`);
    }

    this.map = new google.maps.Map(mapElement, config);
    return this.map;
  }

  createMarker(
    position: { lat: number; lng: number },
    title: string,
    icon?: any
  ): any {
    return new google.maps.Marker({
      position,
      map: this.map,
      title,
      icon,
    });
  }

  createInfoWindow(content: string): any {
    return new google.maps.InfoWindow({ content });
  }

  fitBounds(markers: any[]): void {
    if (markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => bounds.extend(marker.getPosition()));

    this.map.fitBounds(bounds);

    google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
      if (this.map.getZoom() > 15) {
        this.map.setZoom(15);
      }
    });
  }

  centerMap(lat: number, lng: number, zoom = 15): void {
    if (this.map) {
      this.map.setCenter({ lat, lng });
      this.map.setZoom(zoom);
    }
  }

  getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    });
  }
}
