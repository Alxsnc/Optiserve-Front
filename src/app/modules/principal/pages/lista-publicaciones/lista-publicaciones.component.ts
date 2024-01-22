import { Publicaciones } from 'src/api/models/publicaciones/publicaciones';
import { PublicacionService } from '../../../../shared/servicios/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
})
export class ListaPublicacionesComponent implements OnInit {
  publicaciones: Publicaciones[] = [];
  publicacionesSubscription!: Subscription;

  constructor(
    private publicacionService: PublicacionService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.publicacionesSubscription = this.publicacionService.obtenerPublicaciones(this.authService.getUserInfo()).subscribe(
      (res) =>{
        this.publicaciones = res.publicaciones;
      }
    )
  }
  ngOnDestroy(): void {
    this.publicacionesSubscription?.unsubscribe()
  }

}
