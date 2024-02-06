import { ContratosComponent } from './contratos/contratos.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicacionComponent } from '../principal/pages/publicacion/publicacion.component';
import { ListaPublicacionesComponent } from "./pages/lista-publicaciones/lista-publicaciones.component";
import { InicioComponent } from "./pages/inicio/inicio.component";
import { DashboardComponent } from "./dashboard.component";
import { ListaPubCerradasComponent } from './lista-pub-cerradas/lista-pub-cerradas.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { ContratosActivosComponent } from './contratos-activos/contratos-activos.component';
import { ContratosCerradosComponent } from './contratos-cerrados/contratos-cerrados.component';



const rutas:Routes = [{
    path:'',
    component:DashboardComponent,
    children:[
        {path:'principal',component:InicioComponent},
        {path:'publicacion',component:PublicacionComponent},
        {path:'editarPublicacion/:id',component:PublicacionComponent},
        {path:'gestionarPublicacion/:id',component:PublicacionComponent},
        {path:'ListaPublicaciones',component:ListaPublicacionesComponent},
        {path:'ListaPubCerradas',component:ListaPubCerradasComponent},
        {path:'Perfil',component:PerfilComponent},
        {path:'contratos',component:ContratosComponent},
        {path:'contratosActivos',component:ContratosActivosComponent},
        {path:'contratosCerrados',component:ContratosCerradosComponent}
    ]
}];
@NgModule({
    imports:[RouterModule.forChild(rutas)],
    exports:[RouterModule]
})
export class principalRoutingModule{

}
