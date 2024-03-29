import { Publicacion } from 'src/api/models/publicaciones/publicaciones';
import {Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';




@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
})
export class ListaPublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionesSubscription!: Subscription;


  constructor(
    private publicacionService: PublicacionService,
    private authService: AuthService
    ) { }


  ngOnInit(): void {
    this.listaActivas();
  }

  ngOnDestroy(): void {
    this.publicacionesSubscription?.unsubscribe()
  }

  listaActivas(){
    this.publicacionesSubscription?.unsubscribe();

    this.publicacionesSubscription = this.publicacionService.obtenerPublicaciones(this.authService.getUserInfo()).subscribe(
      (res) =>{
        this.publicaciones = res.publicaciones;
      }
    )
  }

  mostrarAlerta(publicacion: Publicacion): void {
    Swal.fire({
      title: '¿Está seguro de borrar esta publicación?',
      text: "¡Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006666',
      cancelButtonColor: '#cc6666',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, quiero eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Hacer la solicitud HTTP para eliminar la publicación
        this.publicacionService.eliminarPublicacion(publicacion).subscribe(
          (response: any) => {
            // Mostrar mensaje de éxito
            Swal.fire({
              title: 'Publicación Borrada!',
              text: response.message, // Utilizar el mensaje proporcionado por el backend
              icon: 'success',
              confirmButtonColor: '#006666',
              confirmButtonText: "Aceptar"
            });

            // Aquí puedes realizar cualquier otra acción después de eliminar con éxito
            this.listaActivas();
          },
          (error: any) => {
            // Mostrar mensaje de error
            Swal.fire({
              title: 'Error al borrar la publicación',
              text: error.error.error || 'Su publicación tiene postulaciones en proceso, no puede ser eliminada.',
              icon: 'error',
              confirmButtonColor: '#cc6666',
              confirmButtonText: "Aceptar"
            });
          }
        );
      }
    });
  }


  // mostrarAlerta(publicacion: Publicaciones){
  //   Swal.fire({
  //     title: '¿Está seguro de borrar esta publicación?',
  //     text: "¡Esta accion no se podra revertir!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#006666',
  //     cancelButtonColor: '#cc6666',
  //     cancelButtonText:'Cancelar',
  //     confirmButtonText: 'Si, quiero eliminarla!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: 'Publicacion Borrada!',
  //         text: 'La publicacion ha sido borrada con exito.',
  //         icon: 'success',
  //         confirmButtonColor: '#006666',
  //         confirmButtonText: "Aceptar"
  //       });
  //       // Aquí puedes poner la lógica para eliminar los datos si el usuario hizo clic en "Aceptar"
  //       this.publicacionService.eliminarPublicacion(publicacion).subscribe();
  //       this.listaActivas();
  //     }
  //   });
  // }





}


