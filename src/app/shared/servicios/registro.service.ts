import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {
    private urlEndPoint: string = ENV.apiAuthUrl + '/singup';

    constructor(private http: HttpClient ) { }

    registrarUsuario(usuario: any) {
        return this.http.post<any>(this.urlEndPoint, usuario);
    }
}

