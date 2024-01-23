import { Publicaciones } from 'src/api/models/publicaciones/publicaciones';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/servicios/auth.service';


@Component({
  selector: 'app-lista-pub-cerradas',
  templateUrl: './lista-pub-cerradas.component.html',
  styleUrls: ['./lista-pub-cerradas.component.scss']
})

export class ListaPubCerradasComponent implements OnInit {
  publicacionesCerradas: Publicaciones[]=[];
  publicacionesCerradasSubscription!: Subscription;

  constructor(
    private publicacionService: PublicacionService,
    private authService: AuthService,
    ) {}


   ngOnInit(): void {
     this.publicacionesCerradasSubscription = this.publicacionService.obtenerPublicacionesCerradas(this.authService.getUserInfo().id_usuario).subscribe(
       (res) => {
         this.publicacionesCerradas = res.publicaciones;
       }
     )
   }

   ngOnDestroy(): void {
     this.publicacionesCerradasSubscription?.unsubscribe()
   }

}
