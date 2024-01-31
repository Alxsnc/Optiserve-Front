import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  rol = this.authService.getUserInfo().id_rol;

  constructor(
    private authService: AuthService,
    
  ) {}

  ngOnInit(): void {}

  public cerrarSesion() {
    Swal.fire({
      title: '¿Está seguro de cerrar sesión?',
      text: 'Si cierra sesión, se desconectará de su cuenta.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006666',
      cancelButtonColor: '#cc6666',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Se ha cerrado la sesión con éxito.',
          icon: 'success',
          confirmButtonColor: '#006666',
          confirmButtonText: 'Aceptar',
        });
        this.authService.logout();
      }
    });
  }
}
