import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as ENV } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private calificacionesUrl = ENV.apiHost + ENV.apiCalificacionesUrl;

  constructor(
    private http: HttpClient,
  ) { }

  generarCalificacion(calificacion: any) {
    return this.http.post(this.calificacionesUrl + ENV.apiGenerarCalificacion, calificacion);
  }

  cerrarPublicacion(id_publicacion: number) {
    return this.http.post(this.calificacionesUrl + ENV.apiCerrarPublicacion, {id_publicacion});
  }
}
