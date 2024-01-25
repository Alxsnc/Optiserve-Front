import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from 'src/environments/environment.prod';
import { CategoriaObject } from 'src/api/models/publicaciones/categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {
  private categoriasUrl = ENV.apiHost + ENV.apiCategoriasUrl;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<CategoriaObject> {
    return this.http.get<CategoriaObject>(this.categoriasUrl);
  }
}
