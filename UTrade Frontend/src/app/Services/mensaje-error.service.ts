import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajeErrorService {
  private mostrarMensajeSubject = new BehaviorSubject<boolean>(false);
  private mensajeSubject = new BehaviorSubject<string>('');

  mostrarMensaje$ = this.mostrarMensajeSubject.asObservable();
  mensaje$ = this.mensajeSubject.asObservable();

  mostrarError(mensaje: string, duracion = 5000): void {
    this.mensajeSubject.next(mensaje);
    this.mostrarMensajeSubject.next(true);

    setTimeout(() => {
      this.ocultarError();
    }, duracion);
  }

  ocultarError(): void {
    this.mostrarMensajeSubject.next(false);
    this.mensajeSubject.next('');
  }
}
