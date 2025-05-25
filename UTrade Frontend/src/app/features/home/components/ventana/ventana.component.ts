import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.component.html',
  styleUrls: ['./ventana.component.css']
})
export class VentanaComponent implements OnInit {
  username: string = '';
  userHandle: string = '';
  userAvatar: string = 'icons/no-photo.webp';

  title: string = '';
  price: string = '';
  category: string = '';
  direccion: string = '';
  description: string = '';

  fotos: File[] = [];
  esValido: boolean = false; 

  constructor(
    public dialogRef: MatDialogRef<VentanaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.username = this.data.username || this.username;
      this.userHandle = this.data.userHandle || this.userHandle;
      this.userAvatar = this.data.userAvatar || this.userAvatar;
      if (this.data.title) this.title = this.data.title;
      if (this.data.price) this.price = this.data.price;
      if (this.data.category) this.category = this.data.category;
      if (this.data.direccion) this.direccion = this.data.direccion;
      if (this.data.description) this.description = this.data.description;
    }
  }

  onValidationChange(esValido: boolean): void {
    this.esValido = esValido;
  }

  salir(): void {
    this.dialogRef.close();
  }

  agregarFotos(): void {
    console.log('Agregar fotos clicked');
  }

  actualizarFotos(nuevasFotos: File[]) {
    this.fotos = nuevasFotos;
  }
}