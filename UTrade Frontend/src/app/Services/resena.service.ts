import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResenaService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  listarPorPublicacion(idPublicacion: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Resenia/ListarPorPublicacion/${idPublicacion}`
    );
  }

  guardar(resena: any): Observable<any> {
    return this.http.post(
      `${this.conexionBackend.baseUrl}/Resenia/Guardar`,
      resena,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  editar(resena: any): Observable<any> {
    return this.http.put(
      `${this.conexionBackend.baseUrl}/Resenia/Editar`,
      resena,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  buscar(id: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Resenia/Buscar/${id}`
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(
      `${this.conexionBackend.baseUrl}/Resenia/Eliminar/${id}`
    );
  }
}
