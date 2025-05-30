import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private urlApi: string = environment.endpoint + 'Notificaciones/';

  constructor(private http: HttpClient) {}

  listarPorIdUsuario(idUsuario: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarPorIdUsuario/${idUsuario}`
    );
  }

  guardar(request: Notification): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`, request);
  }

  CambiarEstado(request: Notification): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.urlApi}CambiarEstado`, request);
  }
}
