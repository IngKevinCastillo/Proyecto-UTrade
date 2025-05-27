export interface Universidad {
  nombre: string;
  lat: number;
  lng: number;
}

export interface MapaConfig {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId: any;
  styles: any[];
}

export interface MarcadorInfo {
  marcador: any;
  infoWindow: any;
}

export interface ChatRequest {
  usuario1Id: string;
  usuario2Id: string;
}
