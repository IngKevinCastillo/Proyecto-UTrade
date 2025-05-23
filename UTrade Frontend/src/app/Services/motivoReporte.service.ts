import { Injectable } from '@angular/core';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { motivoReporte } from '../interfaces/motivoReporte';    

@Injectable({
  providedIn: 'root'
})
export class motivoReporteService {

  private urlApi: string = environment.endpoint + "motivoReporte/"

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(motivoReporte: motivoReporte): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,motivoReporte);
  }

  editar(motivoReporte: motivoReporte): Observable<RespuestaAPI>{
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,motivoReporte);
  }

  eliminar(id: string):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: string):Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }
}