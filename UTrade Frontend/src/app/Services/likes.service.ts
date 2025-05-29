import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  guardar(like: any): Observable<any> {
    return this.http.post(
      `${this.conexionBackend.baseUrl}/Likes/Guardar`,
      like,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(
      `${this.conexionBackend.baseUrl}/Likes/Eliminar/${id}`
    );
  }

  verificarLike(idResenia: string, idPersona: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Likes/VerificarLike/${idResenia}/${idPersona}`
    );
  }

  contarLikes(idResenia: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Likes/ContarLikes/${idResenia}`
    );
  }

  eliminarPorResenia(idResenia: string, idPersona: string): Observable<any> {
    return this.http.delete(
      `${this.conexionBackend.baseUrl}/Likes/EliminarPorResenia/${idResenia}/${idPersona}`
    );
  }
}
