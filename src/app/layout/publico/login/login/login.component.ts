import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutentificacionService } from 'src/app/shared/servicios/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public myForm!:FormGroup;

  constructor(private fb:FormBuilder,private loginPrd:AutentificacionService) { }

  ngOnInit(): void {
    this.myForm=this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      usuario:['',Validators.required],      
      password:['',Validators.required]
    });
  }

  public submitFormulario(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control=>{control.markAllAsTouched()});
      return;
    }

    if(this.loginPrd.ingresarAplicativo(this.myForm.value)){
      alert("Usuario o Contraseña invalidos")
    }
    
    console.log(this.myForm.value);
  }

  public get f():any{
    return this.myForm.controls;
  }

}
