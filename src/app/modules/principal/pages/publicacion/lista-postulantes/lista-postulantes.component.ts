import { PostulacionService } from 'src/app/shared/servicios/postulacion.service';
import { Component, Input } from '@angular/core';
import { PublicacionByID } from 'src/api/models/publicaciones/publicaciones';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import Swal from 'sweetalert2';
import { CalificacionesService } from 'src/app/shared/servicios/calificaciones.service';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.scss'],
})
export class ListaPostulantesComponent {
  @Input() publicacion!: PublicacionByID;

  postulantes: any;
  empleadosAceptados: any;

  constructor(
    private publicacionService: PublicacionService,
    private postulacionService: PostulacionService,
    private calificacionesService: CalificacionesService,
    private authService: AuthService,
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
          this.empleadosAceptados = res.aceptados;
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
              this.listaPostulantes();
            },
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
                text: response.message,
                icon: 'success',
                confirmButtonColor: '#006666',
                confirmButtonText: 'Aceptar',
              });
              this.listaPostulantes();
            },
          );
      }
    });
  }

  calificarEmpleado(id_postulante: number, id_postulacion: number): void {
    Swal.fire({
      title: 'Calificar Empleado',
      html: `
        <div class="form-group">
          <label for="calificacion">Calificación</label>
          <select class="form-control" id="calificacion" name="calificacion">
            <option value="1">1 - Muy malo</option>
            <option value="2">2 - Malo</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Bueno</option>
            <option value="5">5 - Muy bueno</option>
          </select>
        </div>
        <div class="form-group">
          <label for="comentario">Comentario</label>
          <textarea class="form-control" id="comentario" name="comentario" rows="3"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#006666',
      confirmButtonText: 'Calificar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const calificacion = {
          id_publicacion: this.publicacion.id_publicacion,
          id_postulacion: id_postulacion,
          puntuacion: (document.getElementById('calificacion') as HTMLInputElement).value,
          comentario: (document.getElementById('comentario') as HTMLInputElement).value,
          id_usuario_calificador: this.authService.getUserInfo().id_usuario_rol,
          id_usuario_calificado: id_postulante,
        };
        return this.calificacionesService.generarCalificacionEmpleado(calificacion).toPromise();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Calificación generada!',
          text: 'La calificación ha sido generada con éxito',
          icon: 'success',
          confirmButtonColor: '#006666',
          confirmButtonText: 'Aceptar',
        });
        this.listaPostulantes();
      }
    }
    );
  }
}

