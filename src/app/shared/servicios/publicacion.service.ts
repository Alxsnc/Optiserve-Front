import {
  PublicacionObject,
  PublicacionesObject,
  Publicacion
} from './../../../api/models/publicaciones/publicaciones';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  readonly urlBackEnd = ENV.apiHost + ENV.apiPublicacionUrl;
  readonly urlBackEndEmpleado = ENV.apiHost + ENV.apiEmpleadosUrl;

  constructor(private http: HttpClient) {}

  registrarPublicacion(publicacion: any) {
    return this.http.post<any>(
      this.urlBackEnd + ENV.apiRegistroPublicacionUrl,
      publicacion
    );
  }

  obtenerPublicaciones(user: any): Observable<PublicacionesObject> {
    return this.http.get<PublicacionesObject>(
      this.urlBackEnd + ENV.apiObtenerPublicacionesActivasUrl + user.id_usuario
    );
  }

  obtenerPublicacionesCerradas(user: any): Observable<PublicacionesObject> {
    return this.http.get<PublicacionesObject>(
      this.urlBackEnd + ENV.apiObtenerPublicacionesCerradasUrl + user.id_usuario
    );
  }

  modificarPublicacion(
    id: number,
    publicacion: Publicacion
  ): Observable<any> {
    return this.http.put<any>(
      this.urlBackEnd + ENV.apiModificarPublicacionUrl + id,
      publicacion
    );
  }

  eliminarPublicacion(publicacion: Publicacion): Observable<any> {
    return this.http.delete<any>(
      this.urlBackEnd +
        ENV.apiEliminarPublicacionUrl +
        publicacion.id_publicacion
    );
  }

  obtenerPublicacionById(id: number): Observable<PublicacionObject> {
    return this.http.get<PublicacionObject>(
      this.urlBackEnd + ENV.apiObtenerPublicacionById + id
    );
  }

  obtenerPublicacionesActivas(
    idUsuario: number
  ): Observable<PublicacionesObject> {
    return this.http.get<PublicacionesObject>(
      this.urlBackEndEmpleado + ENV.apiObtenerPublicacionesActivas + idUsuario
    );
  }

  obtenerPostulantesPorPublicacion(
    idPublicacion: number
  ): Observable<any> {
    return this.http.get<any>(
      this.urlBackEnd + ENV.apiListaPostulantes + idPublicacion
    );
  }

  EstadoPostulacionAceptado(idPostulacion: number): Observable<any> {
    return this.http.put<any>(
      this.urlBackEnd + ENV.apiEstadoPostulacionAceptado + idPostulacion, {}
    );
  }
  EstadoPostulacionCancelado(idPostulacion: number): Observable<any> {
    return this.http.put<any>(
      this.urlBackEnd + ENV.apiEstadoPostulacionCancelada + idPostulacion, {}
    );
  }

}
