import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { productosLista, Productos } from '../simulacionProductos';
import { MatDialog } from '@angular/material/dialog';
import { VentanaReportesComponent } from './componentes/ventana-reportes/ventana-reportes.component';

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
  constructor(
    public dialog: MatDialog
    ) { }

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

reportarProducto(): void {
  const dialogRef = this.dialog.open(VentanaReportesComponent, {
    disableClose: false,
    autoFocus: true,
    closeOnNavigation: true,
    panelClass: 'modal-reporte-personalizado',
    width: '650px',
    maxWidth: '95%',
    data: {
      tipo: 'CREAR',
      tipoObjeto: 'publicacion'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Reporte enviado:', result);
    } else {
      console.log('Diálogo cerrado sin enviar reporte');
    }
  });
}

  toggleVerMas(producto: ProductoExtendido): void {
    producto.verMas = !producto.verMas;
  }

  getPreviewUrls(fotos: string[], verMas: boolean): string[] {
    return verMas ? fotos : fotos.slice(0, 3);
  }
}
