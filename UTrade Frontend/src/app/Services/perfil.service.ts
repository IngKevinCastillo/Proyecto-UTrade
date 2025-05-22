import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { ConexionBackendService } from './conexion-backend.service';

interface PerfilResponse {
  estado: boolean;
  valor: {
    id: string;
    nombreUsuario: string;
    nombres: string;
    apellidos: string;
    genero: string;
    correo: string;
    telefono: string;
    fechaNacimiento: string;
    fotoPerfil: string;
    idRol: string;
    contraseña: string;
  };
  mensaje?: string;
}

interface PerfilUpdatePayload {
  id: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  idRol: string;
  nombreUsuario: string;
  contraseña: string;
  correo: string | null;
  telefono: string | null;
  fotoPerfilBase64: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(
    private http: HttpClient,
    private conexion: ConexionBackendService
  ) {}

  obtenerPerfil(idUsuario: string): Observable<PerfilResponse> {
    return this.http.get<PerfilResponse>(
      `${this.conexion.baseUrl}/Persona/Obtener/${idUsuario}`
    );
  }

  actualizarPerfil(
    perfil: PerfilUpdatePayload
  ): Observable<{ estado: boolean; mensaje?: string }> {
    return this.http.put<{ estado: boolean; mensaje?: string }>(
      `${this.conexion.baseUrl}/Persona/Editar`,
      perfil
    );
  }

  obtenerIdUsuario(): string | null {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario?.idUsuario || null;
  }

  obtenerUsuarioLocal(): any {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  mapearGenero(generoBackend: string): string {
    switch (generoBackend) {
      case 'M':
        return 'masculino';
      case 'F':
        return 'femenino';
      case 'O':
        return 'otro';
      default:
        return '';
    }
  }

  mapearGeneroParaBackend(generoFrontend: string): string {
    switch (generoFrontend) {
      case 'masculino':
        return 'M';
      case 'femenino':
        return 'F';
      case 'otro':
        return 'O';
      default:
        return '';
    }
  }
}
