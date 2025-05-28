import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { CategoriaPublicacion } from '../interfaces/categoria-publicacion';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPublicacionService {
  private urlApi: string = environment.endpoint + "CategoriaPublicacion/"

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(request: CategoriaPublicacion): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,request);
  }

  editar(request: CategoriaPublicacion): Observable<RespuestaAPI>{
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,request);
  }

  eliminar(id: string):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: string):Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }
}
