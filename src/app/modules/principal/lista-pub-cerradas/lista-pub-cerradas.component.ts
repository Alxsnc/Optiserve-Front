import { Publicaciones } from 'src/api/models/publicaciones/publicaciones';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';


@Component({
  selector: 'app-lista-pub-cerradas',
  templateUrl: './lista-pub-cerradas.component.html',
  styleUrls: ['./lista-pub-cerradas.component.scss']
})

export class ListaPubCerradasComponent implements OnInit {
  publicaciones: Publicaciones[]=[];
  publicacionesCerradasSubscription!: Subscription;

  constructor(
    private publicacionService: PublicacionService,
    private authService: AuthService,
    ) {}


   ngOnInit(): void {
     this.publicacionesCerradasSubscription = this.publicacionService.obtenerPublicacionesCerradas(this.authService.getUserInfo()).subscribe(
       (res) => {
         this.publicaciones = res.publicaciones;
         console.log(this.publicaciones);
       }
     )
     console.log(this.publicaciones);
   }

   ngOnDestroy(): void {
     this.publicacionesCerradasSubscription?.unsubscribe()
   }

}
