import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CrearPublicacionService {

    private urlEndPoint: string = ENV.apiPublicacionUrl + '/nuevaPublicacion';

    constructor(private http: HttpClient ) { }

    registrarPublicacion(publicacion: any) {
        return this.http.post<any>(this.urlEndPoint, publicacion);
    }
}