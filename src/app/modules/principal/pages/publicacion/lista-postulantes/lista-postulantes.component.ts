import { Component, Input } from '@angular/core';
import { PublicacionByID } from 'src/api/models/publicaciones/publicaciones';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.scss'],
})
export class ListaPostulantesComponent {
  @Input() publicacion!: PublicacionByID;

  postulantes: any;

  constructor(private publicacionService: PublicacionService) {}

  ngOnChanges(): void {
    this.listaPostulantes();
  }

  listaPostulantes() {
    if (this.publicacion !== undefined) {
      this.publicacionService
        .obtenerPostulantesPorPublicacion(this.publicacion.id_publicacion)
        .subscribe((res) => {
          this.postulantes = res.data;
        });
    }
  }
}
