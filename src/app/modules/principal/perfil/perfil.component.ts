import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { UserService } from 'src/app/shared/servicios/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
    this.getUser();
    this.myForm.get('id_usuario')?.disable();
    this.myForm.get('email')?.disable();
  }

  private createMyForm(): FormGroup {
    return this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      ],
      apellido: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      ],
      id_usuario: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      fecha_nacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/),
        ],
      ],
    });
  }

  public get f(): any {
    return this.myForm.controls;
  }

  getUser(): void {
    this.userService.obtenerUsuario(this.authService.getUserInfo().id_usuario).subscribe((res: any) => {
      this.myForm.patchValue(res.data);
    });
  }

  public submitFormulario() {
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se modificarán los datos del usuario. ¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#006666',
      cancelButtonColor: '#cc6666',
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Continuar con la modificación si el usuario confirma
        if (this.myForm.invalid) {
          Object.values(this.myForm.controls).forEach((control) => {
            control.markAllAsTouched();
          });
          return;
        }

        let user = this.myForm.value;
        this.userService
          .modificarUsuario(this.authService.getUserInfo().id_usuario, user)
          .subscribe((data: any) => {
            this.router.navigateByUrl('/sesion/principal');
          });
      }
    });
  }

}
