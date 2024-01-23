import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';


@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private urlAuth: string = ENV.apiHost + ENV.apiAuthUrl + '/singin';
    private tk = '';

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    //Metodo para la peticion al backend
    loginUser(usuario: any): Observable<any> {
        return this.http.post<any>(this.urlAuth, usuario);
    }

    // Método para decodificar el token y almacenarlo en el localStorage
    decodeToken(): void {
        this.tk = localStorage.getItem('token') || '';

        // Decodificar el payload del token
        const userInfo = JSON.parse(atob(this.tk.split('.')[1]));

        // Almacenar el objeto JSON en el localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

         // Hacer lo que necesites con los datos obtenidos del token
         console.log('Información del usuario:', localStorage.getItem('userInfo'));

    }

    // Método para obtener la información del usuario almacenada en el JSON
    getUserInfo(): any {
        const userInfoString = localStorage.getItem('userInfo');
        console.log('Información del usuario desde el Servicio:', userInfoString);
        if (userInfoString !== null) {
            // Parsear la cadena JSON a un objeto JavaScript
            const userInfo = JSON.parse(userInfoString); //NO TOCAAAR
            return userInfo;
        } else {
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        alert("token: "+localStorage.getItem('token')+"\nUser: "+localStorage.getItem('userInfo'))
        this.router.navigate(['/login']);
        console.trace('Cerrando sesión');
    }
}
