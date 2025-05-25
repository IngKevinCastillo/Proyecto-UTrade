import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  listar(): Observable<any> {
    return this.http.get(`${this.conexionBackend.baseUrl}/Mensajes/Listar`);
  }

  buscar(id: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Mensajes/Buscar/${id}`
    );
  }

  guardar(mensaje: any): Observable<any> {
    return this.http.post(
      `${this.conexionBackend.baseUrl}/Mensajes/Guardar`,
      mensaje,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(
      `${this.conexionBackend.baseUrl}/Mensajes/Eliminar/${id}`
    );
  }

  listarPorChat(idChat: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Mensajes/ListarPorChat/${idChat}`
    );
  }

  obtenerMensajeMasReciente(idChat: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Mensajes/ObtenerMensajeMasReciente/${idChat}`
    );
  }
}
