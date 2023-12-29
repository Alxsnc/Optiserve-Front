import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';//jjjj
import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';
import { RegistroService } from 'src/app/shared/servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public myForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private loginPrd:AutentificacionService,
    private routerprd:Router,
    private registroService:RegistroService) { }

  ngOnInit(): void {
    this.myForm=this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      apellido:['',[Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      fecha_nac:['',Validators.required],
      email:['',[Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      contrasena:['',[Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)]]
    });
  }

  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{control.markAllAsTouched()});
      return;
    }

    if(!this.loginPrd.ingresarAplicativo(this.myForm.value)){
      alert("Usuario o contraseña invalido");
    }else{
      this.routerprd.navigateByUrl("/sesion/principal")
    }

    let usuario = this.myForm.value;

    usuario.id_usuario = '0604230268';

    console.trace(usuario);

    this.registroService.registrarUsuario(usuario).subscribe();

  }

  public get f():any{
    return this.myForm.controls;
  }


}
