import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';//jjjj
import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';


@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {

  public myForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private publicacionPrd:AutentificacionService,
    private routerprd:Router,
    ) { }

  ngOnInit(): void {
    this.myForm=this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      id_publicacion:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      id_usuario:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      titulo:['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),Validators.maxLength(100)]],
      descripcion:['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),Validators.maxLength(300)]],
      pago:['',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(4)]],
      fecha_publicacion:['',Validators.required],
      id_categoria:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      categoria:['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),Validators.maxLength(20)]],
    });
  }

  public submitFormulario(){
    
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{control.markAllAsTouched()});
      return;
    }

  }

  public get f():any{
    return this.myForm.controls;
  }


}
