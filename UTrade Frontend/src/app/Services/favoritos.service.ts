import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaAPI, Favorito } from '../interfaces/favorito';
import { ConexionBackendService } from './conexion-backend.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  crear(favorito: Favorito): Observable<RespuestaAPI<any>> {
    return this.http.post<RespuestaAPI<any>>(
      `${this.conexionBackend.baseUrl}/Favoritos/Crear`,
      favorito,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  buscarPorUsuario(idUsuario: string): Observable<RespuestaAPI<Favorito[]>> {
    return this.http.get<RespuestaAPI<Favorito[]>>(
      `${this.conexionBackend.baseUrl}/Favoritos/BuscarPorUsuario/${idUsuario}`
    );
  }

  eliminarUsuarioPublicacion(
    idUsuario: string,
    idPublicacion: string
  ): Observable<RespuestaAPI<any>> {
    return this.http.delete<RespuestaAPI<any>>(
      `${this.conexionBackend.baseUrl}/Favoritos/EliminarUsuarioPublicacion/${idUsuario}/${idPublicacion}`
    );
  }

  verificarFavorito(
    idUsuario: string,
    idPublicacion: string
  ): Observable<RespuestaAPI<boolean>> {
    return this.http.get<RespuestaAPI<boolean>>(
      `${this.conexionBackend}/Favoritos/VerificarFavorito/${idUsuario}/${idPublicacion}`
    );
  }
}
