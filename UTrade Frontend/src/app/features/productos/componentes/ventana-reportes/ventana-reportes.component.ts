import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-reportes',
  templateUrl: './ventana-reportes.component.html',
  styleUrl: './ventana-reportes.component.css'
})
export class VentanaReportesComponent implements OnInit {
  tipoReporte: string = 'publicacion';
  razonSeleccionada: string = '';
  descripcionReporte: string = '';

  razonesReporte = [
    { valor: 'contenido_inapropiado', texto: 'Contenido inapropiado' },
    { valor: 'spam', texto: 'Spam o publicidad' },
    { valor: 'acoso', texto: 'Acoso o bullying' },
    { valor: 'informacion_falsa', texto: 'Información falsa' },
    { valor: 'violencia', texto: 'Incitación a la violencia' },
    { valor: 'derechos_autor', texto: 'Infracción de derechos de autor' },
    { valor: 'otra', texto: 'Otra razón' }
  ];

  constructor(
    public dialogRef: MatDialogRef<VentanaReportesComponent>
  ) { }

  ngOnInit(): void {
  }

  salir(): void {
    this.dialogRef.close();
  }

  enviarReporte(): void {
    const datosReporte = {
      tipo: this.tipoReporte,
      razon: this.razonSeleccionada,
      descripcion: this.descripcionReporte
    };
    
    console.log('Enviando reporte:', datosReporte);
    this.dialogRef.close(datosReporte);
  }
}
