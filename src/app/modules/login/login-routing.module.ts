//import { PublicacionComponent } from '../principal/pages/publicacion/publicacion.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistroComponent } from "./pages/registro/registro.component";
import { Login2Component } from './pages/login/login.component';


const rutas: Routes=[{
    path:'',children:[
        {path:'login',component:Login2Component},
        {path:'registro',component:RegistroComponent},
        //{path:'publicacion',component:PublicacionComponent},

    ]
}];

@NgModule({imports:[RouterModule.forChild(rutas)],
exports:[RouterModule]})
export class loginRoutingModule{

}
