import { CrearPublicacionService } from '../../../../shared/servicios/crearPublicacion.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss']
})
export class ListaPublicacionesComponent implements OnInit{
  publicaciones:any[]=[];

  constructor(private crearPublicacionService:CrearPublicacionService){}

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones(){
    this.crearPublicacionService.obtenerPublicaciones().subscribe(
      (data)=>{
        this.publicaciones=data;
      },
      (error)=>{
        console.error('Error al obtener las publicaciones:',error);
      }
    );
  }
}
