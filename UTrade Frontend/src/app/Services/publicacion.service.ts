import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaAPI, Publicacion } from '../interfaces/favorito';
import { ConexionBackendService } from './conexion-backend.service';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  obtenerPorId(idPublicacion: string): Observable<RespuestaAPI<Publicacion>> {
    return this.http.get<RespuestaAPI<Publicacion>>(
      `${this.conexionBackend.baseUrl}/Publicaciones/Buscar/${idPublicacion}`
    );
  }

  listar(): Observable<RespuestaAPI<Publicacion[]>> {
    return this.http.get<RespuestaAPI<Publicacion[]>>(
      `${this.conexionBackend.baseUrl}/Publicaciones/Listar`
    );
  }
}
