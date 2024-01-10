import { AuthService } from 'src/app/shared/servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  public objetounico={};


  constructor(
    private authService :AuthService,
  ){}

  ngOnInit(): void{
    throw new Error("Method not implemented");
  }

  public cerrarSesion(){
    this.authService.logout();
  }



}

