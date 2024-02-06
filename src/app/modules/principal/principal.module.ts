import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { principalRoutingModule } from "./principal-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaPostulantesComponent } from './pages/publicacion/lista-postulantes/lista-postulantes.component';
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
    ListaPostulantesComponent,
    ContratosComponent,
    ContratosActivosComponent,
    ContratosCerradosComponent,
  ],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,principalRoutingModule],
    exports:[ListaPostulantesComponent],

})
export class principalModule{

}
