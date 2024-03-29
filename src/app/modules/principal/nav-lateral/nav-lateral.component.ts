import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-nav-lateral',
  templateUrl: './nav-lateral.component.html',
  styleUrls: ['./nav-lateral.component.scss']
})
export class NavLateralComponent {

  rol = this.authService.getUserInfo().id_rol;

  constructor(
    private authService :AuthService,
  ){}
}
