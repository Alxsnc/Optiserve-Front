import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/shared/servicios/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routerprd: Router,
    private registroService: RegistroService) { }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)]],
      id_usuario: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]],
      fecha_nacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)]]
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched() });
      return;
    }

    let usuario = this.myForm.value;

    console.trace(usuario);

    this.registroService.registrarUsuario(usuario).subscribe();

    Swal.fire({
      title: 'Usuario registrado con éxito',
      icon: 'success',
      text: 'El nuevo usuario ha sido registrado con éxito. ¡Bienvenido a OptiService!',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#006666'
    })

    this.routerprd.navigateByUrl("/login");

  }

  public get f(): any {
    return this.myForm.controls;
  }


}
