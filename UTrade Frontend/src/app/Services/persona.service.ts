import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Persona } from '../interfaces/persona';


@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {
  private urlApi: string = environment.endpoint + "Persona/"

  constructor(
    private http: HttpClient
  ) {}

  lista(): Observable<RespuestaAPI>{
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }
}
