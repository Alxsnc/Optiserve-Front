import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { CalificacionesService } from 'src/app/shared/servicios/calificaciones.service';
import { PostulacionService } from 'src/app/shared/servicios/postulacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss'],
})
export class ContratosComponent {
  contratos: any;

  constructor(
    private postulacionService: PostulacionService,
    private authService: AuthService,
    private calificacionesService: CalificacionesService,
  ) {}

  ngOnInit(): void {
    this.listaContratosActivos();
  }

  listaContratosActivos() {
    this.postulacionService
      .listaContratosActivos(this.authService.getUserInfo().id_usuario)
      .subscribe((res: any) => {
        this.contratos = res.postulaciones;
      });
  }

  calificarEmpleador(id_empleador: number, id_publicacion: number) {
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
          id_publicacion: id_publicacion,
          puntuacion: (document.getElementById('calificacion') as HTMLInputElement).value,
          comentario: (document.getElementById('comentario') as HTMLInputElement).value,
          id_usuario_calificador: this.authService.getUserInfo().id_usuario_rol,
          id_usuario_calificado: id_empleador,
        };
        return this.calificacionesService.generarCalificacionEmpleador(calificacion).toPromise();
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
        this.listaContratosActivos();
      }
    }
    );
  }
  }

