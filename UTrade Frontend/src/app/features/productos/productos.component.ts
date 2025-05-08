import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { productosLista, Productos } from '../simulacionProductos';

interface ProductoExtendido extends Productos {
  verMas: boolean;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnChanges {

  @Input() Filtro?: string;
  @Input() FiltroLista?: Productos[];

  productos: ProductoExtendido[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['FiltroLista'] && this.FiltroLista) {
      this.productos = this.FiltroLista.map(producto => ({
        ...producto,
        verMas: false
      }));
    }
    else if (changes['Filtro'] && this.Filtro) {
      const filtrados = productosLista.filter(producto => producto.category === this.Filtro);
      this.productos = filtrados.map(producto => ({
        ...producto,
        verMas: false
      }));
    }
  }

  toggleVerMas(producto: ProductoExtendido): void {
    producto.verMas = !producto.verMas;
  }

  getPreviewUrls(fotos: string[], verMas: boolean): string[] {
    return verMas ? fotos : fotos.slice(0, 3);
  }
}
