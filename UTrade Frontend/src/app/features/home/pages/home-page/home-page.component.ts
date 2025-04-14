import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaComponent } from '../../components/ventana/ventana.component';
import { ToastrService } from 'ngx-toastr';

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

  lista: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.lista;

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
    this.toastr.success('Elemento <b> eliminado </b> correctamente', 'Confirmacion');
  }
}
