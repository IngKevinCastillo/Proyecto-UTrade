import { Injectable } from '@angular/core';
import { environment } from'../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Observable, forkJoin, map, switchMap, from } from 'rxjs';
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

  // Método nuevo para obtener notificaciones con datos completos
  obtenerNotificacionesCompletas(idUsuario: string): Observable<Notificaciones[]> {
    return this.listarPorIdUsuario(idUsuario).pipe(
      switchMap(async (response: RespuestaAPI) => {
        if (!response.estado || !response.valor) {
          return [];
        }

        const notificaciones: Notificaciones[] = response.valor;
        
        // Procesar cada notificación para obtener datos adicionales
        const notificacionesCompletas = await Promise.all(
          notificaciones.map(async (notificacion) => {
            try {
              // Obtener datos del TipoAccion
              const tipoAccionResponse = await this.tipoAccionService
                .buscar(notificacion.idTipoAccion)
                .toPromise();

              let personaRemitente = '';
              let mensajeDescripcion = '';
              
              if (tipoAccionResponse?.estado && tipoAccionResponse?.valor) {
                const tipoAccion = tipoAccionResponse.valor;
                
                // Obtener datos de la persona remitente
                if (tipoAccion.idPersonaRemitente) {
                  const personaResponse = await this.http
                    .get<RespuestaAPI>(`${this.urlPersona}Obtener/${tipoAccion.idPersonaRemitente}`)
                    .toPromise();
                  
                  if (personaResponse?.estado && personaResponse?.valor) {
                    const persona = personaResponse.valor;
                    personaRemitente = `${persona.nombres} ${persona.apellidos}`;
                  }
                }

                // Obtener descripción del mensaje de acción
                if (tipoAccion.idTipoMensaje) {
                  const mensajeResponse = await this.mensajeAccionService
                    .buscar(tipoAccion.idTipoMensaje)
                    .toPromise();
                  
                  if (mensajeResponse?.estado && mensajeResponse?.valor) {
                    mensajeDescripcion = mensajeResponse.valor.descripcion;
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
                descripcion: 'Notificación',
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

  private determinarTipoNotificacion(descripcion: string): string {
    if (descripcion.toLowerCase().includes('mensaje')) return 'mensaje';
    if (descripcion.toLowerCase().includes('solicitud')) return 'solicitud';
    if (descripcion.toLowerCase().includes('reporte')) return 'reporte';
    return 'general';
  }

  guardar(request: Notificaciones): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`, request);
  }

  CambiarEstado(request: Notificaciones): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.urlApi}CambiarEstado`, request);
  }
}