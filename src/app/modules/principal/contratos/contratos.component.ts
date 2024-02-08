import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { PostulacionService } from 'src/app/shared/servicios/postulacion.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss'],
})
export class ContratosComponent {
  contratos: any;

  constructor(
    private postulacionService: PostulacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listaContratosActivos();
  }

  listaContratosActivos() {
    this.postulacionService
      .listaContratosActivos(this.authService.getUserInfo().id_usuario)
      .subscribe((res: any) => {
        this.contratos = res.postulaciones;
        console.log('Contratos', this.contratos);
      });
  }
}
