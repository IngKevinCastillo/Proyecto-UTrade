import { Component, Input } from '@angular/core';
import { productosLista, Productos } from '../simulacionProductos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  /*productos = productosLista;
  product1: Productos = productosLista[0];

  @Input() username: string = this.product1.nombre || '';
  @Input() userHandle: string = this.product1.correo || '';
  @Input() Fecha: string = this.product1.fecha || '';
  @Input() tiempoTranscurrido: string = this.product1.tiempoTranscurrido || '';
  @Input() ubicacion: string = this.product1.ubicacion || '';
  @Input() userAvatar: string = this.product1.userAvatar || ''; 
  @Input() title: string = this.product1.title || '';
  @Input() price: string = this.product1.precio?.toString() || '';
  @Input() category: string = this.product1.category || '';
  @Input() description: string = this.product1.description || '';

  fotos: string[] = Array.isArray(this.product1.fotos) ? this.product1.fotos : [this.product1.fotos || ''];

  verMas: boolean = false;

  get previewUrls(): string[] {
    return this.verMas ? this.fotos : this.fotos.slice(0, 3);
  }

  toggleVerMas(): void {
    this.verMas = !this.verMas;
  }

  get previewUsername(): string {
    return this.username;
  }*/
  
  productos: Productos[] = productosLista;
  verMas: boolean = false;

  toggleVerMas(): void {
    this.verMas = !this.verMas;
  }

  getPreviewUrls(fotos: string[]): string[] {
    return this.verMas ? fotos : fotos.slice(0, 3);
  }
}
