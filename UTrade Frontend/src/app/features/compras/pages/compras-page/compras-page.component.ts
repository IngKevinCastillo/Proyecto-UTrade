import { Component } from '@angular/core';

@Component({
  selector: 'app-compras-page',
  templateUrl: './compras-page.component.html',
  styleUrl: './compras-page.component.css'
})
export class ComprasPageComponent {
  filtroSeleccionado: string = 'compras';
}
