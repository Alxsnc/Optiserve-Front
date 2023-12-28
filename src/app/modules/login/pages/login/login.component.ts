import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';//jjjj
import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public myForm!:FormGroup;

  constructor(private fb:FormBuilder,private loginPrd:AutentificacionService,
    private routerprd:Router) { }

  ngOnInit(): void {
    this.myForm=this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      email:['',[Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)]]
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

  }

  public get f():any{
    return this.myForm.controls;
  }

}
