import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { loginRoutingModule } from "./login-routing.module";
import { RegistroComponent } from './pages/registro/registro.component';
import { PublicacionComponent } from '../principal/pages/publicacion/publicacion.component';
import { Login2Component } from './pages/login/login.component';
import { ListaPostulantesComponent } from "../principal/pages/publicacion/lista-postulantes/lista-postulantes.component";

@NgModule({
    declarations:[Login2Component, RegistroComponent, PublicacionComponent, ListaPostulantesComponent ],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,loginRoutingModule]
})
export class loginModule{

}
