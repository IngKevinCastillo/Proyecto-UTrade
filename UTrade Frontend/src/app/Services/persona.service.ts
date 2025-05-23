import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Publicaciones } from '../interfaces/publicaciones';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {
  private urlApi: string = environment.endpoint + "Publicaciones/"

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(request: Persona): Observable<RespuestaAPI>{
      return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,request);
    }
  
    editar(request: Persona): Observable<RespuestaAPI>{
      return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,request);
    }
  
    eliminar(id: number):Observable<RespuestaAPI>{
      return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
    }
  
    buscar(id: number):Observable<RespuestaAPI>{
      return this.http.delete<RespuestaAPI>(`${this.urlApi}Obtener/${id}`);
    }
}
