import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { RolService } from 'src/app/shared/servicios/rol.service';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public publicacionesActivas: any[] = [];
  public rol: number = 0;

  constructor(
    private authService: AuthService,
    private rolService: RolService,
    private publicacionService: PublicacionService
  ) { }

  ngOnInit(): void {
    this.rolService.rol$.subscribe(rol => {
      this.rol = rol;
      console.log('id_rol: ', this.rol);

      if (this.rol === 3) {
        const usuario = this.authService.getUserInfo();

        if (usuario) {
          const idUsuario = parseInt(usuario.id_usuario, 10);

          console.log('ID Usuario antes de la llamada al servicio:', idUsuario);

          this.publicacionService.obtenerPublicacionesActivas(idUsuario)
            .subscribe(response => {
              console.log('Publicaciones obtenidas:', response.publicaciones);
              this.publicacionesActivas = response.publicaciones;
            }, error => {
              console.error('Error al obtener las publicaciones activas', error);
            });
        } else {
          console.error('No se encontró información del usuario en el localStorage');
        }
      }
    });
  }
  
}
