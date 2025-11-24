import { Injectable } from '@angular/core';
import { environment } from'../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Observable, switchMap, from } from 'rxjs';
import { Notificaciones } from '../interfaces/notificaciones';
import { MensajeAccionService } from './mensaje-accion.service';
import { TipoAccionService } from './tipo-accion.service';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private urlApi: string = environment.endpoint + 'Notificaciones/';
  private urlPersona: string = environment.endpoint + 'Persona/';

  constructor(
    private http: HttpClient,
    private mensajeAccionService: MensajeAccionService,
    private tipoAccionService: TipoAccionService
  ) {}

  listarPorIdUsuario(idUsuario: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarPorIdUsuario/${idUsuario}`
    );
  }

  // Método para obtener notificaciones con datos completos
  obtenerNotificacionesCompletas(idUsuario: string): Observable<Notificaciones[]> {
    return this.listarPorIdUsuario(idUsuario).pipe(
      switchMap(async (response: RespuestaAPI) => {
        if (!response.estado || !response.valor) {
          return [];
        }

        const notificaciones: Notificaciones[] = response.valor;
        
        // Ordenar por fecha descendente (más recientes primero)
        notificaciones.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        
        // Procesar cada notificación para obtener datos adicionales
        const notificacionesCompletas = await Promise.all(
          notificaciones.map(async (notificacion) => {
            try {
              // Obtener datos del TipoAccion
              const tipoAccionResponse = await this.tipoAccionService
                .buscar(notificacion.idTipoAccion)
                .toPromise();

              let personaRemitente = 'Usuario desconocido';
              let mensajeDescripcion = 'Nueva notificación';
              
              if (tipoAccionResponse?.estado && tipoAccionResponse?.valor) {
                const tipoAccion = tipoAccionResponse.valor;
                
                // Obtener datos de la persona remitente
                if (tipoAccion.idPersonaRemitente) {
                  try {
                    const personaResponse = await this.http
                      .get<RespuestaAPI>(`${this.urlPersona}Obtener/${tipoAccion.idPersonaRemitente}`)
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
                    const mensajeResponse = await this.mensajeAccionService
                      .buscar(tipoAccion.idTipoMensaje)
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
                leido: notificacion.estado // Mapear estado a leido
              };
            } catch (error) {
              console.error('Error al procesar notificación:', error);
              return {
                ...notificacion,
                nombre: 'Usuario desconocido',
                descripcion: 'Nueva notificación',
                tipo: 'general',
                leido: notificacion.estado
              };
            }
          })
        );

        return notificacionesCompletas;
      })
    );
  }

  // Método específico para obtener solo las notificaciones no leídas (para el contador)
  obtenerContadorNoLeidas(idUsuario: string): Observable<number> {
    return this.obtenerNotificacionesCompletas(idUsuario).pipe(
      switchMap(async (notificaciones: Notificaciones[]) => {
        return notificaciones.filter(n => !n.leido).length;
      })
    );
  }

  private determinarTipoNotificacion(descripcion: string): string {
    const desc = descripcion.toLowerCase();
    if (desc.includes('mensaje')) return 'mensaje';
    if (desc.includes('solicitud')) return 'solicitud';
    if (desc.includes('reporte')) return 'reporte';
    if (desc.includes('comentario')) return 'comentario';
    if (desc.includes('compra')) return 'compra';
    if (desc.includes('venta')) return 'venta';
    if (desc.includes('renta')) return 'renta';
    return 'general';
  }

  guardar(request: Notificaciones): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`, request);
  }

  CambiarEstado(request: Notificaciones): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.urlApi}CambiarEstado`, request);
  }
}