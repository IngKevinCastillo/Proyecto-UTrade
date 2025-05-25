import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface MiPublicacion {
  id: string;
  titulo: string; 
  tipoServicio?: string;
  precio?: number;
  fechaPublicacion: string; 
  estado: string; 
  imagen?: string;
  descripcion?: string;
  imagenes?: string[];
  idUsuario?: string;
  idCategoria?: string;
  nombreCategoria?: string;
  nombreUsuario?: string; 
  avatarUsuario?: string; 
  ubicacion?: string; 
}

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent implements OnInit {
  
  publicacion: MiPublicacion | null = null;
  imagenSeleccionada: string = '';
  imagenIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<VerProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.publicacion) {
      this.publicacion = this.data.publicacion;
      
      if (!this.publicacion?.imagenes) {
        this.publicacion!.imagenes = this.publicacion?.imagen ? [this.publicacion.imagen] : [];
      } else if (this.publicacion.imagen && !this.publicacion.imagenes.includes(this.publicacion.imagen)) {
        this.publicacion.imagenes.unshift(this.publicacion.imagen);
      }
      
      if (this.publicacion?.imagenes && this.publicacion.imagenes.length > 0) {
        this.imagenSeleccionada = this.publicacion.imagenes[0];
        this.imagenIndex = 0;
      } else if (this.publicacion?.imagen) {
        this.imagenSeleccionada = this.publicacion.imagen;
        this.imagenIndex = 0;
      }
    }
  }

  salir(): void {
    this.dialogRef.close();
  }

  seleccionarImagen(imagen: string, index: number): void {
    this.imagenSeleccionada = imagen;
    this.imagenIndex = index;
  }

  imagenAnterior(): void {
    if (this.publicacion?.imagenes && this.publicacion.imagenes.length > 0) {
      this.imagenIndex = this.imagenIndex > 0 ? this.imagenIndex - 1 : this.publicacion.imagenes.length - 1;
      this.imagenSeleccionada = this.publicacion.imagenes[this.imagenIndex];
    }
  }

  imagenSiguiente(): void {
    if (this.publicacion?.imagenes && this.publicacion.imagenes.length > 0) {
      this.imagenIndex = this.imagenIndex < this.publicacion.imagenes.length - 1 ? this.imagenIndex + 1 : 0;
      this.imagenSeleccionada = this.publicacion.imagenes[this.imagenIndex];
    }
  }

  formatearFechaCompleta(fecha: string): string {
    const fechaObj = new Date(fecha);
    const fechaLocal = new Date(fechaObj.getTime() + (fechaObj.getTimezoneOffset() * 60000));
    
    const meses = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    
    const dia = fechaLocal.getDate().toString().padStart(2, '0');
    const mes = meses[fechaLocal.getMonth()];
    const año = fechaLocal.getFullYear();
    
    return `${dia} ${mes} ${año}`;
  }
}