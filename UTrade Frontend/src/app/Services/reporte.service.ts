import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reporte } from '../interfaces/reporte'; 
import { environment } from '../../environments/environment';
import { ConexionBackendService } from '../Services/conexion-backend.service';
import { RespuestaAPI } from '../interfaces/respuesta-api';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private urlApi: string = environment.endpoint + "Reporte/"


  constructor(private http: HttpClient) {}

    listar(): Observable<any> {
        return this.http.get<any>(`${this.urlApi}Listar`);
    }

    guardar(reporte: Reporte): Observable<any> {
        return this.http.post<any>(`${this.urlApi}Guardar`, reporte);
    }

    actualizar(reporte: Reporte): Observable<any> {
        return this.http.put<any>(`${this.urlApi}Editar`, reporte);
    }

    buscar(id: string): Observable<any> {
        return this.http.get<any>(`${this.urlApi}Buscar/${id}`);
    }
}
