import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private terminoBusquedaSubject = new BehaviorSubject<string>('');
  terminoBusqueda$: Observable<string> =
    this.terminoBusquedaSubject.asObservable();

  constructor() {}

  enviarTerminoBusqueda(termino: string): void {
    this.terminoBusquedaSubject.next(termino);
  }

  obtenerTerminoActual(): string {
    return this.terminoBusquedaSubject.value;
  }

  limpiarBusqueda(): void {
    this.terminoBusquedaSubject.next('');
  }
}
