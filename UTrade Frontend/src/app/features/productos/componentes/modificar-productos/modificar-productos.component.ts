import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrl: './modificar-productos.component.css'
})
export class ModificarProductosComponent {
  constructor(
    public dialogRef: MatDialogRef<ModificarProductosComponent>
  ) { }
  
  salir(): void {
    this.dialogRef.close();
  }
}
