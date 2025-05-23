import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from './conexion-backend.service';
import { Observable } from 'rxjs';

interface GenerarCodigoResponse {
  estado: boolean;
  valor: string;
  mgs?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  generarCodigoRegistro(fechaNacimiento: string) {
    return this.http.post<any>(
      `${this.conexionBackend.baseUrl}/Verificacion/GenerarCodigoRegistro`,
      fechaNacimiento,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  enviarCorreoVerificacion(payload: {
    correoDestino: string;
    asunto: string;
    codigoVerficacion: string;
  }): Observable<any> {
    return this.http.post(
      `${this.conexionBackend.baseUrl}/Verificacion/EnviarCorreoVerificacion`,
      payload
    );
  }

  obtenerPorUsuario(nombreUsuario: string): Observable<any> {
    return this.http.get(
      `${this.conexionBackend.baseUrl}/Persona/ObtenerPorUsuario/${nombreUsuario}`
    );
  }

  obtenerIdNuevoUsuario(): Observable<GenerarCodigoResponse> {
    return this.http.get<GenerarCodigoResponse>(
      `${this.conexionBackend.baseUrl}/Persona/ObtenerIdNuevoUsuario`
    );
  }

  registrarPersona(persona: any): Observable<any> {
    return this.http.post(
      `${this.conexionBackend.baseUrl}/Persona/Guardar`,
      persona,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
