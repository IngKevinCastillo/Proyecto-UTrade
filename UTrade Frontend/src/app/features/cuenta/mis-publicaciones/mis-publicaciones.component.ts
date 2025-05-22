import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) { }

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
        imagen: 'assets/images/chaqueta.jpg',
        descripcion: 'Chaqueta de jean unisex, disponible en todas las tallas. Calidad garantizada.'
      },
      {
        id: '2',
        nombre: 'Sofá en L de 3 puestos',
        tipoServicio: 'Muebles',
        precio: 900000,
        fechaPublicacion: new Date('2025-04-15'),
        estado: 'Suspendido',
        imagen: 'assets/images/sofa.jpg',
        descripcion: 'Sofá cómodo y moderno en tela gris. Perfecto para sala o estudio.'
      },
      {
        id: '3',
        nombre: 'Apartamento en el Centro',
        tipoServicio: 'Apartamento',
        precio: 1200000,
        fechaPublicacion: new Date('2025-04-14'),
        estado: 'Advertido',
        imagen: 'assets/images/apartamento.jpg',
        descripcion: 'Apartamento completamente amoblado en zona céntrica.'
      }
    ];
  }

  modificarPublicacion(publicacion: MiPublicacion): void {
    console.log('Modificar publicación:', publicacion);
    // Aquí abrirías un modal o navegarías a la página de edición
    // Ejemplo:
    // this.router.navigate(['/editar-publicacion', publicacion.id]);
  }

  borrarPublicacion(publicacion: MiPublicacion): void {
    // Mostrar confirmación antes de borrar
    const confirmacion = confirm(`¿Estás seguro de que deseas borrar "${publicacion.nombre}"?`);
    
    if (confirmacion) {
      console.log('Borrar publicación:', publicacion);
      
      // Aquí harías la llamada a la API para borrar
      this.publicaciones = this.publicaciones.filter(p => p.id !== publicacion.id);
      
      // Mostrar mensaje de éxito
      // this.snackBar.open('Publicación eliminada correctamente', 'Cerrar', { duration: 3000 });
    }
  }

  verDetalles(publicacion: MiPublicacion): void {
    console.log('Ver detalles de publicación:', publicacion);
    // Aquí podrías abrir un modal con los detalles o navegar a otra página
    // Ejemplo con dialog:
    /*
    const dialogRef = this.dialog.open(DetallesPublicacionComponent, {
      width: '80%',
      maxWidth: '800px',
      data: publicacion
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Acción realizada:', result);
      }
    });
    */
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
