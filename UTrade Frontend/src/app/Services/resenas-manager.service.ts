import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResenaService } from './resena.service';
import { PersonaService } from './persona.service';
import { LikesService } from './likes.service';
import { Resena, ResenaData, LikeData } from '../interfaces/resena';
import { Usuario, DatosUsuario } from '../interfaces/usuario';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ResenasManagerService {
  constructor(
    private resenaService: ResenaService,
    private personaService: PersonaService,
    private likesService: LikesService
  ) {}

  cargarResenasCompletas(
    idPublicacion: string,
    usuarioActual: Usuario | null
  ): Observable<Resena[]> {
    return this.resenaService.listarPorPublicacion(idPublicacion).pipe(
      map((response: ApiResponse<Resena[]>) => {
        if (response?.estado && response?.valor) {
          return response.valor.map((resena: Resena) => ({
            ...resena,
            likes: resena.likes || [],
            cantidadLikes: 0,
            usuarioLeDioLike: false,
            idLikeUsuario: null,
          }));
        }
        return [];
      }),
      catchError(() => [])
    );
  }

  async enriquecerResenasConDatosUsuarios(
    resenas: Resena[]
  ): Promise<Resena[]> {
    if (resenas.length === 0) return resenas;

    const promesasUsuarios = resenas.map((resena) =>
      this.personaService.buscar(resena.idPersona).toPromise()
    );

    try {
      const responses = await Promise.all(promesasUsuarios);

      responses.forEach((response, index) => {
        if (response?.estado && response?.valor) {
          const datos: DatosUsuario = response.valor;
          resenas[index].nombreUsuario = `${datos.nombres} ${datos.apellidos}`;

          if (datos.fotoPerfilBase64 && datos.fotoPerfilBase64.trim() !== '') {
            resenas[index].fotoPerfilUrl =
              'data:image/jpeg;base64,' + datos.fotoPerfilBase64;
          } else {
            resenas[index].fotoPerfilUrl = 'icons/no-photo.webp';
          }
        } else {
          resenas[index].nombreUsuario = 'Usuario desconocido';
          resenas[index].fotoPerfilUrl = 'icons/no-photo.webp';
        }

        resenas[index].fechaResena = new Date(resenas[index].fecha);
      });

      return resenas;
    } catch (error) {
      resenas.forEach((resena, index) => {
        resenas[index].nombreUsuario = 'Usuario desconocido';
        resenas[index].fotoPerfilUrl = 'icons/no-photo.webp';
        resenas[index].fechaResena = new Date(resena.fecha);
      });
      return resenas;
    }
  }

  async cargarInformacionLikes(
    resenas: Resena[],
    idUsuario: string
  ): Promise<Resena[]> {
    if (!idUsuario || resenas.length === 0) return resenas;

    const promesasLikes = resenas.map((resena, index) => {
      const promesaConteo = this.likesService
        .contarLikes(resena.id)
        .toPromise();
      const promesaVerificar = this.likesService
        .verificarLike(resena.id, idUsuario)
        .toPromise();
      return Promise.all([promesaConteo, promesaVerificar, index]);
    });

    try {
      const resultados = await Promise.all(promesasLikes);

      resultados.forEach(([conteoResponse, verificarResponse, index]) => {
        if (conteoResponse?.estado) {
          resenas[index].cantidadLikes = conteoResponse.valor || 0;
        } else {
          resenas[index].cantidadLikes = 0;
        }

        if (verificarResponse?.estado && verificarResponse?.valor) {
          resenas[index].usuarioLeDioLike = true;
          resenas[index].idLikeUsuario = verificarResponse.valor.id;
        } else {
          resenas[index].usuarioLeDioLike = false;
          resenas[index].idLikeUsuario = null;
        }
      });

      return resenas;
    } catch (error) {
      resenas.forEach((resena, index) => {
        resenas[index].cantidadLikes = 0;
        resenas[index].usuarioLeDioLike = false;
        resenas[index].idLikeUsuario = null;
      });
      return resenas;
    }
  }

  toggleLike(resena: Resena, idUsuario: string): Observable<boolean> {
    if (resena.usuarioLeDioLike) {
      return this.likesService.eliminarPorResenia(resena.id, idUsuario).pipe(
        map((response: ApiResponse) => {
          if (response?.estado) {
            resena.usuarioLeDioLike = false;
            resena.idLikeUsuario = null;
            resena.cantidadLikes = Math.max((resena.cantidadLikes || 1) - 1, 0);
            return true;
          }
          return false;
        }),
        catchError(() => [false])
      );
    } else {
      const nuevoLike: LikeData = {
        id: '',
        IdReseña: resena.id,
        IdPersona: idUsuario,
      };

      return this.likesService.guardar(nuevoLike).pipe(
        map((response: ApiResponse) => {
          if (response?.estado && response?.valor) {
            resena.usuarioLeDioLike = true;
            resena.idLikeUsuario = response.valor.id;
            resena.cantidadLikes = (resena.cantidadLikes || 0) + 1;
            return true;
          }
          return false;
        }),
        catchError(() => [false])
      );
    }
  }

  verificarResena(resena: Resena): Observable<boolean> {
    const resenaActualizada: ResenaData = {
      id: resena.id,
      calificacion: resena.calificacion,
      comentario: resena.comentario,
      idPublicacion: resena.idPublicacion,
      idPersona: resena.idPersona,
      verificado: true,
    };

    return this.resenaService.editar(resenaActualizada).pipe(
      map((response: ApiResponse) => {
        if (response?.estado) {
          resena.verificado = true;
          return true;
        }
        return false;
      }),
      catchError(() => [false])
    );
  }

  crearResena(resenaData: ResenaData): Observable<boolean> {
    return this.resenaService.guardar(resenaData).pipe(
      map((response: ApiResponse) => response?.estado || false),
      catchError(() => [false])
    );
  }
}
