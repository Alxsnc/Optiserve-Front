import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {

  public myForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.myForm=this.createMyForm();
  }

  private createMyForm():FormGroup{
    return this.fb.group({
      titulo:['',[Validators.maxLength(100)]],
      descripcion:['',[Validators.maxLength(500)]],
      pago:['',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(4)]],
      ciudad:['',[Validators.required,Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),Validators.maxLength(20)]],
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
