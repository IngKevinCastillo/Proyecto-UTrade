import { Component, OnInit } from '@angular/core';
import { Reporte, listaReportes } from '../../features/simulacionReportes';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  listaReportes: Reporte[] = [];
  listaReportesFiltrados: Reporte[] = [];
  filtroEstado: string = 'todos';
  filtroTipo: string = 'todos';
  mostrarSoloNoLeidos: boolean = false;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.listaReportes = [...listaReportes];
    this.listaReportesFiltrados = [...listaReportes];
  }

  filtrarPorEstado(estado: string): void {
    this.filtroEstado = estado;
    this.mostrarSoloNoLeidos = false;
    this.aplicarFiltros();
  }

  mostrarTodos(): void {
    this.filtroEstado = 'todos';
    this.mostrarSoloNoLeidos = false;
    this.aplicarFiltros();
  }

  filtrarNoLeidos(): void {
    this.mostrarSoloNoLeidos = true;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let reportesFiltrados = [...this.listaReportes];

    // Filtrar por tipo
    if (this.filtroTipo !== 'todos') {
      reportesFiltrados = reportesFiltrados.filter(reporte => reporte.tipo === this.filtroTipo);
    }

    if (this.filtroEstado !== 'todos') {
      reportesFiltrados = reportesFiltrados.filter(reporte => reporte.estado === this.filtroEstado);
    }

    if (this.mostrarSoloNoLeidos) {
      reportesFiltrados = reportesFiltrados.filter(reporte => !reporte.leido);
    }

    this.listaReportesFiltrados = reportesFiltrados;
  }

  calcularTiempo(fecha: Date): string {
    const ahora = new Date();
    const diffMs = ahora.getTime() - new Date(fecha).getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutos = Math.floor(diffMs / (1000 * 60));

    if (diffMinutos < 60) {
      return diffMinutos === 1 ? '1 minuto atrás' : `${diffMinutos} minutos atrás`;
    }
    if (diffHoras < 24) {
      return diffHoras === 1 ? '1 hora atrás' : `${diffHoras} horas atrás`;
    }
    if (diffDias === 0) return 'Hoy';
    if (diffDias === 1) return 'Ayer';
    if (diffDias < 7) return `Hace ${diffDias} días`;
    
    return this.formatearFecha(fecha);
  }

  private formatearFecha(fecha: Date): string {
    const fechaObj = new Date(fecha);
    return `${fechaObj.getDate()}/${fechaObj.getMonth() + 1}/${fechaObj.getFullYear()}`;
  }

  marcarComoLeido(reporte: Reporte): void {
    const index = this.listaReportes.findIndex(r => r.id === reporte.id);
    if (index !== -1) {
      this.listaReportes[index].leido = true;
      this.toastr.success('Reporte marcado como leído', 'Éxito');
      this.aplicarFiltros(); 
    }
  }

  cambiarEstado(reporte: Reporte, nuevoEstado: string): void {
    const index = this.listaReportes.findIndex(r => r.id === reporte.id);
    if (index !== -1) {
      this.listaReportes[index].estado = nuevoEstado;
      this.listaReportes[index].fechaActualizacion = new Date();
      
      let mensaje = '';
      switch (nuevoEstado) {
        case 'en revisión':
          mensaje = 'Reporte puesto en revisión';
          break;
        case 'resuelto':
          mensaje = 'Reporte marcado como resuelto';
          break;
        case 'rechazado':
          mensaje = 'Reporte rechazado';
          break;
        default:
          mensaje = 'Estado del reporte actualizado';
      }
      
      this.toastr.success(mensaje, 'Éxito');
      this.aplicarFiltros(); 
    }
  }

  verDetalles(reporte: Reporte): void {

    this.toastr.info(`Viendo detalles del reporte ${reporte.id}: ${reporte.titulo}`, 'Información');
    
    if (!reporte.leido) {
      this.marcarComoLeido(reporte);
    }
  }
}