import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tipoReporteService } from '../../../../Services/tipoReporte.service';
import { motivoReporteService } from '../../../../Services/motivoReporte.service';
import { tipoReporte } from '../../../../interfaces/tipoReporte';
import { motivoReporte } from '../../../../interfaces/motivoReporte';
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { PerfilService } from '../../../../Services/perfil.service';
import { ReporteService } from '../../../../Services/reporte.service';
import { Reporte } from '../../../../interfaces/reporte';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventana-reportes',
  templateUrl: './ventana-reportes.component.html',
  styleUrls: ['./ventana-reportes.component.css']
})
export class VentanaReportesComponent implements OnInit {
  listaTipos: tipoReporte[] = [];
  listaMotivos: motivoReporte[] = [];
  tipoSeleccionadoId: string = '';
  motivoSeleccionadoId: string = '';
  descripcion: string = '';
  productoSeleccionado!: Publicaciones;

  constructor(
    private tipoService: tipoReporteService,
    private motivoService: motivoReporteService,
    private perfilService: PerfilService,
    private reporteService: ReporteService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<VentanaReportesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productoSeleccionado = this.data.producto;
    this.cargarTipos();
    this.cargarMotivos();
  }

  cargarTipos(): void {
    this.tipoService.lista().subscribe({
      next: (response) => {
        if (response.estado) this.listaTipos = response.valor;
      },
      error: (e) => console.error('Error al cargar tipos:', e)
    });
  }

  cargarMotivos(): void {
    this.motivoService.lista().subscribe({
      next: (response) => {
        if (response.estado) this.listaMotivos = response.valor;
      },
      error: (e) => console.error('Error al cargar motivos:', e)
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  enviarReporte(): void {
    const idReportante = this.perfilService.obtenerIdUsuario();
    if (!idReportante) {
      this.toastr.error('No se pudo identificar al usuario actual', 'Error');
      return;
    }

    const tipoSeleccionado = this.listaTipos.find(t => t.id === this.tipoSeleccionadoId);
    const esUsuario = tipoSeleccionado?.nombre.toLowerCase().includes('usuario');
    const idReportado = esUsuario ? this.productoSeleccionado.idUsuario : this.productoSeleccionado.id;

    if (idReportado === idReportante || this.productoSeleccionado.idUsuario === idReportante) {
      this.toastr.warning('No puedes reportarte a ti mismo ni tus propias publicaciones', 'Advertencia');
      return;
    }

    this.reporteService.listar().subscribe({
      next: (response) => {
        if (!response.estado) {
          this.toastr.error('No se pudieron consultar los reportes existentes', 'Error');
          return;
        }

        const lista: Reporte[] = response.valor;
        const ultimaId = lista.length > 0 ? lista[lista.length - 1].idReporte : '';
        const nuevoId = this.generarIdReporte(ultimaId);
        const fechaActual = new Date();
        const offset = fechaActual.getTimezoneOffset() * 60000; 
        const fechaLocal = new Date(fechaActual.getTime() - offset);

        const nuevoReporte: Reporte = {
          idReporte: nuevoId,
          idTipoReporte: this.tipoSeleccionadoId,
          idMotivo: this.motivoSeleccionadoId,
          descripcion: this.descripcion,
          idEstado: 'ER001',
          fechaReportada: fechaLocal,
          fechaActualizacion: fechaLocal,
          leido: false,
          idReportante,
          idReportado
        };

        this.reporteService.guardar(nuevoReporte).subscribe({
          next: (res) => {
            if (res.estado) {
              this.toastr.success('Reporte enviado correctamente', 'Éxito');
              this.dialogRef.close();
            } else {
              this.toastr.error('No se pudo guardar el reporte', 'Error');
            }
          },
          error: (err) => {
            console.error('Error al guardar el reporte:', err);
            this.toastr.error('Error de conexión al guardar el reporte', 'Error');
          }
        });
      },
      error: (err) => {
        console.error('Error al consultar reportes:', err);
        this.toastr.error('Error de conexión al consultar reportes', 'Error');
      }
    });
  }


  private generarIdReporte(ultimaId: string): string {
    if (!ultimaId) return 'RE001';
    
    const numero = parseInt(ultimaId.replace('RE', '')) + 1;
    
    if (numero < 1000) {
      return `RE${numero.toString().padStart(3, '0')}`;
    }
    return `RE${numero}`;
  }
}
