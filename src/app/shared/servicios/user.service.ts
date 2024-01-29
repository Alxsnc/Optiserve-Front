import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';


@Injectable({
    providedIn: 'root',
})

export class UserService {
    private urlBackEnd: string = ENV.apiHost + ENV.apiUserUrl;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    obtenerUsuario(id: string): Observable<any> {
      return this.http.get<any>(this.urlBackEnd + ENV.apiGetUser + id);
    }

    modificarUsuario(id:string, user: any): Observable<any> {
      return this.http.patch<any>(this.urlBackEnd + ENV.apiUpdateUser + id, user);
    }
}
