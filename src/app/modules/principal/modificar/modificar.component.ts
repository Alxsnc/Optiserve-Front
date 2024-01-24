import { ActivatedRoute,RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { Publicaciones } from 'src/api/models/publicaciones/publicaciones';

@Component({
  selector: 'app-modificar-publicacion',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})

export class ModificarComponent implements OnInit{

  public myForm!: FormGroup;

  categorias = [
    { text: 'Seleccione una categoria', value: '' },
    { text: 'Electricidad', value: 'Electricidad' },
    { text: 'Plomería', value: 'Plomería' },
    { text: 'Salud y Cuidado Personal', value: 'Salud y Cuidado Personal' },
    { text: 'Educación y Formación', value: 'Educación y Formación' },
    { text: 'Arte y Entretenimiento', value: 'Arte y Entretenimiento' },
    { text: 'Construcción', value: 'Construcción' },
    { text: 'Tecnologías de la Información', value: 'Tecnologías de la Información' },
    { text: 'Otros', value: 'Otros' }]

  nombre_categoria: string = '';
  id:number;
  //publicacion: Publicaciones[] = [];
  publicacion: any;

  constructor(
    private fb: FormBuilder,
    private routerprd: Router,
    private publicacionService: PublicacionService,
    private authService: AuthService,
    private aRouter: ActivatedRoute,
    private route:ActivatedRoute
  ) {
     this.id= Number(aRouter.snapshot.paramMap.get('id'));
     console.log('idModificar: ',this.id)

    }

  ngOnInit(): void {
    this.myForm = this.createMyForm();

    this.route.paramMap.subscribe(params => {
      const datosPublicacion = params.get('datosPublicacion');
      if (datosPublicacion) {
        this.publicacion = JSON.parse(datosPublicacion);
        console.log('Datos de la publicación:', this.publicacion);
      }
    });

    

  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      pago: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(4)]],
      provincia: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/), Validators.maxLength(20)]],
      ciudad: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/), Validators.maxLength(20)]],
      nombre_categoria: ['', [Validators.required]],
    });
  }

  public submitFormulario(){
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

  this.myForm.addControl('id_usuario', this.fb.control(this.authService.getUserInfo().id_usuario));

  let publicacion = this.myForm.value;

  console.trace(publicacion);

  this.publicacionService.registrarPublicacion(publicacion).subscribe();

  alert("Publicacion creada con éxito");

  this.routerprd.navigateByUrl("/sesion/principal");

  }

  public get f(): any {
    return this.myForm.controls;
  }

}
