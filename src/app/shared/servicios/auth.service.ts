import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';


@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private urlEndPoint: string = ENV.apiAuthUrl + '/singin';
    private tk = '';

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    getUser(usuario: any): Observable<any> {
        return this.http.post<any>(this.urlEndPoint, usuario);
    }

    decodeToken(): void {
        this.tk = localStorage.getItem('token') || '';

        // Decodificar el payload del token
        const decodedToken = JSON.parse(atob(this.tk.split('.')[1]));

        // Almacena los datos en el localStorage o donde lo necesites
        localStorage.setItem('id_usuario', decodedToken.id_usuario);
        localStorage.setItem('nombre', decodedToken.nombre);
        localStorage.setItem('apellido', decodedToken.apellido);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('idRol', decodedToken.id_rol);
        localStorage.setItem('nombreRol', decodedToken.nombre_rol);

        // Hacer lo que necesites con los datos obtenidos del token
        console.log('ID del usuario:', localStorage.getItem('id_usuario'));
        console.log('Nombre:', localStorage.getItem('nombre'));
        console.log('Apellido:', localStorage.getItem('apellido'));
        console.log('Email:', localStorage.getItem('email'));
        console.log('ID del rol:', localStorage.getItem('idRol'));
        console.log('Nombre del rol:', localStorage.getItem('nombreRol'));

    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
