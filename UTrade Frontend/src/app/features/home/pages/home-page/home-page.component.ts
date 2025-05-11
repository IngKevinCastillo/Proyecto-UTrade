import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaComponent } from '../../components/ventana/ventana.component';
import { ToastrService } from 'ngx-toastr';
import { productosLista ,Productos } from '../../../simulacionProductos';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  filtroSeleccionado: Productos[]= productosLista;

  crearServicio() {
    const dialogRef = this.dialog.open(VentanaComponent, {
    disableClose: true,
    autoFocus: true,
    closeOnNavigation: false,
    position: { top: '30px' },
    width: '90vw',
    maxWidth: '1200px',
    data: {
      tipo: 'CREAR'
    }
  });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  publicar() {
    this.toastr.error('Debes crear el producto o servicio ', 'Todavia no campeon(a)');
    this.crearServicio();
  }
}
