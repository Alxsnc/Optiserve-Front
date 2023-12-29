import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {
    private urlEndPoint: string = 'http://localhost:4000/api/auth' + '/registro';

    constructor(private http: HttpClient ) { }

    registrarUsuario(usuario: any) {
        return this.http.post<any>(this.urlEndPoint, usuario);
    }
}

