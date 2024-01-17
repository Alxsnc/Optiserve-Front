import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class Login2Component implements OnInit {

  public myForm!: FormGroup;

  roles = [{ text: 'Seleccione un rol', value: '' }, { text: 'Empleador', value: 'Empleador' }, { text: 'Empleado', value: 'Empleado' }]

  selectedRol: string = '';

  constructor(
    private fb: FormBuilder,
    private routerprd: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)]],
      selectedRol: ['', [Validators.required]],
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => control.markAllAsTouched());
      return;
    }

    const enteredUser = this.myForm.value;


    this.authService.getUser(enteredUser)
      .subscribe(
        (response) => {
          // Almacena el token en el localStorage
          localStorage.setItem('token', response.token);

          this.authService.decodeToken();

          // Si la autenticación es exitosa, redirige a la página principal
          this.routerprd.navigateByUrl("/sesion/principal");
        },
        (error) => {
          // Si hay un error en la autenticación, muestra un mensaje de error
          alert("Usuario o contraseña inválido");
        }
      );
    }

  get f(): any {
    return this.myForm.controls;
  }
}
