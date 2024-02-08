import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { principalRoutingModule } from "./principal-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ContratosComponent } from './contratos/contratos.component';
import { ContratosActivosComponent } from './contratos-activos/contratos-activos.component';
import { ContratosCerradosComponent } from './contratos-cerrados/contratos-cerrados.component';



@NgModule({
    declarations:[
    DashboardComponent,
    NavbarComponent,
    InicioComponent,
    NavLateralComponent,
    PerfilComponent,
    ContratosComponent,
    ContratosCerradosComponent,
    ContratosActivosComponent, // Move ContratosActivosComponent to the declarations array
  ],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,principalRoutingModule],

})
export class principalModule{

}
