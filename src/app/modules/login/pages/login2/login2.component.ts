import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})
export class Login2Component implements OnInit {

  public myForm!: FormGroup;

  constructor(private fb: FormBuilder, private routerprd: Router) { }

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/)]]
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => control.markAllAsTouched());
      return;
    }

    const enteredEmail = this.myForm.value.email;
    const enteredPassword = this.myForm.value.password;

    if (enteredEmail === 'erika@gmail.com' && enteredPassword === '123_') {
      this.routerprd.navigateByUrl("/sesion/principal");
    } else {
      alert("Usuario o contraseña inválido");
    }
  }

  get f(): any {
    return this.myForm.controls;
  }
}
