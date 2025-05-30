import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Observable } from 'rxjs';
import { MensajeAccion } from '../interfaces/mensaje-accion';

@Injectable({
  providedIn: 'root'
})
export class MensajeAccionService {
  private urlApi: string = environment.endpoint + "MensajeAccion/";

  constructor(private http: HttpClient) {}

  listar(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(request: MensajeAccion): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`, request);
  }

  editar(request: MensajeAccion): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: string): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }
}
