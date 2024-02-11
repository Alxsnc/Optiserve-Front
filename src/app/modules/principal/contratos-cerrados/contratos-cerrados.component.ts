import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { PostulacionService } from 'src/app/shared/servicios/postulacion.service';

@Component({
  selector: 'app-contratos-cerrados',
  templateUrl: './contratos-cerrados.component.html',
  styleUrls: ['./contratos-cerrados.component.scss']
})
export class ContratosCerradosComponent {
  contratos: any;
  calificaciones: any;

  constructor(
    private postulacionService: PostulacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listaContratosCerrados();
  }

  listaContratosCerrados() {
    this.postulacionService
      .listaContratosCerrados(this.authService.getUserInfo().id_usuario)
      .subscribe((res: any) => {
        this.contratos = res.contratosCerrados;
        this.calificaciones = res.calificaciones;
      });
  }

  //TODO: Cambiar por estrellas, no por select. Promedio calificaciones

}
