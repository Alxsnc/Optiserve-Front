import { NgModule } from "@angular/core";
//import { LoginComponent } from "./pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { loginRoutingModule } from "./login-routing.module";
import { RegistroComponent } from './pages/registro/registro.component';
import { PublicacionComponent } from '../principal/pages/publicacion/publicacion.component';
import { Login2Component } from './pages/login/login.component';

@NgModule({
    declarations:[Login2Component, RegistroComponent, PublicacionComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,loginRoutingModule]
})
export class loginModule{

}
