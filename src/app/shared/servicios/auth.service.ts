import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private urlEndPoint: string = 'http://localhost:4000/api/auth' + '/singin';

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    getUser(usuario: any): Observable<any> {
        return this.http.post<any>(this.urlEndPoint, usuario);
    }

    getToken(): string {
        return localStorage.getItem('token') ?? '';
    }

    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
