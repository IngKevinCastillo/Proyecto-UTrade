import { Component, Input, OnInit } from '@angular/core';
import { Notificaciones } from '../../interfaces/notificaciones';
import { NotificacionesService } from '../../Services/notificaciones.service';
import { ConexionBackendService } from '../../Services/conexion-backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() fecha: string = '';
  foto: string = 'icons/oceana.png';
  @Input() tipo: string = '';
  
  listaNotificaciones: Notificaciones[] = [];
  listaNotificacionesCompleta: Notificaciones[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private notificacionesService: NotificacionesService
  ) {
    this.cargarAvatarUsuario();
  }

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const idUsuario = usuario?.idUsuario;

    if (!idUsuario) {
      this.error = 'No se encontró información del usuario';
      return;
    }

    this.cargando = true;
    this.error = '';

    // Usar el método tradicional con subscribe ya que el método con Promise puede ser complejo
    this.notificacionesService.listarPorIdUsuario(idUsuario).subscribe({
      next: (response) => {
        if (response.estado && response.valor) {
          this.procesarNotificaciones(response.valor);
        } else {
          this.error = 'No se pudieron cargar las notificaciones';
          this.cargando = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar notificaciones:', err);
        this.error = 'Error al conectar con el servidor';
        this.cargando = false;
      }
    });
  }

  private async procesarNotificaciones(notificaciones: Notificaciones[]): Promise<void> {
    try {
      const notificacionesCompletas: Notificaciones[] = [];

      for (const notificacion of notificaciones) {
        const notificacionCompleta = await this.obtenerDatosCompletos(notificacion);
        notificacionesCompletas.push(notificacionCompleta);
      }

      this.listaNotificacionesCompleta = notificacionesCompletas;
      this.listaNotificaciones = [...notificacionesCompletas];
      this.cargando = false;
    } catch (error) {
      console.error('Error al procesar notificaciones:', error);
      this.error = 'Error al procesar las notificaciones';
      this.cargando = false;
    }
  }

  private async obtenerDatosCompletos(notificacion: Notificaciones): Promise<Notificaciones> {
    try {
      // Obtener datos del TipoAccion
      const tipoAccionResponse = await this.http
        .get<any>(`${this.conexionBackend.baseUrl}/TipoAccion/Buscar/${notificacion.idTipoAccion}`)
        .toPromise();

      let personaRemitente = 'Usuario desconocido';
      let mensajeDescripcion = 'Notificación';

      if (tipoAccionResponse?.estado && tipoAccionResponse?.valor) {
        const tipoAccion = tipoAccionResponse.valor;

        // Obtener datos de la persona remitente
        if (tipoAccion.idPersonaRemitente) {
          try {
            const personaResponse = await this.http
              .get<any>(`${this.conexionBackend.baseUrl}/Persona/Obtener/${tipoAccion.idPersonaRemitente}`)
              .toPromise();

            if (personaResponse?.estado && personaResponse?.valor) {
              const persona = personaResponse.valor;
              personaRemitente = `${persona.nombres} ${persona.apellidos}`;
            }
          } catch (error) {
            console.warn('Error al obtener datos de persona:', error);
          }
        }

        // Obtener descripción del mensaje de acción
        if (tipoAccion.idTipoMensaje) {
          try {
            const mensajeResponse = await this.http
              .get<any>(`${this.conexionBackend.baseUrl}/MensajeAccion/Buscar/${tipoAccion.idTipoMensaje}`)
              .toPromise();

            if (mensajeResponse?.estado && mensajeResponse?.valor) {
              mensajeDescripcion = mensajeResponse.valor.descripcion;
            }
          } catch (error) {
            console.warn('Error al obtener mensaje de acción:', error);
          }
        }
      }

      return {
        ...notificacion,
        nombre: personaRemitente,
        descripcion: mensajeDescripcion,
        tipo: this.determinarTipoNotificacion(mensajeDescripcion),
        leido: notificacion.estado // Mapear estado a leido para compatibilidad
      };
    } catch (error) {
      console.error('Error al obtener datos completos:', error);
      return {
        ...notificacion,
        nombre: 'Usuario desconocido',
        descripcion: 'Notificación',
        tipo: 'general',
        leido: notificacion.estado
      };
    }
  }

  private determinarTipoNotificacion(descripcion: string): string {
    if (descripcion.toLowerCase().includes('mensaje')) return 'mensaje';
    if (descripcion.toLowerCase().includes('solicitud')) return 'solicitud';
    if (descripcion.toLowerCase().includes('reporte')) return 'reporte';
    return 'general';
  }

  private cargarAvatarUsuario(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;
    
    if (id) {
      const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;
      this.http.get(url).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor) {
            const datos = res.valor;
            // Aquí puedes usar los datos si necesitas mostrar info del usuario actual
          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        },
      });
    }
  }

  imagenRuta(): string {
    return this.foto;
  }

  calcularTiempo(fecha: Date): string {
    const ahora = new Date();
    const diffMs = ahora.getTime() - new Date(fecha).getTime();
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDias === 0) return 'Hoy';
    if (diffDias === 1) return 'Ayer';
    return `${diffDias} Días`;
  }

  notificacionesTodas(): void {
    this.listaNotificaciones = [...this.listaNotificacionesCompleta];
  }

  notificacionesNoLeidas(): void {
    this.listaNotificaciones = this.listaNotificacionesCompleta.filter(
      (notificacion) => !notificacion.leido
    );
  }

  // Método para marcar una notificación como leída
  marcarComoLeida(notificacion: Notificaciones): void {
    if (!notificacion.leido) {
      const notificacionActualizada = { ...notificacion, estado: true };
      
      this.notificacionesService.CambiarEstado(notificacionActualizada).subscribe({
        next: (response) => {
          if (response.estado) {
            notificacion.leido = true;
            notificacion.estado = true;
          }
        },
        error: (err) => {
          console.error('Error al marcar como leída:', err);
        }
      });
    }
  }
}