import { Component, output } from '@angular/core';

@Component({
  selector: 'app-rentas-page',
  templateUrl: './rentas-page.component.html',
  styleUrl: './rentas-page.component.css'
})
export class RentasPageComponent {
  filtroSeleccionado: string = 'renta';
}
