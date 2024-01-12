import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routerprd: Router
  ) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      pago: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(4)]],
      ciudad: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/), Validators.maxLength(20)]],
      categoria: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/), Validators.maxLength(20)]],
    });
  }

  public submitFormulario(): void {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    // Aquí puedes agregar lógica adicional cuando el formulario es válido y se envía.
  }

  public get f(): any {
    return this.myForm.controls;
  }

  
}
