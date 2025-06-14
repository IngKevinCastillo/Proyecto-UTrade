import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaAPI } from '../interfaces/respuesta-api';
import { Publicaciones } from '../interfaces/publicaciones';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private urlApi: string = environment.endpoint + 'Publicaciones/';

  constructor(private http: HttpClient) {}

  lista(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.urlApi}Listar`);
  }

  guardar(request: Publicaciones): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${this.urlApi}Guardar`, request);
  }

  editar(request: Publicaciones): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${this.urlApi}Editar`, request);
  }

  eliminar(id: string): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${this.urlApi}Eliminar/${id}`);
  }

  buscar(id: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.urlApi}Buscar/${id}`);
  }

  listarPorCategoria(idCategoria: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarPorCategoria/${idCategoria}`
    );
  }

  ObtenerIdNuevaPublicacion(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ObtenerIdNuevaPublicacion`
    );
  }

  listarPorUsuario(idUsuario: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarPorUsuario/${idUsuario}`
    );
  }

  listarActivos(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${this.urlApi}ListarActivos`);
  }

  listarSoloConLatitudAltitud(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarSoloConLongitudLatitud`
    );
  }

  busquedaTexto(texto: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}BusquedaTexto/${encodeURIComponent(texto)}`
    );
  }

  listarRangoPrecio(
    precioMinimo: number,
    precioMaximo: number
  ): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarRangoPrecio/${precioMinimo}/${precioMaximo}`
    );
  }

  listarMaxOMinPrecio(tipoFiltro: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarMaxOMinPrecio/${tipoFiltro}`
    );
  }

  listarPorFecha(tipoFiltro: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(
      `${this.urlApi}ListarPorFecha/${tipoFiltro}`
    );
  }
}
