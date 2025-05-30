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
  
  /**
   * Establece el filtro de fecha
   * @param filtro - Puede ser: 'ultimaHora', 'hoy', 'semana', 'mes', 'año'
   */
  setFiltroFecha(filtro: string): void {
    // Mapeo de los valores del frontend a los del servicio
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
  
  /**
   * Establece el filtro de precio
   * @param minimo - Precio mínimo
   * @param maximo - Precio máximo
   */
  setFiltroPrecio(minimo: number, maximo: number): void {
    this.filtroPrecioSubject.next({ minimo, maximo });
  }
  
  /**
   * Obtiene el filtro de fecha actual
   */
  getFiltroFecha(): string {
    return this.filtroFechaSubject.value;
  }
  
  /**
   * Obtiene el filtro de precio actual
   */
  getFiltroPrecio(): FiltrosPrecio {
    return this.filtroPrecioSubject.value;
  }
  
  /**
   * Obtiene todos los filtros activos
   */
  getFiltrosActivos(): FiltrosActivos {
    return {
      fecha: this.getFiltroFecha(),
      precio: this.getFiltroPrecio()
    };
  }
  
  /**
   * Limpia todos los filtros y los restablece a valores por defecto
   */
  limpiarFiltros(): void {
    this.filtroFechaSubject.next('');
    this.filtroPrecioSubject.next({
      minimo: this.PRECIO_MINIMO_DEFAULT,
      maximo: this.PRECIO_MAXIMO_DEFAULT
    });
  }
  
  /**
   * Aplica los filtros actuales (útil para notificar a otros componentes)
   */
  aplicarFiltros(): FiltrosActivos {
    const filtrosActivos = this.getFiltrosActivos();
    console.log('Filtros aplicados desde el servicio:', filtrosActivos);
    return filtrosActivos;
  }
  
  /**
   * Verifica si hay filtros activos
   */
  hayFiltrosActivos(): boolean {
    const filtroFecha = this.getFiltroFecha();
    const filtroPrecio = this.getFiltroPrecio();
    
    return filtroFecha !== '' || 
           filtroPrecio.minimo !== this.PRECIO_MINIMO_DEFAULT || 
           filtroPrecio.maximo !== this.PRECIO_MAXIMO_DEFAULT;
  }
}