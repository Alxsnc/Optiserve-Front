import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalComponent } from "./pages/principal/principal.component";
import { PublicacionComponent } from '../principal/pages/publicacion/publicacion.component';

const rutas:Routes = [{
    path:'',children:[
        {path:'principal',component:PrincipalComponent},
        {path:'publicacion',component:PublicacionComponent}
    ]
}];
@NgModule({
    imports:[RouterModule.forChild(rutas)],
    exports:[RouterModule]
})
export class principalRoutingModule{

}
