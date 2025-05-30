import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FiltrosPrecio {
  minimo: number;
  maximo: number;
}

export interface FiltrosActivos {
  fecha: string;
  precio: FiltrosPrecio;
}

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  
  private readonly PRECIO_MINIMO_DEFAULT = 0;
  private readonly PRECIO_MAXIMO_DEFAULT = 2000000;
  
  private filtroFechaSubject = new BehaviorSubject<string>('');
  private filtroPrecioSubject = new BehaviorSubject<FiltrosPrecio>({
    minimo: this.PRECIO_MINIMO_DEFAULT,
    maximo: this.PRECIO_MAXIMO_DEFAULT
  });
  
  public filtroFecha$ = this.filtroFechaSubject.asObservable();
  public filtroPrecio$ = this.filtroPrecioSubject.asObservable();
  
  constructor() { }
  
  setFiltroFecha(filtro: string): void {
    const mapeoFiltros: { [key: string]: string } = {
      'ultima-hora': 'ultimaHora',
      'hoy': 'hoy',
      'esta-semana': 'semana',
      'este-mes': 'mes',
      'este-ano': 'año'
    };
    
    const filtroMapeado = mapeoFiltros[filtro] || filtro;
    this.filtroFechaSubject.next(filtroMapeado);
  }
  
  setFiltroPrecio(minimo: number, maximo: number): void {
    this.filtroPrecioSubject.next({ minimo, maximo });
  }
  

  getFiltroFecha(): string {
    return this.filtroFechaSubject.value;
  }
  

  getFiltroPrecio(): FiltrosPrecio {
    return this.filtroPrecioSubject.value;
  }
  

  getFiltrosActivos(): FiltrosActivos {
    return {
      fecha: this.getFiltroFecha(),
      precio: this.getFiltroPrecio()
    };
  }
  
  limpiarFiltros(): void {
    this.filtroFechaSubject.next('');
    this.filtroPrecioSubject.next({
      minimo: this.PRECIO_MINIMO_DEFAULT,
      maximo: this.PRECIO_MAXIMO_DEFAULT
    });
  }

  aplicarFiltros(): FiltrosActivos {
    const filtrosActivos = this.getFiltrosActivos();
    console.log('Filtros aplicados desde el servicio:', filtrosActivos);
    return filtrosActivos;
  }

  hayFiltrosActivos(): boolean {
    const filtroFecha = this.getFiltroFecha();
    const filtroPrecio = this.getFiltroPrecio();
    
    return filtroFecha !== '' || 
           filtroPrecio.minimo !== this.PRECIO_MINIMO_DEFAULT || 
           filtroPrecio.maximo !== this.PRECIO_MAXIMO_DEFAULT;
  }
}