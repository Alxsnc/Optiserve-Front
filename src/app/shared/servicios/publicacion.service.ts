import { PublicacionObject, Publicaciones } from './../../../api/models/publicaciones/publicaciones';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class PublicacionService {

  readonly urlBackEnd = ENV.apiHost + ENV.apiPublicacionUrl;

  constructor(private http: HttpClient ) { }

    registrarPublicacion(publicacion: any) {
        return this.http.post<any>(this.urlBackEnd + ENV.apiRegistroPublicacionUrl, publicacion);
    }

    obtenerPublicaciones(user: any): Observable<PublicacionObject> {
      return this.http.get<PublicacionObject>(this.urlBackEnd + ENV.apiObtenerPublicacionesActivasUrl + user.id_usuario);
    }

    obtenerPublicacionesCerradas(user: any):Observable<PublicacionObject>{
      return this.http.get<PublicacionObject>(this.urlBackEnd + ENV.apiObtenerPublicacionesCerradasUrl + user.id_usuario);
    }

    eliminarPublicacion(publicacion: Publicaciones): Observable<any> {
      return this.http.delete<any>(this.urlBackEnd + ENV.apiEliminarPublicacionUrl + publicacion.id_publicacion);
    }

}
