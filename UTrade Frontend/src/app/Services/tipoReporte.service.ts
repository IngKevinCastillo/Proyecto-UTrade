import { Injectable } from '@angular/core';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { tipoReporte } from '../interfaces/tipoReporte';    

@Injectable({
  providedIn: 'root'
})
export class tipoReporteService {

  private urlApi: string = environment.endpoint + "tipoReporte/"

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(tipoReporte: tipoReporte): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,tipoReporte);
  }

  editar(tipoReporte: tipoReporte): Observable<RespuestaAPI>{
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,tipoReporte);
  }

  eliminar(id: string):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: string):Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }
}