import { Injectable } from '@angular/core';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Persona } from '../interfaces/persona';
import { Publicaciones } from '../interfaces/publicaciones';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlApi: string = environment.endpoint + "Persona/"

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(request: Publicaciones): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,request);
  }

  editar(request: Publicaciones): Observable<RespuestaAPI>{
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,request);
  }

  eliminar(id: Publicaciones):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: Publicaciones):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Obtener/${id}`);
  }
}
