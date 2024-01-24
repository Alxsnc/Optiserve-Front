import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { principalRoutingModule } from "./principal-routing.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { DashboardComponent } from "./dashboard.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';
import { ModificarComponent } from './modificar/modificar.component';


@NgModule({
    declarations:[
    DashboardComponent,
    NavbarComponent,
    InicioComponent,
    NavLateralComponent,
    ModificarComponent
  ],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,principalRoutingModule]
})
export class principalModule{

}
