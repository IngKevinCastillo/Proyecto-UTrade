import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { Reporte } from '../../interfaces/reporte';
import { tipoReporte } from '../../interfaces/tipoReporte';
import { estadoReporte } from '../../interfaces/estadoReporte';
import { motivoReporte } from '../../interfaces/motivoReporte';
import { ReporteService } from '../../Services/reporte.service';
import { tipoReporteService } from '../../Services/tipoReporte.service';
import { estadoReporteService } from '../../Services/estadoReporte.service';
import { motivoReporteService } from '../../Services/motivoReporte.service';
import { PerfilService } from '../../Services/perfil.service';
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
  listaEstados: estadoReporte[] = [];
  listaTiposReporte: tipoReporte[] = [];
  listaMotivos: motivoReporte[] = [];
  persona: Persona | null = null;
  filtroEstado: string = 'todos';
  filtroTipo: string = 'todos';
  mostrarSoloNoLeidos: boolean = false;
  cargando: boolean = false;

  constructor(
    private reporteService: ReporteService,
    private estadoReporteService: estadoReporteService,
    private tipoReporteService: tipoReporteService,
    private motivoService: motivoReporteService,
    private perfilService: PerfilService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarEstados();
    this.cargarTiposReporte();
    this.cargarMotivos();
    this.cargarReportes();
  }

  cargarTiposReporte(): void {
    console.log('Iniciando carga de tipos de reporte...');

    this.tipoReporteService.lista().subscribe({
      next: (response: any) => {
        console.log('Respuesta tipos de reporte:', response);
        
        if (response && response.estado) {
          this.listaTiposReporte = response.valor;
          console.log('Tipos de reporte cargados:', this.listaTiposReporte.length);
        } else {
          console.warn('Error al cargar tipos de reporte');
          this.toastr.error('Error al cargar los tipos de reporte', 'Error');
        }
      },
      error: (error) => {
        console.error('Error al cargar tipos de reporte:', error);
        this.toastr.error('Error de conexión al cargar tipos de reporte', 'Error');
      }
    });
  }

  cargarEstados(): void {
    console.log('Iniciando carga de estados...');

    this.estadoReporteService.lista().subscribe({
      next: (response) => {
        if (response && response.estado === true) {
          console.log('✅ IF: Estados cargados exitosamente');
          this.listaEstados = response.valor;
          console.log('✅ Lista de estados:', this.listaEstados.length);
        } else {
          console.warn('❌ ELSE: Estado no exitoso - Revisar contenido');
          this.toastr.error('Error al cargar los estados de reporte', 'Error');
        }
      },
      error: (error) => {
        console.error('Error completo al cargar estados:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error object:', error.error);
        this.toastr.error('Error de conexión al cargar estados de reporte', 'Error');
      }
    });
  }

  cargarMotivos(): void {
    this.motivoService.lista().subscribe({
      next: (response) => {
        if (response && response.estado) {
          this.listaMotivos = response.valor;
        } else {
          this.toastr.error('Error al cargar los motivos de reporte', 'Error');
        }
      },
      error: (error) => {
        console.error('Error al cargar motivos:', error);
        this.toastr.error('Error de conexión al cargar motivos', 'Error');
      }
    });
  }

  cargarReportes(): void {
    this.cargando = true;
    console.log('Iniciando carga de reportes...');
    
    this.reporteService.listar().subscribe({
      next: (response) => {
        console.log('Respuesta del servicio:', response);
        
        if (response && response.estado) {
          console.log('Datos recibidos:', response.valor);
          this.listaReportes = response.valor;
          this.listaReportesFiltrados = [...this.listaReportes];
          console.log('Reportes cargados exitosamente:', this.listaReportes.length);
        } else {
          console.log('La respuesta no fue exitosa:', response);
          this.toastr.error('Error al cargar los reportes', 'Error');
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error completo al cargar reportes:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error object:', error.error);
        this.toastr.error('Error de conexión al cargar reportes', 'Error');
        this.cargando = false;
      }
    });
  }

  obtenerNombreEstado(id: string): string {
    const estado = this.listaEstados.find(e => e.id === id);
    return estado ? estado.nombre : 'Estado desconocido';
  }

  obtenerNombreTipo(id: string): string {
    const tipo = this.listaTiposReporte.find(t => t.id === id);
    return tipo ? tipo.nombre : 'Tipo desconocido';
  }

  obtenerNombreMotivo(id: string): string {
    const motivo = this.listaMotivos.find(m => m.id === id);
    return motivo ? motivo.nombre : 'Motivo desconocido';
  }


  esUsuario(idTipoReporte: string): boolean {
    const tipo = this.listaTiposReporte.find(t => t.id == idTipoReporte);
    return tipo ? tipo.nombre.toLowerCase().includes('usuario') : false;
  }

  validarEncontrados(estado: estadoReporte): boolean {
      console.error(`Estado no encontrado en la lista de estados`);
      this.toastr.error(`No se pudo encontrar el estado`, 'Error');
      return false;
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

    if (this.filtroTipo !== 'todos') {
      reportesFiltrados = reportesFiltrados.filter(reporte => reporte.idTipoReporte === this.filtroTipo);
    }

    if (this.filtroEstado !== 'todos') {
      reportesFiltrados = reportesFiltrados.filter(reporte => reporte.idEstado === this.filtroEstado);
    }

    if (this.mostrarSoloNoLeidos) {
      reportesFiltrados = reportesFiltrados.filter(reporte => !reporte.leido);
    }

    this.listaReportesFiltrados = reportesFiltrados;
  }

  buscarEstadoPorNombre(nombreEstado: string): estadoReporte | null {
    return this.listaEstados.find(estado => 
      estado.nombre === nombreEstado
    ) || null;
  }
  
  validarCambioEstado(reporte: Reporte, estadoEncontrado: estadoReporte, nombreEstado: string): boolean {
    if (!estadoEncontrado) {
      console.error(`Estado "${nombreEstado}" no encontrado en la lista de estados`);
      this.toastr.error(`No se pudo encontrar el estado: ${nombreEstado}`, 'Error');
      return false;
    }

    if (reporte.idEstado === estadoEncontrado.id) {
      this.toastr.info(`El reporte ya tiene el estado: ${nombreEstado}`, 'Información');
      return false;
    }

    return true;
  }
  
  crearReporteEncontrado(reporte: Reporte, nuevoEstadoId: string): Reporte {
    return {
      ...reporte,
      idEstado: nuevoEstadoId,
      leido: true,
      fechaActualizacion: new Date(),
    };
  }

  actualizarReporteEnLista(reporteId: string, nuevoEstadoId: string): void {
    const index = this.listaReportes.findIndex(r => r.idReporte === reporteId);
    if (index !== -1) {
      this.listaReportes[index].idEstado = nuevoEstadoId;
      this.listaReportes[index].fechaActualizacion = new Date();
    }
  }

  actualizarEstadoReporte(reporteActual: Reporte, reporteEncontrado: Reporte, estadoEncontrado: estadoReporte, nombreEstado: string): void {
    this.reporteService.actualizar(reporteEncontrado).subscribe({
      next: (response) => {
        if (response && response.estado) {
          this.actualizarReporteEnLista(reporteActual.idReporte, estadoEncontrado!.id);
          this.toastr.success(`Estado cambiado a: ${nombreEstado}`, 'Éxito');
          this.aplicarFiltros();
        } else {
          this.toastr.error('Error al cambiar el estado del reporte', 'Error');
        }
      },
      error: (error) => {
        console.error('Error al actualizar reporte:', error);
        this.toastr.error(`Error de conexión al cambiar estado a ${nombreEstado}`, 'Error');
      }
    });

  }

  cambiarEstadoPorNombre(reporte: Reporte, nombreEstado: string): void {
    const estadoEncontrado = this.buscarEstadoPorNombre(nombreEstado);
    
    if (!this.validarCambioEstado(reporte, estadoEncontrado!, nombreEstado)) {
      return;
    }

    const reporteEncontrado = this.crearReporteEncontrado(reporte, estadoEncontrado!.id);

    this.actualizarEstadoReporte(reporte, reporteEncontrado, estadoEncontrado!, nombreEstado);
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
    if (diffDias === 2) return 'Anteayer';
    if (diffDias >= 3) return `Hace ${diffDias} días`;
    
    return this.formatearFecha(fecha);
  }

  private formatearFecha(fecha: Date): string {
    const fechaObj = new Date(fecha);
    return `${fechaObj.getDate()}/${fechaObj.getMonth() + 1}/${fechaObj.getFullYear()}`;
  }

  resolver(reporte: Reporte): void {
    // Aquí puedes agregar la funcionalidad extra que mencionaste
  }

  marcarComoLeido(reporte: Reporte): void {
    const reporteEncontrado = {
      ...reporte,
      leido: true,
      fechaActualizacion: new Date()
    };

    this.reporteService.actualizar(reporteEncontrado).subscribe({
      next: (response) => {
        if (response.estado) {
          const index = this.listaReportes.findIndex(r => r.idReporte === reporte.idReporte);
          if (index !== -1) {
            this.listaReportes[index].leido = true;
            this.listaReportes[index].fechaActualizacion = new Date();
          }
          this.toastr.success('Reporte marcado como leído', 'Éxito');
          this.aplicarFiltros();
        } else {
          this.toastr.error('Error al marcar el reporte como leído', 'Error');
        }
      },
      error: (error) => {
        console.error('Error al actualizar reporte:', error);
        this.toastr.error('Error de conexión al actualizar el reporte', 'Error');
      }
    });
  }

  verDetalles(reporte: Reporte): void {
    this.toastr.info(`Viendo detalles del reporte ${reporte.idReporte}`, 'Información');
    
    if (!reporte.leido) {
      this.marcarComoLeido(reporte);
    }
  }

    obtenerClaseEstado(idEstado: string): string {
    const estado = this.listaEstados.find(e => e.id === idEstado);
    if (!estado) return 'estado-pendiente';
    
    const nombre = estado.nombre.toLowerCase();
    if (nombre.includes('revisión')) return 'estado-en-revisión';
    if (nombre.includes('resuelto')) return 'estado-resuelto';  
    if (nombre.includes('rechazado')) return 'estado-rechazado';
    return 'estado-pendiente';
  }

  estaEnRevisionOPosterior(idEstado: string): boolean {
    const estado = this.listaEstados.find(e => e.id === idEstado);
    if (!estado) return false;
    
    const nombre = estado.nombre.toLowerCase();
    return nombre.includes('revisión') || nombre.includes('resuelto') || nombre.includes('rechazado');
  }

  estaResueltaOrRechazado(idEstado: string): boolean {
    const estado = this.listaEstados.find(e => e.id === idEstado);
    if (!estado) return false;
    
    const nombre = estado.nombre.toLowerCase();
    return nombre.includes('resuelto') || nombre.includes('rechazado');
  }

  estaRechazado(idEstado: string): boolean {
    const estado = this.listaEstados.find(e => e.id === idEstado);
    if (!estado) return false;
    
    return estado.nombre.toLowerCase().includes('rechazado');
  }
}