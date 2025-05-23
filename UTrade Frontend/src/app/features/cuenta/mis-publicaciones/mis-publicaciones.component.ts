import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { VerProductosComponent } from '../../productos/componentes/ver-productos/ver-productos.component';
import { ModificarProductosComponent } from '../../productos/componentes/modificar-productos/modificar-productos.component';

export interface MiPublicacion {
  id: string;
  nombre: string;
  tipoServicio: string;
  precio: number;
  fechaPublicacion: Date;
  estado: 'Activo' | 'Baneado' | 'Eliminado' | 'Suspendido' | 'Advertido';
  imagen: string;
  descripcion?: string;
}

@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.css'
})
export class MisPublicacionesComponent implements OnInit {

  publicaciones: MiPublicacion[] = [];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService
  ){ }

  ngOnInit(): void {
    this.cargarMisPublicaciones();
  }

  cargarMisPublicaciones(): void {
    // Aquí harías la llamada a tu API para obtener las publicaciones del usuario
    // Por ahora uso datos de ejemplo
    this.publicaciones = [
      {
        id: '1',
        nombre: 'Chaqueta de Jean',
        tipoServicio: 'Ropa',
        precio: 45000,
        fechaPublicacion: new Date('2025-04-16'),
        estado: 'Activo',
        imagen: 'icons/oceana.png',
        descripcion: 'Chaqueta de jean unisex, disponible en todas las tallas. Calidad garantizada.'
      },
      {
        id: '2',
        nombre: 'Sofá en L de 3 puestos',
        tipoServicio: 'Muebles',
        precio: 900000,
        fechaPublicacion: new Date('2025-04-15'),
        estado: 'Suspendido',
        imagen: 'icons/oceana.png',
        descripcion: 'Sofá cómodo y moderno en tela gris. Perfecto para sala o estudio.'
      },
      {
        id: '3',
        nombre: 'Apartamento en el Centro',
        tipoServicio: 'Apartamento',
        precio: 1200000,
        fechaPublicacion: new Date('2025-04-14'),
        estado: 'Advertido',
        imagen: 'icons/oceana.png',
        descripcion: 'Apartamento completamente amoblado en zona céntrica.'
      }
    ];
  }

  modificarPublicacion(publicacion: MiPublicacion): void {
    this.toastr.info(`Vas a modificar "${publicacion.nombre}"`, 'Modificar publicación');
    const dialogRef = this.dialog.open(ModificarProductosComponent, {
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
  

  borrarPublicacion(publicacion: MiPublicacion): void {
    if (confirm(`¿Estás seguro de que deseas borrar "${publicacion.nombre}"?`)) {
      this.publicaciones = this.publicaciones.filter(p => p.id !== publicacion.id);
      this.toastr.success('Publicación eliminada correctamente', 'Éxito');
    }
  }

  verDetalles(publicacion: MiPublicacion): void {
    const dialogRef = this.dialog.open(VerProductosComponent, {
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

  // Método auxiliar para obtener el color del estado (si lo necesitas)
  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'Activo': return 'primary';
      case 'Baneado': return 'warn';
      case 'Eliminado': return 'accent';
      case 'Suspendido': return 'warn';
      case 'Advertido': return 'accent';
      default: return 'primary';
    }
  }
}
