import { AuthService } from 'src/app/shared/servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public objetounico={};


  constructor(
    private authService :AuthService,
  ){}

  ngOnInit(): void{


  }
}

