import { Component } from '@angular/core';
import { AutentificacionService } from './shared/servicios/autentificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Optiservice-Front';

  constructor(private loginPrd:AutentificacionService){

  }

  
}
