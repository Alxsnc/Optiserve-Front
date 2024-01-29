import { Component, Input } from '@angular/core';
import { PublicaDTO } from 'src/api/models/publicaciones/publicaciones';

@Component({
  selector: 'app-lista-postulantes',
  templateUrl: './lista-postulantes.component.html',
  styleUrls: ['./lista-postulantes.component.scss']
})
export class ListaPostulantesComponent {
  @Input() publicacion:PublicaDTO = {
    ciudad:                "",
    descripcion:           "",
    fecha_modificacion:    new Date(),
    fecha_publicacion:     new Date(),
    id_categoria:          0,
    id_publicacion:        0,
    pago:                  "",
    provincia:             "",
    titulo:                "",

  };

  ngOnInit (): void {
    
  }

}
