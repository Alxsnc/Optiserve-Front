import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/api/models/publicaciones/categoria';

import Swal from 'sweetalert2';
import { PublicaDTO } from 'src/api/models/publicaciones/publicaciones';

enum Estado {
  Crear = "Crear",
  Modificar = "Modificar",
  Mostrar = "Mostrar",
}
@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {
  public myForm!: FormGroup;
  estado = Estado;
  mode: string = Estado.Crear;
  idFromPath:number;
  isDisabled: boolean = false;

  categoriasList: Categoria[] = [];
  categoriasSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private routerprd: Router,
    private aRouter: ActivatedRoute,
    private publicacionService: PublicacionService,
    private authService: AuthService,
    private categoriasService: CategoriasService
  ) {
    this.idFromPath = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.categoriasSubscription = this.categoriasService
      .getCategorias()
      .subscribe((res) => {
        this.categoriasList = res.data;
      });
    this.myForm = this.createMyForm();
    this.createOrModify();
  }

  ngOnDestroy(): void {
    this.categoriasSubscription?.unsubscribe();
  }

  createOrModify(){
    if (this.aRouter.snapshot.url[0].path === 'publicacion') {
      this.mode = Estado.Crear;
    } else if (this.aRouter.snapshot.url[0].path === 'editarPublicacion') {
      this.mode = Estado.Modificar;
      this.getPublicacion(this.idFromPath);
    } else if (this.aRouter.snapshot.url[0].path === 'gestionarPublicacion') {
      this.mode = Estado.Mostrar;
      this.getPublicacion(this.idFromPath);
      this.myForm.disable();
    }
  }

  getPublicacion(id: number):void{
    this.publicacionService.obtenerPublicacionById(id).subscribe((data:any)=>{
      this.myForm.patchValue(data.publicacion);
    })
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      pago: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.maxLength(4),
        ],
      ],
      provincia: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),
          Validators.maxLength(20),
        ],
      ],
      ciudad: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),
          Validators.maxLength(20),
        ],
      ],
      id_categoria: ['', [Validators.required]],
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    this.myForm.addControl(
      'id_usuario',
      this.fb.control(this.authService.getUserInfo().id_usuario)
    );
    let publicacion = this.myForm.value;

    // let publicacionTyped: PublicaDTO = {
    //   titulo: publicacion.titulo,
    //   descripcion: publicacion.descripcion,
    //   pago: publicacion.pago,
    //   provincia: publicacion.provincia,
    //   ciudad: publicacion.ciudad,
    //   id_categoria: publicacion.id_categoria,
    //   id_publicacion: this.idFromPath,
    //   fecha_modificacion: publicacion.fecha_modificacion,
    //   fecha_publicacion: publicacion.fecha_publicacion,
    // };

    console.trace(publicacion);
    if (this.mode === Estado.Crear) {
      this.publicacionService.registrarPublicacion(publicacion).subscribe();
      Swal.fire({
        title: 'Publicación Creada',
        text: 'Acción realizada con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#006666'
      })
      this.routerprd.navigateByUrl('/sesion/principal');
    }
    else{
      //publicacionTyped.id_publicacion = this.idFromPath;
      this.publicacionService.modificarPublicacion(this.idFromPath,publicacion).subscribe();
      Swal.fire({
        title: 'Cambios Guardados',
        text: 'Acción realizada con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#006666'
      })
      this.routerprd.navigateByUrl('/sesion/principal');
    }
  }

  public get f(): any {
    return this.myForm.controls;
  }
}
