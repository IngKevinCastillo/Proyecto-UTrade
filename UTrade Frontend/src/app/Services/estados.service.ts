import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Estados } from '../interfaces/estados';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private urlApi: string = environment.endpoint + "Estados/"
  
  constructor(
    private http: HttpClient
  ) { }
  
  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }
  
  guardar(estados: Estados): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`,estados);
  }
  
  editar(estados: Estados): Observable<RespuestaAPI>{
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`,estados);
  }
  
  eliminar(id: string):Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }
  
  buscar(id: string):Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }
}