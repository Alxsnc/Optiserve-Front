import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostulacionService {
  private postulacionUrl = ENV.apiHost + ENV.apiEmpleadosUrl;

  constructor(private http: HttpClient) { }

  createPostulacion(postulacion: any) {
    return this.http.post(this.postulacionUrl + ENV.apiCrearPostulacion, postulacion);
  }

  getPostulacionesByUser(id_usuario: string) {
    return this.http.get(this.postulacionUrl + ENV.apiListaPostulacionesPorUsuario + id_usuario);
  }

  cancelarPostulacion(id_postulacion: number) {
    return this.http.delete(this.postulacionUrl + ENV.apiCancelarPostulacion + id_postulacion);
  }

  estadoPostulacionAceptado(idPostulacion: number): Observable<any> {
    return this.http.put<any>(
      this.postulacionUrl + ENV.apiEstadoPostulacionAceptado + idPostulacion, {}
    );
  }

  estadoPostulacionRechazado(idPostulacion: number): Observable<any> {
    return this.http.put<any>(
      this.postulacionUrl + ENV.apiEstadoPostulacionCancelada + idPostulacion, {}
    );
  }

  listaContratosActivos(id_usuario: string) {
    return this.http.get(this.postulacionUrl + ENV.apiListaContratosActivos + id_usuario);
  }
}
