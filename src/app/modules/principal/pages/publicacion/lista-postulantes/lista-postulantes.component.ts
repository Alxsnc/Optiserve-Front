import { PostulacionService } from 'src/app/shared/servicios/postulacion.service';
import { Component, Input } from '@angular/core';
import { PublicacionByID } from 'src/api/models/publicaciones/publicaciones';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.scss'],
})
export class ListaPostulantesComponent {
  @Input() publicacion!: PublicacionByID;

  postulantes: any;

  constructor(
    private publicacionService: PublicacionService,
    private postulacionService: PostulacionService,
  ) {}

  ngOnChanges(): void {
    this.listaPostulantes();
  }

  listaPostulantes() {
    if (this.publicacion !== undefined) {
      this.publicacionService
        .obtenerPostulantesPorPublicacion(this.publicacion.id_publicacion)
        .subscribe((res) => {
          this.postulantes = res.data;
        });
    }
  }

  aceptarPostulacion(id_postulacion: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez aceptada la postulación, no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.postulacionService
          .estadoPostulacionAceptado(id_postulacion)
          .subscribe(
            (response) => {
              // Manejar la respuesta si es necesario
              Swal.fire({
                title: 'Postulación Aceptada!',
                text: response.message, // Utilizar el mensaje proporcionado por el backend
                icon: 'success',
                confirmButtonColor: '#006666',
                confirmButtonText: 'Aceptar',
              });
            },
            (error) => {
              // Manejar el error si ocurre
              Swal.fire({
                title: 'Error al borrar la publicación',
                text: error.error.error,
                icon: 'error',
                confirmButtonColor: '#cc6666',
                confirmButtonText: 'Aceptar',
              });
            }
          );
      }
    });
  }

  rechazarPostulacion(id_postulacion: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez rechazada la postulación, no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.postulacionService
          .estadoPostulacionRechazado(id_postulacion)
          .subscribe(
            (response) => {
              Swal.fire({
                title: 'Postulación Rechazada!',
                text: response.message, // Utilizar el mensaje proporcionado por el backend
                icon: 'success',
                confirmButtonColor: '#006666',
                confirmButtonText: 'Aceptar',
              });
            },
            (error) => {
              Swal.fire({
                title: 'Error al borrar la publicación',
                text: error.error.error,
                icon: 'error',
                confirmButtonColor: '#cc6666',
                confirmButtonText: 'Aceptar',
              });
            }
          );
      }
    });
  }
}
