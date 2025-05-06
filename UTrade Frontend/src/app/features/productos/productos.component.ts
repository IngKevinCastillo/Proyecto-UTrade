import { Component } from '@angular/core';
import { productosLista, Productos } from '../simulacionProductos';

// Extender la interfaz para agregar verMas
interface ProductoExtendido extends Productos {
  verMas: boolean;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  productos: ProductoExtendido[] = productosLista.map(producto => ({
    ...producto,
    verMas: false
  }));

  toggleVerMas(producto: ProductoExtendido): void {
    producto.verMas = !producto.verMas;
  }

  getPreviewUrls(fotos: string[], verMas: boolean): string[] {
    return verMas ? fotos : fotos.slice(0, 3);
  }
}
