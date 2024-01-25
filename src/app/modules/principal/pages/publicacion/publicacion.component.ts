import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionService } from 'src/app/shared/servicios/publicacion.service';
import { AuthService } from 'src/app/shared/servicios/auth.service';
import { CategoriasService } from 'src/app/shared/servicios/categorias.service';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/api/models/publicaciones/categoria';
import { PublicacionDTO } from 'src/api/models/publicaciones/publicaciones';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent implements OnInit {
  public myForm!: FormGroup;
  isCreate=true;
  idFromPath:number;

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
    this.createOrModify();
    this.categoriasSubscription = this.categoriasService
      .getCategorias()
      .subscribe((res) => {
        this.categoriasList = res.data;
      });
    this.myForm = this.createMyForm();

    // { "titulo": "", "descripcion": "", "pago": "", "provincia": "", "ciudad": "", "nombre_categoria": "" }
  }

  ngOnDestroy(): void {
    this.categoriasSubscription?.unsubscribe();
  }

  createOrModify(){
    if (this.idFromPath !== 0) {
      this.isCreate = false;
      this.getPublicacion(this.idFromPath);
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
    console.trace(publicacion);
    if (this.isCreate) {
      this.publicacionService.registrarPublicacion(publicacion).subscribe();
      alert('Publicacion creada con éxito');
      this.routerprd.navigateByUrl('/sesion/principal');
    }
    else{
      this.publicacionService.modificarPublicacion(this.idFromPath,publicacion).subscribe();
      alert('Publicacion modificada con éxito');
      this.routerprd.navigateByUrl('/sesion/principal');
    }
  }

  public get f(): any {
    return this.myForm.controls;
  }
}
