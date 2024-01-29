import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/shared/servicios/rol.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  rol:number=0;

  constructor(
    private authService :AuthService,
    private rolService:RolService
  ){}

  ngOnInit(): void {
    this.rolService.rol$.subscribe(rol=>{
      this.rol=rol;
    })
  }

  public cerrarSesion() {
    Swal.fire({
      title: '¿Está seguro de cerrar sesión?',
      text: 'Si cierra sesión, se desconectará de su cuenta.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#006666',
      cancelButtonColor: '#cc6666',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Sesión cerrada',
          text: 'Se ha cerrado la sesión con éxito.',
          icon:'success',
          confirmButtonColor: '#006666',
          confirmButtonText: 'Aceptar'
        });
        this.authService.logout();
      }
    });
  }
}
