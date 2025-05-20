import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConexionBackendService } from './conexion-backend.service';

interface SesionResponse {
  estado: boolean;
  valor: {
    idUsuario: number;
    correo: string;
    contraseña: string;
    telefono: string;
  };
  mgs: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private conexion: ConexionBackendService
  ) {}

  login(identificador: string, contraseña: string): Observable<SesionResponse> {
  return this.http.post<SesionResponse>(
    `${this.conexion.baseUrl}/Persona/IniciarSesion`,
    {
      correo: identificador,
      telefono: identificador,
      contraseña
    }
  );
}

}
