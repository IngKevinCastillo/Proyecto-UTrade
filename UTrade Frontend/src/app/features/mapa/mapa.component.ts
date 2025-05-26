import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit, AfterViewInit {
  map: any;
  loading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.loadGoogleMapsScript();
  }

  ngAfterViewInit(): void {}

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
      center: { lat: 19.4326, lng: -99.1332 },
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
      setTimeout(() => {
        this.loading = false;
      }, 300);
    });

    const marker = new google.maps.Marker({
      position: { lat: 19.4326, lng: -99.1332 },
      map: this.map,
      title: 'Ubicación por defecto',
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div><h5>¡Hola!</h5><p>Esta es tu ubicación por defecto</p></div>`,
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
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
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Permiso para acceder a la ubicación denegado');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('La ubicación no está disponible');
              break;
            case error.TIMEOUT:
              alert('Tiempo de espera agotado al obtener la ubicación');
              break;
            default:
              alert('Error desconocido al obtener la ubicación');
              break;
          }
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador');
    }
  }
}
