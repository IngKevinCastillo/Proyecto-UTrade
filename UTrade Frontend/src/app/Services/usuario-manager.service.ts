import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioManagerService {
  obtenerUsuarioActual(): Usuario | null {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      return usuario?.idUsuario ? usuario : null;
    } catch (error) {
      return null;
    }
  }

  esPropietarioPublicacion(
    idUsuario: string | undefined,
    idPropietario: string
  ): boolean {
    return idUsuario === idPropietario;
  }

  puedeCrearResena(usuario: Usuario | null): boolean {
    return !!usuario?.idUsuario;
  }

  puedeVerificarResena(
    usuario: Usuario | null,
    idPropietario: string,
    resenaVerificada: boolean
  ): boolean {
    return (
      this.esPropietarioPublicacion(usuario?.idUsuario, idPropietario) &&
      !resenaVerificada
    );
  }
}
