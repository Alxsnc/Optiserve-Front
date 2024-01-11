import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as ENV} from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private urlEndPoint: string = ENV.apiAuthUrl + '/singin';

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
