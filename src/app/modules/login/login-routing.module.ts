import { PublicacionComponent } from './pages/publicacion/publicacion.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { Login2Component } from './pages/login2/login2.component';

const rutas: Routes=[{
    path:'',children:[
      {path:'login2',component:Login2Component},
        //{path:'login',component:LoginComponent},
        {path:'registro',component:RegistroComponent},
        {path:'publicacion',component:PublicacionComponent},

    ]
}];

@NgModule({imports:[RouterModule.forChild(rutas)],
exports:[RouterModule]})
export class loginRoutingModule{

}
