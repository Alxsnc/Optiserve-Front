import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import { Observable, Subscription, of } from 'rxjs';
import { Categoria } from 'src/api/models/publicaciones/categoria';

import Swal from 'sweetalert2';
import { PublicacionByID } from 'src/api/models/publicaciones/publicaciones';
import { CalificacionesService } from 'src/app/shared/servicios/calificaciones.service';

enum Estado {
  Crear = 'Crear',
  Modificar = 'Modificar',
  Mostrar = 'Mostrar',
  Info = 'Info',
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
  idFromPath: number;
  isDisabled: boolean = false;


  publicacion!: PublicacionByID;

  categoriasList: Categoria[] = [];
  categoriasSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private routerprd: Router,
    private aRouter: ActivatedRoute,
    private publicacionService: PublicacionService,
    private authService: AuthService,
    private categoriasService: CategoriasService,
    private calificacionesService: CalificacionesService
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
    this.controlDeReutilizacion();
  }

  ngOnDestroy(): void {
    this.categoriasSubscription?.unsubscribe();
  }

  controlDeReutilizacion() {
    if (this.aRouter.snapshot.url[0].path === 'publicacion') {
      this.mode = Estado.Crear;
    } else if (this.aRouter.snapshot.url[0].path === 'editarPublicacion') {
      this.mode = Estado.Modificar;
      this.getPublicacion(this.idFromPath);
    } else if (this.aRouter.snapshot.url[0].path === 'gestionarPublicacion') {
      this.mode = Estado.Mostrar;
      this.getPublicacion(this.idFromPath);
      this.myForm.disable();
    } else if (this.aRouter.snapshot.url[0].path === 'informacionPublicacion') {
      this.mode = Estado.Info;
      this.getPublicacion(this.idFromPath);
      this.myForm.disable();
    }
  }

  getPublicacion(id: number): void {
    this.publicacionService.obtenerPublicacionById(id).subscribe((data) => {
      this.myForm.patchValue(data.publicacion);
      this.publicacion = data.publicacion;
    });
  }

  cerrarPublicacion(id_publicacion: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez aceptada la postulación, no podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.calificacionesService
          .cerrarPublicacion(id_publicacion)
          .subscribe(
            (response: any) => {
              // Manejar la respuesta si es necesario
              Swal.fire({
                title: 'Postulación Cerrada!',
                text: response.message, // Utilizar el mensaje proporcionado por el backend
                icon: 'success',
                confirmButtonColor: '#006666',
                confirmButtonText: 'Aceptar',
              });
              this.routerprd.navigateByUrl('/sesion/principal');
            },
            (error) => {
              // Manejar el error si ocurre
              Swal.fire({
                title: 'Error al cerrar la publicación',
                text: error.error.message,
                icon: 'error',
                confirmButtonColor: '#cc6666',
                confirmButtonText: 'Aceptar',
              });
            }
          );
      }
    });
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

    console.trace(publicacion);
    if (this.mode === Estado.Crear) {
      this.publicacionService.registrarPublicacion(publicacion).subscribe();
      Swal.fire({
        title: 'Publicación Creada',
        text: 'Acción realizada con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#006666',
      });
      this.routerprd.navigateByUrl('/sesion/principal');
    } else if (this.mode === Estado.Modificar){
      //publicacionTyped.id_publicacion = this.idFromPath;
      this.publicacionService
        .modificarPublicacion(this.idFromPath, publicacion)
        .subscribe();
      Swal.fire({
        title: 'Cambios Guardados',
        text: 'Acción realizada con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#006666',
      });
      this.routerprd.navigateByUrl('/sesion/principal');
    }
  }

  public get f(): any {
    return this.myForm.controls;
  }
}
