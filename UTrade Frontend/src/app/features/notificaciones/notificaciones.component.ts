import { Component, Input, OnInit } from '@angular/core';
import { Notificaciones, notificacionesLista } from '../../layout/simulacionNotificaciones';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit {
    @Input() titulo: string = '';
    @Input() fecha: string = '';
    foto: string = 'icons/oceana.png';
    @Input() tipo: string = '';
  listaNotificaciones: Notificaciones[] = [];

  ngOnInit(): void {
      this.listaNotificaciones = notificacionesLista;
  }
  
  imagenRuta(): string {
    return this.foto;
  }
  
  calcularTiempo(fecha: Date): string {
    const ahora = new Date();
    const diffMs = ahora.getTime() - new Date(fecha).getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias === 0) return 'Hoy';
    if (diffDias === 1) return 'Ayer';
    return `${diffDias} Días`;
  }

  notificacionesTodas() {
    this.listaNotificaciones = [];
    this.listaNotificaciones = notificacionesLista;
  }

  notificacionesNoLeidas() {
    this.listaNotificaciones = [];
    const listaNueva: Notificaciones[] = notificacionesLista.filter((notificacion) => notificacion.leido === false);
    this.listaNotificaciones = listaNueva;
  }

}
