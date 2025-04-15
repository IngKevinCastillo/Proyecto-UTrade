import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  @Input() username: string = 'Juan Mejía';
  @Input() userHandle: string = '@juanmejia';
  @Input() Fecha: string = '8 de abril';
  @Input() tiempoTranscurrido: string = '2h';
  @Input() ubicacion: string = 'Universidad Popular del Cesar';
  @Input() userAvatar: string = 'icons/oceana.png'; 
  @Input() title: string = 'APARTAESTUDIO';
  @Input() price: string = '350.000 COP';
  @Input() category: string = 'Apartamento';
  @Input() description: string = `Acogedor apartaestudio disponible en excelente ubicación, ideal para estudiantes, profesionales o parejas. 
  El espacio cuenta con diseño moderno y funcional, con ambiente tipo loft que integra sala, comedor y cocina en un solo ambiente…`;

  fotos: string[] = [
    'icons/cuarto1.png',
    'icons/cuarto2.jpg',
    'icons/cuarto3.jpg'
  ];

  verMas: boolean = false;

  get previewUrls(): string[] {
    return this.verMas ? this.fotos : this.fotos.slice(0, 3);
  }

  toggleVerMas(): void {
    this.verMas = !this.verMas;
  }

  get previewUsername(): string {
    return this.username || 'Juan mrd';
  }
}
