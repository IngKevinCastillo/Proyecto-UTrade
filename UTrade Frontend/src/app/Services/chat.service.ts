import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  listar(): Observable<any> {
    return this.http.get(`${this.conexionBackend.baseUrl}/Chat/Listar`);
  }

  buscar(id: string): Observable<any> {
    return this.http.get(`${this.conexionBackend.baseUrl}/Chat/Buscar/${id}`);
  }

  guardar(mensaje: any): Observable<any> {
    return this.http.post(
      `${this.conexionBackend.baseUrl}/Chat/Guardar`,
      mensaje,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(
      `${this.conexionBackend.baseUrl}/Chat/Eliminar/${id}`
    );
  }

  listarPorUsuario(id: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Chat/ListarPorIdPersona/${id}`
    );
  }
}
