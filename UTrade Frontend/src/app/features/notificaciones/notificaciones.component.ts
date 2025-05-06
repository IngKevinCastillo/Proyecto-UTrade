import { Component, Input } from '@angular/core';
import { Notificaciones, notificacionesLista } from '../../layout/simulacionNotificaciones';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {
    @Input() titulo: string = 'Juan Carlos te mando una solicitud a un servico de pensionado.';
    @Input() fecha: string = '7 Días';
    foto: string = 'icons/oceana.png';
    @Input() tipo: string = 'Solicitud';
  
    listaNotificaciones: Notificaciones[] = notificacionesLista;
  
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

}
