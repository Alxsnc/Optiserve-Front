import { PublicacionObject, Publicaciones } from './../../../api/models/publicaciones/publicaciones';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class PublicacionService {

    constructor(private http: HttpClient ) { }

    registrarPublicacion(publicacion: any) {
        return this.http.post<any>(ENV.apiPublicacionUrl + '/nuevaPublicacion', publicacion);
    }

    obtenerPublicaciones(user: any): Observable<PublicacionObject> {
      return this.http.get<PublicacionObject>(ENV.apiPublicacionUrl + '/listaPublicaciones/' + user.id_usuario);
    }

}
