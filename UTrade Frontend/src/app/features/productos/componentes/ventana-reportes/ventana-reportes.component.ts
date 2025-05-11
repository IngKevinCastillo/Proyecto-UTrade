import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OpcionReporte, opcionesReporte } from './opcionesReporte';

@Component({
  selector: 'app-ventana-reportes',
  templateUrl: './ventana-reportes.component.html',
  styleUrl: './ventana-reportes.component.css'
})
export class VentanaReportesComponent {
  categoriaActual: string = 'principal';
  opcionSeleccionada: OpcionReporte | null = null;
  rutaReporte: OpcionReporte[] = [];
  mostrarBotonEnviar: boolean = false;

  opciones = opcionesReporte;

  get opcionesActuales(): OpcionReporte[] {
    return this.opciones[this.categoriaActual] || this.opciones['principal'];
  }

  constructor(
    public dialogRef: MatDialogRef<VentanaReportesComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private toastr: ToastrService
  ) {}

  seleccionarOpcion(opcion: OpcionReporte): void {
    this.opcionSeleccionada = opcion;
    this.rutaReporte.push(opcion);

    if (opcion.tieneSubopciones && this.opciones[opcion.id]) {
      this.categoriaActual = opcion.id;
      this.mostrarBotonEnviar = false;
    } else {
      this.mostrarBotonEnviar = true;
    }
  }

  obtenerTituloCategoria(): string {
    const titulos: { [key: string]: string } = {
      'fraude': 'Selecciona el tipo de estafa o fraude',
      'adultos': 'Selecciona el tipo de contenido para adultos',
      'restringido': 'Selecciona el tipo de artículo restringido'
    };

    return titulos[this.categoriaActual] || 'Selecciona una opción';
  }

  regresar(): void {
    if (this.rutaReporte.length > 0) {
      this.rutaReporte.pop();

      if (this.rutaReporte.length === 0) {
        this.categoriaActual = 'principal';
        this.opcionSeleccionada = null;
      } else {
        const opcionAnterior = this.rutaReporte[this.rutaReporte.length - 1];
        this.categoriaActual = opcionAnterior.id;
        this.opcionSeleccionada = opcionAnterior;
      }

      this.mostrarBotonEnviar = false;
    }
  }

  enviarReporte(): void {
    let textoReporte = '';
    this.rutaReporte.forEach((opcion, indice) => {
      textoReporte += opcion.texto;
      if (indice < this.rutaReporte.length - 1) {
        textoReporte += ' > ';
      }
    });

    this.toastr.success(
      `Reporte enviado: ${textoReporte}`,
      'Gracias por tu reporte'
    );

    this.dialogRef.close(this.rutaReporte);
  }

  salir(): void {
    this.dialogRef.close();
  }
}
