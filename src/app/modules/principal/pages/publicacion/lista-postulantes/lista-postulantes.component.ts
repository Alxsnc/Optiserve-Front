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

  constructor(private publicacionService: PublicacionService) {}

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

  aceptarPostulacion(): void {
    // Obtener el id_postulacion del localStorage
    const idPostulacion = localStorage.getItem('id_postulacion');
    if (!idPostulacion) {
      console.error('No se encontró id_postulacion en el localStorage');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez aceptada la postulación, no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicacionService.EstadoPostulacionAceptado(Number(idPostulacion)).subscribe(
          response => {
            // Manejar la respuesta si es necesario
            console.log('La postulación ha sido aceptada correctamente');
          },
          error => {
            // Manejar el error si ocurre
            console.error('Error al aceptar la postulación:', error);
          }
        );
      }
    });
  }

  cancelarPostulacion(): void {
    // Obtener el id_postulacion del localStorage
    const idPostulacion = localStorage.getItem('id_postulacion');
    if (!idPostulacion) {
      console.error('No se encontró id_postulacion en el localStorage');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez aceptada la postulación, no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.publicacionService.EstadoPostulacionCancelado(Number(idPostulacion)).subscribe(
          response => {
            // Manejar la respuesta si es necesario
            console.log('La postulación ha sido aceptada correctamente');
          },
          error => {
            // Manejar el error si ocurre
            console.error('Error al aceptar la postulación:', error);
          }
        );
      }
    });
  }


}
