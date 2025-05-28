import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { Publicaciones } from '../../interfaces/publicaciones';
import { Reporte } from '../../interfaces/reporte';
import { VerReporteComponent } from './componentes/ver-reporte/ver-reporte.component';
import { ResueltoComponent } from './componentes/resuelto/resuelto.component';
import { tipoReporte } from '../../interfaces/tipoReporte';
import { estadoReporte } from '../../interfaces/estadoReporte';
import { motivoReporte } from '../../interfaces/motivoReporte';
import { ReporteService } from '../../Services/reporte.service';
import { tipoReporteService } from '../../Services/tipoReporte.service';
import { estadoReporteService } from '../../Services/estadoReporte.service';
import { motivoReporteService } from '../../Services/motivoReporte.service';
import { PersonaService } from '../../Services/persona.service';
import { ProductoService } from '../../Services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
  listaPersonas: Persona[] = [];
  personaCache: { [id: string]: Persona } = {};
  productoCache: { [id: string]: Publicaciones } = {};
  filtroEstado: string = 'todos';
  filtroTipo: string = 'todos';
  mostrarSoloNoLeidos: boolean = false;
  cargando: boolean = false;
  paginaActual: number = 1;
  reportesPorPagina: number = 5;

  constructor(
    private reporteService: ReporteService,
    private estadoReporteService: estadoReporteService,
    private tipoReporteService: tipoReporteService,
    private motivoService: motivoReporteService,
    private personService: PersonaService,
    private ProductoService: ProductoService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarEstados();
    this.cargarTiposReporte();
    this.cargarMotivos();
    this.cargarReportes();
  }

  cargarTiposReporte(): void {

    this.tipoReporteService.lista().subscribe({
      next: (response: any) => {
        
        if (response && response.estado) {
          this.listaTiposReporte = response.valor;
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
    this.estadoReporteService.lista().subscribe({
      next: (response) => {
        if (response && response.estado === true) {
          this.listaEstados = response.valor;
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
    this.reporteService.listar().subscribe({
      next: (response) => {
        if (response && response.estado) {
          this.listaReportes = response.valor;
          this.listaReportesFiltrados = [...this.listaReportes];
        } else {
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

  obtenerNombrePersona(id: string): string {
    if (this.personaCache[id]) {
      const persona = this.personaCache[id];
      return `${persona.nombres} ${persona.apellidos}`;
    }

    this.personService.buscar(id).subscribe({
      next: (response) => {
        if (response.estado) {
          const persona = response.valor as Persona;
          this.personaCache[id] = persona;
        } else {
          this.personaCache[id] = { nombres: 'Desconocido', apellidos: '', id: id } as Persona;
        }
      },
      error: () => {
        this.personaCache[id] = { nombres: 'Desconocido', apellidos: '', id: id } as Persona;
      }
    });

    return 'Cargando...';
  }

  obtenerNombrePublicacion(id: string): string {
      if (this.productoCache[id]) {
        return this.productoCache[id].titulo;
      }
      this.ProductoService.buscar(id).subscribe({
        next: (res) => {
          if (res.estado) {
            this.productoCache[id] = res.valor as Publicaciones;
          } else {
            this.productoCache[id] = { titulo: 'Publicación desconocida', id } as Publicaciones;
          }
          this.cdRef.markForCheck();
        },
        error: () => {
          this.productoCache[id] = { titulo: 'Publicación desconocida', id } as Publicaciones;
          this.cdRef.markForCheck();
        }
      });
      return 'Cargando...';
    }
  

  esUsuario(idTipoReporte: string): boolean {
    const tipo = this.listaTiposReporte.find(t => t.id == idTipoReporte);
    return tipo ? tipo.nombre.toLowerCase().includes('usuario') : false;
  }

  validarEncontrados(estado: estadoReporte): boolean {
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

  definirEstacionHoraria(): Date {
    const fechaActual = new Date();
    const offset = fechaActual.getTimezoneOffset() * 60000; 
    const fechaLocal = new Date(fechaActual.getTime() - offset);
    return fechaLocal;
  }

  buscarEstadoPorNombre(nombreEstado: string): estadoReporte | null {
    return this.listaEstados.find(estado => 
      estado.nombre === nombreEstado
    ) || null;
  }
  
  validarCambioEstado(reporte: Reporte, estadoEncontrado: estadoReporte, nombreEstado: string): boolean {
    if (!estadoEncontrado) {
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

    const fechaLocal = this.definirEstacionHoraria();

    return {
      ...reporte,
      idEstado: nuevoEstadoId,
      leido: true,
      fechaActualizacion: fechaLocal,
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
    // Asegurar que sea un objeto Date válido
    const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
    
    // Validar que la fecha sea válida
    if (isNaN(fechaObj.getTime())) {
      return 'Fecha inválida';
    }

    const ahora = new Date();
    const diffMs = ahora.getTime() - fechaObj.getTime();
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
    
    return this.formatearFecha(fechaObj);
  }

  private formatearFecha(fecha: Date): string {
    const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);
    
    if (isNaN(fechaObj.getTime())) {
      return 'Fecha inválida';
    }
    
    return `${fechaObj.getDate()}/${fechaObj.getMonth() + 1}/${fechaObj.getFullYear()}`;
  }

  resolver(reporte: Reporte): void {

    this.toastr.info(`Iniciando resolución del reporte ${reporte.idReporte}`, 'Información');

    const dialogRef = this.dialog.open(ResueltoComponent, {
      width: '90vw', 
      maxWidth: '1200px', 
      minWidth: '800px', 
      height: '85vh',
      maxHeight: '90vh',
      panelClass: 'modal-reporte-resolver',
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false, 
      data: { reporte }
    });

    if (!reporte.leido) {
      this.marcarComoLeido(reporte);
    }
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cambiarEstadoPorNombre(result.reporte, 'Resuelto');
        this.toastr.success(
          `${this.esUsuario(result.tipoEntidad) ? 'usuario': 'publicacion'} actualizada con estado: ${result.estadoAplicado.nombre}`, 
          'Reporte Resuelto'
        );
      }
    });

  }

  verDetalles(reporte: Reporte): void {
    this.toastr.info(`Viendo detalles del reporte ${reporte.idReporte}`, 'Información');
    
    const estado = this.obtenerNombreEstado(reporte.idEstado);
    const tipo = this.obtenerNombreTipo(reporte.idTipoReporte);
    const motivo = this.obtenerNombreMotivo(reporte.idMotivo);
    const reportado = this.esUsuario(reporte.idTipoReporte) ? this.obtenerNombrePersona(reporte.idReportado) : this.obtenerNombrePublicacion(reporte.idReportado);
    const reportante = this.obtenerNombrePersona(reporte.idReportante);

    this.dialog.open(VerReporteComponent, {
        width: '80vw',
        maxWidth: '900px',
        maxHeight: '90vh',
        panelClass: 'modal-reporte-detalles',
      data: {
        reporte,
        estado,
        tipo,
        motivo,
        reportado,
        reportante
      }
    });

    if (!reporte.leido) {
      this.marcarComoLeido(reporte);
    }
  }

  marcarComoLeido(reporte: Reporte): void {

    const fechaLocal = this.definirEstacionHoraria();

    const reporteEncontrado = {
      ...reporte,
      leido: true,
      fechaActualizacion: fechaLocal
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

  get totalPaginas(): number {
    return Math.ceil(this.listaReportesFiltrados.length / this.reportesPorPagina);
  }

  get reportesPaginados(): Reporte[] {
    const inicio = (this.paginaActual - 1) * this.reportesPorPagina;
    return this.listaReportesFiltrados.slice(inicio, inicio + this.reportesPorPagina);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }
}