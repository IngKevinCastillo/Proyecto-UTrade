import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-ventana-reportes',
  templateUrl: './ventana-reportes.component.html',
  styleUrl: './ventana-reportes.component.css'
})
export class VentanaReportesComponent implements OnInit {
  // Variables para el formulario
  tipoReporte: string = 'publicacion';
  razonSeleccionada: string = '';
  descripcionReporte: string = '';

  // Lista de razones para el reporte
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

  // Método para cerrar el diálogo
  salir(): void {
    this.dialogRef.close();
  }

  // Método para enviar el reporte
  enviarReporte(): void {
    // Crear objeto con la información del reporte
    const datosReporte = {
      tipo: this.tipoReporte,
      razon: this.razonSeleccionada,
      descripcion: this.descripcionReporte
    };
    
    console.log('Enviando reporte:', datosReporte);
    
    // Aquí iría la lógica para enviar el reporte al backend
    // this.reporteService.enviarReporte(datosReporte).subscribe(...);
    
    // Cerrar el diálogo y pasar los datos como resultado
    this.dialogRef.close(datosReporte);
  }
}
