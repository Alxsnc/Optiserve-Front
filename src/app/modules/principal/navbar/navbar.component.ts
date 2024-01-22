import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

  constructor(
    private authService :AuthService,
  ){}

  public cerrarSesion(){
    alert("voy a salir")
    this.authService.logout();
  }
}
