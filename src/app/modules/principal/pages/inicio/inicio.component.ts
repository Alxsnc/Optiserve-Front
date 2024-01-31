import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import { PostulacionService } from 'src/app/shared/servicios/postulacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  public publicacionesActivas: any[] = [];
  public publicacionesCopy: any[] = [];
  public postulaciones: any[] = [];
  public rol = this.authService.getUserInfo().id_rol;

  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionService,
    private postulacionService: PostulacionService
  ) {}

  ngOnInit(): void {
    this.empleador();
    this.PostulacionesUsuario();

  }

  empleador() {
    if (this.authService.getUserInfo().id_rol === 3) {
      this.publicacionService
        .obtenerPublicacionesActivas(this.authService.getUserInfo().id_usuario)
        .subscribe(
          (response) => {
            this.publicacionesActivas = response.publicaciones;
            this.publicacionesCopy = JSON.parse(JSON.stringify(this.publicacionesActivas));
          },
          (error) => {
            console.error('Error al obtener las publicaciones activas', error);
          }
        );
    }
  }

  postularAPublicacion(publicacion: any) {
    const postulacion = {
      id_publicacion: publicacion.id_publicacion,
      id_empleado: this.authService.getUserInfo().id_usuario,
    };

    Swal.fire({
      title: '¿Estás seguro de postularte?',
      text: 'Una vez que te postulas, si tu postulación es aceptada o rechazada no podrás cancelar.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, postularme',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario ha confirmado la postulación
        this.enviarPostulacion(postulacion);

      }
    });

  }

  cancelarPostulacion(publicacion: any) {
    const postulacion = this.postulaciones.find(
      (postulacion) => postulacion.id_publicacion === publicacion.id_publicacion
    );
    Swal.fire({
      title: '¿Estás seguro de cancelar tu postulación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario ha confirmado la cancelación
        this.postulacionService.cancelarPostulacion(postulacion.id_postulacion).subscribe(
          (response) => {
            // Manejar la respuesta exitosa aquí
            Swal.fire('Éxito', 'Has cancelado tu postulación.', 'success');
          },
          (error) => {
            // Manejar el error aquí
            Swal.fire({
              title: 'Error al cancelar postulación',
              text: error.error.error,
              icon: 'error',
              confirmButtonColor: '#cc6666',
              confirmButtonText: "Aceptar"
            });
          }
        );
      }
    });
  }

  private enviarPostulacion(postulacion: any) {
    this.postulacionService.createPostulacion(postulacion).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí
        Swal.fire('Éxito', 'Te has postulado correctamente.', 'success');
      },
      (error) => {
        // Manejar el error aquí
        Swal.fire({
          title: 'Error al postular',
          text: error.error.error || 'Usted ya postuló a esta publicación.',
          icon: 'error',
          confirmButtonColor: '#cc6666',
          confirmButtonText: "Aceptar"
        });

      }
    );
  }

  PostulacionesUsuario() {
    this.postulacionService.getPostulacionesByUser(this.authService.getUserInfo().id_usuario).subscribe(
      (response: any) => {
        this.postulaciones = response.postulaciones;
      },
      (error) => {
        console.error('Error al obtener las postulaciones', error);
      }
    );
  }

  PublicacionesPostuladas(){
    this.publicacionesCopy = this.publicacionesCopy.filter(publicacion => {
      return this.postulaciones.some(postulacion => postulacion.id_publicacion === publicacion.id_publicacion);
    });
  }
}
