import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carta-notificacion',
  templateUrl: './carta-notificacion.component.html',
  styleUrl: './carta-notificacion.component.css'
})
export class CartaNotificacionComponent {
    @Input() nombre: string = 'Juan Mejía';
    @Input() tipo: string = '@juanmejia';
    @Input() descripcion: string = '8 de abril';
}
