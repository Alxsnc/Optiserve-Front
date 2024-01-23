import { Publicaciones } from 'src/api/models/publicaciones/publicaciones';
import { PublicacionService } from '../../../../shared/servicios/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/servicios/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
})
export class ListaPublicacionesComponent implements OnInit {
  publicaciones: Publicaciones[] = [];
  publicacionesSubscription!: Subscription;

  constructor(
    private publicacionService: PublicacionService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.publicacionesSubscription = this.publicacionService.obtenerPublicaciones(this.authService.getUserInfo()).subscribe(
      (res) =>{
        this.publicaciones = res.publicaciones;
      }
    )
  }
  ngOnDestroy(): void {
    this.publicacionesSubscription?.unsubscribe()
  }

  mostrarAlerta(){
    Swal.fire({
      title: '¿Está seguro de borrar esta publicación?',
      text: "¡Esta accion no se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006666',
      cancelButtonColor: '#cc6666',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Si, quiero eliminarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Publicacion Borrada!',
          text: 'La publicacion ha sido borrada con exito.',
          icon: 'success'
        });
        // Aquí puedes poner la lógica para eliminar los datos si el usuario hizo clic en "Aceptar"
        console.log('Eliminando publicación...');
      }
    });
  }

}


