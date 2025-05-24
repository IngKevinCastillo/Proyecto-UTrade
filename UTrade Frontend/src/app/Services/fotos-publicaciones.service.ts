import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { FotosPublicacion } from '../interfaces/fotos-publicacion';

@Injectable({
  providedIn: 'root'
})
export class FotosPublicacionesService {

  private urlApi: string = environment.endpoint + "FotosPublicaciones/"

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(request: FotosPublicacion): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,request);
  }

  editar(request: FotosPublicacion): Observable<RespuestaAPI>{
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,request);
  }

  eliminar(id: string):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: string):Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }

  buscarFotosPublicacion(id: string): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}BuscarFotosPublicacion/${id}`);
  }
}
