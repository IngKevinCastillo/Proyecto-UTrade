import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reporte } from '../../../../interfaces/reporte';

@Component({
  selector: 'app-ver-reporte',
  templateUrl: './ver-reporte.component.html',
  styleUrls: ['./ver-reporte.component.css']
})
export class VerReporteComponent {
  constructor(
    public dialogRef: MatDialogRef<VerReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      reporte: Reporte,
      estado: string,
      tipo: string,
      motivo: string,
      reportado: string,
      reportante: string
    }
  ) { }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }


}
