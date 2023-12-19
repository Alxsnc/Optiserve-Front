import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  public objetounico={};


  constructor(private aut:AutentificacionService, private router:Router){}
  ngOnInit(): void{
    throw new Error("Method not implemented");
  }

  public cerrarSesion(){
    return this.router.navigateByUrl('/login');;
  }



}

